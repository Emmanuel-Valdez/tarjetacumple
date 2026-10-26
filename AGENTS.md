## Proyecto

Invitación web de cumpleaños con tema cine. Astro SSR + SQLite + Docker en producción.
Ver `README.md` para stack, comandos, API y deploy. Las specs vigentes viven en `openspec/specs/` (capabilities: `admin`, `contest`, `gallery`, `landing`, `music`, `playlist`, `rsvp`, `ui-quality`).
Los datos del evento (fecha, hora, lugar, dirección) están en `src/data/event.ts`: no los repitas en documentación, specs ni commits.

## Development

Levantá el dev server en background:

```
npx astro dev --background
```

Manejo: `astro dev stop`, `astro dev status`, `astro dev logs`.

Dos trampas:

- **No lo lances con `rtk`**: deja la sesión colgada. Ejecutalo crudo.
- **El dev server bloquea `openspec/changes/`**: `astro dev stop` antes de mover o renombrar un change, y volvé a levantarlo después.

Antes de tocar la UI, corré `npm run check` (tipos) y `npm run build` (SSR). El build valida el output de producción.

## Dónde tocar qué

- **Contenido** → `src/data/*.ts`. No hardcodear copy en los `.astro`.
- `src/data/movies.ts` es **generado** (`npm run movies:prepare`). `src/data/gallery.ts` también se genera (`photos:prepare`) pero hoy no lo consume ninguna página.
- Fotos nuevas → `src/img/` + `npm run photos:prepare`; pósters → `src/img/movies/` + `npm run movies:prepare`. Ambos scripts son aditivos.
- **APIs** → `src/pages/api/`. Toda mutación de admin valida `verifySession` (`src/lib/auth.ts`).
- **Concurso** → estado y congelado en `src/lib/contest.ts` + `src/pages/api/admin/contest.ts`. Abrir congela categorías de `awards.ts`; cerrar es definitivo; reset solo para ensayar.
- **Fotos subidas** → sharp (`src/lib/images.ts`) a WebP 1440 px en `UPLOADS_PATH`; se sirven por `/api/photos/[id]/file`. Las estáticas de `public/img/photos/` se sirven directo.

## Convenciones

- Español rioplatense en todo el copy visible.
- Zod para validar input de API. `sql` template de Drizzle, nunca strings concatenados.
- Tipografía: sans para información (`--font-sans`) y serif editorial para títulos de sección y hashtag (`.titulo-seccion`, `.hashtag`). El hashtag sale de `EVENT.hashtag`.
- Accesibilidad: HTML semántico, labels, foco visible, `prefers-reduced-motion`, `aria-live` solo en hitos.
- Mobile-first, touch targets ≥ 44 px.
- No commitear ni pushear sin pedido explícito. Secretos solo en `.env`.

## Seguridad (no romper)

- `SESSION_SECRET` es obligatorio en producción: `src/lib/auth.ts` tira error si falta o es el valor de dev.
- Cookies de sesión: httpOnly, SameSite=Lax, `Secure` cuando `NODE_ENV=production`.
- Un único rol admin: `juli` (ve dedicatorias).
- Rate limiting en login (`rateLimit` en `src/lib/auth.ts`).

## OpenSpec

Los cambios de alcance se documentan en `openspec/changes/`. Al terminar se archivan en `openspec/changes/archive/` y sus deltas se sincronizan a `openspec/specs/<capability>/spec.md`. Actualizá `tasks.md` al avanzar. Hay un change pendiente de archivar (`2026-10-23-tipografia-copy-hashtag`): su implementación está hecha pero sus deltas todavía no están en `openspec/specs/`.

## Documentación

Docs de Astro: https://docs.astro.build
