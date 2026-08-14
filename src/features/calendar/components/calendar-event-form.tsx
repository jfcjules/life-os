import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import { Button } from "@/components/design-system";

import type { CalendarEvent, CalendarRelation, CalendarSpace } from "../types";
import { createDateTime, formatDateInput } from "../utils";

const relationOptions: CalendarRelation[] = [
  "Reminder",
  "Chore",
  "Finance",
  "Pet",
];

const fieldClass =
  "min-h-11 w-full rounded-[14px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 text-[12px] text-[var(--text-primary)] outline-none transition focus:border-[var(--color-action-primary)]";

const textAreaClass =
  "min-h-24 w-full resize-none rounded-[14px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 py-3 text-[12px] leading-5 text-[var(--text-primary)] outline-none transition focus:border-[var(--color-action-primary)]";

export function CalendarEventForm({
  today,
  onCancel,
  onCreateEvent,
}: {
  today: Date;
  onCancel: () => void;
  onCreateEvent: (event: CalendarEvent) => void;
}) {
  const defaultDate = useMemo(() => formatDateInput(today), [today]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("");
  const [space, setSpace] = useState<CalendarSpace>("Personal");
  const [relation, setRelation] = useState<CalendarRelation | "">("Reminder");
  const [location, setLocation] = useState("");
  const [people, setPeople] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !date || !startTime || !space) {
      setError("Title, date, start time, and space are required.");
      return;
    }

    const calendarEvent: CalendarEvent = {
      id: `event-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || "No description added yet.",
      startsAt: createDateTime(date, startTime),
      endsAt: endTime ? createDateTime(date, endTime) : undefined,
      space,
      relation: relation || undefined,
      location: location.trim() || undefined,
      people: people.trim() || undefined,
    };

    onCreateEvent(calendarEvent);
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[rgba(8,17,32,0.32)] px-4 py-6"
      role="presentation"
    >
      <form
        onSubmit={handleSubmit}
        className="max-h-[calc(100vh-48px)] w-full max-w-[640px] overflow-y-auto rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface-content)] p-6 shadow-[0_28px_90px_rgba(8,17,32,0.24)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-event-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] leading-4 text-[var(--text-muted)]">
              Calendar
            </p>
            <h2
              id="add-event-title"
              className="mt-2 text-[20px] font-medium leading-7 text-[var(--text-primary)]"
            >
              Add event
            </h2>
          </div>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
            Title
            <input
              className={fieldClass}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </label>

          <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
            Description
            <textarea
              className={textAreaClass}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
              Date
              <input
                type="date"
                className={fieldClass}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </label>

            <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
              Start time
              <input
                type="time"
                className={fieldClass}
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                required
              />
            </label>

            <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
              End time
              <input
                type="time"
                className={fieldClass}
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
              Space
              <select
                className={fieldClass}
                value={space}
                onChange={(event) =>
                  setSpace(event.target.value as CalendarSpace)
                }
                required
              >
                <option value="Personal">Personal</option>
                <option value="Couple">Couple</option>
              </select>
            </label>

            <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
              Relation
              <select
                className={fieldClass}
                value={relation}
                onChange={(event) =>
                  setRelation(event.target.value as CalendarRelation | "")
                }
              >
                <option value="">None</option>
                {relationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
              Location
              <input
                className={fieldClass}
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </label>

            <label className="grid gap-2 text-[11px] leading-4 text-[var(--text-muted)]">
              People
              <input
                className={fieldClass}
                value={people}
                onChange={(event) => setPeople(event.target.value)}
              />
            </label>
          </div>
        </div>

        {error ? (
          <p className="mt-4 rounded-[14px] bg-[rgba(214,155,168,0.22)] px-4 py-3 text-[12px] leading-5 text-[var(--text-primary)]">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Create event</Button>
        </div>
      </form>
    </div>
  );
}
