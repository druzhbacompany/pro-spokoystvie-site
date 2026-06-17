"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { CLINIC, TIME_SLOTS } from "@/lib/data";

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
  const [ctx, setCtx] = useState<{ service?: string; doctor?: string; priceItem?: string; price?: string }>({
    service: topic,
    doctor,
    priceItem,
    price,
  });

  // Fallback: read context from URL query (set by service/price card links).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setCtx((prev) => ({
      service: prev.service ?? q.get("service") ?? undefined,
      doctor: prev.doctor ?? q.get("doctor") ?? undefined,
      priceItem: prev.priceItem ?? q.get("priceItem") ?? undefined,
      price: prev.price ?? q.get("price") ?? undefined,
    }));
  }, []);

  const contextLine = ctx.doctor
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
          priceItem: ctx.priceItem ?? null,
          price: ctx.price ?? null,
          sourceBlock: sourceBlock ?? null,
          ctaLabel,
          pageUrl: window.location.pathname + window.location.search,
          pageTitle: document.title,
          consent: true,
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
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" name="consent" className="mt-1 h-5 w-5 flex-none" style={{ accentColor: "var(--smt-blue)" }} />
          <span className="smt-body smt-muted">Согласен на обработку персональных данных для записи на приём.</span>
        </label>
        {error ? <p className="smt-body" style={{ color: "#b91c1c" }} role="alert">{error}</p> : null}
        <button type="submit" disabled={loading} className="smt-btn smt-btn-primary w-full">
          {loading ? "Отправляем…" : ctaLabel}
        </button>
        <p className="text-center text-[13px] smt-muted">
          Или позвоните: {CLINIC.phone} · {CLINIC.hoursWeek} · {CLINIC.hoursWeekend}
        </p>
      </div>
    </form>
  );
}
