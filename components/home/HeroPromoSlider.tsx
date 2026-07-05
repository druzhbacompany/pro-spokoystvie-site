"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * Промо-слайдер первого экрана главной (утверждён владельцем, 2026-07-05).
 * Архитектура рассчитана на будущие акции/чек-апы/программы: слайды — массив,
 * стрелки и точки появляются автоматически при HERO_SLIDES.length > 1.
 * Без внешних библиотек и анимаций (осознанно, до отдельного решения).
 */
type HeroSlide = {
  id: string;
  tags: string[];
  title: string;
  description: string[];
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "mental-checkup",
    tags: ["Психиатр", "Психотерапевт", "Психолог", "Невролог"],
    title: "Ментальный чек-ап в Екатеринбурге",
    description: [
      "Не нужно знать диагноз, чтобы обратиться.",
      "Достаточно описать, что с вами происходит.",
    ],
    ctaLabel: "Записаться на приём",
    // Существующий якорь формы записи на главной (BOOKING_ANCHOR).
    ctaHref: "#zayavka",
    image: "/assets/hero/home-hero-team-checkup.png",
    imageAlt: "Команда медицинского центра ПРО Спокойствие: невролог Тадевосян, психиатр-психотерапевт Романовский, психиатр Безъязыкова",
  },
];

export function HeroPromoSlider() {
  const [active, setActive] = useState(0);
  const slide = HERO_SLIDES[active];
  const hasMany = HERO_SLIDES.length > 1;

  return (
    <div
      className="smt-card overflow-hidden"
      style={{ boxShadow: "0 12px 32px rgba(0, 53, 75, 0.07)" }}
      role="region"
      aria-label="Промо-предложения клиники"
    >
      <div className="grid items-center gap-6 p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,48%)] md:gap-8 lg:p-10">
        {/* Текст слайда */}
        <div>
          <div className="flex flex-wrap gap-2">
            {slide.tags.map((t) => (
              <span key={t} className="smt-chip">{t}</span>
            ))}
          </div>
          <h2 className="smt-h2 mt-5">{slide.title}</h2>
          <div className="mt-4 space-y-1">
            {slide.description.map((line) => (
              <p key={line} className="smt-lead smt-muted">{line}</p>
            ))}
          </div>
          <div className="mt-7">
            <Link href={slide.ctaHref} className="smt-btn smt-btn-primary">{slide.ctaLabel}</Link>
          </div>
        </div>

        {/* Изображение команды: без обрезки (h-auto), подписи врачей сохраняются */}
        <div className="min-w-0">
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            width={1672}
            height={941}
            priority
            sizes="(max-width: 768px) 100vw, 46vw"
            className="h-auto w-full"
          />
        </div>
      </div>

      {/* Управление слайдером — только при 2+ слайдах, чтобы не создавать фальшивую интерактивность */}
      {hasMany ? (
        <div className="flex items-center justify-center gap-4 pb-4">
          <button
            type="button"
            aria-label="Предыдущий слайд"
            onClick={() => setActive((active - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="flex h-9 w-9 items-center justify-center rounded-full border"
            style={{ borderColor: "var(--smt-border)", color: "var(--smt-dark)" }}
          >
            ‹
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Слайды">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Слайд ${i + 1}: ${s.title}`}
                onClick={() => setActive(i)}
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: i === active ? "var(--smt-blue)" : "var(--smt-border)" }}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Следующий слайд"
            onClick={() => setActive((active + 1) % HERO_SLIDES.length)}
            className="flex h-9 w-9 items-center justify-center rounded-full border"
            style={{ borderColor: "var(--smt-border)", color: "var(--smt-dark)" }}
          >
            ›
          </button>
        </div>
      ) : null}

      {/* Юридическое предупреждение — нижняя полоса карточки */}
      <div className="border-t px-6 py-3 sm:px-8" style={{ borderColor: "var(--smt-border)" }}>
        <p className="text-center text-[11px] uppercase tracking-[0.14em] smt-muted">
          Имеются противопоказания. Необходима консультация специалиста
        </p>
      </div>
    </div>
  );
}
