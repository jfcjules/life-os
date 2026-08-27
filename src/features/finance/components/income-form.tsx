import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import { Button } from "@/components/design-system";

import type { Income } from "../types";
import { createFinanceId, formatDateInput } from "../utils";

const fieldClass =
  "min-h-11 w-full rounded-[var(--radius-action)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 text-[12px] text-[var(--text-primary)] outline-none transition focus:border-[var(--color-action-primary)]";

// const frequencyOptions: FinanceFrequency[] = [
//   "One-time",
//   "Weekly",
//   "Monthly",
//   "Yearly",
// ];

export function IncomeForm({
  income,
  today,
  onCancel,
  onSaveIncome,
}: {
  income?: Income;
  today: Date;
  onCancel: () => void;
  onSaveIncome: (income: Income) => void;
}) {
  const defaultDate = useMemo(() => formatDateInput(today), [today]);
  const [name, setName] = useState(income?.name ?? "");
  const [amount, setAmount] = useState(
    income ? String(income.amount) : "",
  );
  const [date, setDate] = useState(income?.date ?? defaultDate);
  // const [category, setCategory] = useState(income?.category ?? "");
  const [label, setLabel] = useState(income?.label ?? "");
  // const [frequency, setFrequency] = useState<FinanceFrequency | "">(
  //   income?.frequency ?? "",
  // );
  const [error, setError] = useState("");
  const isEditing = Boolean(income);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedAmount = Number(amount);

    if (!name.trim() || !date || !amount) {
      setError("Income name, amount, and date are required.");
      return;
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    onSaveIncome({
      id: income?.id ?? createFinanceId("income"),
      name: name.trim(),
      amount: parsedAmount,
      date,
      // category: category.trim() || undefined,
      category: income?.category,
      // frequency: frequency || undefined,
      frequency: income?.frequency,
      label: label.trim() || undefined,
      tagIds: income?.tagIds ?? [],
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
        aria-labelledby="income-form-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] leading-4 text-[var(--text-muted)]">
              Finance
            </p>
            <h2
              id="income-form-title"
              className="mt-2 text-[20px] font-medium leading-7 text-[var(--text-primary)]"
            >
              {isEditing ? "Edit income" : "Add income"}
            </h2>
          </div>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
            Income name
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/*
            <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
              Category
              <input
                className={fieldClass}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
            </label>
            */}

            <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
              Label
              <input
                className={fieldClass}
                value={label}
                onChange={(event) => setLabel(event.target.value)}
              />
            </label>
          </div>

          {/*
          <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
            Frequency
            <select
              className={fieldClass}
              value={frequency}
              onChange={(event) =>
                setFrequency(event.target.value as FinanceFrequency | "")
              }
            >
              <option value="">No frequency</option>
              {frequencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          */}
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
          <Button type="submit">
            {isEditing ? "Save income" : "Add income"}
          </Button>
        </div>
      </form>
    </div>
  );
}
