import type { ReactNode } from "react";

import type { Budget, Expense, FinanceTag, Goal } from "../types";
import { formatCurrency, formatDate, getNextOccurrence } from "../utils";

export function ExpenseDetail({
  budgets,
  expense,
  goals,
  tags,
}: {
  budgets: Budget[];
  expense: Expense | null;
  goals: Goal[];
  tags: FinanceTag[];
}) {
  if (!expense) {
    return (
      <section className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 max-sm:p-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
          Detail
        </p>
        <p className="mt-3 text-[12px] leading-5 text-[var(--text-muted)]">
          Select an expense from the list to review its saved details.
        </p>
      </section>
    );
  }

  const linkedBudget = budgets.find((budget) => budget.id === expense.budgetId);
  const linkedGoal = goals.find((goal) => goal.id === expense.goalId);
  const expenseTags = tags
    .filter((tag) => expense.tagIds.includes(tag.id))
    .map((tag) => tag.label)
    .join(", ");
  const nextOccurrence = getNextOccurrence(
    expense.dueDate ?? expense.date,
    expense.frequency,
  );

  return (
    <section
      aria-labelledby="expense-detail-title"
      className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)]"
    >
      <div className="grid gap-7 p-5 sm:grid-cols-[minmax(210px,0.7fr)_minmax(0,1.3fr)] sm:p-6">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Detail
          </p>
          <p className="mt-5 font-[family-name:var(--font-display)] text-[40px] leading-none tracking-[-0.035em] text-[var(--text-primary)] sm:text-[48px]">
            {formatCurrency(expense.amount)}
          </p>
          <h2
            id="expense-detail-title"
            className="mt-4 text-[18px] font-medium leading-7 text-[var(--text-primary)]"
          >
            {expense.name}
          </h2>
        </div>

        <dl className="grid gap-x-6 gap-y-5 border-t border-[var(--border-subtle)] pt-5 sm:grid-cols-3 sm:border-t-0 sm:pt-0">
          <DetailItem icon={<CalendarIcon />} label="Date" value={formatDate(expense.date)} />
          <DetailItem
            icon={<CategoryIcon />}
            label="Category"
            value={expense.category ?? "Uncategorized"}
          />
          <DetailItem icon={<TagIcon />} label="Tags" value={expenseTags || "No tags"} />
          <DetailItem
            icon={<BudgetIcon />}
            label="Budget"
            value={linkedBudget?.name ?? "No linked budget"}
          />
          <DetailItem
            icon={<GoalIcon />}
            label="Goal"
            value={linkedGoal?.name ?? "No linked goal"}
          />
          <DetailItem
            icon={<ScheduleIcon />}
            label="Schedule"
            value={
              nextOccurrence && expense.frequency !== "One-time"
                ? `${expense.frequency} · next ${formatDate(nextOccurrence)}`
                : expense.frequency
            }
          />
        </dl>
      </div>
    </section>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 border-b border-[var(--border-subtle)] pb-4 last:border-b-0 sm:border-b-0 sm:pb-0">
      <dt className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
        <span className="text-[var(--color-action-primary)]">{icon}</span>
        {label}
      </dt>
      <dd className="mt-2 truncate text-[11px] leading-5 text-[var(--text-primary)]" title={value}>
        {value}
      </dd>
    </div>
  );
}

function CalendarIcon() {
  return <DetailIcon path="M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />;
}

function CategoryIcon() {
  return <DetailIcon path="M12 3 4 7v10l8 4 8-4V7l-8-4Zm-8 4 8 4 8-4m-8 4v10" />;
}

function TagIcon() {
  return <DetailIcon path="M20 13 13 20 4 11V4h7l9 9ZM8.5 8.5h.01" />;
}

function BudgetIcon() {
  return <DetailIcon path="M4 7h16M7 4v6m10-6v6M5 10h14v10H5V10Zm3 4h3m2 0h3" />;
}

function GoalIcon() {
  return <DetailIcon path="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5l3 2" />;
}

function ScheduleIcon() {
  return <DetailIcon path="M12 8v4l3 2m5-2a8 8 0 1 1-2.34-5.66M20 4v4h-4" />;
}

function DetailIcon({ path }: { path: string }) {
  return (
    <svg
      aria-hidden="true"
      className="size-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      <path d={path} />
    </svg>
  );
}
