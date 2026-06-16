"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CLINIC } from "@/lib/data";

const NAV = [
  { label: "Услуги", href: "/uslugi/" },
  { label: "Врачи", href: "/vrachi/" },
  { label: "Цены", href: "/tseny/" },
  { label: "Документы", href: "/dokumenty/" },
  { label: "Контакты", href: "/kontakty/" },
];

/** V4 TopBar — REAL donor logo (logo-trimmed.png, exact geometry), ghost CTA. */
export function TopBarV4() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-200"
      style={{ borderColor: "var(--v2-border)", background: "color-mix(in srgb, var(--v2-bg) 86%, transparent)" }}
    >
      <div className={`v2-container flex items-center justify-between gap-4 transition-all duration-200 ${scrolled ? "h-16" : "h-[72px] md:h-20"}`}>
        <Link href="/" aria-label="ПРО спокойствие — на главную" className="flex items-center">
          <Image
            src="/donor-assets-v2/logo/logo-trimmed.png"
            alt="ПРО спокойствие — медицинский центр"
            width={760}
            height={193}
            priority
            className={`w-auto transition-all duration-200 ${scrolled ? "h-8" : "h-9 md:h-10"}`}
          />
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-[15px] font-medium transition-colors hover:opacity-80" style={{ color: "var(--v2-text-mid)" }}>{item.label}</Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={CLINIC.phoneHref} className="text-[15px] font-semibold" style={{ color: "var(--v2-blue-deep)" }}>{CLINIC.phone}</a>
          <a href="#zayavka" className="v2-btn v2-btn-ghost !min-h-[44px] !px-5 text-[15px]">Записаться</a>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <a href={CLINIC.phoneHref} aria-label="Позвонить" className="flex h-11 w-11 items-center justify-center" style={{ color: "var(--v2-blue-deep)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M6 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5V19a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 2-2" /></svg>
          </a>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="v4-menu" aria-label={open ? "Закрыть меню" : "Открыть меню"} className="flex h-11 w-11 items-center justify-center" style={{ color: "var(--v2-blue-deep)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
          </button>
        </div>
      </div>

      {open ? (
        <div id="v4-menu" className="border-t px-4 pb-6 pt-4 lg:hidden" style={{ borderColor: "var(--v2-border)" }}>
          <a href="#zayavka" onClick={() => setOpen(false)} className="v2-btn v2-btn-primary mb-4 w-full">Записаться</a>
          <nav aria-label="Мобильная навигация" className="flex flex-col">
            {NAV.map((item) => (<Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b py-3 text-lg" style={{ borderColor: "var(--v2-border)", color: "var(--v2-blue-deep)" }}>{item.label}</Link>))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
