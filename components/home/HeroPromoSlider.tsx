"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * Промо-слайдер первого экрана главной (утверждён владельцем, 2026-07-05;
 * структурная правка вёрстки 2026-07-06: изображение — визуальный слой карточки,
 * а не вложенная картинка; правая часть ~55% ширины на desktop).
 * Слайды — массив: стрелки и точки появляются автоматически при length > 1.
 * Без внешних библиотек и анимаций (осознанно, до отдельного решения).
 */
type HeroSlide = {
  id: string;
  tags: string[];
  /** Заголовок слайда построчно (управляемый перенос). */
  titleLines: string[];
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
    titleLines: ["Ментальный чек-ап", "в Екатеринбурге"],
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
      <div className="grid items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(0,55%)]">
        {/* Текст слайда — крупный оффер слева */}
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:py-12 lg:pl-10 lg:pr-6">
          <div className="flex flex-wrap gap-2">
            {slide.tags.map((t) => (
              <span key={t} className="smt-chip">{t}</span>
            ))}
          </div>
          <h2 className="mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.01em] md:text-[34px] lg:text-[40px]" style={{ color: "var(--smt-dark)" }}>
            {slide.titleLines.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h2>
          <div className="mt-4 space-y-1">
            {slide.description.map((line) => (
              <p key={line} className="smt-lead smt-muted">{line}</p>
            ))}
          </div>
          <div className="mt-7">
            <Link href={slide.ctaHref} className="smt-btn smt-btn-primary">{slide.ctaLabel}</Link>
          </div>
        </div>

        {/* Изображение команды — визуальный слой правой части карточки (только lg+):
            edge-to-edge, без собственных рамок/теней; scale 1.14 срезает
            внешние белые поля PNG, лица и подписи врачей сохраняются. */}
        <div className="relative hidden min-h-[420px] lg:block">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority
              sizes="55vw"
              className="scale-[1.14] object-cover"
              style={{ objectPosition: "50% 45%" }}
            />
          </div>
        </div>

        {/* Tablet и mobile: одна колонка, изображение целиком без обрезки боковых врачей */}
        <div className="px-4 pb-3 sm:px-6 lg:hidden">
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            width={1672}
            height={941}
            priority
            sizes="100vw"
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
                aria-label={`Слайд ${i + 1}: ${s.titleLines.join(" ")}`}
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
