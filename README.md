# Tarjeta Cumple — Juli 30

Invitación web para el cumpleaños 30 de **Julieta "Juli" Rosales**.
**10 de enero de 2027** · Camping Centro de Empleados de Comercio, Mathus Hoyos 2525, El Bermejo, Guaymallén (Mendoza).

Tema: *fiesta en el cine* — disfraces de películas/series, premios "Oscar" de la noche, banda sonora entre todos.

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
npm run photos:prepare   # src/img/*.jpg -> public/photos/*.webp + src/data/gallery.ts
npm run db:clean         # borrar datos de prueba (rsvps, likes, tracks, fotos subidas)
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
  data/          # contenido editable: event.ts, costumes.ts, awards.ts, gallery.ts (generado)
  db/            # schema.ts (drizzle) + index.ts (conexión, migración y seed)
  layouts/       # Layout.astro
  lib/           # auth.ts (sesiones), visitor.ts (cookie anonima), images.ts (sharp), env.ts
  pages/
    index.astro  # landing
    admin/       # panel (login + RSvps + canciones + fotos)
    api/         # endpoints: rsvp, likes, tracks, photos, admin/*
public/
  fondo.webp     # fondo del hero
  photos/        # webp generados (versionado en git)
data/            # db.sqlite + uploads (NO versionado)
```

## Contenido editable (sin tocar componentes)

| Archivo | Qué define |
|---|---|
| `src/data/event.ts` | fecha, hora, lugar, dirección, link de Maps, playlist de Spotify |
| `src/data/costumes.ts` | las 22 referencias de disfraz (item + por qué funciona + foto) |
| `src/data/awards.ts` | premios "Oscar"; `revealed: false` = solo teaser |
| `src/data/gallery.ts` | **generado** por `npm run photos:prepare` — no editar a mano |

Fotos nuevas: dejarlas en `src/img/` y correr `npm run photos:prepare`.

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
| `/api/admin/photos` | GET / POST / DELETE | listar, subir (reescalada a WebP) y borrar fotos |

## Imágenes

- Las fotos del repo (`src/img/`) se convierten a **WebP** (máx. 1600 px, q82) en `public/photos/` y se registran solas en la DB al arrancar (seed idempotente en `src/db/index.ts`).
- Las subidas desde `/admin` pasan por **sharp**: se reescalan a 1600 px y se guardan como WebP en el volumen `UPLOADS_PATH` (tope 12 MB de entrada). Se pueden subir todas las que quieras, no hay límite de cantidad.
- La galería es un carrusel horizontal con scroll infinito (3 copias de la pista, sin botones) y like por cookie anónima.

## Deploy

El build ocurre **en el VPS** (el paquete de Docker no se publica).

1. En el VPS: `git clone <repo> /opt/juli30/app`, crear `/opt/juli30/app/.env` con las claves reales, y `docker compose up -d` una vez para crear el volumen.
2. `git push main` dispara `.github/workflows/deploy.yml` → por Tailscale SSH hace `git pull && docker compose build && docker compose up -d` en `/opt/juli30/app`.
3. Nginx (ver `nginx.conf.example`) hace de reverse proxy TLS → `127.0.0.1:3000`. Cloudflare en modo *Full (strict)*.
4. Secretos de GitHub: `VPS_USER`, `VPS_HOST`, `TS_OAUTH_CLIENT_ID`, `TS_OAUTH_SECRET`.

El volumen `juli30_data` guarda `db.sqlite` y `uploads/`: **no se pierde al redeploy**.

## Reglas

- No commitear ni pushear sin pedido explícito.
- Los secretos viven solo en `.env` (VPS) — nunca en el repo.
