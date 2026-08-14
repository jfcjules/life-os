# US-01 - Create new calendar event

## User Story

As a Life OS user, I want to create a new event on my calendar, so that I can record what is planned and see it in my daily and weekly life context.

## Estado actual / Problem Statement

The Calendar concept shows planned events as part of a calm life planning surface, but there is not yet a defined user-facing expectation for how a person adds a new event. Without this story, the product cannot clearly support the basic calendar behavior that makes the Today timeline and weekly preview useful.

## Scope

- Allow the user to start adding a new event from the Calendar screen through a clear Add event action.
- Open a modal with a form when the user selects the Add event action.
- Capture the minimum required information needed to create an event: event name, date, and either an all-day selection or a defined start and end time.
- Support optional event metadata such as recurrence and tags without making either field required to create the event.
- Include two modal actions: Create event and Cancel.
- Create event saves the event and makes it available in the relevant daily and weekly calendar context.
- Cancel closes the modal and discards any information entered in the form.
- Keep the creation flow atomic for now: no drafts, autosaves, partial saves, or saved incomplete events.
- Keep the experience aligned with the calm Life OS visual language.

## Out of Scope

- External calendar sync.
- Advanced recurrence rules beyond a basic optional recurrence choice.
- Required tags or required relationship labels.
- Notifications or reminder scheduling.
- Advanced invite management.
- Month view or agenda view behavior.
- Drafts, autosaves, partial saves, or recovery of canceled event creation progress.

## Acceptance Criteria

1. A user can identify a clear action for adding an event from the Calendar screen.
2. Selecting the Add event action opens a modal with a form for creating a calendar event.
3. The form requires the minimum information needed to create an event: event name, date, and either an all-day selection or start and end time.
4. Recurrence and tags are optional and are not required to create an event.
5. The modal includes Create event and Cancel actions.
6. Selecting Create event creates the event and adds it to the appropriate calendar context.
7. Selecting Cancel closes the modal, discards the entered information, and does not create a draft, partial save, or calendar event.
8. The event creation experience does not imply external sync, notifications, advanced recurrence rules, or advanced sharing are already available.
