import type { Expense, ExpenseFilters, FinanceTag, Goal } from "../types";
import { formatCurrency, formatMonth, sumExpenses } from "../utils";
import { ExpenseSummaryControls } from "./expense-history";

const categoryAccents = [
  "var(--color-action-primary)",
  "var(--color-semantic-expense)",
  "var(--color-semantic-income)",
  "var(--color-semantic-context)",
  "var(--color-semantic-attention)",
];

export function ExpenseSummary({
  categoryOptions,
  expenses,
  filters,
  goals,
  month,
  tags,
  onChangeFilters,
  onMoveMonth,
  onSelectExpense,
  onViewDetails,
}: {
  categoryOptions: string[];
  expenses: Expense[];
  filters: ExpenseFilters;
  goals: Goal[];
  month: Date;
  tags: FinanceTag[];
  onChangeFilters: (filters: ExpenseFilters) => void;
  onMoveMonth: (direction: -1 | 1) => void;
  onSelectExpense: (expenseId: string) => void;
  onViewDetails: () => void;
}) {
  const total = sumExpenses(expenses);
  const categories = getCategorySummaries(expenses);
  const leadingCategories = categories.slice(0, 3);
  const visibleCategories = categories.slice(0, 5);
  const listExpenses = expenses.slice(0, 3);
  const maxCategoryAmount = Math.max(
    ...categories.map((category) => category.amount),
    1,
  );

  return (
    <div className="grid gap-6">
      <ExpenseSummaryControls
        categoryOptions={categoryOptions}
        filters={filters}
        goals={goals}
        monthLabel={formatMonth(month)}
        tags={tags}
        onChangeFilters={onChangeFilters}
        onMoveMonth={onMoveMonth}
      />

      <section
        aria-labelledby="monthly-spending-title"
        className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-focal)] px-5 py-6 sm:px-7 sm:py-8"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full border border-[color:color-mix(in_srgb,var(--color-action-primary)_28%,transparent)]"
        />
        <div className="relative grid gap-7 xl:grid-cols-[minmax(0,0.9fr)_minmax(480px,1.1fr)] xl:items-center">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Spending this month
            </p>
            <h2
              id="monthly-spending-title"
              className="mt-3 font-[family-name:var(--font-display)] text-[44px] leading-none tracking-[-0.04em] text-[var(--text-primary)] sm:text-[56px]"
            >
              {formatCurrency(total)}
            </h2>
            <p className="mt-4 text-[13px] leading-6 text-[var(--text-muted)]">
              {expenses.length} {expenses.length === 1 ? "entry" : "entries"} in{" "}
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
                Add an expense to see a category reading here.
              </p>
            ) : null}
          </dl>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.9fr)_minmax(280px,0.9fr)]">
        <section className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 max-sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Expenses this month
            </h2>
            <p className="text-[10px] leading-4 text-[var(--text-muted)]">
              {expenses.length} {expenses.length === 1 ? "item" : "items"}
            </p>
          </div>

          {listExpenses.length > 0 ? (
            <div className="divide-y divide-[var(--border-subtle)]">
              {listExpenses.map((expense) => {
                const date = new Date(`${expense.date}T00:00:00`);
                const tag = tags.find((item) => expense.tagIds.includes(item.id));

                return (
                  <button
                    key={expense.id}
                    type="button"
                    className="grid w-full grid-cols-[50px_minmax(0,1fr)_auto] items-center gap-4 py-4 text-left transition hover:bg-[var(--surface-subtle)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action-primary)]"
                    onClick={() => onSelectExpense(expense.id)}
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
                        {expense.name}
                      </span>
                      <span className="mt-1 block truncate text-[11px] leading-5 text-[var(--text-muted)]">
                        {[expense.category, tag?.label].filter(Boolean).join(" · ") ||
                          "Uncategorized"}
                      </span>
                    </span>
                    <span className="text-[16px] font-medium leading-6 text-[var(--text-primary)]">
                      {formatCurrency(expense.amount)}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="py-8 text-[12px] leading-5 text-[var(--text-muted)]">
              No expenses match the current filters.
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
                gridTemplateColumns: `repeat(${visibleCategories.length}, minmax(0, 1fr))`,
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
                    aria-describedby={`category-reading-${index}`}
                    className="group relative flex h-full min-w-0 flex-col justify-end rounded-t-[10px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] focus-visible:ring-offset-2"
                  >
                    <span
                      id={`category-reading-${index}`}
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-3 w-max max-w-40 -translate-x-1/2 rounded-[var(--radius-action)] bg-[var(--text-primary)] px-3 py-2 text-center text-[11px] font-medium leading-4 text-[var(--text-on-action-primary)] opacity-0 shadow-[var(--shadow-surface)] transition-opacity group-focus:opacity-100 group-hover:opacity-100"
                    >
                      {category.label}: {formatCurrency(category.amount)}
                    </span>
                    <span
                      aria-hidden="true"
                      className="block rounded-t-[10px] transition-opacity group-hover:opacity-80 group-focus:opacity-80"
                      style={{
                        height: `${height}%`,
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
              Add expenses to see their category distribution.
            </p>
          )}
          <div
            className="mt-3 grid gap-3"
            style={{
              gridTemplateColumns: `repeat(${visibleCategories.length}, minmax(0, 1fr))`,
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

function getCategorySummaries(expenses: Expense[]) {
  const categories = new Map<string, number>();

  for (const expense of expenses) {
    const label = expense.category?.trim() || "Uncategorized";
    categories.set(label, (categories.get(label) ?? 0) + expense.amount);
  }

  return [...categories]
    .map(([label, amount]) => ({ label, amount }))
    .sort((first, second) => second.amount - first.amount);
}

function formatPercentage(value: number, total: number) {
  if (total <= 0) {
    return "0%";
  }

  return `${Math.round((value / total) * 100)}%`;
}
