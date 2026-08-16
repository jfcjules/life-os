import type { Budget, Expense, FinanceTag, FinanceUser, Income } from "./types";
import { formatDateInput } from "./utils";

export const seedFinanceUsers: FinanceUser[] = [
  {
    id: "you",
    name: "You",
  },
  {
    id: "alex",
    name: "Alex",
  },
];

export const seedFinanceTags: FinanceTag[] = [
  {
    id: "home",
    label: "Home",
  },
  {
    id: "food",
    label: "Food",
  },
  {
    id: "care",
    label: "Care",
  },
];

export function createSeedExpenses(today = new Date()): Expense[] {
  const groceryDate = new Date(today);
  groceryDate.setDate(Math.max(1, today.getDate() - 1));

  const careDate = new Date(today);
  careDate.setDate(Math.max(1, today.getDate() - 4));

  return [
    {
      id: "seed-groceries",
      name: "Grocery restock",
      amount: 84.3,
      date: formatDateInput(groceryDate),
      ownership: "Couple",
      category: "Groceries",
      frequency: "One-time",
      tagIds: ["food"],
    },
    {
      id: "seed-pet-care",
      name: "Pet care supplies",
      amount: 32.5,
      date: formatDateInput(careDate),
      ownership: "Personal",
      category: "Pets",
      frequency: "One-time",
      tagIds: ["care"],
    },
  ];
}

export function createSeedBudgets(): Budget[] {
  return [];
}

export function createSeedIncome(): Income[] {
  return [];
}
