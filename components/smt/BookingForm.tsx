"use client";

import { useState, type FormEvent } from "react";
import { CLINIC, TIME_SLOTS } from "@/lib/data";

/** SMT-style booking form. Posts to /api/lead. Name + phone + consent, honeypot. */
export function BookingForm({ topic, doctor }: { topic?: string; doctor?: string }) {
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
          topic: topic ?? null,
          doctor: doctor ?? null,
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
          Мы перезвоним в течение 15 минут в рабочее время. В нерабочее — первыми с 08:00.
        </p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="smt-card smt-card-pad md:!p-7">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {topic ? <p className="smt-body mb-4">Тема: <strong style={{ color: "var(--smt-dark)" }}>{topic}</strong></p> : null}
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
          {loading ? "Отправляем…" : "Перезвоним и подберём время"}
        </button>
        <p className="text-center text-[13px] smt-muted">
          Или позвоните: {CLINIC.phone} · {CLINIC.hoursWeek} · {CLINIC.hoursWeekend}
        </p>
      </div>
    </form>
  );
}
