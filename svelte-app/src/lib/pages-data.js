/**
 * Page data from pages.json. Used for dynamic content routes.
 * URL = slug (no .html). We exclude index, contact, free-quote, and services
 * (they have dedicated routes). Pages have type: "service" | "resource" | "page".
 */

/** @type {Array<{ url: string; type?: 'service' | 'resource' | 'page'; title: string; seo: { keywords: string[]; meta_description: string }; pagecontent: string }>} */
import allPages from './pages.json';

const SLUGS_WITH_DEDICATED_ROUTES = ['index', 'contact', 'free-quote', 'resources', 'services'];

/** Service bases that combine with a location slug as `{service}-{location}` (canonical). */
const SERVICE_LOCATION_BASES = ['emergency-glass-repair', 'storefront-glass-repair', 'window-glass-replacement'];

/** Location slug prefixes for legacy `{location}-{service}` URLs (longest first). */
const LOCATION_FIRST_PREFIXES = [
  'north-york',
  'richmond-hill',
  'newmarket',
  'etobicoke',
  'markham',
  'scarborough',
  'mississauga',
  'brampton',
  'toronto',
  'vaughan'
].sort((a, b) => b.length - a.length);

/** @param {string} url - e.g. "window-glass-replacement" */
function urlToSlug(url) {
  return url.replace(/\.html$/, '');
}

/** @param {string} slug */
export function getPageBySlug(slug) {
  const slugClean = urlToSlug(slug);
  return allPages.find((p) => p.url === slugClean || urlToSlug(p.url) === slugClean) ?? null;
}

/**
 * If `slug` is legacy `{location}-{service}` and canonical `{service}-{location}` exists, return canonical slug.
 * Otherwise null (including when `slug` already matches a page).
 * @param {string} slug
 */
export function getCanonicalSlugIfLocationFirst(slug) {
  const clean = urlToSlug(slug);
  if (SLUGS_WITH_DEDICATED_ROUTES.includes(clean)) return null;
  if (getPageBySlug(clean)) return null;
  for (const loc of LOCATION_FIRST_PREFIXES) {
    const prefix = `${loc}-`;
    if (!clean.startsWith(prefix)) continue;
    const service = clean.slice(prefix.length);
    if (!SERVICE_LOCATION_BASES.includes(service)) continue;
    const canonical = `${service}-${loc}`;
    if (getPageBySlug(canonical)) return canonical;
  }
  return null;
}

/**
 * Slugs for the dynamic [slug] route (all content pages except home, contact, free-quote, services).
 */
export function getContentPageSlugs() {
  return allPages
    .map((p) => urlToSlug(p.url))
    .filter((slug) => !SLUGS_WITH_DEDICATED_ROUTES.includes(slug));
}

/** Pages that are services (offered services + location-specific). */
export function getServicePages() {
  return allPages.filter((p) => p.type === 'service');
}

/** Pages that are resources (guides, articles). */
export function getResourcePages() {
  return allPages.filter((p) => p.type === 'resource');
}

/** Slug list for resource pages (for the resources hub). */
export function getResourceSlugs() {
  return getResourcePages().map((p) => urlToSlug(p.url));
}

/** Whether the page is a resource (for [slug] layout branching). */
export function isResourcePage(page) {
  return page && page.type === 'resource';
}

export { allPages };
