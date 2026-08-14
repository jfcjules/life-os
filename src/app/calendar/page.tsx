import {
  AppShell,
  Button,
  Card,
} from "@/components/design-system";
import { CalendarSpaceFilter } from "@/features/calendar/components/calendar-space-filter";
import { CalendarTimeline } from "@/features/calendar/components/calendar-timeline";
import { CalendarViewToggle } from "@/features/calendar/components/calendar-view-toggle";
import { ConceptScopePanel } from "@/features/calendar/components/concept-scope-panel";
import { ConnectedItemsPanel } from "@/features/calendar/components/connected-items-panel";
import { WeekPreview } from "@/features/calendar/components/week-preview";
import {
  connectedItems,
  createSeedEvents,
  createWeekPreview,
} from "@/features/calendar/data";
import {
  formatDisplayDate,
  isSameDay,
  sortEventsByStart,
} from "@/features/calendar/utils";

export default function CalendarPage() {
  const today = new Date();
  const todayEvents = sortEventsByStart(
    createSeedEvents(today).filter((event) => isSameDay(event.startsAt, today)),
  );

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
            <Button variant="ghost">Today</Button>
            <Button>Add event</Button>
          </div>
        </header>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <CalendarViewToggle />
          <CalendarSpaceFilter />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
          <div className="min-w-0 space-y-6">
            <CalendarTimeline
              dateLabel={formatDisplayDate(today)}
              events={todayEvents}
            />

            <WeekPreview days={createWeekPreview(today)} />
          </div>

          <aside className="min-w-0 space-y-6">
            <ConnectedItemsPanel items={connectedItems} />

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
                <Button variant="secondary" className="w-full">
                  Add event
                </Button>
              </div>
            </Card>

            <ConceptScopePanel />
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
