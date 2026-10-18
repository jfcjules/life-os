"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { Button } from "@/components/design-system";

import type {
  Expense,
  ExpenseFilters,
  ExpenseSortOption,
  FinancePeriod,
  FinanceTag,
  Goal,
} from "../types";
import { formatMonth, type FinancePeriodOption } from "../utils";
import { ExpenseRow } from "./expense-row";

const allFilterValue = "all";

type FilterMenu = "category" | "goal" | "tag" | "period" | "sort" | null;

type FilterPillProps = {
  active: boolean;
  children: ReactNode;
  isOpen: boolean;
  label: string;
  onToggle: () => void;
};

export function ExpenseSummaryControls({
  categoryOptions,
  filters,
  goals,
  monthLabel,
  tags,
  onChangeFilters,
  onMoveMonth,
}: {
  categoryOptions: string[];
  filters: ExpenseFilters;
  goals: Goal[];
  monthLabel: string;
  tags: FinanceTag[];
  onChangeFilters: (filters: ExpenseFilters) => void;
  onMoveMonth: (direction: -1 | 1) => void;
}) {
  const [openMenu, setOpenMenu] = useState<FilterMenu>(null);

  return (
    <section aria-label="Summary controls" className="flex flex-wrap items-center gap-3">
      <div className="flex h-11 items-center rounded-[var(--radius-action)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-1">
        <PeriodMoveButton
          direction={-1}
          label="Previous month"
          onMove={onMoveMonth}
        />
        <span className="min-w-40 px-4 text-center text-[12px] font-medium text-[var(--text-primary)]">
          {monthLabel}
        </span>
        <PeriodMoveButton
          direction={1}
          label="Next month"
          onMove={onMoveMonth}
        />
      </div>

      <ExpenseFilterPills
        categoryOptions={categoryOptions}
        filters={filters}
        goals={goals}
        openMenu={openMenu}
        tags={tags}
        onChangeFilters={onChangeFilters}
        onToggleMenu={(menu) =>
          setOpenMenu((currentMenu) => (currentMenu === menu ? null : menu))
        }
        onCloseMenu={() => setOpenMenu(null)}
      />
    </section>
  );
}

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
  const [openMenu, setOpenMenu] = useState<FilterMenu>(null);

  function toggleMenu(menu: Exclude<FilterMenu, null>) {
    setOpenMenu((currentMenu) => (currentMenu === menu ? null : menu));
  }

  return (
    <section
      aria-labelledby="expense-controls-title"
      className="flex flex-wrap items-center gap-3"
    >
      <h2 id="expense-controls-title" className="sr-only">
        Expense controls
      </h2>
      <ExpenseFilterPills
        categoryOptions={categoryOptions}
        filters={filters}
        goals={goals}
        openMenu={openMenu}
        tags={tags}
        onChangeFilters={onChangeFilters}
        onToggleMenu={toggleMenu}
        onCloseMenu={() => setOpenMenu(null)}
      />

      <FilterPill
        active={false}
        isOpen={openMenu === "period"}
        label="Period"
        onToggle={() => toggleMenu("period")}
      >
        <div className="grid min-w-[340px] grid-cols-[142px_minmax(0,1fr)] gap-3 p-2 max-sm:min-w-[min(340px,calc(100vw-3rem))]">
          <div className="border-r border-[var(--border-subtle)] pr-3">
            {(["Weekly", "Bi-weekly", "Monthly"] as FinancePeriod[]).map(
              (option) => (
                <MenuOption
                  key={option}
                  isSelected={period === option}
                  label={option}
                  onSelect={() => {
                    onChangePeriod(option);
                    setOpenMenu(null);
                  }}
                />
              ),
            )}
          </div>
          <div className="min-w-0">
            {periodOptions.length > 0 ? (
              periodOptions.map((option) => (
                <MenuOption
                  key={option.id}
                  isSelected={selectedPeriodOptionId === option.id}
                  label={period === "Monthly" ? formatMonth(option.anchorDate) : option.label}
                  onSelect={() => {
                    onChangePeriodOption(option.id);
                    setOpenMenu(null);
                  }}
                />
              ))
            ) : (
              <p className="px-3 py-2 text-[11px] leading-5 text-[var(--text-muted)]">
                No periods with data
              </p>
            )}
          </div>
        </div>
      </FilterPill>

      <FilterPill
        active={sortOption !== "date-newest"}
        isOpen={openMenu === "sort"}
        label="Sort"
        onToggle={() => toggleMenu("sort")}
      >
        <div className="min-w-44 p-2">
          {(
            [
              ["date-newest", "Date: newest"],
              ["date-oldest", "Date: oldest"],
              ["amount-highest", "Amount: highest"],
              ["amount-lowest", "Amount: lowest"],
            ] as [ExpenseSortOption, string][]
          ).map(([value, label]) => (
            <MenuOption
              key={value}
              isSelected={sortOption === value}
              label={label}
              onSelect={() => {
                onChangeSort(value);
                setOpenMenu(null);
              }}
            />
          ))}
        </div>
      </FilterPill>
    </section>
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
    <section
      aria-labelledby="expense-history-title"
      className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)]"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 px-5 pb-4 pt-5 max-sm:px-4">
        <h2
          id="expense-history-title"
          className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]"
        >
          Expenses in this period
        </h2>
        <p className="text-[10px] leading-4 text-[var(--text-muted)]">
          {expenses.length} {expenses.length === 1 ? "item" : "items"}
        </p>
      </header>

      {expenses.length > 0 ? (
        <div>
          <div className="grid grid-cols-[68px_minmax(0,1fr)_auto] gap-4 border-y border-[var(--border-subtle)] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)] max-sm:grid-cols-[54px_minmax(0,1fr)_auto] max-sm:px-4">
            <span>Date</span>
            <span>Expense</span>
            <span>Amount</span>
          </div>
          {hasActiveFilters ? (
            <p className="border-b border-[var(--border-subtle)] px-5 py-2 text-[10px] leading-4 text-[var(--text-muted)] max-sm:px-4">
              {expenses.length} of {unfilteredCount} expenses shown
            </p>
          ) : null}
          <div className="px-2 py-1">
            {expenses.map((expense, index) => (
              <ExpenseRow
                key={expense.id}
                expense={expense}
                goals={goals}
                isLast={index === expenses.length - 1}
                isSelected={selectedExpenseId === expense.id}
                tags={tags}
                onEdit={() => onEditExpense(expense)}
                onSelect={() => onSelectExpense(expense.id)}
                onRemove={() => onRemoveExpense(expense)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="border-t border-[var(--border-subtle)] px-5 py-10 text-center max-sm:px-4">
          <p className="text-[13px] font-medium leading-5 text-[var(--text-primary)]">
            {hasActiveFilters
              ? "No expenses match these filters."
              : "No expenses recorded in this period."}
          </p>
          <p className="mx-auto mt-2 max-w-sm text-[11px] leading-5 text-[var(--text-muted)]">
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
    </section>
  );
}

function ExpenseFilterPills({
  categoryOptions,
  filters,
  goals,
  openMenu,
  tags,
  onChangeFilters,
  onCloseMenu,
  onToggleMenu,
}: {
  categoryOptions: string[];
  filters: ExpenseFilters;
  goals: Goal[];
  openMenu: FilterMenu;
  tags: FinanceTag[];
  onChangeFilters: (filters: ExpenseFilters) => void;
  onCloseMenu: () => void;
  onToggleMenu: (menu: "category" | "goal" | "tag") => void;
}) {
  return (
    <>
      <FilterPill
        active={filters.category !== allFilterValue}
        isOpen={openMenu === "category"}
        label="Category"
        onToggle={() => onToggleMenu("category")}
      >
        <FilterMenuOptions
          options={[
            [allFilterValue, "All categories"],
            ...categoryOptions.map((category) => [category, category] as const),
          ]}
          selectedValue={filters.category}
          onSelect={(category) => {
            onChangeFilters({ ...filters, category });
            onCloseMenu();
          }}
        />
      </FilterPill>

      <FilterPill
        active={filters.tagId !== allFilterValue}
        isOpen={openMenu === "tag"}
        label="Tags"
        onToggle={() => onToggleMenu("tag")}
      >
        <FilterMenuOptions
          options={[
            [allFilterValue, "All tags"],
            ...tags.map((tag) => [tag.id, tag.label] as const),
          ]}
          selectedValue={filters.tagId}
          onSelect={(tagId) => {
            onChangeFilters({ ...filters, tagId });
            onCloseMenu();
          }}
        />
      </FilterPill>

      <FilterPill
        active={filters.goalId !== allFilterValue}
        isOpen={openMenu === "goal"}
        label="Goals"
        onToggle={() => onToggleMenu("goal")}
      >
        <FilterMenuOptions
          options={[
            [allFilterValue, "All goals"],
            ...goals.map((goal) => [goal.id, goal.name] as const),
          ]}
          selectedValue={filters.goalId}
          onSelect={(goalId) => {
            onChangeFilters({ ...filters, goalId });
            onCloseMenu();
          }}
        />
      </FilterPill>
    </>
  );
}

function FilterPill({
  active,
  children,
  isOpen,
  label,
  onToggle,
}: FilterPillProps) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        className={`flex min-h-11 items-center gap-2 rounded-[var(--radius-action)] border px-4 text-[12px] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action-primary)] ${
          active || isOpen
            ? "border-[var(--color-action-primary)] bg-[var(--surface-focal)] text-[var(--color-action-primary)]"
            : "border-[var(--border-subtle)] bg-[var(--surface-raised)] text-[var(--text-muted)] hover:border-[var(--action-hover-border)]"
        }`}
        onClick={onToggle}
      >
        {label}
        <ChevronIcon direction={isOpen ? "up" : "down"} />
      </button>
      {isOpen ? (
        <div className="absolute left-0 z-30 mt-2 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] shadow-[var(--shadow-surface)]">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function FilterMenuOptions({
  options,
  selectedValue,
  onSelect,
}: {
  options: readonly (readonly [string, string])[];
  selectedValue: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="min-w-48 p-2">
      {options.map(([value, label]) => (
        <MenuOption
          key={value}
          isSelected={selectedValue === value}
          label={label}
          onSelect={() => onSelect(value)}
        />
      ))}
    </div>
  );
}

function MenuOption({
  isSelected,
  label,
  onSelect,
}: {
  isSelected: boolean;
  label: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={`flex w-full items-center justify-between gap-4 rounded-[10px] px-3 py-2 text-left text-[11px] leading-5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action-primary)] ${
        isSelected
          ? "bg-[var(--surface-focal)] font-medium text-[var(--color-action-primary)]"
          : "text-[var(--text-muted)] hover:bg-[var(--surface-subtle)]"
      }`}
      onClick={onSelect}
    >
      <span className="min-w-0 truncate">{label}</span>
      {isSelected ? <CheckIcon /> : null}
    </button>
  );
}

function PeriodMoveButton({
  direction,
  label,
  onMove,
}: {
  direction: -1 | 1;
  label: string;
  onMove: (direction: -1 | 1) => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid size-9 place-items-center rounded-[10px] text-[var(--color-action-primary)] transition hover:bg-[var(--surface-focal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action-primary)]"
      onClick={() => onMove(direction)}
    >
      <ChevronIcon direction={direction === -1 ? "left" : "right"} />
    </button>
  );
}

function ChevronIcon({
  direction,
}: {
  direction: "down" | "left" | "right" | "up";
}) {
  const paths = {
    down: "m6 9 6 6 6-6",
    left: "m15 18-6-6 6-6",
    right: "m9 18 6-6-6-6",
    up: "m18 15-6-6-6 6",
  };

  return (
    <svg
      aria-hidden="true"
      className="size-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d={paths[direction]} />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-3.5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}
