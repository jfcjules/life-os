export type FinanceSpace = "Personal" | "Couple";

export type FinanceOwnershipFilter = "All" | FinanceSpace;

export type FinancePeriod = "Weekly" | "Biweekly" | "Monthly";

export type FinanceFrequency = "One-time" | "Weekly" | "Monthly" | "Yearly";

export type FinanceUser = {
  id: string;
  name: string;
};

export type FinanceTag = {
  id: string;
  label: string;
};

export type Expense = {
  id: string;
  name: string;
  amount: number;
  date: string;
  ownership: FinanceSpace;
  category?: string;
  assignedUserId?: string;
  dueDate?: string;
  frequency: FinanceFrequency;
  tagIds: string[];
};

export type Budget = {
  id: string;
  name: string;
  amount: number;
  period: FinancePeriod;
  ownership: FinanceSpace;
  category?: string;
  assignedUserId?: string;
  dueDate?: string;
  frequency: FinanceFrequency;
  tagIds: string[];
};

export type Income = {
  id: string;
  name: string;
  amount: number;
  date: string;
  category?: string;
  frequency?: FinanceFrequency;
  tagIds: string[];
};
