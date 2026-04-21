import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getContentPageSlugs, getPageBySlug } from "@/lib/pages-data";
import { getPageMetaStrings } from "@/lib/page-meta";
import { ogImage, siteUrl } from "@/lib/site-data";
import { ContentSlugView } from "@/components/content-slug-view";

export function generateStaticParams() {
  return getContentPageSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) {
    return { title: "Not Found" };
  }
  const { pageTitle, metaDescription } = getPageMetaStrings(page);
  return {
    title: pageTitle,
    description: metaDescription,
    keywords: page.seo?.keywords,
    alternates: { canonical: `${siteUrl}/${slug}` },
    openGraph: {
      title: page.title,
      description: metaDescription,
      url: `${siteUrl}/${slug}`,
      images: [{ url: ogImage }],
      siteName: "OhMyGlass",
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: metaDescription,
      images: [ogImage],
    },
    other: { "fb:app_id": "966242223397117" },
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) {
    redirect("/404");
  }
  return <ContentSlugView page={page} slug={slug} />;
}
