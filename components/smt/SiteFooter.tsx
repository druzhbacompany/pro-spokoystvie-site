import Link from "next/link";
import { CLINIC, NAV, BRANCHES } from "@/lib/data";

/** SMT-style footer. PRO contacts + legal + unified nav. */
export function SiteFooter() {
  return (
    <footer style={{ background: "#15222b", color: "#e7eef3" }}>
      <div className="smt-container grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="text-xl font-bold" style={{ color: "#fff" }}>ПРО спокойствие</p>
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed" style={{ color: "#9fb2c0" }}>
            Психиатрия, психотерапия, психология и неврология в Екатеринбурге. Спокойно, конфиденциально, без постановки на учёт.
          </p>
          <dl className="mt-5 space-y-1 text-[13px]" style={{ color: "#9fb2c0" }}>
            <div>{CLINIC.legalName} · ИНН {CLINIC.inn} · ОГРН {CLINIC.ogrn}</div>
            <div>Лицензия Минздрава №{CLINIC.license}</div>
            <div>{CLINIC.licenseAuthority}</div>
          </dl>
        </div>
        <nav aria-label="Навигация в подвале">
          <p className="smt-eyebrow" style={{ color: "#6f9fbe" }}>Разделы</p>
          <ul className="mt-4 space-y-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-[15px] hover:opacity-80" style={{ color: "#c7d4dd" }}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="smt-eyebrow" style={{ color: "#6f9fbe" }}>Контакты</p>
          <ul className="mt-4 space-y-3 text-[15px]" style={{ color: "#c7d4dd" }}>
            <li><a href={CLINIC.phoneHref} className="font-semibold hover:opacity-80" style={{ color: "#e7eef3" }}>{CLINIC.phone}</a></li>
            <li><a href={CLINIC.telegramHref} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">Telegram {CLINIC.telegram}</a></li>
            <li><a href={CLINIC.emailHref} className="hover:opacity-80">{CLINIC.email}</a></li>
            <li>{CLINIC.hoursWeek} · {CLINIC.hoursWeekend}</li>
          </ul>
          <p className="smt-eyebrow mt-6" style={{ color: "#6f9fbe" }}>Филиалы</p>
          <ul className="mt-3 space-y-2 text-[15px]" style={{ color: "#c7d4dd" }}>
            {BRANCHES.map((b) => (
              <li key={b.id}>
                <Link href={`/kontakty/?branch=${b.id}#zayavka`} className="hover:opacity-80">{b.address}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #2e4250" }}>
        <div className="smt-container flex flex-col gap-2 py-5 text-[13px] md:flex-row md:items-center md:justify-between" style={{ color: "#7e94a2" }}>
          <p>© 2026 {CLINIC.legalName}. Все права защищены.</p>
          <p>Политика конфиденциальности · Согласие на обработку ПД</p>
        </div>
      </div>
    </footer>
  );
}
