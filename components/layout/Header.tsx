"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CLINIC, NAV, BOOKING_ANCHOR } from "@/lib/data";
import { Icon } from "@/components/ui/Icon";

export function Header({ activeNav }: { activeNav?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className="sticky top-0 z-[var(--z-header)] border-b border-border bg-bg/85 backdrop-blur-md transition-all duration-200"
      style={{ ["--z-header" as string]: 50 }}
    >
      <div
        className={`container-page flex items-center justify-between gap-4 transition-all duration-200 ${
          scrolled ? "h-16" : "h-[72px] md:h-20"
        }`}
      >
        {/* Logo + license micro-line */}
        <Link href="/" className="flex flex-col leading-tight" aria-label="ПРО спокойствие — на главную">
          <span className="font-serif text-xl font-medium text-text-primary md:text-2xl">
            ПРО&nbsp;спокойствие
          </span>
          <span className="type-micro hidden sm:block">
            Лицензия Минздрава · №{CLINIC.license}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Основная навигация" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active = activeNav === item.label;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-base font-medium transition-colors hover:text-brand ${
                  active ? "text-brand" : "text-text-secondary"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={CLINIC.telegramHref}
            className="text-text-secondary transition-colors hover:text-brand"
            aria-label="Написать в Telegram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="telegram" size={22} />
          </a>
          <a href={CLINIC.phoneHref} className="text-base font-semibold text-text-primary hover:text-brand">
            {CLINIC.phone}
          </a>
          <Link
            href={BOOKING_ANCHOR}
            className="inline-flex min-h-[44px] items-center rounded-control bg-brand px-5 font-medium text-[#fcfbf8] shadow-sm transition-all duration-[180ms] ease-calm hover:-translate-y-[2px] hover:bg-brand-hover hover:shadow-md"
          >
            Записаться
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={CLINIC.phoneHref}
            className="flex h-11 w-11 items-center justify-center text-text-primary"
            aria-label="Позвонить в клинику"
          >
            <Icon name="phone" size={22} />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center text-text-primary"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <Icon name={menuOpen ? "close" : "chevron"} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-border bg-bg px-4 pb-8 pt-4 lg:hidden"
        >
          <Link
            href={BOOKING_ANCHOR}
            onClick={() => setMenuOpen(false)}
            className="mb-4 flex min-h-[52px] items-center justify-center rounded-control bg-brand font-medium text-[#fcfbf8]"
          >
            Записаться
          </Link>
          <nav aria-label="Мобильная навигация" className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border py-3 text-lg text-text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-2">
            <a href={CLINIC.phoneHref} className="font-semibold text-text-primary">
              {CLINIC.phone}
            </a>
            <a
              href={CLINIC.telegramHref}
              className="text-text-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram {CLINIC.telegram}
            </a>
            <p className="type-micro">
              {CLINIC.hoursWeek} · {CLINIC.hoursWeekend}
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
