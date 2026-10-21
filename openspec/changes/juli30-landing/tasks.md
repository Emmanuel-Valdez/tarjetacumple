## 1. Project scaffold

- [x] 1.1 Initialize Astro project (SSR, TS, Tailwind) and verify `npm run dev` starts
- [x] 1.2 Add Drizzle + better-sqlite3 and verify DB file is created on startup
- [x] 1.3 Create Dockerfile and docker-compose.yml and verify image builds
- [x] 1.4 Add Nginx config (TLS, security headers) and verify config validates

## 2. Database schema

- [x] 2.1 Define tables (rsvps, photos, likes, playlist_tracks) and verify migration runs
- [x] 2.2 Add seed/placeholder data and verify rows exist

## 3. Landing page

- [x] 3.1 Build hero with name, phrase and countdown; verify renders
- [x] 3.2 Add location section with map link; verify link opens
- [x] 3.3 Add dress code section; verify renders
- [x] 3.4 Add costume carousel (22 refs); verify navigation works

## 4. RSVP

- [x] 4.1 Build RSVP modal (focus trap, ESC, focus return); verify a11y
- [x] 4.2 Implement RSVP API + persistence; verify POST stores row
- [x] 4.3 Add live counter (polling 15s); verify updates
- [x] 4.4 Add dedication field; verify stored and hidden from Juli

## 5. Playlist

- [x] 5.1 Embed Spotify player; verify renders
- [x] 5.2 Add track submission form + list; verify persists
- [x] 5.3 Add search-on-Spotify link per track; verify link

## 6. Gallery

- [x] 6.1 Build IG-style grid; verify renders
- [x] 6.2 Build carousel view; verify navigation
- [x] 6.3 Implement like API with anonymous cookie; verify persists and dedups

## 7. Admin panel

- [x] 7.1 Implement dual login (Juli / organizer); verify auth
- [x] 7.2 Build RSVP list + delete; verify actions
- [x] 7.3 Add copy/export RSVP list; verify clipboard
- [x] 7.4 Build photo upload (validate type/size); verify stored
- [x] 7.5 Role-based dedication visibility; verify Juli can't see them
- [x] 7.6 Manage songs (list/delete) and photos (list/delete) from admin
- [x] 7.7 Resize uploads to WebP with sharp (max 1600px, 12MB input cap)

## 8. Deploy & CI/CD

- [x] 8.1 Create GitHub Actions (build → push → deploy); verify pipeline
- [ ] 8.2 Configure VPS env and deploy; verify site live at subdomain
- [ ] 8.3 Configure DNS + Cloudflare Full strict; verify HTTPS

## 9. Contenido y diseño (v2)

- [x] 9.1 Datos centralizados en `src/data/` (evento, disfraces, premios)
- [x] 9.2 Ubicación real: Camping Centro de Empleados de Comercio + link de Maps
- [x] 9.3 Sección "Premios de la Noche" con categorías en teaser (no reveladas)
- [x] 9.4 Hero con foto de fondo que entra nítida y se difumina al hacer scroll
- [x] 9.5 Galería: carrusel horizontal minimalista con scroll infinito, sin botones
- [x] 9.6 Fotos de ejemplo en las tarjetas de disfraces (WebP, 22 referencias)
- [x] 9.7 Copy de la playlist orientado a interacción ("¿Qué temazo no puede faltar?")
- [x] 9.8 Contador de confirmados cuenta personas (incluye acompañantes)

