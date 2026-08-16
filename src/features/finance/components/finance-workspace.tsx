"use client";

import { useEffect, useMemo, useState } from "react";

import {
  AppShell,
  Button,
  Card,
} from "@/components/design-system";

import {
  createSeedBudgets,
  createSeedExpenses,
} from "../data";
import {
  calculateBudgetPlannedAmount,
  formatCurrency,
  formatDateRange,
  getBudgetConcepts,
  getPeriodRange,
  isWithinPeriod,
  movePeriod,
  sortByDateDesc,
  sumBudgetSpentAmount,
  sumBudgetsSpentAmount,
  sumBudgetPlannedAmounts,
  sumExpenses,
} from "../utils";
import {
  readStoredBudgets,
  readStoredExpenses,
  saveStoredBudgets,
  saveStoredExpenses,
} from "../storage";
import type { Budget, BudgetConcept, Expense, FinancePeriod } from "../types";
import { BudgetDetail } from "./budget-detail";
import { BudgetForm } from "./budget-form";
import { BudgetList } from "./budget-list";
import { ConceptForm } from "./concept-form";
import { ConfirmDeleteDialog } from "./confirm-delete-dialog";
import { ExpenseDetail } from "./expense-detail";
import { ExpenseForm } from "./expense-form";
import { ExpenseHistory } from "./expense-history";
import {
  FinanceViewToggle,
  type FinanceView,
} from "./finance-view-toggle";

export function FinanceWorkspace() {
  const today = useMemo(() => new Date(), []);
  const seedExpenses = useMemo(() => createSeedExpenses(today), [today]);
  const seedBudgets = useMemo(() => createSeedBudgets(), []);
  const [expenses, setExpenses] = useState(seedExpenses);
  const [budgets, setBudgets] = useState(seedBudgets);
  const [activeFinanceView, setActiveFinanceView] =
    useState<FinanceView>("Expenses");
  const [hasLoadedStoredExpenses, setHasLoadedStoredExpenses] = useState(false);
  const [hasLoadedStoredBudgets, setHasLoadedStoredBudgets] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [isAddConceptOpen, setIsAddConceptOpen] = useState(false);
  const [period, setPeriod] = useState<FinancePeriod>("Monthly");
  const [anchorDate, setAnchorDate] = useState(today);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null,
  );
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);
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
  const selectedBudget = useMemo(
    () =>
      budgets.find((budget) => budget.id === selectedBudgetId) ??
      budgets[0] ??
      null,
    [budgets, selectedBudgetId],
  );
  const activeSelectedBudgetId = selectedBudget?.id ?? null;
  const totalPlannedAmount = useMemo(
    () => sumBudgetPlannedAmounts(budgets),
    [budgets],
  );
  const totalBudgetSpentAmount = useMemo(
    () => sumBudgetsSpentAmount(expenses, budgets),
    [budgets, expenses],
  );
  const selectedBudgetSpentAmount = useMemo(
    () => (selectedBudget ? sumBudgetSpentAmount(expenses, selectedBudget) : 0),
    [expenses, selectedBudget],
  );

  useEffect(() => {
    const storedExpenses = readStoredExpenses(seedExpenses);

    window.queueMicrotask(() => {
      setExpenses(storedExpenses);
      setHasLoadedStoredExpenses(true);
    });
  }, [seedExpenses]);

  useEffect(() => {
    const storedBudgets = readStoredBudgets(seedBudgets);

    window.queueMicrotask(() => {
      setBudgets(storedBudgets);
      setHasLoadedStoredBudgets(true);
    });
  }, [seedBudgets]);

  useEffect(() => {
    if (!hasLoadedStoredExpenses) {
      return;
    }

    saveStoredExpenses(expenses);
  }, [expenses, hasLoadedStoredExpenses]);

  useEffect(() => {
    if (!hasLoadedStoredBudgets) {
      return;
    }

    saveStoredBudgets(budgets);
  }, [budgets, hasLoadedStoredBudgets]);

  function handleAddExpense(expense: Expense) {
    setExpenses((currentExpenses) =>
      sortByDateDesc([expense, ...currentExpenses]),
    );
    setSelectedExpenseId(expense.id);
    setAnchorDate(new Date(`${expense.date}T00:00:00`));
    setIsAddExpenseOpen(false);
  }

  function handleAddBudget(budget: Budget) {
    setBudgets((currentBudgets) => [budget, ...currentBudgets]);
    setSelectedBudgetId(budget.id);
    setIsAddBudgetOpen(false);
  }

  function handleAddConcept(concept: BudgetConcept) {
    if (!selectedBudget) {
      return;
    }

    setBudgets((currentBudgets) =>
      currentBudgets.map((budget) =>
        budget.id === selectedBudget.id
          ? {
              ...budget,
              concepts: [...getBudgetConcepts(budget), concept],
            }
          : budget,
      ),
    );
    setIsAddConceptOpen(false);
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
              Record everyday spending and keep budget planning in the same
              quiet Finance space.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 max-md:justify-start">
            {activeFinanceView === "Expenses" ? (
              <Button onClick={() => setIsAddExpenseOpen(true)}>
                Add expense
              </Button>
            ) : (
              <Button onClick={() => setIsAddBudgetOpen(true)}>
                Add budget
              </Button>
            )}
          </div>
        </header>

        <FinanceViewToggle
          activeView={activeFinanceView}
          onSelectView={setActiveFinanceView}
        />

        {activeFinanceView === "Expenses" ? (
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
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
            <BudgetList
              budgets={budgets}
              selectedBudgetId={activeSelectedBudgetId}
              onAddBudget={() => setIsAddBudgetOpen(true)}
              onSelectBudget={setSelectedBudgetId}
            />

            <aside className="min-w-0 space-y-6">
              <BudgetDetail
                budget={selectedBudget}
                expenses={expenses}
                onAddConcept={() => setIsAddConceptOpen(true)}
              />

              <Card>
                <p className="text-[12px] leading-5 text-[var(--text-muted)]">
                  Total budget spent
                </p>
                <p className="mt-3 text-[32px] font-medium leading-10 text-[var(--text-primary)]">
                  {formatCurrency(totalBudgetSpentAmount)}
                </p>
                <p className="mt-3 text-[11px] leading-5 text-[var(--text-muted)]">
                  {formatCurrency(totalPlannedAmount)} planned across{" "}
                  {budgets.length} budgets
                </p>
              </Card>

              <Card>
                <p className="text-[12px] leading-5 text-[var(--text-muted)]">
                  Selected budget
                </p>
                <p className="mt-3 text-[32px] font-medium leading-10 text-[var(--text-primary)]">
                  {formatCurrency(selectedBudgetSpentAmount)}
                </p>
                <p className="mt-3 text-[11px] leading-5 text-[var(--text-muted)]">
                  {selectedBudget
                    ? `${formatCurrency(
                        calculateBudgetPlannedAmount(selectedBudget),
                      )} planned across ${
                        getBudgetConcepts(selectedBudget).length
                      } concepts`
                    : "No budget selected"}
                </p>
              </Card>
            </aside>
          </div>
        )}
      </div>

      {activeFinanceView === "Expenses" && isAddExpenseOpen ? (
        <ExpenseForm
          budgets={budgets}
          today={today}
          onAddExpense={handleAddExpense}
          onCancel={() => setIsAddExpenseOpen(false)}
        />
      ) : null}

      {activeFinanceView === "Budget" && isAddBudgetOpen ? (
        <BudgetForm
          today={today}
          onAddBudget={handleAddBudget}
          onCancel={() => setIsAddBudgetOpen(false)}
        />
      ) : null}

      {activeFinanceView === "Budget" && selectedBudget && isAddConceptOpen ? (
        <ConceptForm
          budgetName={selectedBudget.name}
          onAddConcept={handleAddConcept}
          onCancel={() => setIsAddConceptOpen(false)}
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
