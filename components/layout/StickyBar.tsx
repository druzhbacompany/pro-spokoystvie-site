"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CLINIC, BOOKING_ANCHOR } from "@/lib/data";
import { Icon } from "@/components/ui/Icon";

/** Mobile-only sticky bar: appears after a small scroll, slides up. */
export function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[40] border-t border-border bg-surface/95 backdrop-blur-md transition-transform duration-[250ms] ease-calm lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3 gap-2 p-2">
        <a
          href={CLINIC.phoneHref}
          className="flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-control text-text-primary"
          aria-label="Позвонить в клинику"
        >
          <Icon name="phone" size={22} />
          <span className="text-xs">Позвонить</span>
        </a>
        <a
          href={CLINIC.telegramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-control text-text-primary"
          aria-label="Написать в Telegram"
        >
          <Icon name="telegram" size={22} />
          <span className="text-xs">Telegram</span>
        </a>
        <Link
          href={BOOKING_ANCHOR}
          className="flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-control bg-brand text-[#fcfbf8]"
          aria-label="Перейти к форме записи"
        >
          <Icon name="calendar" size={22} />
          <span className="text-xs">Записаться</span>
        </Link>
      </div>
    </div>
  );
}
