import Link from "next/link";
import { PRICELIST, type PriceSection } from "@/lib/data";
import { LegalNotice } from "./LegalNotice";

const book = (params: Record<string, string>) =>
  `/kontakty/?${new URLSearchParams(params).toString()}#zayavka`;

/**
 * Sensitive sections (зависимости / IV-терапия / детокс / кодирование …) get a
 * remission-only legal notice. Detected by content, not hardcoded ids, so it
 * stays correct if the approved price list changes.
 */
const SENSITIVE = /кодиров|эспераль|торпедо|снятие кода|зависим|детокс|капельниц|iv[\s-]?терап/i;
function isSensitive(sec: PriceSection): boolean {
  if (SENSITIVE.test(sec.title)) return true;
  return sec.groups.some(
    (g) => SENSITIVE.test(g.title) || g.items.some((it) => SENSITIVE.test(it.name)),
  );
}

/**
 * SMT-style price table. Each row name links to the form prefilled with the
 * price item (name + price). Each section has its own CTA. Mobile-safe:
 * no per-row buttons (name link + one section CTA), price right-aligned.
 */
export function PriceTable() {
  return (
    <div className="space-y-12">
      {PRICELIST.map((sec) => (
        <div key={sec.id} id={sec.id} style={{ scrollMarginTop: "88px" }}>
          <div className="flex items-baseline gap-3">
            <span className="smt-h2" style={{ color: "var(--smt-blue)" }}>{sec.number}</span>
            <h2 className="smt-h2">{sec.title}</h2>
          </div>
          {sec.note ? <p className="mt-3 max-w-[68ch] text-[14px] smt-muted">{sec.note}</p> : null}
          <div className="mt-6 space-y-8">
            {sec.groups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-3 text-[15px] font-semibold smt-muted">{group.title}</h3>
                <div className="overflow-hidden rounded-[15px] border" style={{ borderColor: "var(--smt-border)" }}>
                  <table className="w-full border-collapse">
                    <caption className="sr-only">{sec.title} — {group.title}</caption>
                    <tbody>
                      {group.items.map((item, i) => (
                        <tr key={item.code} style={{ background: i % 2 ? "var(--smt-grey)" : "#fff" }}>
                          <th scope="row" className="px-4 py-3.5 text-left sm:px-5">
                            <Link
                              href={book({ priceItem: item.name, price: item.price })}
                              className="text-[15px] font-normal hover:underline"
                              style={{ color: "var(--smt-dark)" }}
                              aria-label={`Записаться: ${item.name}, ${item.price}`}
                            >
                              {item.name}
                            </Link>
                          </th>
                          <td className="whitespace-nowrap px-4 py-3.5 text-right text-[15px] font-semibold tabular-nums sm:px-5" style={{ color: "var(--smt-dark)" }}>
                            {item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          {isSensitive(sec) ? <LegalNotice /> : null}
          <Link href={book({ service: sec.title })} className="smt-btn smt-btn-ghost mt-5">
            Записаться · {sec.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
