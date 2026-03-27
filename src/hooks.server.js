/**
 * Server hooks for SEO and URL normalization.
 * - 301 non-www → www so canonical host is consistent.
 * - 301 trailing slash → no trailing slash (except for "/").
 * - 301 .html URLs → clean path so one URL per page.
 */

const CANONICAL_HOST = 'www.ohmyglass.ca';

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

    // 3. Redirect .html to clean path (301)
    if (pathname.endsWith('.html')) {
      const cleanPath = pathname.slice(0, -5);
      const location = cleanPath + search;
      return new Response(null, { status: 301, headers: { Location: location } });
    }

    return resolve(event);
  } catch (error) {
    console.error('Middleware error:', error);
    return resolve(event);
  }
}
