import Image from "next/image";
import Link from "next/link";
import { BRANCHES, type Branch } from "@/lib/data";

const routeUrl = (address: string) =>
  `https://yandex.ru/maps/?mode=routes&rtext=~${encodeURIComponent(address)}`;

/** SMT-style branch card: address, hours, phone, route buttons, booking with branch context. */
export function BranchCard({ b }: { b: Branch }) {
  return (
    <div className="smt-card smt-card-pad md:!p-7 flex h-full flex-col">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full" style={{ background: "var(--smt-blue-bg)", color: "var(--smt-blue)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 21c5-5.5 7-8.5 7-12a7 7 0 1 0-14 0c0 3.5 2 6.5 7 12M12 8a2.5 2.5 0 0 1 0 5" />
          </svg>
        </span>
        <div>
          <h3 className="smt-h3">{b.title}</h3>
          <p className="mt-1 smt-body" style={{ color: "var(--smt-dark)" }}>{b.address}</p>
        </div>
      </div>
      <ul className="mt-4 space-y-1.5 text-[14px] smt-muted">
        <li>{b.hoursWeek} · {b.hoursWeekend}</li>
        <li><a href={b.phoneHref} className="smt-link">{b.phone}</a></li>
        <li>{b.note}</li>
      </ul>
      <div className="mt-5 flex flex-1 flex-wrap items-end gap-3">
        <Link href={`/kontakty/?branch=${b.id}#zayavka`} className="smt-btn smt-btn-primary !min-h-[44px]">Записаться</Link>
        <a href={b.yandexMaps} target="_blank" rel="noopener noreferrer" className="smt-btn smt-btn-ghost !min-h-[44px]">Открыть в Яндекс.Картах</a>
        <a href={routeUrl(b.address)} target="_blank" rel="noopener noreferrer" className="smt-btn smt-btn-ghost !min-h-[44px]">Построить маршрут</a>
      </div>

      {b.gallery && b.gallery.length > 0 && (
        <div className="mt-6 border-t pt-5" style={{ borderColor: "var(--smt-border)" }}>
          <p className="mb-3 text-[13px] font-medium uppercase tracking-widest" style={{ color: "var(--smt-blue)", opacity: 0.8 }}>
            Фотографии
          </p>
          <ul style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            {b.gallery.map((photo) => (
              <li key={photo.src} style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "10px", background: "var(--smt-grey)" }}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 33vw, 20vw"
                  className="object-cover"
                  style={{ transition: "opacity 0.3s" }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/** Non-empty map-like panel: branch list + route buttons + map motif (no blank placeholder). */
export function BranchMapPanel() {
  return (
    <div className="overflow-hidden rounded-[15px] border" style={{ borderColor: "var(--smt-border)" }}>
      <div className="relative px-6 py-10" style={{ background: "linear-gradient(135deg, var(--smt-blue-bg), var(--smt-grey))" }}>
        <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 28px, rgba(0,53,75,.04) 28px 29px), repeating-linear-gradient(90deg, transparent 0 28px, rgba(0,53,75,.04) 28px 29px)" }} />
        <div className="relative">
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--smt-blue)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 21c5-5.5 7-8.5 7-12a7 7 0 1 0-14 0c0 3.5 2 6.5 7 12M12 8a2.5 2.5 0 0 1 0 5" />
            </svg>
            <span className="smt-h3">Мы на карте Екатеринбурга</span>
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {BRANCHES.map((b) => (
              <li key={b.id} className="rounded-[12px] bg-white/80 p-4">
                <p className="text-[15px] font-semibold" style={{ color: "var(--smt-dark)" }}>{b.title}</p>
                <p className="mt-1 text-[14px] smt-muted">{b.address}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a href={b.yandexMaps} target="_blank" rel="noopener noreferrer" className="smt-link text-[14px]">Яндекс.Карты →</a>
                  <a href={routeUrl(b.address)} target="_blank" rel="noopener noreferrer" className="smt-link text-[14px]">Маршрут →</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Branches section: title + branch cards + map panel. */
export function BranchesSection({ title = "Филиалы клиники", alt = false, showMap = true }: { title?: string; alt?: boolean; showMap?: boolean }) {
  return (
    <section className={`smt-section ${alt ? "smt-section-alt" : ""}`}>
      <div className="smt-container">
        <p className="smt-eyebrow">Адреса</p>
        <h2 className="smt-h2 mt-2">{title}</h2>
        <p className="mt-3 max-w-[68ch] smt-body smt-muted">Контактные данные общие для всех филиалов. Выберите удобный адрес — перезвоним и подтвердим запись.</p>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {BRANCHES.map((b) => (<li key={b.id}><BranchCard b={b} /></li>))}
        </ul>
        {showMap ? <div className="mt-6"><BranchMapPanel /></div> : null}
      </div>
    </section>
  );
}
