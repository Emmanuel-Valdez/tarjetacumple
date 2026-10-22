## 1. Update invitation content and award data

- [x] 1.1 Update the award data to the agreed ten categories, removing Casa de los Espellos and Esfuerzo Heroico and renaming Taquillazo to “Éxito de Taquilla”; verify the rendered category data has exactly ten stable slugs and no removed titles.
- [x] 1.2 Update the hero, combine dress code/adults-only/what-to-bring into compact cards, and place the featured photos and playlist in the specified order; verify at mobile and desktop widths that the copy is clear and no horizontal overflow appears.
- [x] 1.3 Add the Regalos section with a placeholder and optional server-side environment values; verify the placeholder renders when unset and configured values render without committing personal/account data.

## 2. Remove strip-only gallery behavior and assets

- [x] 2.1 Remove the public strips, like controls and strip-only client/API behavior; verify no strip markup or like controls remain and the contest photo flow still works.
- [x] 2.2 Limit admin photo listing, upload and deletion to contest candidates; verify there is no strip destination and fixed landing/movie assets do not appear as candidate CRUD items.
- [x] 2.3 Remove only unused generated files under `public/img/photos/`, retain julifiesta, julilogramos and every file referenced by the movie carousel, then regenerate the gallery manifest; verify every remaining image URL resolves and no movie-carousel reference was removed.

## 3. Separate and gate public voting

- [x] 3.1 Move the voting experience to the same-origin `/votar` page; verify a visitor can vote through all pending categories with the existing visitor cookie and that the landing page does not load candidate photos.
- [x] 3.2 Gate public candidate-photo responses on contest status; verify direct page and API requests return no candidates or controls while idle or closed, and return candidates only while open.
- [x] 3.3 Show only the two agreed preview categories plus “y varias categorías más” while idle, reveal all ten when voting opens, and show the `/votar` button only while open; verify idle, open and closed states, including winner reveal on the landing page.

## 4. Admin navigation and contest controls

- [x] 4.1 Add “Volver a la invitación” links to the admin panel and login page; verify both links navigate to the public landing page.
- [x] 4.2 Verify both Juli and organizer sessions can open and close voting, and that the landing CTA responds to the shared contest state without relaxing existing authentication checks.

## 5. Integration verification

- [x] 5.1 Run `npm run check` and `npm run build`; resolve any type or SSR build failures.
- [x] 5.2 Exercise the full idle → open → vote → closed flow with approximately 50 candidate photos; verify candidates stay off the landing page, the vote view remains usable on mobile, and winners reveal on the landing page.
