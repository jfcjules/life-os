"use client";

import { useEffect, useMemo, useState } from "react";

import { AppShell, Button, Card } from "@/components/design-system";

import {
  connectedItems,
  createSeedEvents,
  createWeekPreview,
} from "../data";
import type { CalendarEvent, CalendarSpaceFilter } from "../types";
import {
  formatDisplayDate,
  isSameDay,
  sortEventsByStart,
} from "../utils";
import { CalendarSpaceFilter as CalendarSpaceFilterControl } from "./calendar-space-filter";
import { CalendarEventForm } from "./calendar-event-form";
import { CalendarTimeline } from "./calendar-timeline";
import { CalendarViewToggle } from "./calendar-view-toggle";
import { ConceptScopePanel } from "./concept-scope-panel";
import { ConnectedItemsPanel } from "./connected-items-panel";
import { WeekPreview } from "./week-preview";

const calendarStorageKey = "life-os.calendar.events";

export function CalendarWorkspace() {
  const today = useMemo(() => new Date(), []);
  const [selectedSpace, setSelectedSpace] =
    useState<CalendarSpaceFilter>("All");
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [hasLoadedStoredEvents, setHasLoadedStoredEvents] = useState(false);
  const [events, setEvents] = useState(() => createSeedEvents(today));

  const todayEvents = useMemo(() => {
    const eventsForToday = events.filter((event) =>
      isSameDay(event.startsAt, today),
    );

    const eventsForSpace =
      selectedSpace === "All"
        ? eventsForToday
        : eventsForToday.filter((event) => event.space === selectedSpace);

    return sortEventsByStart(eventsForSpace);
  }, [events, selectedSpace, today]);

  const connectedItemsForVisibleEvents = useMemo(() => {
    const visibleEventIds = new Set(todayEvents.map((event) => event.id));

    return connectedItems.filter((item) => {
      const matchesVisibleEvent = visibleEventIds.has(item.eventId);
      const matchesSpace =
        selectedSpace === "All" || item.space === selectedSpace;

      return matchesVisibleEvent && matchesSpace;
    });
  }, [selectedSpace, todayEvents]);

  useEffect(() => {
    try {
      const savedEvents = window.localStorage.getItem(calendarStorageKey);

      if (savedEvents) {
        const parsedEvents: unknown = JSON.parse(savedEvents);

        if (Array.isArray(parsedEvents)) {
          window.queueMicrotask(() => setEvents(parsedEvents));
        }
      }
    } catch {
      window.localStorage.removeItem(calendarStorageKey);
    }

    window.queueMicrotask(() => setHasLoadedStoredEvents(true));
  }, []);

  useEffect(() => {
    if (!hasLoadedStoredEvents) {
      return;
    }

    window.localStorage.setItem(calendarStorageKey, JSON.stringify(events));
  }, [events, hasLoadedStoredEvents]);

  function handleCreateEvent(event: CalendarEvent) {
    setEvents((currentEvents) => sortEventsByStart([...currentEvents, event]));
    setIsAddEventOpen(false);
  }

  return (
    <AppShell activeItem="Calendar">
      <div className="flex min-h-full flex-col gap-8">
        <header className="flex items-start justify-between gap-6 max-md:flex-col">
          <div className="max-w-[700px]">
            <p className="text-[12px] leading-5 text-[var(--text-muted)]">
              Life OS
            </p>
            <h1 className="mt-3 text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[0.96] text-[var(--text-primary)]">
              Calendar
            </h1>
            <p className="mt-5 max-w-[560px] text-[13px] leading-6 text-[var(--text-muted)]">
              See what is happening today and what needs a little preparation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 max-md:justify-start">
            <Button variant="ghost" onClick={() => setSelectedSpace("All")}>
              Today
            </Button>
            <Button onClick={() => setIsAddEventOpen(true)}>Add event</Button>
          </div>
        </header>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <CalendarViewToggle />
          <CalendarSpaceFilterControl
            selectedSpace={selectedSpace}
            onSelectSpace={setSelectedSpace}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
          <div className="min-w-0 space-y-6">
            <CalendarTimeline
              dateLabel={formatDisplayDate(today)}
              events={todayEvents}
              onAddEvent={() => setIsAddEventOpen(true)}
            />

            <WeekPreview days={createWeekPreview(today)} />
          </div>

          <aside className="min-w-0 space-y-6">
            <ConnectedItemsPanel items={connectedItemsForVisibleEvents} />

            <Card>
              <p className="text-[12px] font-medium leading-5">Empty state</p>
              <p className="mt-4 text-[13px] font-medium leading-5">
                No events here yet.
              </p>
              <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
                When something is planned, it will show up here with its space
                and related reminders.
              </p>
              <div className="mt-5">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setIsAddEventOpen(true)}
                >
                  Add event
                </Button>
              </div>
            </Card>

            <ConceptScopePanel />
          </aside>
        </div>
      </div>
      {isAddEventOpen ? (
        <CalendarEventForm
          today={today}
          onCancel={() => setIsAddEventOpen(false)}
          onCreateEvent={handleCreateEvent}
        />
      ) : null}
    </AppShell>
  );
}
