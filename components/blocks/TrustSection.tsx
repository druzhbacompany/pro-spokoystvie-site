import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { CLINIC } from "@/lib/data";

const DOCS = [
  { src: "/assets/documents/license.jpg", label: "Лицензия Минздрава (с QR)" },
  { src: "/assets/documents/rules-priem.jpg", label: "Правила записи на приём" },
  { src: "/assets/documents/grafik-priem.jpg", label: "График приёма граждан" },
  { src: "/assets/documents/control-organy.jpg", label: "Контролирующие органы" },
];

/**
 * Verified-only trust (HOME PATCH §6 / DOCTORS §10). License large and
 * dignified is the day-1 premium asset. Reviews & external ratings hidden
 * until verified (empty → no block). Shared by home and doctor pages.
 */
export function TrustSection() {
  return (
    <div className="grid gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
      <Reveal>
        <div>
          <p className="type-eyebrow mb-3">Документы</p>
          <span className="horizon-line mb-5" aria-hidden />
          <h2 className="type-h2">Настоящая лицензированная клиника</h2>
          <p className="type-body mt-4 max-w-measure text-text-secondary">
            Деятельность клиники лицензирована {CLINIC.licenseAuthority}.
            Лицензия №{CLINIC.license}.
          </p>
          <dl className="type-body-sm mt-6 space-y-2 text-text-secondary">
            <div className="flex gap-2">
              <Icon name="shield" size={20} className="mt-0.5 flex-none text-brand" />
              <span>
                {CLINIC.legalName} · ИНН {CLINIC.inn} · ОГРН {CLINIC.ogrn}
              </span>
            </div>
            <div className="flex gap-2">
              <Icon name="pin" size={20} className="mt-0.5 flex-none text-brand" />
              <span>{CLINIC.address}</span>
            </div>
            <div className="flex gap-2">
              <Icon name="clock" size={20} className="mt-0.5 flex-none text-brand" />
              <span>
                {CLINIC.hoursWeek} · {CLINIC.hoursWeekend}
              </span>
            </div>
          </dl>
          <a
            href={CLINIC.licenseCheckUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-control border border-border px-5 font-medium text-text-primary transition-colors hover:bg-bg-alt"
          >
            Проверить лицензию в Росздравнадзоре
            <Icon name="arrow" size={18} className="text-brand" />
          </a>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
          {DOCS.map((doc) => (
            <li key={doc.src}>
              <figure className="overflow-hidden rounded-media border border-border bg-surface shadow-sm">
                <div className="relative aspect-[3/4] bg-bg-alt">
                  <Image
                    src={doc.src}
                    alt={doc.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 22vw"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="type-micro p-3">{doc.label}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
