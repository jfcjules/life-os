import type { CalendarEvent } from "../types";
import {
  formatEventTime,
  getRelationTone,
  getSpaceTone,
} from "../utils";
import { CalendarChip } from "./chip";

export function CalendarEventRow({ event }: { event: CalendarEvent }) {
  return (
    <article className="grid min-h-[104px] grid-cols-[72px_minmax(0,1fr)] gap-5 rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 max-sm:grid-cols-1 max-sm:gap-3">
      <span className="text-[12px] font-medium leading-5 text-[var(--text-muted)]">
        {formatEventTime(event)}
      </span>

      <div className="min-w-0">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 max-sm:grid-cols-1">
          <div className="min-w-0">
            <h3 className="min-w-0 text-[14px] font-medium leading-5">
              {event.title}
            </h3>
            <p className="mt-2 text-[12px] leading-5 text-[var(--text-muted)]">
              {event.description}
            </p>
          </div>

          <div className="flex min-w-0 flex-wrap justify-end gap-2 max-sm:justify-start">
            <CalendarChip tone={getSpaceTone(event.space)}>
              {event.space}
            </CalendarChip>
            {event.relation ? (
              <CalendarChip tone={getRelationTone(event.relation)}>
                {event.relation}
              </CalendarChip>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] leading-4 text-[var(--text-muted)]">
          {event.location ? <span>{event.location}</span> : null}
          {event.people ? <span>{event.people}</span> : null}
        </div>
      </div>
    </article>
  );
}
