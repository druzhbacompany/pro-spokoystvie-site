import type { MetadataRoute } from "next";

/** Единственный источник истины для robots (App Router). */
const SITE_URL = "https://pro-spokoystvie.ru";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Технические и legacy/preview-маршруты (у самих страниц уже стоит robots:{index:false}).
      disallow: ["/api/", "/thanks", "/old-home", "/hero-v2", "/hero-v3", "/hero-v4"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
