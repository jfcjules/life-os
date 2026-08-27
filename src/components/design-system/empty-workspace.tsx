import { AppShell } from "./app-shell";
import { Panel } from "./card";

export function EmptyWorkspace({
  title,
  eyebrow = "Life OS",
}: {
  title: string;
  eyebrow?: string;
}) {
  return (
    <AppShell activeItem={title}>
      <div className="flex min-h-full flex-col">
        <header className="flex items-start justify-between gap-6 max-md:flex-col">
          <div>
            <p className="text-[12px] leading-5 text-[var(--text-muted)]">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-[42px] font-medium leading-[1.05] text-[var(--text-primary)] sm:text-[52px]">
              {title}
            </h1>
          </div>
        </header>

        <Panel className="mt-9 grid min-h-[520px] place-items-center">
          <div className="size-3 rounded-full bg-[var(--color-action-secondary)]" />
        </Panel>
      </div>
    </AppShell>
  );
}
