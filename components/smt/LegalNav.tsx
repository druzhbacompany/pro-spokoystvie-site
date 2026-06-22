import Link from "next/link";

const LEGAL_LINKS = [
  { href: "/privacy", label: "Политика конфиденциальности" },
  { href: "/personal-data-consent", label: "Согласие на обработку ПДн" },
  { href: "/special-consent", label: "Согласие — спец. категории ПДн" },
  { href: "/cookies", label: "Политика cookie" },
  { href: "/user-agreement", label: "Пользовательское соглашение" },
  { href: "/legal", label: "Сведения о медицинской организации" },
  { href: "/license", label: "Сведения о лицензии" },
  { href: "/controlling-authorities", label: "Контролирующие органы" },
];

export function LegalNav() {
  return (
    <nav aria-label="Правовые документы">
      <ul className="flex flex-col gap-1">
        {LEGAL_LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block rounded-[10px] px-3 py-2 text-[14px] transition-colors hover:bg-[var(--smt-alt-bg,#f5f3ee)]"
              style={{ color: "var(--smt-dark)" }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
