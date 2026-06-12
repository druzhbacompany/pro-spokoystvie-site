"use client";

import { useState } from "react";

type Item = { q: string; a: string; open?: boolean };

/** FAQ accordion (M-6). First items can be open by default. Keyboard + ARIA. */
export function Accordion({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState<Record<number, boolean>>(() =>
    items.reduce<Record<number, boolean>>((acc, item, i) => {
      acc[i] = Boolean(item.open);
      return acc;
    }, {}),
  );

  return (
    <div className="mx-auto max-w-[760px]">
      {items.map((item, i) => {
        const isOpen = open[i];
        return (
          <div key={item.q} className="border-b border-border">
            <h3>
              <button
                type="button"
                onClick={() => setOpen((s) => ({ ...s, [i]: !s[i] }))}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="type-h4 text-text-primary">{item.q}</span>
                <span
                  className={`flex h-8 w-8 flex-none items-center justify-center text-brand transition-transform duration-300 ease-calm ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              className="grid transition-all duration-300 ease-calm"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="type-body max-w-measure pb-5 text-text-secondary">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
