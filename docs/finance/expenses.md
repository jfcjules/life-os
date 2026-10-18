# Finance Expenses Redesign

> Status: Approved visual direction — implementation in progress
> Last updated: October 17, 2026
> Scope: `/finance/expenses` only

## Purpose and guardrails

This document records the approved Expenses mockups and their implementation
direction. The screen stays within the existing Finance route, app shell,
expense model, filters, sorting, edit flow, and deletion confirmation.

This redesign does not add an active Personal/Couple data scope, a new Finance
route, aggregate data sources, new filters, or new finance rules.

## Page composition

```text
Expenses
  Heading and Add expense action
  In-page navigator
    Summary
    Details

  Summary view
    Monthly navigation and Category / Tags / Goals filters
    Focal monthly-spending surface
    Recent expense list
    Category bar reading

  Details view
    Category / Tags / Goals / Period / Sort controls
    Expense list
    Selected expense detail
```

The `Summary` / `Details` navigator is local to the Expenses screen. It does
not introduce a route, URL state, or a second Finance navigation system.

## Summary

Summary is monthly by design.

- Keep compact month navigation with previous/next arrows and a short month
  label.
- Keep the existing Category, Tag, and Goal filters. They apply to the monthly
  reading and remain shared with Details.
- Make monthly spending the only focal metric: it is editorial but contained,
  with a subtle cropped circle detail in the corner of the pale-blue surface.
- Present the leading categories as supporting readings, not separate metric
  cards.
- Show a concise list of current-month expenses and a `View details` action
  that switches to Details.
- Render a category bar chart using the existing expense categories. Expenses
  without a category appear as `Uncategorized`; no category is fabricated.

## Details

Details is the operational view.

- Use compact pill controls for Category, Tags, Goals, Period, and Sort.
- The Period control has a two-column popover: frequency on the left
  (Weekly, Bi-weekly, Monthly) and available data-backed ranges on the right.
  It must not offer future or empty ranges.
- Keep the existing sort options in a quiet `Sort` control: Date newest/oldest
  and Amount highest/lowest. The default remains Date newest.
- Do not repeat the old `Period spent` right rail or the generic quick-action
  card. Summary owns the high-level reading; Details focuses on the list and
  the selected item.

## Expense history and selection

The history is a single white data surface, not a stack of individually framed
cards.

- Keep Date, Expense, metadata, tags, amount, filtering, sorting, and empty
  states.
- A selected row uses the pale-blue focal surface.
- Edit and Remove use accessible icon-only buttons and are visible only in the
  selected row. Removing an expense continues to require the existing
  confirmation dialog.
- Selecting a row updates the detail card below the list. The selected expense
  remains local UI state; selection does not mutate the record.

## Detail card

The selected detail is directly below the history and spans the content width.

- Use the label `Detail`, then a restrained display amount and expense name.
- Show Date, Category, Tags, Budget, Goal, and Schedule as compact metadata.
- Keep amounts in comparison-heavy rows monospaced. Only the selected-detail
  amount may use the display serif, at a contained scale.

## Responsive behavior

- On compact widths, controls wrap without horizontal overflow.
- The header and local navigator remain visible before either view.
- Summary stacks its list and chart; Details keeps the expense list before the
  selected detail.
- Date, metadata, amount, and selected-row actions remain reachable without
  removing edit, deletion confirmation, filters, or keyboard focus.

## Out of scope

- Bank imports, automatic categorization, receipt scanning, custom date ranges,
  expense splitting, reimbursement or settlement rules, and external sync.
- New active-space behavior or changes to `ownership`.
- Changes to the existing expense data model, budget calculations, goal
  relationships, or deletion rules.
