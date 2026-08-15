import type { Budget, Expense, FinanceTag, Income } from "./types";

const financeStorageKeys = {
  expenses: "life-os.finance.expenses",
  budgets: "life-os.finance.budgets",
  income: "life-os.finance.income",
  tags: "life-os.finance.tags",
};

export function readStoredExpenses(fallback: Expense[]) {
  return readStoredArray<Expense>(financeStorageKeys.expenses, fallback);
}

export function saveStoredExpenses(expenses: Expense[]) {
  saveStoredArray(financeStorageKeys.expenses, expenses);
}

export function readStoredBudgets(fallback: Budget[]) {
  return readStoredArray<Budget>(financeStorageKeys.budgets, fallback);
}

export function saveStoredBudgets(budgets: Budget[]) {
  saveStoredArray(financeStorageKeys.budgets, budgets);
}

export function readStoredIncome(fallback: Income[]) {
  return readStoredArray<Income>(financeStorageKeys.income, fallback);
}

export function saveStoredIncome(income: Income[]) {
  saveStoredArray(financeStorageKeys.income, income);
}

export function readStoredTags(fallback: FinanceTag[]) {
  return readStoredArray<FinanceTag>(financeStorageKeys.tags, fallback);
}

export function saveStoredTags(tags: FinanceTag[]) {
  saveStoredArray(financeStorageKeys.tags, tags);
}

function readStoredArray<T>(key: string, fallback: T[]) {
  try {
    const value = window.localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    const parsedValue: unknown = JSON.parse(value);

    if (!Array.isArray(parsedValue)) {
      window.localStorage.removeItem(key);
      return fallback;
    }

    return parsedValue as T[];
  } catch {
    window.localStorage.removeItem(key);
    return fallback;
  }
}

function saveStoredArray<T>(key: string, value: T[]) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
