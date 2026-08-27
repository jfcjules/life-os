import type { CalendarTone } from "../types";

const toneClass: Record<CalendarTone, string> = {
  blue: "bg-[var(--color-action-secondary)]",
  green: "bg-[var(--accent-green-muted)]",
  lilac: "bg-[var(--accent-lilac-muted)]",
  rose: "bg-[var(--accent-rose-muted)]",
  amber: "bg-[var(--accent-amber-muted)]",
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
