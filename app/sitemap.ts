import type { MetadataRoute } from "next";
import { CATALOG_SERVICES, NEURO_INFO_PAGES, SERVICES, DOCTORS, BRANCHES } from "@/lib/data";

/** Canonical base для sitemap (совпадает с metadataBase). */
const SITE_URL = "https://pro-spokoystvie.ru";

/**
 * Только актуальные публичные страницы. НЕ включаем: /programmy (убраны из
 * навигации решением владельца — не продвигаем, но и не noindex), /thanks,
 * /api, legacy-preview (/old-home, /hero-v2..v4). URL без завершающего слэша —
 * канонический вид сайта (trailingSlash:false, отдаёт 200 без редиректа).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: { path: string; priority: number }[] = [
    { path: "", priority: 1.0 },
    { path: "/uslugi", priority: 0.9 },
    { path: "/uslugi/nevrologiya", priority: 0.8 },
    { path: "/uslugi/iv-terapiya", priority: 0.8 },
    { path: "/uslugi/protsedurnyy-kabinet", priority: 0.6 },
    { path: "/vrachi", priority: 0.8 },
    { path: "/tseny", priority: 0.7 },
    { path: "/o-klinike", priority: 0.6 },
    { path: "/kontakty", priority: 0.6 },
    { path: "/dokumenty", priority: 0.5 },
    // Правовые страницы (публичные, низкий приоритет)
    ...[
      "/privacy",
      "/cookies",
      "/user-agreement",
      "/legal",
      "/license",
      "/personal-data-consent",
      "/special-consent",
      "/controlling-authorities",
    ].map((path) => ({ path, priority: 0.3 })),
    // Карточки услуг из каталога прайса
    ...CATALOG_SERVICES.map((s) => ({ path: `/uslugi/${s.slug}`, priority: 0.7 })),
    // Инфостраницы неврологии (P1)
    ...NEURO_INFO_PAGES.map((p) => ({ path: `/uslugi/${p.slug}`, priority: 0.7 })),
    // Инфостраницы состояний (тревога, панические атаки)
    ...SERVICES.filter((s) => s.hasPage).map((s) => ({ path: `/uslugi/${s.slug}`, priority: 0.6 })),
    // Страницы врачей
    ...DOCTORS.map((d) => ({ path: `/vrachi/${d.slug}`, priority: 0.6 })),
    // Филиалы
    ...BRANCHES.map((b) => ({ path: `/filialy/${b.slug}`, priority: 0.5 })),
  ];

  const seen = new Set<string>();
  return entries
    .filter((e) => (seen.has(e.path) ? false : seen.add(e.path)))
    .map((e) => ({
      url: `${SITE_URL}${e.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: e.priority,
    }));
}
