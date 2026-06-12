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
import { TrustSection } from "@/components/blocks/TrustSection";
import { FinalCTA } from "@/components/blocks/FinalCTA";
import { bySlug, CLINIC } from "@/lib/data";

const doctor = bySlug("romanovsky-vo")!;

export const metadata: Metadata = {
  title: `${doctor.shortName} — главный врач, психиатр и психотерапевт`,
  description:
    "Романовский Владимир Олегович — главный врач и собственник клиники «ПРО спокойствие», врач-психиатр и психотерапевт. Спокойный подход без давления и осуждения. Запись на приём.",
};

const WHY_CHOOSE = [
  "Объясняет простыми словами — без медицинского жаргона",
  "Не торопит и не давит — есть время рассказать всё",
  "Подбирает минимально достаточную фармакотерапию, без избыточного лечения",
  "Работает и с близкими — не только с самим человеком",
];

const METHODS = ["КПТ", "Фармакотерапия", "Поддержка ремиссии"];

const FAQ_DOC = [
  {
    q: "Романовский — главный врач, он принимает пациентов?",
    a: "Да. Несмотря на то что Владимир Олегович руководит клиникой, он ведёт приём как психиатр и психотерапевт.",
    open: true,
  },
  {
    q: "Он не будет давить и осуждать?",
    a: "Нет. Приём построен как диалог: сначала — понять человека, без оценок и спешки.",
    open: true,
  },
  {
    q: "С какими состояниями к нему идти?",
    a: "Зависимое поведение, тревога, паника, ОКР, неврозы, семейные вопросы. Если не уверены — подберём формат на первичном приёме.",
    open: false,
  },
  {
    q: "Поставят ли на учёт?",
    a: "Обращение конфиденциально, без постановки на учёт.",
    open: false,
  },
  {
    q: "Назначит ли он сразу таблетки?",
    a: "Только если это необходимо, и в минимально достаточной дозе; часто помощь начинается с психотерапии.",
    open: false,
  },
  {
    q: "Как записаться именно к нему?",
    a: "Через форму ниже или по телефону — укажите, что хотите к Романовскому В.О.; перезвоним и подтвердим время.",
    open: false,
  },
];

export default function RomanovskyPage() {
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
        {/* [1] Doctor Hero — Chief (апекс доверия) */}
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
                  <span className="mt-4 inline-flex items-center gap-1.5 rounded-tag bg-pine-100 px-3 py-1.5 text-sm font-medium text-pine-700">
                    <Icon name="shield" size={16} />
                    {doctor.statusBadge} «{CLINIC.name}»
                  </span>
                  <p className="type-lead mt-5">
                    Помогаю людям возвращать спокойствие — без давления и
                    осуждения.
                  </p>
                  <span className="horizon-line my-7" aria-hidden />
                  <div className="flex flex-wrap gap-2">
                    <TagChip tone="verified">Лицензия Минздрава №{CLINIC.license}</TagChip>
                    <TagChip tone="verified">Приём от 4 000 ₽</TagChip>
                  </div>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button href="#zayavka" withArrow>
                      Записаться к главному врачу
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
            <SectionHead eyebrow="Профиль" title="С чем помогает Владимир Олегович" />
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Зависимое поведение", "Поддержка ремиссии", "ОКР", "Тревога", "Паника", "Неврозы", "Семейная терапия"].map(
              (t) => (
                <TagChip key={t}>{t}</TagChip>
              ),
            )}
          </div>
        </Section>

        {/* [3] Why Patients Choose */}
        <Section>
          <Reveal>
            <SectionHead
              eyebrow="Почему выбирают"
              title="Почему пациенты выбирают этого врача"
            />
          </Reveal>
          <ul className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            {WHY_CHOOSE.map((item, i) => (
              <Reveal key={item} delay={i * 50} as="li">
                <div className="flex gap-3 rounded-card border border-border bg-surface p-5 shadow-sm">
                  <Icon name="check" size={22} className="mt-0.5 flex-none text-brand" />
                  <span className="type-body-sm text-text-primary">{item}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* [4] How I Work */}
        <Section alt warmField>
          <Reveal>
            <div className="max-w-measure">
              <span className="horizon-line mb-5" aria-hidden />
              <h2 className="type-h2">Как я работаю</h2>
              <div className="type-body mt-6 space-y-4 text-text-secondary">
                <p>
                  Я исхожу из того, что тревога, депрессия или зависимое
                  поведение — не слабость характера, а состояние, у которого есть
                  причины. Моя задача — помочь разобраться в них и вместе найти
                  путь, который подойдёт именно вам.
                </p>
                <p>
                  Первая встреча — это диалог, а не экзамен. Я не ставлю диагноз
                  сразу — сначала стараюсь понять человека. Работаю методами с
                  доказанной эффективностью; если нужна фармакотерапия — подбираю
                  минимально достаточную дозу.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {METHODS.map((m) => (
                  <TagChip key={m}>{m}</TagChip>
                ))}
              </div>
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
                  Клиника «ПРО спокойствие», Екатеринбург — главный врач,
                  психиатр и психотерапевт
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
            Врач-психиатр, психотерапевт. Квалификация подтверждается лицензией
            клиники Минздрава Свердловской области. Подробности образования и
            повышения квалификации добавляются по мере подтверждения данных.
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
            <div className="flex flex-col gap-4 rounded-card border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="type-h4">Первичный приём психиатра</p>
                <p className="type-caption mt-1">40 минут</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="type-h4 font-sans">от 4 000 ₽</span>
                <Link
                  href="#zayavka"
                  className="inline-flex min-h-[44px] items-center rounded-control border border-border px-4 font-medium text-text-primary hover:bg-bg-alt"
                  aria-label="Записаться: первичный приём психиатра"
                >
                  Записаться
                </Link>
              </div>
            </div>
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
          <Accordion items={FAQ_DOC} />
        </Section>

        {/* [10] FinalCTA — locked to Romanovsky */}
        <Section alt>
          <FinalCTA
            title="Записаться к Романовскому В.О."
            lead="Укажите удобное время — перезвоним и подтвердим запись. Конфиденциально, без постановки на учёт."
            lockedDoctor="romanovsky-vo"
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
