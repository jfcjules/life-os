# US-05 - Assign expenses and budgets to a user

## User Story

As a Life OS user, I want to assign expenses and budgets to a user, so that I can keep track of who is responsible for each expense and budget.

## Estado actual / Problem Statement

The Finance concept allows users to create expenses and budgets, but there is not yet a defined user-facing expectation for how these financial items are associated with a specific user. Without this capability, it is difficult to distinguish who an expense or budget belongs to, particularly when managing personal and couple finances.

## Scope

- Allow the user to assign an expense to a user when creating or editing an expense.
- Allow the user to assign a budget to a user when creating or editing a budget.
- Provide a clear way to select an available user when making an assignment.
- Display the assigned user clearly when viewing an expense or budget.
- Allow the user to change or remove an existing assignment.
- Allow an expense or budget to remain unassigned when an assignment is not required.
- Ensure that assigning an expense or budget to a user does not change its amount, date, or other financial information.
- Keep the assignment experience simple and consistent with the calm Life OS visual language.

## Out of Scope

- Creating or managing user accounts.
- User authentication or permissions management.
- Automatically assigning expenses or budgets to users.
- Splitting an expense between multiple users.
- Splitting a budget between multiple users.
- Automatic synchronization between different users' accounts.
- Bank account or credit card integrations.
- Notifications or reminders related to assignments.
- Expense reimbursement or settlement calculations.
- Advanced household or family financial management.

## Acceptance Criteria

1. A user can assign an expense to an available user.
2. A user can assign a budget to an available user.
3. The user can select the assigned user when creating or editing an expense.
4. The user can select the assigned user when creating or editing a budget.
5. The assigned user is clearly displayed when viewing the expense or budget.
6. A user can change or remove an existing assignment.
7. An expense or budget can remain unassigned when no user is selected.
8. Changing an assignment does not modify the financial information associated with the expense or budget.
9. If no users are available for assignment, the expense or budget can still be created without an assigned user.
10. The assignment functionality does not imply user account creation, permissions management, expense splitting, reimbursement, or automatic synchronization are already available.
