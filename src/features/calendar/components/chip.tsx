import type { CalendarTone } from "../types";

const toneClass: Record<CalendarTone, string> = {
  blue: "bg-[var(--color-action-secondary)]",
  green: "bg-[rgba(126,168,139,0.28)]",
  lilac: "bg-[rgba(165,148,199,0.28)]",
  rose: "bg-[rgba(214,155,168,0.28)]",
  amber: "bg-[rgba(213,178,118,0.30)]",
};

export function CalendarChip({
  children,
  tone,
}: {
  children: string;
  tone: CalendarTone;
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] leading-4 text-[var(--text-muted)] ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}
