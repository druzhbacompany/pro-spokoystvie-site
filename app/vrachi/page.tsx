import type { Metadata } from "next";
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
import { DoctorsGrid } from "@/components/blocks/DoctorsGrid";
import { TrustSection } from "@/components/blocks/TrustSection";
import { FinalCTA } from "@/components/blocks/FinalCTA";
import { bySlug, CLINIC } from "@/lib/data";

export const metadata: Metadata = {
  title: "Врачи клиники — психиатры, психотерапевты, психологи",
  description:
    "Шесть специалистов клиники «ПРО спокойствие»: психиатры, психотерапевты, психологи и невролог. Главный врач — Романовский В.О. Реальные врачи, лицензия Минздрава.",
};

const FAQ_DOCTORS = [
  {
    q: "Кто главный врач клиники?",
    a: "Романовский Владимир Олегович — главный врач и психотерапевт; он задаёт стандарт помощи и отвечает за работу каждого специалиста.",
    open: true,
  },
  {
    q: "Как понять, к какому врачу записаться?",
    a: "Можно прийти на первичный приём — врач определит профиль и при необходимости подключит коллег. Либо выберите специалиста по теме в карточках выше.",
    open: true,
  },
  {
    q: "Это реальные врачи и реальные фото?",
    a: "Да. Часть портретов мы пока обновляем (профессиональная съёмка), поэтому где-то временно показаны инициалы — но все специалисты реальны и работают в клинике.",
    open: false,
  },
  {
    q: "Поставят ли на учёт?",
    a: "Обращение конфиденциально, без постановки на учёт.",
    open: false,
  },
  {
    q: "Можно ли выбрать конкретного врача?",
    a: "Да — при записи можно указать специалиста; если он занят, предложим коллегу того же профиля.",
    open: false,
  },
  {
    q: "Чем психиатр отличается от психолога?",
    a: "Психиатр — врач, может назначать лечение; психолог работает методами беседы и поддержки. Если не уверены — начните с первичного приёма, дальше подскажем.",
    open: false,
  },
];

const TEAM_PILLARS = [
  { icon: "shield" as const, label: "Психиатрия и психотерапия", text: "Медикаментозно и без — по необходимости." },
  { icon: "cloud" as const, label: "Психология", text: "Поддержка и работа со смыслами." },
  { icon: "body" as const, label: "Неврология", text: "Когда отзывается тело и нервная система." },
];

const WORK_STEPS = [
  { title: "Первичный приём", text: "Врач выслушивает и определяет профиль вашего состояния." },
  { title: "Подбор специалиста", text: "Если нужно, подключаем психотерапевта, психолога или невролога." },
  { title: "Совместное ведение", text: "Врачи согласуют тактику между собой; стандарт задаёт главный врач." },
  { title: "Ваш темп", text: "Никакого давления — вы решаете, как двигаться дальше." },
];

export default function DoctorsIndexPage() {
  const chief = bySlug("romanovsky-vo");
  const featured = bySlug("dvornikova-ea");
  if (!chief || !featured) return null;

  return (
    <>
      <Header activeNav="Врачи" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Врачи" }]} />

      <main id="main">
        {/* [1] Hero */}
        <section className="warm-field">
          <div className="container-page py-16 md:py-24">
            <div className="settle is-in max-w-measure">
              <p className="type-caption mb-4 text-text-secondary">Наши врачи</p>
              <h1 className="type-display">
                Команда, которой можно доверить своё состояние
              </h1>
              <p className="type-lead mt-6">
                Шесть специалистов клиники «ПРО спокойствие»: психиатры,
                психотерапевты, психологи и невролог. Реальные врачи, лицензия
                Минздрава, единый стандарт помощи — спокойно и без осуждения.
              </p>
              <span className="horizon-line my-8" aria-hidden />
              <div className="mb-8 flex flex-wrap gap-2">
                <TagChip tone="verified">Лицензия Минздрава</TagChip>
                <TagChip tone="verified">6 специалистов</TagChip>
                <TagChip tone="verified">Психиатрия · психотерапия · психология</TagChip>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="#chief" withArrow>
                  Познакомиться с врачами
                </Button>
                <Button href={CLINIC.phoneHref} variant="ghost" external>
                  Позвонить
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* [2] Chief Doctor Section — Романовский (главный блок) */}
        <Section id="chief" alt warmField>
          <div className="grid items-center gap-10 md:grid-cols-[5fr_7fr] md:gap-14">
            <Reveal>
              <div className="mx-auto w-full max-w-md">
                <Avatar doctor={chief} ratio="4/5" />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="max-w-measure">
                <p className="type-eyebrow mb-3">Главный врач клиники</p>
                <span className="horizon-line mb-5" aria-hidden />
                <h2 className="type-display font-serif">{chief.name}</h2>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-tag bg-pine-100 px-3 py-1.5 text-sm font-medium text-pine-700">
                  <Icon name="shield" size={16} />
                  {chief.statusBadge}
                </span>
                <p className="type-lead mt-4">
                  {chief.specialty}. Ведёт клинику и отвечает за стандарт помощи
                  каждого специалиста.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {chief.helps.map((h) => (
                    <TagChip key={h}>{h}</TagChip>
                  ))}
                </div>
                <blockquote className="type-lead mt-6 border-l-2 border-brand-soft pl-5 italic text-text-secondary">
                  «Моя задача — чтобы человек ушёл от нас спокойнее, чем пришёл.
                  Без осуждения, без давления, минимально достаточными
                  средствами.»
                </blockquote>
                <p className="type-caption mt-5">
                  Лицензия Минздрава №{CLINIC.license} · Психиатрия и психотерапия
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button href="/vrachi/romanovsky-vo/#zayavka">
                    Записаться к главному врачу
                  </Button>
                  <Button href="/vrachi/romanovsky-vo/" variant="ghost" withArrow>
                    Подробнее о враче
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* [3] Team Overview */}
        <Section>
          <Reveal>
            <SectionHead
              eyebrow="Команда"
              title="Мультидисциплинарная команда — один стандарт помощи"
              lead="Психиатры, психотерапевты, клинические психологи и невролог работают вместе. Если ваше состояние на стыке профилей — вас не отправят «по кругу»: врачи ведут пациента сообща."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TEAM_PILLARS.map((p, i) => (
              <Reveal key={p.label} delay={i * 60}>
                <div className="flex gap-4 rounded-card border border-border bg-surface p-6 shadow-sm">
                  <Icon name={p.icon} size={32} className="flex-none text-brand" />
                  <div>
                    <h3 className="type-h4">{p.label}</h3>
                    <p className="type-body-sm mt-1 text-text-secondary">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="type-caption mt-6">
            Стандарт помощи задаёт главный врач {chief.shortName}.
          </p>
        </Section>

        {/* [4] Featured Doctor Layer — Дворникова (visual featured) */}
        <Section alt>
          <div className="grid items-center gap-10 md:grid-cols-[5fr_7fr] md:gap-14">
            <Reveal>
              <div className="mx-auto w-full max-w-sm">
                <Avatar doctor={featured} ratio="3/4" />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="max-w-measure">
                <p className="type-eyebrow mb-3">Познакомьтесь ближе</p>
                <span className="horizon-line mb-5" aria-hidden />
                <h2 className="type-h2 font-serif">{featured.name}</h2>
                <p className="type-lead mt-2">{featured.specialty}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.helps.map((h) => (
                    <TagChip key={h}>{h}</TagChip>
                  ))}
                </div>
                <blockquote className="type-lead mt-6 border-l-2 border-brand-soft pl-5 italic text-text-secondary">
                  «Тревога — не слабость характера. У неё есть причины, и с ними
                  можно работать спокойно, в вашем темпе.»
                </blockquote>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* [5] Doctors Grid */}
        <Section id="team">
          <Reveal>
            <SectionHead eyebrow="Специалисты" title="Шесть врачей клиники" />
          </Reveal>
          <div className="mt-10">
            <DoctorsGrid />
          </div>
        </Section>

        {/* [6] How We Work Together */}
        <Section alt warmField>
          <Reveal>
            <SectionHead
              eyebrow="Как мы работаем"
              title="Как мы ведём пациента"
              lead="Снимаем страх «попаду не к тому». Команда работает согласованно под рукой главного врача."
            />
          </Reveal>
          <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-5">
            {WORK_STEPS.map((step, i) => (
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
        </Section>

        {/* [7] Trust Layer */}
        <Section>
          <TrustSection />
        </Section>

        {/* [8] FAQ */}
        <Section alt>
          <Reveal>
            <div className="mb-10 text-center">
              <span className="horizon-line mx-auto mb-5" aria-hidden />
              <h2 className="type-h2">Частые вопросы о врачах</h2>
            </div>
          </Reveal>
          <Accordion items={FAQ_DOCTORS} />
        </Section>

        {/* [9] FinalCTA */}
        <Section>
          <FinalCTA
            title="Записаться на консультацию"
            lead="Укажите специалиста или доверьте выбор нам — подберём подходящего врача и удобное время."
          />
        </Section>

        {/* [10] RelatedLinks */}
        <Section alt>
          <h2 className="type-h3 mb-6">Смотрите также</h2>
          <ul className="flex flex-wrap gap-4">
            <li>
              <Link href="/#napravleniya" className="text-brand hover:underline">
                Направления помощи →
              </Link>
            </li>
            <li>
              <Link href="/#kak-prohodit" className="text-brand hover:underline">
                Как проходит лечение →
              </Link>
            </li>
            <li>
              <Link href="/#kontakty" className="text-brand hover:underline">
                Как нас найти →
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
