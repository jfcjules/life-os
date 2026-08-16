# US-01 - Add new expense

## User Story

As a Life OS user, I want to be able to add and remove expenses, so that I can see how much I spend and keep track of my monthly expenses.

## Estado actual / Problem Statement

The Finance concept is intended to provide a simple and clear view of the user's spending, but there is not yet a defined user-facing expectation for how expenses are added or removed. Without this functionality, users cannot reliably record their spending or maintain an accurate view of their monthly expenses.

## Scope

- Allow the user to start adding a new expense from the Finance screen through a clear Add expense action.
- Open a modal with a form when the user selects the Add expense action.
- Capture the minimum required information needed to create an expense: expense name, amount, and date.
- Support optional expense metadata such as category or tags without making these fields required to create the expense.
- Include two modal actions: Add expense and Cancel.
- Add expense saves the expense and makes it available in the relevant monthly finance context.
- Allow the user to remove an existing expense through a clear delete or remove action.
- Require the user to confirm before removing an expense to prevent accidental deletion.
- Removing an expense permanently removes it from the relevant finance context.
- Cancel closes the modal and discards any information entered in the form.
- Keep the expense creation flow atomic for now: no drafts, autosaves, partial saves, or saved incomplete expenses.
- Keep the experience aligned with the calm Life OS visual language.

## Out of Scope

- Bank account or credit card integration.
- Automatic transaction imports.
- External financial service synchronization.
- Income tracking.
- Budgets or spending limits.
- Recurring expenses or subscriptions.
- Advanced expense categorization or reporting.
- Receipt scanning or receipt uploads.
- Currency conversion.
- Drafts, autosaves, partial saves, or recovery of canceled expense creation progress.

## Acceptance Criteria

1. A user can identify a clear action for adding an expense from the Finance screen.
2. Selecting the Add expense action opens a modal with a form for creating an expense.
3. The form requires the minimum information needed to create an expense: expense name, amount, and date.
4. Optional expense metadata, such as category or tags, is not required to create an expense.
5. The modal includes Add expense and Cancel actions.
6. Selecting Add expense creates the expense and adds it to the appropriate monthly finance context.
7. A user can identify a clear action for removing an existing expense.
8. Selecting the remove action requires confirmation before the expense is deleted.
9. Confirming the removal deletes the expense and removes it from the appropriate finance context.
10. Selecting Cancel during expense creation closes the modal, discards the entered information, and does not create a draft, partial save, or expense.
11. The expense creation and removal experience does not imply bank integrations, automatic imports, recurring expenses, or advanced financial functionality are already available.
