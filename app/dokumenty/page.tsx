import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { DocumentsGallery } from "@/components/smt/DocumentsGallery";
import { Cta } from "@/components/smt/Cta";
import { CLINIC } from "@/lib/data";

export const metadata: Metadata = {
  title: "Документы и лицензия клиники — «ПРО спокойствие» в Екатеринбурге",
  description:
    "Лицензия Минздрава, правила записи на приём, график приёма граждан и контролирующие органы клиники «ПРО спокойствие». Настоящие документы, проверка лицензии в Росздравнадзоре.",
};

export default function DocumentsPage() {
  return (
    <div className="smt">
      <SiteHeader active="Документы" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Документы" }]} />
      <main id="main">
        <section className="smt-section">
          <div className="smt-container">
            <p className="smt-eyebrow">Прозрачность · Екатеринбург</p>
            <h1 className="smt-h1 mt-2">Документы и лицензия</h1>
            <p className="smt-lead mt-4 max-w-[68ch] smt-muted">
              Настоящая лицензированная клиника. Реальные документы: лицензия Минздрава, правила приёма и сведения о надзорных органах. Нажмите на документ, чтобы открыть скан прямо на странице.
            </p>

            <div className="mt-10"><DocumentsGallery /></div>
          </div>
        </section>

        {/* Legal info */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container">
            <h2 className="smt-h2">Юридические сведения</h2>
            <div className="mt-6 max-w-2xl overflow-hidden rounded-[15px] border" style={{ borderColor: "var(--smt-border)" }}>
              <dl className="divide-y" style={{ borderColor: "var(--smt-border)" }}>
                {[
                  ["Юридическое лицо", CLINIC.legalName],
                  ["Лицензия", `№${CLINIC.license} · ${CLINIC.licenseAuthority}`],
                  ["ИНН / ОГРН", `ИНН ${CLINIC.inn} · ОГРН ${CLINIC.ogrn}`],
                  ["Адрес", CLINIC.address],
                  ["Режим работы", `${CLINIC.hoursWeek} · ${CLINIC.hoursWeekend}`],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-1 gap-1 bg-white p-5 sm:grid-cols-[200px_1fr] sm:gap-4">
                    <dt className="text-[15px] font-medium" style={{ color: "var(--smt-dark)" }}>{k}</dt>
                    <dd className="text-[15px] smt-muted">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <a href={CLINIC.licenseCheckUrl} target="_blank" rel="noopener noreferrer" className="smt-btn smt-btn-primary mt-6">
              Проверить лицензию в Росздравнадзоре
            </a>
            <div className="mt-6">
              <p className="smt-body smt-muted mb-3">Правовые документы клиники опубликованы онлайн:</p>
              <ul className="flex flex-col gap-2 text-[15px]">
                <li><Link href="/privacy" className="smt-link">Политика в отношении обработки персональных данных</Link></li>
                <li><Link href="/personal-data-consent" className="smt-link">Согласие на обработку персональных данных</Link></li>
                <li><Link href="/special-consent" className="smt-link">Согласие на обработку специальных категорий ПДн</Link></li>
                <li><Link href="/cookies" className="smt-link">Политика использования файлов cookie</Link></li>
                <li><Link href="/user-agreement" className="smt-link">Пользовательское соглашение</Link></li>
                <li><Link href="/legal" className="smt-link">Сведения о медицинской организации</Link></li>
                <li><Link href="/license" className="smt-link">Сведения о лицензии</Link></li>
                <li><Link href="/controlling-authorities" className="smt-link">Контролирующие органы</Link></li>
              </ul>
            </div>
          </div>
        </section>

        <Cta title="Остались вопросы?" lead="Оставьте номер — ответим на вопросы о документах и записи." />
      </main>
      <SiteFooter />
    </div>
  );
}
