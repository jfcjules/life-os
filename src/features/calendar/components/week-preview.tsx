import { Panel, SectionHeader } from "@/components/design-system";

import type { WeekPreviewDay } from "../types";

export function WeekPreview({ days }: { days: WeekPreviewDay[] }) {
  const dateRange =
    days.length > 0 ? `${days[0].date}-${days[days.length - 1].date}` : "";

  return (
    <Panel>
      <SectionHeader title="This week preview" action={dateRange} />

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {days.map((day) => (
          <article
            key={day.id}
            className="min-h-[138px] rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[13px] font-medium leading-5">
                  {day.day}
                </h3>
                <p className="mt-1 text-[11px] leading-4 text-[var(--text-muted)]">
                  {day.date}
                </p>
              </div>
              <span className="rounded-full bg-[var(--color-action-secondary)] px-3 py-1 text-[11px] leading-4 text-[var(--text-muted)]">
                {day.count}
              </span>
            </div>

            <p className="mt-5 text-[12px] font-medium leading-5">
              {day.focus}
            </p>
            <p className="mt-2 text-[11px] leading-4 text-[var(--text-muted)]">
              {day.hint}
            </p>
          </article>
        ))}
      </div>
    </Panel>
  );
}
