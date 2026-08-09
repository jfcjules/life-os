# Life OS — Product Context & Working Agreements

> **Status:** Active product definition
> **Document type:** Product context / source of truth
> **Last updated:** August 7, 2026
> **Product:** Life OS
> **Repository:** `life-os`

---

# 1. Product Vision

## What is Life OS?

Life OS is a personal life-management application designed to help a person organize the different areas of their life in one calm, cohesive place.

The product should reduce the mental stress of having information scattered across multiple apps, notes, calendars, spreadsheets, reminders, and services.

Life OS should make the user feel:

* More organized
* Less mentally overloaded
* More in control
* Able to see what matters today
* Able to manage both individual and shared life
* Comfortable returning to the app every day

The product should feel less like a productivity tool and more like a **personal operating system for everyday life**.

---

# 2. Core Product Philosophy

Life OS should follow these principles:

### 2.1 Calm over complexity

The app should simplify life rather than create another system that requires constant maintenance.

Avoid unnecessary configuration and excessive dashboards.

### 2.2 One place for life

Life OS should connect information that is normally scattered across different apps.

Examples:

* Calendar
* Reminders
* Expenses
* Groceries
* Chores
* Pets
* Health
* Reading
* Entertainment
* Notes
* Files
* Wishlists

### 2.3 Contextual information

Information should be connected whenever possible.

Example:

A veterinary appointment can connect to:

`Calendar → Pet → Health record → Reminder → Expense → Finance`

A grocery purchase can connect to:

`Groceries → Expense → Finance`

A date night can connect to:

`Calendar → Couple → Wishlist / Places → Expense → Shared Finance`

The goal is for Life OS to understand relationships between information rather than treating every module as an isolated application.

### 2.4 Organization, not surveillance

The shared Couple experience exists primarily for **organization**, not privacy separation.

The goal is:

> "My life + our life"

rather than:

> "My private data vs. my partner's private data."

---

# 3. Product Structure

Life OS is organized around:

```text
LIFE OS
│
├── Home
│
├── Personal
│   ├── Finance
│   ├── Health
│   ├── Pets
│   ├── Reading
│   └── Entertainment
│
├── Couple
│   ├── Shared Finance
│   ├── Calendar
│   ├── Groceries
│   ├── Chores
│   └── Wishlist
│
├── Notes
│
├── Drive
│
└── Reminders
```

This is the current product architecture.

---

# 4. Personal vs Couple

Life OS has two major organizational contexts:

## Personal

Information related primarily to one person.

Examples:

* Personal finances
* Personal health
* Personal pets
* Reading
* Entertainment
* Personal notes
* Personal reminders

## Couple

Information shared between partners.

Examples:

* Shared finances
* Shared calendar
* Groceries
* Chores
* Shared wishlist
* Couple plans

The architecture should support additional shared contexts in the future, such as:

* Family
* Roommates
* Household

Do not implement these additional contexts unless explicitly requested.

---

# 5. Home / Dashboard

Home is the primary landing page.

Home should **aggregate information from other modules** rather than become another database of information.

## Home responsibilities

Show the user:

### Today

* Calendar events
* Reminders
* Chores
* Upcoming payments
* Relevant pet reminders
* Other important tasks

### Quick Actions

Examples:

* Add Expense
* Add Reminder
* Add Event
* Add Grocery
* Add Note

### Life Overview

Potential widgets:

* Finance
* Health
* Pets
* Reading
* Entertainment
* Chores

Example:

```text
Good evening, Jules.

Today
-----------------------------
6:00 PM   Walk Whisky
7:30 PM   Grocery shopping
9:00 PM   Game night

Quick Add
-----------------------------
+ Expense
+ Reminder
+ Event
+ Grocery

Overview
-----------------------------
Finance
Health
Pets
Reading
Chores
Entertainment
```

The exact UI is not finalized.

---

# 6. Modules

## 6.1 Finance

Finance is divided into Personal Finance and Shared Finance.

### Personal Finance

Core concepts:

* Expenses
* Income
* Budgets
* Recurring payments
* Subscriptions
* Savings goals
* Debt
* Categories
* Reports

### Expense

An expense should conceptually contain:

```text
amount
date
category
description
payment method
person
space
recurring
```

### Income

Conceptually:

```text
amount
date
source
category
person
space
recurring
```

### Shared Finance

Shared expenses should support:

* Amount
* Who paid
* Split
* Shared category
* Shared space

Example:

```text
Expense:
$500 Groceries

Paid by:
Jules

Split:
50 / 50
```

The system should be able to calculate the resulting balance between people.

---

# 6.2 Calendar

Calendar should be a unified calendar.

Events may belong to:

* Personal
* Couple
* Pets
* Work
* Home

An event conceptually contains:

```text
title
date
start time
end time
location
people
space
category
notes
```

Calendar views should eventually support:

* Day
* Week
* Month

---

# 6.3 Reminders

Reminders are actionable items with a due date/time.

Conceptually:

```text
title
due date
time
repeat
priority
person
space
related item
```

Reminders should be able to relate to other entities.

Example:

```text
Reminder
    ↓
Whisky vaccination
    ↓
Pet
```

---

# 6.4 Groceries

Groceries should prioritize speed and simplicity.

A grocery item conceptually contains:

```text
name
category
quantity
completed
added by
space
```

Example:

```text
Dairy
☐ Milk
☐ Yogurt
☑ Cheese

Produce
☐ Lettuce
☐ Tomatoes
```

The Couple grocery list should be shared and eventually synchronized in real time.

---

# 6.5 Chores

Chores represent recurring or one-time household tasks.

Conceptually:

```text
title
due date
repeat
assigned to
space
completed
```

Examples:

* Wash dishes
* Take out trash
* Laundry
* Clean bathroom

The purpose is coordination, not competition.

Avoid gamification that could make household chores feel adversarial unless explicitly requested.

---

# 6.6 Pets

Pets are first-class entities in Life OS.

The system should support multiple pets.

Current conceptual examples:

* Whisky
* Otto

Each pet can have:

### Profile

```text
name
photo
birthday
species
breed
weight
color
notes
```

### Health

* Vaccinations
* Medications
* Vet visits
* Deworming
* Health notes
* Documents

### Care

* Food
* Grooming
* Walks
* Habits

### Expenses

Pet expenses should connect to Finance.

### Reminders

Pet-related reminders should be connected to the pet when possible.

---

# 6.7 Health

Health is intended as a personal tracking system, not a medical application.

Potential tracking:

* Weight
* Calories
* Exercise
* Steps
* Sleep
* Habits
* Measurements
* Goals

A generic health record can conceptually contain:

```text
type
value
unit
date
notes
```

Examples:

```text
Weight
51.4 kg
August 7

Sleep
7.5 hours
August 7

Exercise
45 minutes
August 7
```

Do not introduce medical features, diagnosis, treatment recommendations, or clinical workflows without explicit product requirements.

---

# 6.8 Reading

Reading is a personal media-tracking module.

Statuses:

```text
Want to read
Reading
Finished
Paused
DNF
```

A book conceptually contains:

```text
title
author
cover
status
rating
started
finished
notes
```

Potential future features:

* Reading goals
* Quotes
* Reading statistics

---

# 6.9 Entertainment

Entertainment combines:

* Games
* Movies
* Series
* Anime

Rather than creating four completely different data models, the current conceptual direction is a generic `Media` entity.

```text
Media
----------------
title
type
cover
status
rating
started
finished
favorite
notes
```

Types:

```text
Game
Movie
Series
Anime
```

Potential statuses:

```text
Backlog
Playing
Watching
Completed
Dropped
Wishlist
```

Do not implement external APIs or automatic media metadata yet.

---

# 6.10 Notes

Notes provide flexible information storage.

Potential note types:

* Note
* Idea
* Journal
* List
* Couple

Notes may use tags such as:

```text
#work
#home
#ideas
#travel
```

Life OS does not need to become a full Notion replacement.

Keep the system lightweight.

---

# 6.11 Drive

Drive provides centralized file storage.

Potential folders:

```text
Personal
Couple
Pets
Finance
Home
Work
```

A file conceptually contains:

```text
name
url/path
type
size
uploaded
category
person
space
related item
```

Files should be linkable to other entities.

Example:

```text
Whisky_Vaccine.pdf
        ↓
Pet: Whisky
        ↓
Category: Medical
```

Do not implement complex cloud-storage integrations until explicitly requested.

---

# 6.12 Wishlist

Wishlist items can belong to:

* Personal
* Partner
* Shared

Conceptually:

```text
name
image
url
price
priority
category
person
space
notes
```

Potential future use:

* Gift ideas
* Shared purchases
* Travel ideas
* Household purchases

---

# 7. Core Data Model

The following entities are currently identified conceptually:

```text
User
Partner
Space

Expense
Income

Event
Reminder
Task

Pet
HealthRecord

Book
Media

Note
File
GroceryItem
WishlistItem
```

This is a **conceptual model**, not a finalized database schema.

Do not create migrations or database tables solely because an entity appears in this document.

---

# 8. Spaces

A `Space` represents the organizational context in which information lives.

Examples:

```text
Personal
Couple
```

Future possibilities:

```text
Family
Roommates
Household
```

Many entities should reference a Space.

Example:

```text
Expense
    ↓
Space = Couple
```

or:

```text
Expense
    ↓
Space = Personal
```

This is preferable to duplicating separate versions of every entity for personal and shared use.

---

# 9. Entity Relationships

Life OS should favor relationships between entities.

Examples:

```text
Pet
 ├── Health Records
 ├── Vet Events
 ├── Reminders
 ├── Expenses
 └── Files
```

```text
Event
 └── Reminder
```

```text
Grocery List
 └── Expense
```

```text
Wishlist Item
 └── Expense
```

```text
Book
 └── Notes
```

```text
Media
 └── Notes
```

The final implementation should use appropriate relational/database relationships rather than duplicating information.

---

# 10. MVP Scope

Life OS should NOT attempt to build every planned feature immediately.

## MVP — Phase 1

### Core

* Home
* Calendar
* Reminders
* Finance
* Groceries
* Chores

### MVP supporting functionality

* Authentication
* User profile
* Personal/Shared spaces
* Basic database
* Basic navigation
* Basic settings

---

# 11. Post-MVP

## Phase 2 — Personal Life

* Pets
* Health
* Reading
* Entertainment

## Phase 3 — Expansion

* Notes
* Drive
* Wishlist

## Phase 4 — Polish & Integrations

Potential future work:

* Animations
* Mobile optimization
* External integrations
* AI-assisted organization
* Advanced analytics
* Automation

Do not implement Phase 2+ features unless explicitly requested.

---

# 12. Design Direction

The intended visual identity is:

> **Premium + delicate + minimal + cozy**

The app should feel:

* Calm
* Warm
* Refined
* Personal
* Soft
* Modern
* Premium
* Approachable

Avoid:

* Generic SaaS dashboards
* Excessive blue
* Aggressive gradients
* Overly dense layouts
* Excessive borders
* Too many charts
* Visually noisy interfaces
* "Corporate productivity software" aesthetics

The visual direction can be described as:

> **Warm minimalism + soft editorial + modern productivity**

This is a design direction, not a finalized design system.

---

# 13. Design System — To Be Defined

The following still need to be decided in Figma:

* Primary color palette
* Accent colors
* Neutral colors
* Typography
* Font sizes
* Font weights
* Border radius
* Shadows
* Spacing system
* Icon system
* Button styles
* Input styles
* Cards
* Badges
* Charts
* Navigation
* Light mode
* Dark mode
* Motion / transitions

Do not invent a final design system without documenting the decision.

---

# 14. Figma Workflow

Figma will be used to define the product's visual language and UI.

Recommended sequence:

```text
Design Direction
        ↓
Color System
        ↓
Typography
        ↓
Spacing
        ↓
Components
        ↓
Navigation
        ↓
Home Wireframe
        ↓
Home High Fidelity
        ↓
MVP Screens
        ↓
Responsive Design
```

Initial design target:

**Desktop web application**

Later:

```text
Desktop
↓
Tablet
↓
Mobile
```

---

# 15. Initial MVP Screens

The first UI screens to design are:

1. Home
2. Finance Dashboard
3. Add Expense
4. Expense Detail
5. Calendar
6. Reminders
7. Groceries
8. Chores
9. Settings

Home should be designed first because it establishes the visual language for the rest of the product.

---

# 16. Product UX Principle

The user should not have to understand the underlying data model.

For example, the user should not need to think:

> "I need to create an Event entity and then associate a Reminder."

Instead:

> "I have a vet appointment. Remind me the day before."

The UI should handle relationships naturally.

---

# 17. Quick Actions

Life OS should make common actions extremely fast.

Potential global actions:

```text
+ Expense
+ Reminder
+ Event
+ Grocery
+ Note
```

Future possibilities:

```text
+ Chore
+ Pet record
+ Book
+ Media
+ Wishlist item
```

The exact quick-action system is not finalized.

---

# 18. Technical Context

The project currently uses:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Node.js
* Git
* GitHub
* Docker / Docker Desktop

The project was initialized using a Next.js App Router template with Tailwind and TypeScript.

The developer is currently learning programming and intends to use AI-assisted development extensively.

Therefore:

## Code should prioritize

* Readability
* Simplicity
* Maintainability
* Clear naming
* Small components
* Explicit architecture
* Beginner-friendly structure
* Good documentation

Avoid unnecessarily clever abstractions.

---

# 19. Working With Codex

Codex should act as a development partner, not as an autonomous product manager.

## Before implementing a major feature

Codex should:

1. Read this document.
2. Inspect the current repository.
3. Check existing documentation.
4. Check the current implementation.
5. Identify conflicts with existing architecture.
6. Explain the proposed implementation.
7. Ask for confirmation when the decision materially affects product architecture.

Do not silently redefine product requirements.

---

# 20. Source of Truth

Use this hierarchy:

```text
1. Explicit user decision
2. Current approved product documentation
3. Approved Figma design
4. Existing implementation
5. Codex assumptions
```

If implementation conflicts with an explicit product decision, the product decision wins.

If Figma conflicts with an older design assumption, the approved Figma design wins.

If something is unclear, do not invent a major product decision.

---

# 21. Documentation Rules

Product decisions should be documented.

Recommended documentation structure:

```text
docs/
│
├── PRODUCT_CONTEXT.md
├── PRODUCT_REQUIREMENTS.md
├── ARCHITECTURE.md
├── DATA_MODEL.md
├── DESIGN_SYSTEM.md
├── UX_FLOWS.md
└── DECISIONS.md
```

Not every file needs to exist immediately.

Start with:

```text
PRODUCT_CONTEXT.md
```

and create additional documents when the project grows.

---

# 22. Decision Log

Important product and technical decisions should eventually be recorded in:

`docs/DECISIONS.md`

Recommended format:

```md
## DEC-001 — Personal vs Couple organization

Date: 2026-08-07
Status: Accepted

Decision:
Life OS will organize information into Personal and Couple spaces.

Reason:
The distinction is primarily for organization, not privacy.

Consequences:
Entities should reference a Space rather than creating duplicated
personal/shared versions of the same entity.
```

---

# 23. Current Product Decisions

## Accepted

### Personal + Couple

Life OS will have individual and shared organization.

### Cozy premium aesthetic

The visual direction is:

> Premium, delicate, minimal, cozy.

### Connected modules

Modules should share relationships where appropriate.

### MVP

Initial MVP:

* Home
* Calendar
* Reminders
* Finance
* Groceries
* Chores

### Personal modules after MVP

* Pets
* Health
* Reading
* Entertainment

### Expansion modules

* Notes
* Drive
* Wishlist

---

# 24. Open Decisions

The following are intentionally NOT finalized yet:

* Final color palette
* Final typography
* Final logo / brand mark
* Final navigation design
* Exact dashboard layout
* Final database schema
* Authentication provider
* Backend architecture
* File-storage provider
* Calendar integration
* Notification system
* Mobile architecture
* External APIs
* AI features
* Subscription / monetization model

Do not treat these as decided.

---

# 25. Product Development Rule

Life OS should be built incrementally.

Preferred workflow:

```text
Define
  ↓
Document
  ↓
Design
  ↓
Approve
  ↓
Implement
  ↓
Test
  ↓
Review
  ↓
Document
```

Avoid:

```text
Idea
  ↓
Immediately code everything
  ↓
Discover requirements later
```

---

# 26. Current Project Status

As of August 7, 2026:

### Product

* Vision defined
* Architecture defined
* Main modules identified
* Conceptual data model defined
* MVP scope defined
* Initial design direction defined

### Design

* Figma work has not yet been finalized
* Design system is not yet finalized
* Home design is the next major design task

### Development

The Next.js project has been initialized.

The project is currently at the beginning of development.

---

# 27. Immediate Next Steps

The next task is:

## Design Direction

Define in Figma:

1. Color palette
2. Typography
3. Spacing
4. Border radius
5. Shadows
6. Icons
7. Buttons
8. Inputs
9. Cards
10. Navigation

Then:

## First Screen

Design:

**Home / Dashboard**

After Home is approved, use its visual language to design the remaining MVP screens.

---

# 28. Important Instruction to Codex

Do not rush into implementation.

At this stage, the goal is to collaboratively establish the product and design system.

When working on Figma/design-related tasks:

* Inspect existing Figma context if available.
* Do not arbitrarily invent product requirements.
* Keep the design consistent with the Life OS vision.
* Prefer calm, minimal, premium interfaces.
* Favor whitespace and visual hierarchy.
* Avoid excessive UI density.
* Keep interactions intuitive.
* Document significant design decisions.
* When a decision is ambiguous and materially affects the product, ask before committing.

When implementing approved designs:

* Follow the Figma design as closely as practical.
* Reuse components.
* Keep the code maintainable.
* Do not introduce unnecessary dependencies.
* Do not refactor unrelated parts of the application.
* Keep changes scoped to the requested task.

---

# 29. Current Goal

The immediate goal is:

> **Create the Life OS visual identity and first Home experience in Figma, then translate the approved design into the Next.js application.**

The product should ultimately feel like:

> **A beautiful, calm place where life makes sense.**

---

# End of Product Context
