"use client";

import { useState } from "react";

type Item = { q: string; a: string; open?: boolean };

export function FaqV4({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<Record<number, boolean>>(() =>
    items.reduce<Record<number, boolean>>((a, it, i) => ((a[i] = !!it.open), a), {}),
  );
  return (
    <div className="mx-auto max-w-[760px]">
      {items.map((it, i) => {
        const isOpen = open[i];
        return (
          <div key={it.q} className="border-b" style={{ borderColor: "var(--v2-border)" }}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen((s) => ({ ...s, [i]: !s[i] }))}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="v2-h4">{it.q}</span>
                <span className={`flex h-8 w-8 flex-none items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} style={{ color: "var(--v2-blue)" }} aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </button>
            </h3>
            <div className="grid transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="v2-body pb-5" style={{ color: "var(--v2-text)" }}>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
