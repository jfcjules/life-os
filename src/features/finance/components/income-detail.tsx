import { Button, Card } from "@/components/design-system";

import type { Income } from "../types";
import { formatCurrency, formatDate } from "../utils";

export function IncomeDetail({
  income,
  onEdit,
  onRemove,
}: {
  income: Income | null;
  onEdit: () => void;
  onRemove: () => void;
}) {
  if (!income) {
    return (
      <Card>
        <p className="text-[12px] font-medium leading-5">Income detail</p>
        <p className="mt-3 text-[11px] leading-5 text-[var(--text-muted)]">
          Select income from history to view its saved details.
        </p>
      </Card>
    );
  }

  // const nextOccurrence = income.frequency
  //   ? getNextOccurrence(income.date, income.frequency)
  //   : undefined;

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12px] leading-5 text-[var(--text-muted)]">
            Income detail
          </p>
          <h2 className="mt-3 text-[18px] font-medium leading-7 text-[var(--text-primary)]">
            {income.name}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="min-h-9 px-3" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="ghost" className="min-h-9 px-3" onClick={onRemove}>
            Remove
          </Button>
        </div>
      </div>

      <p className="mt-2 text-[28px] font-medium leading-9 text-[var(--text-primary)]">
        {formatCurrency(income.amount)}
      </p>

      <dl className="mt-5 grid gap-3 text-[11px] leading-5">
        <DetailItem label="Date" value={formatDate(income.date)} />
        <DetailItem label="Label" value={income.label ?? "None"} />
        {/*
        <DetailItem label="Category" value={income.category ?? "None"} />
        */}
        {/*
        <DetailItem label="Frequency" value={income.frequency ?? "None"} />
        <DetailItem
          label="Next occurrence"
          value={nextOccurrence ? formatDate(nextOccurrence) : "None"}
        />
        */}
      </dl>
    </Card>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3 rounded-[14px] bg-[rgba(227,233,247,0.68)] px-4 py-3 max-sm:grid-cols-1">
      <dt className="text-[var(--text-muted)]">{label}</dt>
      <dd className="min-w-0 text-[var(--text-primary)]">{value}</dd>
    </div>
  );
}
