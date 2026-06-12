"use client";

import { useState, type FormEvent } from "react";
import { CLINIC, TIME_SLOTS } from "@/lib/data";

/** V4 booking form (Scenario B). Name + phone + consent. Honest, no scarcity, honeypot. */
export function BookingFormV4() {
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const d = new FormData(f);
    if ((d.get("company") as string)?.length) return;
    const name = (d.get("name") as string)?.trim();
    const phone = (d.get("phone") as string)?.trim();
    if (!name || !phone) return setError("Укажите имя и телефон — это всё, что нужно.");
    if (!d.get("consent")) return setError("Отметьте согласие на обработку персональных данных.");
    setError(null);
    setDone(name);
    f.reset();
  }

  if (done)
    return (
      <div className="v2-card p-7 text-center" role="status" aria-live="polite">
        <p className="v2-h3">Спасибо, {done}.</p>
        <p className="v2-body mt-2" style={{ color: "var(--v2-text-mid)" }}>
          Мы перезвоним в течение 15 минут в рабочее время. В нерабочее время — первыми с 08:00.
        </p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="v2-card p-6 md:p-7">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="grid gap-5">
        <fieldset className="flex flex-col gap-2">
          <legend className="v2-body mb-1" style={{ color: "var(--v2-text-mid)" }}>Удобное время</legend>
          <div className="flex flex-wrap gap-2">
            {TIME_SLOTS.map((s, i) => (
              <label key={s.value} className="flex min-h-[48px] cursor-pointer items-center gap-2 rounded-xl border px-4 has-[:checked]:border-[var(--v2-blue)] has-[:checked]:bg-[var(--v2-blue-pale)]" style={{ borderColor: "var(--v2-border)", color: "var(--v2-blue-deep)" }}>
                <input type="radio" name="time" value={s.value} defaultChecked={i === 0} className="accent-[var(--v2-blue)]" />
                {s.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="bf-name" className="v2-body" style={{ color: "var(--v2-text-mid)" }}>Как вас зовут?</label>
            <input id="bf-name" name="name" type="text" autoComplete="given-name" placeholder="Ваше имя" className="v2-input" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="bf-phone" className="v2-body" style={{ color: "var(--v2-text-mid)" }}>Ваш телефон</label>
            <input id="bf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" className="v2-input" />
          </div>
        </div>
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" name="consent" className="mt-1 h-5 w-5 flex-none accent-[var(--v2-blue)]" />
          <span className="v2-body" style={{ color: "var(--v2-text-mid)" }}>Согласен на обработку персональных данных для записи на приём.</span>
        </label>
        {error ? <p className="v2-body" style={{ color: "var(--v2-error)" }} role="alert">{error}</p> : null}
        <button type="submit" className="v2-btn v2-btn-primary w-full">Перезвоним и подберём время</button>
        <p className="text-center text-[13px]" style={{ color: "var(--v2-text-mid)" }}>
          Или позвоните: {CLINIC.phone} · {CLINIC.hoursWeek} · {CLINIC.hoursWeekend}
        </p>
      </div>
    </form>
  );
}
