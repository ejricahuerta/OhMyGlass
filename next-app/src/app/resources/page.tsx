import type { Metadata } from "next";
import type { PageRecord } from "@/lib/pages-schema";
import { getResourcePages, getPageBySlug } from "@/lib/pages-data";
import { siteUrl, ogImage } from "@/lib/site-data";
import { getPageMetaStrings } from "@/lib/page-meta";
import { ResourcesPageView } from "@/components/resources-page-view";

const resourcesHubFallback: PageRecord = {
  url: "resources",
  title: "Resources - OhMyGlass",
  seo: {
    meta_description:
      "Helpful resources for glass repair and replacement in the Greater Toronto Area. Tips, guides, and information from OhMyGlass.",
    keywords: [],
  },
  pagecontent: "",
};

const hubPage = getPageBySlug("resources") ?? resourcesHubFallback;
const { pageTitle, metaDescription } = getPageMetaStrings(hubPage);

export const metadata: Metadata = {
  title: pageTitle,
  description: metaDescription,
  keywords: hubPage.seo?.keywords,
  alternates: { canonical: siteUrl + "/resources" },
  openGraph: {
    title: hubPage.title,
    description: metaDescription,
    url: siteUrl + "/resources",
    images: [{ url: ogImage }],
    siteName: "OhMyGlass",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: hubPage.title,
    description: metaDescription,
    images: [ogImage],
  },
  other: { "fb:app_id": "966242223397117" },
};

export default function ResourcesPage() {
  const resources = getResourcePages();
  return <ResourcesPageView resources={resources} />;
}
