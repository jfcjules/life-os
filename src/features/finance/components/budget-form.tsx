import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import { Button } from "@/components/design-system";

import type { Budget, FinancePeriod } from "../types";
import {
  createBudgetWeekOptions,
  formatMonthInput,
} from "../utils";

const fieldClass =
  "min-h-11 w-full rounded-[14px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 text-[12px] text-[var(--text-primary)] outline-none transition focus:border-[var(--color-action-primary)]";

type BudgetPeriodSelection = FinancePeriod | "";

export function BudgetForm({
  today,
  onAddBudget,
  onCancel,
}: {
  today: Date;
  onAddBudget: (budget: Budget) => void;
  onCancel: () => void;
}) {
  const defaultMonth = useMemo(() => formatMonthInput(today), [today]);
  const [name, setName] = useState("");
  const [period, setPeriod] = useState<BudgetPeriodSelection>("");
  const [month, setMonth] = useState(defaultMonth);
  const [halfMonth, setHalfMonth] =
    useState<NonNullable<Budget["halfMonth"]>>("first-half");
  const [week, setWeek] = useState<NonNullable<Budget["week"]>>("week-1");
  const [error, setError] = useState("");

  const weekOptions = useMemo(() => createBudgetWeekOptions(month), [month]);
  const selectedWeek =
    weekOptions.some((option) => option.value === week) || weekOptions.length === 0
      ? week
      : weekOptions[0].value;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !period || !month) {
      setError("Budget name, period, and month are required.");
      return;
    }

    onAddBudget({
      id: `budget-${Date.now()}`,
      name: name.trim(),
      period,
      month,
      halfMonth: period === "Bi-weekly" ? halfMonth : undefined,
      week: period === "Weekly" ? selectedWeek : undefined,
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
        aria-labelledby="add-budget-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] leading-4 text-[var(--text-muted)]">
              Finance
            </p>
            <h2
              id="add-budget-title"
              className="mt-2 text-[20px] font-medium leading-7 text-[var(--text-primary)]"
            >
              Add budget
            </h2>
          </div>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
            Budget name
            <input
              className={fieldClass}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

          <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
            Budget period
            <select
              className={fieldClass}
              value={period}
              onChange={(event) =>
                setPeriod(event.target.value as BudgetPeriodSelection)
              }
              required
            >
              <option value="">Select period</option>
              <option value="Monthly">Monthly</option>
              <option value="Bi-weekly">Bi-weekly</option>
              <option value="Weekly">Weekly</option>
            </select>
          </label>

          {period ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
                Month
                <input
                  type="month"
                  className={fieldClass}
                  value={month}
                  onChange={(event) => setMonth(event.target.value)}
                  required
                />
              </label>

              {period === "Bi-weekly" ? (
                <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
                  Half month
                  <select
                    className={fieldClass}
                    value={halfMonth}
                    onChange={(event) =>
                      setHalfMonth(
                        event.target.value as NonNullable<Budget["halfMonth"]>,
                      )
                    }
                    required
                  >
                    <option value="first-half">1-15</option>
                    <option value="second-half">16-end</option>
                  </select>
                </label>
              ) : null}

              {period === "Weekly" ? (
                <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
                  Week
                  <select
                    className={fieldClass}
                    value={selectedWeek}
                    onChange={(event) =>
                      setWeek(event.target.value as NonNullable<Budget["week"]>)
                    }
                    required
                  >
                    {weekOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
            </div>
          ) : null}
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
          <Button type="submit">Create budget</Button>
        </div>
      </form>
    </div>
  );
}
