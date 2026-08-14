# US-02 - View today's events

## User Story

As a Life OS user, I want to see today's events in time order, so that I can quickly understand what is happening now and what needs my attention next.

## Estado actual / Problem Statement

The Calendar concept prioritizes a day-first layout, but the product still needs a clear expectation for what the user should see when they land on Calendar. If today's events are not presented clearly, the screen may feel like a generic calendar instead of a focused planning surface for the user's immediate day.

## Scope

- Show a "Today's events" card when the user opens Calendar.
- Make it clear which day the card is showing, using the same placement and visual treatment as the Calendar mockup date label.
- Show the selected day's events in an order that matches when they happen during the day.
- For each event item, show the event time when one exists, event title, description, Personal or Couple space, and one extra tag when available.
- Keep the event item layout aligned with the Calendar mockup's calm row/card treatment.
- Keep the "Today's events" card visually calm and easy to scan.

## Out of Scope

- Full event detail pages.
- Drag-and-drop rescheduling.
- Conflict detection.
- Calendar grid behavior.
- Empty state implementation for days without events.
- External calendar data.
- Showing all possible event metadata in the card.

## Acceptance Criteria

1. When a user opens Calendar, they can see a card labeled "Today's events."
2. The "Today's events" card shows which day is currently being displayed.
3. Events appear in an order that matches when they happen during the day.
4. Each event item shows the event time when one exists.
5. Each event item shows the event title and description.
6. Each event item shows whether the event belongs to Personal or Couple.
7. Each event item can show one extra tag when available.
8. The card layout and event item treatment match the established Calendar mockup style.
9. The view feels focused on planning the day rather than managing a complex calendar system.
