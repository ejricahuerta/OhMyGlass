import pagesJson from "@/data/pages.json";
import { pagesJsonSchema, type PageRecord } from "./pages-schema";

const parsed = pagesJsonSchema.parse(pagesJson);
export const allPages: PageRecord[] = parsed;

const SLUGS_WITH_DEDICATED_ROUTES = ["index", "contact", "free-quote", "resources", "services"];

const SERVICE_LOCATION_BASES = [
  "emergency-glass-repair",
  "storefront-glass-repair",
  "window-glass-replacement",
];

const LOCATION_FIRST_PREFIXES = [
  "north-york",
  "richmond-hill",
  "newmarket",
  "etobicoke",
  "markham",
  "scarborough",
  "mississauga",
  "brampton",
  "toronto",
  "vaughan",
].sort((a, b) => b.length - a.length);

function urlToSlug(url: string): string {
  return url.replace(/\.html$/, "");
}

export function getPageBySlug(slug: string): PageRecord | null {
  const slugClean = urlToSlug(slug);
  return (
    allPages.find((p) => p.url === slugClean || urlToSlug(p.url) === slugClean) ?? null
  );
}

export function getCanonicalSlugIfLocationFirst(slug: string): string | null {
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

export function getContentPageSlugs(): string[] {
  return allPages
    .map((p) => urlToSlug(p.url))
    .filter((slug) => !SLUGS_WITH_DEDICATED_ROUTES.includes(slug));
}

export function getServicePages(): PageRecord[] {
  return allPages.filter((p) => p.type === "service");
}

export function getResourcePages(): PageRecord[] {
  return allPages.filter((p) => p.type === "resource");
}

export function getResourceSlugs(): string[] {
  return getResourcePages().map((p) => urlToSlug(p.url));
}

export function isResourcePage(page: PageRecord | null | undefined): boolean {
  return Boolean(page && page.type === "resource");
}
