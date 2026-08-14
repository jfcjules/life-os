import type { ReactNode } from "react";
import Link from "next/link";
import { Sidebar, primaryNavigation } from "./sidebar";

export function AppShell({
  children,
  activeItem = "Home",
}: {
  children: ReactNode;
  activeItem?: string;
}) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--background-page)] px-6 py-6 text-[var(--text-primary)] max-sm:px-3 max-sm:py-3">
      <div className="mx-auto grid min-h-[calc(100vh-48px)] max-w-[1440px] grid-cols-1 overflow-hidden rounded-[34px] border border-[var(--border-subtle)] bg-[var(--surface-content)] shadow-[0_24px_70px_rgba(8,17,32,0.10)] lg:grid-cols-[260px_minmax(0,1fr)]">
        <Sidebar activeItem={activeItem} />
        <MobileNavigation activeItem={activeItem} />
        <section className="min-w-0 overflow-x-hidden px-8 py-8 max-sm:px-4">
          {children}
        </section>
      </div>
    </main>
  );
}

function MobileNavigation({ activeItem }: { activeItem: string }) {
  return (
    <div className="hidden min-w-0 border-b border-[var(--border-subtle)] bg-[rgba(241,244,250,0.58)] px-5 py-4 max-lg:block max-sm:px-4">
      <div className="flex min-w-0 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-10 place-items-center rounded-[14px] bg-[var(--color-action-primary)] text-[13px] font-medium shadow-[0_12px_26px_rgba(95,128,212,0.22)]">
            L
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium leading-5">Life OS</p>
            <p className="text-[10px] leading-4 text-[var(--text-muted)]">
              Personal system
            </p>
          </div>
        </div>

        <div className="rounded-[15px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-3 py-2 text-[11px] font-medium">
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
              className={`grid min-h-10 shrink-0 place-items-center rounded-[14px] px-4 text-[11px] leading-4 ${
                isActive
                  ? "bg-[var(--surface-raised)] font-medium shadow-[0_10px_24px_rgba(8,17,32,0.05)]"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
