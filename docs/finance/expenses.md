# Finance Expenses Redesign

> Status: Design decisions ready for implementation
> Last updated: August 27, 2026
> Scope: Expenses section only

This document records the current redesign direction for the Finance Expenses
section. It should be used together with:

- `docs/user_stories/finance/us-01-add-new-expense.md`
- `docs/user_stories/finance/us-03-view-expenses-history.md`
- `docs/user_stories/finance/us-08-add-tags-to-expenses-and-budgets.md`

## 1. Source Direction

The redesign uses the user's Figma page `03 - expenses` as the primary product
direction, with selected structural references from the Youware expenses mockup.

Decisions from the references:

- Keep Life OS as the global app shell and navigation system.
- Use the `Expenses` page as a real tool screen, not a marketing or empty state.
- Keep the experience calm, light, compact, and operational.
- Preserve the large page title, short description, and top-right `Add Expense`
  action.
- Use a two-column desktop layout:
  - Main content: filters, sort controls, and expense history.
  - Right rail: period summary and selected expense detail.

## 2. Page Composition

The Expenses page should use this desktop structure:

```text
Expenses
  Header
    Title: Expenses
    Description: Track spending for the selected period.
    Primary action: Add Expense

  Controls
    Filters
      Category
      Goal
      Tag
      Period
        Weekly
        Bi-weekly
        Monthly
        Available period range

    Sort by
      Amount
        Highest
        Lowest
      Date
        Newest
        Oldest

  Main panel
    Expense count
    Expense rows

  Right rail
    Period spent
    Selected expense detail
```

The selected expense detail must live underneath `Period spent` in the right
rail. It should update when a user selects a row in the expense history.

`Filters` and `Sort by` should occupy the full available page width above the
main expense history and right rail. `Period spent` should align with the top of
the expense history card, not with the top of the controls.

## 3. Filters

The Expenses redesign supports four filters:

| UI label | Data field | Behavior |
| --- | --- | --- |
| Category | `category` | Filters expenses by category. |
| Goal | `goalId` | Filters expenses linked to a goal. |
| Tag | `tagIds` | Filters expenses by assigned tag. The UI label must be `Tag`, not `Tag ID`. |
| Period | `date` with `FinancePeriod` | Lets the user choose Weekly, Bi-weekly, or Monthly and then choose one available period range. |

The Period filter replaces the old inline period selector inside the expense
history card. The expense history card should not show previous/next arrows or
the Weekly / Bi-weekly / Monthly segmented control.

Period ranges must be generated from existing expense data. Do not show future
or empty ranges as options. For example, if the latest expense data is in August
2026, the Monthly period selector must not allow selecting July 2027.

Category, Goal, and Tag filtering should apply inside the selected Period.

If multiple filters are active, they should combine as an AND filter unless a
future product decision says otherwise.

## 4. Sort By

The Expenses redesign supports two sort groups:

| Sort group | Options | Behavior |
| --- | --- | --- |
| Amount | Highest, Lowest | Sorts by `amount`. |
| Date | Newest, Oldest | Sorts by `date`. |

Default sort should remain `Date -> Newest`, matching the current behavior of
showing the newest expenses first.

Only one sort option should be active at a time.

## 5. Expense Row

Each expense row should be compact and scannable. The row must support:

- Expense date.
- Expense name.
- Category or related metadata.
- Tags as small labels when present.
- Amount.
- Row actions next to the amount.

Row actions:

- Edit: icon-only button using a generic pencil icon.
- Remove: icon-only button using a generic trash icon or generic close icon.

The existing remove behavior should be reused. The edit action requires expense
editing behavior to be implemented or explicitly scoped in the implementation
pass.

## 6. Right Rail

The right rail should start with `Period spent`.

`Period spent` must show:

- Total amount spent in the selected period after active filters are applied.
- The count of expenses currently shown in the selected period.

Decision:

- `Period spent` reflects active filters so the summary matches the visible
  expense rows.

Below `Period spent`, show the selected expense detail. The detail should feel
like part of the right rail rather than a disconnected extra card.

## 7. Mobile Behavior

The Figma direction is desktop-first. The mobile implementation should preserve
the same information hierarchy:

- Header first.
- Filters and sort controls next.
- Expense list.
- Period spent and selected detail below the list, unless a later design chooses
  a drawer or modal detail pattern.

## 8. Out Of Scope For This Redesign Pass

- Bank imports.
- Automatic categorization.
- Advanced analytics.
- Receipt scanning.
- Custom date ranges.
- Splitting expenses.
- Reimbursement or settlement logic.
- External finance service sync.
