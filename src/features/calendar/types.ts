export type CalendarSpace = "Personal" | "Couple";

export type CalendarSpaceFilter = "All" | CalendarSpace;

export type CalendarRelation = "Reminder" | "Chore" | "Finance" | "Pet";

export type CalendarTone = "blue" | "green" | "lilac" | "rose" | "amber";

export type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt?: string;
  space: CalendarSpace;
  relation?: CalendarRelation;
  location?: string;
  people?: string;
};

export type WeekPreviewDay = {
  id: string;
  day: string;
  date: string;
  count: string;
  focus: string;
  hint: string;
};

export type ConnectedItem = {
  id: string;
  eventId: string;
  title: string;
  type: CalendarRelation;
  due: string;
  space: CalendarSpace;
};
