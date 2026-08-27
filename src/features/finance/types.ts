export type FinanceSpace = "Personal" | "Couple";

export type FinanceOwnershipFilter = "All" | FinanceSpace;

export type FinancePeriod = "Weekly" | "Bi-weekly" | "Monthly";

export type FinanceFrequency = "One-time" | "Weekly" | "Monthly" | "Yearly";

export type ExpenseSortOption =
  | "amount-highest"
  | "amount-lowest"
  | "date-newest"
  | "date-oldest";

export type ExpenseFilters = {
  category: string;
  goalId: string;
  tagId: string;
};

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
  budgetId?: string;
  budgetConceptId?: string;
  assignedUserId?: string;
  dueDate?: string;
  frequency: FinanceFrequency;
  goalId?: string;
  goalPlannedItemId?: string;
  tagIds: string[];
};

export type BudgetConcept = {
  id: string;
  name: string;
  amount: number;
};

export type Budget = {
  id: string;
  name: string;
  period: FinancePeriod;
  month: string;
  halfMonth?: "first-half" | "second-half";
  week?: "week-1" | "week-2" | "week-3" | "week-4" | "week-5";
  concepts: BudgetConcept[];
  createdAt: string;
};

export type GoalStatus = "Active" | "Completed";

export type GoalPlannedItem = {
  id: string;
  concept: string;
  estimatedAmount?: number;
};

export type GoalSaving = {
  id: string;
  concept?: string;
  amount: number;
  date: string;
  plannedItemId?: string;
};

export type Goal = {
  id: string;
  name: string;
  goalAmount?: number;
  targetDate?: string;
  status: GoalStatus;
  plannedItems: GoalPlannedItem[];
  savings: GoalSaving[];
  createdAt: string;
};

export type Income = {
  id: string;
  name: string;
  amount: number;
  date: string;
  category?: string;
  frequency?: FinanceFrequency;
  label?: string;
  tagIds: string[];
};
