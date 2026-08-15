# Finance User Stories

> Status: Draft
> Source: [Confluence: Finances](https://jfcjules.atlassian.net/wiki/spaces/LO/pages/2261017/Finances)
> Mockup: `src/app/finance/page.tsx`

This folder documents the first user stories for the Life OS Finance concept.

## Implementation Plan

- [Finance implementation checklist](../../finance_implementation_checklist.md)
- [Finance implementation structure](../../finance_implementation_structure.md)

## Proposed Stories

- Add and remove expenses: Allow the user to create expenses with the minimum required information and remove existing expenses while keeping the creation flow atomic.
- Add new budget: Allow the user to create a budget with the minimum required financial information and make it available in the relevant Finance context.
- View expenses history: Show previously recorded expenses chronologically and allow the user to navigate between Weekly, Biweekly, and Monthly periods, with Monthly as the default.
- View expenses by ownership: Let the user classify each expense as Personal or Couple and filter the expense history by All, Personal, or Couple.
- Assign expenses and budgets to a user: Let the user associate an expense or budget with an available user while allowing items to remain unassigned when appropriate.
- Add due date and frequency to expenses and budgets: Allow users to define when expenses and budgets apply and whether they are one-time, weekly, monthly, or yearly.
- Add and edit income: Allow the user to create and update income entries so that income can be included in the user's overall financial context.
- Add tags to expenses and budgets: Let the user organize expenses and budgets using optional tags that can be added, changed, or removed.
- View income, expenses, and net savings: Show Income, Expenses, and Net Savings as summary totals together with a graph, using the same Weekly, Biweekly, and Monthly period selector as the expense history.
- Define financial ownership behavior: Establish Personal and Couple as explicit user-selected ownership values rather than automatically determining ownership.
- Connect shopping run totals to expenses: Allow a completed grocery shopping run to provide a total and send that amount to Finance as an expense without creating duplicates.

## Full Drafts

- [US-01 - Add new expense](./us-01-add-new-expense.md)
- [US-02 - Add new budget](./us-02-add-new-budget.md)
- [US-03 - View expenses history](./us-03-view-expenses-history.md)
- [US-04 - View expenses by ownership](./us-04-view-expenses-by-ownership.md)
- [US-05 - Assign expenses and budgets to a user](./us-05-assign-expenses-and-budgets-to-a-user.md)
- [US-06 - Set due date and frequency for expenses and budgets](./us-06-set-due-date-and-frequency-for-expenses-and-budgets.md)
- [US-07 - Add and edit income](./us-07-add-and-edit-income.md)
- [US-08 - Add tags to expenses and budgets](./us-08-add-tags-to-expenses-and-budgets.md)
- [US-09 - View income, expenses, and net savings](./us-09-view-income-expenses-and-net-savings.md)
