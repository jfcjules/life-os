import { Button, Card, SectionHeader } from "@/components/design-system";

import type { Expense, Goal } from "../types";
import {
  calculateGoalSummary,
  formatCurrency,
  formatDate,
} from "../utils";

export function GoalDetail({
  expenses,
  goal,
  onAddPlannedItem,
  onAddSaving,
  onCompleteGoal,
}: {
  expenses: Expense[];
  goal: Goal | null;
  onAddPlannedItem: () => void;
  onAddSaving: () => void;
  onCompleteGoal: () => void;
}) {
  if (!goal) {
    return (
      <Card>
        <p className="text-[12px] font-medium leading-5">Goal detail</p>
        <p className="mt-3 text-[11px] leading-5 text-[var(--text-muted)]">
          Create a goal to manage planned items, savings, and linked spending.
        </p>
      </Card>
    );
  }

  const summary = calculateGoalSummary(goal, expenses);

  return (
    <Card>
      <SectionHeader
        title={goal.name}
        action={goal.targetDate ? formatDate(goal.targetDate) : "No target date"}
      />

      <div className="mt-5 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--background-page)] px-5 py-4">
        <p className="text-[11px] leading-5 text-[var(--text-muted)]">
          Saved so far
        </p>
        <p className="mt-2 text-[28px] font-medium leading-9 text-[var(--text-primary)]">
          {goal.goalAmount !== undefined
            ? `${formatCurrency(summary.savedAmount)} / ${formatCurrency(
                goal.goalAmount,
              )}`
            : formatCurrency(summary.savedAmount)}
        </p>
        <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
          {goal.goalAmount !== undefined
            ? `${formatCurrency(
                summary.remainingAmount ?? 0,
              )} remaining toward this goal`
            : "No goal amount set"}
        </p>

        {summary.progressPercent !== undefined ? (
          <div
            className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface-content)]"
            role="progressbar"
            aria-label={`${goal.name} savings progress`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(summary.progressPercent)}
          >
            <div
              className="h-full rounded-full bg-[var(--color-action-primary)]"
              style={{ width: `${summary.progressPercent}%` }}
            />
          </div>
        ) : null}
      </div>

      <dl className="mt-5 grid gap-3 text-[11px] leading-5">
        <DetailItem label="Goal amount" value={formatOptionalAmount(goal.goalAmount)} />
        <DetailItem label="Spent" value={formatCurrency(summary.spentAmount)} />
        <DetailItem
          label="Available"
          value={formatCurrency(summary.availableAmount)}
        />
        <DetailItem
          label="Planned total"
          value={
            summary.estimatedPlannedTotal > 0
              ? formatCurrency(summary.estimatedPlannedTotal)
              : "No estimates"
          }
        />
        <DetailItem label="Status" value={goal.status} />
      </dl>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button variant="secondary" className="min-h-9 px-3" onClick={onAddSaving}>
          Add saving
        </Button>
        <Button
          variant="secondary"
          className="min-h-9 px-3"
          onClick={onAddPlannedItem}
        >
          Add planned item
        </Button>
        {goal.status !== "Completed" ? (
          <Button variant="ghost" className="min-h-9 px-3" onClick={onCompleteGoal}>
            Mark completed
          </Button>
        ) : null}
      </div>
    </Card>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3 rounded-[var(--radius-action)] bg-[var(--surface-content-muted)] px-4 py-3 max-sm:grid-cols-1">
      <dt className="text-[var(--text-muted)]">{label}</dt>
      <dd className="min-w-0 text-[var(--text-primary)]">{value}</dd>
    </div>
  );
}

function formatOptionalAmount(amount: number | undefined) {
  return amount === undefined ? "None" : formatCurrency(amount);
}
