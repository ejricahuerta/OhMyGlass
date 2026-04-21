import type { PageRecord } from "./pages-schema";

export function getPageMetaStrings(page: PageRecord) {
  const rawTitle = page.title || "";
  const pageTitle = rawTitle.length > 60 ? rawTitle.slice(0, 57) + "..." : rawTitle;
  const rawMeta = page.seo?.meta_description ?? page.title ?? "";
  const metaDescription = rawMeta.length > 160 ? rawMeta.slice(0, 157) + "..." : rawMeta;
  return { pageTitle, metaDescription };
}
