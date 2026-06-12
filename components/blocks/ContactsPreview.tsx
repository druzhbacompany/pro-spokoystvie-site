import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { CLINIC } from "@/lib/data";

/** ContactsPreview — «Как нас найти». Static map link (no heavy embed). */
export function ContactsPreview() {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-14">
      <Reveal>
        <div>
          <p className="type-eyebrow mb-3">Контакты</p>
          <span className="horizon-line mb-5" aria-hidden />
          <h2 className="type-h2">Как нас найти</h2>
          <ul className="mt-6 space-y-4">
            <li className="flex gap-3">
              <Icon name="pin" size={22} className="mt-0.5 flex-none text-brand" />
              <span className="type-body text-text-primary">{CLINIC.address}</span>
            </li>
            <li className="flex gap-3">
              <Icon name="phone" size={22} className="mt-0.5 flex-none text-brand" />
              <a href={CLINIC.phoneHref} className="type-body font-medium text-text-primary hover:text-brand">
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
              <Icon name="clock" size={22} className="mt-0.5 flex-none text-brand" />
              <span className="type-body text-text-secondary">
                {CLINIC.hoursWeek}
                <br />
                {CLINIC.hoursWeekend}
              </span>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={CLINIC.yandexMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-control border border-border px-5 font-medium text-text-primary hover:bg-bg-alt"
            >
              Открыть в Яндекс.Картах <Icon name="arrow" size={18} className="text-brand" />
            </a>
            <a
              href={CLINIC.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-control border border-border px-5 font-medium text-text-primary hover:bg-bg-alt"
            >
              Открыть в Google Maps <Icon name="arrow" size={18} className="text-brand" />
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <a
          href={CLINIC.yandexMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="warm-field flex aspect-[4/3] items-center justify-center rounded-media border border-border text-center"
          aria-label="Открыть карту проезда в Яндекс.Картах"
        >
          <span className="flex flex-col items-center gap-3 text-text-secondary">
            <Icon name="pin" size={40} className="text-brand" />
            <span className="type-body-sm max-w-xs">
              {CLINIC.addressShort} — нажмите, чтобы открыть карту проезда
            </span>
          </span>
        </a>
      </Reveal>
    </div>
  );
}
