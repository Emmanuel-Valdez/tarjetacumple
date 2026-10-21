## Why

Antes de subir al VPS hay que pulir el front: hay un scroll horizontal no deseado, los datos del evento están mal (la fecha/hora que se inventaron), el título queda pobre para una fiesta con temática de cine, y faltan varias secciones que la invitada pidió (solo adultos, "regalos" de bebida, música de fondo, favicon, limpieza de referencias de películas). Además se detectaron decisiones de contenido que hay que dejar asentadas antes de tocar código.

## What Changes

- **Fix del scroll lateral**: `.banda-fiesta` usa `transform: scale(1.05)` y desborda el viewport (384px vs 375px en 390px de ancho), generando barra horizontal.
- **Datos reales del evento**: sábado **9 de enero de 2027**, **22:00** hora argentina (UTC-3, sin DST). `dateISO` = `2027-01-09T22:00:00-03:00`. El countdown hardcodeado pasa a leer `EVENT.dateISO`.
- **Identidad de la página**: título del hero → **"Juli: tener 30, ser coqueta y prospera"**; título de la pestaña → **"Juli: capitulo 30, la pelicula"**; favicon nuevo con un **zombie de Michael Jackson** (SVG + PNG; el `.ico` legacy se descarta).
- **Sección "Solo adultos"**: aviso con copy gracioso y temático de disfraces (no entran menores de 18).
- **Sección "Regalos"**: "tu presencia y lo que vayas a tomar" (bebidaJhue), en formato lista de dos ítems.
- **Música de fondo**: tema *Girls Just Want to Have Fun* de Cyndi Lauper (video oficial `PIb6AZdTr-A`) en autoplay con mute inicial por política de autoplay de los navegadores, unmute + botón de control on/off.
- **Fondo único responsive**: `fondo-desktop.webp` (horizontal) en landscape y `fondo-mobile.webp` (vertical) en portrait; entra nítido y se difumina al scrollear el hero. Se elimina la segunda capa y la foto de fiesta.
- **Carrusel de películas**: 25 imágenes en dos filas con loop CSS, servidas desde `public/img/movies/`.
- **Decoración parallax**: 4 globos y 6 confetis fijos que suben solo con el scroll, a velocidades distintas. Sin animación autónoma; estáticos con `prefers-reduced-motion`.
- **Imágenes centralizadas**: todo lo servido vive en `public/img/` (fondos, iconos, galería y carrusel), optimizado al tamaño donde se muestra.
- **Limpieza de disfraces**: se quitan Clueless, El Quinto Elemento, Midsommar, Legalmente Rubia, El Gran Lebowski y La Casa de Papel; se agregan Chavo del 8 y ¿...y dónde están las rubias?. Quedan 18 referencias (8 con foto). En el Bloque B se elimina la sección completa y `costumes.ts`: la reemplaza el carrusel de películas.
- **Premios**: se elimina de la copy pública la instrucción "Organizá un concurso a mitad de la noche y entregá estatuillas similares a los Premios Oscar." y **las categorías quedan visibles** (se borra el flag `revealed`).
- **Carpeta `.claude/`**: se documenta por qué existía (symlinks a `.agents/skills/` creados por el scaffold de skills) y por qué **no se restaura**.

### Fuera de alcance (decidido, con opción anotada)

- **Toggle de premios desde el admin**: no se implementa ahora. Con las categorías siempre visibles el requisito se cumple sin tabla nueva ni API. Queda anotada como tarea opcional si se quiere recuperar el "se anuncian en la noche".
- **`.claude/` no se restaura**: los skills viven en `.agents/skills/` (estándar cross-agent) y en `.opencode/skills/`. Los symlinks de `.claude/` eran redundantes.

## Capabilities

### New Capabilities
- `music`: reproductor de tema de fondo con autoplay, unmute por interacción y control on/off.

### Modified Capabilities
- `landing`: hero y título, datos del evento, fondo en dos capas, sección solo adultos, sección regalos, premios visibles, lista de disfraces, favicon y título de pestaña.

## Impact

- **Código**: `src/pages/index.astro`, `src/layouts/Layout.astro`, `src/styles/global.css`, `src/data/event.ts`, `src/data/awards.ts`, `src/data/movies.ts`.
- **Assets**: `public/img/favicon.svg` (reemplazo), `public/img/apple-touch-icon.png` (nuevo), `public/img/icon-512.png` (nuevo), `public/img/fondo-desktop.webp` y `fondo-mobile.webp`, `public/img/photos/` y `public/img/movies/`.
- **Sin dependencias nuevas**: el reproductor usa la YouTube IFrame API por `<script src>` (sin npm). El favicon se genera con `sharp` ya instalado.
- **Sin cambios de DB ni API**: este change es 100% front + datos estáticos.
- **Deploy**: este change debe mergearse antes del primer `docker compose build` en el VPS.
