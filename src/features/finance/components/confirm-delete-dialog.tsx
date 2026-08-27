import { Button } from "@/components/design-system";

export function ConfirmDeleteDialog({
  itemName,
  itemType = "expense",
  onCancel,
  onConfirm,
}: {
  itemName: string;
  itemType?: "expense" | "income";
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const title = itemType === "income" ? "Remove income?" : "Remove expense?";

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[var(--overlay-scrim)] px-4 py-6"
      role="presentation"
    >
      <div
        className="w-full max-w-[420px] rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-content)] p-6 shadow-[var(--shadow-dialog)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-finance-item-title"
      >
        <p className="text-[11px] leading-4 text-[var(--text-muted)]">
          Finance
        </p>
        <h2
          id="delete-finance-item-title"
          className="mt-2 text-[20px] font-medium leading-7 text-[var(--text-primary)]"
        >
          {title}
        </h2>
        <p className="mt-4 text-[12px] leading-5 text-[var(--text-muted)]">
          This will permanently remove {itemName} from the selected finance
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
