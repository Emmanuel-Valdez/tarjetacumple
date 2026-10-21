## Proyecto

Invitación web de cumpleaños con tema cine. Astro SSR + SQLite + Docker.
Ver `README.md` para stack, comandos y deploy. `DECISIONS.md` tiene el historial de decisiones.
Los datos del evento (fecha, hora, lugar, dirección) están en `src/data/event.ts`: no los repitas en la documentación ni en el README.

## Development

Cuando levantes el dev server, usá background mode:

```
astro dev --background
```

Manejo: `astro dev stop`, `astro dev status`, `astro dev logs`.

Dos trampas:

- **No lo lances con `rtk`**: el wrapper no cierra la sesión y el comando queda colgado. Ejecutalo crudo (`npx astro dev --background`).
- **El dev server bloquea `openspec/changes/`**: mantiene un handle abierto sobre esas carpetas, así que `astro dev stop` antes de mover o renombrar un change (archivar) y volvé a levantarlo después.

Antes de tocar la UI, corré `npm run check` (types) y `npm run build` (SSR). El dev server ya hot-reloadea, pero el build es el que valida el output de producción.

## Dónde tocar qué

- **Contenido** (fecha, lugar, premios) → `src/data/*.ts`. No hardcodear en los `.astro`.
- `src/data/gallery.ts` es **generado**: se regenera con `npm run photos:prepare` (lee `src/img/`, escribe `public/img/photos/*.webp`). No editar a mano.
- Fotos nuevas → dejar en `src/img/` y correr `npm run photos:prepare`.
- Imágenes del carrusel de películas → `src/img/movies/` y `npm run movies:prepare`.
- Los dos scripts son **aditivos**: conservan los `.webp` ya generados aunque su original ya no esté en `src/img/`. Por eso podés borrar los originales.
- **APIs**: `src/pages/api/`. Mutaciones de admin siempre valida `verifySession` (ver `src/lib/auth.ts`).
- **Fotos subidas**: se reescalan a WebP con sharp (`src/lib/images.ts`), se guardan en `UPLOADS_PATH` y se sirven por `/api/photos/[id]/file`. Las de `public/` se sirven estáticas y se registran en la DB con `filename` empiezan en `/`.

## Convenciones

- Español rioplatense en todo el copy visible.
- Zod para validar input de API. `sql` template de Drizzle, nunca strings concatenados.
- Accesibilidad: HTML semántico, labels, foco visible, `prefers-reduced-motion` respetado, `aria-live` solo en hitos.
- Mobile-first, touch targets ≥ 44 px.
- No commitear ni pushear sin pedido explícito. Secretos solo en `.env`.

## Seguridad (no romper)

- `SESSION_SECRET` es obligatorio en producción: `src/lib/auth.ts` tira error si falta o es el valor de dev.
- Cookies de sesión: httpOnly, SameSite=Lax, `Secure` cuando `NODE_ENV=production`.
- Dos roles: `juli` (no ve dedicatorias) y `organizer` (las ve).
- Rate limiting en login (`rateLimit` en `src/lib/auth.ts`).

## OpenSpec

Los cambios de alcance se documentan en `openspec/changes/`. Al terminar, se archivan en `openspec/changes/archive/` y sus specs se sincronizan a `openspec/specs/<capability>/spec.md` (ahi vive la spec vigente). Los changes `juli30-landing` y `front-polish` ya están archivados; `openspec/specs/` tiene las 6 capabilities (admin, gallery, landing, music, playlist, rsvp). Actualizá `tasks.md` al avanzar.

## Documentación

Full documentation: https://docs.astro.build

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
