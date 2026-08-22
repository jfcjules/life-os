import { Button, Panel, SectionHeader } from "@/components/design-system";

import type { FinancePeriod, Income } from "../types";
import { formatCurrency } from "../utils";
import { FinancePeriodSelector } from "./finance-period-selector";
import { IncomeRow } from "./income-row";

export function IncomeHistory({
  income,
  period,
  rangeLabel,
  selectedIncomeId,
  total,
  onAddIncome,
  onChangePeriod,
  onEditIncome,
  onMovePeriod,
  onRemoveIncome,
  onSelectIncome,
}: {
  income: Income[];
  period: FinancePeriod;
  rangeLabel: string;
  selectedIncomeId: string | null;
  total: number;
  onAddIncome: () => void;
  onChangePeriod: (period: FinancePeriod) => void;
  onEditIncome: (income: Income) => void;
  onMovePeriod: (direction: -1 | 1) => void;
  onRemoveIncome: (income: Income) => void;
  onSelectIncome: (incomeId: string) => void;
}) {
  return (
    <Panel>
      <SectionHeader title="Income history" action={`${income.length} entries`} />

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
          Total income in selected period
        </p>
        <p className="text-[18px] font-medium leading-7 text-[var(--text-primary)]">
          {formatCurrency(total)}
        </p>
      </div>

      {income.length > 0 ? (
        <div className="mt-5 space-y-3">
          {income.map((incomeItem) => (
            <IncomeRow
              key={incomeItem.id}
              income={incomeItem}
              isSelected={selectedIncomeId === incomeItem.id}
              onEdit={() => onEditIncome(incomeItem)}
              onRemove={() => onRemoveIncome(incomeItem)}
              onSelect={() => onSelectIncome(incomeItem.id)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[18px] border border-dashed border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5">
          <p className="text-[13px] font-medium leading-5">
            No income recorded in this period.
          </p>
          <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
            Move to another period or add income when money comes in.
          </p>
          <div className="mt-5">
            <Button variant="secondary" onClick={onAddIncome}>
              Add income
            </Button>
          </div>
        </div>
      )}
    </Panel>
  );
}
