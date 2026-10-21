## Proyecto

Invitación web del cumpleaños 30 de Juli (10/01/2027, Mendoza). Astro SSR + SQLite + Docker.
Ver `README.md` para stack, comandos y deploy. `DECISIONS.md` tiene el historial de decisiones.

## Development

Cuando levantes el dev server, usá background mode:

```
astro dev --background
```

Manejo: `astro dev stop`, `astro dev status`, `astro dev logs`.

Antes de tocar la UI, corré `npm run check` (types) y `npm run build` (SSR). El dev server ya hot-reloadea, pero el build es el que valida el output de producción.

## Dónde tocar qué

- **Contenido** (fecha, lugar, disfraces, premios) → `src/data/*.ts`. No hardcodear en los `.astro`.
- `src/data/gallery.ts` es **generado**: se regenera con `npm run photos:prepare` (lee `src/img/`, escribe `public/img/photos/*.webp`). No editar a mano.
- Fotos nuevas → dejar en `src/img/` y correr `npm run photos:prepare`.
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

Los cambios de alcance se documentan en `openspec/changes/`. Specs por capability en `openspec/changes/juli30-landing/specs/`. Actualizá `tasks.md` al avanzar.

## Documentación

Full documentation: https://docs.astro.build

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
