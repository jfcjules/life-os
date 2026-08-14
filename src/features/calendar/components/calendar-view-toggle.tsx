export function CalendarViewToggle() {
  return (
    <div
      className="grid rounded-[18px] bg-[var(--background-page)] p-1 max-sm:w-full max-sm:grid-cols-2 sm:inline-grid sm:grid-flow-col"
      aria-label="Calendar view"
    >
      <button
        type="button"
        aria-pressed="true"
        className="min-h-10 rounded-[14px] bg-[var(--surface-raised)] px-5 text-[12px] font-medium shadow-[0_10px_24px_rgba(8,17,32,0.05)]"
      >
        Today
      </button>
      <button
        type="button"
        aria-pressed="false"
        className="min-h-10 rounded-[14px] px-5 text-[12px] text-[var(--text-muted)]"
      >
        Week
      </button>
    </div>
  );
}
