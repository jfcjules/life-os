"use client";

import { useEffect, useMemo, useState } from "react";

import {
  AppShell,
  Button,
  Card,
  Panel,
  SectionHeader,
} from "@/components/design-system";

import { createSeedExpenses } from "../data";
import {
  formatCurrency,
  formatDate,
  formatMonth,
  isSameMonth,
  sortByDateDesc,
  sumExpenses,
} from "../utils";
import {
  readStoredExpenses,
  saveStoredExpenses,
} from "../storage";
import type { Expense } from "../types";
import { ConfirmDeleteDialog } from "./confirm-delete-dialog";
import { ExpenseForm } from "./expense-form";

export function FinanceWorkspace() {
  const today = useMemo(() => new Date(), []);
  const seedExpenses = useMemo(() => createSeedExpenses(today), [today]);
  const [expenses, setExpenses] = useState(seedExpenses);
  const [hasLoadedStoredExpenses, setHasLoadedStoredExpenses] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [expensePendingDelete, setExpensePendingDelete] =
    useState<Expense | null>(null);

  const currentMonthExpenses = useMemo(() => {
    return sortByDateDesc(
      expenses.filter((expense) => isSameMonth(expense.date, today)),
    );
  }, [expenses, today]);

  const currentMonthTotal = useMemo(
    () => sumExpenses(currentMonthExpenses),
    [currentMonthExpenses],
  );

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
    setExpensePendingDelete(null);
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
              Record everyday spending and keep the current month easy to read.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 max-md:justify-start">
            <Button onClick={() => setIsAddExpenseOpen(true)}>
              Add expense
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
          <Panel>
            <SectionHeader
              title="Current month expenses"
              action={formatMonth(today)}
            />

            {currentMonthExpenses.length > 0 ? (
              <div className="mt-5 space-y-3">
                {currentMonthExpenses.map((expense) => (
                  <article
                    key={expense.id}
                    className="grid min-h-[92px] grid-cols-[minmax(0,1fr)_auto] items-start gap-4 rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 max-sm:grid-cols-1"
                  >
                    <div className="min-w-0">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <h3 className="min-w-0 text-[14px] font-medium leading-5">
                          {expense.name}
                        </h3>
                        {expense.category ? (
                          <span className="rounded-full bg-[rgba(126,168,139,0.22)] px-3 py-1 text-[10px] leading-4 text-[var(--text-primary)]">
                            {expense.category}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
                        {formatDate(expense.date)}
                      </p>
                    </div>

                    <div className="flex min-w-0 items-start gap-3 justify-self-end max-sm:w-full max-sm:justify-between">
                      <span className="text-[14px] font-medium leading-5">
                        {formatCurrency(expense.amount)}
                      </span>
                      <Button
                        variant="ghost"
                        className="min-h-9 px-3"
                        onClick={() => setExpensePendingDelete(expense)}
                      >
                        Remove
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-[18px] border border-dashed border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5">
                <p className="text-[13px] font-medium leading-5">
                  No expenses recorded this month.
                </p>
                <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
                  New spending will appear in this monthly view.
                </p>
                <div className="mt-5">
                  <Button
                    variant="secondary"
                    onClick={() => setIsAddExpenseOpen(true)}
                  >
                    Add expense
                  </Button>
                </div>
              </div>
            )}
          </Panel>

          <aside className="min-w-0 space-y-6">
            <Card>
              <p className="text-[12px] leading-5 text-[var(--text-muted)]">
                Total spent
              </p>
              <p className="mt-3 text-[32px] font-medium leading-10 text-[var(--text-primary)]">
                {formatCurrency(currentMonthTotal)}
              </p>
              <p className="mt-3 text-[11px] leading-5 text-[var(--text-muted)]">
                {currentMonthExpenses.length} expenses in {formatMonth(today)}
              </p>
            </Card>

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
