/**
 * JSON-LD schema builders for SEO. Use in svelte:head with type="application/ld+json".
 */
import { siteUrl, nap, serviceAreaCitiesList, ogImage } from '$lib/site-data.js';

/**
 * Serialize schema for use inside <script type="application/ld+json">.
 * - Escapes "</script" so the HTML parser does not close the script tag early (truncated
 *   JSON causes "Missing '}' or object member name" in Search Console).
 * - Escapes U+2028/U+2029 so JSON remains valid for strict validators.
 */
export function safeJsonLdScript(value) {
  let raw = JSON.stringify(value);
  raw = raw.replace(/<\/script/gi, '\\u003c/script');
  raw = raw.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  return raw;
}

/**
 * Returns a full <script type="application/ld+json"> tag for use with {@html}.
 * Use this so Svelte does not escape the JSON (which breaks parsing).
 */
export function getJsonLdScriptTag(value) {
  if (value == null) return '';
  return '<script type="application/ld+json">' + safeJsonLdScript(value) + '</script>';
}

/**
 * Returns a single <script type="application/ld+json"> tag containing all schemas in @graph.
 * Use one graph per page to avoid "Duplicate field" issues in Google Search Console.
 * @param {Array<object>} schemas - Array of schema objects (BreadcrumbList, Service, FAQPage, etc.)
 */
export function getJsonLdGraphScriptTag(schemas) {
  const list = Array.isArray(schemas) ? schemas.filter((s) => s != null) : [];
  if (list.length === 0) return '';
  const graph = { '@context': 'https://schema.org', '@graph': list };
  return '<script type="application/ld+json">' + safeJsonLdScript(graph) + '</script>';
}

/** LocalBusiness schema for homepage (and organization context). */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: nap.name,
    url: siteUrl,
    telephone: nap.telephoneSchema || `+1${nap.telephone.replace(/\D/g, '')}`,
    image: ogImage,
    description: 'Expert glass repair and window replacement in Toronto and the GTA. 24/7 emergency service. Save 60-80% with repair vs full replacement.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: nap.address.streetAddress,
      addressLocality: nap.address.addressLocality,
      addressRegion: nap.address.addressRegion,
      ...(nap.address.postalCode && { postalCode: nap.address.postalCode }),
      addressCountry: nap.address.addressCountry
    },
    areaServed: serviceAreaCitiesList.map((city) => ({ '@type': 'City', name: city })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '100',
      bestRating: '5'
    },
    sameAs: [
      'https://www.facebook.com/ohmy.glass.to',
      'https://www.instagram.com/ohmy.glass/'
    ]
  };
}

/** Service schema for a service page. */
export function getServiceSchema({ name, description, url }) {
  const safeName = (name ?? '').toString().replace(/\s*[-–|]\s*OhMyGlass[^]*$/i, '').trim();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: safeName,
    description: (description ?? '').toString(),
    url: url.startsWith('http') ? url : `${siteUrl}/${url.replace(/^\//, '')}`,
    provider: {
      '@type': 'LocalBusiness',
      name: nap.name,
      url: siteUrl,
      telephone: nap.telephoneSchema || `+1${nap.telephone.replace(/\D/g, '')}`,
      areaServed: 'Greater Toronto Area'
    },
    areaServed: serviceAreaCitiesList.map((city) => ({ '@type': 'City', name: city }))
  };
}

/** FAQPage schema. Pass mainEntity: [{ "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }] */
export function getFAQPageSchema(mainEntity) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: Array.isArray(mainEntity) ? mainEntity : []
  };
}

/** BreadcrumbList schema. Pass items: [{ name, url }, ...] */
export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: (items || []).map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: (item.name != null && item.name !== '') ? String(item.name) : 'Page',
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url.startsWith('/') ? '' : '/'}${item.url}`
    }))
  };
}
