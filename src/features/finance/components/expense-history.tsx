import { Button, Panel, SectionHeader } from "@/components/design-system";

import type { Expense, FinancePeriod } from "../types";
import { formatCurrency } from "../utils";
import { ExpenseRow } from "./expense-row";
import { FinancePeriodSelector } from "./finance-period-selector";

export function ExpenseHistory({
  expenses,
  period,
  rangeLabel,
  total,
  selectedExpenseId,
  onAddExpense,
  onChangePeriod,
  onMovePeriod,
  onRemoveExpense,
  onSelectExpense,
}: {
  expenses: Expense[];
  period: FinancePeriod;
  rangeLabel: string;
  total: number;
  selectedExpenseId: string | null;
  onAddExpense: () => void;
  onChangePeriod: (period: FinancePeriod) => void;
  onMovePeriod: (direction: -1 | 1) => void;
  onRemoveExpense: (expense: Expense) => void;
  onSelectExpense: (expenseId: string) => void;
}) {
  return (
    <Panel>
      <SectionHeader
        title="Expense history"
        action={`${expenses.length} expenses`}
      />

      <div className="mt-5">
        <FinancePeriodSelector
          period={period}
          rangeLabel={rangeLabel}
          onChangePeriod={onChangePeriod}
          onMovePeriod={onMovePeriod}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-5 py-4">
        <p className="text-[11px] leading-5 text-[var(--text-muted)]">
          Total spent in selected period
        </p>
        <p className="text-[18px] font-medium leading-7 text-[var(--text-primary)]">
          {formatCurrency(total)}
        </p>
      </div>

      {expenses.length > 0 ? (
        <div className="mt-5 space-y-3">
          {expenses.map((expense) => (
            <ExpenseRow
              key={expense.id}
              expense={expense}
              isSelected={selectedExpenseId === expense.id}
              onSelect={() => onSelectExpense(expense.id)}
              onRemove={() => onRemoveExpense(expense)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[18px] border border-dashed border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5">
          <p className="text-[13px] font-medium leading-5">
            No expenses recorded in this period.
          </p>
          <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
            Move to another period or add a new expense when spending happens.
          </p>
          <div className="mt-5">
            <Button variant="secondary" onClick={onAddExpense}>
              Add expense
            </Button>
          </div>
        </div>
      )}
    </Panel>
  );
}
