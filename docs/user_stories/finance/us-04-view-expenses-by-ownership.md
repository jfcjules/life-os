# US-04 - View expenses by ownership

## User Story

As a Life OS user, I want to be able to see my expenses as Personal and Couple, so that I can understand which expenses belong to me individually and which are shared with my partner.

## Estado actual / Problem Statement

The Finance concept allows users to record and review expenses, but there is not yet a defined user-facing expectation for distinguishing personal expenses from couple expenses. Without this distinction, users cannot easily understand their individual spending versus expenses that are shared with their partner.

## Scope

- Add an **Ownership** field to the expense creation form.
- Require the user to select an ownership type when creating an expense: **Personal** or **Couple**.
- Set **Personal** as the default ownership selection when creating a new expense.
- Allow the user to change the ownership selection before creating the expense.
- Display the ownership clearly when viewing an expense in the expense history.
- Allow the user to edit the ownership of an existing expense.
- Allow the user to view **Personal** expenses separately from **Couple** expenses.
- Provide a clear ownership filter or selector in the expense history.
- Allow the user to switch between **All, Personal, and Couple** expenses.
- Display the total amount spent for the selected ownership type within the selected time period.
- Keep the Personal/Couple distinction simple and easy to understand.
- Keep the experience aligned with the calm Life OS visual language.

## Out of Scope

- Automatic determination of whether an expense is Personal or Couple.
- Splitting a single expense between Personal and Couple.
- Assigning an expense to multiple users.
- Detailed partner account management.
- Multiple household or family groups.
- Bank account or credit card integrations.
- Automatic synchronization of expenses between partners.
- Expense reimbursement or settlement calculations.
- Advanced financial reporting comparing Personal and Couple spending.

## Acceptance Criteria

1. The expense creation form includes an **Ownership** field.
2. The Ownership field provides two options: **Personal** and **Couple**.
3. **Personal** is selected by default when creating a new expense.
4. The user can change the ownership selection before creating the expense.
5. An expense cannot be created without an ownership value.
6. The selected ownership is saved as part of the expense.
7. The ownership type is clearly displayed when viewing an expense.
8. A user can edit the ownership of an existing expense.
9. The expense history provides a clear way to filter or switch between **All, Personal, and Couple** expenses.
10. Selecting **Personal** displays only Personal expenses.
11. Selecting **Couple** displays only Couple expenses.
12. Selecting **All** displays both Personal and Couple expenses.
13. The user can see the total amount spent for the selected ownership type within the selected time period.
14. Changing an expense's ownership updates the corresponding Personal/Couple view and totals.
15. The ownership functionality does not imply automatic classification, expense splitting, partner synchronization, reimbursement, or advanced household financial management are already available.
