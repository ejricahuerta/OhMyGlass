import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/401.html", "/404.html"],
    },
    sitemap: "https://www.ohmyglass.ca/sitemap.xml",
  };
}
