import type { ReactNode } from "react";

import type { Expense, FinanceTag, Goal } from "../types";
import { formatCurrency } from "../utils";

export function ExpenseRow({
  expense,
  goals,
  isLast,
  isSelected,
  tags,
  onEdit,
  onSelect,
  onRemove,
}: {
  expense: Expense;
  goals: Goal[];
  isLast: boolean;
  isSelected: boolean;
  tags: FinanceTag[];
  onEdit: () => void;
  onSelect: () => void;
  onRemove: () => void;
}) {
  const date = new Date(`${expense.date}T00:00:00`);
  const linkedGoal = goals.find((goal) => goal.id === expense.goalId) ?? null;
  const expenseTags = tags.filter((tag) => expense.tagIds.includes(tag.id));
  const dateMonth = new Intl.DateTimeFormat("en-US", { month: "short" })
    .format(date)
    .replace(".", "");
  const metadata = [
    expense.category ?? linkedGoal?.name,
    expenseTags[0]?.label,
  ].filter(Boolean);

  return (
    <article
      className={`grid grid-cols-[68px_minmax(0,1fr)_auto] items-center gap-4 px-3 py-3 transition max-sm:grid-cols-[54px_minmax(0,1fr)_auto] ${
        !isLast ? "border-b border-[var(--border-subtle)]" : ""
      } ${
        isSelected
          ? "rounded-[var(--radius-action)] bg-[var(--surface-focal)]"
          : "hover:bg-[var(--surface-subtle)]"
      }`}
    >
      <button
        type="button"
        className="border-r border-[var(--border-subtle)] pr-3 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action-primary)]"
        aria-label={`Select ${expense.name}${isSelected ? ", selected" : ""}`}
        onClick={onSelect}
      >
        <span className="block text-[21px] font-medium leading-5 text-[var(--text-primary)]">
          {date.getDate()}
        </span>
        <span className="mt-1 block text-[10px] uppercase leading-4 text-[var(--text-muted)]">
          {dateMonth}
        </span>
      </button>

      <button
        type="button"
        className="min-w-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action-primary)]"
        aria-label={`Select ${expense.name}${isSelected ? ", selected" : ""}`}
        onClick={onSelect}
      >
        <span className="block truncate text-[13px] font-medium leading-5 text-[var(--text-primary)]">
          {expense.name}
        </span>
        <span className="mt-1 block truncate text-[11px] leading-5 text-[var(--text-muted)]">
          {metadata.join(" · ") || "Uncategorized"}
        </span>
      </button>

      <div className="flex items-center gap-2 justify-self-end">
        {isSelected ? (
          <>
            <ExpenseActionButton label={`Edit ${expense.name}`} onClick={onEdit}>
              <PencilIcon />
            </ExpenseActionButton>
            <ExpenseActionButton
              label={`Remove ${expense.name}`}
              onClick={onRemove}
            >
              <TrashIcon />
            </ExpenseActionButton>
          </>
        ) : null}
        <span className="min-w-20 text-right text-[16px] font-medium leading-6 text-[var(--text-primary)]">
          {formatCurrency(expense.amount)}
        </span>
      </div>
    </article>
  );
}

function ExpenseActionButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="grid size-9 shrink-0 place-items-center rounded-[10px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] text-[var(--text-primary)] transition hover:border-[var(--color-action-primary)] hover:bg-[var(--surface-subtle)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action-primary)]"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function PencilIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M6 6l1 15h10l1-15" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}
