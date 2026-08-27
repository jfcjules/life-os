import { Button, Panel, SectionHeader } from "@/components/design-system";

import type { Budget } from "../types";
import { BudgetRow } from "./budget-row";

export function BudgetList({
  budgets,
  selectedBudgetId,
  onAddBudget,
  onSelectBudget,
}: {
  budgets: Budget[];
  selectedBudgetId: string | null;
  onAddBudget: () => void;
  onSelectBudget: (budgetId: string) => void;
}) {
  return (
    <Panel>
      <SectionHeader action={`${budgets.length} budgets`} />

      {budgets.length > 0 ? (
        <div className="mt-5 space-y-3">
          {budgets.map((budget) => (
            <BudgetRow
              key={budget.id}
              budget={budget}
              isSelected={selectedBudgetId === budget.id}
              onSelect={() => onSelectBudget(budget.id)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[var(--radius-md)] border border-dashed border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5">
          <p className="text-[13px] font-medium leading-5">No budgets yet.</p>
          <div className="mt-5">
            <Button variant="secondary" onClick={onAddBudget}>
              Add budget
            </Button>
          </div>
        </div>
      )}
    </Panel>
  );
}
