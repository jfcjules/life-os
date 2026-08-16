import { Card } from "@/components/design-system";

import type { Expense } from "../types";
import { formatCurrency, formatDate, getNextOccurrence } from "../utils";

export function ExpenseDetail({ expense }: { expense: Expense | null }) {
  if (!expense) {
    return (
      <Card>
        <p className="text-[12px] font-medium leading-5">Expense detail</p>
        <p className="mt-3 text-[11px] leading-5 text-[var(--text-muted)]">
          Select an expense from history to view its saved details.
        </p>
      </Card>
    );
  }

  const nextOccurrence = getNextOccurrence(
    expense.dueDate ?? expense.date,
    expense.frequency,
  );

  return (
    <Card>
      <p className="text-[12px] leading-5 text-[var(--text-muted)]">
        Expense detail
      </p>
      <h2 className="mt-3 text-[18px] font-medium leading-7 text-[var(--text-primary)]">
        {expense.name}
      </h2>
      <p className="mt-2 text-[28px] font-medium leading-9 text-[var(--text-primary)]">
        {formatCurrency(expense.amount)}
      </p>

      <dl className="mt-5 grid gap-3 text-[11px] leading-5">
        <DetailItem label="Date" value={formatDate(expense.date)} />
        <DetailItem label="Ownership" value={expense.ownership} />
        <DetailItem label="Category" value={expense.category ?? "None"} />
        <DetailItem label="Frequency" value={expense.frequency} />
        <DetailItem
          label="Due date"
          value={expense.dueDate ? formatDate(expense.dueDate) : "None"}
        />
        <DetailItem
          label="Next occurrence"
          value={nextOccurrence ? formatDate(nextOccurrence) : "None"}
        />
      </dl>
    </Card>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3 rounded-[14px] bg-[rgba(227,233,247,0.68)] px-4 py-3 max-sm:grid-cols-1">
      <dt className="text-[var(--text-muted)]">{label}</dt>
      <dd className="min-w-0 text-[var(--text-primary)]">{value}</dd>
    </div>
  );
}
