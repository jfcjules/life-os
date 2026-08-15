import type { Expense, FinanceFrequency, FinancePeriod, Income } from "./types";

export type PeriodRange = {
  start: Date;
  end: Date;
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

export function formatMonth(date: Date) {
  return monthFormatter.format(date);
}

export function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
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
