# Life OS - Quick Add Flow

> Status: Ready for review
> Jira: LOS-5
> Date: August 9, 2026
> Scope: First interactive Quick Add design flow

---

# 1. Purpose

Quick Add is the primary fast-capture pattern in Life OS.

The user should be able to capture a life item without thinking about the underlying data model. The flow starts with a simple type choice, then transforms into a focused form for the selected item.

---

# 2. Entry Points

Quick Add can open from:

- The primary `+ Quick add` button in the Home header.
- Any Home Quick Add tile:
  - Expense
  - Reminder
  - Event
  - Grocery

Behavior:

- Header button opens the type selection state.
- Tile click opens the modal directly on that type's form.

---

# 3. Flow

```text
Click Quick add
  -> Modal opens
  -> Choose type
  -> Type-specific form
  -> Save
  -> Calm confirmation state
```

If the user enters from a tile:

```text
Click Expense tile
  -> Modal opens directly on Expense form
```

---

# 4. Modal States

## 4.1 Choose Type

The first modal state is a vertical list of chunky buttons.

Buttons:

- Expense
- Reminder
- Event
- Grocery

Design rules:

- Buttons should feel large and easy to choose.
- Each button includes a compact icon/key marker.
- The buttons fill the modal vertically, not as tiny pills or toolbar buttons.
- This state should feel like choosing the destination for a thought.

## 4.2 Type Form

After choosing a type, the same modal transforms into a form.

The header changes to the selected type:

- Add expense
- Add reminder
- Add event
- Add grocery

The form remains intentionally light. It captures enough information to create the item without overwhelming the user.

## 4.3 Confirmation

After saving, the modal shows a calm confirmation.

The prototype copy is:

```text
Added to Life OS
```

This confirms the pattern without implying backend persistence is finished.

---

# 5. First Form Fields

## Expense

- Amount
- Description
- Category
- Space

## Reminder

- Reminder
- Due
- Time
- Space

## Event

- Title
- Date
- Time
- Space

## Grocery

- Item
- Quantity
- Category
- Added by

These are design fields, not a finalized database schema.

---

# 6. Component Inventory

Quick Add introduces or extends these components:

| Component | Role |
| --- | --- |
| Modal shell | Focused overlay for capture flows. |
| Modal header | Title, helper context, close action. |
| Flow step chips | Choose type, Add details, Saved. |
| Chunky type button | Large vertical type selector. |
| Form field | Label + input pattern for compact capture. |
| Confirmation panel | Saved-state feedback. |
| Modal actions | Back, Save, Done, Add another. |

---

# 7. Acceptance Criteria Mapping

## Closed/entry state exists

Implemented through:

- Header `+ Quick add` button.
- Home Quick Add tiles.

## Selection state exists

Implemented as:

- Modal type selection with chunky vertical buttons.

## Type-specific form exists

Implemented for:

- Expense
- Reminder
- Event
- Grocery

## Confirmation state exists

Implemented as:

- `Saved` step with `Added to Life OS` confirmation.

## The flow feels fast and low friction

Design choices:

- One modal does the whole flow.
- Type selection is large and direct.
- Tile entry skips the type selection step.
- Forms use only four initial fields.

---

# 8. Open Follow-Ups

These should not block LOS-5:

- Replace text markers with a proper icon system.
- Decide final field requirements and validation.
- Define keyboard shortcuts for quick capture.
- Decide whether modal should become a bottom sheet on mobile.
- Connect the flow to real persistence once data models are approved.
