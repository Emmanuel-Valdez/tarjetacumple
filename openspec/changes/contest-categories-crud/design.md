## Context

Contest categories currently live in `contest_categories` only as a snapshot created when the contest opens, seeded from the static `AWARDS` list. The admin panel has no way to inspect or adjust them beforehand. See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**
- Let the admin manage award categories before opening the contest.
- Preserve the frozen snapshot behavior after opening.
- Reuse the existing `contest_categories` table to avoid a schema migration.
- Keep the default award list as the starting point.

**Non-Goals:**
- Dynamic public landing rendering of edited categories; the landing keeps using `AWARDS` for its preview and winner reveal by slug.
- Drag-and-drop reordering or bulk import.
- Editing categories while the contest is open or closed.

## Decisions

- **Reuse `contest_categories` as the managed list.** It already has the required fields and foreign keys. Alternative: a separate template table gives cleaner separation, but adds migration and synchronization complexity for little benefit.
- **Guard mutations by contest status.** Create, update and delete are allowed only while the contest is idle. This protects the frozen snapshot after opening.
- **Seed defaults lazily.** If the contest is idle and has no categories, the admin list seeds them from `AWARDS` on first view. Reset also restores them. Alternative: seed only on reset would leave a fresh install with no visible categories.
- **Opening freezes current rows.** Opening no longer inserts `AWARDS`; it changes status only. If no managed categories exist, opening is rejected. Alternative: seed defaults on open, but that would silently undo an intentional deletion of all categories.
- **Reset restores defaults.** After clearing votes and winners, reset restores the default award categories so rehearsal can start again.
- **Slug is immutable.** It is generated when a category is created and is not edited afterwards, keeping winner reveal stable.
- **Dedicated admin API.** Add `src/pages/api/admin/contest-categories.ts` with GET/POST/PATCH/DELETE, following the existing admin resource pattern. The contest open/close/reset API remains separate.

## Risks / Trade-offs

- [Lazy seeding makes “delete all categories” temporary] → Deleting every category and then reopening the admin list reseeds defaults. This is acceptable because a contest with zero categories is not useful; the error on open still prevents running one.
- [Race between status change and mutation] → Each mutation checks contest status inside the request and SQLite serializes writes.
- [Existing production data] → Databases that already contain frozen categories keep them; idle databases receive defaults on first admin view.
- [Slug collisions] → New slugs are generated from the title and made unique on creation.

## Migration Plan

No database migration is required. Deploy the code; existing idle databases seed defaults on first admin view, and existing frozen categories remain unchanged. Rollback only requires reverting the code.
