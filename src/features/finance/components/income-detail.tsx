import type { ReactNode } from "react";

import type { Income } from "../types";
import { formatCurrency, formatDate } from "../utils";

export function IncomeDetail({ income }: { income: Income | null }) {
  if (!income) {
    return (
      <section className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 max-sm:p-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
          Detail
        </p>
        <p className="mt-3 text-[12px] leading-5 text-[var(--text-muted)]">
          Select income from the list to review its saved details.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="income-detail-title"
      className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)]"
    >
      <div className="grid gap-7 p-5 sm:grid-cols-[minmax(210px,0.7fr)_minmax(0,1.3fr)] sm:p-6">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Detail
          </p>
          <p className="mt-5 font-[family-name:var(--font-display)] text-[40px] leading-none tracking-[-0.035em] text-[var(--text-primary)] sm:text-[48px]">
            {formatCurrency(income.amount)}
          </p>
          <h2
            id="income-detail-title"
            className="mt-4 text-[18px] font-medium leading-7 text-[var(--text-primary)]"
          >
            {income.name}
          </h2>
        </div>

        <dl className="grid gap-x-6 gap-y-5 border-t border-[var(--border-subtle)] pt-5 sm:grid-cols-4 sm:border-t-0 sm:pt-0">
          <DetailItem icon={<CalendarIcon />} label="Date" value={formatDate(income.date)} />
          <DetailItem
            icon={<CategoryIcon />}
            label="Category"
            value={income.category ?? "Uncategorized"}
          />
          <DetailItem icon={<LabelIcon />} label="Label" value={income.label ?? "No label"} />
          <DetailItem
            icon={<ScheduleIcon />}
            label="Frequency"
            value={income.frequency ?? "No frequency"}
          />
        </dl>
      </div>
    </section>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 border-b border-[var(--border-subtle)] pb-4 last:border-b-0 sm:border-b-0 sm:pb-0">
      <dt className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
        <span className="text-[var(--color-semantic-income)]">{icon}</span>
        {label}
      </dt>
      <dd className="mt-2 truncate text-[11px] leading-5 text-[var(--text-primary)]" title={value}>
        {value}
      </dd>
    </div>
  );
}

function CalendarIcon() {
  return <DetailIcon path="M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />;
}

function CategoryIcon() {
  return <DetailIcon path="M12 3 4 7v10l8 4 8-4V7l-8-4Zm-8 4 8 4 8-4m-8 4v10" />;
}

function LabelIcon() {
  return <DetailIcon path="M20 13 13 20 4 11V4h7l9 9ZM8.5 8.5h.01" />;
}

function ScheduleIcon() {
  return <DetailIcon path="M12 8v4l3 2m5-2a8 8 0 1 1-2.34-5.66M20 4v4h-4" />;
}

function DetailIcon({ path }: { path: string }) {
  return (
    <svg
      aria-hidden="true"
      className="size-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      <path d={path} />
    </svg>
  );
}
