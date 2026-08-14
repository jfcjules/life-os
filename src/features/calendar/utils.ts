import type {
  CalendarEvent,
  CalendarRelation,
  CalendarSpace,
  CalendarTone,
} from "./types";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: false,
});

export function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

export function atTime(date: Date, time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const nextDate = new Date(date);
  nextDate.setHours(hours, minutes, 0, 0);
  return nextDate;
}

export function formatDisplayDate(date: Date) {
  return dateFormatter.format(date);
}

export function formatShortDate(date: Date) {
  return shortDateFormatter.format(date);
}

export function formatWeekday(date: Date) {
  return weekdayFormatter.format(date);
}

export function formatEventTime(event: CalendarEvent) {
  return timeFormatter.format(new Date(event.startsAt));
}

export function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function createDateTime(date: string, time: string) {
  return new Date(`${date}T${time}:00`).toISOString();
}

export function isSameDay(value: string, day: Date) {
  const date = new Date(value);
  return (
    date.getFullYear() === day.getFullYear() &&
    date.getMonth() === day.getMonth() &&
    date.getDate() === day.getDate()
  );
}

export function sortEventsByStart(events: CalendarEvent[]) {
  return [...events].sort(
    (first, second) =>
      new Date(first.startsAt).getTime() - new Date(second.startsAt).getTime(),
  );
}

export function getSpaceTone(space: CalendarSpace): CalendarTone {
  return space === "Personal" ? "lilac" : "green";
}

export function getRelationTone(relation?: CalendarRelation): CalendarTone {
  const toneByRelation: Record<CalendarRelation, CalendarTone> = {
    Reminder: "blue",
    Chore: "green",
    Finance: "amber",
    Pet: "rose",
  };

  return relation ? toneByRelation[relation] : "lilac";
}
