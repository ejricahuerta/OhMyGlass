/**
 * Server hooks for SEO and URL normalization.
 * - 301 ohmyglass.ca → www.ohmyglass.ca (both hostnames work; apex redirects to canonical host).
 * - 301 trailing slash → no trailing slash (except for "/").
 * - 301 /contact.html (etc.) → dedicated routes without .html.
 * - 301 {location}-{service} → {service}-{location} when that canonical page exists.
 * - .html on dynamic [slug] pages is supported (same content as slug without .html).
 */

import { getCanonicalSlugIfLocationFirst } from '$lib/pages-data.js';

const CANONICAL_HOST = 'www.ohmyglass.ca';

/** Slugs that use a folder route instead of [slug]; .html requests should redirect there. */
const DEDICATED_SLUG_TO_PATH = new Map([
  ['index', '/'],
  ['contact', '/contact'],
  ['services', '/services'],
  ['resources', '/resources'],
  ['free-quote', '/free-quote']
]);

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  try {
    const url = event.url;
    const requestUrl = new URL(event.request.url);
    const host = url.hostname.toLowerCase();
    const pathname = url.pathname;
    // Read query from the raw request URL to remain prerender-safe.
    // (event.url.search access throws during prerender in SvelteKit)
    const search = requestUrl.search;

    // 1. Redirect non-www to www (301)
    if (host === 'ohmyglass.ca') {
      const target = new URL(url);
      target.hostname = CANONICAL_HOST;
      return new Response(null, { status: 301, headers: { Location: target.toString() } });
    }

    // 2. Redirect trailing slash to no trailing slash (except "/")
    if (pathname.length > 1 && pathname.endsWith('/')) {
      const cleanPath = pathname.slice(0, -1);
      const location = cleanPath + search;
      return new Response(null, { status: 301, headers: { Location: location } });
    }

    // 3. Dedicated routes: /contact.html → /contact (dynamic [slug] would otherwise handle these)
    if (pathname.endsWith('.html')) {
      const inner = pathname.slice(1, -5);
      const dedicatedPath = DEDICATED_SLUG_TO_PATH.get(inner === '' ? 'index' : inner);
      if (dedicatedPath != null) {
        const location = dedicatedPath + search;
        return new Response(null, { status: 301, headers: { Location: location } });
      }
    }

    // 4. Legacy {location}-{service} → canonical {service}-{location}
    const pathForSlug = pathname.endsWith('.html') ? pathname.slice(0, -5) : pathname;
    const slugFromPath = pathForSlug.startsWith('/') ? pathForSlug.slice(1) : pathForSlug;
    if (slugFromPath.length > 0) {
      const canonical = getCanonicalSlugIfLocationFirst(slugFromPath);
      if (canonical != null) {
        const location = `/${canonical}` + search;
        return new Response(null, { status: 301, headers: { Location: location } });
      }
    }

    return resolve(event);
  } catch (error) {
    console.error('Middleware error:', error);
    return resolve(event);
  }
}
