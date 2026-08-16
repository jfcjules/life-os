import { Button, Card, SectionHeader } from "@/components/design-system";

import type { Budget, BudgetConcept, Expense } from "../types";
import {
  calculateBudgetPlannedAmount,
  calculateProgressPercent,
  formatBudgetPeriod,
  formatCurrency,
  getBudgetConcepts,
  getProgressStatus,
  sumBudgetConceptSpent,
  sumBudgetSpentAmount,
} from "../utils";

export function BudgetDetail({
  budget,
  expenses,
  onAddConcept,
}: {
  budget: Budget | null;
  expenses: Expense[];
  onAddConcept: () => void;
}) {
  if (!budget) {
    return (
      <Card>
        <p className="text-[12px] font-medium leading-5">Budget detail</p>
        <p className="mt-3 text-[11px] leading-5 text-[var(--text-muted)]">
          Create a budget to add planned expense concepts.
        </p>
      </Card>
    );
  }

  const concepts = getBudgetConcepts(budget);
  const plannedAmount = calculateBudgetPlannedAmount(budget);
  const spentAmount = sumBudgetSpentAmount(expenses, budget);

  return (
    <Card>
      <SectionHeader title={budget.name} action={formatBudgetPeriod(budget)} />

      <div className="mt-5 rounded-[18px] border border-[var(--border-subtle)] bg-[var(--background-page)] px-5 py-4">
        <p className="text-[11px] leading-5 text-[var(--text-muted)]">
          Planned amount
        </p>
        <p className="mt-2 text-[28px] font-medium leading-9 text-[var(--text-primary)]">
          {concepts.length > 0
            ? `${formatCurrency(spentAmount)} / ${formatCurrency(plannedAmount)}`
            : "No planned amount yet"}
        </p>
        {concepts.length > 0 ? (
          <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
            Spent in this budget period
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[12px] font-medium leading-5">Concepts</p>
        <Button
          variant="secondary"
          className="min-h-9 px-3"
          onClick={onAddConcept}
        >
          Add concept
        </Button>
      </div>

      {concepts.length > 0 ? (
        <div className="mt-4 space-y-3">
          {concepts.map((concept) => (
            <ConceptProgress
              key={concept.id}
              budget={budget}
              concept={concept}
              expenses={expenses}
            />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-[16px] border border-dashed border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4">
          <p className="text-[11px] leading-5 text-[var(--text-muted)]">
            This budget does not have concepts yet.
          </p>
        </div>
      )}
    </Card>
  );
}

function ConceptProgress({
  budget,
  concept,
  expenses,
}: {
  budget: Budget;
  concept: BudgetConcept;
  expenses: Expense[];
}) {
  const spentAmount = sumBudgetConceptSpent(expenses, budget, concept.id);
  const progressPercent = calculateProgressPercent(
    spentAmount,
    concept.amount,
  );
  const progressStatus = getProgressStatus(spentAmount, concept.amount);
  const isOverBudget = progressStatus === "Over budget";
  const isComplete = progressStatus === "Complete";
  const progressColor = isOverBudget
    ? "bg-[rgba(214,155,168,0.88)]"
    : isComplete
      ? "bg-[rgba(126,168,139,0.88)]"
      : "bg-[var(--color-action-primary)]";

  return (
    <div className="rounded-[16px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 py-3">
      <div className="flex min-w-0 items-start justify-between gap-4 max-sm:flex-col">
        <div className="min-w-0">
          <p className="min-w-0 text-[13px] font-medium leading-5">
            {concept.name}
          </p>
          <p className="mt-1 text-[11px] leading-5 text-[var(--text-muted)]">
            {progressStatus}
          </p>
        </div>
        <p className="shrink-0 text-[13px] font-medium leading-5">
          {formatCurrency(spentAmount)} / {formatCurrency(concept.amount)}
        </p>
      </div>

      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-[rgba(227,233,247,0.9)]"
        role="progressbar"
        aria-label={`${concept.name} spending progress`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progressPercent)}
      >
        <div
          className={`h-full rounded-full ${progressColor}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
