import Link from "next/link";
import type { NavigationItem } from "./types";

export const primaryNavigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Calendar", href: "/calendar" },
  { label: "Reminders", href: "/reminders" },
  {
    label: "Finance",
    href: "/finance/overview",
    subItems: [
      { label: "Overview", href: "/finance/overview" },
      { label: "Expenses", href: "/finance/expenses" },
      { label: "Income", href: "/finance/income" },
      { label: "Budget", href: "/finance/budget" },
      { label: "Goals", href: "/finance/goals" },
    ],
  },
  { label: "Groceries", href: "/groceries" },
  { label: "Chores", href: "/chores" },
  { label: "Settings", href: "/settings" },
];

export function Sidebar({
  activeItem = "Home",
  activeSubItem,
  navigationItems = primaryNavigation,
}: {
  activeItem?: string;
  activeSubItem?: string;
  navigationItems?: NavigationItem[];
}) {
  return (
    <aside className="flex min-h-full flex-col justify-between border-r border-[var(--border-subtle)] bg-[var(--surface-content)] px-[18px] py-[26px] max-lg:hidden">
      <div>
        <div className="flex items-center gap-3 px-1">
          <div className="grid size-11 place-items-center rounded-[var(--radius-action)] bg-[var(--color-action-primary)] text-sm font-medium shadow-[var(--shadow-action)]">
            L
          </div>
          <div>
            <p className="text-[14px] font-medium leading-5">Life OS</p>
            <p className="text-[11px] leading-4 text-[var(--text-muted)]">
              Personal system
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-1">
          <button
            type="button"
            className="rounded-[13px] bg-[var(--color-action-secondary)] px-3 py-2 text-[11px] font-medium"
          >
            Personal
          </button>
          <button
            type="button"
            className="rounded-[var(--radius-action)] px-3 py-2 text-[11px] text-[var(--text-muted)]"
          >
            Couple
          </button>
        </div>

        <nav className="mt-8 space-y-2" aria-label="Primary navigation">
          {navigationItems.map((item) => {
            const isActive = item.label === activeItem;
            const hasSubItems = Boolean(item.subItems?.length);

            return (
              <div key={item.label}>
                <Link
                  href={item.href}
                  aria-current={isActive && !activeSubItem ? "page" : undefined}
                  className={`flex min-h-11 items-center justify-between rounded-[var(--radius-action)] px-4 text-[12px] leading-5 ${
                    isActive
                      ? "bg-[var(--surface-raised)] font-medium shadow-[var(--shadow-surface)]"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && !hasSubItems ? (
                    <span aria-hidden="true">.</span>
                  ) : null}
                </Link>

                {hasSubItems ? (
                  <div className="mt-2 space-y-1 pl-4">
                    {item.subItems?.map((subItem) => {
                      const isSubItemActive =
                        isActive && subItem.label === activeSubItem;

                      return (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          aria-current={isSubItemActive ? "page" : undefined}
                          className={`flex min-h-9 items-center justify-between rounded-[var(--radius-sm)] px-4 text-[11px] leading-4 transition ${
                            isSubItemActive
                              ? "bg-[var(--action-selected)] font-medium text-[var(--text-primary)]"
                              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          <span>{subItem.label}</span>
                          {isSubItemActive ? (
                            <span aria-hidden="true">.</span>
                          ) : null}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4">
        <p className="text-[11px] leading-4 text-[var(--text-muted)]">
          Current space
        </p>
        <p className="mt-3 text-[17px] font-medium leading-6">Personal</p>
      </div>
    </aside>
  );
}
