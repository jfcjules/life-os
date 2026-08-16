# US-02 - Add new budget

## User Story

As a Life OS user, I want to add a new budget, so that I can define how much I plan to spend and keep track of my spending within a specific limit.

## Estado actual / Problem Statement

The Finance concept allows users to keep track of their expenses, but there is not yet a defined user-facing expectation for how a person creates a budget. Without this functionality, users can record what they spend but cannot establish planned spending limits to give their monthly expenses meaningful context.

## Scope

- Allow the user to start adding a new budget from the Finance screen through a clear Add budget action.
- Open a modal with a form when the user selects the Add budget action.
- Capture the minimum required information needed to create a budget: budget name, amount, and budget period.
- Support optional budget metadata such as category or tags without making these fields required to create the budget.
- Include two modal actions: Create budget and Cancel.
- Create budget saves the budget and makes it available in the relevant finance context.
- Allow the user to see their expenses in relation to the applicable budget.
- Allow the user to remove an existing budget through a clear delete or remove action.
- Require the user to confirm before removing a budget to prevent accidental deletion.
- Removing a budget removes it from the relevant finance context without deleting the expenses associated with it.
- Cancel closes the modal and discards any information entered in the form.
- Keep the budget creation flow atomic for now: no drafts, autosaves, partial saves, or saved incomplete budgets.
- Keep the experience aligned with the calm Life OS visual language.

## Out of Scope

- Automatic budget recommendations.
- Automatic adjustment of budgets based on spending behavior.
- Bank account or credit card integration.
- Automatic transaction imports.
- Notifications or alerts when approaching or exceeding a budget.
- Advanced budgeting methods such as envelope budgeting or zero-based budgeting.
- Shared budgets or household budgets.
- Drafts, autosaves, partial saves, or recovery of canceled budget creation progress.

## Acceptance Criteria

1. A user can identify a clear action for adding a budget from the Finance screen.
2. Selecting the Add budget action opens a modal with a form for creating a budget.
3. The form requires the minimum information needed to create a budget: budget name, amount, and budget period.
4. Optional budget metadata, such as category or tags, is not required to create a budget.
5. The modal includes Create budget and Cancel actions.
6. Selecting Create budget creates the budget and adds it to the appropriate finance context.
7. The applicable expenses can be viewed in relation to the created budget.
8. A user can identify a clear action for removing an existing budget.
9. Selecting the remove action requires confirmation before the budget is deleted.
10. Confirming the removal deletes the budget without deleting the expenses associated with it.
11. Selecting Cancel during budget creation closes the modal, discards the entered information, and does not create a draft, partial save, or budget.
12. The budget creation and removal experience does not imply automatic recommendations, notifications, bank integrations, or advanced budgeting functionality are already available.
