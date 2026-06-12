import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { FaqV4 } from "./FaqV4";
import { BookingFormV4 } from "./BookingFormV4";
import { CLINIC } from "@/lib/data";
import { PROCESS, CONDITIONS, DIRECTIONS, TEAM, PRICES, DOCS, FAQ_V4, type V4Doctor } from "@/lib/home-v4";

function Head({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="max-w-[60ch]">
      <p className="v2-eyebrow2 mb-3">{eyebrow}</p>
      <span className="v2-hairline mb-5" aria-hidden />
      <h2 className="v2-h2">{title}</h2>
      {lead ? <p className="v2-body mt-4" style={{ color: "var(--v2-text-mid)" }}>{lead}</p> : null}
    </div>
  );
}

/* 1. Process — enacts the hero promise */
export function ProcessSection() {
  return (
    <section className="v2-section" style={{ background: "var(--v2-blue-pale-2)" }}>
      <div className="v2-container">
        <Reveal><Head eyebrow="Как мы помогаем" title="Вам не нужно собирать помощь по кусочкам" lead="Вы приходите с одним разговором — клиника определяет маршрут и ведёт вас по нужным специалистам. Решения и темп остаются за вами." /></Reveal>
        <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-5">
          {PROCESS.map((s, i) => (
            <Reveal key={s.n} delay={i * 70} as="li">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border font-semibold" style={{ borderColor: "var(--v2-blue)", color: "var(--v2-blue)" }}>{s.n}</span>
                <h3 className="v2-h4 mt-4">{s.title}</h3>
                <p className="v2-body mt-2" style={{ color: "var(--v2-text-mid)" }}>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 2. Conditions — bento (top-2 larger) */
export function ConditionsSection() {
  return (
    <section className="v2-section">
      <div className="v2-container">
        <Reveal><Head eyebrow="С чем обращаются" title="Узнаёте своё состояние?" lead="Человеческими словами, без клинических ярлыков. Выберите близкое — мы подскажем, с чего начать." /></Reveal>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CONDITIONS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 50} as="li" className={c.big ? "lg:col-span-2" : ""}>
              <div className={`v2-tile is-link flex h-full ${c.big ? "items-center gap-5 p-7" : "flex-col p-6"}`}>
                <Icon name={c.icon} size={c.big ? 40 : 34} style={{ color: "var(--v2-blue)" }} className="flex-none" />
                <div className={c.big ? "" : "mt-4"}>
                  <h3 className="v2-h4">{c.title}</h3>
                  <p className="v2-body mt-1.5" style={{ color: "var(--v2-text-mid)" }}>{c.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 3. Directions / services */
export function DirectionsSection() {
  return (
    <section className="v2-section" style={{ background: "var(--v2-blue-pale-2)" }}>
      <div className="v2-container">
        <Reveal><Head eyebrow="Основные направления" title="Помощь по всему спектру — в одной клинике" lead="Психика, нервная система и поведение под одной крышей: вам не придётся ходить по разным адресам." /></Reveal>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DIRECTIONS.map((d, i) => (
            <Reveal key={d.title} delay={(i % 4) * 50} as="li">
              <div className="v2-tile flex h-full flex-col p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "var(--v2-blue-pale)" }}>
                  <Icon name={d.icon} size={24} style={{ color: "var(--v2-blue)" }} />
                </span>
                <h3 className="v2-h4 mt-4">{d.title}</h3>
                <p className="v2-body mt-1.5" style={{ color: "var(--v2-text-mid)" }}>{d.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function DoctorAvatar({ d, size = "aspect-[3/4]" }: { d: V4Doctor; size?: string }) {
  if (d.photo)
    return (
      <div className={`relative overflow-hidden rounded-[16px] ${size}`} style={{ border: "1px solid var(--v2-border)" }} data-temp-asset={d.temp ? "true" : undefined}>
        <Image src={d.photo} alt={`Фото: ${d.name}`} fill sizes="(max-width:768px) 100vw, 30vw" className="object-cover object-top" />
      </div>
    );
  return (
    <div className={`flex items-center justify-center rounded-[16px] ${size}`} style={{ background: "var(--v2-blue-pale)" }} role="img" aria-label={d.name}>
      <span className="font-bold" style={{ color: "var(--v2-blue)", fontSize: "clamp(1.8rem,5vw,3rem)" }} aria-hidden>{d.initials}</span>
    </div>
  );
}

/* 4. Team */
export function TeamSection() {
  return (
    <section className="v2-section">
      <div className="v2-container">
        <Reveal><Head eyebrow="Команда специалистов" title="Шесть врачей, которые ведут вас вместе" lead="Реальные специалисты клиники. Часть портретов мы обновляем — где-то временно показаны инициалы." /></Reveal>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((d, i) => (
            <Reveal key={d.short} delay={(i % 3) * 60} as="li">
              <div className={`v2-tile flex h-full flex-col p-5 ${d.chief ? "ring-1" : ""}`} style={d.chief ? { boxShadow: "var(--v2-shadow-md)", borderColor: "var(--v2-blue-soft)" } : undefined}>
                <DoctorAvatar d={d} />
                {d.chief ? (
                  <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold" style={{ background: "var(--v2-blue-pale)", color: "var(--v2-blue)" }}>
                    <Icon name="shield" size={14} /> Главный врач
                  </span>
                ) : null}
                <h3 className="v2-h3 mt-3">{d.name}</h3>
                <p className="text-[14px]" style={{ color: "var(--v2-text-mid)" }}>{d.specialty}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {d.helps.slice(0, 4).map((h) => (
                    <span key={h} className="rounded-full px-3 py-1 text-[13px] font-medium" style={{ background: "var(--v2-blue-pale)", color: "var(--v2-blue)" }}>{h}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 5. Chief physician */
export function ChiefSection() {
  const c = TEAM[0];
  return (
    <section className="v2-section relative overflow-hidden" style={{ background: "var(--v2-blue-pale-2)" }}>
      <div className="v2-container">
        <div className="grid items-center gap-10 md:grid-cols-[5fr_7fr] md:gap-14">
          <Reveal><div className="mx-auto w-full max-w-sm"><DoctorAvatar d={c} size="aspect-[4/5]" /></div></Reveal>
          <Reveal delay={80}>
            <div className="max-w-[60ch]">
              <p className="v2-eyebrow2 mb-3">Медицинское руководство</p>
              <span className="v2-hairline mb-5" aria-hidden />
              <h2 className="v2-h2">{c.name}</h2>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[14px] font-semibold" style={{ background: "var(--v2-blue-pale)", color: "var(--v2-blue)" }}>
                <Icon name="shield" size={16} /> Главный врач · Собственник клиники
              </span>
              <p className="v2-body mt-4">Врач-психиатр, психотерапевт. Отвечает за стандарт помощи каждого специалиста.</p>
              <blockquote className="v2-body mt-6 border-l-2 pl-5 italic" style={{ borderColor: "var(--v2-blue-soft)", color: "var(--v2-text-mid)" }}>
                «Моя задача — чтобы человек ушёл от нас спокойнее, чем пришёл. Без осуждения, без давления, минимально достаточными средствами.»
              </blockquote>
              <p className="mt-4 text-[14px]" style={{ color: "var(--v2-text-mid)" }}>Лицензия Минздрава №{CLINIC.license}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#zapis" className="v2-btn v2-btn-primary">Записаться к главному врачу</a>
                <Link href="/vrachi/romanovsky-vo/" className="v2-btn v2-btn-ghost">Подробнее о враче</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* 6. License & documents */
export function LicenseSection() {
  return (
    <section className="v2-section">
      <div className="v2-container grid gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
        <Reveal>
          <div>
            <Head eyebrow="Документы" title="Настоящая лицензированная клиника" />
            <p className="v2-body mt-4" style={{ color: "var(--v2-text-mid)" }}>
              Деятельность лицензирована {CLINIC.licenseAuthority}. Лицензия №{CLINIC.license}.
            </p>
            <dl className="mt-5 space-y-2 text-[15px]" style={{ color: "var(--v2-text-mid)" }}>
              <div>{CLINIC.legalName} · ИНН {CLINIC.inn} · ОГРН {CLINIC.ogrn}</div>
              <div>{CLINIC.address}</div>
              <div>{CLINIC.hoursWeek} · {CLINIC.hoursWeekend}</div>
            </dl>
            <a href={CLINIC.licenseCheckUrl} target="_blank" rel="noopener noreferrer" className="v2-btn v2-btn-ghost mt-6 !min-h-[48px]">
              Проверить лицензию <Icon name="arrow" size={18} style={{ color: "var(--v2-blue)" }} />
            </a>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
            {DOCS.map((doc) => (
              <li key={doc.src}>
                <figure className="v2-tile overflow-hidden">
                  <div className="relative aspect-[3/4]" style={{ background: "var(--v2-blue-pale)" }}>
                    <Image src={doc.src} alt={doc.label} fill sizes="(max-width:768px) 50vw, 22vw" className="object-cover object-top" />
                  </div>
                  <figcaption className="p-3 text-[12px]" style={{ color: "var(--v2-text-mid)" }}>{doc.label}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* 7. Recovery programs / IV therapy */
export function ProgramsSection() {
  const items = [
    { icon: "leaf" as const, title: "Восстановительные программы", text: "Восстановление состояния под наблюдением врача, понятными этапами." },
    { icon: "wave" as const, title: "IV-терапия по назначению врача", text: "Инфузионная терапия — только по медицинским показаниям, в процедурном кабинете." },
    { icon: "loop" as const, title: "Поддержка ремиссии", text: "Работа с зависимым поведением вне обострения: триггеры, риск срыва, помощь близким." },
  ];
  return (
    <section className="v2-section" style={{ background: "var(--v2-blue-pale-2)" }}>
      <div className="v2-container">
        <Reveal><Head eyebrow="Восстановление" title="Восстановительные программы и IV-терапия" lead="По назначению врача, без обещаний результата. Помощь выстраивается под ваше состояние." /></Reveal>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 60} as="li">
              <div className="v2-tile flex h-full flex-col p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "var(--v2-bg)" }}>
                  <Icon name={it.icon} size={24} style={{ color: "var(--v2-blue)" }} />
                </span>
                <h3 className="v2-h4 mt-4">{it.title}</h3>
                <p className="v2-body mt-1.5" style={{ color: "var(--v2-text-mid)" }}>{it.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 8. Pricing */
export function PricingSection() {
  return (
    <section className="v2-section">
      <div className="v2-container">
        <Reveal><Head eyebrow="Цены" title="Прозрачно и без скрытых доплат" lead="Точная стоимость зависит от ситуации — уточним по телефону. Конфликтные позиции не публикуем." /></Reveal>
        <div className="mt-10 mx-auto max-w-3xl overflow-hidden rounded-[18px]" style={{ border: "1px solid var(--v2-border)" }}>
          {PRICES.map((p, i) => (
            <div key={p.name} className="flex items-center justify-between gap-4 px-5 py-4" style={{ borderTop: i ? "1px solid var(--v2-border)" : "none", background: "var(--v2-surface)" }}>
              <div>
                <p className="v2-h4">{p.name}</p>
                <p className="text-[13px]" style={{ color: "var(--v2-text-mid)" }}>{p.dur}</p>
              </div>
              <span className="font-semibold tabular-nums" style={{ color: "var(--v2-blue-deep)" }}>{p.price}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[13px]" style={{ color: "var(--v2-text-mid)" }}>Полный прайс — по телефону {CLINIC.phone}.</p>
      </div>
    </section>
  );
}

/* 9. FAQ */
export function FaqSection() {
  return (
    <section className="v2-section" style={{ background: "var(--v2-blue-pale-2)" }}>
      <div className="v2-container">
        <Reveal><div className="mb-10 text-center"><span className="v2-hairline mx-auto mb-5" aria-hidden /><h2 className="v2-h2">Частые вопросы</h2></div></Reveal>
        <FaqV4 items={FAQ_V4} />
      </div>
    </section>
  );
}

/* 10. Contacts + booking */
export function ContactsSection() {
  return (
    <section id="zapis" className="v2-section" style={{ scrollMarginTop: "96px" }}>
      <div className="v2-container grid gap-10 md:grid-cols-2 md:gap-14">
        <Reveal>
          <div>
            <Head eyebrow="Контакты" title="Запишитесь на консультацию" lead="Оставьте номер — перезвоним и подберём время. Конфиденциально, без постановки на учёт." />
            <ul className="mt-6 space-y-4">
              <li className="flex gap-3"><Icon name="pin" size={22} style={{ color: "var(--v2-blue)" }} className="mt-0.5 flex-none" /><span className="v2-body" style={{ color: "var(--v2-blue-deep)" }}>{CLINIC.address}</span></li>
              <li className="flex gap-3"><Icon name="phone" size={22} style={{ color: "var(--v2-blue)" }} className="mt-0.5 flex-none" /><a href={CLINIC.phoneHref} className="v2-body font-semibold" style={{ color: "var(--v2-blue-deep)" }}>{CLINIC.phone}</a></li>
              <li className="flex gap-3"><Icon name="telegram" size={22} style={{ color: "var(--v2-blue)" }} className="mt-0.5 flex-none" /><a href={CLINIC.telegramHref} target="_blank" rel="noopener noreferrer" className="v2-body" style={{ color: "var(--v2-blue-deep)" }}>Telegram {CLINIC.telegram}</a></li>
              <li className="flex gap-3"><Icon name="clock" size={22} style={{ color: "var(--v2-blue)" }} className="mt-0.5 flex-none" /><span className="v2-body" style={{ color: "var(--v2-text-mid)" }}>{CLINIC.hoursWeek}<br />{CLINIC.hoursWeekend}</span></li>
            </ul>
            <a href={CLINIC.yandexMaps} target="_blank" rel="noopener noreferrer" className="v2-btn v2-btn-ghost mt-6 !min-h-[48px]">Открыть в Яндекс.Картах <Icon name="arrow" size={18} style={{ color: "var(--v2-blue)" }} /></a>
          </div>
        </Reveal>
        <Reveal delay={80}><div id="zayavka"><BookingFormV4 /></div></Reveal>
      </div>
    </section>
  );
}
