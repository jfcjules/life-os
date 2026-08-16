# US-07 - Add and edit income

## User Story

As a Life OS user, I want to add and edit my income, so that I can keep track of the money I receive and maintain an accurate view of my finances.

## Estado actual / Problem Statement

The Finance concept allows users to record and manage expenses and budgets, but there is not yet a defined user-facing expectation for how income is added or updated. Without income tracking, users cannot see a complete picture of their finances or compare the money they receive with their spending and budgets.

## Scope

- Allow the user to start adding a new income entry from the Finance screen through a clear Add income action.
- Open a modal with a form when the user selects the Add income action.
- Capture the minimum required information needed to create an income entry: income name, amount, and date.
- Support optional income metadata such as category, frequency, or tags without making these fields required.
- Include two modal actions: Add income and Cancel.
- Add income saves the income entry and makes it available in the relevant finance context.
- Allow the user to select an existing income entry and edit its information.
- Allow the user to update the income name, amount, date, and available optional metadata.
- Saving an edited income updates the existing entry rather than creating a duplicate.
- Cancel closes the modal and discards any changes made while editing.
- Keep the income creation and editing flow atomic for now: no drafts, autosaves, partial saves, or saved incomplete income entries.
- Keep the experience aligned with the calm Life OS visual language.

## Out of Scope

- Automatic income imports from bank accounts or financial services.
- Payroll or employer integrations.
- Tax calculations or tax management.
- Automatic income categorization.
- Investment or portfolio income tracking.
- Income forecasting.
- Notifications or reminders for expected income.
- Advanced recurring income management.
- Drafts, autosaves, partial saves, or recovery of canceled income creation or editing.

## Acceptance Criteria

1. A user can identify a clear action for adding income from the Finance screen.
2. Selecting the Add income action opens a modal with a form for creating an income entry.
3. The form requires the minimum information needed to create an income entry: income name, amount, and date.
4. Optional income metadata is not required to create an income entry.
5. The modal includes Add income and Cancel actions.
6. Selecting Add income creates the income entry and adds it to the appropriate finance context.
7. A user can select an existing income entry and access an edit action.
8. Editing an income entry allows the user to update its name, amount, date, and available optional metadata.
9. Saving an edited income updates the existing entry without creating a duplicate.
10. Selecting Cancel while editing closes the modal and discards any changes made.
11. An incomplete income entry is not saved as a draft or partial entry.
12. The income functionality does not imply automatic bank synchronization, payroll integrations, tax management, or income forecasting are already available.
