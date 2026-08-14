# US-03 - Assign event to a space

## User Story

As a Life OS user, I want to assign an event to a space, so that I can distinguish between my personal plans and shared plans.

## Estado actual / Problem Statement

Life OS uses Personal and Couple as the first spaces, and the Calendar concept depends on those spaces to explain whether an event belongs to individual or shared life. Without a clear space assignment expectation, events may lose important context and the user may not understand which parts of the calendar are personal versus shared.

## Scope

- Support Personal and Couple as the initial event spaces.
- Make the event's space visible in the event row.
- Include space assignment as part of event creation or event editing expectations.
- Use space language as organization context, not as a permissions model.
- Preserve the ability to view all spaces together.

## Out of Scope

- Family, Roommates, Household, or other future spaces.
- Permissions, privacy rules, or member roles.
- Invitations or household management.
- Space creation, deletion, or renaming.
- Event visibility rules beyond the visible Personal and Couple context.

## Acceptance Criteria

1. A user can tell whether an event belongs to Personal or Couple.
2. A user can choose Personal or Couple when defining an event.
3. A user can understand space assignment as organizational context.
4. Events from both spaces can still appear together when the user is viewing all calendar content.
5. The experience does not suggest that spaces already include advanced privacy or permission behavior.
