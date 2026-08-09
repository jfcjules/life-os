# Life OS - Design Components v1

> Status: Ready for review
> Jira: LOS-6
> Date: August 9, 2026
> Scope: Initial reusable design components in code

---

# 1. Purpose

This document records the first reusable design components extracted from the approved Life OS visual direction.

The goal is to preserve the design language in code without pretending that every product module is already defined. Until the core tools are reviewed and specified, the local app should render the application shell and sidebar, while Home remains intentionally empty.

---

# 2. Current Product Decision

Home should not show fake operational content while the product behavior for Finance, Reminders, Calendar, Groceries, Chores, and Settings is still being defined.

Current local app behavior:

```text
Life OS shell
  -> Sidebar with all MVP navigation on desktop
  -> Compact horizontal navigation on mobile/tablet
  -> Empty content area for every core route
```

The previously explored Home widgets and Quick Add flow are now reusable components, not committed product content.

---

# 3. Component Location

Reusable components live in:

```text
src/components/design-system/
```

Exports are centralized in:

```text
src/components/design-system/index.ts
```

---

# 4. Components

## 4.1 AppShell

File:

```text
src/components/design-system/app-shell.tsx
```

Role:

- Provides the main desktop app frame.
- Mounts the sidebar.
- Mounts compact mobile navigation.
- Provides the main content slot.

Current usage:

- Rendered by every empty workspace route.

## 4.2 Sidebar

File:

```text
src/components/design-system/sidebar.tsx
```

Role:

- Displays product identity.
- Displays Personal / Couple switch.
- Displays primary MVP navigation.
- Uses real routes instead of placeholder links.

Current nav items:

- Home
- Calendar
- Reminders
- Finance
- Groceries
- Chores
- Settings

## 4.3 Button and IconButton

File:

```text
src/components/design-system/button.tsx
```

Variants:

- `primary`
- `secondary`
- `ghost`

Role:

- Shared button styling based on approved Life OS tokens.
- IconButton keeps square utility controls consistent.

## 4.4 Panel and Card

File:

```text
src/components/design-system/card.tsx
```

Role:

- `Panel` frames larger content areas.
- `Card` frames smaller repeated content.

## 4.5 SectionHeader

File:

```text
src/components/design-system/section-header.tsx
```

Role:

- Standardizes section title and optional right-side action.

## 4.6 ListRow and PreviewCard

File:

```text
src/components/design-system/list-row.tsx
```

Role:

- Preserves the row and preview patterns explored in Home v1.
- Ready to reuse once module content is defined.

## 4.7 Quick Add Components

File:

```text
src/components/design-system/quick-add.tsx
```

Includes:

- `quickAddActions`
- `QuickActionTile`
- `QuickAddModal`

Status:

- Implemented as reusable design components.
- Not rendered on the empty Home screen until product behavior is confirmed.

## 4.8 EmptyWorkspace

File:

```text
src/components/design-system/empty-workspace.tsx
```

Role:

- Provides the empty route screen used by Home and core tool pages.
- Keeps the local app navigable without adding simulated product data.
- Gives each route a consistent title and empty panel while LOS-7 defines tool content.

---

# 5. Tokens

Tokens remain in:

```text
src/app/globals.css
```

Current token groups:

- Action colors
- Background and surface colors
- Text colors
- Subtle border
- Exploratory accents
- Azeret Mono font mapping

---

# 6. Acceptance Criteria Mapping

## Component list documented

Completed in this document.

## Each component has purpose and usage

Each component is documented with role and location.

## Tokens defined

Tokens are implemented in `src/app/globals.css` and referenced by components.

## Components cover Home and Quick Add without duplication

The previous Home and Quick Add visual work has been extracted into reusable components.

## Future screens can reuse the system

Future work from LOS-7 can import from:

```ts
import { AppShell, EmptyWorkspace, Panel, Card, Button } from "@/components/design-system";
```

---

# 7. Open Follow-Ups

- Replace temporary text markers with a proper icon system.
- Define true content models for each MVP tool after LOS-7 review.
- Decide whether Quick Add stays global or becomes contextual per tool.
