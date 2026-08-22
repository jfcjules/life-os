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
  createSeedGoals,
  createSeedIncome,
} from "../data";
import {
  calculateBudgetPlannedAmount,
  calculateGoalSummary,
  formatCurrency,
  formatDateRange,
  getBudgetConcepts,
  getGoalPlannedItems,
  getPeriodRange,
  isWithinPeriod,
  movePeriod,
  sortByDateDesc,
  sumBudgetSpentAmount,
  sumBudgetsSpentAmount,
  sumBudgetPlannedAmounts,
  sumExpenses,
  sumIncome,
} from "../utils";
import {
  readStoredBudgets,
  readStoredExpenses,
  readStoredGoals,
  readStoredIncome,
  saveStoredBudgets,
  saveStoredExpenses,
  saveStoredGoals,
  saveStoredIncome,
} from "../storage";
import type {
  Budget,
  BudgetConcept,
  Expense,
  FinancePeriod,
  Goal,
  GoalPlannedItem,
  GoalSaving,
  Income,
} from "../types";
import { BudgetDetail } from "./budget-detail";
import { BudgetForm } from "./budget-form";
import { BudgetList } from "./budget-list";
import { ConceptForm } from "./concept-form";
import { ConfirmDeleteDialog } from "./confirm-delete-dialog";
import { ExpenseDetail } from "./expense-detail";
import { ExpenseForm } from "./expense-form";
import { ExpenseHistory } from "./expense-history";
import { GoalDetail } from "./goal-detail";
import { GoalForm } from "./goal-form";
import { GoalList } from "./goal-list";
import { GoalPlannedItemForm } from "./goal-planned-item-form";
import { GoalSavingForm } from "./goal-saving-form";
import { IncomeDetail } from "./income-detail";
import { IncomeForm } from "./income-form";
import { IncomeHistory } from "./income-history";

export type FinanceSection = "Expenses" | "Income" | "Budget" | "Goals";

export function FinanceWorkspace({
  activeSection = "Expenses",
}: {
  activeSection?: FinanceSection;
}) {
  const today = useMemo(() => new Date(), []);
  const seedExpenses = useMemo(() => createSeedExpenses(today), [today]);
  const seedIncome = useMemo(() => createSeedIncome(), []);
  const seedBudgets = useMemo(() => createSeedBudgets(), []);
  const seedGoals = useMemo(() => createSeedGoals(), []);
  const [expenses, setExpenses] = useState(seedExpenses);
  const [income, setIncome] = useState(seedIncome);
  const [budgets, setBudgets] = useState(seedBudgets);
  const [goals, setGoals] = useState(seedGoals);
  const [hasLoadedStoredExpenses, setHasLoadedStoredExpenses] = useState(false);
  const [hasLoadedStoredIncome, setHasLoadedStoredIncome] = useState(false);
  const [hasLoadedStoredBudgets, setHasLoadedStoredBudgets] = useState(false);
  const [hasLoadedStoredGoals, setHasLoadedStoredGoals] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isIncomeFormOpen, setIsIncomeFormOpen] = useState(false);
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [isAddConceptOpen, setIsAddConceptOpen] = useState(false);
  const [isAddPlannedItemOpen, setIsAddPlannedItemOpen] = useState(false);
  const [isAddSavingOpen, setIsAddSavingOpen] = useState(false);
  const [savingPlannedItemId, setSavingPlannedItemId] = useState<string | null>(
    null,
  );
  const [period, setPeriod] = useState<FinancePeriod>("Monthly");
  const [anchorDate, setAnchorDate] = useState(today);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null,
  );
  const [selectedIncomeId, setSelectedIncomeId] = useState<string | null>(null);
  const [editingIncomeId, setEditingIncomeId] = useState<string | null>(null);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [expensePendingDelete, setExpensePendingDelete] =
    useState<Expense | null>(null);
  const [incomePendingDelete, setIncomePendingDelete] =
    useState<Income | null>(null);

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
  const periodIncome = useMemo(() => {
    return sortByDateDesc(
      income.filter((incomeItem) => isWithinPeriod(incomeItem.date, periodRange)),
    );
  }, [income, periodRange]);
  const periodIncomeTotal = useMemo(
    () => sumIncome(periodIncome),
    [periodIncome],
  );

  const selectedExpense = useMemo(
    () =>
      periodExpenses.find((expense) => expense.id === selectedExpenseId) ??
      periodExpenses[0] ??
      null,
    [periodExpenses, selectedExpenseId],
  );
  const activeSelectedExpenseId = selectedExpense?.id ?? null;
  const selectedIncome = useMemo(
    () =>
      periodIncome.find((incomeItem) => incomeItem.id === selectedIncomeId) ??
      periodIncome[0] ??
      null,
    [periodIncome, selectedIncomeId],
  );
  const activeSelectedIncomeId = selectedIncome?.id ?? null;
  const editingIncome = useMemo(
    () => income.find((incomeItem) => incomeItem.id === editingIncomeId) ?? null,
    [editingIncomeId, income],
  );
  const selectedBudget = useMemo(
    () =>
      budgets.find((budget) => budget.id === selectedBudgetId) ??
      budgets[0] ??
      null,
    [budgets, selectedBudgetId],
  );
  const activeSelectedBudgetId = selectedBudget?.id ?? null;
  const selectedGoal = useMemo(
    () =>
      goals.find((goal) => goal.id === selectedGoalId) ??
      goals[0] ??
      null,
    [goals, selectedGoalId],
  );
  const activeSelectedGoalId = selectedGoal?.id ?? null;
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
  const totalGoalSavedAmount = useMemo(
    () =>
      goals.reduce(
        (total, goal) =>
          total + calculateGoalSummary(goal, expenses).savedAmount,
        0,
      ),
    [expenses, goals],
  );
  const totalGoalAvailableAmount = useMemo(
    () =>
      goals.reduce(
        (total, goal) =>
          total + calculateGoalSummary(goal, expenses).availableAmount,
        0,
      ),
    [expenses, goals],
  );
  const selectedGoalSummary = useMemo(
    () => (selectedGoal ? calculateGoalSummary(selectedGoal, expenses) : null),
    [expenses, selectedGoal],
  );
  const selectedSavingPlannedItem = useMemo(() => {
    if (!selectedGoal || !savingPlannedItemId) {
      return null;
    }

    return (
      getGoalPlannedItems(selectedGoal).find(
        (item) => item.id === savingPlannedItemId,
      ) ?? null
    );
  }, [savingPlannedItemId, selectedGoal]);

  useEffect(() => {
    const storedExpenses = readStoredExpenses(seedExpenses);

    window.queueMicrotask(() => {
      setExpenses(storedExpenses);
      setHasLoadedStoredExpenses(true);
    });
  }, [seedExpenses]);

  useEffect(() => {
    const storedIncome = readStoredIncome(seedIncome);

    window.queueMicrotask(() => {
      setIncome(storedIncome);
      setHasLoadedStoredIncome(true);
    });
  }, [seedIncome]);

  useEffect(() => {
    const storedBudgets = readStoredBudgets(seedBudgets);

    window.queueMicrotask(() => {
      setBudgets(storedBudgets);
      setHasLoadedStoredBudgets(true);
    });
  }, [seedBudgets]);

  useEffect(() => {
    const storedGoals = readStoredGoals(seedGoals);

    window.queueMicrotask(() => {
      setGoals(storedGoals);
      setHasLoadedStoredGoals(true);
    });
  }, [seedGoals]);

  useEffect(() => {
    if (!hasLoadedStoredExpenses) {
      return;
    }

    saveStoredExpenses(expenses);
  }, [expenses, hasLoadedStoredExpenses]);

  useEffect(() => {
    if (!hasLoadedStoredIncome) {
      return;
    }

    saveStoredIncome(income);
  }, [income, hasLoadedStoredIncome]);

  useEffect(() => {
    if (!hasLoadedStoredBudgets) {
      return;
    }

    saveStoredBudgets(budgets);
  }, [budgets, hasLoadedStoredBudgets]);

  useEffect(() => {
    if (!hasLoadedStoredGoals) {
      return;
    }

    saveStoredGoals(goals);
  }, [goals, hasLoadedStoredGoals]);

  function handleAddExpense(expense: Expense) {
    setExpenses((currentExpenses) =>
      sortByDateDesc([expense, ...currentExpenses]),
    );
    setSelectedExpenseId(expense.id);
    setAnchorDate(new Date(`${expense.date}T00:00:00`));
    setIsAddExpenseOpen(false);
  }

  function handleOpenAddIncome() {
    setEditingIncomeId(null);
    setIsIncomeFormOpen(true);
  }

  function handleEditIncome(incomeItem: Income) {
    setSelectedIncomeId(incomeItem.id);
    setEditingIncomeId(incomeItem.id);
    setIsIncomeFormOpen(true);
  }

  function handleSaveIncome(incomeItem: Income) {
    setIncome((currentIncome) => {
      const hasExistingIncome = currentIncome.some(
        (currentIncomeItem) => currentIncomeItem.id === incomeItem.id,
      );

      if (hasExistingIncome) {
        return sortByDateDesc(
          currentIncome.map((currentIncomeItem) =>
            currentIncomeItem.id === incomeItem.id
              ? incomeItem
              : currentIncomeItem,
          ),
        );
      }

      return sortByDateDesc([incomeItem, ...currentIncome]);
    });
    setSelectedIncomeId(incomeItem.id);
    setAnchorDate(new Date(`${incomeItem.date}T00:00:00`));
    setEditingIncomeId(null);
    setIsIncomeFormOpen(false);
  }

  function handleAddBudget(budget: Budget) {
    setBudgets((currentBudgets) => [budget, ...currentBudgets]);
    setSelectedBudgetId(budget.id);
    setIsAddBudgetOpen(false);
  }

  function handleAddGoal(goal: Goal) {
    setGoals((currentGoals) => [goal, ...currentGoals]);
    setSelectedGoalId(goal.id);
    setIsAddGoalOpen(false);
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

  function handleAddPlannedItem(plannedItem: GoalPlannedItem) {
    if (!selectedGoal) {
      return;
    }

    setGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === selectedGoal.id
          ? {
              ...goal,
              plannedItems: [...getGoalPlannedItems(goal), plannedItem],
            }
          : goal,
      ),
    );
    setIsAddPlannedItemOpen(false);
  }

  function handleAddSaving(saving: GoalSaving) {
    if (!selectedGoal) {
      return;
    }

    setGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === selectedGoal.id
          ? {
              ...goal,
              savings: [...goal.savings, saving],
            }
          : goal,
      ),
    );
    setIsAddSavingOpen(false);
    setSavingPlannedItemId(null);
  }

  function handleOpenGoalSaving(goalId: string, plannedItemId?: string) {
    setSelectedGoalId(goalId);
    setSavingPlannedItemId(plannedItemId ?? null);
    setIsAddSavingOpen(true);
  }

  function handleCompleteGoal() {
    if (!selectedGoal) {
      return;
    }

    setGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === selectedGoal.id ? { ...goal, status: "Completed" } : goal,
      ),
    );
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

  function handleConfirmDeleteIncome() {
    if (!incomePendingDelete) {
      return;
    }

    setIncome((currentIncome) =>
      currentIncome.filter(
        (incomeItem) => incomeItem.id !== incomePendingDelete.id,
      ),
    );
    setSelectedIncomeId((currentSelectedIncomeId) =>
      currentSelectedIncomeId === incomePendingDelete.id
        ? null
        : currentSelectedIncomeId,
    );
    setEditingIncomeId((currentEditingIncomeId) =>
      currentEditingIncomeId === incomePendingDelete.id
        ? null
        : currentEditingIncomeId,
    );
    setIncomePendingDelete(null);
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
    <AppShell activeItem="Finance" activeSubItem={activeSection}>
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
              Record money in and out, then keep budget planning in the same
              quiet Finance space.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 max-md:justify-start">
            {activeSection === "Expenses" ? (
              <Button onClick={() => setIsAddExpenseOpen(true)}>
                Add expense
              </Button>
            ) : null}
            {activeSection === "Income" ? (
              <Button onClick={handleOpenAddIncome}>Add income</Button>
            ) : null}
            {activeSection === "Budget" ? (
              <Button onClick={() => setIsAddBudgetOpen(true)}>
                Add budget
              </Button>
            ) : null}
            {activeSection === "Goals" ? (
              <Button onClick={() => setIsAddGoalOpen(true)}>Add goal</Button>
            ) : null}
          </div>
        </header>

        {activeSection === "Expenses" ? (
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
        ) : null}

        {activeSection === "Income" ? (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
            <IncomeHistory
              income={periodIncome}
              period={period}
              rangeLabel={periodRangeLabel}
              total={periodIncomeTotal}
              selectedIncomeId={activeSelectedIncomeId}
              onAddIncome={handleOpenAddIncome}
              onChangePeriod={handleChangePeriod}
              onEditIncome={handleEditIncome}
              onMovePeriod={handleMovePeriod}
              onRemoveIncome={setIncomePendingDelete}
              onSelectIncome={setSelectedIncomeId}
            />

            <aside className="min-w-0 space-y-6">
              <Card>
                <p className="text-[12px] leading-5 text-[var(--text-muted)]">
                  Period income
                </p>
                <p className="mt-3 text-[32px] font-medium leading-10 text-[var(--text-primary)]">
                  {formatCurrency(periodIncomeTotal)}
                </p>
                <p className="mt-3 text-[11px] leading-5 text-[var(--text-muted)]">
                  {periodIncome.length} income entries in the selected period
                </p>
              </Card>

              <IncomeDetail
                income={selectedIncome}
                onEdit={() => {
                  if (selectedIncome) {
                    handleEditIncome(selectedIncome);
                  }
                }}
                onRemove={() => {
                  if (selectedIncome) {
                    setIncomePendingDelete(selectedIncome);
                  }
                }}
              />

              <Card>
                <p className="text-[12px] font-medium leading-5">
                  Quick action
                </p>
                <p className="mt-3 text-[11px] leading-5 text-[var(--text-muted)]">
                  Capture income when money arrives.
                </p>
                <div className="mt-5">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={handleOpenAddIncome}
                  >
                    Add income
                  </Button>
                </div>
              </Card>
            </aside>
          </div>
        ) : null}

        {activeSection === "Budget" ? (
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
        ) : null}

        {activeSection === "Goals" ? (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
            <GoalList
              expenses={expenses}
              goals={goals}
              selectedGoalId={activeSelectedGoalId}
              onAddSavingForPlannedItem={handleOpenGoalSaving}
              onAddGoal={() => setIsAddGoalOpen(true)}
              onSelectGoal={setSelectedGoalId}
            />

            <aside className="min-w-0 space-y-6">
              <GoalDetail
                expenses={expenses}
                goal={selectedGoal}
                onAddPlannedItem={() => setIsAddPlannedItemOpen(true)}
                onAddSaving={() => {
                  if (selectedGoal) {
                    handleOpenGoalSaving(selectedGoal.id);
                  }
                }}
                onCompleteGoal={handleCompleteGoal}
              />

              <Card>
                <p className="text-[12px] leading-5 text-[var(--text-muted)]">
                  Total saved for goals
                </p>
                <p className="mt-3 text-[32px] font-medium leading-10 text-[var(--text-primary)]">
                  {formatCurrency(totalGoalSavedAmount)}
                </p>
                <p className="mt-3 text-[11px] leading-5 text-[var(--text-muted)]">
                  {formatCurrency(totalGoalAvailableAmount)} available across{" "}
                  {goals.length} goals
                </p>
              </Card>

              <Card>
                <p className="text-[12px] leading-5 text-[var(--text-muted)]">
                  Selected goal
                </p>
                <p className="mt-3 text-[32px] font-medium leading-10 text-[var(--text-primary)]">
                  {selectedGoalSummary
                    ? formatCurrency(selectedGoalSummary.availableAmount)
                    : formatCurrency(0)}
                </p>
                <p className="mt-3 text-[11px] leading-5 text-[var(--text-muted)]">
                  {selectedGoal
                    ? `${formatCurrency(
                        selectedGoalSummary?.spentAmount ?? 0,
                      )} spent for ${selectedGoal.name}`
                    : "No goal selected"}
                </p>
              </Card>
            </aside>
          </div>
        ) : null}
      </div>

      {activeSection === "Expenses" && isAddExpenseOpen ? (
        <ExpenseForm
          budgets={budgets}
          goals={goals}
          today={today}
          onAddExpense={handleAddExpense}
          onCancel={() => setIsAddExpenseOpen(false)}
        />
      ) : null}

      {activeSection === "Income" && isIncomeFormOpen ? (
        <IncomeForm
          income={editingIncome ?? undefined}
          today={today}
          onCancel={() => {
            setIsIncomeFormOpen(false);
            setEditingIncomeId(null);
          }}
          onSaveIncome={handleSaveIncome}
        />
      ) : null}

      {activeSection === "Budget" && isAddBudgetOpen ? (
        <BudgetForm
          today={today}
          onAddBudget={handleAddBudget}
          onCancel={() => setIsAddBudgetOpen(false)}
        />
      ) : null}

      {activeSection === "Budget" && selectedBudget && isAddConceptOpen ? (
        <ConceptForm
          budgetName={selectedBudget.name}
          onAddConcept={handleAddConcept}
          onCancel={() => setIsAddConceptOpen(false)}
        />
      ) : null}

      {activeSection === "Goals" && isAddGoalOpen ? (
        <GoalForm
          onAddGoal={handleAddGoal}
          onCancel={() => setIsAddGoalOpen(false)}
        />
      ) : null}

      {activeSection === "Goals" && selectedGoal && isAddPlannedItemOpen ? (
        <GoalPlannedItemForm
          goalName={selectedGoal.name}
          onAddPlannedItem={handleAddPlannedItem}
          onCancel={() => setIsAddPlannedItemOpen(false)}
        />
      ) : null}

      {activeSection === "Goals" && selectedGoal && isAddSavingOpen ? (
        <GoalSavingForm
          goalName={selectedGoal.name}
          plannedItemId={savingPlannedItemId ?? undefined}
          plannedItemName={selectedSavingPlannedItem?.concept}
          today={today}
          onAddSaving={handleAddSaving}
          onCancel={() => {
            setIsAddSavingOpen(false);
            setSavingPlannedItemId(null);
          }}
        />
      ) : null}

      {expensePendingDelete ? (
        <ConfirmDeleteDialog
          itemName={expensePendingDelete.name}
          onCancel={() => setExpensePendingDelete(null)}
          onConfirm={handleConfirmDeleteExpense}
        />
      ) : null}

      {incomePendingDelete ? (
        <ConfirmDeleteDialog
          itemName={incomePendingDelete.name}
          itemType="income"
          onCancel={() => setIncomePendingDelete(null)}
          onConfirm={handleConfirmDeleteIncome}
        />
      ) : null}
    </AppShell>
  );
}
