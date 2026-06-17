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
import { FinalCTA } from "@/components/blocks/FinalCTA";
import { DocumentsGallery } from "@/components/blocks/DocumentsGallery";
import { CLINIC } from "@/lib/data";

export const metadata: Metadata = {
  title: "Документы и лицензия клиники — «ПРО спокойствие» в Екатеринбурге",
  description:
    "Лицензия Минздрава, правила записи на приём, график приёма граждан и контролирующие органы клиники «ПРО спокойствие». Настоящие документы, проверка лицензии в Росздравнадзоре.",
};

const FAQ_DOCS = [
  {
    q: "Как проверить лицензию клиники?",
    a: "Нажмите «Проверить лицензию в Росздравнадзоре» — откроется официальный реестр Росздравнадзора с записью по нашей лицензии. На скане лицензии также есть QR-код, который ведёт на ту же проверку.",
    open: true,
  },
  {
    q: "Где посмотреть правила приёма?",
    a: "Скан «Правила записи на приём» доступен в карточках выше — нажмите «Смотреть документ», чтобы открыть его в полном размере. В нём описан порядок записи и оказания платных медицинских услуг.",
    open: true,
  },
  {
    q: "Какие документы доступны пациенту?",
    a: "На этой странице опубликованы лицензия на медицинскую деятельность, правила записи на приём, график приёма граждан и сведения о контролирующих органах. Дополнительные документы (договор, согласие на обработку данных) предоставляются на приёме.",
  },
  {
    q: "Поставят ли на учёт при обращении?",
    a: "Нет. Мы частная клиника и не ведём психиатрического учёта. Обращение конфиденциально и не влечёт ограничений.",
  },
];

export default function DocumentsPage() {
  return (
    <>
      <Header activeNav="Документы" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Документы" }]} />

      <main id="main">
        {/* [1] Hero */}
        <section className="warm-field">
          <div className="container-page py-16 md:py-24">
            <div className="settle is-in max-w-measure">
              <p className="type-eyebrow mb-3">Прозрачность · Екатеринбург</p>
              <h1 className="type-display">Документы и лицензия</h1>
              <p className="type-lead mt-5">
                Настоящая лицензированная клиника. Здесь — реальные документы:
                лицензия Минздрава, правила приёма и сведения о надзорных органах.
                Вы можете проверить нас до первого визита.
              </p>
              <span className="horizon-line my-7" aria-hidden />
              <div className="mb-8 flex flex-wrap gap-2">
                <TagChip tone="verified">Лицензия Минздрава</TagChip>
                <TagChip tone="verified">Проверка в Росздравнадзоре</TagChip>
                <TagChip tone="verified">Реальные сканы</TagChip>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="#dokumenty" withArrow>
                  Посмотреть документы
                </Button>
                <Button href={CLINIC.licenseCheckUrl} variant="ghost" external>
                  Проверить лицензию
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* [2] Legal info block */}
        <Section alt>
          <Reveal>
            <SectionHead eyebrow="Юридические сведения" title="Кто оказывает услуги" />
          </Reveal>
          <div className="mt-8 max-w-2xl overflow-hidden rounded-card border border-border">
            <dl className="divide-y divide-border">
              <div className="grid grid-cols-1 gap-1 bg-surface p-5 sm:grid-cols-[200px_1fr] sm:gap-4">
                <dt className="type-body-sm font-medium text-text-primary">Юридическое лицо</dt>
                <dd className="type-body-sm text-text-secondary">{CLINIC.legalName}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 bg-surface p-5 sm:grid-cols-[200px_1fr] sm:gap-4">
                <dt className="type-body-sm font-medium text-text-primary">Лицензия</dt>
                <dd className="type-body-sm text-text-secondary">
                  №{CLINIC.license} · {CLINIC.licenseAuthority}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 bg-surface p-5 sm:grid-cols-[200px_1fr] sm:gap-4">
                <dt className="type-body-sm font-medium text-text-primary">ИНН / ОГРН</dt>
                <dd className="type-body-sm text-text-secondary">
                  ИНН {CLINIC.inn} · ОГРН {CLINIC.ogrn}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 bg-surface p-5 sm:grid-cols-[200px_1fr] sm:gap-4">
                <dt className="type-body-sm font-medium text-text-primary">Адрес</dt>
                <dd className="type-body-sm text-text-secondary">{CLINIC.address}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 bg-surface p-5 sm:grid-cols-[200px_1fr] sm:gap-4">
                <dt className="type-body-sm font-medium text-text-primary">Режим работы</dt>
                <dd className="type-body-sm text-text-secondary">
                  {CLINIC.hoursWeek} · {CLINIC.hoursWeekend}
                </dd>
              </div>
            </dl>
          </div>
          <a
            href={CLINIC.licenseCheckUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-control border border-border px-5 font-medium text-text-primary transition-colors hover:bg-surface"
          >
            Проверить лицензию в Росздравнадзоре
            <Icon name="arrow" size={18} className="text-brand" />
          </a>
        </Section>

        {/* [3] Document cards with in-page lightbox */}
        <Section id="dokumenty">
          <Reveal>
            <SectionHead
              eyebrow="Документы"
              title="Реальные сканы"
              lead="Нажмите на документ, чтобы открыть скан в полном размере прямо на странице."
            />
          </Reveal>
          <DocumentsGallery />
        </Section>

        {/* [4] FAQ */}
        <Section alt>
          <Reveal>
            <div className="mb-10 text-center">
              <span className="horizon-line mx-auto mb-5" aria-hidden />
              <h2 className="type-h2">Частые вопросы о документах</h2>
            </div>
          </Reveal>
          <Accordion items={FAQ_DOCS} />
        </Section>

        {/* [5] CTA to contact / booking */}
        <Section>
          <FinalCTA
            title="Остались вопросы?"
            lead="Оставьте номер — ответим на вопросы о документах и записи, подберём удобное время. Конфиденциально, без давления."
          />
        </Section>

        {/* RelatedLinks */}
        <Section alt>
          <h2 className="type-h3 mb-6">Смотрите также</h2>
          <ul className="flex flex-wrap gap-4">
            <li>
              <Link href="/tseny/" className="text-brand hover:underline">
                Цены на услуги →
              </Link>
            </li>
            <li>
              <Link href="/vrachi/" className="text-brand hover:underline">
                Врачи клиники →
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
