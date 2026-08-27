import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import { Button } from "@/components/design-system";

import type { Budget, Expense, Goal } from "../types";
import {
  createFinanceId,
  findBudgetForDate,
  formatDateInput,
  getBudgetConcepts,
} from "../utils";

const fieldClass =
  "min-h-11 w-full rounded-[var(--radius-action)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 text-[12px] text-[var(--text-primary)] outline-none transition focus:border-[var(--color-action-primary)]";

export function ExpenseForm({
  budgets,
  goals,
  today,
  onAddExpense,
  onCancel,
}: {
  budgets: Budget[];
  goals: Goal[];
  today: Date;
  onAddExpense: (expense: Expense) => void;
  onCancel: () => void;
}) {
  const defaultDate = useMemo(() => formatDateInput(today), [today]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [category, setCategory] = useState("");
  const [selectedConceptId, setSelectedConceptId] = useState("");
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [selectedGoalPlannedItemId, setSelectedGoalPlannedItemId] =
    useState("");
  const [error, setError] = useState("");
  const activeBudget = useMemo(
    () => findBudgetForDate(budgets, date),
    [budgets, date],
  );
  const activeBudgetConcepts = useMemo(
    () => (activeBudget ? getBudgetConcepts(activeBudget) : []),
    [activeBudget],
  );
  const selectedConcept =
    activeBudgetConcepts.find((concept) => concept.id === selectedConceptId) ??
    null;
  const selectedGoal =
    goals.find((goal) => goal.id === selectedGoalId) ?? null;
  const selectedGoalPlannedItems = selectedGoal?.plannedItems ?? [];
  const selectedGoalPlannedItem =
    selectedGoalPlannedItems.find(
      (item) => item.id === selectedGoalPlannedItemId,
    ) ?? null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedAmount = Number(amount);

    if (!name.trim() || !date || !amount) {
      setError("Expense name, amount, and date are required.");
      return;
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    onAddExpense({
      id: createFinanceId("expense"),
      name: name.trim(),
      amount: parsedAmount,
      date,
      ownership: "Personal",
      category:
        activeBudgetConcepts.length > 0
          ? selectedConcept?.name
          : category.trim() || undefined,
      budgetId: selectedConcept && activeBudget ? activeBudget.id : undefined,
      budgetConceptId: selectedConcept?.id,
      frequency: "One-time",
      goalId: selectedGoal?.id,
      goalPlannedItemId: selectedGoalPlannedItem?.id,
      tagIds: [],
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[var(--overlay-scrim)] px-4 py-6"
      role="presentation"
    >
      <form
        onSubmit={handleSubmit}
        className="max-h-[calc(100vh-48px)] w-full max-w-[560px] overflow-y-auto rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-content)] p-6 shadow-[var(--shadow-dialog)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-expense-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] leading-4 text-[var(--text-muted)]">
              Finance
            </p>
            <h2
              id="add-expense-title"
              className="mt-2 text-[20px] font-medium leading-7 text-[var(--text-primary)]"
            >
              Add expense
            </h2>
          </div>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
            Expense name
            <input
              className={fieldClass}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
              Amount
              <input
                type="number"
                min="0.01"
                step="0.01"
                className={fieldClass}
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
              />
            </label>

            <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
              Date
              <input
                type="date"
                className={fieldClass}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </label>
          </div>

          {activeBudgetConcepts.length > 0 ? (
            <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
              Category
              <select
                className={fieldClass}
                value={selectedConcept?.id ?? ""}
                onChange={(event) => setSelectedConceptId(event.target.value)}
              >
                <option value="">No budget category</option>
                {activeBudgetConcepts.map((concept) => (
                  <option key={concept.id} value={concept.id}>
                    {concept.name}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
              Category
              <input
                className={fieldClass}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
            </label>
          )}

          <p className="rounded-[var(--radius-action)] bg-[var(--surface-content-muted)] px-4 py-3 text-[11px] leading-5 text-[var(--text-muted)]">
            {activeBudget
              ? activeBudgetConcepts.length > 0
                ? `Categories loaded from ${activeBudget.name}.`
                : `${activeBudget.name} has no concepts yet.`
              : "No active budget found for this expense date."}
          </p>

          <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
            Goal
            <select
              className={fieldClass}
              value={selectedGoal?.id ?? ""}
              onChange={(event) => {
                setSelectedGoalId(event.target.value);
                setSelectedGoalPlannedItemId("");
              }}
            >
              <option value="">No linked goal</option>
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.name}
                </option>
              ))}
            </select>
          </label>

          {selectedGoal ? (
            <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
              Planned item
              <select
                className={fieldClass}
                value={selectedGoalPlannedItem?.id ?? ""}
                onChange={(event) =>
                  setSelectedGoalPlannedItemId(event.target.value)
                }
              >
                <option value="">No planned item</option>
                {selectedGoalPlannedItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.concept}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>

        {error ? (
          <p className="mt-4 rounded-[var(--radius-action)] bg-[var(--accent-rose-muted)] px-4 py-3 text-[12px] leading-5 text-[var(--text-primary)]">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add expense</Button>
        </div>
      </form>
    </div>
  );
}
