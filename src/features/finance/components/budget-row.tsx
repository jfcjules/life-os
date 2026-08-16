import type { Budget } from "../types";
import { formatBudgetPeriod } from "../utils";

export function BudgetRow({ budget }: { budget: Budget }) {
  return (
    <article className="grid min-h-[92px] grid-cols-[minmax(0,1fr)_auto] items-start gap-4 rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 max-sm:grid-cols-1">
      <div className="min-w-0">
        <h3 className="min-w-0 text-[14px] font-medium leading-5">
          {budget.name}
        </h3>
        <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
          {formatBudgetPeriod(budget)}
        </p>
      </div>

      <span className="rounded-full bg-[rgba(126,168,139,0.22)] px-3 py-1 text-[10px] leading-4 text-[var(--text-primary)] max-sm:w-fit">
        {budget.period}
      </span>
    </article>
  );
}
