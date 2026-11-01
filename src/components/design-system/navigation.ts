import type { NavigationItem } from "./types";

export const primaryNavigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Calendar", href: "/calendar" },
  { label: "Reminders", href: "/reminders" },
  {
    label: "Finance",
    href: "/finance/overview",
    subItems: [
      { label: "Overview", href: "/finance/overview" },
      { label: "Expenses", href: "/finance/expenses" },
      { label: "Income", href: "/finance/income" },
      { label: "Budget", href: "/finance/budget" },
      { label: "Goals", href: "/finance/goals" },
    ],
  },
  { label: "Groceries", href: "/groceries" },
  { label: "Chores", href: "/chores" },
  { label: "Settings", href: "/settings" },
];
