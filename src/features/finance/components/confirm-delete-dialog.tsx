import { Button } from "@/components/design-system";

export function ConfirmDeleteDialog({
  expenseName,
  onCancel,
  onConfirm,
}: {
  expenseName: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[rgba(8,17,32,0.32)] px-4 py-6"
      role="presentation"
    >
      <div
        className="w-full max-w-[420px] rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface-content)] p-6 shadow-[0_28px_90px_rgba(8,17,32,0.24)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-expense-title"
      >
        <p className="text-[11px] leading-4 text-[var(--text-muted)]">
          Finance
        </p>
        <h2
          id="delete-expense-title"
          className="mt-2 text-[20px] font-medium leading-7 text-[var(--text-primary)]"
        >
          Remove expense?
        </h2>
        <p className="mt-4 text-[12px] leading-5 text-[var(--text-muted)]">
          This will permanently remove {expenseName} from the monthly finance
          context.
        </p>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Remove</Button>
        </div>
      </div>
    </div>
  );
}
