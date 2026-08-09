# Life OS - Home v1 Design Specification

> Status: Ready for review
> Jira: LOS-4
> Date: August 9, 2026
> Scope: Local high-fidelity Home mockup and implementation reference

---

# 1. Purpose

Home v1 turns the approved Concept A direction into a local, reviewable Next.js screen.

The goal is not to finalize every future product behavior. The goal is to close the first Home visual baseline so later screens can reuse the same layout language, spacing, typography, and component rules without depending on Figma.

---

# 2. Source References

Home v1 uses these sources in priority order:

1. The user's manually aligned Figma frame for `01 - Home`.
2. `docs/design_concept_a.md`.
3. `docs/ux_decisions.md`.
4. `docs/product_context.md`.

Figma remains a visual reference, but the working implementation source is now the local Next.js app.

---

# 3. Screen Structure

Desktop Home v1 uses a three-column application shell:

```text
Sidebar | Main Home Content | Life Pulse Panel
```

## 3.1 Sidebar

Includes:

- Product mark and name.
- Personal / Couple context switch.
- MVP navigation links.
- A compact day feeling card.

Design rules:

- Sidebar width: `260px` desktop.
- The day feeling card must not clip text.
- Active navigation uses a raised surface rather than a loud selected color.

## 3.2 Main Content

Includes:

- Date.
- Large personal greeting.
- Utility icon buttons.
- Primary Quick add button.
- Today section.
- Quick add section.
- Overview section.

Design rules:

- Main content must stay centered inside the shell.
- Section headers must align left with optional actions aligned right.
- Rows and tiles must avoid clipped text at desktop and tablet widths.

## 3.3 Life Pulse Panel

Includes:

- Date tile.
- Life pulse intro.
- Attention counters.
- Shared balance preview.
- Upcoming items.

Design rules:

- Date tile text is centered.
- The panel collapses away below wide desktop to protect main content.
- No text should overlap or escape cards.

---

# 4. Current Tokens

These tokens are implemented in `src/app/globals.css`.

| Token | Value | Usage |
| --- | --- | --- |
| `--color-action-primary` | `#5f80d4` | Primary actions and date tile emphasis. |
| `--color-action-secondary` | `#cfd9f2` | Secondary controls, chips, small icon backgrounds. |
| `--background-page` | `#e9ecf2` | Global app background. |
| `--surface-content` | `#e3e9f7` | App shell and soft content surfaces. |
| `--surface-raised` | `#f1f4fa` | Rows, tiles, nested controls. |
| `--text-primary` | `#081120` | Main UI text. |
| `--text-muted` | `#2d3542` | Supporting labels and metadata. |
| `--border-subtle` | `rgba(8, 17, 32, 0.08)` | Quiet structural borders. |

Exploratory accents:

- `--accent-green`
- `--accent-lilac`
- `--accent-rose`
- `--accent-amber`

---

# 5. Typography

Home v1 uses `Azeret Mono` through `next/font/google`.

Rules:

- Use `400`, `500`, and `600` weights only for now.
- Letter spacing remains `0`.
- Avoid metadata smaller than `11px`.
- Large greeting may use responsive sizing, but not viewport-only scaling across the whole UI.

---

# 6. Component Inventory From Home v1

These components should feed `LOS-6`.

| Component | Current role |
| --- | --- |
| App shell | Full Home container with sidebar, main content, and contextual panel. |
| Sidebar nav item | Primary navigation item with active and default states. |
| Segmented context switch | Personal / Couple context toggle. |
| Icon button | Search/settings style compact utility control. |
| Primary button | Forward action such as Quick add. |
| Section header | Section title with optional right action. |
| Today row | Time-based row with title, metadata, and tag. |
| Quick action tile | Entry point for Expense, Reminder, Event, Grocery. |
| Overview card | Module preview card for Finance, Chores, Groceries. |
| Pulse item | Small label/value row for contextual status. |

---

# 7. Acceptance Criteria Mapping

## Home v1 exists as a local mockup

Implemented in:

- `src/app/page.tsx`
- `src/app/globals.css`
- `src/app/layout.tsx`

## No obvious clipping or overflow

Design choices:

- Cards use explicit `min-height`, padding, and `min-w-0` where text can truncate.
- The right panel hides below `xl` width.
- The sidebar hides below `lg` width.
- Header utilities wrap under the greeting on narrower screens.

## Design language remains approved

Home v1 preserves:

- Soft blue system palette.
- Rounded shell and cards.
- Calm low-density composition.
- Large personal greeting.
- Home as aggregator, not data-entry database.

---

# 8. Open Follow-Ups

These should not block Home v1:

- Replace placeholder text icons with proper icon assets or an icon library.
- Define hover, active, disabled, and loading states.
- Decide if primary buttons keep dark text or move to a darker primary fill with white text.
- Capture desktop/tablet/mobile screenshots for a design review record.
- Extract repeated UI into reusable React components once Quick Add is designed.
