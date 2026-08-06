import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { DoctorCard } from "@/components/smt/DoctorCard";
import { Cta } from "@/components/smt/Cta";
import { bySlug, catalogServiceBySlug, NEURO_INFO_PAGES, NEURO_DISCLAIMER, CLINIC } from "@/lib/data";

export const metadata: Metadata = {
  title: "Неврология и лечение боли в Екатеринбурге | «ПРО спокойствие»",
  description:
    "Невролог в Екатеринбурге: консультации, помощь при мигрени, хронической боли, полинейропатии, боли в спине и шее. Лечебные блокады, ботулинотерапия и мануальная терапия по показаниям. Запись: " + CLINIC.phone + ".",
};

/** Хаб направления «Неврология» (P1). Живёт внутри /uslugi; в NAV не выводится. */
const WHEN_TO_SEE = [
  "Частые головные боли или мигрени",
  "Боли в спине, пояснице или шее, особенно отдающие в конечности",
  "Головокружение, шум в ушах или обмороки",
  "Онемение пальцев, покалывание, слабость в руках или ногах",
  "Проблемы со сном: бессонница или постоянная сонливость",
  "Ухудшение памяти или нарушения речи",
];

const NEURO_SERVICES = [
  { slug: "konsultatsiya-nevrologa", price: "от 3 000 ₽" },
  { slug: "lechebnye-blokady", price: "от 2 500 ₽" },
  { slug: "botulinoterapiya", price: "от 16 500 ₽" },
  { slug: "manualnaya-terapiya", price: "от 5 000 ₽" },
] as const;

const APPOINTMENT_STEPS = [
  { title: "Беседа", text: "Врач внимательно выслушает жалобы, изучит историю болезни и образ жизни. Приём длится 30–40 минут." },
  { title: "Неврологический осмотр", text: "Проверка рефлексов, координации движений, чувствительности и мышечного тонуса." },
  { title: "План помощи", text: "При необходимости — направление на обследования (МРТ, УЗДГ сосудов, анализы) и подбор тактики лечения по показаниям." },
];

export default function NeurologyHubPage() {
  const doctor = bySlug("tadevosyan-ns");
  const consult = catalogServiceBySlug("konsultatsiya-nevrologa");
  return (
    <div className="smt">
      <SiteHeader active="Услуги" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Услуги", href: "/uslugi/" }, { label: "Неврология" }]} />
      <main id="main">
        {/* Hero */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container max-w-[72ch]">
            <p className="smt-eyebrow">Направление · Екатеринбург</p>
            <h1 className="smt-h1 mt-2">Неврология и лечение боли в Екатеринбурге</h1>
            <p className="smt-lead mt-4 smt-muted">
              Консультации невролога, помощь при мигрени, хронической боли, полинейропатии, боли в спине и шее. Подбор лечения и процедур — по показаниям, после очной консультации.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="smt-chip">Доказательный подход</span>
              <span className="smt-chip">С соблюдением врачебной тайны</span>
              <span className="smt-chip">от 3 000 ₽</span>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#zayavka" className="smt-btn smt-btn-primary">Записаться к неврологу</Link>
              <a href={CLINIC.phoneHref} className="smt-btn smt-btn-ghost">{CLINIC.phone}</a>
            </div>
          </div>
        </section>

        {/* Когда обращаться */}
        <section className="smt-section">
          <div className="smt-container">
            <h2 className="smt-h2">Когда обращаться к неврологу</h2>
            <p className="smt-lead mt-3 max-w-[68ch] smt-muted">
              Головная боль, которую привычно «глушат» таблетками, или лёгкое онемение в пальцах могут быть первыми сигналами нарушений. Обратитесь к специалисту, если вас беспокоят:
            </p>
            <ul className="mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
              {WHEN_TO_SEE.map((x) => (
                <li key={x} className="flex gap-2 smt-body smt-muted">
                  <span style={{ color: "var(--smt-blue)" }}>✓</span>{x}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* С чем помогает невролог — инфостраницы */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container">
            <h2 className="smt-h2">С чем помогает невролог</h2>
            <p className="smt-lead mt-3 max-w-[68ch] smt-muted">
              Подробные материалы врача-невролога о частых состояниях — что происходит, когда обращаться и как строится помощь:
            </p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {NEURO_INFO_PAGES.map((p) => (
                <li key={p.slug}>
                  <Link href={`/uslugi/${p.slug}/`} className="smt-card smt-card-pad is-link flex h-full flex-col" aria-label={`Подробнее: ${p.catalogTitle}`}>
                    <h3 className="smt-h3">{p.catalogTitle}</h3>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed smt-muted">{p.lead}</p>
                    <span className="smt-link mt-4 inline-flex">Читать подробнее →</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Головная боль напряжения", "Бессонница и нарушения сна", "Боли в спине и шее", "Головокружение"].map((c) => (
                <span key={c} className="smt-chip">{c}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Услуги направления */}
        <section className="smt-section">
          <div className="smt-container">
            <h2 className="smt-h2">Какие услуги доступны</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {NEURO_SERVICES.map(({ slug, price }) => {
                const s = catalogServiceBySlug(slug);
                if (!s) return null;
                return (
                  <li key={slug}>
                    <Link href={`/uslugi/${slug}/`} className="smt-card smt-card-pad is-link flex h-full flex-col" aria-label={`Подробнее: ${s.title}`}>
                      <h3 className="smt-h3">{s.title}</h3>
                      <p className="mt-2 flex-1 text-[15px] leading-relaxed smt-muted">{s.blurb}</p>
                      <p className="mt-3 text-[14px] font-semibold" style={{ color: "var(--smt-blue)" }}>{price}</p>
                      <span className="smt-link mt-4 inline-flex">Подробнее →</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 max-w-[68ch] text-[13px] smt-muted">
              Процедуры выполняются по назначению врача и по медицинским показаниям — после очной консультации невролога.
            </p>
          </div>
        </section>

        {/* Как проходит приём */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container">
            <h2 className="smt-h2">Как проходит приём</h2>
            <ol className="mt-8 grid gap-5 md:grid-cols-3">
              {APPOINTMENT_STEPS.map((step, i) => (
                <li key={step.title} className="smt-card smt-card-pad">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-bold" style={{ background: "var(--smt-blue-bg)", color: "var(--smt-dark)" }}>{i + 1}</span>
                  <h3 className="mt-3 text-[16px] font-semibold" style={{ color: "var(--smt-dark)" }}>{step.title}</h3>
                  <p className="mt-2 text-[14px] smt-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Подготовка к консультации */}
        {consult?.checklist?.length ? (
          <section className="smt-section">
            <div className="smt-container max-w-[72ch]">
              <h2 className="smt-h2">Подготовка к консультации</h2>
              <p className="smt-lead mt-3 smt-muted">Несколько простых шагов помогут врачу быстрее разобраться в ситуации:</p>
              <ul className="mt-6 space-y-3">
                {consult.checklist.map((item) => (
                  <li key={item} className="flex gap-2 smt-body smt-muted">
                    <span style={{ color: "var(--smt-blue)" }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 smt-body smt-muted">
                Совет врача: если вас беспокоят приступы (головокружение, головная боль, судороги) — заведите мини-дневник. Записывайте время начала, длительность и что вы делали в этот момент: это заметно ускоряет постановку диагноза.
              </p>
            </div>
          </section>
        ) : null}

        {/* Врач */}
        {doctor ? (
          <section className="smt-section smt-section-alt">
            <div className="smt-container">
              <h2 className="smt-h2">Кто вас примет</h2>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <li><DoctorCard d={doctor} /></li>
              </ul>
            </div>
          </section>
        ) : null}

        {/* Disclaimer */}
        <section className="smt-section">
          <div className="smt-container max-w-[72ch]">
            <p className="text-[13px] smt-muted">{NEURO_DISCLAIMER} Имеются противопоказания, необходима консультация специалиста.</p>
          </div>
        </section>

        <Cta title="Записаться к неврологу" topic="Неврология" alt />
      </main>
      <SiteFooter />
    </div>
  );
}
