"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { CLINIC, TIME_SLOTS, branchById } from "@/lib/data";

/** Direction options (NOT specialists — staff may change, never hardcode doctors). */
const DIRECTIONS = [
  "Не знаю, нужна помощь с выбором",
  "Тревога / панические атаки",
  "Депрессия / сниженное настроение",
  "Бессонница",
  "Психотерапия",
  "Психология",
  "Психиатрия",
  "Неврология",
  "Восстановительные программы / IV-терапия",
  "Зависимое поведение / поддержка ремиссии",
] as const;

/** Map a free-text service/topic to the closest direction option (best-effort prefill). */
function directionFromContext(text?: string): string {
  if (!text) return "";
  const t = text.toLowerCase();
  if (/тревог|паник|панич|атак|окр|невроз|фоби/.test(t)) return "Тревога / панические атаки";
  if (/депресс|настроени|апати/.test(t)) return "Депрессия / сниженное настроение";
  if (/бессонниц|сон|сна|insomn/.test(t)) return "Бессонница";
  if (/зависим|ремисси|алког|нарко|игров/.test(t)) return "Зависимое поведение / поддержка ремиссии";
  if (/капельниц|iv|инфуз|восстанов/.test(t)) return "Восстановительные программы / IV-терапия";
  if (/невролог|мигрен|голов|спин|остеохондроз|мануал/.test(t)) return "Неврология";
  if (/психотерап/.test(t)) return "Психотерапия";
  if (/психолог/.test(t)) return "Психология";
  if (/психиатр/.test(t)) return "Психиатрия";
  if (/психосомат/.test(t)) return "Психиатрия";
  return "";
}

/**
 * SMT-style booking form. Posts to /api/lead with full conversion context
 * (page URL/title, source block, service/doctor/price item, CTA label).
 * Service/doctor/price can come from props OR ?service=/?doctor=/?priceItem= query.
 */
export function BookingForm({
  topic,
  doctor,
  priceItem,
  price,
  sourceBlock,
  ctaLabel = "Перезвоним и подберём время",
}: {
  topic?: string;
  doctor?: string;
  priceItem?: string;
  price?: string;
  sourceBlock?: string;
  ctaLabel?: string;
}) {
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ctx, setCtx] = useState<{ service?: string; doctor?: string; priceItem?: string; price?: string; branch?: string; branchAddress?: string }>({
    service: topic,
    doctor,
    priceItem,
    price,
  });
  const [direction, setDirection] = useState<string>(directionFromContext(topic));

  // Fallback: read context from URL query (set by service/price/branch card links).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const branch = branchById(q.get("branch") ?? "");
    const service = topic ?? q.get("service") ?? undefined;
    setCtx((prev) => ({
      service: prev.service ?? q.get("service") ?? undefined,
      doctor: prev.doctor ?? q.get("doctor") ?? undefined,
      priceItem: prev.priceItem ?? q.get("priceItem") ?? undefined,
      price: prev.price ?? q.get("price") ?? undefined,
      branch: branch?.title,
      branchAddress: branch?.address,
    }));
    // Prefill direction from service/topic/priceItem if not already chosen.
    setDirection((prev) => prev || directionFromContext(service ?? q.get("priceItem") ?? undefined));
  }, [topic]);

  const contextLine = ctx.branch
    ? `Вы выбрали филиал: ${ctx.branchAddress ?? ctx.branch}`
    : ctx.doctor
      ? `Вы выбрали врача: ${ctx.doctor}`
      : ctx.priceItem
        ? `Вы выбрали: ${ctx.priceItem}${ctx.price ? ` · ${ctx.price}` : ""}`
        : ctx.service
          ? `Вы выбрали: ${ctx.service}`
          : null;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const d = new FormData(f);
    if ((d.get("company") as string)?.length) return;
    const name = (d.get("name") as string)?.trim();
    const phone = (d.get("phone") as string)?.trim();
    if (!name || !phone) return setError("Укажите имя и телефон — это всё, что нужно.");
    if (!d.get("consent")) return setError("Отметьте согласие на обработку персональных данных.");
    if (!d.get("consentSpecial")) return setError("Отметьте согласие на обработку сведений о состоянии здоровья.");
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          time: (d.get("time") as string) || null,
          topic: ctx.service ?? null,
          doctor: ctx.doctor ?? null,
          direction: direction || null,
          priceItem: ctx.priceItem ?? null,
          price: ctx.price ?? null,
          branch: ctx.branch ?? null,
          branchAddress: ctx.branchAddress ?? null,
          sourceBlock: sourceBlock ?? null,
          ctaLabel,
          pageUrl: window.location.pathname + window.location.search,
          pageTitle: document.title,
          consent: true,
          consentSpecial: true,
          consentMarketing: !!d.get("consentMarketing"),
          company: (d.get("company") as string) || "",
        }),
      });
      if (!res.ok) throw new Error("failed");
      setDone(name);
      f.reset();
    } catch {
      setError("Не удалось отправить заявку. Позвоните нам или попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  if (done)
    return (
      <div className="smt-card smt-card-pad text-center" role="status" aria-live="polite">
        <p className="smt-h3">Спасибо, {done}.</p>
        <p className="smt-body mt-2 smt-muted">
          Заявка отправлена. Администратор свяжется с вами в течение 15 минут в рабочее время.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-4">
          <Link href="/" className="smt-link">Главная</Link>
          <Link href="/uslugi/" className="smt-link">Услуги</Link>
          <Link href="/kontakty/" className="smt-link">Контакты</Link>
        </div>
      </div>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="smt-card smt-card-pad md:!p-7">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {contextLine ? (
        <p className="mb-4 rounded-[12px] px-4 py-3 text-[15px]" style={{ background: "var(--smt-blue-bg)", color: "var(--smt-dark)" }}>
          {contextLine}
        </p>
      ) : null}
      <div className="grid gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="smt-direction" className="smt-body smt-muted">С чем хотите обратиться?</label>
          <select
            id="smt-direction"
            name="direction"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="smt-input"
            style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23809aa5' stroke-width='1.6' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "40px" }}
          >
            <option value="">Не обязательно — можно выбрать</option>
            {DIRECTIONS.map((dir) => (
              <option key={dir} value={dir}>{dir}</option>
            ))}
          </select>
        </div>
        <fieldset className="flex flex-col gap-2">
          <legend className="smt-body mb-1 smt-muted">Удобное время</legend>
          <div className="flex flex-wrap gap-2">
            {TIME_SLOTS.map((s, i) => (
              <label key={s.value} className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-[15px] border px-4" style={{ borderColor: "var(--smt-border)", color: "var(--smt-dark)" }}>
                <input type="radio" name="time" value={s.value} defaultChecked={i === 0} style={{ accentColor: "var(--smt-blue)" }} />
                {s.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="smt-name" className="smt-body smt-muted">Как вас зовут?</label>
            <input id="smt-name" name="name" type="text" autoComplete="given-name" placeholder="Ваше имя" className="smt-input" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="smt-phone" className="smt-body smt-muted">Ваш телефон</label>
            <input id="smt-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" className="smt-input" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" name="consent" required className="mt-1 h-5 w-5 flex-none" style={{ accentColor: "var(--smt-blue)" }} />
            <span className="text-[14px] smt-muted">
              Я согласен(на) на обработку персональных данных для записи на приём и ознакомлен(а) с{" "}
              <Link href="/privacy" className="smt-link" target="_blank" rel="noopener noreferrer">Политикой в отношении обработки персональных данных</Link>{" "}
              и{" "}
              <Link href="/user-agreement" className="smt-link" target="_blank" rel="noopener noreferrer">Пользовательским соглашением</Link>.{" "}
              <span style={{ color: "#b91c1c" }}>*</span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" name="consentSpecial" required className="mt-1 h-5 w-5 flex-none" style={{ accentColor: "var(--smt-blue)" }} />
            <span className="text-[14px] smt-muted">
              Я согласен(на) на обработку{" "}
              <Link href="/special-consent" className="smt-link" target="_blank" rel="noopener noreferrer">сведений о состоянии здоровья</Link>{" "}
              (специальная категория персональных данных).{" "}
              <span style={{ color: "#b91c1c" }}>*</span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" name="consentMarketing" className="mt-1 h-5 w-5 flex-none" style={{ accentColor: "var(--smt-blue)" }} />
            <span className="text-[14px] smt-muted">
              Хочу получать новости и специальные предложения МЦ «ПРО Спокойствие».
            </span>
          </label>
        </div>
        {error ? <p className="smt-body" style={{ color: "#b91c1c" }} role="alert">{error}</p> : null}
        <button type="submit" disabled={loading} className="smt-btn smt-btn-primary w-full">
          {loading ? "Отправляем…" : ctaLabel}
        </button>
        <p className="text-center text-[13px] smt-muted">
          Нажимая «{ctaLabel}», вы соглашаетесь на обработку персональных данных. Данные передаются по защищённому каналу и хранятся на серверах в Российской Федерации.
        </p>
        <p className="text-center text-[13px] smt-muted">
          Или позвоните: {CLINIC.phone} · {CLINIC.hoursWeek} · {CLINIC.hoursWeekend}
        </p>
      </div>
    </form>
  );
}
