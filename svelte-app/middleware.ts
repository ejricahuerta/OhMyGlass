/**
 * Vercel Edge Middleware: return 404 for known bogus/spam paths (pre-cleanup).
 * List is generated from docs/bogus-urls-before-cleanup.txt → bogus-paths.json.
 * Regenerate with: node scripts/generate-bogus-paths.js
 */

import bogusPaths from './bogus-paths.json';

const BOGUS = new Set<string>(bogusPaths as string[]);

export default function middleware(request: Request): Response | Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const normalized = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

  if (BOGUS.has(pathname) || BOGUS.has(normalized)) {
    return new Response(null, { status: 404 });
  }

  return fetch(request);
}
