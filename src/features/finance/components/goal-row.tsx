import type { ReactNode } from "react";
import { useState } from "react";

import { Button } from "@/components/design-system";

import type { Expense, Goal, GoalPlannedItem, GoalSaving } from "../types";
import {
  calculateGoalSummary,
  calculateProgressPercent,
  formatCurrency,
  formatDate,
  getGoalLinkedExpenses,
  getGoalPlannedItemSavings,
  getGoalPlannedItems,
  getGoalSavings,
  sumExpenses,
  sumGoalSavings,
} from "../utils";

export function GoalRow({
  expenses,
  goal,
  isSelected,
  onAddSavingForPlannedItem,
  onSelect,
}: {
  expenses: Expense[];
  goal: Goal;
  isSelected: boolean;
  onAddSavingForPlannedItem: (goalId: string, plannedItemId: string) => void;
  onSelect: () => void;
}) {
  const [isItemsOpen, setIsItemsOpen] = useState(false);
  const [isSavingsOpen, setIsSavingsOpen] = useState(false);
  const [isExpensesOpen, setIsExpensesOpen] = useState(false);
  const plannedItems = getGoalPlannedItems(goal);
  const savings = getGoalSavings(goal);
  const linkedExpenses = getGoalLinkedExpenses(expenses, goal);
  const summary = calculateGoalSummary(goal, expenses);
  const hasGoalAmount = goal.goalAmount !== undefined;

  return (
    <article
      className={`grid w-full gap-4 rounded-[var(--radius-md)] border p-5 transition ${
        isSelected
          ? "border-[var(--color-action-primary)] bg-[var(--action-selected)]"
          : "border-[var(--border-subtle)] bg-[var(--surface-raised)]"
      }`}
    >
      <button
        type="button"
        className="grid w-full gap-4 text-left"
        aria-pressed={isSelected}
        onClick={onSelect}
      >
        <span className="flex min-w-0 items-start justify-between gap-4 max-sm:flex-col">
          <span className="min-w-0">
            <span className="block min-w-0 text-[14px] font-medium leading-5">
              {goal.name}
            </span>
            <span className="mt-2 block text-[11px] leading-5 text-[var(--text-muted)]">
              {goal.targetDate ? formatDate(goal.targetDate) : "No target date"}
            </span>
          </span>

          <span className="grid justify-items-end gap-2 max-sm:justify-items-start">
            <span
              className={`rounded-full px-3 py-1 text-[10px] leading-4 text-[var(--text-primary)] ${
                goal.status === "Completed"
                  ? "bg-[var(--accent-green-muted)]"
                  : "bg-[var(--color-action-secondary)]"
              }`}
            >
              {goal.status}
            </span>
            <span className="text-[12px] font-medium leading-5 text-[var(--text-primary)]">
              {hasGoalAmount
                ? formatCurrency(goal.goalAmount ?? 0)
                : "Open goal"}
            </span>
          </span>
        </span>

        <span className="grid gap-2">
          <span className="flex flex-wrap items-center justify-between gap-3 text-[11px] leading-5 text-[var(--text-muted)]">
            <span>{formatCurrency(summary.savedAmount)} saved</span>
            <span>
              {summary.remainingAmount !== undefined
                ? `${formatCurrency(summary.remainingAmount)} remaining`
                : `${formatCurrency(summary.availableAmount)} available`}
            </span>
          </span>

          {summary.progressPercent !== undefined ? (
            <ProgressBar
              label={`${goal.name} savings progress`}
              value={summary.progressPercent}
            />
          ) : null}
        </span>
      </button>

      <div className="grid gap-3 border-t border-[var(--border-subtle)] pt-4">
        <CollapsibleSection
          count={plannedItems.length}
          isOpen={isItemsOpen}
          title="Planned items"
          onToggle={() => setIsItemsOpen((current) => !current)}
        >
          {plannedItems.length > 0 ? (
            plannedItems.map((item) => (
              <PlannedItemCard
                key={item.id}
                item={item}
                linkedExpenses={linkedExpenses}
                savings={savings}
                onAddSaving={() => onAddSavingForPlannedItem(goal.id, item.id)}
              />
            ))
          ) : (
            <EmptyLine text="No planned items yet." />
          )}
        </CollapsibleSection>

        <CollapsibleSection
          count={savings.length}
          isOpen={isSavingsOpen}
          title="Savings"
          onToggle={() => setIsSavingsOpen((current) => !current)}
        >
          {savings.length > 0 ? (
            savings.map((saving) => (
              <SavingRow
                key={saving.id}
                plannedItems={plannedItems}
                saving={saving}
              />
            ))
          ) : (
            <EmptyLine text="No savings added yet." />
          )}
        </CollapsibleSection>

        <CollapsibleSection
          count={linkedExpenses.length}
          isOpen={isExpensesOpen}
          title="Linked expenses"
          onToggle={() => setIsExpensesOpen((current) => !current)}
        >
          {linkedExpenses.length > 0 ? (
            linkedExpenses.map((expense) => (
              <ExpenseRow
                key={expense.id}
                expense={expense}
                plannedItems={plannedItems}
              />
            ))
          ) : (
            <EmptyLine text="No expenses linked to this goal." />
          )}
        </CollapsibleSection>
      </div>
    </article>
  );
}

function CollapsibleSection({
  children,
  count,
  isOpen,
  onToggle,
  title,
}: {
  children: ReactNode;
  count: number;
  isOpen: boolean;
  onToggle: () => void;
  title: string;
}) {
  return (
    <section className="rounded-[var(--radius-action)] bg-[var(--surface-content-muted)]">
      <button
        type="button"
        className="flex min-h-11 w-full items-center justify-between gap-3 px-4 py-2 text-left"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="text-[12px] font-medium leading-5 text-[var(--text-primary)]">
          {title}
        </span>
        <span className="text-[11px] leading-5 text-[var(--text-muted)]">
          {count} {isOpen ? "Hide" : "Show"}
        </span>
      </button>

      {isOpen ? <div className="grid gap-3 px-4 pb-4">{children}</div> : null}
    </section>
  );
}

function PlannedItemCard({
  item,
  linkedExpenses,
  onAddSaving,
  savings,
}: {
  item: GoalPlannedItem;
  linkedExpenses: Expense[];
  onAddSaving: () => void;
  savings: GoalSaving[];
}) {
  const itemSavings = getGoalPlannedItemSavings(savings, item.id);
  const itemExpenses = linkedExpenses.filter(
    (expense) => expense.goalPlannedItemId === item.id,
  );
  const savedAmount = sumGoalSavings(itemSavings);
  const spentAmount = sumExpenses(itemExpenses);
  const progressPercent =
    item.estimatedAmount === undefined
      ? 0
      : calculateProgressPercent(savedAmount, item.estimatedAmount);

  return (
    <article className="rounded-[var(--radius-action)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 py-3">
      <div className="flex min-w-0 items-start justify-between gap-4 max-sm:flex-col">
        <div className="min-w-0">
          <p className="text-[13px] font-medium leading-5 text-[var(--text-primary)]">
            {item.concept}
          </p>
          <p className="mt-1 text-[11px] leading-5 text-[var(--text-muted)]">
            {item.estimatedAmount !== undefined
              ? `${formatCurrency(savedAmount)} / ${formatCurrency(
                  item.estimatedAmount,
                )} saved`
              : `${formatCurrency(savedAmount)} saved, no estimate`}
          </p>
        </div>

        <Button
          variant="secondary"
          className="min-h-9 shrink-0 px-3"
          onClick={onAddSaving}
        >
          Add saving
        </Button>
      </div>

      <div className="mt-3">
        <ProgressBar
          label={`${item.concept} savings progress`}
          value={progressPercent}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[11px] leading-5 text-[var(--text-muted)]">
        <span>{formatCurrency(spentAmount)} spent</span>
        <span>{itemSavings.length} savings</span>
      </div>
    </article>
  );
}

function SavingRow({
  plannedItems,
  saving,
}: {
  plannedItems: GoalPlannedItem[];
  saving: GoalSaving;
}) {
  const plannedItem = plannedItems.find(
    (item) => item.id === saving.plannedItemId,
  );

  return (
    <MiniRow
      title={saving.concept ?? "Saving"}
      detail={`${formatCurrency(saving.amount)} on ${formatDate(saving.date)}${
        plannedItem ? `, linked to ${plannedItem.concept}` : ""
      }`}
    />
  );
}

function ExpenseRow({
  expense,
  plannedItems,
}: {
  expense: Expense;
  plannedItems: GoalPlannedItem[];
}) {
  const plannedItem = plannedItems.find(
    (item) => item.id === expense.goalPlannedItemId,
  );

  return (
    <MiniRow
      title={expense.name}
      detail={`${formatCurrency(expense.amount)} on ${formatDate(
        expense.date,
      )}${plannedItem ? `, linked to ${plannedItem.concept}` : ""}`}
    />
  );
}

function MiniRow({ detail, title }: { detail: string; title: string }) {
  return (
    <div className="rounded-[var(--radius-action)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 py-3">
      <p className="text-[13px] font-medium leading-5 text-[var(--text-primary)]">
        {title}
      </p>
      <p className="mt-1 text-[11px] leading-5 text-[var(--text-muted)]">
        {detail}
      </p>
    </div>
  );
}

function EmptyLine({ text }: { text: string }) {
  return (
    <div className="rounded-[var(--radius-action)] border border-dashed border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4">
      <p className="text-[11px] leading-5 text-[var(--text-muted)]">{text}</p>
    </div>
  );
}

function ProgressBar({ label, value }: { label: string; value: number }) {
  return (
    <span
      className="block h-2 overflow-hidden rounded-full bg-[var(--surface-content)]"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
    >
      <span
        className="block h-full rounded-full bg-[var(--color-action-primary)]"
        style={{ width: `${value}%` }}
      />
    </span>
  );
}
