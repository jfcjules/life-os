import type { Budget } from "../types";
import {
  calculateBudgetPlannedAmount,
  formatBudgetPeriod,
  formatCurrency,
  getBudgetConcepts,
} from "../utils";

export function BudgetRow({
  budget,
  isSelected,
  onSelect,
}: {
  budget: Budget;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const concepts = getBudgetConcepts(budget);
  const plannedAmount = calculateBudgetPlannedAmount(budget);

  return (
    <button
      type="button"
      className={`grid min-h-[92px] w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-4 rounded-[18px] border p-5 text-left transition max-sm:grid-cols-1 ${
        isSelected
          ? "border-[rgba(95,128,212,0.42)] bg-[rgba(207,217,242,0.58)]"
          : "border-[var(--border-subtle)] bg-[var(--surface-raised)]"
      }`}
      aria-pressed={isSelected}
      onClick={onSelect}
    >
      <span className="min-w-0">
        <span className="block min-w-0 text-[14px] font-medium leading-5">
          {budget.name}
        </span>
        <span className="mt-2 block text-[11px] leading-5 text-[var(--text-muted)]">
          {formatBudgetPeriod(budget)}
        </span>
      </span>

      <span className="grid justify-items-end gap-2 max-sm:justify-items-start">
        <span className="rounded-full bg-[rgba(126,168,139,0.22)] px-3 py-1 text-[10px] leading-4 text-[var(--text-primary)]">
          {budget.period}
        </span>
        <span className="text-[12px] font-medium leading-5 text-[var(--text-primary)]">
          {concepts.length > 0
            ? formatCurrency(plannedAmount)
            : "No planned amount"}
        </span>
      </span>
    </button>
  );
}
