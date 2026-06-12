import Link from "next/link";
import { CLINIC, NAV } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-alt">
      <div className="container-page grid gap-10 py-16 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl font-medium text-text-primary">
            ПРО спокойствие
          </p>
          <p className="type-body-sm mt-3 max-w-xs text-text-secondary">
            Психиатрия и психотерапия в Екатеринбурге. Спокойно,
            конфиденциально, без постановки на учёт.
          </p>
          <dl className="type-micro mt-5 space-y-1">
            <div>{CLINIC.legalName}</div>
            <div>ИНН {CLINIC.inn} · ОГРН {CLINIC.ogrn}</div>
            <div>Лицензия №{CLINIC.license}</div>
            <div>{CLINIC.licenseAuthority}</div>
          </dl>
        </div>

        <nav aria-label="Навигация в подвале">
          <p className="type-eyebrow mb-4">Разделы</p>
          <ul className="space-y-3">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-text-secondary transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="type-eyebrow mb-4">Контакты</p>
          <ul className="space-y-3 text-text-secondary">
            <li>
              <a href={CLINIC.phoneHref} className="font-semibold text-text-primary hover:text-brand">
                {CLINIC.phone}
              </a>
            </li>
            <li>
              <a href={CLINIC.telegramHref} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                Telegram {CLINIC.telegram}
              </a>
            </li>
            <li>
              <a href={CLINIC.emailHref} className="hover:text-brand">
                {CLINIC.email}
              </a>
            </li>
            <li>{CLINIC.address}</li>
            <li className="type-caption">
              {CLINIC.hoursWeek}
              <br />
              {CLINIC.hoursWeekend}
            </li>
            <li>
              <a
                href={CLINIC.yandexMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline"
              >
                Открыть в Яндекс.Картах →
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-text-muted md:flex-row md:items-center md:justify-between">
          <p className="type-micro">
            © 2026 {CLINIC.legalName}. Все права защищены.
          </p>
          <p className="type-micro">
            Политика конфиденциальности · Согласие на обработку персональных
            данных
          </p>
        </div>
      </div>
    </footer>
  );
}
