#!/usr/bin/env node
/**
 * Google OAuth helper for GBP scripts.
 *
 * Commands:
 *   node scripts/gbp-auth.js login     (recommended: local server + auto exchange)
 *   node scripts/gbp-auth.js url       (print auth URL only)
 *   node scripts/gbp-auth.js exchange --code=AUTH_CODE
 *
 * Default redirect (must match Google Cloud Console exactly):
 *   http://127.0.0.1:8765/oauth2callback
 *
 * Env:
 *   GBP_CLIENT_ID / GBP_CLIENT_SECRET
 *   GBP_REDIRECT_URI (optional override)
 *   or fallback from keys.json google[] OAuth entry
 */

import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import process from 'node:process';
import { loadGbpProjectEnv } from './load-dotenv.js';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

const SCOPE = 'https://www.googleapis.com/auth/business.manage';
/** Use loopback + path — register this exact string in GCP "Authorized redirect URIs". */
const DEFAULT_REDIRECT_URI = 'http://127.0.0.1:8765/oauth2callback';

function getArgValue(prefix) {
  const arg = process.argv.find((item) => item.startsWith(`${prefix}=`));
  return arg ? arg.slice(prefix.length + 1) : null;
}

async function loadClientCredsFromKeysFile() {
  try {
    const keysPath = path.resolve(process.cwd(), 'keys.json');
    const content = await fs.readFile(keysPath, 'utf8');
    const parsed = JSON.parse(content);
    const googleEntries = Array.isArray(parsed?.google) ? parsed.google : [];
    const oauthEntry = googleEntries.find((entry) => entry?.client_id && entry?.client_secret);
    if (!oauthEntry) return null;
    return { clientId: oauthEntry.client_id, clientSecret: oauthEntry.client_secret };
  } catch {
    return null;
  }
}

async function getCreds() {
  const fallback = await loadClientCredsFromKeysFile();
  const clientId = process.env.GBP_CLIENT_ID || fallback?.clientId;
  const clientSecret = process.env.GBP_CLIENT_SECRET || fallback?.clientSecret;

  if (!clientId || !clientSecret) {
    throw new Error('Missing GBP_CLIENT_ID/GBP_CLIENT_SECRET and no OAuth entry found in keys.json');
  }

  return { clientId, clientSecret };
}

function buildAuthUrl(clientId, redirectUri) {
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', SCOPE);
  url.searchParams.set('access_type', 'offline');
  url.searchParams.set('prompt', 'consent');
  url.searchParams.set('include_granted_scopes', 'true');
  return url.toString();
}

async function openBrowser(url) {
  const platform = process.platform;
  try {
    if (platform === 'win32') {
      await execAsync(`start "" "${url.replace(/"/g, '\\"')}"`);
    } else if (platform === 'darwin') {
      await execAsync(`open "${url.replace(/"/g, '\\"')}"`);
    } else {
      await execAsync(`xdg-open "${url.replace(/"/g, '\\"')}"`);
    }
  } catch {
    // Non-fatal: user can open the URL manually
  }
}

/**
 * @param {string} redirectUri
 * @returns {Promise<string>} authorization code
 */
function waitForOAuthCallback(redirectUri) {
  const parsed = new URL(redirectUri);
  const port = Number.parseInt(parsed.port || '80', 10);
  const callbackPath = parsed.pathname || '/';

  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      if (!req.url) {
        res.writeHead(400);
        res.end();
        return;
      }

      const reqUrl = new URL(req.url, `http://${req.headers.host ?? '127.0.0.1'}`);
      if (reqUrl.pathname !== callbackPath) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
        return;
      }

      const code = reqUrl.searchParams.get('code');
      const error = reqUrl.searchParams.get('error');
      const errorDescription = reqUrl.searchParams.get('error_description') ?? '';

      const html = (body) => `<!DOCTYPE html><html><head><meta charset="utf-8"><title>GBP OAuth</title></head><body>${body}</body></html>`;

      if (error) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html(`<p>Authorization failed: <strong>${error}</strong></p><p>${errorDescription}</p>`));
        server.close(() => reject(new Error(`${error}: ${errorDescription}`)));
        return;
      }

      if (!code) {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html('<p>Missing <code>code</code> in callback.</p>'));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(
        html(
          '<h1>Authorized</h1><p>You can close this tab and return to the terminal.</p>'
        )
      );
      server.close(() => resolve(code));
    });

    server.on('error', reject);
    server.listen(port, '127.0.0.1', () => {
      console.log(`Listening for OAuth callback on ${redirectUri}`);
    });
  });
}

async function printAuthUrl() {
  const { clientId } = await getCreds();
  const redirectUri = process.env.GBP_REDIRECT_URI || DEFAULT_REDIRECT_URI;

  console.log('Register this exact redirect URI in Google Cloud Console:');
  console.log(`  ${redirectUri}`);
  console.log('');
  console.log('  APIs & Services → Credentials → your OAuth 2.0 Client ID →');
  console.log('  Application type: Web application');
  console.log('  Authorized redirect URIs → Add URI → paste the line above');
  console.log('');
  console.log('Open this URL and authorize the GBP account:');
  console.log(buildAuthUrl(clientId, redirectUri));
  console.log('');
  console.log('Then run: npm run gbp:auth:exchange -- --code=PASTE_AUTH_CODE');
}

/**
 * @param {string} refreshToken
 */
async function persistRefreshTokenToEnv(refreshToken) {
  const envPath = path.resolve(process.cwd(), '.env');
  let content = '';
  try {
    content = await fs.readFile(envPath, 'utf8');
  } catch {
    // create new .env
  }
  if (content.charCodeAt(0) === 0xfeff) {
    content = content.slice(1);
  }
  const lines = content.split(/\r?\n/);
  let found = false;
  const next = lines.map((line) => {
    if (/^\s*GBP_REFRESH_TOKEN\s*=/.test(line)) {
      found = true;
      return `GBP_REFRESH_TOKEN=${refreshToken}`;
    }
    return line;
  });
  if (!found) {
    if (next.length && next[next.length - 1] !== '') {
      next.push('');
    }
    next.push(`GBP_REFRESH_TOKEN=${refreshToken}`);
  }
  const body = next.join('\n').replace(/\n*$/, '') + '\n';
  await fs.writeFile(envPath, body, 'utf8');
  process.env.GBP_REFRESH_TOKEN = refreshToken;
  console.log(`Saved GBP_REFRESH_TOKEN to ${path.relative(process.cwd(), envPath) || '.env'}`);
}

async function exchangeCode(code, redirectUri) {
  const { clientId, clientSecret } = await getCreds();

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
  }

  if (!data.refresh_token) {
    console.log('No refresh token returned. Revoke app access at https://myaccount.google.com/permissions then run login again with prompt=consent.');
  } else {
    await persistRefreshTokenToEnv(data.refresh_token);
    console.log('Next: npm run discover:gbp');
  }
}

async function exchangeCli() {
  const code = getArgValue('--code');
  const redirectUri = process.env.GBP_REDIRECT_URI || DEFAULT_REDIRECT_URI;

  if (!code) {
    throw new Error('Missing --code argument');
  }

  await exchangeCode(code, redirectUri);
}

async function login() {
  const { clientId } = await getCreds();
  const redirectUri = process.env.GBP_REDIRECT_URI || DEFAULT_REDIRECT_URI;

  console.log('If you see redirect_uri_mismatch, add this EXACT URI in Google Cloud Console → OAuth client → Authorized redirect URIs:');
  console.log(`  ${redirectUri}`);
  console.log('');

  const authUrl = buildAuthUrl(clientId, redirectUri);
  const codePromise = waitForOAuthCallback(redirectUri);

  console.log('Opening browser… (or paste this URL manually)');
  console.log(authUrl);
  console.log('');
  await openBrowser(authUrl);

  const code = await codePromise;
  await exchangeCode(code, redirectUri);
}

async function main() {
  loadGbpProjectEnv();
  const cmd = process.argv[2];
  if (cmd === 'login') {
    await login();
    return;
  }
  if (cmd === 'url') {
    await printAuthUrl();
    return;
  }
  if (cmd === 'exchange') {
    await exchangeCli();
    return;
  }
  console.log('Usage:');
  console.log('  node scripts/gbp-auth.js login     # recommended');
  console.log('  node scripts/gbp-auth.js url');
  console.log('  node scripts/gbp-auth.js exchange --code=AUTH_CODE');
}

main().catch((error) => {
  console.error(error?.message ?? error);
  process.exit(1);
});
