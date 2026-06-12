import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyBar } from "@/components/layout/StickyBar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { TagChip } from "@/components/ui/TagChip";
import { Avatar } from "@/components/ui/Avatar";
import { TrustSection } from "@/components/blocks/TrustSection";
import { FinalCTA } from "@/components/blocks/FinalCTA";
import { SERVICES, serviceBySlug, bySlug, CLINIC } from "@/lib/data";

/**
 * Universal service page — /uslugi/[slug]/.
 * Naследует SERVICE_PAGE.md + SCREEN_SPEC_TREVOZHNOE / PANICHESKIE_ATAKI.
 * Verified-only copy, анти-нагнетание, без нарко-фрейминга. Reviews скрыты Day-1.
 */

const FIRST_APPOINTMENT = [
  {
    title: "Администратор встретит вас на ресепшене",
    text: "Скажите только своё имя. Больше ничего не нужно, документы не обязательны.",
  },
  {
    title: "Беседа с врачом, 40–50 минут",
    text: "Врач расспросит о состоянии и вашем запросе. Только то, что поможет разобраться. Всё сказанное остаётся конфиденциальным.",
  },
  {
    title: "Подбор индивидуального плана",
    text: "Врач предложит конкретный план: что делать, как часто встречаться, сколько стоит. Вы сможете задать любые вопросы.",
  },
  {
    title: "Запись на следующую встречу — если захотите",
    text: "Никакого принуждения. Вы уходите с пониманием ситуации и решаете сами.",
  },
];

export function generateStaticParams() {
  return SERVICES.filter((s) => s.hasPage).map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = serviceBySlug(params.slug);
  if (!s || !s.hasPage) return {};
  return { title: s.metaTitle, description: s.metaDescription };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = serviceBySlug(params.slug);
  if (!s || !s.hasPage) notFound();

  const doctors = (s.doctorSlugs ?? []).map(bySlug).filter(Boolean) as NonNullable<
    ReturnType<typeof bySlug>
  >[];
  const featured = doctors[0];
  const others = doctors.slice(1);

  return (
    <>
      <Header activeNav="Услуги" />
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Услуги", href: "/uslugi/" },
          { label: s.catalogTitle },
        ]}
      />

      <main id="main">
        {/* [1] Service Hero — text-left, warm field, signature horizon */}
        <section className="warm-field">
          <div className="container-page py-16 md:py-24">
            <div className="settle is-in max-w-measure">
              <p className="type-eyebrow mb-3">Психическое здоровье · Екатеринбург</p>
              <h1 className="type-display">{s.h1}</h1>
              <p className="type-lead mt-5">{s.lead}</p>
              <span className="horizon-line my-7" aria-hidden />
              <div className="mb-8 flex flex-wrap gap-2">
                <TagChip tone="verified">Конфиденциально</TagChip>
                <TagChip tone="verified">Без постановки на учёт</TagChip>
                {s.priceFrom ? <TagChip tone="verified">{s.priceFrom}</TagChip> : null}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="#recognition" withArrow>
                  Понять, с чего начать
                </Button>
                <Button href={CLINIC.phoneHref} variant="ghost" external>
                  Позвонить
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* [2] Symptom Recognition — «Это про вас?» */}
        <Section id="recognition" alt>
          <Reveal>
            <SectionHead eyebrow="Узнаёте себя?" title="Это про вас?" lead="Обратитесь к нам, если вы переживаете:" />
          </Reveal>
          <ul className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            {s.symptoms?.map((item, i) => (
              <Reveal key={item} delay={(i % 2) * 50} as="li">
                <div className="flex gap-3">
                  <Icon name="check" size={22} className="mt-0.5 flex-none text-brand-soft" />
                  <span className="type-body text-text-primary">{item}</span>
                </div>
              </Reveal>
            ))}
          </ul>
          {s.recognitionBridge ? (
            <p className="type-lead mt-8 max-w-measure">
              {s.recognitionBridge}{" "}
              <Link href="#treatment" className="text-brand hover:underline">
                Как мы помогаем →
              </Link>
            </p>
          ) : null}
        </Section>

        {/* [2a] Grounding врезка (panic only) */}
        {s.grounding ? (
          <Section>
            <Reveal>
              <div className="mx-auto max-w-measure rounded-card border border-border bg-surface-warm p-7 shadow-sm">
                <p className="type-h4 flex items-center gap-2">
                  <Icon name="leaf" size={22} className="text-brand" />
                  {s.grounding.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {s.grounding.items.map((item) => (
                    <li key={item} className="type-body text-text-secondary" style={{ lineHeight: 1.65 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </Section>
        ) : null}

        {/* [3] When to seek help */}
        <Section alt={!s.grounding}>
          <Reveal>
            <SectionHead eyebrow="Ориентир" title="Когда стоит обратиться" />
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-card border border-border bg-surface p-7 shadow-sm">
                <h3 className="type-h4 flex items-center gap-2">
                  <Icon name="path" size={22} className="text-brand" />
                  Стоит прийти, если…
                </h3>
                <ul className="mt-4 space-y-3">
                  {s.seekNow?.map((item) => (
                    <li key={item} className="flex gap-3 type-body-sm text-text-secondary">
                      <Icon name="check" size={20} className="mt-0.5 flex-none text-brand-soft" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="h-full rounded-card border border-border bg-surface p-7 shadow-sm">
                <h3 className="type-h4 flex items-center gap-2">
                  <Icon name="leaf" size={22} className="text-brand" />
                  Можно начать с малого, если…
                </h3>
                <ul className="mt-4 space-y-3">
                  {s.seekSmall?.map((item) => (
                    <li key={item} className="flex gap-3 type-body-sm text-text-secondary">
                      <Icon name="check" size={20} className="mt-0.5 flex-none text-brand-soft" />
                      {item}
                    </li>
                  ))}
                </ul>
                {s.seekSmallNote ? (
                  <p className="type-caption mt-5 text-text-secondary">{s.seekSmallNote}</p>
                ) : null}
              </div>
            </Reveal>
          </div>
        </Section>

        {/* [4] Treatment approach + SEO layer */}
        <Section alt warmField>
          <Reveal>
            <SectionHead eyebrow="Как мы помогаем" title={s.treatmentTitle ?? ""} lead={s.treatmentLead} />
          </Reveal>
          <ol className="mt-10 grid gap-8 md:grid-cols-5 md:gap-5">
            {s.steps?.map((step, i) => (
              <Reveal key={step.title} delay={i * 70} as="li">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-soft font-serif text-xl text-brand">
                    {i + 1}
                  </span>
                  <h3 className="type-h4 mt-4">{step.title}</h3>
                  <p className="type-body-sm mt-2 text-text-secondary">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          {s.treatmentNote ? (
            <p className="type-body mt-8 max-w-measure text-text-secondary">{s.treatmentNote}</p>
          ) : null}

          {/* SEO disclosure — causes / symptoms */}
          <div className="mt-12 max-w-measure">
            <h3 className="type-h3 font-serif">{s.causesTitle}</h3>
            {s.icd ? (
              <p className="type-caption mt-2 text-text-muted">Код по МКБ-10: {s.icd}</p>
            ) : null}
            <div className="type-body mt-5 space-y-4 text-text-secondary">
              {s.causes?.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            {s.symptomsPsy || s.symptomsPhys ? (
              <div className="mt-8">
                <h3 className="type-h3 font-serif">{s.manifestTitle}</h3>
                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  {s.symptomsPsy ? (
                    <div>
                      <h4 className="type-h4">Психологические</h4>
                      <ul className="mt-3 space-y-1.5 type-body-sm text-text-secondary">
                        {s.symptomsPsy.map((x) => (
                          <li key={x}>· {x}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {s.symptomsPhys ? (
                    <div>
                      <h4 className="type-h4">Физические</h4>
                      <ul className="mt-3 space-y-1.5 type-body-sm text-text-secondary">
                        {s.symptomsPhys.map((x) => (
                          <li key={x}>· {x}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {s.manifestText ? (
              <div className="mt-8">
                <h3 className="type-h3 font-serif">{s.manifestTitle}</h3>
                <p className="type-body mt-5 text-text-secondary">{s.manifestText}</p>
              </div>
            ) : null}
          </div>
          <p className="type-caption mt-6 max-w-measure text-text-muted">
            Тексты раздела «Причины / Проявления» проходят финальную редактуру
            врачом перед публикацией.
          </p>
        </Section>

        {/* [5] First Appointment Journey */}
        <Section>
          <Reveal>
            <SectionHead eyebrow="Без неизвестности" title="Что будет на первом приёме" />
          </Reveal>
          <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-5">
            {FIRST_APPOINTMENT.map((step, i) => (
              <Reveal key={step.title} delay={i * 70} as="li">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-soft font-serif text-xl text-brand">
                    {i + 1}
                  </span>
                  <h3 className="type-h4 mt-4">{step.title}</h3>
                  <p className="type-body-sm mt-2 text-text-secondary">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="mt-8">
            <Link href="#zayavka" className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline">
              Записаться на консультацию <Icon name="arrow" size={18} />
            </Link>
          </div>
        </Section>

        {/* [6] Trust Layer */}
        <Section alt>
          <TrustSection />
        </Section>

        {/* [7] Doctor Layer — кто вас примет */}
        {featured ? (
          <Section>
            <Reveal>
              <SectionHead eyebrow="Кто вас примет" title="Профильные специалисты" />
            </Reveal>
            <div className="mt-10 grid items-center gap-10 md:grid-cols-[5fr_7fr] md:gap-14">
              <Reveal>
                <div className="mx-auto w-full max-w-sm">
                  <Avatar doctor={featured} ratio="3/4" />
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="max-w-measure">
                  <h3 className="type-h2 font-serif">{featured.name}</h3>
                  <p className="type-lead mt-2">{featured.specialty}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featured.helps.map((h) => (
                      <TagChip key={h}>{h}</TagChip>
                    ))}
                  </div>
                  {featured.href ? (
                    <div className="mt-6">
                      <Button href={featured.href} variant="ghost" withArrow>
                        Подробнее о враче
                      </Button>
                    </div>
                  ) : null}
                </div>
              </Reveal>
            </div>

            {others.length ? (
              <>
                <p className="type-body mt-12 text-text-secondary">
                  Также по этому направлению принимают:
                </p>
                <ul className="mt-5 grid gap-6 sm:grid-cols-2">
                  {others.map((d) => (
                    <li
                      key={d.slug}
                      className="flex flex-col rounded-card border border-border bg-surface p-6 shadow-sm"
                    >
                      <h4 className="type-h4 font-serif">{d.name}</h4>
                      <p className="type-caption mt-1">{d.specialty}</p>
                      {d.href ? (
                        <Link
                          href={d.href}
                          className="mt-4 inline-flex items-center gap-1.5 font-medium text-brand hover:underline"
                        >
                          Подробнее <Icon name="arrow" size={18} />
                        </Link>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <div className="mt-8">
              <Link href="/vrachi/" className="text-brand hover:underline">
                Все специалисты →
              </Link>
            </div>
          </Section>
        ) : null}

        {/* [8] Pricing — verified-only */}
        <Section alt>
          <Reveal>
            <SectionHead eyebrow="Стоимость" title="Стоимость" lead="Фиксированная цена — без скрытых доплат." />
          </Reveal>
          <div className="mt-8 max-w-2xl space-y-4">
            {s.pricing?.map((row) => (
              <div
                key={row.name}
                className="flex flex-col gap-4 rounded-card border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="type-h4">{row.name}</p>
                  <p className="type-caption mt-1">{row.duration}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="type-h4 font-sans tabular-nums">{row.price}</span>
                  <Link
                    href="#zayavka"
                    className="inline-flex min-h-[44px] items-center rounded-control border border-border px-4 font-medium text-text-primary hover:bg-bg-alt"
                    aria-label={`Записаться: ${row.name}`}
                  >
                    Записаться
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {s.pricingNote ? <p className="type-caption mt-3 max-w-2xl">{s.pricingNote}</p> : null}
          <p className="type-caption mt-2">
            <Link href="/tseny/" className="text-brand hover:underline">
              Полный прайс →
            </Link>
          </p>
        </Section>

        {/* [9] FAQ */}
        <Section>
          <Reveal>
            <div className="mb-10 text-center">
              <span className="horizon-line mx-auto mb-5" aria-hidden />
              <h2 className="type-h2">Частые вопросы</h2>
            </div>
          </Reveal>
          {s.faq ? <Accordion items={s.faq} /> : null}
        </Section>

        {/* [10] FinalCTA — single form, topic prefilled via title */}
        <Section alt>
          <FinalCTA
            title="Записаться на консультацию"
            lead={`Тема: ${s.catalogTitle}. Укажите удобное время — перезвоним и подтвердим запись. Конфиденциально, без постановки на учёт.`}
          />
        </Section>

        {/* [11] RelatedLinks */}
        <Section>
          <h2 className="type-h3 mb-6">Смотрите также</h2>
          <ul className="flex flex-wrap gap-4">
            {s.related?.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="text-brand hover:underline">
                  {r.label} →
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
