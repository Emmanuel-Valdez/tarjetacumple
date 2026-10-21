## Context

Greenfield project. See proposal.md for motivation. Stack decided: Astro SSR (Node) + SQLite (Drizzle) + Docker Compose + Nginx on Oracle VPS. Subdomain `juli30.evaldez.ar`. Two admin roles (Juli / organizer). v1 mocks Spotify OAuth.

## Goals / Non-Goals

**Goals:**
- Single container deployable via Docker Compose.
- Accessible UI (WCAG AA basics: semantic HTML, keyboard, focus, reduced motion).
- Persistent RSVPs, likes, tracks in SQLite on a Docker volume.
- Secure admin auth (hashed passwords, session cookies, CSRF, rate limiting).

**Non-Goals:**
- Separate backend API.
- Guest authentication.
- Real Spotify OAuth in v1 (mock only).
- Email notifications.

## Decisions

- **Astro SSR over static**: needed for API routes (RSVP, likes, upload) and SSR. Alternative: static + serverless (rejected: user prefers VPS single container).
- **SQLite over PostgreSQL**: small scale, single container, no shared infra. Alternative: reuse VPS PostgreSQL (rejected for simplicity/isolation; can migrate later).
- **Drizzle ORM**: typed queries, migrations, prepared statements. Alternative: better-sqlite3 raw (rejected: more boilerplate).
- **Cookie anonymous id for likes**: no guest auth needed; one like per visitor. Alternative: IP-based (rejected: shared networks).
- **Polling 15s for counter**: simpler than SSE for a party site. Alternative: SSE (deferred).
- **Two admin roles via env credentials**: simple, no user table. Passwords hashed at startup.
- **Photos stored in Docker volume**: served via Astro endpoint; no MinIO. Alternative: MinIO (rejected: overkill).
- **Placeholders for photos in v1**: real photos uploaded later by admin.

## Risks / Trade-offs

- SQLite single-writer: fine for party traffic; risk of lock contention under burst → mitigation: WAL mode, short transactions.
- Anonymous visitor id via cookie: can be cleared; acceptable for likes (not critical).
- v1 Spotify mock: guests see static list; OAuth deferred until Juli approves.
- Upload security: validate mime/size, random filenames, serve from volume.

## Migration Plan

1. Create Astro project + Dockerfile + docker-compose.yml + Nginx config.
2. Configure GitHub Actions (build → push GHCR → Tailscale SSH deploy).
3. Set env on VPS, create `/opt/juli30`, deploy.
4. Configure DNS `juli30.evaldez.ar` → VPS, Cloudflare Full strict.

## Open Questions

- Exact event time and address (placeholders in v1).
- Whether to add CSV export or just copy-to-clipboard (start with copy).