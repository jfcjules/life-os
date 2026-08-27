import type {
  Budget,
  BudgetConcept,
  Expense,
  ExpenseSortOption,
  FinanceFrequency,
  FinancePeriod,
  Goal,
  GoalPlannedItem,
  GoalSaving,
  Income,
} from "./types";

export type PeriodRange = {
  start: Date;
  end: Date;
};

export type FinancePeriodOption = {
  id: string;
  label: string;
  anchorDate: Date;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

export function formatCurrency(amount: number) {
  return currencyFormatter.format(amount);
}

export function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`));
}

export function formatShortDate(date: string) {
  return shortDateFormatter.format(new Date(`${date}T00:00:00`));
}

export function formatMonth(date: Date) {
  return monthFormatter.format(date);
}

export function formatDateRange(range: PeriodRange) {
  return `${dateFormatter.format(range.start)} - ${dateFormatter.format(
    range.end,
  )}`;
}

export function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function createFinanceId(prefix: string) {
  const randomValue =
    globalThis.crypto?.randomUUID?.() ??
    Math.random().toString(36).slice(2, 12);

  return `${prefix}-${randomValue}`;
}

export function formatMonthInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

export function formatBudgetPeriod(budget: Budget) {
  const month = formatBudgetMonth(budget.month);

  if (budget.period === "Monthly") {
    return month;
  }

  if (budget.period === "Bi-weekly") {
    return `${month}, ${
      budget.halfMonth === "second-half" ? "16-end" : "1-15"
    }`;
  }

  const weekOption = createBudgetWeekOptions(budget.month).find(
    (option) => option.value === budget.week,
  );

  return `${month}, ${weekOption?.shortLabel ?? "Week 1"}`;
}

export function getBudgetRange(budget: Budget): PeriodRange | null {
  const [year, month] = budget.month.split("-").map(Number);

  if (!year || !month) {
    return null;
  }

  if (budget.period === "Monthly") {
    return {
      start: new Date(year, month - 1, 1),
      end: new Date(year, month, 0),
    };
  }

  if (budget.period === "Bi-weekly") {
    const startsOnSecondHalf = budget.halfMonth === "second-half";

    return {
      start: new Date(year, month - 1, startsOnSecondHalf ? 16 : 1),
      end: startsOnSecondHalf
        ? new Date(year, month, 0)
        : new Date(year, month - 1, 15),
    };
  }

  const weekNumber = Number(budget.week?.replace("week-", "") ?? 1);
  const lastDay = new Date(year, month, 0).getDate();
  const startDay = Math.min(Math.max((weekNumber - 1) * 7 + 1, 1), lastDay);
  const endDay = Math.min(startDay + 6, lastDay);

  return {
    start: new Date(year, month - 1, startDay),
    end: new Date(year, month - 1, endDay),
  };
}

export function findBudgetForDate(budgets: Budget[], date: string) {
  return (
    budgets.find((budget) => {
      const range = getBudgetRange(budget);

      return range ? isWithinPeriod(date, range) : false;
    }) ?? null
  );
}

export function getBudgetConcepts(budget: Budget) {
  return Array.isArray(budget.concepts) ? budget.concepts : [];
}

export function getGoalPlannedItems(goal: Goal) {
  return Array.isArray(goal.plannedItems) ? goal.plannedItems : [];
}

export function getGoalSavings(goal: Goal) {
  return Array.isArray(goal.savings) ? goal.savings : [];
}

export function sumBudgetConcepts(concepts: BudgetConcept[]) {
  return concepts.reduce((total, concept) => total + concept.amount, 0);
}

export function calculateBudgetPlannedAmount(budget: Budget) {
  return sumBudgetConcepts(getBudgetConcepts(budget));
}

export function sumBudgetPlannedAmounts(budgets: Budget[]) {
  return budgets.reduce(
    (total, budget) => total + calculateBudgetPlannedAmount(budget),
    0,
  );
}

export function isExpenseWithinBudgetPeriod(expense: Expense, budget: Budget) {
  const range = getBudgetRange(budget);

  return range ? isWithinPeriod(expense.date, range) : false;
}

export function sumBudgetConceptSpent(
  expenses: Expense[],
  budget: Budget,
  conceptId: string,
) {
  return expenses.reduce((total, expense) => {
    const isLinkedToConcept =
      expense.budgetId === budget.id && expense.budgetConceptId === conceptId;

    return isLinkedToConcept && isExpenseWithinBudgetPeriod(expense, budget)
      ? total + expense.amount
      : total;
  }, 0);
}

export function sumBudgetSpentAmount(expenses: Expense[], budget: Budget) {
  const conceptIds = new Set(
    getBudgetConcepts(budget).map((concept) => concept.id),
  );

  return expenses.reduce((total, expense) => {
    const isLinkedToBudgetConcept =
      expense.budgetId === budget.id &&
      expense.budgetConceptId &&
      conceptIds.has(expense.budgetConceptId);

    return isLinkedToBudgetConcept && isExpenseWithinBudgetPeriod(expense, budget)
      ? total + expense.amount
      : total;
  }, 0);
}

export function sumBudgetsSpentAmount(expenses: Expense[], budgets: Budget[]) {
  return budgets.reduce(
    (total, budget) => total + sumBudgetSpentAmount(expenses, budget),
    0,
  );
}

export function calculateProgressPercent(spentAmount: number, plannedAmount: number) {
  if (plannedAmount <= 0) {
    return 0;
  }

  return Math.min((spentAmount / plannedAmount) * 100, 100);
}

export function sumGoalSavings(savings: GoalSaving[]) {
  return savings.reduce((total, saving) => total + saving.amount, 0);
}

export function getGoalPlannedItemSavings(
  savings: GoalSaving[],
  plannedItemId: string,
) {
  return savings.filter((saving) => saving.plannedItemId === plannedItemId);
}

export function sumGoalPlannedAmount(plannedItems: GoalPlannedItem[]) {
  return plannedItems.reduce(
    (total, item) => total + (item.estimatedAmount ?? 0),
    0,
  );
}

export function getGoalLinkedExpenses(expenses: Expense[], goal: Goal) {
  return expenses.filter((expense) => expense.goalId === goal.id);
}

export function sumGoalSpentAmount(expenses: Expense[], goal: Goal) {
  return getGoalLinkedExpenses(expenses, goal).reduce(
    (total, expense) => total + expense.amount,
    0,
  );
}

export function calculateGoalSummary(goal: Goal, expenses: Expense[]) {
  const savings = getGoalSavings(goal);
  const plannedItems = getGoalPlannedItems(goal);
  const savedAmount = sumGoalSavings(savings);
  const spentAmount = sumGoalSpentAmount(expenses, goal);
  const availableAmount = savedAmount - spentAmount;
  const remainingAmount =
    goal.goalAmount === undefined ? undefined : goal.goalAmount - savedAmount;
  const progressPercent =
    goal.goalAmount === undefined
      ? undefined
      : calculateProgressPercent(savedAmount, goal.goalAmount);
  const estimatedPlannedTotal = sumGoalPlannedAmount(plannedItems);

  return {
    availableAmount,
    estimatedPlannedTotal,
    progressPercent,
    remainingAmount,
    savedAmount,
    spentAmount,
  };
}

export function getProgressStatus(spentAmount: number, plannedAmount: number) {
  if (spentAmount > plannedAmount) {
    return "Over budget";
  }

  if (spentAmount === plannedAmount && plannedAmount > 0) {
    return "Complete";
  }

  return "On track";
}

export function createBudgetWeekOptions(monthInput: string) {
  const [year, month] = monthInput.split("-").map(Number);

  if (!year || !month) {
    return [];
  }

  const lastDay = new Date(year, month, 0).getDate();

  return Array.from({ length: Math.ceil(lastDay / 7) }, (_, index) => {
    const startDay = index * 7 + 1;
    const endDay = Math.min(startDay + 6, lastDay);
    const value = `week-${index + 1}` as Budget["week"];
    const shortLabel = `Week ${index + 1}`;

    return {
      value,
      label: `${shortLabel} (${startDay}-${endDay})`,
      shortLabel,
    };
  });
}

export function getPeriodRange(
  period: FinancePeriod,
  anchorDate: Date,
): PeriodRange {
  if (period === "Monthly") {
    return {
      start: new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1),
      end: new Date(anchorDate.getFullYear(), anchorDate.getMonth() + 1, 0),
    };
  }

  const start = getWeekStart(anchorDate);
  const end = new Date(start);
  end.setDate(start.getDate() + (period === "Weekly" ? 6 : 13));

  return { start, end };
}

export function getAvailableExpensePeriodOptions(
  expenses: Expense[],
  period: FinancePeriod,
): FinancePeriodOption[] {
  const periodOptions = new Map<string, FinancePeriodOption>();

  for (const expense of expenses) {
    const range = getPeriodRange(period, new Date(`${expense.date}T00:00:00`));
    const id = `${formatDateInput(range.start)}:${formatDateInput(range.end)}`;

    if (!periodOptions.has(id)) {
      periodOptions.set(id, {
        id,
        label: formatDateRange(range),
        anchorDate: range.start,
      });
    }
  }

  return Array.from(periodOptions.values())
    .sort(
      (first, second) =>
        second.anchorDate.getTime() - first.anchorDate.getTime(),
    );
}

export function movePeriod(
  period: FinancePeriod,
  anchorDate: Date,
  direction: -1 | 1,
) {
  const nextDate = new Date(anchorDate);

  if (period === "Monthly") {
    nextDate.setMonth(anchorDate.getMonth() + direction);
    return nextDate;
  }

  nextDate.setDate(
    anchorDate.getDate() + (period === "Weekly" ? 7 : 14) * direction,
  );
  return nextDate;
}

export function isWithinPeriod(date: string, range: PeriodRange) {
  const value = new Date(`${date}T00:00:00`);
  const start = startOfDay(range.start);
  const end = startOfDay(range.end);

  return value >= start && value <= end;
}

export function isSameMonth(date: string, anchorDate: Date) {
  const value = new Date(`${date}T00:00:00`);

  return (
    value.getFullYear() === anchorDate.getFullYear() &&
    value.getMonth() === anchorDate.getMonth()
  );
}

export function sortByDateDesc<T extends { date: string }>(items: T[]) {
  return [...items].sort(
    (first, second) =>
      new Date(`${second.date}T00:00:00`).getTime() -
      new Date(`${first.date}T00:00:00`).getTime(),
  );
}

export function sortExpenses(
  expenses: Expense[],
  sortOption: ExpenseSortOption,
) {
  return [...expenses].sort((first, second) => {
    if (sortOption === "amount-highest") {
      return second.amount - first.amount;
    }

    if (sortOption === "amount-lowest") {
      return first.amount - second.amount;
    }

    const firstDate = new Date(`${first.date}T00:00:00`).getTime();
    const secondDate = new Date(`${second.date}T00:00:00`).getTime();

    if (sortOption === "date-oldest") {
      return firstDate - secondDate;
    }

    return secondDate - firstDate;
  });
}

export function sumExpenses(expenses: Expense[]) {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export function sumIncome(income: Income[]) {
  return income.reduce((total, incomeItem) => total + incomeItem.amount, 0);
}

export function calculateNetSavings(incomeTotal: number, expenseTotal: number) {
  return incomeTotal - expenseTotal;
}

export function getNextOccurrence(
  dueDate: string | undefined,
  frequency: FinanceFrequency,
) {
  if (!dueDate || frequency === "One-time") {
    return undefined;
  }

  const nextDate = new Date(`${dueDate}T00:00:00`);

  if (frequency === "Weekly") {
    nextDate.setDate(nextDate.getDate() + 7);
  }

  if (frequency === "Monthly") {
    nextDate.setMonth(nextDate.getMonth() + 1);
  }

  if (frequency === "Yearly") {
    nextDate.setFullYear(nextDate.getFullYear() + 1);
  }

  return formatDateInput(nextDate);
}

function getWeekStart(date: Date) {
  const start = startOfDay(date);
  const day = start.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;

  start.setDate(start.getDate() + mondayOffset);
  return start;
}

function startOfDay(date: Date) {
  const nextDate = new Date(date);
  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
}

function formatBudgetMonth(monthInput: string) {
  const [year, month] = monthInput.split("-").map(Number);

  if (!year || !month) {
    return monthInput;
  }

  return monthFormatter.format(new Date(year, month - 1, 1));
}
