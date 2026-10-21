# Handoff — sesión 2026-10-21 (OBSOLETO)

> Documento histórico. El change `front-polish` ya está implementado en el working tree
> (incluye fondo único responsive, decoración parallax, carrusel de películas e imágenes
> centralizadas en `public/img/`). Ver `README.md` y `DECISIONS.md`.

## Estado

Todo el front de la landing ya funciona y está verificado (build, tipos, Docker, navegador).
**Este change NO se implementó**: quedó planeado en OpenSpec, listo para arrancar.

- Change: `openspec/changes/front-polish/` (proposal + design + tasks + 2 specs, validado con `--strict`)
- Para implementarlo: `/opsx-apply front-polish` o pedir "aplicá el change front-polish".
- Deploy real al VPS sigue pendiente (`juli30-landing` tasks 8.2 / 8.3).

## Diagnóstico ya hecho (no repetir)

**Scroll horizontal (punto 1 del pedido)**: NO es la galería. Es `.banda-fiesta` con
`transform: scale(1.05)` → 384px de ancho contra 375px de viewport. El transform no
participa del layout pero sí del overflow visual. Fix en tasks 2.1/2.2.

**`.claude/` (punto 7)**: eran **11 symlinks** a `../../.agents/skills/*`, creados por el
scaffold "autoskills" del commit inicial `4b9ebe1`. Los skills reales viven en
`.agents/skills/` y `.opencode/skills/`. **No se restaura** — el repo usa opencode.
Queda pendiente decidir si se commitea el borrado y agregar `.claude/` al `.gitignore`.

**Video de Cyndi Lauper (punto 6)**: `PIb6AZdTr-A` (oficial, canal CyndiLauperVEVO).
Se usa YouTube IFrame API sin npm. Ojo: los navegadores **bloquean autoplay con sonido**
sin interacción previa → arranca muteado y hace unmute al primer clic. Es el diseño
documentado en `design.md`, no un bug.

**Fecha (punto 2)**: sábado 9/1/2027 22:00 ART = `2027-01-09T22:00:00-03:00`.
Argentina es UTC-3 fijo (sin DST desde 2009). Ojo: el countdown de `index.astro`
tiene la fecha **hardcodeada** en el `<script>` inline → hay que inyectarla
(tasks 1.2).

**"Dónde están las rubias"** = *White Chicks* (2004, Wayans). Chavo del 8 entra sin foto.

**Fondo (punto 9)**: `fondo.webp` es un poster vertical → con `cover` se recorta en
celular. El diseño pedido ("se ve entero al entrar, y al bajar aparece el otro fondo
borroso") se resuelve con **dos capas fijas** + `IntersectionObserver`, no con
keyframes. Ver `design.md` §"Fondo en dos capas".

**Premios (punto 11)**: se borra el flag `revealed` y se muestran las 6 categorías.
El toggle desde el admin quedó **anotado como opcional** (tasks 7.4) — no bloquea.

## Cosas pendientes que NO están en el change

- **Hora de la playlist de Spotify**: el id `37i9dQZF1DXcBWIGoYBM5M` es "Today's Top Hits"
  genérico, no el playlist real de la fiesta. Confirmar con Juli.
- **Favicon zombie MJ**: hay que dibujarlo a mano en SVG (no hay generador de imágenes
  ni modelo de imágenes disponible). tasks 3.3.
- **En el VPS**: clonar el repo en `/opt/juli30/app`, `.env` con secretos reales,
  Nginx TLS, DNS `juli30.evaldez.ar`, Cloudflare Full strict.
- **`SESSION_SECRET` en producción**: hoy es obligatorio y la app tira error si falta.
- **`.env` local** tiene passwords de prueba (`juli`/`test123`, `organizer`/`test456`) —
  cambiar antes de producción.

## Comandos

```
npm run dev            # http://localhost:4321
npm run check          # tipos (0 errores)
npm run build          # SSR
npm run photos:prepare # src/img/*.jpg -> public/photos/*.webp + src/data/gallery.ts
npm run db:clean       # borrar datos de prueba
```

Dev server en background (según AGENTS.md): `npx astro dev --background` /
`astro dev status` / `astro dev logs` / `astro dev stop`.

## Estado del repo

- **Nada commiteado.** Todo el trabajo de las 2 sesiones anteriores está en el working tree.
- `git status`: 25 archivos modificados + `public/photos/`, `public/fondo.webp`,
  `scripts/`, `src/img/`, `src/lib/env.ts`, `src/lib/images.ts`,
  `src/pages/api/admin/tracks.ts` sin trackear.
- `.claude/skills/*` aparecen como borrados (` D`).
- `src/img/` (13 fotos fuente) sigue sin trackear: **decidir si se versiona** (los `.webp`
  de `public/photos/` sí están, y son los que se sirven).
