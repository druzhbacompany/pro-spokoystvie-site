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
import { PRICELIST, PRICELIST_FILE, CLINIC } from "@/lib/data";

export const metadata: Metadata = {
  title: "Цены на услуги клиники в Екатеринбурге — прайс «ПРО спокойствие»",
  description:
    "Стоимость приёмов и услуг клиники «ПРО спокойствие»: психиатрия, психотерапия, психология, неврология. Прозрачный прайс. Окончательная стоимость определяется врачом на приёме. Запись: +7 (343) 345-49-05.",
};

const FAQ_PRICES = [
  {
    q: "Окончательная стоимость может отличаться от прайса?",
    a: "Прайс отражает стоимость стандартных услуг. Окончательный план и стоимость лечения врач определяет на приёме — после того как разберётся в вашей ситуации. Прайс не является публичной офертой.",
    open: true,
  },
  {
    q: "Как оплатить приём?",
    a: "Принимаем наличные и банковские карты. Оплата — после приёма, на ресепшене.",
    open: true,
  },
  {
    q: "Входит ли стоимость препаратов в цену?",
    a: "Если в названии услуги указано «без стоимости препарата», лекарство оплачивается отдельно. Состав капельниц и инъекций подбирает врач по показаниям.",
  },
  {
    q: "Нужно ли вносить предоплату при записи?",
    a: "Нет. Запись бесплатна и ни к чему не обязывает. Вы оплачиваете только состоявшийся приём.",
  },
  {
    q: "Процедуры и капельницы можно сделать без приёма врача?",
    a: "Нет. Инъекции, инфузии и IV-терапия выполняются только по назначению врача и по медицинским показаниям.",
  },
  {
    q: "Это конфиденциально?",
    a: "Да. Обращение конфиденциально, без постановки на учёт. Информация о вашем визите не передаётся третьим лицам.",
  },
];

export default function PricesPage() {
  return (
    <>
      <Header activeNav="Цены" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Цены" }]} />

      <main id="main">
        {/* [1] Hero */}
        <section className="warm-field">
          <div className="container-page py-16 md:py-24">
            <div className="settle is-in max-w-measure">
              <p className="type-eyebrow mb-3">Прозрачно · Екатеринбург</p>
              <h1 className="type-display">Цены на услуги</h1>
              <p className="type-lead mt-5">
                Открытый прайс клиники «ПРО спокойствие». Вы знаете стоимость
                заранее. Окончательный план и цену врач определяет на приёме —
                спокойно и без скрытых доплат.
              </p>
              <span className="horizon-line my-7" aria-hidden />
              <div className="mb-8 flex flex-wrap gap-2">
                <TagChip tone="verified">Без скрытых доплат</TagChip>
                <TagChip tone="verified">Наличные и карты</TagChip>
                <TagChip tone="verified">Конфиденциально</TagChip>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="#zayavka" withArrow>
                  Записаться на приём
                </Button>
                <Button href={CLINIC.phoneHref} variant="ghost" external>
                  Позвонить
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* [2] Price navigation by categories */}
        <Section alt>
          <Reveal>
            <SectionHead eyebrow="Разделы прайса" title="Выберите раздел" />
          </Reveal>
          <ul className="mt-8 flex flex-wrap gap-3">
            {PRICELIST.map((sec) => (
              <li key={sec.id}>
                <Link
                  href={`#${sec.id}`}
                  className="inline-flex items-center gap-2 rounded-tag border border-border bg-surface px-4 py-2.5 type-body-sm font-medium text-text-primary transition-colors hover:bg-bg-alt"
                >
                  <span className="font-serif text-brand">{sec.number}</span>
                  {sec.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <a
              href={PRICELIST_FILE}
              download
              className="inline-flex min-h-[44px] items-center gap-2 rounded-control border border-border px-5 font-medium text-text-primary hover:bg-bg-alt"
            >
              <Icon name="arrow" size={18} className="text-brand" />
              Скачать полный прайс (DOCX)
            </a>
          </div>
        </Section>

        {/* [3] Full price table grouped by sections */}
        {PRICELIST.map((sec) => (
          <Section key={sec.id} id={sec.id}>
            <Reveal>
              <div className="flex items-baseline gap-3">
                <span className="type-h2 font-serif text-brand">{sec.number}</span>
                <h2 className="type-h2">{sec.title}</h2>
              </div>
            </Reveal>
            {sec.note ? (
              <p className="type-body-sm mt-4 max-w-measure text-text-secondary">{sec.note}</p>
            ) : null}

            <div className="mt-8 space-y-10">
              {sec.groups.map((group) => (
                <Reveal key={group.title}>
                  <div>
                    <h3 className="type-h4 mb-4 text-text-secondary">{group.title}</h3>
                    <div className="overflow-hidden rounded-card border border-border">
                      <table className="w-full border-collapse">
                        <caption className="sr-only">
                          {sec.title} — {group.title}
                        </caption>
                        <tbody>
                          {group.items.map((item, i) => (
                            <tr
                              key={item.code}
                              className={`align-top ${i % 2 === 1 ? "bg-bg-alt" : "bg-surface"}`}
                            >
                              <th
                                scope="row"
                                className="px-4 py-4 text-left type-body-sm font-normal text-text-primary sm:px-5"
                              >
                                {item.name}
                              </th>
                              <td className="whitespace-nowrap px-4 py-4 text-right type-body-sm font-medium tabular-nums text-text-primary sm:px-5">
                                {item.price}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        ))}

        {/* [4] Notes about final cost / appointment / prescription */}
        <Section alt warmField>
          <Reveal>
            <div className="max-w-measure">
              <span className="horizon-line mb-5" aria-hidden />
              <h2 className="type-h2">Важно о стоимости</h2>
              <ul className="type-body mt-6 space-y-4 text-text-secondary">
                <li className="flex gap-3">
                  <Icon name="check" size={22} className="mt-0.5 flex-none text-brand" />
                  Окончательную стоимость лечения врач определяет на приёме — после
                  того как разберётся в вашей ситуации.
                </li>
                <li className="flex gap-3">
                  <Icon name="check" size={22} className="mt-0.5 flex-none text-brand" />
                  Процедуры, инъекции, капельницы и IV-терапия выполняются по
                  назначению врача и по медицинским показаниям.
                </li>
                <li className="flex gap-3">
                  <Icon name="check" size={22} className="mt-0.5 flex-none text-brand" />
                  Где указано «без стоимости препарата» — лекарство оплачивается
                  отдельно.
                </li>
                <li className="flex gap-3">
                  <Icon name="check" size={22} className="mt-0.5 flex-none text-brand" />
                  Прайс не является публичной офертой. Запись бесплатна и ни к чему
                  не обязывает.
                </li>
              </ul>
            </div>
          </Reveal>
        </Section>

        {/* [5] Download full price list */}
        <Section>
          <Reveal>
            <div className="flex flex-col items-start gap-4 rounded-card border border-border bg-surface p-7 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-measure">
                <h2 className="type-h3">Полный прайс одним файлом</h2>
                <p className="type-body-sm mt-2 text-text-secondary">
                  Актуальный коммерческий прейскурант клиники «{CLINIC.name}» в
                  формате DOCX.
                </p>
              </div>
              <a
                href={PRICELIST_FILE}
                download
                className="inline-flex min-h-[48px] flex-none items-center gap-2 rounded-control bg-brand px-6 font-medium text-[#fcfbf8] hover:bg-brand-hover"
              >
                <Icon name="arrow" size={18} />
                Скачать прайс
              </a>
            </div>
          </Reveal>
        </Section>

        {/* [6] FAQ about payment and appointment */}
        <Section alt>
          <Reveal>
            <div className="mb-10 text-center">
              <span className="horizon-line mx-auto mb-5" aria-hidden />
              <h2 className="type-h2">Вопросы об оплате и записи</h2>
            </div>
          </Reveal>
          <Accordion items={FAQ_PRICES} />
        </Section>

        {/* [7] Booking CTA */}
        <Section>
          <FinalCTA
            title="Записаться на приём"
            lead="Оставьте номер — назовём актуальную стоимость по вашему вопросу и подберём удобное время. Конфиденциально, без давления."
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
