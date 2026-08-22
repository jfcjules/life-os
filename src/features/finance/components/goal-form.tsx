import type { FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/design-system";

import type { Goal } from "../types";
import { createFinanceId } from "../utils";

const fieldClass =
  "min-h-11 w-full rounded-[14px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 text-[12px] text-[var(--text-primary)] outline-none transition focus:border-[var(--color-action-primary)]";

export function GoalForm({
  onAddGoal,
  onCancel,
}: {
  onAddGoal: (goal: Goal) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedAmount = goalAmount ? Number(goalAmount) : undefined;

    if (!name.trim()) {
      setError("Goal name is required.");
      return;
    }

    if (
      parsedAmount !== undefined &&
      (!Number.isFinite(parsedAmount) || parsedAmount <= 0)
    ) {
      setError("Goal amount must be greater than 0.");
      return;
    }

    onAddGoal({
      id: createFinanceId("goal"),
      name: name.trim(),
      goalAmount: parsedAmount,
      targetDate: targetDate || undefined,
      status: "Active",
      plannedItems: [],
      savings: [],
      createdAt: new Date().toISOString(),
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[rgba(8,17,32,0.32)] px-4 py-6"
      role="presentation"
    >
      <form
        onSubmit={handleSubmit}
        className="max-h-[calc(100vh-48px)] w-full max-w-[560px] overflow-y-auto rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface-content)] p-6 shadow-[0_28px_90px_rgba(8,17,32,0.24)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-goal-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] leading-4 text-[var(--text-muted)]">
              Finance
            </p>
            <h2
              id="add-goal-title"
              className="mt-2 text-[20px] font-medium leading-7 text-[var(--text-primary)]"
            >
              Add goal
            </h2>
          </div>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
            Goal name
            <input
              className={fieldClass}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
              Goal amount
              <input
                type="number"
                min="0.01"
                step="0.01"
                className={fieldClass}
                value={goalAmount}
                onChange={(event) => setGoalAmount(event.target.value)}
              />
            </label>

            <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
              Target date
              <input
                type="date"
                className={fieldClass}
                value={targetDate}
                onChange={(event) => setTargetDate(event.target.value)}
              />
            </label>
          </div>
        </div>

        {error ? (
          <p className="mt-4 rounded-[14px] bg-[rgba(214,155,168,0.22)] px-4 py-3 text-[12px] leading-5 text-[var(--text-primary)]">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Create goal</Button>
        </div>
      </form>
    </div>
  );
}
