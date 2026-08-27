import type { FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/design-system";

import type { BudgetConcept } from "../types";
import { createFinanceId } from "../utils";

const fieldClass =
  "min-h-11 w-full rounded-[var(--radius-action)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 text-[12px] text-[var(--text-primary)] outline-none transition focus:border-[var(--color-action-primary)]";

export function ConceptForm({
  budgetName,
  onAddConcept,
  onCancel,
}: {
  budgetName: string;
  onAddConcept: (concept: BudgetConcept) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedAmount = Number(amount);

    if (!name.trim() || !amount) {
      setError("Concept name and amount are required.");
      return;
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    onAddConcept({
      id: createFinanceId("concept"),
      name: name.trim(),
      amount: parsedAmount,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[var(--overlay-scrim)] px-4 py-6"
      role="presentation"
    >
      <form
        onSubmit={handleSubmit}
        className="max-h-[calc(100vh-48px)] w-full max-w-[520px] overflow-y-auto rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-content)] p-6 shadow-[var(--shadow-dialog)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-concept-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] leading-4 text-[var(--text-muted)]">
              {budgetName}
            </p>
            <h2
              id="add-concept-title"
              className="mt-2 text-[20px] font-medium leading-7 text-[var(--text-primary)]"
            >
              Add concept
            </h2>
          </div>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
            Concept name
            <input
              className={fieldClass}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

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
          <Button type="submit">Save concept</Button>
        </div>
      </form>
    </div>
  );
}
