import type { FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/design-system";

import type { GoalPlannedItem } from "../types";
import { createFinanceId } from "../utils";

const fieldClass =
  "min-h-11 w-full rounded-[14px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 text-[12px] text-[var(--text-primary)] outline-none transition focus:border-[var(--color-action-primary)]";

export function GoalPlannedItemForm({
  goalName,
  onAddPlannedItem,
  onCancel,
}: {
  goalName: string;
  onAddPlannedItem: (plannedItem: GoalPlannedItem) => void;
  onCancel: () => void;
}) {
  const [concept, setConcept] = useState("");
  const [estimatedAmount, setEstimatedAmount] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedAmount = estimatedAmount ? Number(estimatedAmount) : undefined;

    if (!concept.trim()) {
      setError("Planned item concept is required.");
      return;
    }

    if (
      parsedAmount !== undefined &&
      (!Number.isFinite(parsedAmount) || parsedAmount <= 0)
    ) {
      setError("Estimated amount must be greater than 0.");
      return;
    }

    onAddPlannedItem({
      id: createFinanceId("goal-plan"),
      concept: concept.trim(),
      estimatedAmount: parsedAmount,
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
        aria-labelledby="add-planned-item-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] leading-4 text-[var(--text-muted)]">
              {goalName}
            </p>
            <h2
              id="add-planned-item-title"
              className="mt-2 text-[20px] font-medium leading-7 text-[var(--text-primary)]"
            >
              Add planned item
            </h2>
          </div>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
            Concept
            <input
              className={fieldClass}
              value={concept}
              onChange={(event) => setConcept(event.target.value)}
              required
            />
          </label>

          <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
            Estimated amount
            <input
              type="number"
              min="0.01"
              step="0.01"
              className={fieldClass}
              value={estimatedAmount}
              onChange={(event) => setEstimatedAmount(event.target.value)}
            />
          </label>
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
          <Button type="submit">Add item</Button>
        </div>
      </form>
    </div>
  );
}
