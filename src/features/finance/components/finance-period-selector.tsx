"use client";

import { IconButton } from "@/components/design-system";

import type { FinancePeriod } from "../types";

const periods: FinancePeriod[] = ["Weekly", "Bi-weekly", "Monthly"];

export function FinancePeriodSelector({
  period,
  rangeLabel,
  onChangePeriod,
  onMovePeriod,
}: {
  period: FinancePeriod;
  rangeLabel: string;
  onChangePeriod: (period: FinancePeriod) => void;
  onMovePeriod: (direction: -1 | 1) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <IconButton
          label="Previous period"
          title="Previous period"
          onClick={() => onMovePeriod(-1)}
        >
          &lt;
        </IconButton>
        <IconButton
          label="Next period"
          title="Next period"
          onClick={() => onMovePeriod(1)}
        >
          &gt;
        </IconButton>
      </div>

      <p className="min-w-0 text-[11px] leading-5 text-[var(--text-muted)]">
        {rangeLabel}
      </p>

      <div
        className="grid rounded-[var(--radius-md)] bg-[var(--background-page)] p-1 max-sm:w-full max-sm:grid-cols-3 sm:inline-grid sm:grid-flow-col"
        aria-label="Expense history period"
      >
        {periods.map((periodOption) => {
          const isSelected = period === periodOption;

          return (
            <button
              key={periodOption}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChangePeriod(periodOption)}
              className={`min-h-10 rounded-[var(--radius-action)] px-4 text-[11px] transition ${
                isSelected
                  ? "bg-[var(--surface-raised)] font-medium text-[var(--text-primary)] shadow-[var(--shadow-surface)]"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {periodOption}
            </button>
          );
        })}
      </div>
    </div>
  );
}
