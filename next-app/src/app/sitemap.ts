import type { MetadataRoute } from "next";
import { allPages } from "@/lib/pages-data";

const HOST = "https://www.ohmyglass.ca";
const skipSlugs = new Set(["index", "free-quote"]);

function urlToSlug(url: string): string {
  return url.replace(/\.html$/, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>();
  paths.add("/");
  paths.add("/resources");

  for (const p of allPages) {
    const slug = urlToSlug(p.url);
    if (skipSlugs.has(slug)) continue;
    paths.add("/" + slug);
  }

  const lastModified = new Date();
  return [...paths]
    .sort((a, b) => {
      if (a === "/") return -1;
      if (b === "/") return 1;
      return a.localeCompare(b);
    })
    .map((path) => ({
      url: HOST + path,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path === "/services" ? 0.9 : path === "/resources" ? 0.7 : 0.8,
    }));
}
