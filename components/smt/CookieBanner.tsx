"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

const STORAGE_KEY = "cookie_consent_v1";

function loadConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CookieConsent) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent: CookieConsent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  // Architecture hook: fire analytics init if consented.
  // Replace with real analytics (e.g. Яндекс.Метрика) when added:
  if (consent.analytics) {
    // window.ym?.(...) or similar
  }
}

type View = "banner" | "settings";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState<View>("banner");
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [functional, setFunctional] = useState(false);

  useEffect(() => {
    const stored = loadConsent();
    if (!stored) setVisible(true);
  }, []);

  if (!visible) return null;

  function acceptAll() {
    saveConsent({ necessary: true, analytics: true, marketing: true, functional: true });
    setVisible(false);
  }

  function acceptNecessary() {
    saveConsent({ necessary: true, analytics: false, marketing: false, functional: false });
    setVisible(false);
  }

  function saveCustom() {
    saveConsent({ necessary: true, analytics, marketing, functional });
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Настройка файлов cookie"
      aria-modal="true"
      className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-6"
    >
      <div
        className="mx-auto max-w-2xl rounded-[16px] shadow-xl p-5 sm:p-6"
        style={{ background: "var(--smt-dark, #10231f)", color: "#e7eef3", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {view === "banner" ? (
          <>
            <p className="text-[15px] leading-relaxed" style={{ color: "#c7d4dd" }}>
              Мы используем файлы cookie для работы сайта и — с вашего согласия — для аналитики. Строго необходимые cookie обеспечивают работу сайта.{" "}
              <Link href="/cookies" className="underline opacity-80 hover:opacity-100" style={{ color: "#7ec8e3" }}>
                Политика cookie
              </Link>
              {" "}·{" "}
              <Link href="/privacy" className="underline opacity-80 hover:opacity-100" style={{ color: "#7ec8e3" }}>
                Политика ПДн
              </Link>
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={acceptAll}
                className="rounded-[10px] px-5 py-2.5 text-[14px] font-semibold transition-opacity hover:opacity-90"
                style={{ background: "var(--smt-blue, #3a7ca5)", color: "#fff" }}
              >
                Принять
              </button>
              <button
                onClick={acceptNecessary}
                className="rounded-[10px] px-5 py-2.5 text-[14px] font-semibold transition-opacity hover:opacity-90"
                style={{ background: "rgba(255,255,255,0.1)", color: "#e7eef3" }}
              >
                Только необходимые
              </button>
              <button
                onClick={() => setView("settings")}
                className="rounded-[10px] px-5 py-2.5 text-[14px] font-semibold transition-opacity hover:opacity-90"
                style={{ background: "rgba(255,255,255,0.06)", color: "#c7d4dd" }}
              >
                Настроить
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-[16px] font-semibold mb-4" style={{ color: "#fff" }}>Настройка cookie</p>
            <div className="flex flex-col gap-3">
              <label className="flex items-start gap-3">
                <input type="checkbox" checked disabled className="mt-0.5 h-4 w-4 flex-none opacity-50" />
                <span className="text-[14px]" style={{ color: "#9fb2c0" }}>
                  <strong style={{ color: "#c7d4dd" }}>Строго необходимые</strong> — всегда включены. Обеспечивают работу сайта и сохраняют ваш выбор.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-0.5 h-4 w-4 flex-none"
                  style={{ accentColor: "var(--smt-blue, #3a7ca5)" }}
                />
                <span className="text-[14px]" style={{ color: "#9fb2c0" }}>
                  <strong style={{ color: "#c7d4dd" }}>Аналитические</strong> — обезличенная статистика посещений для улучшения сайта.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-0.5 h-4 w-4 flex-none"
                  style={{ accentColor: "var(--smt-blue, #3a7ca5)" }}
                />
                <span className="text-[14px]" style={{ color: "#9fb2c0" }}>
                  <strong style={{ color: "#c7d4dd" }}>Маркетинговые</strong> — оценка эффективности рекламы.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={functional}
                  onChange={(e) => setFunctional(e.target.checked)}
                  className="mt-0.5 h-4 w-4 flex-none"
                  style={{ accentColor: "var(--smt-blue, #3a7ca5)" }}
                />
                <span className="text-[14px]" style={{ color: "#9fb2c0" }}>
                  <strong style={{ color: "#c7d4dd" }}>Функциональные</strong> — запоминание ваших предпочтений.
                </span>
              </label>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={saveCustom}
                className="rounded-[10px] px-5 py-2.5 text-[14px] font-semibold transition-opacity hover:opacity-90"
                style={{ background: "var(--smt-blue, #3a7ca5)", color: "#fff" }}
              >
                Сохранить настройки
              </button>
              <button
                onClick={() => setView("banner")}
                className="rounded-[10px] px-5 py-2.5 text-[14px] font-semibold transition-opacity hover:opacity-90"
                style={{ background: "rgba(255,255,255,0.06)", color: "#c7d4dd" }}
              >
                Назад
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
