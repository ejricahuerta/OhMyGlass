/**
 * JSON-LD schema builders for SEO. Use in svelte:head with type="application/ld+json".
 */
import { siteUrl, nap, serviceAreaCitiesList, ogImage } from '$lib/site-data.js';

/**
 * Serialize schema for use inside <script type="application/ld+json">.
 * Escapes "</script" so the HTML parser does not close the script tag early (which would
 * truncate the JSON and cause "Missing '}' or object member name" in Search Console).
 */
export function safeJsonLdScript(value) {
  const raw = JSON.stringify(value);
  return raw.replace(/<\/script/gi, '\\u003c/script');
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
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url.startsWith('/') ? '' : '/'}${item.url}`
    }))
  };
}
