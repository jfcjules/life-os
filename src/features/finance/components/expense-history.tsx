import type { ReactNode } from "react";

import { Button, Panel, SectionHeader } from "@/components/design-system";

import type {
  Expense,
  ExpenseFilters,
  ExpenseSortOption,
  FinancePeriod,
  FinanceTag,
  Goal,
} from "../types";
import type { FinancePeriodOption } from "../utils";
import { ExpenseRow } from "./expense-row";

const allFilterValue = "all";

export function ExpenseControls({
  categoryOptions,
  filters,
  goals,
  period,
  periodOptions,
  selectedPeriodOptionId,
  sortOption,
  tags,
  onChangeFilters,
  onChangePeriod,
  onChangePeriodOption,
  onChangeSort,
}: {
  categoryOptions: string[];
  filters: ExpenseFilters;
  goals: Goal[];
  period: FinancePeriod;
  periodOptions: FinancePeriodOption[];
  selectedPeriodOptionId: string | null;
  sortOption: ExpenseSortOption;
  tags: FinanceTag[];
  onChangeFilters: (filters: ExpenseFilters) => void;
  onChangePeriod: (period: FinancePeriod) => void;
  onChangePeriodOption: (periodOptionId: string) => void;
  onChangeSort: (sortOption: ExpenseSortOption) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_424px]">
      <ControlPanel title="Filters">
        <div className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-3">
            <FilterSelect
              label="Category"
              value={filters.category}
              onChange={(category) =>
                onChangeFilters({ ...filters, category })
              }
            >
              <option value={allFilterValue}>All categories</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </FilterSelect>

            <FilterSelect
              label="Goal"
              value={filters.goalId}
              onChange={(goalId) => onChangeFilters({ ...filters, goalId })}
            >
              <option value={allFilterValue}>All goals</option>
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.name}
                </option>
              ))}
            </FilterSelect>

            <FilterSelect
              label="Tag"
              value={filters.tagId}
              onChange={(tagId) => onChangeFilters({ ...filters, tagId })}
            >
              <option value={allFilterValue}>All tags</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.label}
                </option>
              ))}
            </FilterSelect>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <FilterSelect
              label="Period"
              value={period}
              onChange={(nextPeriod) =>
                onChangePeriod(nextPeriod as FinancePeriod)
              }
            >
              <option value="Weekly">Weekly</option>
              <option value="Bi-weekly">Bi-weekly</option>
              <option value="Monthly">Monthly</option>
            </FilterSelect>

            <FilterSelect
              label="Selected period"
              value={selectedPeriodOptionId ?? ""}
              onChange={onChangePeriodOption}
              disabled={periodOptions.length === 0}
            >
              {periodOptions.length > 0 ? (
                periodOptions.map((periodOption) => (
                  <option key={periodOption.id} value={periodOption.id}>
                    {periodOption.label}
                  </option>
                ))
              ) : (
                <option value="">No periods with data</option>
              )}
            </FilterSelect>
          </div>
        </div>
      </ControlPanel>

      <ControlPanel title="Sort by">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <SortGroup
            label="Amount"
            options={[
              ["amount-highest", "Highest"],
              ["amount-lowest", "Lowest"],
            ]}
            sortOption={sortOption}
            onChangeSort={onChangeSort}
          />
          <SortGroup
            label="Date"
            options={[
              ["date-newest", "Newest"],
              ["date-oldest", "Oldest"],
            ]}
            sortOption={sortOption}
            onChangeSort={onChangeSort}
          />
        </div>
      </ControlPanel>
    </div>
  );
}

export function ExpenseHistory({
  expenses,
  filters,
  unfilteredCount,
  goals,
  tags,
  selectedExpenseId,
  onAddExpense,
  onEditExpense,
  onRemoveExpense,
  onSelectExpense,
}: {
  expenses: Expense[];
  filters: ExpenseFilters;
  unfilteredCount: number;
  goals: Goal[];
  tags: FinanceTag[];
  selectedExpenseId: string | null;
  onAddExpense: () => void;
  onEditExpense: (expense: Expense) => void;
  onRemoveExpense: (expense: Expense) => void;
  onSelectExpense: (expenseId: string) => void;
}) {
  const hasActiveFilters =
    filters.category !== allFilterValue ||
    filters.goalId !== allFilterValue ||
    filters.tagId !== allFilterValue;

  return (
    <Panel className="min-h-[212px]">
      <SectionHeader
        action={`${expenses.length} ${
          expenses.length === 1 ? "expense" : "expenses"
        }`}
      />

      {expenses.length > 0 ? (
        <div className="mt-5 space-y-2">
          {hasActiveFilters ? (
            <p className="px-1 text-[11px] leading-5 text-[var(--text-muted)]">
              {expenses.length} of {unfilteredCount} expenses shown
            </p>
          ) : null}

          {expenses.map((expense) => (
            <ExpenseRow
              key={expense.id}
              expense={expense}
              goals={goals}
              isSelected={selectedExpenseId === expense.id}
              tags={tags}
              onEdit={() => onEditExpense(expense)}
              onSelect={() => onSelectExpense(expense.id)}
              onRemove={() => onRemoveExpense(expense)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[var(--radius-md)] border border-dashed border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5">
          <p className="text-[13px] font-medium leading-5">
            {hasActiveFilters
              ? "No expenses match these filters."
              : "No expenses recorded in this period."}
          </p>
          <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
            {hasActiveFilters
              ? "Adjust filters or choose another period."
              : "Choose another period or add a new expense when spending happens."}
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

function ControlPanel({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="min-w-0 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-content)] px-5 py-4">
      <h2 className="text-[13px] font-medium leading-5 text-[var(--text-primary)]">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function FilterSelect({
  children,
  label,
  onChange,
  value,
  disabled = false,
}: {
  children: ReactNode;
  disabled?: boolean;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
      {label}
      <select
        className="min-h-10 w-full rounded-[var(--radius-action)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-3 text-[11px] text-[var(--text-primary)] outline-none transition focus:border-[var(--color-action-primary)] disabled:opacity-60"
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {children}
      </select>
    </label>
  );
}

function SortGroup({
  label,
  onChangeSort,
  options,
  sortOption,
}: {
  label: string;
  onChangeSort: (sortOption: ExpenseSortOption) => void;
  options: [ExpenseSortOption, string][];
  sortOption: ExpenseSortOption;
}) {
  return (
    <div>
      <p className="text-[11px] leading-4 text-[var(--text-muted)]">{label}</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {options.map(([value, optionLabel]) => {
          const isSelected = sortOption === value;

          return (
            <button
              key={value}
              type="button"
              aria-pressed={isSelected}
              className={`min-h-9 rounded-[var(--radius-action)] px-3 text-[10px] transition ${
                isSelected
                  ? "bg-[var(--color-action-primary)] font-medium text-[var(--text-primary)] shadow-[var(--shadow-action)]"
                  : "bg-[var(--surface-raised)] text-[var(--text-muted)]"
              }`}
              onClick={() => onChangeSort(value)}
            >
              {optionLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
