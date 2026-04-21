import type { Metadata } from "next";
import type { PageRecord } from "@/lib/pages-schema";
import { getPageBySlug } from "@/lib/pages-data";
import { siteUrl, ogImage } from "@/lib/site-data";
import { getPageMetaStrings } from "@/lib/page-meta";
import { ServicesPageView } from "@/components/services-page-view";

const servicesFallback: PageRecord = {
  url: "services",
  title: "Our Glass Repair Services - OhMyGlass",
  seo: {
    meta_description:
      "Explore the comprehensive glass repair and replacement services offered by OhMyGlass.",
    keywords: [],
  },
  pagecontent: "",
};

const servicesPage = getPageBySlug("services") ?? servicesFallback;
const { pageTitle, metaDescription } = getPageMetaStrings(servicesPage);

export const metadata: Metadata = {
  title: pageTitle,
  description: metaDescription,
  keywords: servicesPage.seo?.keywords,
  alternates: { canonical: siteUrl + "/services" },
  openGraph: {
    title: servicesPage.title,
    description: metaDescription,
    url: siteUrl + "/services",
    images: [{ url: ogImage }],
    siteName: "OhMyGlass",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Glass Repair Services Toronto & GTA",
    description: metaDescription,
    images: [ogImage],
  },
  other: { "fb:app_id": "966242223397117" },
};

export default function ServicesPage() {
  const serviceAreasPage = getPageBySlug("service-areas");
  const serviceAreaLocations = serviceAreasPage?.service_area_locations ?? [];
  const locations = Array.isArray(serviceAreaLocations) ? serviceAreaLocations : [];

  return <ServicesPageView serviceAreaLocations={locations} />;
}
