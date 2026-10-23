# Tarjeta Cumple — Invitación web (Astro SSR)

Invitación web de cumpleaños con tema *fiesta en el cine*: disfraces de películas/series, premios "Oscar" votados por los invitados y playlist armada entre todos.

> **Sin datos personales en la documentación**: fecha, hora, lugar y dirección viven únicamente en `src/data/event.ts` y no se repiten acá, en `AGENTS.md` ni en las specs.

## Stack

- **Astro 7** (SSR, `@astrojs/node` standalone) + TypeScript + Tailwind 4
- **SQLite** con Drizzle ORM (better-sqlite3, WAL)
- **sharp** para reescalar/convertir imágenes a WebP
- **Docker Compose** + Nginx + Cloudflare (deploy en VPS Oracle)
- **OpenSpec** para specs y changes (`openspec/`)

Requiere Node 22.23.4 o superior (incluye los fixes de seguridad del 21/10/2026).

## Comandos

```bash
npm install
npm run dev              # http://localhost:4321
npm run build            # build SSR a dist/
npm run preview
npm run check            # astro check (tipos)

npm run db:generate      # generar migración drizzle
npm run db:migrate       # aplicar migraciones
npm run db:backup        # backup online del SQLite (incluye el WAL) a data/backups/
npm run db:clean         # borrar datos de prueba (rsvps, canciones, likes y fotos subidas)

npm run photos:prepare   # src/img/* -> public/img/photos/*.webp + fondos + gallery.ts
npm run movies:prepare   # src/img/movies/* -> public/img/movies/*.webp + movies.ts
npm run og:prepare       # public/img/og.png (1200x630) desde el fondo
```

Dev server en background:

```bash
npx astro dev --background
npx astro dev status
npx astro dev logs
npx astro dev stop
```

## Estructura

```
src/
  data/          # contenido: event.ts, awards.ts y movies.ts (generado)
  db/            # schema.ts (drizzle) + index.ts (conexión y migración)
  layouts/       # Layout.astro (head, OG, skip link)
  lib/           # auth.ts, visitor.ts, images.ts, contest.ts, env.ts
  pages/
    index.astro  # landing
    votar.astro  # votación del concurso
    admin/       # login + panel (RSVPs, canciones, fotos, concurso)
    api/         # endpoints (ver tabla abajo)
  styles/        # global.css (tokens de tema, tipografía y fondos)
drizzle/         # migraciones SQL + snapshots
scripts/         # preparación de imágenes, backup y limpieza
openspec/        # specs vigentes y changes
public/img/      # imágenes servidas y versionadas
data/            # db.sqlite + uploads (NO versionado)
```

## Contenido editable

| Archivo | Qué define |
|---|---|
| `src/data/event.ts` | fecha, hora, lugar, dirección, Maps, playlist de Spotify y hashtag |
| `src/data/awards.ts` | categorías del concurso (slug, título, descripción y emoji) |
| `src/data/movies.ts` | **generado** por `npm run movies:prepare` — carrusel de películas |

`src/data/gallery.ts` también se genera con `npm run photos:prepare`, pero hoy no lo consume ninguna página: las fotos que se votan se suben desde `/admin`.

## Concurso de premios

Máquina de tres estados en la tabla `contest` (fila única):

- `idle` → `open`: al abrir se congelan las categorías de `awards.ts` en la base.
- `open` → `closed`: al cerrar se calculan y congelan los ganadores. **Cerrar es definitivo.**
- `reset`: borra votos y ganadores y vuelve a `idle`. Pide escribir `reiniciar`; es solo para ensayar.

Los invitados votan en `/votar`, una foto por categoría, con la cookie anónima `visitor_id`. El orden de categorías es aleatorio y el tally no se muestra hasta el cierre. Las fotos candidatas solo se exponen mientras el concurso está abierto.

**Antes del evento**: ajustar `src/data/awards.ts`, hacer deploy y subir las fotos candidatas desde `/admin`. La noche del evento todo se maneja desde el panel.

## Roles del panel

- **Juli** (`juli`): RSVPs, canciones, fotos y concurso. No ve dedicatorias.
- **Organizadora** (`organizer`): lo mismo + dedicatorias, para el video.

## Variables de entorno

Copiá `.env.example` a `.env`.

| Variable | Para qué |
|---|---|
| `SESSION_SECRET` | Firma las cookies de sesión (HMAC). **Obligatorio en producción**; generá con `openssl rand -hex 32`. |
| `ADMIN_JULI_USER` / `ADMIN_JULI_PASSWORD` | Login de Juli |
| `ADMIN_ORGANIZER_USER` / `ADMIN_ORGANIZER_PASSWORD` | Login de la organizadora |
| `GIFT_ALIAS` / `GIFT_RECIPIENT` / `GIFT_ACCOUNT` | Datos de regalos (opcionales; sin alias y destinatario se muestra un placeholder) |
| `PUBLIC_SITE_URL` | URL pública para las etiquetas Open Graph |
| `DATABASE_PATH` | Ruta del SQLite (prod: `/data/db.sqlite`) |
| `UPLOADS_PATH` | Carpeta de fotos subidas (prod: `/data/uploads`) |
| `PORT` | Puerto del server (prod: `3000`) |

## API

| Endpoint | Método | Qué hace |
|---|---|---|
| `/api/rsvp` | GET / POST | contador de personas confirmadas / crear RSVP |
| `/api/tracks` | GET / POST | canciones de la playlist (agrega cualquier invitado) |
| `/api/photos` | GET | candidatas del concurso (solo con el concurso abierto) |
| `/api/photos/[id]/file` | GET | sirve una foto subida desde el volumen |
| `/api/contest` | GET | estado del concurso, categorías pendientes y ganadores al cerrar |
| `/api/contest/vote` | POST | voto por categoría (uno por visitante) |
| `/api/admin/login` · `/logout` | POST | sesión del panel |
| `/api/admin/rsvps` | GET / DELETE | listar y borrar RSVPs |
| `/api/admin/tracks` | GET / DELETE | listar y borrar canciones |
| `/api/admin/photos` | GET / POST / DELETE | listar, subir y borrar candidatas (409 para fotos del repo o con votos) |
| `/api/admin/contest` | GET / POST | tally por categoría / abrir, cerrar y reiniciar |

## Imágenes

- Las fotos estáticas del repo viven en `public/img/photos/` y se sirven directas; `src/img/` (fuentes) está gitignored.
- `photos:prepare` genera los `.webp` de las fotos, los dos fondos (`fondo-desktop.webp` horizontal y `fondo-mobile.webp` vertical) y `gallery.ts`. Es aditivo: conserva los `.webp` aunque su original ya no esté.
- `movies:prepare` genera el carrusel (360×480, q75).
- Las subidas del admin pasan por **sharp**: `rotate()` + resize a **1440 px** de lado mayor (sin agrandar) + WebP q80, con nombre UUID en `UPLOADS_PATH`. Tope de entrada: 12 MB. Se puede seleccionar más de una foto.
- El admin solo lista y borra fotos `contest` subidas: las del repo dan 409, y una foto con votos también.

## Backup

`npm run db:backup` usa `db.backup()` de better-sqlite3 y escribe `data/backups/db-<timestamp>.sqlite` (copia consistente que incluye el WAL). En producción:

```bash
docker compose exec app node ./scripts/backup-db.mjs
```

## Deploy

El build ocurre **en el VPS**; no se publica imagen.

1. En el VPS: `git clone <repo> /opt/juli30/app`, crear `/opt/juli30/app/.env` con las claves reales y `docker compose up -d` una vez para crear el volumen.
2. `git push master` dispara `.github/workflows/deploy.yml`: conecta por Tailscale y por SSH hace `git pull --ff-only && docker compose build && docker compose up -d` en `/opt/juli30/app`.
3. Nginx (`nginx.conf.example`) hace de reverse proxy TLS → `127.0.0.1:3000`; Cloudflare en modo *Full (strict)*.
4. Secretos de GitHub: `VPS_USER`, `VPS_HOST`, `VPS_SSH_KEY`, `TAILSCALE_OAUTH_CLIENT_ID`, `TAILSCALE_OAUTH_SECRET`.

El volumen `juli30_data` guarda `db.sqlite` y `uploads/`: no se pierde al redeploy.

## Documentación

- `AGENTS.md`: reglas y trampas para agentes que trabajan en el repo.
- `openspec/specs/`: spec vigente por capability (`admin`, `contest`, `gallery`, `landing`, `music`, `playlist`, `rsvp`, `ui-quality`).
- `PROJECT_CONTEXT.local.md`: estado y pendientes del entorno local (no versionado).

## Reglas

- No commitear ni pushear sin pedido explícito.
- Los secretos viven solo en `.env` (VPS) — nunca en el repo.
