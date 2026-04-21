/**
 * Load `.env` from the project root into `process.env` (only keys not already set).
 * No dependency on the `dotenv` package.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

export function loadDotEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return;

  let content = fs.readFileSync(envPath, 'utf8');
  if (content.charCodeAt(0) === 0xfeff) {
    content = content.slice(1);
  }
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    if (!key) continue;
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = val;
    }
  }
}

/**
 * Load `.env`, then optional `keys.json` → `gbp` block (refresh token, account, location).
 * Only sets `process.env` keys that are still unset.
 */
export function loadGbpProjectEnv() {
  loadDotEnv();
  try {
    const keysPath = path.resolve(process.cwd(), 'keys.json');
    if (!fs.existsSync(keysPath)) return;
    const parsed = JSON.parse(fs.readFileSync(keysPath, 'utf8'));
    const gbp = parsed?.gbp;
    if (!gbp || typeof gbp !== 'object') return;

    const setIfUnset = (envKey, value) => {
      if (value == null || value === '') return;
      const s = String(value).trim();
      if (!s || process.env[envKey] !== undefined) return;
      process.env[envKey] = s;
    };

    setIfUnset('GBP_REFRESH_TOKEN', gbp.refresh_token);
    setIfUnset('GBP_ACCOUNT_ID', gbp.account_id);
    setIfUnset('GBP_LOCATION_ID', gbp.location_id);
  } catch {
    // ignore invalid keys.json
  }
}
