import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyBar } from "@/components/layout/StickyBar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { TagChip } from "@/components/ui/TagChip";
import { TrustSection } from "@/components/blocks/TrustSection";
import { FinalCTA } from "@/components/blocks/FinalCTA";
import {
  SERVICES,
  SERVICE_CATEGORIES,
  PATH,
  FAQ_HOME,
  CLINIC,
  type Service,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Услуги клиники — психиатрия, психотерапия, психология в Екатеринбурге",
  description:
    "Направления помощи клиники «ПРО спокойствие»: тревожное расстройство, панические атаки, депрессия, бессонница, ОКР, поддержка при зависимом поведении, неврология. Конфиденциально, без постановки на учёт.",
};

function ServiceCard({ s }: { s: Service }) {
  const inner = (
    <>
      <Icon name={s.icon as IconName} size={40} className="text-brand" />
      <h3 className="type-h4 mt-5">{s.catalogTitle}</h3>
      <p className="type-body-sm mt-2 text-text-secondary">{s.catalogBlurb}</p>
      {s.hasPage ? (
        <span className="mt-5 inline-flex items-center gap-1.5 font-medium text-brand">
          Подробнее <Icon name="arrow" size={18} />
        </span>
      ) : (
        <span className="mt-5 inline-flex items-center gap-1.5 font-medium text-text-muted">
          Запись по телефону
        </span>
      )}
    </>
  );

  const cardCls = `flex h-full flex-col rounded-card border border-border bg-surface p-6 shadow-sm transition-all duration-[200ms] ease-calm ${
    s.hasPage ? "hover:-translate-y-[2px] hover:shadow-md" : ""
  }`;

  return s.hasPage ? (
    <Link
      href={`/uslugi/${s.slug}/`}
      className={cardCls}
      aria-label={`Подробнее: ${s.catalogTitle}`}
    >
      {inner}
    </Link>
  ) : (
    <div className={cardCls}>{inner}</div>
  );
}

export default function ServicesIndexPage() {
  return (
    <>
      <Header activeNav="Услуги" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Услуги" }]} />

      <main id="main">
        {/* [1] Hero */}
        <section className="warm-field">
          <div className="container-page py-16 md:py-24">
            <div className="settle is-in max-w-measure">
              <p className="type-caption mb-4 text-text-secondary">
                Психическое здоровье · Екатеринбург
              </p>
              <h1 className="type-display">Направления помощи</h1>
              <p className="type-lead mt-6">
                Помогаем при тревоге, панических атаках, сниженном настроении,
                бессоннице и других состояниях — методами с доказанной
                эффективностью. Спокойно и конфиденциально, без постановки на
                учёт.
              </p>
              <span className="horizon-line my-8" aria-hidden />
              <div className="mb-8 flex flex-wrap gap-2">
                <TagChip tone="verified">Конфиденциально</TagChip>
                <TagChip tone="verified">Без постановки на учёт</TagChip>
                <TagChip tone="verified">от 4 000 ₽</TagChip>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="#napravleniya" withArrow>
                  Выбрать направление
                </Button>
                <Button href={CLINIC.phoneHref} variant="ghost" external>
                  Позвонить
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* [2] Catalog grouped by category */}
        <Section id="napravleniya">
          <Reveal>
            <SectionHead
              eyebrow="С чем мы помогаем"
              title="Выберите направление"
              lead="Не уверены, что подойдёт? Оставьте заявку — подберём специалиста и формат под ваш запрос."
            />
          </Reveal>
          <div className="mt-12 space-y-12">
            {SERVICE_CATEGORIES.map((cat) => {
              const items = SERVICES.filter((s) => s.category === cat);
              if (items.length === 0) return null;
              return (
                <div key={cat}>
                  <h3 className="type-h3 mb-6 font-serif">{cat}</h3>
                  <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((s, i) => (
                      <Reveal key={s.slug} delay={(i % 3) * 60} as="li">
                        <ServiceCard s={s} />
                      </Reveal>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Section>

        {/* [3] How we work */}
        <Section alt warmField>
          <Reveal>
            <SectionHead
              eyebrow="Как это устроено"
              title="Один спокойный путь — от звонка до результата"
              lead="Конфиденциально на всех этапах: без постановки на учёт, без записей в личное дело."
            />
          </Reveal>
          <ol className="mt-12 grid gap-8 md:grid-cols-5 md:gap-5">
            {PATH.map((step, i) => (
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

        {/* [4] Trust layer */}
        <Section>
          <TrustSection />
        </Section>

        {/* [5] FAQ */}
        <Section alt>
          <Reveal>
            <div className="mb-10 text-center">
              <span className="horizon-line mx-auto mb-5" aria-hidden />
              <h2 className="type-h2">Частые вопросы</h2>
            </div>
          </Reveal>
          <Accordion items={FAQ_HOME} />
        </Section>

        {/* [6] FinalCTA */}
        <Section>
          <FinalCTA
            title="Не знаете, какое направление выбрать?"
            lead="Оставьте номер — подберём специалиста и удобное время. Конфиденциально, без давления."
          />
        </Section>

        {/* [7] RelatedLinks */}
        <Section alt>
          <h2 className="type-h3 mb-6">Смотрите также</h2>
          <ul className="flex flex-wrap gap-4">
            <li>
              <Link href="/vrachi/" className="text-brand hover:underline">
                Врачи клиники →
              </Link>
            </li>
            <li>
              <Link href="/#kak-prohodit" className="text-brand hover:underline">
                Как проходит лечение →
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
