# Tarjeta Cumple — Invitación web (Astro SSR)

Invitación web de cumpleaños con tema *fiesta en el cine*: disfraces de películas/series, premios "Oscar" de la noche y banda sonora entre todos.

> **Sin datos personales en el README** (decisión de privacidad): la fecha, la hora, el lugar y la dirección no se documentan acá. Viven en un único lugar, `src/data/event.ts` (fuente de contenido).

## Stack

- **Astro 7** (SSR, `@astrojs/node` standalone) + TypeScript + Tailwind 4
- **SQLite** con Drizzle ORM (better-sqlite3, WAL)
- **sharp** para reescalar/convertir imágenes a WebP
- **Docker Compose** + Nginx + Cloudflare (deploy en VPS Oracle)
- **OpenSpec** para specs/tasks (`openspec/changes/juli30-landing/`)

## Comandos

```bash
npm install
npm run dev              # http://localhost:4321
npm run build            # build SSR a dist/
npm run preview
npm run check            # astro check (tipos)

npm run db:generate      # generar migración drizzle
npm run db:migrate       # aplicar migraciones
npm run photos:prepare   # src/img/*.jpg -> public/img/photos/*.webp + src/data/gallery.ts
npm run movies:prepare   # src/img/movies/* -> public/img/movies/*.webp + src/data/movies.ts
npm run db:clean         # borrar datos de prueba (rsvps, likes, tracks, fotos subidas)
npm run db:backup        # backup online del SQLite (incluye el WAL) a data/backups/
```

Dev server en background (según AGENTS.md):

```bash
npx astro dev --background
npx astro dev status
npx astro dev logs
npx astro dev stop
```

## Estructura

```
src/
  data/          # contenido editable: event.ts, awards.ts, gallery.ts y movies.ts (generados)
  db/            # schema.ts (drizzle) + index.ts (conexión, migración y seed)
  layouts/       # Layout.astro
  lib/           # auth.ts (sesiones), visitor.ts (cookie anonima), images.ts (sharp), env.ts
  pages/
    index.astro  # landing
    admin/       # panel (login + RSvps + canciones + fotos)
    api/         # endpoints: rsvp, likes, tracks, photos, admin/*
public/
  img/           # TODAS las imagenes servidas (versionado en git)
    fondo-desktop.webp   # fondo horizontal (landscape)
    fondo-mobile.webp    # fondo vertical (portrait)
    favicon.svg          # icono zombie de MJ
    apple-touch-icon.png # 180x180
    icon-512.png         # 512x512
    photos/              # galeria y disfraces (576px)
    movies/              # carrusel de peliculas (360x480)
data/            # db.sqlite + uploads (NO versionado)
```

## Contenido editable (sin tocar componentes)

| Archivo | Qué define |
|---|---|
| `src/data/event.ts` | fecha, hora, lugar, dirección, link de Maps, playlist de Spotify |
| `src/data/awards.ts` | premios "Oscar"; las categorías se muestran siempre visibles |
| `src/data/gallery.ts` | **generado** por `npm run photos:prepare` — no editar a mano |
| `src/data/movies.ts` | **generado** por `npm run movies:prepare` — carrusel de películas |

Fotos nuevas: dejarlas en `src/img/` y correr `npm run photos:prepare`. Imágenes del carrusel: en `src/img/movies/` y `npm run movies:prepare`.

Los dos scripts son **aditivos**: conservan los `.webp` ya generados aunque su original ya no esté en `src/img/`, así que los originales se pueden borrar sin perder nada. Lo que se sirve (`public/img/`) es lo que está versionado en git.

## Variables de entorno

Copia `.env.example` a `.env` y cambiá las claves.

| Variable | Para qué |
|---|---|
| `SESSION_SECRET` | Firma las cookies de sesión del admin (HMAC). **Obligatorio en producción**; con el mismo valor nadie puede suplantar a Juli ni a la organizadora. Generalo con `openssl rand -hex 32`. |
| `ADMIN_JULI_USER` / `ADMIN_JULI_PASSWORD` | Login de Juli (no ve dedicatorias) |
| `ADMIN_ORGANIZER_USER` / `ADMIN_ORGANIZER_PASSWORD` | Login de la organizadora (ve dedicatorias) |
| `DATABASE_PATH` | Ruta del `.sqlite` (prod: `/data/db.sqlite`) |
| `UPLOADS_PATH` | Carpeta de fotos subidas (prod: `/data/uploads`) |

## Roles del panel

- **Juli** (`/admin`): ve y borra RSVPs, gestiona canciones y fotos. **No** ve dedicatorias.
- **Organizadora**: lo mismo + ve las dedicatorias (para el video).

## API

| Endpoint | Método | Qué hace |
|---|---|---|
| `/api/rsvp` | GET / POST | contador de personas confirmadas / crear RSVP |
| `/api/tracks` | GET / POST | canciones de la playlist (agrega cualquier invitado) |
| `/api/photos` | GET | galería + likes del visitante (cookie `visitor_id`) |
| `/api/likes` | POST | like (1 por visitante y foto) |
| `/api/photos/[id]/file` | GET | sirve fotos subidas desde el volumen |
| `/api/admin/login` `/logout` | POST | sesión del admin |
| `/api/admin/rsvps` | GET / DELETE | listar y borrar RSVPs (oculta dedicatorias para Juli) |
| `/api/admin/tracks` | GET / DELETE | listar y borrar canciones |
| `/api/admin/photos` | GET / POST / DELETE | listar, subir (con destino `kind`) y borrar fotos (409 para las del repo o con votos) |
| `/api/contest` | GET | estado del concurso, categorías pendientes (orden aleatorio) y ganadores al cerrar |
| `/api/contest/vote` | POST | votar una foto candidata en una categoría (1 por visitante) |
| `/api/admin/contest` | GET / POST | tally por categoría / abrir, cerrar y reiniciar el concurso |

## Imágenes

- Las fotos del repo (`src/img/`) se convierten a **WebP** (`public/img/photos/`, máx. 576 px, q82) y los fondos a `public/img/fondo-desktop.webp` (1600 px) y `fondo-mobile.webp` (1200 px). Se registran solas en la DB al arrancar (seed idempotente en `src/db/index.ts`).
- El carrusel de películas usa `src/img/movies/` → `public/img/movies/` (360×480, q75) vía `npm run movies:prepare`.
- Las subidas desde `/admin` pasan por **sharp**: `rotate()` + resize a **1440 px** de lado mayor (sin agrandar) + WebP q80, con nombre **UUID** (nunca sobreescribe) en el volumen `UPLOADS_PATH` (tope 12 MB de entrada). Se guarda una sola versión; el original no se conserva. Se pueden subir todas las que quieras.
- Las fotos se muestran en **tiras (grillas) entre las secciones** de texto, no en carrusel. Cada foto tiene el like por cookie anónima. Las fotos de destino **Concurso** quedan fuera de las tiras mientras el concurso está abierto.
- **Backup**: `npm run db:backup` (o `docker compose exec app node ./scripts/backup-db.mjs` en prod) escribe un backup consistente en `data/backups/db-<timestamp>.sqlite`.

## Deploy

El build ocurre **en el VPS** (el paquete de Docker no se publica).

1. En el VPS: `git clone <repo> /opt/juli30/app`, crear `/opt/juli30/app/.env` con las claves reales, y `docker compose up -d` una vez para crear el volumen.
2. `git push master` dispara `.github/workflows/deploy.yml` → conecta a Tailscale y por SSH hace `git pull && docker compose build && docker compose up -d` en `/opt/juli30/app`.
3. Nginx (ver `nginx.conf.example`) hace de reverse proxy TLS → `127.0.0.1:3000`. Cloudflare en modo *Full (strict)*.
4. Secretos de GitHub: `VPS_USER`, `VPS_HOST`, `VPS_SSH_KEY`, `TAILSCALE_OAUTH_CLIENT_ID`, `TAILSCALE_OAUTH_SECRET`.

El volumen `juli30_data` guarda `db.sqlite` y `uploads/`: **no se pierde al redeploy**.

## Reglas

- No commitear ni pushear sin pedido explícito.
- Los secretos viven solo en `.env` (VPS) — nunca en el repo.
