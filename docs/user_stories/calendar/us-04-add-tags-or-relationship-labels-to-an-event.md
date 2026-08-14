# US-04 - Add tags or relationship labels to an event

## User Story

As a Life OS user, I want to add tags or relationship labels to an event, so that I can understand how the event connects to other parts of my life.

## Estado actual / Problem Statement

The Calendar concept is meant to show relationships between events and nearby life items such as reminders, chores, pet care, and finance context. Without a defined labeling expectation, the calendar may show events without the lightweight context that makes Life OS feel connected across life areas.

## Scope

- Allow an event to display a simple relationship label.
- Use initial relationship labels from the concept: Reminder, Chore, Finance, and Pet.
- Keep labels lightweight and scannable in the event row.
- Treat labels as conceptual product context for the first draft.
- Support events with no relationship label when no connection is needed.

## Out of Scope

- Custom user-created tags.
- Complex category management.
- Automatic tagging.
- Final database relationship modeling.
- Multi-step workflows triggered by a tag.
- Reporting or analytics by tag.

## Acceptance Criteria

1. A user can recognize when an event is related to another life area.
2. A user can see the relationship label directly in the calendar event row.
3. The labels use clear language that matches the first Calendar concept.
4. Events without labels still remain valid and understandable.
5. The use of labels does not make the calendar feel busy or overly technical.
6. The experience does not imply that final data relationships or automations are already decided.
