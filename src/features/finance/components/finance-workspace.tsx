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
  seedFinanceTags,
} from "../data";
import {
  calculateBudgetPlannedAmount,
  calculateGoalSummary,
  formatCurrency,
  formatDateRange,
  formatDateInput,
  getAvailableExpensePeriodOptions,
  getBudgetConcepts,
  getGoalPlannedItems,
  getPeriodRange,
  isWithinPeriod,
  movePeriod,
  sortByDateDesc,
  sortExpenses,
  calculateNetSavings,
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
  readStoredTags,
  saveStoredBudgets,
  saveStoredExpenses,
  saveStoredGoals,
  saveStoredIncome,
  saveStoredTags,
} from "../storage";
import type {
  Budget,
  BudgetConcept,
  Expense,
  ExpenseFilters,
  ExpenseSortOption,
  FinancePeriod,
  FinanceTag,
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
import { ExpenseControls, ExpenseHistory } from "./expense-history";
import { FinanceOverview } from "./finance-overview";
import { GoalDetail } from "./goal-detail";
import { GoalForm } from "./goal-form";
import { GoalList } from "./goal-list";
import { GoalPlannedItemForm } from "./goal-planned-item-form";
import { GoalSavingForm } from "./goal-saving-form";
import { IncomeDetail } from "./income-detail";
import { IncomeForm } from "./income-form";
import { IncomeHistory } from "./income-history";

export type FinanceSection =
  | "Overview"
  | "Expenses"
  | "Income"
  | "Budget"
  | "Goals";

const financeSectionMeta: Record<
  FinanceSection,
  {
    title: string;
    description: string;
  }
> = {
  Overview: {
    title: "Overview",
    description: "Money in, money out, and what stays.",
  },
  Expenses: {
    title: "Expenses",
    description: "Track spending for the selected period.",
  },
  Income: {
    title: "Income",
    description: "Log money as it comes in.",
  },
  Budget: {
    title: "Budget",
    description: "Plan spending before it happens.",
  },
  Goals: {
    title: "Goals",
    description: "Follow savings and planned purchases.",
  },
};

export function FinanceWorkspace({
  activeSection = "Overview",
}: {
  activeSection?: FinanceSection;
}) {
  const today = useMemo(() => new Date(), []);
  const seedExpenses = useMemo(() => createSeedExpenses(today), [today]);
  const seedIncome = useMemo(() => createSeedIncome(), []);
  const seedBudgets = useMemo(() => createSeedBudgets(), []);
  const seedGoals = useMemo(() => createSeedGoals(), []);
  const seedTags = useMemo(() => seedFinanceTags, []);
  const [expenses, setExpenses] = useState(seedExpenses);
  const [income, setIncome] = useState(seedIncome);
  const [budgets, setBudgets] = useState(seedBudgets);
  const [goals, setGoals] = useState(seedGoals);
  const [tags, setTags] = useState<FinanceTag[]>(seedTags);
  const [hasLoadedStoredExpenses, setHasLoadedStoredExpenses] = useState(false);
  const [hasLoadedStoredIncome, setHasLoadedStoredIncome] = useState(false);
  const [hasLoadedStoredBudgets, setHasLoadedStoredBudgets] = useState(false);
  const [hasLoadedStoredGoals, setHasLoadedStoredGoals] = useState(false);
  const [hasLoadedStoredTags, setHasLoadedStoredTags] = useState(false);
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
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [expenseFilters, setExpenseFilters] = useState<ExpenseFilters>({
    category: "all",
    goalId: "all",
    tagId: "all",
  });
  const [expenseSortOption, setExpenseSortOption] =
    useState<ExpenseSortOption>("date-newest");
  const [selectedIncomeId, setSelectedIncomeId] = useState<string | null>(null);
  const [editingIncomeId, setEditingIncomeId] = useState<string | null>(null);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [expensePendingDelete, setExpensePendingDelete] =
    useState<Expense | null>(null);
  const [incomePendingDelete, setIncomePendingDelete] =
    useState<Income | null>(null);

  const availableExpensePeriodOptions = useMemo(
    () => getAvailableExpensePeriodOptions(expenses, period),
    [expenses, period],
  );
  const currentExpensePeriodOptionId = useMemo(() => {
    const range = getPeriodRange(period, anchorDate);

    return `${formatDateInput(range.start)}:${formatDateInput(range.end)}`;
  }, [anchorDate, period]);
  const selectedExpensePeriodOption = useMemo(
    () =>
      availableExpensePeriodOptions.find(
        (option) => option.id === currentExpensePeriodOptionId,
      ) ??
      availableExpensePeriodOptions[0] ??
      null,
    [availableExpensePeriodOptions, currentExpensePeriodOptionId],
  );
  const effectiveAnchorDate =
    activeSection === "Expenses" && selectedExpensePeriodOption
      ? selectedExpensePeriodOption.anchorDate
      : anchorDate;
  const periodRange = useMemo(
    () => getPeriodRange(period, effectiveAnchorDate),
    [effectiveAnchorDate, period],
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

  const expenseCategoryOptions = useMemo(() => {
    return Array.from(
      new Set(
        periodExpenses
          .map((expense) => expense.category)
          .filter((category): category is string => Boolean(category)),
      ),
    ).sort((first, second) => first.localeCompare(second));
  }, [periodExpenses]);

  const visibleExpenses = useMemo(() => {
    const filteredExpenses = periodExpenses.filter((expense) => {
      const matchesCategory =
        expenseFilters.category === "all" ||
        expense.category === expenseFilters.category;
      const matchesGoal =
        expenseFilters.goalId === "all" ||
        expense.goalId === expenseFilters.goalId;
      const matchesTag =
        expenseFilters.tagId === "all" ||
        expense.tagIds.includes(expenseFilters.tagId);

      return matchesCategory && matchesGoal && matchesTag;
    });

    return sortExpenses(filteredExpenses, expenseSortOption);
  }, [expenseFilters, expenseSortOption, periodExpenses]);

  const periodTotal = useMemo(
    () => sumExpenses(periodExpenses),
    [periodExpenses],
  );
  const visibleExpenseTotal = useMemo(
    () => sumExpenses(visibleExpenses),
    [visibleExpenses],
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
  const periodNetSavings = useMemo(
    () => calculateNetSavings(periodIncomeTotal, periodTotal),
    [periodIncomeTotal, periodTotal],
  );

  const selectedExpense = useMemo(
    () =>
      visibleExpenses.find((expense) => expense.id === selectedExpenseId) ??
      visibleExpenses[0] ??
      null,
    [selectedExpenseId, visibleExpenses],
  );
  const activeSelectedExpenseId = selectedExpense?.id ?? null;
  const editingExpense = useMemo(
    () =>
      expenses.find((expense) => expense.id === editingExpenseId) ??
      null,
    [editingExpenseId, expenses],
  );
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
    const storedTags = readStoredTags(seedTags);

    window.queueMicrotask(() => {
      setTags(storedTags);
      setHasLoadedStoredTags(true);
    });
  }, [seedTags]);

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

  useEffect(() => {
    if (!hasLoadedStoredTags) {
      return;
    }

    saveStoredTags(tags);
  }, [hasLoadedStoredTags, tags]);

  function handleSaveExpense(expense: Expense) {
    setExpenses((currentExpenses) => {
      const hasExistingExpense = currentExpenses.some(
        (currentExpense) => currentExpense.id === expense.id,
      );

      if (hasExistingExpense) {
        return sortByDateDesc(
          currentExpenses.map((currentExpense) =>
            currentExpense.id === expense.id ? expense : currentExpense,
          ),
        );
      }

      return sortByDateDesc([expense, ...currentExpenses]);
    });
    setSelectedExpenseId(expense.id);
    setAnchorDate(new Date(`${expense.date}T00:00:00`));
    setEditingExpenseId(null);
    setIsAddExpenseOpen(false);
  }

  function handleOpenAddExpense() {
    setEditingExpenseId(null);
    setIsAddExpenseOpen(true);
  }

  function handleEditExpense(expense: Expense) {
    setSelectedExpenseId(expense.id);
    setEditingExpenseId(expense.id);
    setIsAddExpenseOpen(true);
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

  function handleChangeExpensePeriod(nextPeriod: FinancePeriod) {
    const [firstAvailablePeriodOption] = getAvailableExpensePeriodOptions(
      expenses,
      nextPeriod,
    );

    setPeriod(nextPeriod);

    if (firstAvailablePeriodOption) {
      setAnchorDate(firstAvailablePeriodOption.anchorDate);
    }
  }

  function handleChangeExpensePeriodOption(periodOptionId: string) {
    const periodOption = availableExpensePeriodOptions.find(
      (option) => option.id === periodOptionId,
    );

    if (periodOption) {
      setAnchorDate(periodOption.anchorDate);
    }
  }

  function handleMovePeriod(direction: -1 | 1) {
    setAnchorDate((currentAnchorDate) =>
      movePeriod(period, currentAnchorDate, direction),
    );
  }

  const sectionMeta = financeSectionMeta[activeSection];

  return (
    <AppShell activeItem="Finance" activeSubItem={activeSection}>
      <div className="flex min-h-full flex-col gap-6">
        <header className="flex items-start justify-between gap-6 max-md:flex-col">
          <div className="max-w-[700px]">
            <h1 className="text-[42px] font-medium leading-[1.05] text-[var(--text-primary)] sm:text-[52px]">
              {sectionMeta.title}
            </h1>
            <p className="mt-3 max-w-[420px] text-[13px] leading-6 text-[var(--text-muted)]">
              {sectionMeta.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 max-md:justify-start">
            {activeSection === "Expenses" ? (
              <Button onClick={handleOpenAddExpense}>
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

        {activeSection === "Overview" ? (
          <FinanceOverview
            expenses={periodExpenses}
            income={periodIncome}
            expenseTotal={periodTotal}
            incomeTotal={periodIncomeTotal}
            netSavings={periodNetSavings}
            period={period}
            rangeLabel={periodRangeLabel}
            onChangePeriod={handleChangePeriod}
            onMovePeriod={handleMovePeriod}
          />
        ) : null}

        {activeSection === "Expenses" ? (
          <div className="grid gap-6">
            <ExpenseControls
              categoryOptions={expenseCategoryOptions}
              filters={expenseFilters}
              goals={goals}
              period={period}
              periodOptions={availableExpensePeriodOptions}
              selectedPeriodOptionId={selectedExpensePeriodOption?.id ?? null}
              sortOption={expenseSortOption}
              tags={tags}
              onChangeFilters={setExpenseFilters}
              onChangePeriod={handleChangeExpensePeriod}
              onChangePeriodOption={handleChangeExpensePeriodOption}
              onChangeSort={setExpenseSortOption}
            />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_424px]">
              <ExpenseHistory
                expenses={visibleExpenses}
                filters={expenseFilters}
                goals={goals}
                tags={tags}
                unfilteredCount={periodExpenses.length}
                selectedExpenseId={activeSelectedExpenseId}
                onAddExpense={handleOpenAddExpense}
                onEditExpense={handleEditExpense}
                onRemoveExpense={setExpensePendingDelete}
                onSelectExpense={setSelectedExpenseId}
              />

              <aside className="min-w-0 space-y-6">
                <Card>
                  <p className="text-[12px] leading-5 text-[var(--text-muted)]">
                    Period spent
                  </p>
                  <p className="mt-3 text-[32px] font-medium leading-10 text-[var(--text-primary)]">
                    {formatCurrency(visibleExpenseTotal)}
                  </p>
                  <p className="mt-3 text-[11px] leading-5 text-[var(--text-muted)]">
                    {visibleExpenses.length} expenses in the selected period
                  </p>
                </Card>

                <ExpenseDetail expense={selectedExpense} tags={tags} />

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
                      onClick={handleOpenAddExpense}
                    >
                      Add expense
                    </Button>
                  </div>
                </Card>
              </aside>
            </div>
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
          expense={editingExpense ?? undefined}
          goals={goals}
          mode={editingExpense ? "edit" : "add"}
          today={today}
          onCancel={() => {
            setIsAddExpenseOpen(false);
            setEditingExpenseId(null);
          }}
          onSaveExpense={handleSaveExpense}
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
