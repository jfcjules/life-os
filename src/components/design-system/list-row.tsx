export function ListRow({
  leading,
  title,
  detail,
  tag,
}: {
  leading: string;
  title: string;
  detail?: string;
  tag?: string;
}) {
  return (
    <article className="grid min-h-16 grid-cols-[72px_1fr_auto] items-center gap-5 rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-5 py-3 max-sm:grid-cols-[68px_minmax(0,1fr)] max-sm:gap-3">
      <span className="text-[11px] leading-4 text-[var(--text-muted)]">
        {leading}
      </span>
      <div className="min-w-0">
        <h3 className="truncate text-[13px] font-medium leading-5 text-[var(--text-primary)] max-sm:whitespace-normal max-sm:overflow-visible max-sm:[text-overflow:clip]">
          {title}
        </h3>
        {detail ? (
          <p className="truncate text-[11px] leading-4 text-[var(--text-muted)] max-sm:whitespace-normal max-sm:overflow-visible max-sm:[text-overflow:clip]">
            {detail}
          </p>
        ) : null}
      </div>
      {tag ? (
        <span className="min-w-24 rounded-full bg-[var(--color-action-secondary)] px-4 py-2 text-center text-[11px] leading-4 text-[var(--text-muted)] max-sm:col-span-2 max-sm:w-full">
          {tag}
        </span>
      ) : null}
    </article>
  );
}

export function PreviewCard({
  title,
  marker,
  metric,
  detail,
}: {
  title: string;
  marker: string;
  metric?: string;
  detail?: string;
}) {
  return (
    <article className="flex min-h-[126px] flex-col justify-between rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-[13px] font-medium leading-5 text-[var(--text-primary)]">
            {title}
          </h3>
          {metric ? (
            <p className="mt-1 text-[11px] leading-4 text-[var(--text-muted)]">
              {metric}
            </p>
          ) : null}
        </div>
        <span className="grid size-8 shrink-0 place-items-center rounded-[12px] bg-[var(--color-action-secondary)] text-[11px] font-medium text-[var(--text-muted)]">
          {marker}
        </span>
      </div>
      {detail ? (
        <p className="text-[11px] leading-4 text-[var(--text-muted)]">
          {detail}
        </p>
      ) : null}
    </article>
  );
}
