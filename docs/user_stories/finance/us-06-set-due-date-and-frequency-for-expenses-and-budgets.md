# US-06 - Set due date and frequency for expenses and budgets

## User Story

As a Life OS user, I want to select a due date and frequency for expenses and budgets, so that I can keep track of when they are due and how often they occur.

## Estado actual / Problem Statement

The Finance concept allows users to create expenses and budgets, but there is not yet a defined user-facing expectation for managing when they are due or how frequently they occur. Without this information, users cannot easily distinguish one-time financial items from recurring expenses or budgets, making it harder to plan and understand their upcoming financial obligations.

## Scope

- Allow the user to select a due date when creating an expense.
- Allow the user to select a due date when creating a budget.
- Allow the user to select a frequency for an expense.
- Allow the user to select a frequency for a budget.
- Support a one-time option for expenses and budgets that do not repeat.
- Support basic recurring frequencies such as weekly, monthly, and yearly.
- Display the selected due date and frequency when viewing an expense or budget.
- Allow the user to change or remove the due date and frequency after creation.
- Use the selected frequency to determine when the next occurrence of a recurring expense or budget applies.
- Keep the experience aligned with the calm Life OS visual language.

## Out of Scope

- Advanced custom recurrence rules.
- Automatic payment processing.
- Automatic bank or credit card synchronization.
- Notifications or reminders for upcoming due dates.
- Late payment tracking or penalties.
- Automatic generation of financial transactions.
- Complex fiscal periods or custom accounting schedules.
- Advanced recurring expense management.
- Automatic changes to budgets based on recurring expenses.

## Acceptance Criteria

1. A user can select a due date when creating an expense.
2. A user can select a due date when creating a budget.
3. A user can select a frequency when creating an expense.
4. A user can select a frequency when creating a budget.
5. The frequency includes a one-time option for items that do not repeat.
6. The frequency supports basic recurring options such as weekly, monthly, and yearly.
7. The selected due date and frequency are clearly displayed when viewing an expense or budget.
8. A user can change or remove the due date or frequency after the expense or budget has been created.
9. For recurring items, the selected frequency determines the next applicable occurrence.
10. A one-time expense or budget does not automatically create another occurrence.
11. The due date and frequency functionality does not imply automatic payments, notifications, bank synchronization, or advanced recurrence rules are already available.
