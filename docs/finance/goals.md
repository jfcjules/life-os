# Goals Flow

## Purpose

Goals is a Finance section for planned savings, special purchases, and money intentions that do not behave like period-based budgets.

Budgets answer: "How much can I spend during this period?"
Goals answer: "What am I intentionally saving for, planning, or funding over time?"

Examples:

- Apartment improvements
- A trip
- Emergency fund
- A large purchase
- Moving costs

## Main Concepts

### Goal

A goal is the container for a financial intention.

Fields:

- Name, required
- Goal amount, optional
- Target date, optional
- Status, such as Active or Completed
- Planned items
- Savings
- Linked expenses

The goal amount is optional because a user may know what they are saving for before knowing the exact total.

### Planned Item

A planned item describes something the user expects to buy, pay for, or cover as part of the goal.

Examples for an apartment improvements goal:

- Paint
- Desk
- Lamps
- Shelves
- Repairs

Fields:

- Concept, required
- Estimated amount, optional

Planned items are not money saved and are not expenses. They represent the plan or breakdown behind the goal.

### Saving

A saving is money the user has set aside for the goal.

Fields:

- Concept, optional
- Amount, required
- Date, required
- Planned item, optional

Examples:

- Quincena agosto, $3,000, Aug 15
- Bonus, $5,000, Aug 30
- $1,000, Sep 1

Savings increase the saved amount for the goal.

Savings can be added at the goal level or from inside a planned item. When a saving is added from a planned item, it remains part of the goal's total saved amount and is also shown as linked to that planned item.

### Linked Expense

A linked expense is an expense that belongs to the goal.

Example:

- Expense: Paint purchase
- Amount: $1,850
- Goal: Apartment improvements
- Planned item: Paint

Linked expenses are money spent for the goal. They do not count as saved money.

## Goals List Flow

Finance includes Goals as a section alongside Expenses and Budget.

The Goals section keeps a design similar to Expenses and Budget. It shows a clear primary action to add a new goal.

Goal cards or list items should show:

- Goal name
- Goal amount, when available
- Target date, when available
- Amount saved so far
- Remaining amount, when a goal amount exists
- Progress bar, when a goal amount exists
- Status
- Collapsed Planned items section
- Collapsed Savings section
- Collapsed Linked expenses section

When there are no goals, the section shows an empty state with a clear Add goal action.

By default, a goal card only shows the global goal summary and progress bar. The user can expand the card sections to review planned items, savings, and linked expenses without moving to the side detail panel.

## Add Goal Flow

The user selects Add goal.

A modal opens and asks for:

- Goal name, required
- Goal amount, optional
- Target date, optional

The user can save a goal with only a name.

After saving, the goal appears in the Goals list using the same visual language as Expenses and Budget items.

## Goal Detail Flow

The user selects a goal from the Goals list.

The side goal detail panel shows:

- Goal name
- Goal amount, when available
- Target date, when available
- Saved amount so far
- Remaining amount, when a goal amount exists
- Spent amount from linked expenses
- Available amount
- Progress bar, when a goal amount exists
- Status and completion action
- Add saving action
- Add planned item action
- Mark completed action

Suggested calculations:

```text
savedAmount = sum(savings.amount)
spentAmount = sum(linkedExpenses.amount)
availableAmount = savedAmount - spentAmount
remainingAmount = goalAmount - savedAmount
progress = savedAmount / goalAmount
```

If the goal does not have a goal amount, the detail view should not show misleading percentage progress. It should still show the saved amount so far and any linked spending.

The side panel should not list planned items, savings, or linked expenses. Those records are concentrated inside the main goal card so the user can review the goal's working details in one place.

## Add Planned Item Flow

Inside a goal detail view, the user can add planned items.

The user selects Add planned item.

A modal opens and asks for:

- Concept, required
- Estimated amount, optional

After saving, the planned item appears inside the goal card's collapsed Planned items section.

If planned items have estimated amounts, the goal can show an estimated planned total.

```text
estimatedPlannedTotal = sum(plannedItems.estimatedAmount)
```

This total can help the user understand the likely size of the goal, especially when the goal amount has not been set yet.

Planned items are collapsed by default inside each goal card. When the user expands Planned items, each planned item shows:

- Concept
- Estimated amount, when present
- Amount saved toward that planned item
- Progress bar
- Spent amount linked to that planned item
- Add saving action

The planned item progress bar uses the amount saved for that planned item and its estimated amount. If the planned item has no estimated amount, it should still show saved amount without implying a misleading percentage.

## Add Saving Flow

The user can add savings from the side goal detail panel or from a planned item inside the main goal card.

The user selects Add saving.

A modal opens and asks for:

- Concept, optional
- Amount saved, required
- Date, required

After saving, the saving appears in the goal card's collapsed Savings section.

If the user started from a planned item, the saving is linked to that planned item and also contributes to the global goal saved amount.

The goal updates:

- Saved amount so far
- Remaining amount, when a goal amount exists
- Progress bar, when a goal amount exists
- Available amount

The planned item updates when the saving is linked to it:

- Planned item saved amount
- Planned item progress bar, when estimated amount exists
- Savings count or linked savings summary

## Link Expense Flow

When creating or editing an expense, the user can optionally link it to a goal.

The expense form includes:

- Goal, optional
- Planned item, optional and only available when a goal is selected

When an expense is linked to a goal:

- It appears in the Linked expenses section of that goal card.
- It contributes to the goal's spent amount.
- It reduces the available amount for the goal.
- It does not increase the saved amount.

Expenses can still exist without a linked goal.

An expense can be linked to a goal without being linked to a planned item.

Linked expenses are collapsed by default inside each goal card. When expanded, they show expense name, amount, date, and linked planned item when one exists.

## Progress And Summary Information

Goals should show summary information similar to the other Finance sections.

For goals with a goal amount:

- Saved so far
- Goal amount
- Remaining amount
- Available amount
- Spent amount
- Progress bar
- Collapsible planned items, savings, and linked expenses sections

Example:

```text
$12,000 / $30,000 saved
$18,000 remaining
$1,850 spent
$10,150 available
```

For goals without a goal amount:

- Saved so far
- Spent amount
- Available amount
- Target date, when available
- Estimated planned total, when planned items have estimates

Example:

```text
$4,500 saved so far
$900 spent
$3,600 available
No goal amount set
```

## Completion Flow

A goal can be marked as completed.

Recommended behavior:

- If saved amount is greater than or equal to goal amount, show a clear Mark as completed action.
- If the goal has no goal amount, allow manual completion.
- Do not automatically complete the goal without user action.
- Linked expenses do not block completion.
- Completed goals remain accessible but should not be mixed indistinctly with active goals.

Status examples:

- Active
- Completed

Future versions may add Paused or Archived if needed.

## Out Of Scope For First Implementation

The first implementation should not include:

- Bank integrations
- Automatic transfers
- Investment tracking
- Debt payoff planning
- Shared goals
- Notifications or reminders
- Forecasting or recommendations
- Automatic completion without user confirmation
