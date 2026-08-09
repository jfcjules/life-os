# Life OS - Design Concept A

> Status: First approved visual direction
> Document type: Design concept / visual specification
> Date: August 8, 2026
> Scope: Initial desktop Home concept and visual foundations
> Figma file: https://www.figma.com/design/SO9OLnGwCbUVieR5raX85k

---

# 1. Intent

Design Concept A establishes the first visual direction for Life OS.

The interface should feel like a calm personal operating system: soft, organized, premium, delicate, and comfortable to return to every day.

This concept should guide the first Figma explorations and the eventual implementation of the Home experience.

---

# 2. Product Feeling

The approved feeling for this direction is:

```text
Calm
Warm
Minimal
Premium
Soft
Organized
Personal
Approachable
```

Avoid:

```text
Generic SaaS dashboard
Corporate productivity software
Heavy analytics
Aggressive gradients
Excessive borders
High-density dashboards
Cold blue-only interfaces
```

---

# 3. Visual Language

## 3.1 Overall Composition

The first Home concept uses a desktop application shell:

- Left sidebar for primary navigation.
- Main content area for the day summary.
- Secondary right panel for contextual "life pulse" information.
- A large personal greeting to make the app feel human and calm.
- Quick actions near the top of the workflow.
- Overview widgets that summarize modules without turning Home into a reporting dashboard.

Home should aggregate information from modules instead of becoming a separate database.

## 3.2 Navigation

Navigation direction:

- Persistent left sidebar on desktop.
- Product mark and name at the top.
- Personal / Couple segmented context switcher near the top.
- MVP module links:
  - Home
  - Calendar
  - Reminders
  - Finance
  - Groceries
  - Chores
- Settings can live in the top-right utility area or later in the sidebar footer.

The active navigation item should use a subtle raised surface, not a loud selected state.

## 3.3 Home Structure

Initial desktop Home structure:

```text
Home
|
|-- Greeting
|   |-- Date
|   |-- "Good evening, Jules."
|   |-- Search
|   |-- Settings
|   |-- Quick add
|
|-- Today
|   |-- Calendar events
|   |-- Reminders
|   |-- Groceries
|   |-- Chores
|
|-- Quick Add
|   |-- Expense
|   |-- Reminder
|   |-- Event
|   |-- Grocery
|
|-- Overview
|   |-- Finance
|   |-- Chores
|   |-- Groceries
|
|-- Life Pulse
    |-- Day card
    |-- Upcoming items
    |-- Shared balance preview
```

---

# 4. Color Tokens

These tokens come from the current UX decisions and should remain semantic.

| Token | Value | Use |
| --- | --- | --- |
| `action-primary` | `#5F80D4` | Primary forward actions, such as Quick add, Save, Create, Continue. |
| `action-secondary` | `#CFD9F2` | Secondary actions, segmented controls, calm icon backgrounds. |
| `background-page` | `#E9ECF2` | Global page/application background. |
| `surface-content` | `#E3E9F7` | Cards, sections, panels, and content containers. |
| `surface-raised` | `#F1F4FA` | Slightly raised nested surfaces and controls. |
| `text-primary` | `#081120` | Main text. |
| `text-muted` | `#2D3542` | Metadata, labels, quiet helper text. |
| `border-subtle` | `rgba(8, 17, 32, 0.07)` | Soft structure for cards and rows. |

Supporting accent colors used lightly in Concept A:

| Token | Value | Use |
| --- | --- | --- |
| `accent-green` | `#7EA88B` | Positive or settled item dots. |
| `accent-lilac` | `#A594C7` | Gentle category accent. |
| `accent-rose` | `#D69BA8` | Grocery/care accent. |
| `accent-amber` | `#D5B276` | Upcoming or attention item accent. |

These accents are exploratory and not final product tokens yet.

---

# 5. Typography

Primary typeface:

```text
Azeret Mono
```

Usage direction:

- Use for navigation, labels, headings, buttons, dates, metadata, and UI text.
- Use weights `400` and `500`.
- Keep letter spacing at `0`.
- Avoid overly small text; metadata should remain readable.
- Validate long-form readability before using Azeret Mono for notes or dense paragraphs.

Initial scale direction:

| Role | Direction |
| --- | --- |
| Page greeting | Large, calm, personal. |
| Section heading | Small and structured. |
| Card title | Compact and clear. |
| Metadata | Quiet but readable. |
| Button label | Compact, direct, no marketing language. |

---

# 6. Shape, Spacing, And Elevation

## 6.1 Radius

Initial radius direction:

| Token | Value | Use |
| --- | --- | --- |
| `radius-sm` | `12px` | Icons, small controls. |
| `radius-md` | `18px` | Rows, quick action tiles, nested surfaces. |
| `radius-lg` | `28px` | Main cards and panels. |
| `radius-shell` | `34px` | Full app shell / large container. |

The radius system should feel soft but still intentional.

## 6.2 Spacing

Initial spacing direction:

- App shell padding: `28px` desktop.
- Sidebar padding: `26px 18px`.
- Section padding: `22px`.
- Card/tile padding: `14px` to `16px`.
- Section gap: `18px` to `24px`.
- Internal row gap: `10px` to `14px`.

Whitespace is part of the product feeling. Do not overpack Home.

## 6.3 Elevation

Use shadows sparingly.

Initial shadow direction:

```css
0 24px 70px rgba(8, 17, 32, 0.10)
0 16px 34px rgba(95, 128, 212, 0.24)
```

Use larger shadow only on the main app shell or major floating surface.
Use primary-tinted shadow only for primary actions or branded emphasis.

---

# 7. Components Direction

## 7.1 Buttons

Primary button:

- Fill: `action-primary`.
- Text: `text-primary` by default for current contrast decision.
- Radius: `14px`.
- Use for the one main forward action in an area.

Secondary button:

- Fill: `action-secondary` or `surface-raised`.
- Text: `text-primary` or `text-muted` depending on emphasis.
- Use for supportive or utility actions.

Icon buttons:

- Use familiar Lucide-style symbols.
- Keep buttons square or compact.
- Prefer icons for search, settings, sliders, arrows, and other common tools.

## 7.2 Cards And Panels

Cards should be quiet:

- Soft surface fill.
- Subtle border.
- Low or no shadow.
- Clear hierarchy through spacing and typography.

Do not nest heavy cards inside heavy cards.

## 7.3 Chips And Status

Chips should be small, calm, and informational.

Use them for source/type labels such as:

- Reminder
- Event
- Groceries
- Couple
- Personal

Avoid gamified or competitive labels for chores.

---

# 8. Figma File Structure

The new Figma design file starts with these pages:

```text
00 - Foundations
01 - Home
```

## 8.1 00 - Foundations

Contains:

- Color token swatches.
- Typography samples.
- Radius samples.
- Shadow samples.
- Notes about open decisions.

Current main frame:

```text
Life OS - Concept A Foundations
Figma node: 3:2
```

## 8.2 01 - Home

Contains:

- `Home - Concept A / Desktop`
- A frame around `1440 x 1024`.
- The first approved visual direction based on the in-conversation mockup.

Current main frame:

```text
Home - Concept A / Desktop
Figma node: 4:3
```

---

# 9. Open Decisions

The following are still open and should not be treated as final:

- Hover, active, focus, and disabled states.
- Final border color for cards and inputs.
- Final text color on primary buttons.
- Error, warning, success, and info colors.
- Full type scale.
- Whether Azeret Mono is enough for long reading.
- Final navigation behavior on tablet and mobile.
- Final Home widget set.
- Dark mode.
- Motion and transitions.

---

# 10. Current Approval And Figma Status

The user approved this first concept direction and requested it be documented and added to Figma.

Decision:

Concept A is accepted as the first visual direction to document and move into Figma.

Figma status:

- File created: `Life OS - Product Design`
- URL: `https://www.figma.com/design/SO9OLnGwCbUVieR5raX85k`
- Foundations page created.
- Home Concept A desktop frame created.
- Text uses `Azeret Mono` in Figma.
