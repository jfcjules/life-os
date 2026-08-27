export function CalendarViewToggle() {
  return (
    <div
      className="grid rounded-[var(--radius-md)] bg-[var(--background-page)] p-1 max-sm:w-full max-sm:grid-cols-2 sm:inline-grid sm:grid-flow-col"
      aria-label="Calendar view"
    >
      <button
        type="button"
        aria-pressed="true"
        className="min-h-10 rounded-[var(--radius-action)] bg-[var(--surface-raised)] px-5 text-[12px] font-medium shadow-[var(--shadow-surface)]"
      >
        Today
      </button>
      <button
        type="button"
        aria-pressed="false"
        className="min-h-10 rounded-[var(--radius-action)] px-5 text-[12px] text-[var(--text-muted)]"
      >
        Week
      </button>
    </div>
  );
}
