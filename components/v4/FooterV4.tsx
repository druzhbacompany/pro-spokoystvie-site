import Image from "next/image";
import Link from "next/link";
import { CLINIC, NAV } from "@/lib/data";

export function FooterV4() {
  return (
    <footer style={{ background: "#15222B", color: "#E7EEF3" }}>
      <div className="v2-container grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Image src="/donor-assets-v2/logo/logo-candidate-a.png" alt="ПРО спокойствие" width={505} height={139} className="h-9 w-auto" />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed" style={{ color: "#9FB2C0" }}>
            Психотерапия, психология, психиатрия и неврология в Екатеринбурге. Спокойно, конфиденциально, без постановки на учёт.
          </p>
          <dl className="mt-5 space-y-1 text-[13px]" style={{ color: "#9FB2C0" }}>
            <div>{CLINIC.legalName} · ИНН {CLINIC.inn} · ОГРН {CLINIC.ogrn}</div>
            <div>Лицензия Минздрава №{CLINIC.license}</div>
          </dl>
        </div>
        <nav aria-label="Навигация в подвале">
          <p className="text-[13px] font-semibold uppercase tracking-wider" style={{ color: "#6F9FBE" }}>Разделы</p>
          <ul className="mt-4 space-y-3">
            {NAV.map((n) => (<li key={n.href}><Link href={n.href} className="text-[15px] hover:opacity-80" style={{ color: "#C7D4DD" }}>{n.label}</Link></li>))}
          </ul>
        </nav>
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-wider" style={{ color: "#6F9FBE" }}>Контакты</p>
          <ul className="mt-4 space-y-3 text-[15px]" style={{ color: "#C7D4DD" }}>
            <li><a href={CLINIC.phoneHref} className="font-semibold hover:opacity-80" style={{ color: "#E7EEF3" }}>{CLINIC.phone}</a></li>
            <li><a href={CLINIC.telegramHref} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">Telegram {CLINIC.telegram}</a></li>
            <li><a href={CLINIC.emailHref} className="hover:opacity-80">{CLINIC.email}</a></li>
            <li>{CLINIC.address}</li>
            <li>{CLINIC.hoursWeek} · {CLINIC.hoursWeekend}</li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #2E4250" }}>
        <div className="v2-container flex flex-col gap-2 py-5 text-[13px] md:flex-row md:items-center md:justify-between" style={{ color: "#7E94A2" }}>
          <p>© 2026 {CLINIC.legalName}. Все права защищены.</p>
          <p>Политика конфиденциальности · Согласие на обработку ПД</p>
        </div>
      </div>
    </footer>
  );
}
