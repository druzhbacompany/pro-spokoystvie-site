import type { Metadata } from "next";
import Image from "next/image";
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
import { CLINIC } from "@/lib/data";

export const metadata: Metadata = {
  title: "Контакты — адрес, телефон, режим работы в Екатеринбурге",
  description:
    "Медицинский центр «ПРО спокойствие». Адрес: Екатеринбург, пр-кт Космонавтов, 101б. Пн–Пт 08:00–20:00, Сб–Вс 09:00–17:00. Телефон: +7 (343) 345-49-05. Telegram: @Procalmnessekb.",
};

const HOURS = [
  { day: "Понедельник", time: "08:00 – 20:00" },
  { day: "Вторник", time: "08:00 – 20:00" },
  { day: "Среда", time: "08:00 – 20:00" },
  { day: "Четверг", time: "08:00 – 20:00" },
  { day: "Пятница", time: "08:00 – 20:00" },
  { day: "Суббота", time: "09:00 – 17:00" },
  { day: "Воскресенье", time: "09:00 – 17:00" },
];

const FAQ_CONTACTS = [
  {
    q: "Что взять с собой на приём?",
    a: "Только себя. Документы не нужны, медицинские справки и выписки не обязательны (но если есть — можно взять). На ресепшене скажите только своё имя — всё остальное мы сделаем сами.",
    open: true,
  },
  {
    q: "Что если я обращаюсь в нерабочее время?",
    a: "Если вы пишете или звоните вне рабочего времени — мы получим обращение и свяжемся с вами с 08:00 в следующий рабочий день. Если ситуация острая и не терпит ожидания — звоните в скорую помощь: 112.",
    open: true,
  },
  {
    q: "Как записаться на приём?",
    a: "Позвоните по телефону +7 (343) 345-49-05, напишите в Telegram @Procalmnessekb или оставьте заявку через форму на сайте — перезвоним и подтвердим удобное время.",
  },
  {
    q: "Это конфиденциально?",
    a: "Да. Обращение конфиденциально, без постановки на учёт. Информация о вашем визите не передаётся третьим лицам.",
  },
  {
    q: "Можно ли опоздать или перенести приём?",
    a: "Если понимаете, что опаздываете или не успеваете — позвоните нам. Спокойно перенесём запись на удобное время, без проблем.",
  },
];

export default function ContactsPage() {
  return (
    <>
      <Header activeNav="Контакты" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Контакты" }]} />

      <main id="main">
        {/* [1] Hero — key data + map */}
        <section className="warm-field">
          <div className="container-page py-16 md:py-24">
            <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
              <Reveal>
                <div className="settle is-in max-w-measure">
                  <p className="type-eyebrow mb-3">Контакты · Екатеринбург</p>
                  <h1 className="type-display">Как нас найти</h1>
                  <ul className="mt-7 space-y-4">
                    <li className="flex gap-3">
                      <Icon name="pin" size={22} className="mt-0.5 flex-none text-brand" />
                      <span className="type-body text-text-primary">{CLINIC.address}</span>
                    </li>
                    <li className="flex gap-3">
                      <Icon name="phone" size={22} className="mt-0.5 flex-none text-brand" />
                      <a
                        href={CLINIC.phoneHref}
                        className="type-h4 font-sans font-medium text-text-primary hover:text-brand"
                      >
                        {CLINIC.phone}
                      </a>
                    </li>
                    <li className="flex gap-3">
                      <Icon name="telegram" size={22} className="mt-0.5 flex-none text-brand" />
                      <a
                        href={CLINIC.telegramHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="type-body text-text-primary hover:text-brand"
                      >
                        Telegram {CLINIC.telegram}
                      </a>
                    </li>
                    <li className="flex gap-3">
                      <Icon name="window" size={22} className="mt-0.5 flex-none text-brand" />
                      <a
                        href={CLINIC.emailHref}
                        className="type-body text-text-primary hover:text-brand"
                      >
                        {CLINIC.email}
                      </a>
                    </li>
                    <li className="flex gap-3">
                      <Icon name="clock" size={22} className="mt-0.5 flex-none text-brand" />
                      <span className="type-body text-text-secondary">
                        {CLINIC.hoursWeek}
                        <br />
                        {CLINIC.hoursWeekend}
                      </span>
                    </li>
                  </ul>
                  <span className="horizon-line my-7" aria-hidden />
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button href={CLINIC.phoneHref} external withArrow>
                      Позвонить
                    </Button>
                    <Button href={CLINIC.telegramHref} variant="ghost" external>
                      Написать в Telegram
                    </Button>
                  </div>
                </div>
              </Reveal>

              {/* Map — static placeholder linking to Яндекс.Карты (no heavy embed) */}
              <Reveal delay={80}>
                <div>
                  <a
                    href={CLINIC.yandexMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex aspect-[4/3] items-center justify-center rounded-media border border-border bg-surface text-center shadow-sm transition-colors hover:bg-bg-alt"
                    aria-label="Открыть карту проезда в Яндекс.Картах"
                  >
                    <span className="flex flex-col items-center gap-3 px-6 text-text-secondary">
                      <Icon name="pin" size={44} className="text-brand" />
                      <span className="type-h4">{CLINIC.addressShort}</span>
                      <span className="type-body-sm max-w-xs">
                        Нажмите, чтобы открыть карту проезда
                      </span>
                    </span>
                  </a>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={CLINIC.yandexMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-control border border-border px-4 font-medium text-text-primary hover:bg-surface"
                    >
                      Яндекс.Карты <Icon name="arrow" size={18} className="text-brand" />
                    </a>
                    <a
                      href={CLINIC.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-control border border-border px-4 font-medium text-text-primary hover:bg-surface"
                    >
                      Google Maps <Icon name="arrow" size={18} className="text-brand" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* [2] How to get there */}
        <Section alt>
          <Reveal>
            <SectionHead
              eyebrow="Маршрут"
              title="Как добраться"
              lead="Мы находимся по адресу пр-кт Космонавтов, 101б. Постройте маршрут в один клик — карта приведёт прямо ко входу."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-card border border-border bg-surface p-7 shadow-sm">
                <Icon name="pin" size={32} className="text-brand" />
                <h3 className="type-h4 mt-4">Построить маршрут</h3>
                <p className="type-body-sm mt-2 flex-1 text-text-secondary">
                  Откройте адрес в навигаторе и доедьте или дойдите по
                  подсказкам карты — на общественном транспорте или на автомобиле.
                </p>
                <div className="mt-5">
                  <a
                    href={CLINIC.yandexMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline"
                  >
                    Открыть маршрут в Яндекс.Картах <Icon name="arrow" size={18} />
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border bg-bg-alt shadow-sm">
                <Image
                  src="/assets/clinic/interior-1.jpg"
                  alt="Интерьер клиники «ПРО спокойствие»"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Section>

        {/* [3] What to bring — «Только себя» */}
        <Section>
          <Reveal>
            <div className="mx-auto max-w-measure rounded-card bg-pine-100 p-8 text-center md:p-12">
              <p className="type-eyebrow mb-4 text-pine-700">Что взять с собой</p>
              <p className="type-h2 font-serif text-pine-700">Только себя.</p>
              <p className="type-body mt-5 text-text-secondary">
                Документы не нужны. Медицинские справки и выписки — не
                обязательны, хотя если есть, можно взять. На ресепшене скажите
                только своё имя. Всё остальное мы сделаем сами.
              </p>
            </div>
          </Reveal>
        </Section>

        {/* [4] Working hours detailed */}
        <Section alt>
          <Reveal>
            <SectionHead eyebrow="Режим работы" title="Когда мы работаем" />
          </Reveal>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="overflow-hidden rounded-card border border-border">
                <table className="w-full border-collapse">
                  <caption className="sr-only">Режим работы клиники по дням недели</caption>
                  <tbody>
                    {HOURS.map((row, i) => (
                      <tr
                        key={row.day}
                        className={`${i % 2 === 1 ? "bg-bg-alt" : "bg-surface"} ${
                          i === 5 ? "border-t-2 border-border" : ""
                        }`}
                      >
                        <th
                          scope="row"
                          className="px-5 py-3.5 text-left type-body-sm font-normal text-text-primary"
                        >
                          {row.day}
                        </th>
                        <td className="whitespace-nowrap px-5 py-3.5 text-right type-body-sm font-medium tabular-nums text-text-primary">
                          {row.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-card border border-border bg-surface-warm p-7 shadow-sm">
                <h3 className="type-h4 flex items-center gap-2">
                  <Icon name="clock" size={22} className="text-brand" />
                  В нерабочее время
                </h3>
                <p className="type-body-sm mt-4 text-text-secondary">
                  Если вы пишете или звоните вне рабочего времени — мы получим
                  обращение и свяжемся с вами с 08:00 в следующий рабочий день.
                </p>
                <p className="type-body-sm mt-3 text-text-secondary">
                  Если ситуация острая и не терпит ожидания — звоните в скорую
                  помощь: <strong className="text-text-primary">112</strong>.
                </p>
                <div className="mt-5 flex flex-col gap-2 type-body-sm">
                  <a href={CLINIC.phoneHref} className="font-medium text-brand hover:underline">
                    {CLINIC.phone}
                  </a>
                  <a
                    href={CLINIC.telegramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:underline"
                  >
                    Telegram {CLINIC.telegram}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* [5] Legal info */}
        <Section>
          <Reveal>
            <SectionHead eyebrow="Реквизиты" title="Юридическая информация" />
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
            </dl>
          </div>
          <p className="type-caption mt-4">
            <Link href="/dokumenty/" className="text-brand hover:underline">
              Документы и лицензия →
            </Link>
          </p>
        </Section>

        {/* [6] FAQ */}
        <Section alt>
          <Reveal>
            <div className="mb-10 text-center">
              <span className="horizon-line mx-auto mb-5" aria-hidden />
              <h2 className="type-h2">Частые вопросы</h2>
            </div>
          </Reveal>
          <Accordion items={FAQ_CONTACTS} />
        </Section>

        {/* [7] Booking CTA */}
        <Section>
          <FinalCTA
            title="Готовы прийти?"
            lead="Запишитесь онлайн или позвоните — подберём удобное время. Конфиденциально, без постановки на учёт."
          />
        </Section>

        {/* RelatedLinks */}
        <Section alt>
          <h2 className="type-h3 mb-6">Смотрите также</h2>
          <ul className="flex flex-wrap gap-4">
            <li>
              <Link href="/uslugi/" className="text-brand hover:underline">
                Направления помощи →
              </Link>
            </li>
            <li>
              <Link href="/vrachi/" className="text-brand hover:underline">
                Врачи клиники →
              </Link>
            </li>
            <li>
              <Link href="/tseny/" className="text-brand hover:underline">
                Цены на услуги →
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
