export type FinanceView = "Expenses" | "Budget";

const financeViews: FinanceView[] = ["Expenses", "Budget"];

export function FinanceViewToggle({
  activeView,
  onSelectView,
}: {
  activeView: FinanceView;
  onSelectView: (view: FinanceView) => void;
}) {
  return (
    <div
      className="grid rounded-[18px] bg-[var(--background-page)] p-1 max-sm:w-full max-sm:grid-cols-2 sm:inline-grid sm:grid-flow-col"
      aria-label="Finance view"
    >
      {financeViews.map((view) => {
        const isActive = activeView === view;

        return (
          <button
            key={view}
            type="button"
            aria-pressed={isActive}
            className={`min-h-10 rounded-[14px] px-5 text-[12px] font-medium transition ${
              isActive
                ? "bg-[var(--surface-raised)] text-[var(--text-primary)] shadow-[0_10px_24px_rgba(8,17,32,0.05)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
            onClick={() => onSelectView(view)}
          >
            {view}
          </button>
        );
      })}
    </div>
  );
}
