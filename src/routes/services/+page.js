import { getPageBySlug } from '$lib/pages-data.js';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export function load() {
  const page = getPageBySlug('services');
  const serviceAreasPage = getPageBySlug('service-areas');
  const serviceAreaLocations = serviceAreasPage?.service_area_locations ?? [];
  return {
    page: page ?? { title: 'Our Glass Repair Services - OhMyGlass', seo: { meta_description: 'Explore the comprehensive glass repair and replacement services offered by OhMyGlass.', keywords: [] } },
    serviceAreaLocations: Array.isArray(serviceAreaLocations) ? serviceAreaLocations : []
  };
}
