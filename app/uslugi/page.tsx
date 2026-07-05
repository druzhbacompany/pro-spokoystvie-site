import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { Cta } from "@/components/smt/Cta";
import { CATALOG_CATEGORIES, CATALOG_SERVICES, IV_GROUPS, serviceBySlug } from "@/lib/data";

export const metadata: Metadata = {
  title: "Услуги и цены клиники — психиатрия, психотерапия, неврология, IV-терапия",
  description:
    "Услуги клиники «ПРО спокойствие» по утверждённому прайсу: приёмы психиатра, психолога, невролога и терапевта, психотерапия, лечебные блокады, ботулинотерапия, IV-терапия. Конфиденциально.",
};

/** Витрина прайса: P0 (PRODUCT_MATRIX_SITE_V1 rev.2). Хабы IV/процедурного — отдельные карточки. */
const HUB_CARDS: Record<string, { href: string; title: string; blurb: string; extra?: string }> = {
  "Неврология": {
    href: "/uslugi/nevrologiya/",
    title: "Неврология и лечение боли — обзор",
    blurb: "Когда обращаться к неврологу, с чем помогает врач, как проходит приём и как подготовиться. Материалы о мигрени, полинейропатии и хронической боли.",
    extra: "направление · 4 услуги",
  },
  "IV-терапия": {
    href: "/uslugi/iv-terapiya/",
    title: "IV-терапия (капельницы)",
    blurb: "Оздоровительные капельницы по назначению врача: восстановление, антистресс, иммунитет, красота и другие программы.",
    extra: `${IV_GROUPS.reduce((n, g) => n + g.items.length, 0)} программ · от 2 500 ₽`,
  },
  "Процедурный кабинет": {
    href: "/uslugi/protsedurnyy-kabinet/",
    title: "Процедурный кабинет",
    blurb: "Внутримышечные и внутривенные инъекции, инфузии — по назначению врача.",
    extra: "от 300 ₽",
  },
};

/** Инфостраницы состояний (сохранены; блок «С чем обращаются»). */
const CONDITION_LINKS = ["trevozhnoe-rasstroistvo", "panicheskie-ataki"] as const;
const CONDITION_CHIPS = ["Депрессия", "Бессонница", "ОКР", "Психосоматика", "Мигрень и головная боль", "Выгорание", "Кризисные состояния"];

export default function ServicesIndexPage() {
  return (
    <div className="smt">
      <SiteHeader active="Услуги" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Услуги" }]} />
      <main id="main">
        <section className="smt-section">
          <div className="smt-container">
            <p className="smt-eyebrow">Прозрачные цены · Екатеринбург</p>
            <h1 className="smt-h1 mt-2">Услуги клиники</h1>
            <p className="smt-lead mt-4 max-w-[68ch] smt-muted">
              Приёмы специалистов, психотерапия, неврология и IV-терапия — по утверждённому прайсу, без скрытых доплат. Не уверены, с чего начать? Оставьте заявку — подберём специалиста.
            </p>

            <div className="mt-10 space-y-12">
              {CATALOG_CATEGORIES.map((cat) => {
                const hub = HUB_CARDS[cat];
                const items = CATALOG_SERVICES.filter((s) => s.category === cat);
                if (!hub && !items.length) return null;
                return (
                  <div key={cat}>
                    <h2 className="smt-h2 mb-5">{cat}</h2>
                    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {hub ? (
                        <li key={hub.href}>
                          <Link href={hub.href} className="smt-card smt-card-pad is-link flex h-full flex-col" aria-label={`Подробнее: ${hub.title}`}>
                            <h3 className="smt-h3">{hub.title}</h3>
                            <p className="mt-2 flex-1 text-[15px] leading-relaxed smt-muted">{hub.blurb}</p>
                            {hub.extra ? <p className="mt-3 text-[14px] font-semibold" style={{ color: "var(--smt-blue)" }}>{hub.extra}</p> : null}
                            <span className="smt-link mt-4 inline-flex">Подробнее →</span>
                          </Link>
                        </li>
                      ) : null}
                      {items.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/uslugi/${s.slug}/`} className="smt-card smt-card-pad is-link flex h-full flex-col" aria-label={`Подробнее: ${s.title}`}>
                            <h3 className="smt-h3">{s.title}</h3>
                            <p className="mt-2 flex-1 text-[15px] leading-relaxed smt-muted">{s.blurb}</p>
                            <p className="mt-3 text-[14px] font-semibold" style={{ color: "var(--smt-blue)" }}>
                              {s.priceRows[0] ? `${s.priceRows[0].price.includes("/") ? "" : "от "}${s.priceRows[0].price}` : ""}
                            </p>
                            <span className="smt-link mt-4 inline-flex">Подробнее →</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* С чем обращаются — состояния (инфостраницы сохранены) */}
            <div className="mt-14 max-w-[880px] smt-card smt-card-pad md:!p-7">
              <h2 className="smt-h3">С чем обращаются</h2>
              <p className="mt-2 smt-body smt-muted">
                Состояние — не услуга: на приёме врач подберёт подходящий формат помощи. Подробнее о частых запросах:
              </p>
              <ul className="mt-4 flex flex-wrap gap-4">
                {CONDITION_LINKS.map((slug) => {
                  const s = serviceBySlug(slug);
                  if (!s || !s.hasPage) return null;
                  return (
                    <li key={slug}>
                      <Link href={`/uslugi/${slug}/`} className="smt-link">{s.catalogTitle} →</Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {CONDITION_CHIPS.map((c) => (<span key={c} className="smt-chip">{c}</span>))}
              </div>
            </div>
          </div>
        </section>
        <Cta alt />
      </main>
      <SiteFooter />
    </div>
  );
}
