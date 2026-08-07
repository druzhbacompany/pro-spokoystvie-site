import type { MetadataRoute } from "next";

/** Единственный источник истины для robots (App Router). */
const SITE_URL = "https://pro-spokoystvie.ru";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Технические маршруты. Legacy-превью (/old-home, /hero-v2..v4) отдают 308
      // на «/» — их не запрещаем, чтобы краулеры увидели редирект.
      disallow: ["/api/", "/thanks"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
