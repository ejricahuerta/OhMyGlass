#!/usr/bin/env node
/**
 * Sync Google Business Profile services from local catalog.
 *
 * Default mode is DRY RUN.
 *
 * Usage:
 *   node scripts/sync-gbp.js
 *   node scripts/sync-gbp.js --apply
 *   node scripts/sync-gbp.js --apply --catalog=data/gbp-catalog.json
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { loadGbpProjectEnv } from './load-dotenv.js';

const BUSINESS_MANAGE_SCOPE = 'https://www.googleapis.com/auth/business.manage';
const DEFAULT_CATALOG_PATH = 'data/gbp-catalog.json';
const DEFAULT_REPORTS_DIR = 'reports';

/**
 * @typedef {{
 *   services: Array<{name: string; description?: string; category?: string;}>;
 *   products: Array<{name: string; description?: string; category?: string;}>;
 * }} Catalog
 */

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function getArgValue(prefix) {
  const arg = process.argv.find((item) => item.startsWith(`${prefix}=`));
  return arg ? arg.slice(prefix.length + 1) : null;
}

function nowIsoSafe() {
  return new Date().toISOString().replaceAll(':', '-');
}

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

async function readCatalog(catalogPath) {
  const content = await fs.readFile(catalogPath, 'utf8');
  /** @type {Catalog} */
  const catalog = JSON.parse(content);

  if (!Array.isArray(catalog.services) || !Array.isArray(catalog.products)) {
    throw new Error('Catalog must contain "services" and "products" arrays.');
  }

  return catalog;
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

function getLocationId() {
  return requiredEnv('GBP_LOCATION_ID').trim();
}

/** v1 resource name for JSON bodies. */
function getLocationName(locationId) {
  return `locations/${locationId}`;
}

function v1LocationEndpoint(locationId) {
  return `https://mybusinessbusinessinformation.googleapis.com/v1/locations/${encodeURIComponent(locationId)}`;
}

function toServiceItems(services) {
  return services.map((service) => ({
    freeFormServiceItem: {
      label: {
        displayName: service.name
      }
    }
  }));
}

/**
 * @param {unknown} data
 */
function isZeroQuota429(data) {
  if (!data || typeof data !== 'object') return false;
  const err = /** @type {{ error?: { code?: number; details?: Array<{ metadata?: Record<string, string> }> } }} */ (
    data
  );
  if (err.error?.code !== 429) return false;
  return (err.error?.details ?? []).some((d) => d?.metadata?.quota_limit_value === '0');
}

async function inferGoogleProjectNumber() {
  const fromEnv = process.env.GOOGLE_CLOUD_PROJECT_NUMBER || process.env.GCP_PROJECT_NUMBER;
  if (fromEnv) return fromEnv;
  const c = await loadClientCredsFromKeysFile();
  const clientId = process.env.GBP_CLIENT_ID || c?.clientId;
  const prefix = clientId?.split('-')[0];
  if (prefix && /^\d+$/.test(prefix)) return prefix;
  return 'YOUR_PROJECT_NUMBER';
}

async function printBusinessInformationQuotaHint() {
  const p = await inferGoogleProjectNumber();
  console.error('');
  console.error(
    'My Business Business Information API: quota is 0 requests/minute for this Cloud project — Google blocks all calls until that limit is raised.'
  );
  console.error(
    `Open quotas: https://console.cloud.google.com/apis/api/mybusinessbusinessinformation.googleapis.com/quotas?project=${p}`
  );
  console.error('Quota help: https://cloud.google.com/docs/quotas/help/request_increase');
  console.error('');
}

async function fetchCurrentServiceList(accessToken, locationId) {
  const url = new URL(v1LocationEndpoint(locationId));
  url.searchParams.set('readMask', 'serviceItems');

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json'
    }
  });

  const data = await response.json();
  if (!response.ok) {
    if (response.status === 429 && isZeroQuota429(data)) {
      await printBusinessInformationQuotaHint();
    }
    throw new Error(
      `Failed to fetch current service list: ${response.status} ${response.statusText} ${JSON.stringify(
        data
      )}`
    );
  }

  return data;
}

async function updateServiceList(accessToken, locationId, serviceItems) {
  const url = new URL(v1LocationEndpoint(locationId));
  url.searchParams.set('updateMask', 'serviceItems');
  const locationName = getLocationName(locationId);

  const response = await fetch(url.toString(), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      name: locationName,
      serviceItems
    })
  });

  const data = await response.json();
  if (!response.ok) {
    if (response.status === 429 && isZeroQuota429(data)) {
      await printBusinessInformationQuotaHint();
    }
    throw new Error(
      `Failed to update service list: ${response.status} ${response.statusText} ${JSON.stringify(data)}`
    );
  }

  return data;
}

function normalizeServiceNames(serviceItems = []) {
  return serviceItems
    .map((item) => item?.freeFormServiceItem?.label?.displayName?.trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

async function writeProductsManualReport(products, reportsDir) {
  const reportPath = path.join(reportsDir, `gbp-products-manual-${nowIsoSafe()}.json`);
  const report = {
    generatedAt: new Date().toISOString(),
    reason:
      'Google Business Profile product synchronization may be unavailable or restricted depending on account/API support.',
    actionRequired:
      'Use this list to update Products in GBP UI, or extend the script if your account has a supported product endpoint.',
    products
  };

  await fs.mkdir(reportsDir, { recursive: true });
  await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  return reportPath;
}

async function main() {
  loadGbpProjectEnv();
  const apply = hasFlag('--apply');
  const catalogPath = path.resolve(process.cwd(), getArgValue('--catalog') ?? DEFAULT_CATALOG_PATH);
  const reportsDir = path.resolve(process.cwd(), getArgValue('--reports-dir') ?? DEFAULT_REPORTS_DIR);

  console.log(`Mode: ${apply ? 'APPLY' : 'DRY RUN'}`);
  console.log(`Catalog: ${catalogPath}`);

  const catalog = await readCatalog(catalogPath);
  const accessToken = await getAccessToken();
  const locationId = getLocationId();

  const currentLocation = await fetchCurrentServiceList(accessToken, locationId);
  const currentNames = normalizeServiceNames(currentLocation?.serviceItems);
  const targetServiceItems = toServiceItems(catalog.services);
  const targetNames = normalizeServiceNames(targetServiceItems);

  const toAdd = targetNames.filter((name) => !currentNames.includes(name));
  const toRemove = currentNames.filter((name) => !targetNames.includes(name));

  console.log(`Current services: ${currentNames.length}`);
  console.log(`Target services: ${targetNames.length}`);
  console.log(`Will add: ${toAdd.length}`);
  console.log(`Will remove: ${toRemove.length}`);

  if (toAdd.length) console.log(`Add list: ${toAdd.join(', ')}`);
  if (toRemove.length) console.log(`Remove list: ${toRemove.join(', ')}`);

  if (apply) {
    await updateServiceList(accessToken, locationId, targetServiceItems);
    console.log('Service sync completed.');
  } else {
    console.log('Dry run complete. Re-run with --apply to push changes.');
  }

  const productsReportPath = await writeProductsManualReport(catalog.products, reportsDir);
  console.log(`Products manual-sync report: ${productsReportPath}`);
}

main().catch((error) => {
  console.error(error?.message ?? error);
  process.exit(1);
});

