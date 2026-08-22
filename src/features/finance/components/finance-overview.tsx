import { Card, Panel, SectionHeader } from "@/components/design-system";

import type { Expense, FinancePeriod, Income } from "../types";
import { formatCurrency } from "../utils";
import { FinancePeriodSelector } from "./finance-period-selector";

type OverviewMetric = {
  label: string;
  amount: number;
  accent: string;
  note: string;
};

export function FinanceOverview({
  expenses,
  income,
  expenseTotal,
  incomeTotal,
  netSavings,
  period,
  rangeLabel,
  onChangePeriod,
  onMovePeriod,
}: {
  expenses: Expense[];
  income: Income[];
  expenseTotal: number;
  incomeTotal: number;
  netSavings: number;
  period: FinancePeriod;
  rangeLabel: string;
  onChangePeriod: (period: FinancePeriod) => void;
  onMovePeriod: (direction: -1 | 1) => void;
}) {
  const savingsRate = incomeTotal > 0 ? (netSavings / incomeTotal) * 100 : 0;
  const topExpenseCategory = getTopExpenseCategory(expenses);
  const pieMetrics: OverviewMetric[] = [
    {
      label: "Income",
      amount: incomeTotal,
      accent: "var(--accent-green)",
      note: `${income.length} entries`,
    },
    {
      label: "Expenses",
      amount: expenseTotal,
      accent: "var(--accent-rose)",
      note: `${expenses.length} expenses`,
    },
    {
      label: netSavings >= 0 ? "Net savings" : "Net gap",
      amount: Math.abs(netSavings),
      accent: "var(--color-action-primary)",
      note: netSavings >= 0 ? "Kept this period" : "Over income",
    },
  ];
  const pieBackground = createPieBackground(pieMetrics);
  const savingsTone =
    netSavings > 0
      ? "Positive"
      : netSavings < 0
        ? "Needs attention"
        : "Break even";

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
      <Panel>
        <SectionHeader
          title="Overview"
          action={`${income.length + expenses.length} records`}
        />

        <div className="mt-5">
          <FinancePeriodSelector
            period={period}
            rangeLabel={rangeLabel}
            onChangePeriod={onChangePeriod}
            onMovePeriod={onMovePeriod}
          />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <MetricCard
            label="Total income"
            value={formatCurrency(incomeTotal)}
            detail={`${income.length} income entries`}
            accent="var(--accent-green)"
          />
          <MetricCard
            label="Total expenses"
            value={formatCurrency(expenseTotal)}
            detail={`${expenses.length} expense entries`}
            accent="var(--accent-rose)"
          />
          <MetricCard
            label="Net savings"
            value={formatCurrency(netSavings)}
            detail={savingsTone}
            accent="var(--color-action-primary)"
          />
        </div>

        <div className="mt-5 grid gap-5 rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 md:grid-cols-[240px_minmax(0,1fr)]">
          <div className="flex items-center justify-center">
            <div
              aria-label="Income, expenses, and net savings distribution"
              role="img"
              className="grid aspect-square w-full max-w-[220px] place-items-center rounded-full shadow-[inset_0_0_0_1px_rgba(8,17,32,0.08)]"
              style={{ background: pieBackground }}
            >
              <div className="grid size-[47%] place-items-center rounded-full bg-[var(--surface-raised)] text-center shadow-[0_12px_28px_rgba(8,17,32,0.08)]">
                <span className="text-[10px] leading-4 text-[var(--text-muted)]">
                  Net
                </span>
                <span className="text-[13px] font-medium leading-5">
                  {formatCurrency(netSavings)}
                </span>
              </div>
            </div>
          </div>

          <div className="min-w-0 content-center space-y-3">
            {pieMetrics.map((metric) => (
              <div
                key={metric.label}
                className="flex min-h-14 items-center justify-between gap-4 rounded-[14px] bg-[var(--background-page)] px-4 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="size-3 shrink-0 rounded-full"
                    style={{ backgroundColor: metric.accent }}
                  />
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium leading-5">
                      {metric.label}
                    </p>
                    <p className="text-[10px] leading-4 text-[var(--text-muted)]">
                      {metric.note}
                    </p>
                  </div>
                </div>
                <p className="shrink-0 text-[13px] font-medium leading-5">
                  {formatCurrency(
                    metric.label === "Net gap" ? -metric.amount : metric.amount,
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <aside className="min-w-0 space-y-6">
        <Card>
          <p className="text-[12px] leading-5 text-[var(--text-muted)]">
            Savings rate
          </p>
          <p className="mt-3 text-[32px] font-medium leading-10 text-[var(--text-primary)]">
            {Math.round(savingsRate)}%
          </p>
          <p className="mt-3 text-[11px] leading-5 text-[var(--text-muted)]">
            Net savings divided by income for this period
          </p>
        </Card>

        <Card>
          <p className="text-[12px] leading-5 text-[var(--text-muted)]">
            Largest expense group
          </p>
          <p className="mt-3 text-[24px] font-medium leading-8 text-[var(--text-primary)]">
            {topExpenseCategory?.category ?? "No expenses"}
          </p>
          <p className="mt-3 text-[11px] leading-5 text-[var(--text-muted)]">
            {topExpenseCategory
              ? `${formatCurrency(topExpenseCategory.amount)} spent`
              : "Add expenses to see the main pressure point"}
          </p>
        </Card>

        <Card>
          <p className="text-[12px] leading-5 text-[var(--text-muted)]">
            Period balance
          </p>
          <p className="mt-3 text-[24px] font-medium leading-8 text-[var(--text-primary)]">
            {savingsTone}
          </p>
          <p className="mt-3 text-[11px] leading-5 text-[var(--text-muted)]">
            {createBalanceMessage(netSavings)}
          </p>
        </Card>
      </aside>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  accent,
}: {
  label: string;
  value: string;
  detail: string;
  accent: string;
}) {
  return (
    <Card className="relative overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-1"
        style={{ backgroundColor: accent }}
      />
      <p className="text-[11px] leading-5 text-[var(--text-muted)]">{label}</p>
      <p className="mt-3 break-words text-[24px] font-medium leading-8 text-[var(--text-primary)]">
        {value}
      </p>
      <p className="mt-3 text-[10px] leading-4 text-[var(--text-muted)]">
        {detail}
      </p>
    </Card>
  );
}

function createPieBackground(metrics: OverviewMetric[]) {
  const total = metrics.reduce((sum, metric) => sum + metric.amount, 0);

  if (total <= 0) {
    return "conic-gradient(var(--border-subtle) 0deg 360deg)";
  }

  let cursor = 0;
  const segments = metrics
    .filter((metric) => metric.amount > 0)
    .map((metric) => {
      const start = cursor;
      const size = (metric.amount / total) * 360;
      cursor += size;

      return `${metric.accent} ${start}deg ${cursor}deg`;
    });

  return `conic-gradient(${segments.join(", ")})`;
}

function getTopExpenseCategory(expenses: Expense[]) {
  const categoryTotals = expenses.reduce<Record<string, number>>(
    (totals, expense) => {
      const category = expense.category || "Uncategorized";
      totals[category] = (totals[category] ?? 0) + expense.amount;

      return totals;
    },
    {},
  );

  return (
    Object.entries(categoryTotals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((first, second) => second.amount - first.amount)[0] ?? null
  );
}

function createBalanceMessage(netSavings: number) {
  if (netSavings > 0) {
    return `${formatCurrency(netSavings)} available after expenses`;
  }

  if (netSavings < 0) {
    return `${formatCurrency(Math.abs(netSavings))} above income this period`;
  }

  return "Income and expenses are even for the selected period";
}
