# Calendar User Stories

> Status: Draft
> Source: `docs/calendar_settings_content.md`
> Mockup: `src/app/calendar/page.tsx`

This folder documents the first user stories for the Life OS Calendar concept.

## Proposed Stories

- Create new calendar event: Allow the user to open an Add event modal, enter the minimum required event details, optionally add recurrence or tags, and either create the event or cancel without saving progress.
- View today's events: Show a "Today's events" card when the user opens Calendar, with the displayed day and event rows ordered by when they happen during the day.
- View weekly summary: Show a compact view of upcoming days with event counts or the most important event per day.
- Assign event to a space: Let the user associate each event with Personal or Couple so the calendar can distinguish individual and shared life context.
- Add tags or relationship labels to an event: Let the user mark an event as related to Reminder, Chore, Finance, Pet, or another approved category.
- Filter calendar by space: Let the user switch between All, Personal, and Couple calendar views.
- View basic event details: Show useful event information such as location, people, space, and relationship label.
- Show connected items for upcoming events: Surface related reminders, chores, pet care, or finance items that help the user prepare for events.
- Show calendar empty state: Provide clear empty-state copy and an action when no events exist.
- Switch between Today and Week views: Let the user alternate between a day-focused timeline and a weekly summary.
- Identify shared events: Make it clear when an event belongs to the Couple space.
- Document open calendar decisions: Capture unresolved product decisions such as default view, MVP categories, detail depth, recurrence, and sync.
- Prepare content for connected events: Define how events with preparation or follow-up context should be represented.
- Define minimum Add event behavior: Clarify the required fields and limits for the first Add event experience.

## Full Drafts

- [US-01 - Create new calendar event](./us-01-create-new-calendar-event.md)
- [US-02 - View today's events](./us-02-view-todays-events.md)
- [US-03 - Assign event to a space](./us-03-assign-event-to-a-space.md)
- [US-04 - Add tags or relationship labels to an event](./us-04-add-tags-or-relationship-labels-to-an-event.md)
- [US-05 - Filter calendar by space](./us-05-filter-calendar-by-space.md)
- [US-06 - Show connected items for upcoming events](./us-06-show-connected-items-for-upcoming-events.md)
