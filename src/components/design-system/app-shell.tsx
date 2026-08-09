import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";

export function AppShell({
  children,
  activeItem = "Home",
}: {
  children: ReactNode;
  activeItem?: string;
}) {
  return (
    <main className="min-h-screen bg-[var(--background-page)] px-6 py-6 text-[var(--text-primary)]">
      <div className="mx-auto grid min-h-[calc(100vh-48px)] max-w-[1440px] grid-cols-[260px_minmax(0,1fr)] overflow-hidden rounded-[34px] border border-[var(--border-subtle)] bg-[var(--surface-content)] shadow-[0_24px_70px_rgba(8,17,32,0.10)] max-lg:grid-cols-1">
        <Sidebar activeItem={activeItem} />
        <section className="min-w-0 px-8 py-8 max-sm:px-4">{children}</section>
      </div>
    </main>
  );
}
