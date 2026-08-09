import Link from "next/link";
import type { NavigationItem } from "./types";

export const primaryNavigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Calendar", href: "/calendar" },
  { label: "Reminders", href: "/reminders" },
  { label: "Finance", href: "/finance" },
  { label: "Groceries", href: "/groceries" },
  { label: "Chores", href: "/chores" },
  { label: "Settings", href: "/settings" },
];

export function Sidebar({
  activeItem = "Home",
  navigationItems = primaryNavigation,
}: {
  activeItem?: string;
  navigationItems?: NavigationItem[];
}) {
  return (
    <aside className="flex min-h-full flex-col justify-between border-r border-[var(--border-subtle)] bg-[rgba(241,244,250,0.52)] px-5 py-6 max-lg:hidden">
      <div>
        <div className="flex items-center gap-3 px-1">
          <div className="grid size-11 place-items-center rounded-[16px] bg-[var(--color-action-primary)] text-sm font-medium shadow-[0_16px_34px_rgba(95,128,212,0.24)]">
            L
          </div>
          <div>
            <p className="text-[14px] font-medium leading-5">Life OS</p>
            <p className="text-[11px] leading-4 text-[var(--text-muted)]">
              Personal system
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2 rounded-[18px] bg-[var(--background-page)] p-1">
          <button
            type="button"
            className="rounded-[14px] bg-[var(--surface-raised)] px-3 py-2 text-[11px] font-medium"
          >
            Personal
          </button>
          <button
            type="button"
            className="rounded-[14px] px-3 py-2 text-[11px] text-[var(--text-muted)]"
          >
            Couple
          </button>
        </div>

        <nav className="mt-8 space-y-2" aria-label="Primary navigation">
          {navigationItems.map((item) => {
            const isActive = item.label === activeItem;

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-11 items-center justify-between rounded-[16px] px-4 text-[12px] leading-5 ${
                  isActive
                    ? "bg-[var(--surface-raised)] font-medium shadow-[0_10px_24px_rgba(8,17,32,0.05)]"
                    : "text-[var(--text-muted)]"
                }`}
              >
                <span>{item.label}</span>
                {isActive ? <span aria-hidden="true">.</span> : null}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4">
        <p className="text-[11px] leading-4 text-[var(--text-muted)]">
          Current space
        </p>
        <p className="mt-3 text-[17px] font-medium leading-6">Personal</p>
      </div>
    </aside>
  );
}
