import type { ReactNode } from "react";
import Link from "next/link";
import { Sidebar, primaryNavigation } from "./sidebar";

export function AppShell({
  children,
  activeItem = "Home",
  activeSubItem,
}: {
  children: ReactNode;
  activeItem?: string;
  activeSubItem?: string;
}) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--background-page)] text-[var(--text-primary)]">
      <div className="grid min-h-screen w-full grid-cols-1 bg-[var(--background-page)] lg:grid-cols-[260px_minmax(0,1fr)]">
        <Sidebar activeItem={activeItem} activeSubItem={activeSubItem} />
        <MobileNavigation activeItem={activeItem} activeSubItem={activeSubItem} />
        <section className="min-w-0 overflow-x-hidden px-8 py-8 max-sm:px-4">
          {children}
        </section>
      </div>
    </main>
  );
}

function MobileNavigation({
  activeItem,
  activeSubItem,
}: {
  activeItem: string;
  activeSubItem?: string;
}) {
  return (
    <div className="hidden min-w-0 border-b border-[var(--border-subtle)] bg-[var(--surface-content)] px-5 py-4 max-lg:block max-sm:px-4">
      <div className="flex min-w-0 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-10 place-items-center rounded-[var(--radius-action)] bg-[var(--color-action-primary)] text-[13px] font-medium shadow-[var(--shadow-action)]">
            L
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium leading-5">Life OS</p>
            <p className="text-[10px] leading-4 text-[var(--text-muted)]">
              Personal system
            </p>
          </div>
        </div>

        <div className="rounded-[var(--radius-action)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-3 py-2 text-[11px] font-medium">
          Personal
        </div>
      </div>

      <nav
        aria-label="Primary navigation"
        className="mt-4 flex min-w-0 max-w-full gap-2 overflow-x-auto pb-1"
      >
        {primaryNavigation.map((item) => {
          const isActive = item.label === activeItem;

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`grid min-h-10 shrink-0 place-items-center rounded-[var(--radius-action)] px-4 text-[11px] leading-4 ${
                isActive
                  ? "bg-[var(--surface-raised)] font-medium shadow-[var(--shadow-surface)]"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {activeItem === "Finance" ? (
        <nav
          aria-label="Finance navigation"
          className="mt-3 flex min-w-0 max-w-full gap-2 overflow-x-auto pb-1"
        >
          {primaryNavigation
            .find((item) => item.label === "Finance")
            ?.subItems?.map((item) => {
              const isActive = item.label === activeSubItem;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`grid min-h-9 shrink-0 place-items-center rounded-[var(--radius-sm)] px-4 text-[10px] leading-4 ${
                    isActive
                      ? "bg-[var(--action-selected)] font-medium text-[var(--text-primary)]"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
        </nav>
      ) : null}
    </div>
  );
}
