## Context

See `proposal.md` and the four capability deltas for the requested behavior. The landing currently renders the public voting UI and candidate photos alongside the invitation. The contest APIs already expose an `idle → open → closed` lifecycle, and visitor identity uses a same-site cookie with `Path=/`. Repository gallery photos are registered through a generated manifest; its preparation script is additive, while the movie carousel uses separate `/img/movies/` assets.

## Goals / Non-Goals

**Goals:**
- Keep the invitation page light by moving candidate browsing and voting to a dedicated same-origin route.
- Reuse the existing contest lifecycle, visitor identity and admin roles.
- Keep static featured photos, contest candidates and movie inspiration as distinct presentation concerns.
- Keep personal transfer data out of tracked source files while showing a useful placeholder before configuration.

**Non-Goals:**
- A separate subdomain, login for voters, or a new voting identity system.
- The Muro del Afecto; dedications remain optional RSVP content and are not shown publicly.
- A dedicated fix for Chrome Android's visual-viewport resize while scrolling; revisit only if a simple, low-risk fix is found during implementation.
- Configuring real recipient or account details before Juli provides them.

## Decisions

### Use a same-origin `/votar` route

The voting view will be an Astro page on the existing host. This keeps the current visitor cookie available across the landing and vote view and avoids adding DNS, proxy or cookie-domain configuration. A separate subdomain is unnecessary for isolating the page's content and image load.

### Use contest state as the public access gate

The landing page will show the vote link only in `open`; it will not include candidate photos. The `/votar` page and its public candidate-photo response will check the contest state before returning candidates. When idle or closed, a direct visit to `/votar` shows an unavailable message without candidates or vote controls. Closing continues to reveal winners on the landing page after the existing suspense interval.

Juli and the organizer already have authenticated sessions and contest controls. Keep both roles able to open voting; do not introduce another permission or operator workflow.

### Keep only the requested static photo assets

Show julifiesta below the location and julilogramos before the playlist as direct static assets. Remove the strip UI, likes, strip upload destination and strip-only public listings. Keep the contest photo flow and the movie carousel. Delete only unreferenced generated files under `/img/photos/`; retain every file referenced under `/img/movies/`, even where the subject or filename is similar. Regenerate the gallery manifest through its script rather than editing generated output manually.

Old strip-only database registrations and like counts have no public or admin surface after the change; avoid destructive database cleanup unless implementation discovers a concrete need. Existing contest votes, candidate files and frozen category snapshots remain intact.

### Keep awards as the single source for previews and contest snapshots

Update the award data before opening a new contest. Before `open`, show the first two existing categories as the agreed preview and the copy “y varias categorías más”; when open, reveal all ten and show the vote link. The contest snapshot remains immutable after opening. The two preview categories are an assumption for this proposal and can be changed before implementation without changing the route or state model.

### Read gift transfer details at server runtime

The Regalos section will display a placeholder when no transfer details are configured. When provided later, the server-rendered page will read the alias and recipient/account fields from environment variables; do not commit those values or expose them through client-side configuration. Since the details are intended for invitees, they will still be visible in the rendered public page when configured.

## Risks / Trade-offs

- **An existing contest may already have a frozen category snapshot** → The updated award list applies to the next opening, not an open or closed snapshot. Deploy before the event; use the existing reset only for pre-event rehearsal, never to replace an active event's results.
- **Candidate photos can still make the vote route image-heavy** → Keep the page focused on the current category and use browser-native lazy image loading; avoid pagination until actual device testing shows it is needed.
- **The photo generator preserves stale WebP files** → Explicitly remove only verified unused `/img/photos/` outputs before regenerating the manifest, and check all movie-carousel references remain valid.
- **Transfer environment values are absent or incomplete** → Keep the placeholder until all required values are configured; do not render partial or invented payment details.

## Migration Plan

1. Update the awards list and landing content, then add `/votar` and gate public candidate loading on the existing contest state.
2. Remove strip UI and its public/admin behavior; keep contest candidates and static assets referenced by the landing or movie carousel.
3. Remove only unused tracked photo-gallery WebPs and regenerate the gallery manifest. Leave historical strip-only database rows and likes inert rather than adding a destructive database migration.
4. Deploy before the event. Confirm the contest is idle before opening so its snapshot captures the ten updated categories; exercise reset only during rehearsal.
5. Add real gift environment values later, once provided. Without them the public section remains a placeholder.

Rollback is an application release rollback. The change does not require deleting contest votes, candidate uploads or frozen contest data. Any removed static WebP can be restored from the prior revision if needed.
