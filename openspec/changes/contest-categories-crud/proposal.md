## Why

Award categories are hardcoded in `src/data/awards.ts` and only inserted into `contest_categories` when the contest opens. Juli cannot review or adjust them before opening, so last-minute fixes require code edits or a full reset.

## What Changes

- Add an authenticated admin API for listing, creating, editing and deleting award categories while the contest is idle.
- Add an admin panel section to view categories before opening the contest and edit or delete them.
- Seed the default award categories from `AWARDS` when an idle contest has no categories yet.
- Change opening to freeze the currently managed categories instead of re-seeding `AWARDS`.
- Make reset restore the default award categories after clearing votes and winners.
- Block category mutations while the contest is open or closed.
- Update `admin` and `contest` specs for category management and lifecycle.

## Capabilities

### New Capabilities

- (none)

### Modified Capabilities

- `admin`: add requirements for award-category CRUD in the admin panel.
- `contest`: change category freezing, opening and reset behavior to use managed categories.

## Impact

- New API: `src/pages/api/admin/contest-categories.ts`
- Admin UI: `src/pages/admin/index.astro`
- Contest lifecycle: `src/pages/api/admin/contest.ts`
- Default seed source: `src/data/awards.ts`
- Specs: `openspec/specs/admin/spec.md`, `openspec/specs/contest/spec.md`
