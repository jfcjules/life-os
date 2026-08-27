"use client";

import type { CalendarSpaceFilter } from "../types";

const spaces: CalendarSpaceFilter[] = ["All", "Personal", "Couple"];

export function CalendarSpaceFilter({
  selectedSpace = "All",
  onSelectSpace,
}: {
  selectedSpace?: CalendarSpaceFilter;
  onSelectSpace?: (space: CalendarSpaceFilter) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {spaces.map((space) => {
        const isSelected = selectedSpace === space;

        return (
          <button
            key={space}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelectSpace?.(space)}
            className={`min-h-9 rounded-full px-4 text-[11px] ${
              isSelected
                ? "bg-[var(--action-selected)] font-medium text-[var(--text-primary)]"
                : "border border-[var(--border-subtle)] bg-[var(--surface-raised)] text-[var(--text-muted)]"
            }`}
          >
            {space}
          </button>
        );
      })}
    </div>
  );
}
