# Base Navigation V1

## Purpose

This layer gives Life OS a real local app skeleton without inventing unfinished product behavior.

The sidebar now routes to each core workspace, and every workspace renders an intentionally empty canvas. This keeps the app ready for implementation while LOS-7 defines what each tool should contain.

## Included Routes

- `/` - Home
- `/calendar` - Calendar
- `/reminders` - Reminders
- `/finance` - Finance
- `/groceries` - Groceries
- `/chores` - Chores
- `/settings` - Settings

## Reusable Component

`EmptyWorkspace` is the shared placeholder screen for core pages.

It includes:

- `AppShell`
- active sidebar state
- page eyebrow
- large page title
- empty content panel

## Design Rule

Do not add mocked product data to these pages until the corresponding concept and workflow are defined.

The reusable design components from LOS-6 can still be used for future screens, prototypes, and flow exploration, but the local app base should stay empty until each tool has a clear product definition.
