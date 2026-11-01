"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { primaryNavigation } from "./navigation";
import type { NavigationItem } from "./types";

const SIDEBAR_PREFERENCES_KEY = "life-os:sidebar-preferences:v1";
const SIDEBAR_PREFERENCES_EVENT = "life-os:sidebar-preferences-updated";

type SidebarPreferences = {
  collapsed: boolean;
  expandedSections: Record<string, boolean>;
};

const defaultSidebarPreferences: SidebarPreferences = {
  collapsed: false,
  expandedSections: {},
};

let cachedSidebarPreferences = defaultSidebarPreferences;
let hasReadSidebarPreferences = false;

export function Sidebar({
  activeItem = "Home",
  activeSubItem,
  navigationItems = primaryNavigation,
}: {
  activeItem?: string;
  activeSubItem?: string;
  navigationItems?: NavigationItem[];
}) {
  const preferences = useSyncExternalStore(
    subscribeToSidebarPreferences,
    getSidebarPreferencesSnapshot,
    getServerSidebarPreferences,
  );

  const isCollapsed = preferences.collapsed;

  function toggleSidebar() {
    saveSidebarPreferences({
      ...preferences,
      collapsed: !preferences.collapsed,
    });
  }

  function toggleSection(label: string) {
    saveSidebarPreferences({
      ...preferences,
      expandedSections: {
        ...preferences.expandedSections,
        [label]: !(preferences.expandedSections[label] ?? true),
      },
    });
  }

  return (
    <aside
      className={`relative hidden min-h-screen shrink-0 flex-col justify-between border-r border-[var(--border-subtle)] bg-[var(--surface-raised)] py-6 transition-[width] duration-200 ease-out motion-reduce:transition-none lg:flex ${
        isCollapsed ? "w-[68px] px-2" : "w-[260px] px-4"
      }`}
    >
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute top-6 -right-4 z-20 grid size-8 place-items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-raised)] text-[var(--text-primary)] shadow-[0_4px_10px_rgba(9,18,37,0.1)] transition-colors hover:bg-[var(--surface-subtle)] focus-visible:z-30"
      >
        <SidebarToggleIcon collapsed={isCollapsed} />
      </button>

      <div>
        <div
          className={`flex items-center px-1 ${
            isCollapsed ? "justify-center" : "gap-3"
          }`}
        >
          <LifeOsMark />
          <div
            aria-hidden={isCollapsed}
            className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-150 motion-reduce:transition-none ${
              isCollapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100"
            }`}
          >
            <p className="text-[16px] font-semibold leading-5 tracking-[-0.08em]">
              life<span className="text-[var(--color-action-primary)]">/</span>os
            </p>
            <p className="text-[11px] leading-4 text-[var(--text-muted)]">
              Personal system
            </p>
          </div>
        </div>

        {!isCollapsed ? (
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
        ) : null}

        <nav
          className={`mt-8 space-y-1 ${isCollapsed ? "flex flex-col items-center" : ""}`}
          aria-label="Primary navigation"
        >
          {navigationItems.map((item) => {
            const isActive = item.label === activeItem;
            const hasSubItems = Boolean(item.subItems?.length);
            const isSectionExpanded =
              preferences.expandedSections[item.label] ?? true;
            const sectionId = `sidebar-section-${toIdentifier(item.label)}`;
            const tooltipId = `sidebar-tooltip-${toIdentifier(item.label)}`;

            if (isCollapsed) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                  aria-describedby={tooltipId}
                  title={item.label}
                  className={`group relative grid size-10 place-items-center rounded-[var(--radius-action)] transition-colors ${
                    isActive
                      ? "bg-[var(--text-primary)] text-[var(--surface-raised)] shadow-[0_4px_10px_rgba(9,18,37,0.16)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--surface-subtle)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <SidebarIcon label={item.label} />
                  <SidebarTooltip id={tooltipId} label={item.label} />
                </Link>
              );
            }

            return (
              <div key={item.label}>
                <div
                  className={`flex min-h-11 items-center rounded-[var(--radius-action)] text-[12px] leading-5 transition-colors ${
                    isActive
                      ? "bg-[var(--text-primary)] font-medium text-[var(--surface-raised)] shadow-[0_4px_10px_rgba(9,18,37,0.16)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--surface-subtle)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive && !activeSubItem ? "page" : undefined}
                    className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3"
                  >
                    <SidebarIcon label={item.label} />
                    <span>{item.label}</span>
                  </Link>
                  {hasSubItems ? (
                    <button
                      type="button"
                      onClick={() => toggleSection(item.label)}
                      aria-expanded={isSectionExpanded}
                      aria-controls={sectionId}
                      aria-label={`${isSectionExpanded ? "Collapse" : "Expand"} ${item.label} navigation`}
                      className="mr-2 grid size-8 place-items-center rounded-[var(--radius-sm)] transition-colors hover:bg-black/10 focus-visible:bg-black/10"
                    >
                      <SectionToggleIcon expanded={isSectionExpanded} />
                    </button>
                  ) : null}
                </div>

                {hasSubItems && isSectionExpanded ? (
                  <div id={sectionId} className="mt-2 space-y-1 pl-4">
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
                              ? "bg-[var(--surface-subtle)] font-medium text-[var(--text-primary)]"
                              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {isSubItemActive ? (
                              <span
                                aria-hidden="true"
                                className="size-1.5 rounded-full bg-[var(--text-primary)]"
                              />
                            ) : (
                              <span aria-hidden="true" className="size-1.5" />
                            )}
                            {subItem.label}
                          </span>
                          {isSubItemActive ? (
                            <span aria-hidden="true" className="text-[var(--text-primary)]">
                              ·
                            </span>
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

      {!isCollapsed ? (
        <div className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-4">
          <p className="text-[11px] leading-4 text-[var(--text-muted)]">
            Current space
          </p>
          <p className="mt-3 text-[17px] font-medium leading-6">Personal</p>
        </div>
      ) : null}
    </aside>
  );
}

function subscribeToSidebarPreferences(onStoreChange: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key !== SIDEBAR_PREFERENCES_KEY) {
      return;
    }

    cachedSidebarPreferences = readStoredSidebarPreferences();
    hasReadSidebarPreferences = true;
    onStoreChange();
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(SIDEBAR_PREFERENCES_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(SIDEBAR_PREFERENCES_EVENT, onStoreChange);
  };
}

function getSidebarPreferencesSnapshot() {
  if (!hasReadSidebarPreferences) {
    cachedSidebarPreferences = readStoredSidebarPreferences();
    hasReadSidebarPreferences = true;
  }

  return cachedSidebarPreferences;
}

function getServerSidebarPreferences() {
  return defaultSidebarPreferences;
}

function saveSidebarPreferences(preferences: SidebarPreferences) {
  cachedSidebarPreferences = preferences;
  hasReadSidebarPreferences = true;

  try {
    window.localStorage.setItem(
      SIDEBAR_PREFERENCES_KEY,
      JSON.stringify(preferences),
    );
  } catch {
    // The sidebar remains usable when browser storage is unavailable.
  }

  window.dispatchEvent(new Event(SIDEBAR_PREFERENCES_EVENT));
}

function readStoredSidebarPreferences(): SidebarPreferences {
  try {
    const rawPreferences = window.localStorage.getItem(SIDEBAR_PREFERENCES_KEY);

    if (!rawPreferences) {
      return defaultSidebarPreferences;
    }

    const parsedPreferences: unknown = JSON.parse(rawPreferences);

    if (!isRecord(parsedPreferences)) {
      return defaultSidebarPreferences;
    }

    const expandedSections: Record<string, boolean> = {};

    if (isRecord(parsedPreferences.expandedSections)) {
      for (const [label, value] of Object.entries(
        parsedPreferences.expandedSections,
      )) {
        if (typeof value === "boolean") {
          expandedSections[label] = value;
        }
      }
    }

    return {
      collapsed: parsedPreferences.collapsed === true,
      expandedSections,
    };
  } catch {
    return defaultSidebarPreferences;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toIdentifier(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function LifeOsMark() {
  return (
    <span
      aria-hidden="true"
      className="flex size-5 items-end justify-center gap-0.5"
    >
      <i className="h-2 w-[5px] rounded-[1px] bg-[var(--text-primary)]" />
      <i className="h-5 w-[5px] rounded-[1px] bg-[var(--color-action-primary)]" />
      <i className="h-[13px] w-[5px] rounded-[1px] bg-[var(--text-primary)]" />
    </span>
  );
}

function SidebarTooltip({ id, label }: { id: string; label: string }) {
  return (
    <span
      id={id}
      role="tooltip"
      className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-30 -translate-y-1/2 whitespace-nowrap rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-2.5 py-1.5 text-[11px] font-medium text-[var(--text-primary)] opacity-0 shadow-[var(--shadow-surface)] transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      {label}
    </span>
  );
}

function SidebarToggleIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {collapsed ? <path d="m9 18 6-6-6-6" /> : <path d="m15 18-6-6 6-6" />}
    </svg>
  );
}

function SectionToggleIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`size-4 transition-transform duration-150 ${
        expanded ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SidebarIcon({ label }: { label: string }) {
  const iconProps = {
    "aria-hidden": true,
    className: "size-[17px] shrink-0",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.65,
    viewBox: "0 0 24 24",
  };

  switch (label) {
    case "Home":
      return (
        <svg {...iconProps}>
          <path d="m3.5 10.8 8.5-7 8.5 7" />
          <path d="M5.5 9.7V20h13V9.7" />
          <path d="M9.5 20v-5.5h5V20" />
        </svg>
      );
    case "Calendar":
      return (
        <svg {...iconProps}>
          <rect x="4" y="5.5" width="16" height="14" rx="2" />
          <path d="M8 3.5v4M16 3.5v4M4 10h16M8 14h.01M12 14h.01M16 14h.01" />
        </svg>
      );
    case "Reminders":
      return (
        <svg {...iconProps}>
          <path d="M18 10a6 6 0 0 0-12 0c0 7-2.5 7-2.5 8.5h17C20.5 17 18 17 18 10Z" />
          <path d="M10 21h4" />
        </svg>
      );
    case "Finance":
      return (
        <svg {...iconProps}>
          <path d="M4 20V11M10 20V4M16 20v-7M22 20H2" />
        </svg>
      );
    case "Groceries":
      return (
        <svg {...iconProps}>
          <path d="M5.5 9.5h13l-1 10h-11l-1-10Z" />
          <path d="M9 10V8a3 3 0 0 1 6 0v2M9 14h6" />
        </svg>
      );
    case "Chores":
      return (
        <svg {...iconProps}>
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="m8 12 2.5 2.5L16.5 9" />
        </svg>
      );
    case "Settings":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06-2.63 2.63-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55v.09h-3.72v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06-2.63-2.63.06-.06A1.7 1.7 0 0 0 5.36 15a1.7 1.7 0 0 0-1.55-1H3.7v-3.72h.11a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06L7.59 4.7l.06.06a1.7 1.7 0 0 0 1.87.34 1.7 1.7 0 0 0 1-1.55V3.46h3.72v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06 2.63 2.65-.06.06a1.7 1.7 0 0 0-.34 1.87 1.7 1.7 0 0 0 1.55 1h.09V14h-.09a1.7 1.7 0 0 0-1.55 1Z" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="7" />
        </svg>
      );
  }
}
