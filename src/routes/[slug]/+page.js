import { redirect } from '@sveltejs/kit';
import { getPageBySlug, getContentPageSlugs } from '$lib/pages-data.js';

export const prerender = true;

export function entries() {
  return getContentPageSlugs().map((slug) => ({ slug }));
}

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const page = getPageBySlug(params.slug);
  if (!page) throw redirect(302, '/404');
  // Use page.url (canonical slug) for canonical/og:url so GSC and crawlers see the official URL
  const canonicalSlug = page.url.replace(/\.html$/, '');
  return { page, slug: canonicalSlug };
}
