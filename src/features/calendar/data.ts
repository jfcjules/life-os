import type { CalendarEvent, ConnectedItem, WeekPreviewDay } from "./types";
import { addDays, atTime, formatShortDate, formatWeekday } from "./utils";

export function createSeedEvents(today = new Date()): CalendarEvent[] {
  return [
    {
      id: "morning-planning",
      title: "Morning planning",
      description: "Set the priorities that need attention before lunch.",
      startsAt: atTime(today, "09:00").toISOString(),
      space: "Personal",
      relation: "Reminder",
      location: "Kitchen table",
      people: "You",
    },
    {
      id: "shared-grocery-run",
      title: "Shared grocery run",
      description: "Restock the pantry basics before weekend cooking.",
      startsAt: atTime(today, "13:30").toISOString(),
      space: "Couple",
      relation: "Chore",
      location: "Neighborhood market",
      people: "Alex",
    },
    {
      id: "vet-appointment",
      title: "Vet appointment",
      description: "Bring the documents and ask about the updated care plan.",
      startsAt: atTime(today, "16:00").toISOString(),
      space: "Couple",
      relation: "Pet",
      location: "Oak Street Clinic",
      people: "Milo",
    },
    {
      id: "review-monthly-budget",
      title: "Review monthly budget",
      description: "Check dining and household categories before new plans.",
      startsAt: atTime(today, "19:00").toISOString(),
      space: "Personal",
      relation: "Finance",
      location: "Home",
      people: "You",
    },
    {
      id: "shared-dinner-plan",
      title: "Shared dinner plan",
      description: "Pick a place and confirm timing.",
      startsAt: atTime(addDays(today, 1), "18:30").toISOString(),
      space: "Couple",
      relation: "Chore",
      location: "Downtown",
      people: "Alex",
    },
    {
      id: "quiet-personal-block",
      title: "Quiet personal block",
      description: "Protected time for planning and reset.",
      startsAt: atTime(addDays(today, 2), "10:00").toISOString(),
      space: "Personal",
      relation: "Reminder",
      location: "Home",
      people: "You",
    },
  ];
}

export function createWeekPreview(today = new Date()): WeekPreviewDay[] {
  const tomorrow = addDays(today, 1);
  const dayAfterTomorrow = addDays(today, 2);
  const weekendStart = addDays(today, 3);
  const weekendEnd = addDays(today, 4);

  return [
    {
      id: "today",
      day: "Today",
      date: formatShortDate(today),
      count: "4 events",
      focus: "Prep-heavy day",
      hint: "Reminder, pet care, and finance context",
    },
    {
      id: "tomorrow",
      day: formatWeekday(tomorrow),
      date: formatShortDate(tomorrow),
      count: "2 events",
      focus: "Shared dinner plan",
      hint: "Couple space with one connected chore",
    },
    {
      id: "day-after-tomorrow",
      day: formatWeekday(dayAfterTomorrow),
      date: formatShortDate(dayAfterTomorrow),
      count: "1 event",
      focus: "Quiet personal block",
      hint: "Personal space, no prep needed",
    },
    {
      id: "weekend",
      day: "Weekend",
      date: `${formatShortDate(weekendStart)}-${formatShortDate(weekendEnd)}`,
      count: "3 events",
      focus: "Home reset",
      hint: "Chores and shared planning stay grouped",
    },
  ];
}

export const connectedItems: ConnectedItem[] = [
  {
    id: "confirm-vet-documents",
    eventId: "vet-appointment",
    title: "Confirm vet documents",
    type: "Reminder",
    due: "Before 15:30 today",
    space: "Couple",
  },
  {
    id: "pick-up-pantry-basics",
    eventId: "shared-grocery-run",
    title: "Pick up pantry basics",
    type: "Chore",
    due: "Before grocery run",
    space: "Couple",
  },
  {
    id: "check-dining-budget",
    eventId: "review-monthly-budget",
    title: "Check dining budget",
    type: "Finance",
    due: "Before weekend plans",
    space: "Personal",
  },
];
