## Context

Estado actual relevante para este change (la motivación está en `proposal.md`):

- La landing vive en un solo archivo: `src/pages/index.astro` (289 líneas, con el `<script>` de cliente inline). `src/styles/global.css` tiene los estilos custom. `src/layouts/Layout.astro` arma el `<head>`.
- El contenido está en `src/data/`: `event.ts` (fecha/hora/lugar), `costumes.ts` (22 disfraces, con mapa `PHOTO` a rutas de `public/photos/`), `awards.ts` (6 categorías con flag `revealed`), `gallery.ts` (generado, no tocar).
- Assets disponibles: `public/fondo.webp` (el cartel del cine, 1 foto) y 13 fotos de disfraces en `public/photos/`. No hay foto de "fiesta" independiente: la banda `.banda-fiesta` reutiliza `GALLERY[1]` (dos alumnos de Hogwarts).
- `sharp@0.35.5` ya está instalado como dependencia de producción y se usa en `src/lib/images.ts`.
- **No hay** `public/favicon.svg` zombie ni `apple-touch-icon.png`; existe un `public/favicon.ico` y un `public/favicon.svg` genéricos. `Layout.astro` ya linkea `/favicon.svg` pero **no** declara `apple-touch-icon`.
- Los skills del repo viven en `.agents/skills/` (estándar cross-agent) y `.opencode/skills/` (OpenSpec). La carpeta `.claude/` contenía **symlinks** a `.agents/skills/*` (11 symlinks, created por el scaffold "autoskills" del commit inicial `4b9ebe1`).

## Goals / Non-Goals

**Goals:**
- Cero dependencias npm nuevas.
- Cero cambios de schema/DB y cero endpoints nuevos.
- Que el change se pueda mergear y desplegar tal cual, sin decisiones pendientes.
- Que todo el copy nuevo esté en español rioplatense y sea coherente con la estética "cine/series".

**Non-Goals:**
- Toggle de premios desde el admin (anotado como opcional en `tasks.md` §7).
- Bajar el video de YouTube a un archivo local (violaría copyright y pesa ~50 MB).
- Cambiar la galería, el RSVP o la playlist.
- Generar el favicon con un modelo de imágenes: se dibuja SVG a mano.

## Decisions

### Scroll horizontal: la causa, no el síntoma
`documentElement.scrollWidth` = 384px vs `clientWidth` = 375px en un viewport de 390px. El culpable es `.banda-fiesta`, que usa `transform: scale(1.05)`: el transform no participa del layout, pero sí del *overflow* visual, así que el elemento se sale ~9px por lado.

Opciones: (a) `overflow-x: hidden` en `body` — esconde el síntoma y puede recortar el focus ring de los botones; (b) quitar el `scale` y usar `background-size: 108%` en su lugar — mantiene el efecto de "foto más grande que el hueco" sin generar overflow; (c) `overflow-x: clip` en `body` — no crea contexto de scroll (a diferencia de `hidden`) y no rompe `position: sticky`.

**Elegido: (c) + (b) juntos.** `overflow-x: clip` en `body` como red de seguridad para cualquier futuro elemento que desborde, y cambiar el `scale(1.05)` por `background-size: 108%` para que el overflow ni siquiera se produzca. `clip` es la opción correcta sobre `hidden` porque no convierte al body en contenedor de scroll.

### Fondo en dos capas
El pedido es: "que se vea entero en móvil" y "que no se vea borroso al entrar, y al bajar que aparezca el otro fondo, pero ese sí borroso".

`fondo.webp` es un **cartel vertical** (poster de cine). Con `background-size: cover` en un celular se recorta y no se lee la fecha. Se usan dos capas fijas superpuestas:

1. `.fondo-cine` — `fondo.webp` con `background-size: contain` (se ve entero, con letterbox del color de fondo) + `background-color` de respaldo.
2. `.fondo-fiesta` — foto de fiesta con `filter: blur(...)`, `opacity: 0` → `1`.

La transición se dispara con un `IntersectionObserver` sobre el hero (no con `scroll` + throttle: el observer es nativo, no necesita listener ni rAF). Cuando el hero sale del viewport, la capa de fiesta toma opacidad 1.

Se elimina el `@keyframes hero-blur`: el blur automático de 2.4s sobre `fondo.webp` contradice el pedido de verlo nítido al entrar.

**Alternativa descartada:** un solo `<div>` con `background-image: linear-gradient(...)` y dos capas de background. Se descartó porque el blur necesita ser una propiedad `filter` de un elemento propio, no del fondo.

**"El otro fondo"**: no hay una foto de fiesta independiente en `public/`. Se reutiliza una de las 13 fotos de disfraces (la de la banda actual) como fondo de fiesta. `background-size: cover` + `blur(18px)` + `scale(1.1)` la convierte en textura thematic sin que se vea qué es.

### Música de fondo: YouTube IFrame API
El pedido es un tema en autoplay de fondo. Opciones:

1. `<audio>` con un MP3 local → hay que bajar la canción (copyright, ~5 MB, y el repo no debería guardarla).
2. YouTube IFrame API con el video oficial (`PIb6AZdTr-A`, canal oficial de Cyndi Lauper) → streaming, sin archivo local, sin npm.
3. Spotify embed → no expone control de volumen/play programático.

**Elegido: (2), YouTube IFrame API.** El script se carga desde `https://www.youtube.com/iframe_api` (sin dependencia npm), con `playerVars: { autoplay: 1, mute: 1, loop: 1, playlist: 'PIb6AZdTr-A' }` y el player oculto (`position: absolute; width: 1px; height: 1px; opacity: 0`).

**El problema del autoplay:** Chrome/Safari/Firefox bloquean autoplay con sonido si no hubo interacción previa del usuario. Por eso:
- Arranca **muteado** (`mute: 1`): el autoplay muteado sí está permitido.
- Se registra un listener único de `pointerdown`/`keydown` que hace `player.unMute()` **una sola vez** (primer gesto).
- Hay un botón visible 🎵/🔇 que hace `pauseVideo()` / `playVideo()` + mute/unmute, para que el visitante pueda cortar el audio.

**Alternativa descartada:** `AudioContext` con un archivo de audio del repo. Se descartó por copyright y peso.

**Riesgo aceptado:** si el visitante no interactúa nunca, queda muteado. Se mitiga con un hint visual en el botón ("toca para escuchar").

### Favicon zombie de Michael Jackson
No hay generador de imágenes ni acceso a un modelo de imágenes. Se dibuja un **SVG a mano**: silueta de MJ (sombrero de fedora, pelo rizado, sombrero con banda) en verde zombie + un rayo, sobre fondo oscuro, con la silueta de los "Thriller" (zombie con ojos claros y boca abierta).

`favicon.svg` sirve para navegadores modernos. Para `favicon.ico` y `apple-touch-icon.png` se usa `sharp` (ya instalado) para rasterizar el SVG a PNG 512×512 y 180×180. El `.ico` legacy: se sirve el PNG con `type="image/png"` declarado y se conserva el `.ico` viejo como fallback o se regenera. **Decisión: regenerar `.ico` real** con sharp no soporta `.ico` → se genera el PNG 512 y se mantiene el `.ico` existente como fallback declarado en el `<head>`; si el `.ico` viejo se ve mal, se elimina del `<head>` y queda solo SVG + PNG. Se decide durante la implementación mirando cómo queda el `.ico` actual.

El SVG también se usa inline como `data:` URI en el `<link rel="icon">` para evitar un request extra. **No**: se mantiene el archivo aparte en `public/`, más simple de cachear.

### Datos del evento
`event.ts` pasa a `date: 'sábado 9 de enero de 2027'`, `time: '22:00 h'`, `dateISO: '2027-01-09T22:00:00-03:00'`. Argentina (ART) es UTC-3 fijo todo el año (no aplica DST desde 2009), así que el offset `-03:00` es correcto para esa fecha.

El countdown de `index.astro` hoy tiene la fecha **hardcodeada** en el `<script>` inline (`'2027-01-10T00:00:00-03:00'`). Se corrige para leer `EVENT.dateISO` desde el server: el `<script>` de Astro puede acceder a variables de frontmatter solo si se pasan explícitamente con `define:vars`, o se inyecta un `<script type="application/json" id="event-date">` con el ISO y el `<script>` lo lee del DOM. **Elegido: JSON script tag**, porque `define:vars` en Astro crea un script *inline* que no puede coexistir con `is:inline` de forma simple y el JSON en el DOM es más explícito y testeable.

### Títulos
- `<title>` (pestaña) → "Juli: De repente 30" (el título de la película).
- `<h1>` (hero) → "Juli: tener 30, ser coqueta y prospera".

Son dos textos distintos a propósito: el `h1` es el lema de la invitada, el `<title>` es el guiño a *De repente 30*. `Layout.astro` recibe el título por prop; `index.astro` lo pasa.

### Disfraces: curaduría
Se borran 6 y se agregan 2 → 18 referencias, 8 con foto. Las fotos disponibles (`public/photos/`) cubren: Jack Skellington, Beetlejuice, Harry Potter (x2), Wednesday, Pennywise, Joker+Harley, Chucky+Tiffany, Doctor Strange+Scarlet Witch, vampiro, payaso McDonald's. "El Caballero de la Noche" (Joker) ya está mapeado a la foto de Pennywise/clown, y "Scream" quedó sin foto.

Se respetan exactamente los 6 removidos y los 2 agregados, sin tocar el resto de la lista. Chavo del 8 y ¿...y dónde están las rubias? entran **sin foto** (no hay imágenes de esas películas en `src/img/`), con emoji + item + why.

**Nota sobre "El Caballero de la Noche" y "Scream":** ambas siguen en la lista porque no fueron pedidas para quitar. "El Caballero de la Noche" conserva su foto mapeada; "Scream" sigue sin foto (la foto de payaso IT-PENNYWISE quedó asignada al Caballero de la Noche).

### Premios visibles
Se borra el flag `revealed` de `awards.ts` y el filtro `AWARDS.filter(a => a.revealed)` del `index.astro`. Se reescribe `AWARDS_INTRO` sin la instrucción al organizador. El teaser sigue existiendo como concepto: las categorías se muestran pero el copy dice que los premios se entregan en la noche.

**Toggle en admin (descartado):** haría falta una tabla de settings + endpoint + UI. El beneficio (poder ocultar las categorías) no compensa el costo. Se deja anotado en `tasks.md` §7 como opcional para el futuro.

## Risks / Trade-offs

- **[YouTube embeds pueden estar bloqueados por adblock/conservador de datos]** → el player queda en `1px` y si falla, la página sigue funcionando; el botón muestra estado "no disponible". Alternativa futura: subir el audio a un CDN propio.
- **[Autoplay muteado puede sonar raro si el visitante no hace clic]** → el botón lleva un hint "toca para escuchar" y hace unmute al primer gesto en cualquier parte de la página.
- **[El SVG del favicon dibujado a mano puede quedar feo]** → se rasteriza con sharp a PNG 512/180 y se revisa a ojo antes de mergear. Si no convence, se itera el path.
- **`contain` del fondo cine deja bandas negras (letterbox) en el hero]** → es intencional: el cartel se lee entero. El color de fondo coincide con `--color-cinema-black`.
- **[Cambiar la fecha a 9/1 vs 10/1]** → el countdown, el `dateISO` y el copy del hero deben quedar consistentes. Se verifica con un test manual del countdown.
- **[El favicon `.ico` legacy puede no matchear el nuevo SVG]** → si se ve mal, se saca el `<link rel="icon" sizes="any">` y quedan solo SVG + apple-touch-icon.

## Migration Plan

1. Implementar por bloques (ver `tasks.md`), commit por bloque o uno solo.
2. `npm run check` + `npm run build` deben pasar.
3. Verificación manual en `http://localhost:4321/` (dev server en background) con Playwright a 390px y 1280px:
   - `documentElement.scrollWidth === clientWidth` (sin scroll lateral)
   - `h1` y `<title>` con los textos nuevos
   - hero con `fondo.webp` nítido, blur solo al scrollear
   - botón de música: mutea, unmutea, pausa, reanuda
   - favicon zombie visible
4. Push a `master` → el workflow de deploy hace el build en el VPS.

**Rollback:** `git revert` del commit. Sin migraciones de DB, no hay rollback de datos.

## Open Questions

- (Ninguna que bloquee. Si más adelante se quiere el toggle de premios, es una task nueva en `tasks.md` §7.)
