import type { Metadata } from "next";
import { getBreadcrumbSchema, safeJsonLdScript } from "@/lib/schema";
import { nap, contact, siteUrl, ogImage } from "@/lib/site-data";
import { ContactPageView } from "@/components/contact-page-view";

const contactBreadcrumbSchema = getBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Contact", url: "/contact" },
]);

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Us - OhMyGlass",
  description:
    "Contact OhMyGlass for professional glass repair and replacement services in the Greater Toronto Area.",
  url: siteUrl + "/contact",
  mainEntity: {
    "@type": "LocalBusiness",
    name: nap.name,
    telephone: nap.telephoneSchema,
    email: [contact.email, contact.secondaryEmail],
    address: {
      "@type": "PostalAddress",
      streetAddress: nap.address.streetAddress,
      addressLocality: nap.address.addressLocality,
      addressRegion: nap.address.addressRegion,
      addressCountry: nap.address.addressCountry,
    },
    url: siteUrl,
  },
};

export const metadata: Metadata = {
  title: "Contact Us - OhMyGlass",
  description:
    "Contact OhMyGlass for any inquiries about our glass repair and replacement services in the Greater Toronto Area (GTA). We're here to help.",
  keywords: ["contact ohmyglass", "glass repair contact", "window replacement contact", "GTA glass services"],
  alternates: { canonical: siteUrl + "/contact" },
  openGraph: {
    title: "Contact OhMyGlass",
    description:
      "Get in touch with OhMyGlass for professional glass services in the Greater Toronto Area. We look forward to hearing from you.",
    url: siteUrl + "/contact",
    images: [{ url: ogImage }],
    siteName: "OhMyGlass",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us",
    description:
      "Get in touch with OhMyGlass for professional glass services in the Greater Toronto Area. We look forward to hearing from you.",
    images: [ogImage],
  },
  other: { "fb:app_id": "966242223397117" },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdScript(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdScript(contactBreadcrumbSchema) }}
      />
      <ContactPageView />
    </>
  );
}
