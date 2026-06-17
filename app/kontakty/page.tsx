import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { Cta } from "@/components/smt/Cta";
import { PhotoPlaceholder } from "@/components/smt/Placeholder";
import { CLINIC } from "@/lib/data";

export const metadata: Metadata = {
  title: "Контакты — адрес, телефон, режим работы в Екатеринбурге",
  description:
    "Медицинский центр «ПРО спокойствие». Адрес: Екатеринбург, пр-кт Космонавтов, 101б. Пн–Пт 08:00–20:00, Сб–Вс 09:00–17:00. Телефон: +7 (343) 345-49-05.",
};

const HOURS = [
  ["Понедельник", "08:00 – 20:00"], ["Вторник", "08:00 – 20:00"], ["Среда", "08:00 – 20:00"],
  ["Четверг", "08:00 – 20:00"], ["Пятница", "08:00 – 20:00"], ["Суббота", "09:00 – 17:00"], ["Воскресенье", "09:00 – 17:00"],
];

export default function ContactsPage() {
  return (
    <div className="smt">
      <SiteHeader active="Контакты" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Контакты" }]} />
      <main id="main">
        <section className="smt-section">
          <div className="smt-container grid items-start gap-10 md:grid-cols-2">
            <div>
              <p className="smt-eyebrow">Контакты · Екатеринбург</p>
              <h1 className="smt-h1 mt-2">Как нас найти</h1>
              <ul className="mt-6 space-y-4 smt-body">
                <li>{CLINIC.address}</li>
                <li><a href={CLINIC.phoneHref} className="smt-h3 smt-link">{CLINIC.phone}</a></li>
                <li><a href={CLINIC.telegramHref} target="_blank" rel="noopener noreferrer" className="smt-link">Telegram {CLINIC.telegram}</a></li>
                <li><a href={CLINIC.emailHref} className="smt-link">{CLINIC.email}</a></li>
                <li className="smt-muted">{CLINIC.hoursWeek} · {CLINIC.hoursWeekend}</li>
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={CLINIC.phoneHref} className="smt-btn smt-btn-primary">Позвонить</a>
                <a href={CLINIC.telegramHref} target="_blank" rel="noopener noreferrer" className="smt-btn smt-btn-ghost">Написать в Telegram</a>
              </div>
            </div>
            <div>
              <a href={CLINIC.yandexMaps} target="_blank" rel="noopener noreferrer" className="block" aria-label="Открыть карту проезда в Яндекс.Картах">
                <PhotoPlaceholder ratio="4/3" label={`${CLINIC.addressShort} — открыть карту в Яндекс.Картах`} />
              </a>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={CLINIC.yandexMaps} target="_blank" rel="noopener noreferrer" className="smt-btn smt-btn-ghost !min-h-[44px]">Яндекс.Карты</a>
                <a href={CLINIC.googleMaps} target="_blank" rel="noopener noreferrer" className="smt-btn smt-btn-ghost !min-h-[44px]">Google Maps</a>
              </div>
            </div>
          </div>
        </section>

        {/* Hours + after-hours */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="smt-h2">Режим работы</h2>
              <div className="mt-6 overflow-hidden rounded-[15px] border" style={{ borderColor: "var(--smt-border)" }}>
                <table className="w-full border-collapse">
                  <tbody>
                    {HOURS.map(([day, time], i) => (
                      <tr key={day} style={{ background: i % 2 ? "var(--smt-grey)" : "#fff" }}>
                        <th scope="row" className="px-5 py-3 text-left text-[15px] font-normal" style={{ color: "var(--smt-dark)" }}>{day}</th>
                        <td className="px-5 py-3 text-right text-[15px] font-medium tabular-nums" style={{ color: "var(--smt-dark)" }}>{time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="smt-card smt-card-pad md:!p-7">
              <h2 className="smt-h3">В нерабочее время</h2>
              <p className="mt-4 smt-body smt-muted">Оставьте заявку или напишите в Telegram — свяжемся с вами с 08:00 в следующий рабочий день.</p>
              <p className="mt-3 smt-body smt-muted">Если ситуация острая и не терпит ожидания — звоните в скорую помощь: <strong style={{ color: "var(--smt-dark)" }}>112</strong>.</p>
              <div className="mt-5 grid gap-2">
                <h3 className="smt-h3 text-[16px]">Что взять с собой</h3>
                <p className="smt-body smt-muted">Только себя. Документы не нужны. На ресепшене скажите только своё имя.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Legal */}
        <section className="smt-section">
          <div className="smt-container">
            <h2 className="smt-h2">Юридическая информация</h2>
            <p className="mt-4 max-w-[68ch] smt-body smt-muted">
              {CLINIC.legalName} · ИНН {CLINIC.inn} · ОГРН {CLINIC.ogrn}. Лицензия №{CLINIC.license}, {CLINIC.licenseAuthority}. Адрес: {CLINIC.address}.
            </p>
            <Link href="/dokumenty/" className="smt-link mt-4 inline-flex">Документы и лицензия →</Link>
          </div>
        </section>

        <Cta title="Готовы прийти?" alt />
      </main>
      <SiteFooter />
    </div>
  );
}
