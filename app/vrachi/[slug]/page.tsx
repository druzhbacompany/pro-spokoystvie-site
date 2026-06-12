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
import { DOCTORS, bySlug, CLINIC, type Doctor } from "@/lib/data";

/**
 * Universal doctor page — /vrachi/[slug]/.
 * Covers the 5 specialists. Romanovsky keeps his bespoke static page
 * (the static segment /vrachi/romanovsky-vo/ wins over this dynamic route).
 *
 * Anti-выдумка / verified-only: renders ONLY confirmed facts (name, specialty,
 * licence, clinic, helps-areas) plus honest temp placeholders. No fabricated
 * biography, quotes, experience, ratings or prices.
 */

export function generateStaticParams() {
  return DOCTORS.filter((d) => d.role !== "chief").map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const doctor = bySlug(params.slug);
  if (!doctor || doctor.role === "chief") return {};
  return {
    title: `${doctor.shortName} — ${doctor.specialty} в Екатеринбурге`,
    description: `${doctor.name} — ${doctor.specialty.toLowerCase()} клиники «ПРО спокойствие», Екатеринбург. Помогает при: ${doctor.helps.join(
      ", ",
    ).toLowerCase()}. Спокойно, конфиденциально, без постановки на учёт. Запись на приём.`,
  };
}

/** Clinic-voice lead derived from specialty — no personal claims fabricated. */
function leadFor(d: Doctor): string {
  const s = d.specialty.toLowerCase();
  if (s.includes("психиатр"))
    return "Психиатрическая и психотерапевтическая помощь — спокойно, конфиденциально и без осуждения.";
  if (s.includes("психолог"))
    return "Психологическая поддержка в спокойном темпе — без давления и без оценок.";
  if (s.includes("невролог"))
    return "Неврологическая помощь, когда тревога и напряжение отзываются в теле.";
  return "Помощь в спокойном темпе — без давления и без осуждения.";
}

/** Shared clinic standard — true for every specialist, not a fabricated personal trait. */
const CLINIC_STANDARD = [
  "Вас выслушают без спешки и без оценок",
  "Объяснят простыми словами, без медицинского жаргона",
  "Конфиденциально — без постановки на учёт",
  "Минимально достаточная помощь, без избыточного лечения",
];

function faqFor(d: Doctor) {
  return [
    {
      q: `С какими состояниями обращаться к специалисту ${d.shortName}?`,
      a: `Основные направления: ${d.helps.join(", ").toLowerCase()}. Если не уверены — подберём формат на первичном приёме.`,
      open: true,
    },
    {
      q: "Меня не будут осуждать и торопить?",
      a: "Нет. Приём построен как спокойный диалог: сначала — понять человека, без оценок и спешки.",
      open: true,
    },
    {
      q: "Поставят ли на учёт?",
      a: "Обращение конфиденциально, без постановки на учёт.",
      open: false,
    },
    {
      q: `Как записаться именно к специалисту ${d.shortName}?`,
      a: "Через форму ниже или по телефону — укажите фамилию специалиста; перезвоним и подтвердим удобное время.",
      open: false,
    },
    {
      q: "Сколько стоит приём?",
      a: d.firstVisit
        ? `${d.firstVisit.name} — ${d.firstVisit.price}. Остальные позиции уточняются по телефону.`
        : "Стоимость приёма уточняется по телефону — назовём актуальную цену и подберём удобное время.",
      open: false,
    },
  ];
}

export default function DoctorPage({ params }: { params: { slug: string } }) {
  const doctor = bySlug(params.slug);
  // Unknown slug, or the chief (served by his own bespoke static page) → 404 here.
  if (!doctor || doctor.role === "chief") notFound();

  return (
    <>
      <Header activeNav="Врачи" />
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Врачи", href: "/vrachi/" },
          { label: doctor.shortName },
        ]}
      />

      <main id="main">
        {/* [1] Doctor Hero — split (photo / data) */}
        <section className="warm-field">
          <div className="container-page py-16 md:py-24">
            <div className="grid items-center gap-10 md:grid-cols-[5fr_7fr] md:gap-14">
              <Reveal>
                <div className="mx-auto w-full max-w-md">
                  <Avatar doctor={doctor} ratio="4/5" priority />
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="max-w-measure">
                  <h1 className="type-display font-serif">{doctor.name}</h1>
                  <p className="type-h3 mt-3 font-sans text-text-secondary">
                    {doctor.specialty}
                  </p>
                  <p className="type-caption mt-2">Клиника «{CLINIC.name}», Екатеринбург</p>
                  <p className="type-lead mt-5">{leadFor(doctor)}</p>
                  <span className="horizon-line my-7" aria-hidden />
                  <div className="flex flex-wrap gap-2">
                    <TagChip tone="verified">Лицензия Минздрава №{CLINIC.license}</TagChip>
                    {doctor.firstVisit ? (
                      <TagChip tone="verified">Приём {doctor.firstVisit.price}</TagChip>
                    ) : null}
                  </div>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button href="#zayavka" withArrow>
                      Записаться на приём
                    </Button>
                    <Button href={CLINIC.phoneHref} variant="ghost" external>
                      {CLINIC.phone}
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* [2] Helps With */}
        <Section alt>
          <Reveal>
            <SectionHead eyebrow="Профиль" title={`С чем помогает ${doctor.shortName}`} />
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            {doctor.helps.map((t) => (
              <TagChip key={t}>{t}</TagChip>
            ))}
          </div>
        </Section>

        {/* [3] Clinic standard — what to expect (brand-level, not fabricated) */}
        <Section>
          <Reveal>
            <SectionHead
              eyebrow="Чего ожидать"
              title="Как проходит приём в клинике"
              lead="Единый стандарт помощи задаёт главный врач — он одинаков для каждого специалиста."
            />
          </Reveal>
          <ul className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            {CLINIC_STANDARD.map((item, i) => (
              <Reveal key={item} delay={i * 50} as="li">
                <div className="flex gap-3 rounded-card border border-border bg-surface p-5 shadow-sm">
                  <Icon name="check" size={22} className="mt-0.5 flex-none text-brand" />
                  <span className="type-body-sm text-text-primary">{item}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* [4] Approach — clinic voice, honest about pending personal data */}
        <Section alt warmField>
          <Reveal>
            <div className="max-w-measure">
              <span className="horizon-line mb-5" aria-hidden />
              <h2 className="type-h2">Подход к работе</h2>
              <div className="type-body mt-6 space-y-4 text-text-secondary">
                <p>
                  Первая встреча — это спокойный диалог, а не экзамен. Специалист
                  не ставит диагноз сразу: сначала важно понять человека и его
                  ситуацию, без оценок и спешки.
                </p>
                <p>
                  В клинике работают методами с доказанной эффективностью. Если
                  состоянию нужна фармакотерапия, её назначает врач — в минимально
                  достаточном объёме, без избыточного лечения.
                </p>
              </div>
              <p className="type-caption mt-5">
                Личный рассказ специалиста о своём подходе добавляется по мере
                верификации данных.
              </p>
            </div>
          </Reveal>
        </Section>

        {/* [5] Experience — verified-only */}
        <Section>
          <Reveal>
            <SectionHead eyebrow="Опыт" title="Опыт работы" />
          </Reveal>
          <div className="mt-8 max-w-2xl overflow-hidden rounded-card border border-border">
            <dl className="divide-y divide-border">
              <div className="grid grid-cols-[auto_1fr] gap-4 bg-surface p-5">
                <dt className="type-body-sm font-medium text-text-primary">н.в.</dt>
                <dd className="type-body-sm text-text-secondary">
                  Клиника «{CLINIC.name}», Екатеринбург — {doctor.specialty.toLowerCase()}
                </dd>
              </div>
            </dl>
          </div>
          <p className="type-caption mt-3">
            Полная хронология опыта добавляется по мере верификации данных.
          </p>
        </Section>

        {/* [6] Education — honest day-1 summary */}
        <Section alt>
          <Reveal>
            <SectionHead eyebrow="Квалификация" title="Образование и квалификация" />
          </Reveal>
          <p className="type-body mt-6 max-w-measure text-text-secondary">
            {doctor.specialty}. Квалификация подтверждается лицензией клиники
            Минздрава Свердловской области. Подробности образования и повышения
            квалификации добавляются по мере подтверждения данных.
          </p>
        </Section>

        {/* [7] Trust Layer */}
        <Section>
          <TrustSection />
        </Section>

        {/* [8] Pricing — verified-only */}
        <Section alt>
          <Reveal>
            <SectionHead eyebrow="Стоимость" title="Стоимость приёма" />
          </Reveal>
          <div className="mt-8 max-w-2xl">
            {doctor.firstVisit ? (
              <div className="flex flex-col gap-4 rounded-card border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="type-h4">{doctor.firstVisit.name}</p>
                  <p className="type-caption mt-1">{doctor.firstVisit.duration}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="type-h4 font-sans">{doctor.firstVisit.price}</span>
                  <Link
                    href="#zayavka"
                    className="inline-flex min-h-[44px] items-center rounded-control border border-border px-4 font-medium text-text-primary hover:bg-bg-alt"
                    aria-label={`Записаться: ${doctor.firstVisit.name}`}
                  >
                    Записаться
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-card border border-border bg-surface p-5 shadow-sm">
                <p className="type-body text-text-secondary">
                  Стоимость приёма уточняется по телефону — назовём актуальную
                  цену и подберём удобное время.
                </p>
                <div className="mt-4">
                  <Button href={CLINIC.phoneHref} variant="ghost" external>
                    {CLINIC.phone}
                  </Button>
                </div>
              </div>
            )}
            <p className="type-caption mt-3">
              Остальные позиции прайса публикуются после утверждения единого
              прайса. Стоимость уточняется по телефону.
            </p>
          </div>
        </Section>

        {/* [9] FAQ */}
        <Section>
          <Reveal>
            <div className="mb-10 text-center">
              <span className="horizon-line mx-auto mb-5" aria-hidden />
              <h2 className="type-h2">Частые вопросы об этом враче</h2>
            </div>
          </Reveal>
          <Accordion items={faqFor(doctor)} />
        </Section>

        {/* [10] FinalCTA — locked to this doctor */}
        <Section alt>
          <FinalCTA
            title={`Записаться к ${doctor.shortName}`}
            lead="Укажите удобное время — перезвоним и подтвердим запись. Конфиденциально, без постановки на учёт."
            lockedDoctor={doctor.slug}
            showDoctorSelect={false}
          />
        </Section>

        {/* [11] RelatedLinks */}
        <Section>
          <h2 className="type-h3 mb-6">Смотрите также</h2>
          <ul className="flex flex-wrap gap-4">
            <li>
              <Link href="/vrachi/" className="text-brand hover:underline">
                Все специалисты →
              </Link>
            </li>
            <li>
              <Link href="/vrachi/romanovsky-vo/" className="text-brand hover:underline">
                Главный врач →
              </Link>
            </li>
            <li>
              <Link href="/#napravleniya" className="text-brand hover:underline">
                Направления помощи →
              </Link>
            </li>
            <li>
              <Link href="/#kontakty" className="text-brand hover:underline">
                Контакты →
              </Link>
            </li>
          </ul>
        </Section>
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
