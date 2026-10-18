"use client";

type ExpenseView = "Summary" | "Details";

export function ExpenseSectionNavigation({
  activeView,
  onChange,
}: {
  activeView: ExpenseView;
  onChange: (view: ExpenseView) => void;
}) {
  return (
    <div
      aria-label="Expenses view"
      className="inline-flex h-10 rounded-[var(--radius-action)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-1"
      role="tablist"
    >
      {(["Summary", "Details"] as const).map((view) => {
        const isActive = activeView === view;

        return (
          <button
            key={view}
            id={`expenses-${view.toLowerCase()}-tab`}
            type="button"
            role="tab"
            aria-controls={`expenses-${view.toLowerCase()}-panel`}
            aria-selected={isActive}
            className={`min-w-24 rounded-[calc(var(--radius-action)-5px)] px-3 text-[11px] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action-primary)] ${
              isActive
                ? "bg-[var(--surface-focal)] text-[var(--color-action-primary)]"
                : "text-[var(--text-muted)] hover:bg-[var(--surface-subtle)]"
            }`}
            onClick={() => onChange(view)}
          >
            {view}
          </button>
        );
      })}
    </div>
  );
}
