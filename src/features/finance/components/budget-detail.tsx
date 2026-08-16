import { Button, Card, SectionHeader } from "@/components/design-system";

import type { Budget } from "../types";
import {
  calculateBudgetPlannedAmount,
  formatBudgetPeriod,
  formatCurrency,
  getBudgetConcepts,
} from "../utils";

export function BudgetDetail({
  budget,
  onAddConcept,
}: {
  budget: Budget | null;
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

  return (
    <Card>
      <SectionHeader title={budget.name} action={formatBudgetPeriod(budget)} />

      <div className="mt-5 rounded-[18px] border border-[var(--border-subtle)] bg-[var(--background-page)] px-5 py-4">
        <p className="text-[11px] leading-5 text-[var(--text-muted)]">
          Planned amount
        </p>
        <p className="mt-2 text-[28px] font-medium leading-9 text-[var(--text-primary)]">
          {concepts.length > 0
            ? formatCurrency(plannedAmount)
            : "No planned amount yet"}
        </p>
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
            <div
              key={concept.id}
              className="flex min-h-[64px] items-center justify-between gap-4 rounded-[16px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 py-3"
            >
              <p className="min-w-0 text-[13px] font-medium leading-5">
                {concept.name}
              </p>
              <p className="shrink-0 text-[13px] font-medium leading-5">
                {formatCurrency(concept.amount)}
              </p>
            </div>
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
