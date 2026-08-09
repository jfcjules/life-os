import type { ReactNode } from "react";

export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-5">
      <h2 className="text-[15px] font-medium text-[var(--text-primary)]">
        {title}
      </h2>
      {action ? (
        <div className="text-right text-[11px] leading-4 text-[var(--text-muted)]">
          {action}
        </div>
      ) : null}
    </div>
  );
}
