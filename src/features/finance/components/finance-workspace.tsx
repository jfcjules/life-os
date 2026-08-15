"use client";

import { useEffect, useMemo, useState } from "react";

import {
  AppShell,
  Button,
  Card,
} from "@/components/design-system";

import { createSeedExpenses } from "../data";
import {
  formatCurrency,
  formatDateRange,
  getPeriodRange,
  isWithinPeriod,
  movePeriod,
  sortByDateDesc,
  sumExpenses,
} from "../utils";
import {
  readStoredExpenses,
  saveStoredExpenses,
} from "../storage";
import type { Expense, FinancePeriod } from "../types";
import { ConfirmDeleteDialog } from "./confirm-delete-dialog";
import { ExpenseDetail } from "./expense-detail";
import { ExpenseForm } from "./expense-form";
import { ExpenseHistory } from "./expense-history";

export function FinanceWorkspace() {
  const today = useMemo(() => new Date(), []);
  const seedExpenses = useMemo(() => createSeedExpenses(today), [today]);
  const [expenses, setExpenses] = useState(seedExpenses);
  const [hasLoadedStoredExpenses, setHasLoadedStoredExpenses] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [period, setPeriod] = useState<FinancePeriod>("Monthly");
  const [anchorDate, setAnchorDate] = useState(today);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null,
  );
  const [expensePendingDelete, setExpensePendingDelete] =
    useState<Expense | null>(null);

  const periodRange = useMemo(
    () => getPeriodRange(period, anchorDate),
    [period, anchorDate],
  );
  const periodRangeLabel = useMemo(
    () => formatDateRange(periodRange),
    [periodRange],
  );

  const periodExpenses = useMemo(() => {
    return sortByDateDesc(
      expenses.filter((expense) => isWithinPeriod(expense.date, periodRange)),
    );
  }, [expenses, periodRange]);

  const periodTotal = useMemo(
    () => sumExpenses(periodExpenses),
    [periodExpenses],
  );

  const selectedExpense = useMemo(
    () =>
      periodExpenses.find((expense) => expense.id === selectedExpenseId) ??
      periodExpenses[0] ??
      null,
    [periodExpenses, selectedExpenseId],
  );
  const activeSelectedExpenseId = selectedExpense?.id ?? null;

  useEffect(() => {
    const storedExpenses = readStoredExpenses(seedExpenses);

    window.queueMicrotask(() => {
      setExpenses(storedExpenses);
      setHasLoadedStoredExpenses(true);
    });
  }, [seedExpenses]);

  useEffect(() => {
    if (!hasLoadedStoredExpenses) {
      return;
    }

    saveStoredExpenses(expenses);
  }, [expenses, hasLoadedStoredExpenses]);

  function handleAddExpense(expense: Expense) {
    setExpenses((currentExpenses) =>
      sortByDateDesc([expense, ...currentExpenses]),
    );
    setSelectedExpenseId(expense.id);
    setAnchorDate(new Date(`${expense.date}T00:00:00`));
    setIsAddExpenseOpen(false);
  }

  function handleConfirmDeleteExpense() {
    if (!expensePendingDelete) {
      return;
    }

    setExpenses((currentExpenses) =>
      currentExpenses.filter(
        (expense) => expense.id !== expensePendingDelete.id,
      ),
    );
    setSelectedExpenseId((currentSelectedExpenseId) =>
      currentSelectedExpenseId === expensePendingDelete.id
        ? null
        : currentSelectedExpenseId,
    );
    setExpensePendingDelete(null);
  }

  function handleChangePeriod(nextPeriod: FinancePeriod) {
    setPeriod(nextPeriod);
  }

  function handleMovePeriod(direction: -1 | 1) {
    setAnchorDate((currentAnchorDate) =>
      movePeriod(period, currentAnchorDate, direction),
    );
  }

  return (
    <AppShell activeItem="Finance">
      <div className="flex min-h-full flex-col gap-8">
        <header className="flex items-start justify-between gap-6 max-md:flex-col">
          <div className="max-w-[700px]">
            <p className="text-[12px] leading-5 text-[var(--text-muted)]">
              Life OS
            </p>
            <h1 className="mt-3 text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[0.96] text-[var(--text-primary)]">
              Finance
            </h1>
            <p className="mt-5 max-w-[560px] text-[13px] leading-6 text-[var(--text-muted)]">
              Record everyday spending and review spending by week, two-week
              period, or month.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 max-md:justify-start">
            <Button onClick={() => setIsAddExpenseOpen(true)}>
              Add expense
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
          <ExpenseHistory
            expenses={periodExpenses}
            period={period}
            rangeLabel={periodRangeLabel}
            total={periodTotal}
            selectedExpenseId={activeSelectedExpenseId}
            onAddExpense={() => setIsAddExpenseOpen(true)}
            onChangePeriod={handleChangePeriod}
            onMovePeriod={handleMovePeriod}
            onRemoveExpense={setExpensePendingDelete}
            onSelectExpense={setSelectedExpenseId}
          />

          <aside className="min-w-0 space-y-6">
            <Card>
              <p className="text-[12px] leading-5 text-[var(--text-muted)]">
                Period spent
              </p>
              <p className="mt-3 text-[32px] font-medium leading-10 text-[var(--text-primary)]">
                {formatCurrency(periodTotal)}
              </p>
              <p className="mt-3 text-[11px] leading-5 text-[var(--text-muted)]">
                {periodExpenses.length} expenses in the selected period
              </p>
            </Card>

            <ExpenseDetail expense={selectedExpense} />

            <Card>
              <p className="text-[12px] font-medium leading-5">
                Quick action
              </p>
              <p className="mt-3 text-[11px] leading-5 text-[var(--text-muted)]">
                Keep the entry small and specific.
              </p>
              <div className="mt-5">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setIsAddExpenseOpen(true)}
                >
                  Add expense
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </div>

      {isAddExpenseOpen ? (
        <ExpenseForm
          today={today}
          onAddExpense={handleAddExpense}
          onCancel={() => setIsAddExpenseOpen(false)}
        />
      ) : null}

      {expensePendingDelete ? (
        <ConfirmDeleteDialog
          expenseName={expensePendingDelete.name}
          onCancel={() => setExpensePendingDelete(null)}
          onConfirm={handleConfirmDeleteExpense}
        />
      ) : null}
    </AppShell>
  );
}
