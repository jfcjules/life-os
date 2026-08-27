import type { ReactNode } from "react";

import type { Expense, FinanceTag, Goal } from "../types";
import { formatCurrency, formatShortDate } from "../utils";

export function ExpenseRow({
  expense,
  goals,
  isSelected,
  tags,
  onEdit,
  onSelect,
  onRemove,
}: {
  expense: Expense;
  goals: Goal[];
  isSelected: boolean;
  tags: FinanceTag[];
  onEdit: () => void;
  onSelect: () => void;
  onRemove: () => void;
}) {
  const linkedGoal = goals.find((goal) => goal.id === expense.goalId) ?? null;
  const expenseTags = tags.filter((tag) => expense.tagIds.includes(tag.id));

  return (
    <article
      className={`grid min-h-[58px] grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-4 rounded-[var(--radius-action)] border px-4 py-3 transition max-md:grid-cols-[64px_minmax(0,1fr)] max-md:items-start ${
        isSelected
          ? "border-[var(--color-action-primary)] bg-[var(--action-selected)]"
          : "border-[var(--border-subtle)] bg-[var(--surface-raised)]"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className="text-left text-[11px] leading-5 text-[var(--text-muted)]"
        aria-pressed={isSelected}
      >
        {formatShortDate(expense.date)}
      </button>

      <button
        type="button"
        onClick={onSelect}
        className="min-w-0 text-left"
        aria-pressed={isSelected}
      >
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <h3 className="min-w-0 text-[13px] font-medium leading-5">
            {expense.name}
          </h3>
          {expenseTags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full bg-[var(--color-action-secondary)] px-3 py-1 text-[10px] leading-4 text-[var(--text-primary)]"
            >
              {tag.label}
            </span>
          ))}
        </div>
        <p className="mt-1 min-w-0 truncate text-[11px] leading-5 text-[var(--text-muted)]">
          {[expense.category, linkedGoal?.name].filter(Boolean).join(" - ") ||
            expense.frequency}
        </p>
      </button>

      <div className="flex min-w-0 items-center gap-2 justify-self-end max-md:col-span-2 max-md:w-full max-md:justify-end">
        <span className="mr-2 text-[16px] font-medium leading-6">
          {formatCurrency(expense.amount)}
        </span>
        <ExpenseActionButton label={`Edit ${expense.name}`} onClick={onEdit}>
          <PencilIcon />
        </ExpenseActionButton>
        <ExpenseActionButton
          label={`Remove ${expense.name}`}
          onClick={onRemove}
        >
          <TrashIcon />
        </ExpenseActionButton>
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
      className="grid size-9 shrink-0 place-items-center rounded-[var(--radius-action)] border border-[var(--border-subtle)] bg-[var(--surface-content-muted)] text-[var(--text-primary)] transition hover:border-[var(--color-action-primary)] hover:bg-[var(--surface-content)]"
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
