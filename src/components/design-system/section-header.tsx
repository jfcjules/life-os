import type { ReactNode } from "react";

export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="min-w-0 text-[15px] font-medium text-[var(--text-primary)]">
        {title}
      </h2>
      {action ? (
        <div className="text-right text-[11px] leading-4 text-[var(--text-muted)] max-sm:text-left">
          {action}
        </div>
      ) : null}
    </div>
  );
}
