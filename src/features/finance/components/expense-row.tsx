import { Button } from "@/components/design-system";

import type { Expense } from "../types";
import { formatCurrency, formatDate } from "../utils";

export function ExpenseRow({
  expense,
  isSelected,
  onSelect,
  onRemove,
}: {
  expense: Expense;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
}) {
  return (
    <article
      className={`grid min-h-[92px] grid-cols-[minmax(0,1fr)_auto] items-start gap-4 rounded-[18px] border p-5 transition max-sm:grid-cols-1 ${
        isSelected
          ? "border-[rgba(95,128,212,0.42)] bg-[rgba(207,217,242,0.58)]"
          : "border-[var(--border-subtle)] bg-[var(--surface-raised)]"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className="min-w-0 text-left"
        aria-pressed={isSelected}
      >
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <h3 className="min-w-0 text-[14px] font-medium leading-5">
            {expense.name}
          </h3>
          {expense.category ? (
            <span className="rounded-full bg-[rgba(126,168,139,0.22)] px-3 py-1 text-[10px] leading-4 text-[var(--text-primary)]">
              {expense.category}
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
          {formatDate(expense.date)}
        </p>
      </button>

      <div className="flex min-w-0 items-start gap-3 justify-self-end max-sm:w-full max-sm:justify-between">
        <span className="text-[14px] font-medium leading-5">
          {formatCurrency(expense.amount)}
        </span>
        <Button variant="ghost" className="min-h-9 px-3" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </article>
  );
}
