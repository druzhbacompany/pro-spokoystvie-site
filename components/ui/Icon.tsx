import type { CSSProperties } from "react";

/**
 * Authorial organic icon set (PATCH_V1 §5).
 * One continuous stroke, one open terminal ("breathing gap"),
 * round caps/joins, 1.5px on a 24px grid, pine-700 line.
 * No medical clichés (cross, brain, syringe, bottle, pulse line).
 */
export type IconName =
  | "calendar"
  | "wave"
  | "window"
  | "cloud"
  | "moon"
  | "moon-star"
  | "loop"
  | "body"
  | "lock"
  | "leaf"
  | "phone"
  | "telegram"
  | "arrow"
  | "check"
  | "search"
  | "pin"
  | "clock"
  | "close"
  | "chevron"
  | "shield"
  | "door"
  | "chair"
  | "headset"
  | "path"
  | "rising";

const paths: Record<IconName, string> = {
  // sunrise over horizon — open terminal on the right
  calendar: "M4 8h13M4 8v9a2 2 0 0 0 2 2h9M8 4v3M14 4v3M9 13h4",
  // calm wave with an open end (panic / acute support)
  wave: "M3 13c2.2 0 2.2-4 4.4-4s2.2 4 4.4 4 2.2-4 4.4-4 2.2 4 4.4 4",
  // window / screen (online)
  window: "M5 5h11a2 2 0 0 1 2 2v9M5 5v12h9M5 10h11",
  // soft cloud, open base (anxiety)
  cloud: "M7 16a3.5 3.5 0 0 1-.4-6.97A4.5 4.5 0 0 1 15 9.2a3 3 0 0 1 .3 5.8H9",
  // waning moon (depression)
  moon: "M16 4a8 8 0 1 0 3.2 12.5A6.2 6.2 0 0 1 16 4z",
  // moon + star (insomnia)
  "moon-star": "M14 5a7 7 0 1 0 4.5 11.5M18 4l1 2 2 .6-1.6 1.4.3 2.2L18 10",
  // soft open loop (OCD)
  loop: "M12 6a6 6 0 1 1-5.2 3",
  // simple figure (psychosomatics)
  body: "M12 5a2 2 0 1 1 0 .01M9 10h6M10 10v4l-1.5 4M14 10v4l1.5 4",
  // open ring / lock without bottle (dependent behaviour)
  lock: "M9 11V8a3 3 0 0 1 6 0M7 11h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z",
  // rising leaf (recovery)
  leaf: "M6 18c0-7 5-11 12-12-1 7-5 11-12 12M9 15c1.5-2 3.5-3.5 6-4.5",
  phone:
    "M6 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5V19a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 2-2",
  telegram: "M21 5L3 11.5l5 1.8M21 5l-3 13-5-4.2-5-1.5M21 5l-8 8.3",
  arrow: "M5 12h13M13 6l6 6-6 6",
  check: "M5 12.5l4.5 4.5L19 7",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M20 20l-4-4",
  pin: "M12 21c5-5.5 7-8.5 7-12a7 7 0 1 0-14 0c0 3.5 2 6.5 7 12M12 8a2.5 2.5 0 0 1 0 5",
  clock: "M12 5a7 7 0 1 0 .01 0M12 8v4.5l3 2",
  close: "M6 6l12 12M18 6L6 18",
  chevron: "M6 9l6 6 6-6",
  shield: "M12 4l7 2.5V12c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6.5L12 4M9 12l2 2 4-4",
  door: "M7 4h8a1 1 0 0 1 1 1v15H7zM7 4v16M13 12h.01",
  chair: "M7 4v8h10V4M6 12h12l-1 8M8 20l1-8M16 12l1 8",
  headset:
    "M5 13v-1a7 7 0 0 1 14 0v1M5 13a2 2 0 0 0 2 2v-5a2 2 0 0 0-2 2M19 13a2 2 0 0 1-2 2v-5a2 2 0 0 1 2 2M17 16v1a3 3 0 0 1-3 3h-2",
  path: "M5 19c0-4 3-5 7-5s7-1 7-5M5 19h.01M19 4h.01",
  rising: "M4 16l5-5 3 3 8-8M14 6h6v6",
};

type Props = {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
  decorative?: boolean;
  title?: string;
};

export function Icon({
  name,
  size = 24,
  className,
  style,
  decorative = true,
  title,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={!decorative ? title : undefined}
      focusable="false"
    >
      {title && !decorative ? <title>{title}</title> : null}
      <path d={paths[name]} />
    </svg>
  );
}
