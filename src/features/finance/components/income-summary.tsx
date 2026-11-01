import type { Income, IncomeFilters } from "../types";
import { formatCurrency, formatMonth, sumIncome } from "../utils";
import { IncomeSummaryControls } from "./income-history";

const categoryAccents = [
  "var(--color-semantic-income)",
  "var(--color-action-primary)",
  "var(--color-semantic-context)",
  "var(--color-semantic-attention)",
  "var(--color-semantic-expense)",
];

export function IncomeSummary({
  categoryOptions,
  filters,
  frequencyOptions,
  income,
  labelOptions,
  month,
  onChangeFilters,
  onMoveMonth,
  onSelectIncome,
  onViewDetails,
}: {
  categoryOptions: string[];
  filters: IncomeFilters;
  frequencyOptions: string[];
  income: Income[];
  labelOptions: string[];
  month: Date;
  onChangeFilters: (filters: IncomeFilters) => void;
  onMoveMonth: (direction: -1 | 1) => void;
  onSelectIncome: (incomeId: string) => void;
  onViewDetails: () => void;
}) {
  const total = sumIncome(income);
  const categories = getCategorySummaries(income);
  const leadingCategories = categories.slice(0, 3);
  const visibleCategories = categories.slice(0, 5);
  const listIncome = income.slice(0, 3);
  const maxCategoryAmount = Math.max(
    ...categories.map((category) => category.amount),
    1,
  );

  return (
    <div className="grid gap-6">
      <IncomeSummaryControls
        categoryOptions={categoryOptions}
        filters={filters}
        frequencyOptions={frequencyOptions}
        labelOptions={labelOptions}
        monthLabel={formatMonth(month)}
        onChangeFilters={onChangeFilters}
        onMoveMonth={onMoveMonth}
      />

      <section
        aria-labelledby="monthly-income-title"
        className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-focal)] px-5 py-6 sm:px-7 sm:py-8"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full border border-[color:color-mix(in_srgb,var(--color-semantic-income)_34%,transparent)]"
        />
        <div className="relative grid gap-7 xl:grid-cols-[minmax(0,0.9fr)_minmax(480px,1.1fr)] xl:items-center">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Income this month
            </p>
            <h2
              id="monthly-income-title"
              className="mt-3 font-[family-name:var(--font-display)] text-[44px] leading-none tracking-[-0.04em] text-[var(--text-primary)] sm:text-[56px]"
            >
              {formatCurrency(total)}
            </h2>
            <p className="mt-4 text-[13px] leading-6 text-[var(--text-muted)]">
              {income.length} {income.length === 1 ? "entry" : "entries"} in{" "}
              {formatMonth(month)}
            </p>
          </div>

          <dl className="grid gap-4 border-t border-[var(--border-subtle)] pt-5 sm:grid-cols-3 sm:divide-x sm:divide-[var(--border-subtle)] sm:border-t-0 sm:pt-0">
            {leadingCategories.map((category, index) => (
              <div
                key={category.label}
                className="min-w-0 sm:px-5 sm:first:pl-0 sm:last:pr-0"
              >
                <dt className="flex items-center gap-2 text-[11px] leading-5 text-[var(--text-muted)]">
                  <span
                    aria-hidden="true"
                    className="size-2.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor:
                        categoryAccents[index % categoryAccents.length],
                    }}
                  />
                  <span className="truncate">{category.label}</span>
                </dt>
                <dd className="mt-3 text-[23px] font-medium leading-7 text-[var(--text-primary)]">
                  {formatCurrency(category.amount)}
                </dd>
                <dd className="mt-1 text-[11px] leading-5 text-[var(--text-muted)]">
                  {formatPercentage(category.amount, total)} of total
                </dd>
              </div>
            ))}
            {leadingCategories.length === 0 ? (
              <p className="text-[12px] leading-5 text-[var(--text-muted)]">
                Add income to see a category reading here.
              </p>
            ) : null}
          </dl>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.9fr)_minmax(280px,0.9fr)]">
        <section className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 max-sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Income this month
            </h2>
            <p className="text-[10px] leading-4 text-[var(--text-muted)]">
              {income.length} {income.length === 1 ? "item" : "items"}
            </p>
          </div>

          {listIncome.length > 0 ? (
            <div className="divide-y divide-[var(--border-subtle)]">
              {listIncome.map((incomeItem) => {
                const date = new Date(incomeItem.date + "T00:00:00");
                const metadata = [
                  incomeItem.category,
                  incomeItem.label,
                  incomeItem.frequency,
                ].filter(Boolean);

                return (
                  <button
                    key={incomeItem.id}
                    type="button"
                    className="grid w-full grid-cols-[50px_minmax(0,1fr)_auto] items-center gap-4 py-4 text-left transition hover:bg-[var(--surface-subtle)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action-primary)]"
                    onClick={() => onSelectIncome(incomeItem.id)}
                  >
                    <span className="border-r border-[var(--border-subtle)] pr-3 text-center">
                      <span className="block text-[21px] font-medium leading-5 text-[var(--text-primary)]">
                        {date.getDate()}
                      </span>
                      <span className="mt-1 block text-[10px] uppercase leading-4 text-[var(--text-muted)]">
                        {new Intl.DateTimeFormat("en-US", { month: "short" })
                          .format(date)
                          .replace(".", "")}
                      </span>
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-medium leading-5 text-[var(--text-primary)]">
                        {incomeItem.name}
                      </span>
                      <span className="mt-1 block truncate text-[11px] leading-5 text-[var(--text-muted)]">
                        {metadata.join(" · ") || "Uncategorized"}
                      </span>
                    </span>
                    <span className="text-[16px] font-medium leading-6 text-[var(--color-semantic-income)]">
                      {formatCurrency(incomeItem.amount)}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="py-8 text-[12px] leading-5 text-[var(--text-muted)]">
              No income matches the current filters.
            </p>
          )}

          <button
            type="button"
            className="mt-4 text-[12px] font-medium text-[var(--color-action-primary)] underline decoration-[var(--color-action-primary)] underline-offset-4 transition hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action-primary)]"
            onClick={onViewDetails}
          >
            View details ↓
          </button>
        </section>

        <section className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 max-sm:p-4">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Reading by category
          </h2>
          {categories.length > 0 ? (
            <div
              className="mt-7 grid h-48 items-end gap-3 border-b border-[var(--border-subtle)] pb-0"
              style={{
                gridTemplateColumns:
                  "repeat(" + visibleCategories.length + ", minmax(0, 1fr))",
              }}
            >
              {visibleCategories.map((category, index) => {
                const height = Math.max(
                  Math.round((category.amount / maxCategoryAmount) * 100),
                  12,
                );

                return (
                  <div
                    key={category.label}
                    tabIndex={0}
                    aria-describedby={"income-category-reading-" + index}
                    className="group relative flex h-full min-w-0 flex-col justify-end rounded-t-[10px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] focus-visible:ring-offset-2"
                  >
                    <span
                      id={"income-category-reading-" + index}
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-3 w-max max-w-40 -translate-x-1/2 rounded-[var(--radius-action)] bg-[var(--text-primary)] px-3 py-2 text-center text-[11px] font-medium leading-4 text-[var(--text-on-action-primary)] opacity-0 shadow-[var(--shadow-surface)] transition-opacity group-focus:opacity-100 group-hover:opacity-100"
                    >
                      {category.label}: {formatCurrency(category.amount)}
                    </span>
                    <span
                      aria-hidden="true"
                      className="block rounded-t-[10px] transition-opacity group-hover:opacity-80 group-focus:opacity-80"
                      style={{
                        height: height + "%",
                        backgroundColor:
                          categoryAccents[index % categoryAccents.length],
                        opacity: index === 0 ? 1 : 0.48,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-7 grid h-48 place-items-center border-b border-[var(--border-subtle)] text-center text-[12px] leading-5 text-[var(--text-muted)]">
              Add income to see its category distribution.
            </p>
          )}
          <div
            className="mt-3 grid gap-3"
            style={{
              gridTemplateColumns:
                "repeat(" + visibleCategories.length + ", minmax(0, 1fr))",
            }}
          >
            {visibleCategories.map((category) => (
              <span
                key={category.label}
                className="min-w-0 truncate text-center text-[10px] leading-4 text-[var(--text-muted)]"
                title={category.label}
              >
                {category.label}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function getCategorySummaries(income: Income[]) {
  const categories = new Map<string, number>();

  for (const incomeItem of income) {
    const label = incomeItem.category?.trim() || "Uncategorized";
    categories.set(label, (categories.get(label) ?? 0) + incomeItem.amount);
  }

  return [...categories]
    .map(([label, amount]) => ({ label, amount }))
    .sort((first, second) => second.amount - first.amount);
}

function formatPercentage(value: number, total: number) {
  if (total <= 0) {
    return "0%";
  }

  return String(Math.round((value / total) * 100)) + "%";
}
