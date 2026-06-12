import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyBar } from "@/components/layout/StickyBar";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { HomeHero } from "@/components/blocks/HomeHero";
import { FeaturedDoctor } from "@/components/blocks/FeaturedDoctor";
import { TrustSection } from "@/components/blocks/TrustSection";
import { ContactsPreview } from "@/components/blocks/ContactsPreview";
import { FinalCTA } from "@/components/blocks/FinalCTA";
import { SEGMENTS, PROBLEMS, PATH, FAQ_HOME, BOOKING_ANCHOR } from "@/lib/data";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* [1] Hero «Тёплый горизонт» */}
        <HomeHero />

        {/* [2] HelpSegments — «С чего начать» */}
        <Section id="s-chego-nachat" alt>
          <Reveal>
            <SectionHead eyebrow="С чего начать" title="Подскажем, какой формат вам подойдёт" />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {SEGMENTS.map((seg, i) => (
              <Reveal key={seg.title} delay={i * 60} as="div">
                <Link
                  href={BOOKING_ANCHOR}
                  className="flex h-full flex-col rounded-card border border-border bg-surface p-7 shadow-sm transition-all duration-[200ms] ease-calm hover:-translate-y-[2px] hover:shadow-md"
                >
                  <Icon name={seg.icon as IconName} size={44} className="text-brand" />
                  <h3 className="type-h4 mt-5">{seg.title}</h3>
                  <p className="type-body-sm mt-2 text-text-secondary">{seg.text}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* [3] ProblemsGrid — «С чем мы помогаем» */}
        <Section id="napravleniya">
          <Reveal>
            <SectionHead
              eyebrow="С чем мы помогаем"
              title="Узнаёте своё состояние?"
              lead="Человеческими словами, без клинических ярлыков. Выберите близкое — и оставьте заявку, мы подберём специалиста."
            />
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 50} as="li">
                <Link
                  href={BOOKING_ANCHOR}
                  className="flex h-full flex-col rounded-card border border-border bg-surface p-6 shadow-sm transition-all duration-[200ms] ease-calm hover:-translate-y-[2px] hover:shadow-md"
                >
                  <Icon name={p.icon as IconName} size={36} className="text-brand" />
                  <h3 className="type-h4 mt-4">{p.title}</h3>
                  <p className="type-body-sm mt-2 text-text-secondary">{p.text}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* [4] TreatmentPath — «Как проходит лечение» */}
        <Section id="kak-prohodit" alt warmField>
          <Reveal>
            <SectionHead
              eyebrow="Как проходит лечение"
              title="Пять понятных шагов — без неизвестности"
              lead="Конфиденциально на всех этапах: без постановки на учёт, без записей в личное дело."
            />
          </Reveal>
          <ol className="mt-12 grid gap-8 md:grid-cols-5 md:gap-5">
            {PATH.map((step, i) => (
              <Reveal key={step.title} delay={i * 70} as="li">
                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-soft font-serif text-xl text-brand">
                    {i + 1}
                  </span>
                  <h3 className="type-h4 mt-4">{step.title}</h3>
                  <p className="type-body-sm mt-2 text-text-secondary">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="mt-10">
            <Button href={BOOKING_ANCHOR} withArrow>
              Понять, с чего начать
            </Button>
          </div>
        </Section>

        {/* [5] TrustSection — лицензия + документы (verified-only) */}
        <Section id="doverie">
          <TrustSection />
        </Section>

        {/* [6] Featured doctor (visual: Дворникова; chief-anchor: Романовский) */}
        <Section id="vrachi" alt>
          <FeaturedDoctor />
        </Section>

        {/* [9] FAQ */}
        <Section id="voprosy">
          <Reveal>
            <div className="mb-10 text-center">
              <span className="horizon-line mx-auto mb-5" aria-hidden />
              <h2 className="type-h2">Частые вопросы</h2>
            </div>
          </Reveal>
          <Accordion items={FAQ_HOME} />
        </Section>

        {/* [10] Contacts */}
        <Section id="kontakty" alt>
          <ContactsPreview />
        </Section>

        {/* [11] FinalCTA — единственная форма */}
        <Section>
          <FinalCTA />
        </Section>
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
