import type { Metadata } from "next";
import { homeHeroSub, ogImage, siteUrl } from "@/lib/site-data";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = {
  title: "OhMyGlass | Replacement Windows & Glass Repair Toronto & GTA - Free Quote, 24/7",
  description: homeHeroSub,
  keywords: [
    "glass repair",
    "window repair",
    "broken glass repair",
    "cracked window repair",
    "foggy window repair",
    "emergency glass repair",
    "glass repair toronto",
    "glass repair GTA",
    "window repair toronto",
    "storefront glass repair",
    "residential glass repair",
    "commercial glass repair",
    "glass repair vs replacement",
  ],
  alternates: { canonical: siteUrl + "/" },
  openGraph: {
    type: "website",
    url: siteUrl + "/",
    title: "OhMyGlass | Replacement Windows & Glass Repair Toronto & GTA - Free Quote, 24/7",
    description: homeHeroSub,
    images: [{ url: ogImage }],
    siteName: "OhMyGlass",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "OhMyGlass | Replacement Windows & Glass Repair Toronto & GTA",
    description: homeHeroSub,
    images: [ogImage],
  },
  other: { "fb:app_id": "966242223397117" },
};

export default function Page() {
  return <HomePage />;
}
