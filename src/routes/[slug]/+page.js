import { error } from '@sveltejs/kit';
import { getPageBySlug, getContentPageSlugs } from '$lib/pages-data.js';

export const prerender = true;

export function entries() {
  return getContentPageSlugs().map((slug) => ({ slug }));
}

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const page = getPageBySlug(params.slug);
  if (!page) throw error(404, `Page not found: ${params.slug}`);
  return { page, slug: params.slug };
}
