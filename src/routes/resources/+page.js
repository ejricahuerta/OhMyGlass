import { getResourcePages } from '$lib/pages-data.js';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export function load() {
  const resources = getResourcePages();
  return {
    page: {
      title: 'Resources - OhMyGlass',
      seo: {
        meta_description: 'Helpful resources for glass repair and replacement in the Greater Toronto Area. Tips, guides, and information from OhMyGlass.',
        keywords: []
      }
    },
    resources
  };
}
