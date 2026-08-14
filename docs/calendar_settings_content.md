# Life OS - Calendar y Settings Content Definition

> Status: Draft for Confluence
> Jira: LOS-9, LOS-12
> Parent: LOS-7
> Date: August 9, 2026
> Scope: Initial content definition for Calendar and Settings screens

---

# 1. Purpose

This document defines the first content direction for the Calendar and Settings screens in Life OS.

The goal is to clarify what each screen should contain before creating high-fidelity mockups or implementing real product behavior.

These screens should reuse the Life OS application shell, sidebar, tokens, panels, cards, section headers, buttons, and list-row patterns already defined for Home v1 and the reusable design system.

---

# 2. Shared Product Rules

- Keep the interface calm, minimal, premium, and approachable.
- Do not add fake operational data to the local app before the screen concept is approved.
- Prefer clear content hierarchy over dense dashboard behavior.
- Use Personal and Couple as the first spaces.
- Treat future spaces like Family, Roommates, and Household as future possibilities only.
- Favor connected life items without making the user understand the underlying data model.
- Document open decisions instead of silently turning assumptions into product requirements.

---

# 3. LOS-9 - Calendar

## 3.1 Screen Intent

Calendar should help the user understand what is happening today and this week across personal and shared life.

It should feel like a calm planning surface, not a busy enterprise calendar.

Calendar should make visible the relationship between events and nearby life items such as reminders, chores, shared plans, pet care, and possible finance context.

## 3.2 Primary User Questions

- What is happening today?
- What is coming up this week?
- Is this event personal, shared, or tied to another life area?
- Does anything need preparation or follow-up?

## 3.3 Initial View Recommendation

Use a day-first layout with a weekly preview.

Recommended hierarchy:

1. Header
2. View controls
3. Today timeline
4. This week preview
5. Connected items

This keeps the first version focused and avoids designing a full complex calendar system too early.

## 3.4 Header Content

Recommended content:

```text
Eyebrow: Life OS
Title: Calendar
Supporting text: See what is happening today and what needs a little preparation.
Primary action: Add event
Secondary action: Today
```

Notes:

- The supporting text should be calm and practical.
- The primary action opens an Add event modal for the first create-event flow.
- The Add event modal should require event name, date, and either an all-day selection or start and end time.
- The Add event modal may include optional recurrence and tag fields, but they should not be required to create an event.
- The Add event modal should include Create event and Cancel actions only.
- Create event should add the event to the relevant calendar context; Cancel should close the modal and discard progress.
- Do not support drafts, autosaves, partial saves, or saved incomplete events yet.
- The primary action may map to the existing Quick Add event pattern later.
- Do not introduce external calendar sync in this screen yet.

## 3.5 View Controls

Initial controls:

- Today
- Week

Future controls:

- Month
- Agenda

Decision:

The first concept should include Today and Week only. Month view is useful, but it can make the first mockup visually noisy and force layout decisions that are not needed yet.

## 3.6 Main Sections

### Today's Events

Role:

Show a card for the selected day's events when the user opens Calendar.

Content pattern:

```text
Card title: Today's events
Displayed day
Event time, when one exists
Event title
Event description
Space chip
Optional category or relationship chip
```

Examples of relationship chips:

- Reminder
- Chore
- Finance
- Pet

Events should be ordered by when they happen during the day. Space should show Personal or Couple. The extra chip is optional and should match the calm row/card treatment in the Calendar mockup.

These chips are conceptual labels for the design, not final database relationships.

### This Week Preview

Role:

Give the user a low-noise summary of the next few days.

Content pattern:

```text
Day label
Date
Event count or next important event
Space/category hint
```

Design direction:

Keep this as a compact row or soft card group. Avoid a dense grid with many tiny cells in the first concept.

### Connected Items

Role:

Surface items related to upcoming events.

Content pattern:

```text
Related item title
Relationship type
Due time/date
Space
```

Examples:

- A reminder attached to an event.
- A chore that needs to happen before a shared plan.
- A pet care item connected to a vet event.

Decision:

Connected items should be useful, not exhaustive. This section should show only items that help the user prepare or avoid forgetting something.

## 3.7 Filters And Spaces

Initial filter content:

- All
- Personal
- Couple

Possible future category filters:

- Home
- Pets
- Work
- Health

Decision:

The first visual concept should show Personal and Couple clearly, but should not create a complicated category filtering system.

## 3.8 Empty State

Recommended copy:

```text
No events here yet.
```

Optional supporting copy:

```text
When something is planned, it will show up here with its space and related reminders.
```

Primary action:

```text
Add event
```

## 3.9 Calendar Decisions Accepted For This Draft

- Calendar starts as a unified Life OS calendar.
- The first concept prioritizes Today and Week.
- Personal and Couple are the only required spaces for the first concept.
- Add event starts from the Calendar primary action and opens a modal form.
- The minimum required event creation fields are event name, date, and either all-day or start and end time.
- Recurrence and tags are optional in the create-event flow.
- Event creation is atomic: Create event saves the event, while Cancel discards progress without creating drafts or partial saves.
- Events may visually reference related reminders, chores, pets, or finance context.
- Month view, external calendar sync, notifications, advanced recurrence rules, and advanced sharing are not part of this first concept.

## 3.10 Open Calendar Decisions

- Should the default landing view be Today or Week?
- Which event categories are part of MVP versus later phases?
- How much event detail should appear before opening an event detail view?
- Should Calendar have a right-side context panel like Home v1?
- When should advanced recurrence, reminders, and external sync be designed?
- What is the final mobile layout for the timeline and week preview?

## 3.11 Acceptance Criteria Mapping

- Mockup direction exists: this document defines the content structure for the concept.
- Reuses Home v1 language: AppShell, sidebar, panels, cards, section headers, buttons, and list rows should be reused.
- Initial view is clear: Today plus Week is the recommended first structure.
- Categories/spaces stay calm: Personal and Couple are visible without creating noisy filters.
- Add event behavior is defined: the primary action opens a modal, requires minimum event details, supports optional recurrence and tags, and uses Create event or Cancel without drafts or partial saves.
- Calendar decisions are documented: accepted and open decisions are captured above.

---

# 4. LOS-12 - Settings

## 4.1 Screen Intent

Settings should provide a simple home for user profile, spaces, appearance, and general preferences.

It should feel clear and non-intimidating. The screen should not imply that Life OS already has complex admin, privacy, notification, billing, or integration systems.

## 4.2 Primary User Questions

- Who am I using Life OS as?
- Which spaces exist for my life?
- What basic preferences can I adjust?
- What settings are intentionally not available yet?

## 4.3 Initial View Recommendation

Use a grouped settings layout with calm sections.

Recommended hierarchy:

1. Header
2. Profile
3. Spaces
4. Appearance
5. General preferences
6. Not ready yet / future settings

This avoids a sprawling settings menu while still giving the screen enough substance.

## 4.4 Header Content

Recommended content:

```text
Eyebrow: Life OS
Title: Settings
Supporting text: Adjust the simple things that shape your Life OS.
Primary action: Save changes
Secondary action: Cancel
```

Notes:

- Save changes should only appear when editable settings are present or when a dirty state exists.
- The first mockup can show the action placement without implementing persistence.

## 4.5 Main Sections

### Profile

Role:

Show the basic identity for the current user.

Content pattern:

```text
Display name
Email
Avatar or initials
```

Initial fields:

- Name
- Email

Decision:

Do not design full account management yet. Authentication provider and account lifecycle are still open decisions.

### Spaces

Role:

Show the first organizational spaces in Life OS.

Initial content:

- Personal
- Couple

Content pattern:

```text
Space name
Short description
Status or role hint
Optional manage action
```

Recommended descriptions:

```text
Personal: Your individual life, tasks, and plans.
Couple: Shared plans, chores, groceries, and household context.
```

Decision:

Spaces are for organization first, not privacy separation. Avoid permissions-heavy language in the first concept.

### Appearance

Role:

Hold basic visual preferences without pretending the full theme system is decided.

Initial content:

- Theme: Light
- Accent: System default

Decision:

Do not expose deep color, typography, or layout customization yet. The design system is still being established.

### General Preferences

Role:

Capture simple defaults that help the user avoid repeated choices.

Potential content:

- Default space
- Start page
- Date format
- Time format

Decision:

These can be shown as content candidates in the concept, but final implementation should wait until product behavior is approved.

### Future Settings

Role:

Make intentionally unavailable areas visible as future product territory without making them interactive.

Possible future groups:

- Notifications
- Integrations
- Data export
- Privacy and security
- Billing

Decision:

These should not be implemented in the first Settings concept. If shown, they should appear as quiet disabled or "later" items, not as active features.

## 4.6 Empty Or Minimal State

Settings probably should not use a full empty state once the concept is implemented.

If profile data is unavailable, use calm fallback content:

```text
Profile details are not connected yet.
```

Avoid error-heavy wording unless something has actually failed.

## 4.7 Settings Decisions Accepted For This Draft

- Settings starts with grouped sections instead of a complex sidebar inside the screen.
- Profile, Spaces, Appearance, and General Preferences are enough for the first concept.
- Personal and Couple are the only spaces required in the first concept.
- Settings should avoid admin-heavy, privacy-heavy, or integration-heavy behavior for now.
- Future settings can be named, but should not be designed as working features yet.

## 4.8 Open Settings Decisions

- Which authentication provider will own profile and email editing?
- Can the user rename spaces in MVP?
- Can Couple include invitation/member management in MVP?
- Should appearance expose only Light mode first, or include Dark mode as disabled/future?
- Which general preferences are truly needed in MVP?
- Where should account deletion, data export, and privacy controls live later?

## 4.9 Acceptance Criteria Mapping

- Mockup direction exists: this document defines the content structure for the concept.
- Reuses Home v1 language: AppShell, panels, cards, section headers, buttons, and list rows should be reused.
- Initial structure is clear: Profile, Spaces, Appearance, and General Preferences are defined.
- Avoids premature complexity: admin, billing, integrations, advanced privacy, and notifications stay out of scope.
- Open decisions are identified: major Settings decisions are captured above.
- Settings decisions are documented: accepted and open decisions are captured above.

---

# 5. Recommended Confluence Placement

Recommended space:

```text
Life OS
```

Recommended page title:

```text
LOS-9 y LOS-12 - Contenido inicial de Calendar y Settings
```

Recommended parent page:

```text
LOS-7 - Disenar primeras pantallas nucleo de Life OS
```

If no Life OS space exists yet, create a project space with key:

```text
LOS
```

Suggested initial page hierarchy:

```text
Life OS
  Product Context
  UX Decisions
  Design System
  LOS-7 - Primeras pantallas nucleo
    LOS-9 y LOS-12 - Contenido inicial de Calendar y Settings
```

---

# 6. Sources

- Jira LOS-9: https://jfcjules.atlassian.net/browse/LOS-9
- Jira LOS-12: https://jfcjules.atlassian.net/browse/LOS-12
- Local source: docs/product_context.md
- Local source: docs/home_v1_design.md
- Local source: docs/design_components_v1.md
- Local source: docs/base_navigation_v1.md
- Local source: docs/quick_add_flow.md
- Local source: docs/ux_decisions.md
