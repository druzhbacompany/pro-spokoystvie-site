import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { CLINIC } from "@/lib/data";

export const metadata: Metadata = {
  title: "Заявка отправлена — ПРО спокойствие",
  description: "Спасибо за заявку. Администратор клиники «ПРО спокойствие» свяжется с вами.",
  robots: { index: false, follow: true },
};

export default function ThanksPage() {
  return (
    <div className="smt">
      <SiteHeader />
      <main id="main">
        <section className="smt-section">
          <div className="smt-container">
            <div className="mx-auto max-w-[640px] smt-card smt-card-pad md:!p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "var(--smt-blue-bg)" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--smt-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12.5l4.5 4.5L19 7" />
                </svg>
              </div>
              <h1 className="smt-h1 mt-6">Заявка отправлена</h1>
              <p className="smt-lead mt-4 smt-muted">
                Спасибо! Администратор свяжется с вами в течение 15 минут в рабочее время. Если вы оставили заявку в нерабочее время — позвоним первыми с 08:00.
              </p>
              <p className="mt-4 smt-body smt-muted">
                Срочно? Позвоните: <a href={CLINIC.phoneHref} className="smt-link">{CLINIC.phone}</a> или напишите в <a href={CLINIC.telegramHref} target="_blank" rel="noopener noreferrer" className="smt-link">Telegram {CLINIC.telegram}</a>.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/" className="smt-btn smt-btn-primary">На главную</Link>
                <Link href="/uslugi/" className="smt-btn smt-btn-ghost">Услуги</Link>
                <Link href="/kontakty/" className="smt-btn smt-btn-ghost">Контакты</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
