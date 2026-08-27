import { Panel, SectionHeader } from "@/components/design-system";

import type { ConnectedItem } from "../types";
import { getRelationTone } from "../utils";
import { CalendarChip } from "./chip";

export function ConnectedItemsPanel({ items }: { items: ConnectedItem[] }) {
  return (
    <Panel>
      <SectionHeader title="Connected items" action="Preparation" />

      {items.length > 0 ? (
        <div className="mt-5 space-y-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[12px] font-medium leading-5">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-4 text-[var(--text-muted)]">
                    {item.due}
                  </p>
                </div>
                <CalendarChip tone={getRelationTone(item.type)}>
                  {item.type}
                </CalendarChip>
              </div>
              <p className="mt-4 text-[11px] leading-4 text-[var(--text-muted)]">
                {item.space}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[var(--radius-md)] border border-dashed border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4">
          <p className="text-[12px] font-medium leading-5">
            No preparation items.
          </p>
          <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
            Related reminders, chores, pet care, and finance checks will appear
            when they are connected to upcoming events.
          </p>
        </div>
      )}
    </Panel>
  );
}
