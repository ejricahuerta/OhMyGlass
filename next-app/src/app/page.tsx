import type { Metadata } from "next";
import { ogImage, siteUrl } from "@/lib/site-data";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = {
  title: "OhMyGlass | Replacement Windows & Glass Repair Toronto & GTA - Free Quote, 24/7",
  description:
    "Replacement windows Toronto & GTA. Glass repair saves 60-80% vs full replacement. Free quote, 24/7 emergency. Window repair, foggy & cracked glass. Call now.",
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
    description:
      "Replacement windows Toronto & GTA. Glass repair saves 60-80% vs full replacement. Free quote, 24/7 emergency. Window repair, foggy & cracked glass.",
    images: [{ url: ogImage }],
    siteName: "OhMyGlass",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "OhMyGlass | Replacement Windows & Glass Repair Toronto & GTA",
    description:
      "Replacement windows Toronto & GTA. Glass repair saves 60-80% vs full replacement. Free quote, 24/7 emergency. Window repair, foggy & cracked glass.",
    images: [ogImage],
  },
  other: { "fb:app_id": "966242223397117" },
};

export default function Page() {
  return <HomePage />;
}
