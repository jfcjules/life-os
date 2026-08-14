import {
  AppShell,
  Button,
  Card,
  Panel,
  SectionHeader,
} from "@/components/design-system";

export default function CalendarPage() {
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
          <div
            className="grid rounded-[18px] bg-[var(--background-page)] p-1 max-sm:w-full max-sm:grid-cols-2 sm:inline-grid sm:grid-flow-col"
            aria-label="Calendar view"
          >
            <button
              type="button"
              aria-pressed="true"
              className="min-h-10 rounded-[14px] bg-[var(--surface-raised)] px-5 text-[12px] font-medium shadow-[0_10px_24px_rgba(8,17,32,0.05)]"
            >
              Today
            </button>
            <button
              type="button"
              className="min-h-10 rounded-[14px] px-5 text-[12px] text-[var(--text-muted)]"
            >
              Week
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", "Personal", "Couple"].map((space, index) => (
              <button
                key={space}
                type="button"
                aria-pressed={index === 0 ? "true" : "false"}
                className={`min-h-9 rounded-full px-4 text-[11px] ${
                  index === 0
                    ? "bg-[var(--color-action-secondary)] font-medium text-[var(--text-primary)]"
                    : "border border-[var(--border-subtle)] bg-[var(--surface-raised)] text-[var(--text-muted)]"
                }`}
              >
                {space}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
          <div className="min-w-0 space-y-6">
            <Panel>
              <SectionHeader
                title="Today timeline"
                action="Wednesday, Aug 12"
              />

              <div className="mt-5 space-y-3">
                {todayEvents.map((event) => (
                  <TimelineEvent
                    key={`${event.time}-${event.title}`}
                    {...event}
                  />
                ))}
              </div>
            </Panel>

            <Panel>
              <SectionHeader title="This week preview" action="Aug 12-18" />

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {weekPreview.map((day) => (
                  <article
                    key={day.date}
                    className="min-h-[138px] rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[13px] font-medium leading-5">
                          {day.day}
                        </h3>
                        <p className="mt-1 text-[11px] leading-4 text-[var(--text-muted)]">
                          {day.date}
                        </p>
                      </div>
                      <span className="rounded-full bg-[var(--color-action-secondary)] px-3 py-1 text-[11px] leading-4 text-[var(--text-muted)]">
                        {day.count}
                      </span>
                    </div>

                    <p className="mt-5 text-[12px] font-medium leading-5">
                      {day.focus}
                    </p>
                    <p className="mt-2 text-[11px] leading-4 text-[var(--text-muted)]">
                      {day.hint}
                    </p>
                  </article>
                ))}
              </div>
            </Panel>
          </div>

          <aside className="min-w-0 space-y-6">
            <Panel>
              <SectionHeader title="Connected items" action="Preparation" />

              <div className="mt-5 space-y-3">
                {connectedItems.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4"
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
                      <Chip tone={item.tone}>{item.type}</Chip>
                    </div>
                    <p className="mt-4 text-[11px] leading-4 text-[var(--text-muted)]">
                      {item.space}
                    </p>
                  </article>
                ))}
              </div>
            </Panel>

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

            <Panel>
              <SectionHeader title="Concept scope" action="Draft" />

              <div className="mt-5 grid gap-3">
                <ScopeRow label="Now" value="Today and Week views" />
                <ScopeRow label="Spaces" value="All, Personal, Couple" />
                <ScopeRow label="Later" value="Month, Agenda, sync, alerts" />
              </div>
            </Panel>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

type Tone = "blue" | "green" | "lilac" | "rose" | "amber";

const todayEvents: Array<{
  time: string;
  title: string;
  space: string;
  relation: string;
  location: string;
  people: string;
  tone: Tone;
}> = [
  {
    time: "9:00",
    title: "Morning planning",
    space: "Personal",
    relation: "Reminder",
    location: "Kitchen table",
    people: "You",
    tone: "blue",
  },
  {
    time: "13:30",
    title: "Shared grocery run",
    space: "Couple",
    relation: "Chore",
    location: "Neighborhood market",
    people: "Alex",
    tone: "green",
  },
  {
    time: "16:00",
    title: "Vet appointment",
    space: "Couple",
    relation: "Pet",
    location: "Oak Street Clinic",
    people: "Milo",
    tone: "rose",
  },
  {
    time: "19:00",
    title: "Review monthly budget",
    space: "Personal",
    relation: "Finance",
    location: "Home",
    people: "You",
    tone: "amber",
  },
];

const weekPreview = [
  {
    day: "Today",
    date: "Aug 12",
    count: "4 events",
    focus: "Prep-heavy day",
    hint: "Reminder, pet care, and finance context",
  },
  {
    day: "Thu",
    date: "Aug 13",
    count: "2 events",
    focus: "Shared dinner plan",
    hint: "Couple space with one connected chore",
  },
  {
    day: "Fri",
    date: "Aug 14",
    count: "1 event",
    focus: "Quiet personal block",
    hint: "Personal space, no prep needed",
  },
  {
    day: "Weekend",
    date: "Aug 15-16",
    count: "3 events",
    focus: "Home reset",
    hint: "Chores and shared planning stay grouped",
  },
];

const connectedItems: Array<{
  title: string;
  type: string;
  due: string;
  space: string;
  tone: Tone;
}> = [
  {
    title: "Confirm vet documents",
    type: "Reminder",
    due: "Before 15:30 today",
    space: "Couple",
    tone: "blue",
  },
  {
    title: "Pick up pantry basics",
    type: "Chore",
    due: "Before grocery run",
    space: "Couple",
    tone: "green",
  },
  {
    title: "Check dining budget",
    type: "Finance",
    due: "Before weekend plans",
    space: "Personal",
    tone: "amber",
  },
];

function TimelineEvent({
  time,
  title,
  space,
  relation,
  location,
  people,
  tone,
}: (typeof todayEvents)[number]) {
  return (
    <article className="grid min-h-[92px] grid-cols-[72px_minmax(0,1fr)] gap-5 rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 max-sm:grid-cols-1 max-sm:gap-3">
      <span className="text-[12px] font-medium leading-5 text-[var(--text-muted)]">
        {time}
      </span>

      <div className="min-w-0">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 max-sm:grid-cols-1">
          <h3 className="min-w-0 text-[14px] font-medium leading-5">{title}</h3>
          <div className="flex min-w-0 flex-wrap justify-end gap-2 max-sm:justify-start">
            <Chip tone="lilac">{space}</Chip>
            <Chip tone={tone}>{relation}</Chip>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] leading-4 text-[var(--text-muted)]">
          <span>{location}</span>
          <span>{people}</span>
        </div>
      </div>
    </article>
  );
}

function Chip({ children, tone }: { children: string; tone: Tone }) {
  const toneClass: Record<Tone, string> = {
    blue: "bg-[var(--color-action-secondary)]",
    green: "bg-[rgba(126,168,139,0.28)]",
    lilac: "bg-[rgba(165,148,199,0.28)]",
    rose: "bg-[rgba(214,155,168,0.28)]",
    amber: "bg-[rgba(213,178,118,0.30)]",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] leading-4 text-[var(--text-muted)] ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}

function ScopeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[76px_minmax(0,1fr)] gap-4 rounded-[16px] bg-[var(--surface-raised)] px-4 py-3 text-[11px] leading-5">
      <span className="text-[var(--text-muted)]">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
