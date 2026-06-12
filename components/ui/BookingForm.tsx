"use client";

import { useState, type FormEvent } from "react";
import { CLINIC, DOCTORS, TIME_SLOTS } from "@/lib/data";

/**
 * Scenario B booking form (pre-Medlock). Trust-before-form: rendered once,
 * low friction (name + phone + consent). Honest after-hours label.
 * No timers, no scarcity, no required email. Honeypot instead of CAPTCHA.
 */
export function BookingForm({
  lockedDoctor,
  showDoctorSelect = true,
}: {
  lockedDoctor?: string;
  showDoctorSelect?: boolean;
}) {
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if ((data.get("company") as string)?.length) return; // honeypot
    const name = (data.get("name") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();
    const consent = data.get("consent");
    if (!name || !phone) {
      setError("Пожалуйста, укажите имя и телефон — это всё, что нужно.");
      return;
    }
    if (!consent) {
      setError("Отметьте согласие на обработку персональных данных.");
      return;
    }
    setError(null);
    setDone(name);
    form.reset();
  }

  if (done) {
    return (
      <div
        className="rounded-card border border-border bg-surface p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <p className="type-h3 text-text-primary">Спасибо, {done}.</p>
        <p className="type-body mt-3 text-text-secondary">
          Мы перезвоним вам в течение 15 минут в рабочее время. Если вы написали
          в нерабочее время — свяжемся первыми с 08:00.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-card border border-border bg-surface p-6 shadow-sm md:p-8"
    >
      {lockedDoctor ? (
        <input type="hidden" name="doctor" value={lockedDoctor} />
      ) : null}

      {/* honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="grid gap-5">
        {showDoctorSelect ? (
          <div className="flex flex-col gap-2">
            <label htmlFor="doctor" className="type-body-sm text-text-secondary">
              Специалист (необязательно — подберём сами)
            </label>
            <select
              id="doctor"
              name="doctorSelect"
              className="min-h-[52px] rounded-control border border-border bg-bg px-4 text-text-primary"
              defaultValue=""
            >
              <option value="">Не выбран — подберём подходящего</option>
              {DOCTORS.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.shortName} — {d.specialty}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <fieldset className="flex flex-col gap-2">
          <legend className="type-body-sm mb-1 text-text-secondary">
            Удобное время
          </legend>
          <div className="flex flex-wrap gap-2">
            {TIME_SLOTS.map((slot, i) => (
              <label
                key={slot.value}
                className="flex min-h-[48px] cursor-pointer items-center gap-2 rounded-control border border-border bg-bg px-4 text-text-primary has-[:checked]:border-brand has-[:checked]:bg-pine-100"
              >
                <input
                  type="radio"
                  name="time"
                  value={slot.value}
                  defaultChecked={i === 0}
                  className="accent-brand"
                />
                {slot.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="type-body-sm text-text-secondary">
              Как вас зовут?
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="given-name"
              placeholder="Ваше имя"
              className="min-h-[52px] rounded-control border border-border bg-bg px-4 text-text-primary placeholder:text-text-muted"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="type-body-sm text-text-secondary">
              Ваш телефон
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 (___) ___-__-__"
              className="min-h-[52px] rounded-control border border-border bg-bg px-4 text-text-primary placeholder:text-text-muted"
            />
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 h-5 w-5 flex-none accent-brand"
          />
          <span className="type-body-sm text-text-secondary">
            Согласен на обработку персональных данных для записи на приём.
          </span>
        </label>

        {error ? (
          <p className="type-body-sm text-error" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="min-h-[54px] w-full rounded-control bg-brand px-6 font-medium text-[#fcfbf8] shadow-sm transition-all duration-[180ms] ease-calm hover:-translate-y-[1px] hover:bg-brand-hover hover:shadow-md active:scale-[0.99]"
        >
          Перезвоним и подберём время
        </button>

        <p className="type-micro text-center">
          Или позвоните: {CLINIC.phone} · {CLINIC.hoursWeek} ·{" "}
          {CLINIC.hoursWeekend}
        </p>
      </div>
    </form>
  );
}
