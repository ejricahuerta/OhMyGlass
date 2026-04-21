import { siteUrl, nap, serviceAreaCitiesList, ogImage } from "./site-data";

export function safeJsonLdScript(value: unknown): string {
  let raw = JSON.stringify(value);
  raw = raw.replace(/<\/script/gi, "\\u003c/script");
  raw = raw.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  return raw;
}

export function getJsonLdScriptTag(value: unknown): string {
  if (value == null) return "";
  return `<script type="application/ld+json">${safeJsonLdScript(value)}</script>`;
}

export function getJsonLdGraphInner(schemas: Array<Record<string, unknown> | null | undefined>): string {
  const raw = Array.isArray(schemas) ? schemas.filter((s) => s != null) : [];
  if (raw.length === 0) return "";
  const seen = new Set<string>();
  const list = raw.filter((s) => {
    const type = s["@type"];
    const key = Array.isArray(type) ? type.join(",") : String(type || "");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (list.length === 0) return "";
  const graph = { "@context": "https://schema.org", "@graph": list };
  return safeJsonLdScript(graph);
}

export function getJsonLdGraphScriptTag(schemas: Array<Record<string, unknown> | null | undefined>): string {
  const inner = getJsonLdGraphInner(schemas);
  if (!inner) return "";
  return `<script type="application/ld+json">${inner}</script>`;
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: nap.name,
    url: siteUrl,
    telephone:
      nap.telephoneSchema || `+1${nap.telephone.replace(/\D/g, "")}`,
    image: ogImage,
    description:
      "Expert glass repair and window replacement in Toronto and the GTA. 24/7 emergency service. Save 60-80% with repair vs full replacement.",
    address: {
      "@type": "PostalAddress",
      streetAddress: nap.address.streetAddress,
      addressLocality: nap.address.addressLocality,
      addressRegion: nap.address.addressRegion,
      ...(nap.address.postalCode && { postalCode: nap.address.postalCode }),
      addressCountry: nap.address.addressCountry,
    },
    areaServed: serviceAreaCitiesList.map((city) => ({ "@type": "City", name: city })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "100",
      bestRating: "5",
    },
    sameAs: [
      "https://www.facebook.com/ohmy.glass.to",
      "https://www.instagram.com/ohmy.glass/",
    ],
  };
}

export function getServiceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const safeName = (name ?? "")
    .toString()
    .replace(/\s*[-–|]\s*OhMyGlass[^]*$/i, "")
    .trim();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: safeName,
    description: (description ?? "").toString(),
    url: url.startsWith("http") ? url : `${siteUrl}/${url.replace(/^\//, "")}`,
    provider: {
      "@type": "LocalBusiness",
      name: nap.name,
      url: siteUrl,
      telephone:
        nap.telephoneSchema || `+1${nap.telephone.replace(/\D/g, "")}`,
      areaServed: "Greater Toronto Area",
    },
    areaServed: serviceAreaCitiesList.map((city) => ({ "@type": "City", name: city })),
  };
}

export function getFAQPageSchema(mainEntity: unknown[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Array.isArray(mainEntity) ? mainEntity : [],
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: (items || []).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name != null && item.name !== "" ? String(item.name) : "Page",
      item: item.url.startsWith("http")
        ? item.url
        : `${siteUrl}${item.url.startsWith("/") ? "" : "/"}${item.url}`,
    })),
  };
}
