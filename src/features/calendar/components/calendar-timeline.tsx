import { Button, Panel, SectionHeader } from "@/components/design-system";

import type { CalendarEvent } from "../types";
import { CalendarEventRow } from "./calendar-event-row";

export function CalendarTimeline({
  dateLabel,
  events,
  onAddEvent,
}: {
  dateLabel: string;
  events: CalendarEvent[];
  onAddEvent?: () => void;
}) {
  return (
    <Panel>
      <SectionHeader title="Today's events" action={dateLabel} />

      {events.length > 0 ? (
        <div className="mt-5 space-y-3">
          {events.map((event) => (
            <CalendarEventRow key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[var(--radius-md)] border border-dashed border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5">
          <p className="text-[13px] font-medium leading-5">
            No events here yet.
          </p>
          <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
            When something is planned, it will show up here with its space and
            related reminders.
          </p>
          {onAddEvent ? (
            <div className="mt-5">
              <Button variant="secondary" onClick={onAddEvent}>
                Add event
              </Button>
            </div>
          ) : null}
        </div>
      )}
    </Panel>
  );
}
