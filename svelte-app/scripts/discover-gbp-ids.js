#!/usr/bin/env node
/**
 * Discover Google Business Profile account and location IDs.
 *
 * Usage:
 *   node scripts/discover-gbp-ids.js
 *
 * Required env:
 *   GBP_CLIENT_ID
 *   GBP_CLIENT_SECRET
 *   GBP_REFRESH_TOKEN
 *
 * Optional env:
 *   GBP_ACCESS_TOKEN (bypasses refresh flow)
 */

import process from 'node:process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { loadGbpProjectEnv } from './load-dotenv.js';

const BUSINESS_MANAGE_SCOPE = 'https://www.googleapis.com/auth/business.manage';

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function loadClientCredsFromKeysFile() {
  try {
    const keysPath = path.resolve(process.cwd(), 'keys.json');
    const content = await fs.readFile(keysPath, 'utf8');
    const parsed = JSON.parse(content);
    const googleEntries = Array.isArray(parsed?.google) ? parsed.google : [];
    const oauthEntry = googleEntries.find((entry) => entry?.client_id && entry?.client_secret);
    if (!oauthEntry) return null;

    return {
      clientId: oauthEntry.client_id,
      clientSecret: oauthEntry.client_secret
    };
  } catch {
    return null;
  }
}

function extractNumericId(resourceName) {
  const last = resourceName?.split('/').pop();
  return last ?? '';
}

/** Google OAuth client_id often starts with the Cloud project number. */
async function inferGoogleProjectNumber() {
  const fromEnv = process.env.GOOGLE_CLOUD_PROJECT_NUMBER || process.env.GCP_PROJECT_NUMBER;
  if (fromEnv) return fromEnv;

  const fallback = await loadClientCredsFromKeysFile();
  const clientId = process.env.GBP_CLIENT_ID || fallback?.clientId;
  if (clientId) {
    const prefix = clientId.split('-')[0];
    if (/^\d+$/.test(prefix)) return prefix;
  }
  return 'YOUR_PROJECT';
}

async function getAccessToken() {
  const directAccessToken = process.env.GBP_ACCESS_TOKEN;
  if (directAccessToken) return directAccessToken;

  const fallbackCreds = await loadClientCredsFromKeysFile();
  const clientId = process.env.GBP_CLIENT_ID || fallbackCreds?.clientId || requiredEnv('GBP_CLIENT_ID');
  const clientSecret =
    process.env.GBP_CLIENT_SECRET || fallbackCreds?.clientSecret || requiredEnv('GBP_CLIENT_SECRET');
  const refreshToken = process.env.GBP_REFRESH_TOKEN?.trim();
  if (!refreshToken) {
    throw new Error(
      'Missing GBP_REFRESH_TOKEN. Add project-root .env: GBP_REFRESH_TOKEN=... or keys.json: "gbp": { "refresh_token": "..." }'
    );
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
      scope: BUSINESS_MANAGE_SCOPE
    })
  });

  const data = await response.json();
  if (!response.ok || !data?.access_token) {
    throw new Error(
      `Unable to get access token: ${response.status} ${response.statusText} ${JSON.stringify(data)}`
    );
  }

  return data.access_token;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param {unknown} data
 * @returns {boolean}
 */
function isZeroQuota429(data) {
  if (!data || typeof data !== 'object') return false;
  const err = /** @type {{ error?: { code?: number; details?: Array<{ metadata?: Record<string, string> }> } }} */ (
    data
  );
  if (err.error?.code !== 429) return false;
  const details = err.error?.details ?? [];
  return details.some((d) => d?.metadata?.quota_limit_value === '0');
}

/**
 * @param {string} url
 * @param {string} accessToken
 * @param {{ maxRetries?: number }} [options]
 */
async function fetchJson(url, accessToken, options = {}) {
  const maxRetries = options.maxRetries ?? 4;
  let lastError = /** @type {Error | null} */ (null);

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      }
    });
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    if (response.status === 429 && isZeroQuota429(data)) {
      const projectNum = await inferGoogleProjectNumber();
      console.error('');
      console.error('Google returned 429 with quota limit 0 for My Business Account Management API.');
      console.error('Your Cloud project cannot call this API until quota is granted (often needs billing or quota request).');
      console.error(
        `Open: https://console.cloud.google.com/apis/api/mybusinessaccountmanagement.googleapis.com/quotas?project=${projectNum}`
      );
      console.error('Or request quota: https://cloud.google.com/docs/quotas/help/request_increase');
      console.error('');
      console.error('Manual IDs: open https://business.google.com → pick the location → check the browser URL for numeric ids,');
      console.error('or use Google\'s API Explorer after quota is fixed.');
      throw new Error('GBP Account Management API quota is 0 — fix in Google Cloud Console (see messages above).');
    }

    if (response.status === 429 && attempt < maxRetries) {
      const waitSec = 15 * (attempt + 1);
      console.warn(`429 rate limited — retrying in ${waitSec}s (attempt ${attempt + 1}/${maxRetries})…`);
      await sleep(waitSec * 1000);
      continue;
    }

    lastError = new Error(`Request failed: ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
    break;
  }

  throw lastError ?? new Error('Request failed');
}

async function listAccounts(accessToken) {
  const url = 'https://mybusinessaccountmanagement.googleapis.com/v1/accounts';
  const data = await fetchJson(url, accessToken);
  return data.accounts ?? [];
}

async function listLocations(accessToken, accountName) {
  const url =
    `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations` +
    '?readMask=name,title,storeCode,websiteUri,phoneNumbers,storefrontAddress';
  const data = await fetchJson(url, accessToken);
  return data.locations ?? [];
}

async function main() {
  loadGbpProjectEnv();
  const accessToken = await getAccessToken();
  const accounts = await listAccounts(accessToken);

  if (!accounts.length) {
    console.log('No GBP accounts found for this OAuth identity.');
    return;
  }

  console.log('=== GBP Accounts ===');
  for (const account of accounts) {
    const accountName = account.name; // accounts/{accountId}
    const accountId = extractNumericId(accountName);
    console.log(`- ${account.accountName ?? 'Unnamed account'} | ${accountName}`);
    console.log(`  GBP_ACCOUNT_ID=${accountId}`);
  }

  for (const account of accounts) {
    const accountName = account.name;
    const accountId = extractNumericId(accountName);
    const locations = await listLocations(accessToken, accountName);

    console.log('');
    console.log(`=== Locations for ${account.accountName ?? accountName} (${accountName}) ===`);

    if (!locations.length) {
      console.log('- No locations found.');
      continue;
    }

    for (const location of locations) {
      const locationName = location.name; // locations/{locationId}
      const locationId = extractNumericId(locationName);
      const title = location.title ?? 'Untitled location';
      const website = location.websiteUri ?? '';
      const address = location.storefrontAddress;
      const city = address?.locality ?? '';
      const region = address?.administrativeArea ?? '';

      console.log(`- ${title} | ${locationName}`);
      console.log(`  GBP_ACCOUNT_ID=${accountId}`);
      console.log(`  GBP_LOCATION_ID=${locationId}`);
      if (city || region) {
        console.log(`  Area=${city}${city && region ? ', ' : ''}${region}`);
      }
      if (website) {
        console.log(`  Website=${website}`);
      }
    }
  }

  console.log('');
  console.log('Copy the matching values into your .env file, then run: npm run sync:gbp');
}

main().catch((error) => {
  console.error(error?.message ?? error);
  process.exit(1);
});

