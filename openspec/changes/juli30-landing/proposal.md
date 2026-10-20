## Why

Crear una invitación web para el cumpleaños 30 de Julieta "Juli" Rosales (10 de enero de 2027), fiesta de disfraces con temática cine/series. La página centraliza información del evento, inspira disfraces, permite confirmar asistencia con contador en vivo, compartir música y dejar dedicatorias, todo en una experiencia accesible y con estética "fiesta en el cine".

## What Changes

- Nueva landing estática/SSR en Astro + TS + Tailwind (un solo contenedor Docker).
- Hero con nombre, frase de invitación y countdown (días/horas/min/seg).
- Sección de ubicación con dirección y link a Google Maps.
- Carrusel de 22+ referencias de disfraces (películas/series icónicas) con item característico caricaturizado.
- Playlist: embed de Spotify + lista donde invitados agregan "canción + artista" (v1 mock; OAuth de Juli después).
- Galería estilo Instagram (grid) + carrusel con botón "like" persistente (1 like por visitante vía cookie anónima).
- RSVP: botón → modal (nombre, acompañantes) → persistencia en SQLite + contador en vivo (polling 15s).
- Dedicatorias en formulario RSVP (visibles solo para organizador, no para Juli).
- Panel admin con dos logins (admin + organizadora): listar/borrar RSVPs, exportar/copiar lista, subir fotos, ver likes y dedicatorias.
- Deploy en VPS Oracle (Docker Compose + Nginx + HTTPS) con CI/CD GitHub Actions.

## Capabilities

### New Capabilities
- `landing`: hero, countdown, ubicación, dress code, sección de disfraces.
- `rsvp`: modal de confirmación, persistencia, contador en vivo, dedicatorias.
- `playlist`: embed Spotify + agregar temas (mock v1).
- `gallery`: grid estilo IG, carrusel, likes persistentes.
- `admin`: autenticación dual, gestión de RSVPs/fotos/likes/dedicatorias, exportación.

### Modified Capabilities
(none)

## Impact

- Nuevo repo/proyecto (greenfield). Stack: Astro SSR (Node) + SQLite (Drizzle) + Docker Compose + Nginx.
- Infra: VPS Oracle existente, subdominio `juli30.evaldez.ar`, Cloudflare (Full strict).
- Secretos solo en `.env` (no commiteados). Admin password vía env.
- Sin dependencias de servicios externos en v1 (Spotify OAuth queda para v2).