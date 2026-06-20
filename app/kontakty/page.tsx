import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { Cta } from "@/components/smt/Cta";
import { BranchCard, BranchMapPanel } from "@/components/smt/Branches";
import { CLINIC, BRANCHES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Контакты — филиалы, телефон, режим работы в Екатеринбурге",
  description:
    "Медицинский центр «ПРО спокойствие». Филиалы: Космонавтов 101Б и Громова 30. Пн–Пт 08:00–20:00, Сб–Вс 09:00–17:00. Телефон: +7 (343) 288-57-58.",
};

const HOURS = [
  ["Понедельник", "08:00 – 20:00"], ["Вторник", "08:00 – 20:00"], ["Среда", "08:00 – 20:00"],
  ["Четверг", "08:00 – 20:00"], ["Пятница", "08:00 – 20:00"], ["Суббота", "09:00 – 17:00"], ["Воскресенье", "09:00 – 17:00"],
];

const FAQ = [
  { q: "В каком филиале меня примут?", a: "Контактные данные и запись общие для всех филиалов. При записи уточните удобный адрес — Космонавтов 101Б или Громова 30 — и мы подтвердим время." },
  { q: "Что взять с собой на приём?", a: "Только себя. Документы не нужны. На ресепшене скажите только своё имя." },
  { q: "Что если я обращаюсь в нерабочее время?", a: "Оставьте заявку или напишите в Telegram — свяжемся с вами с 08:00 в следующий рабочий день. Если ситуация острая — звоните в скорую помощь: 112." },
  { q: "Это конфиденциально?", a: "Да. Обращение конфиденциально, без постановки на учёт. Информация о визите не передаётся третьим лицам." },
];

export default function ContactsPage() {
  return (
    <div className="smt">
      <SiteHeader active="Контакты" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Контакты" }]} />
      <main id="main">
        {/* Hero */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container max-w-[68ch]">
            <p className="smt-eyebrow">Контакты · Екатеринбург</p>
            <h1 className="smt-h1 mt-2">Как нас найти</h1>
            <p className="smt-lead mt-4 smt-muted">
              Клиника «ПРО спокойствие» работает в двух филиалах Екатеринбурга. Телефон, Telegram и запись общие для всех адресов.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={CLINIC.phoneHref} className="smt-btn smt-btn-primary">{CLINIC.phone}</a>
              <a href={CLINIC.telegramHref} target="_blank" rel="noopener noreferrer" className="smt-btn smt-btn-ghost">Написать в Telegram</a>
            </div>
          </div>
        </section>

        {/* Branch cards */}
        <section className="smt-section">
          <div className="smt-container">
            <h2 className="smt-h2">Филиалы клиники</h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {BRANCHES.map((b) => (<li key={b.id}><BranchCard b={b} /></li>))}
            </ul>
          </div>
        </section>

        {/* Map / route panel */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container">
            <h2 className="smt-h2">На карте</h2>
            <div className="mt-6"><BranchMapPanel /></div>
          </div>
        </section>

        {/* Common contact + hours */}
        <section className="smt-section">
          <div className="smt-container grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="smt-h2">Общие контакты</h2>
              <ul className="mt-5 space-y-3 smt-body">
                <li><a href={CLINIC.phoneHref} className="smt-h3 smt-link">{CLINIC.phone}</a></li>
                <li><a href={CLINIC.telegramHref} target="_blank" rel="noopener noreferrer" className="smt-link">Telegram {CLINIC.telegram}</a></li>
                <li><a href={CLINIC.emailHref} className="smt-link">{CLINIC.email}</a></li>
              </ul>
              <div className="mt-5 smt-card smt-card-pad">
                <h3 className="smt-h3 text-[16px]">Что взять с собой</h3>
                <p className="mt-2 smt-body smt-muted">Только себя. Документы не нужны. На ресепшене скажите только своё имя.</p>
              </div>
            </div>
            <div>
              <h2 className="smt-h2">Режим работы</h2>
              <div className="mt-5 overflow-hidden rounded-[15px] border" style={{ borderColor: "var(--smt-border)" }}>
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
              <p className="mt-3 text-[14px] smt-muted">В нерабочее время оставьте заявку — свяжемся с 08:00. Острая ситуация — скорая помощь: <strong style={{ color: "var(--smt-dark)" }}>112</strong>.</p>
            </div>
          </div>
        </section>

        <Cta title="Записаться на приём" sourceBlock="kontakty" alt />

        {/* FAQ */}
        <section className="smt-section">
          <div className="smt-container max-w-[760px]">
            <h2 className="smt-h2 text-center">Частые вопросы</h2>
            <div className="mt-8">
              {FAQ.map((q, i) => (
                <details key={q.q} open={i < 2} className="border-b py-2" style={{ borderColor: "var(--smt-border)" }}>
                  <summary className="cursor-pointer list-none py-3 text-[17px] font-semibold" style={{ color: "var(--smt-dark)" }}>{q.q}</summary>
                  <p className="pb-3 smt-body smt-muted">{q.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Legal */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container">
            <h2 className="smt-h2">Юридическая информация</h2>
            <p className="mt-4 max-w-[68ch] smt-body smt-muted">
              {CLINIC.legalName} · ИНН {CLINIC.inn} · ОГРН {CLINIC.ogrn}. Лицензия №{CLINIC.license}, {CLINIC.licenseAuthority}.
            </p>
            <Link href="/dokumenty/" className="smt-link mt-4 inline-flex">Документы и лицензия →</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
