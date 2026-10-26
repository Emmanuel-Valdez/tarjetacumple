## 1. Category API

- [x] 1.1 Create `src/pages/api/admin/contest-categories.ts` with authenticated GET that returns managed categories ordered by position and id, seeding defaults from `AWARDS` when the contest is idle and empty, and verify `npm run check` passes.
- [x] 1.2 Add authenticated POST to create a category with title, emoji and teaser, generating a unique slug, appending it at the end, and rejecting invalid input, and verify a created category appears in GET.
- [x] 1.3 Add authenticated PATCH to update title, emoji, teaser and position only while the contest is idle, and verify updates are rejected when the contest is open or closed.
- [x] 1.4 Add authenticated DELETE by id only while the contest is idle, and verify deletion is rejected when the contest is open or closed.

## 2. Contest lifecycle

- [x] 2.1 Update `src/pages/api/admin/contest.ts` open action to freeze existing managed categories instead of inserting `AWARDS`, and reject opening when no categories exist, and verify opening with categories keeps them unchanged.
- [x] 2.2 Update reset action to restore default award categories from `AWARDS` after clearing votes and winners, and verify reset returns the managed list to the defaults.
- [x] 2.3 Keep open action idempotent for an already open contest, and verify reopening does not duplicate or alter categories.

## 3. Admin UI

- [x] 3.1 Add a "Categorías" section to `src/pages/admin/index.astro` that lists managed categories before the contest opens, and verify categories are visible while idle.
- [x] 3.2 Add create and edit forms with title, emoji and teaser fields, disabling them when the contest is not idle, and verify create/edit calls update the list.
- [x] 3.3 Add delete buttons with confirmation, disabled when the contest is not idle, and verify deletion updates the list.
- [x] 3.4 Show contest status feedback for category operations, and verify errors are displayed without breaking RSVP, track, photo or contest sections.

## 4. Verification

- [x] 4.1 Run `npm run check` and `npm run build`, and verify both pass.
- [x] 4.2 Manually verify in the admin panel: view defaults while idle, edit and delete a category, create a category, open contest and confirm edits are frozen, then reset and confirm defaults return.
