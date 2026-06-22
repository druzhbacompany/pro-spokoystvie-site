import Link from "next/link";
import { CLINIC, NAV, BRANCHES } from "@/lib/data";

/** SMT-style footer. Uses dedicated .smt-footer plain-CSS classes (purge-proof). */
export function SiteFooter() {
  return (
    <footer className="smt-footer">
      <div className="smt-container smt-footer-cols">
        <div>
          <p className="smt-footer-title">ПРО спокойствие</p>
          <p className="smt-footer-text">
            Психиатрия, психотерапия, психология и неврология в Екатеринбурге. Спокойно, конфиденциально, без постановки на учёт.
          </p>
          <div className="smt-footer-meta">
            <div>{CLINIC.legalName} · ИНН {CLINIC.inn} · ОГРН {CLINIC.ogrn}</div>
            <div>Лицензия Минздрава №{CLINIC.license}</div>
            <div>{CLINIC.licenseAuthority}</div>
          </div>
        </div>

        <nav aria-label="Навигация в подвале">
          <p className="smt-footer-head">Разделы</p>
          <ul className="smt-footer-list">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="smt-footer-head">Контакты</p>
          <ul className="smt-footer-list">
            <li><a href={CLINIC.phoneHref} className="accent">{CLINIC.phone}</a></li>
            <li><a href={CLINIC.telegramHref} target="_blank" rel="noopener noreferrer">Telegram {CLINIC.telegram}</a></li>
            <li><a href={CLINIC.emailHref}>{CLINIC.email}</a></li>
            <li>{CLINIC.hoursWeek} · {CLINIC.hoursWeekend}</li>
          </ul>

          <p className="smt-footer-head">Филиалы</p>
          <ul className="smt-footer-list is-sm">
            {BRANCHES.map((b) => (
              <li key={b.id}>
                <Link href={`/kontakty/?branch=${b.id}#zayavka`}>{b.address}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="smt-footer-bottom">
        <div className="smt-container smt-footer-bottom-inner">
          <p>© 2026 {CLINIC.legalName}. Все права защищены.</p>
          <nav aria-label="Правовые документы" className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy" className="hover:underline">Политика конфиденциальности</Link>
            <Link href="/personal-data-consent" className="hover:underline">Согласие на обработку ПД</Link>
            <Link href="/user-agreement" className="hover:underline">Пользовательское соглашение</Link>
            <Link href="/cookies" className="hover:underline">Cookie</Link>
            <Link href="/legal" className="hover:underline">Сведения об МО</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
