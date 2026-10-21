## 1. Datos del evento

- [x] 1.1 `src/data/event.ts`: `date: 'sábado 9 de enero de 2027'`, `time: '22:00 h'`, `dateISO: '2027-01-09T22:00:00-03:00'` (UTC-3 fijo, Argentina sin DST)
- [x] 1.2 `src/pages/index.astro`: el countdown deja de hardcodear la fecha y lee `EVENT.dateISO` (inyectado como `<script type=\"application/json\">`); verificar que cuenta bien contra 2027-01-09T22:00:00-03:00
- [x] 1.3 Verificar que el copy del hero y de la sección "Dónde y cuándo" no contradicen la nueva fecha

## 2. Scroll horizontal

- [x] 2.1 `.banda-fiesta` se elimina por completo (HTML y CSS): ya no se usa en la página
- [x] 2.2 `src/styles/global.css`: `body { overflow-x: clip; }` como red de seguridad (no `hidden`, para no romper `position: sticky` ni recortar focus rings)
- [x] 2.3 Verificar en Playwright a 390px y 1280px: `documentElement.scrollWidth === clientWidth`

## 3. Títulos y favicon

- [x] 3.1 `src/pages/index.astro`: `<h1>` → "Juli: tener 30, ser coqueta y prospera" (se reordena el hero para que el lema sea lo protagonista)
- [x] 3.2 `src/layouts/Layout.astro`: `<title>` → "Juli: capitulo 30, la pelicula" + `apple-touch-icon` + `theme-color`
- [x] 3.3 Dibujar `public/img/favicon.svg` a mano: zombie de Michael Jackson (fedora, pelo rizado, ojos claros, boca abierta, rayo) sobre fondo oscuro
- [x] 3.4 Rasterizar con sharp (ya instalado) a `public/img/apple-touch-icon.png` (180×180) y `public/img/icon-512.png` (512×512)
- [x] 3.5 Regenerar o descartar `public/favicon.ico` legacy según cómo se vea; ajustar los `<link>` del `<head>` a `/img/`
- [x] 3.6 Verificar en el navegador que la pestaña muestra el icono zombie y el título correcto

## 4. Fondo único

- [x] 4.1 `src/styles/global.css`: `.fondo-cine` con `background-image` responsive — `fondo-mobile.webp` en portrait y `fondo-desktop.webp` en landscape (`@media (orientation: landscape)`), `background-size: cover`, `inset: -24px` para tapar los bordes del blur
- [x] 4.2 `src/pages/index.astro`: un solo `<div class="fondo-cine">`; se elimina `.fondo-fiesta` y la foto de fiesta
- [x] 4.3 `IntersectionObserver` sobre el hero que agrega/quita `.difuminado` (`blur(9px) brightness(0.7)`) al fondo al salir/entrar del viewport
- [x] 4.4 Eliminar `@keyframes hero-blur` y la capa doble
- [x] 4.5 `prefers-reduced-motion`: el fondo cambia de nítido a difuminado sin transición
- [x] 4.6 Verificar: al entrar se ve nítido; al scrollear se difumina; en mobile usa la vertical y en desktop la horizontal

## 5. Secciones nuevas

- [x] 5.1 Sección "Solo adultos": copy gracioso y temático de disfraces, algo como "Público: +18. Si sos menor de edad, te toca ver la película desde la匹配的 butaca" — tono de ficha de cine
- [x] 5.2 Sección "Regalos" (o "Qué hay que traer"): dos ítems — "Tu presencia" y "Lo que vayas a tomar" (bebidas,protovodka,etc. con el tono de la invitada)
- [x] 5.3 Ambas secciones con HTML semántico, copy en español rioplatense y foco/contraste correctos
- [x] 5.4 Verificar que no rompen el flujo de las secciones existentes (hero → ubicación → banda → dress code → disfraces → premios → playlist → galería)

## 6. Disfraces

> Sección "Ideas de disfraz" eliminada en el Bloque B: la reemplaza el carrusel de películas y `src/data/costumes.ts` se borra.

- [x] 6.1 `src/data/costumes.ts`: remover Clueless, El Quinto Elemento, Midsommar, Legalmente Rubia, El Gran Lebowski y La Casa de Papel
- [x] 6.2 `src/data/costumes.ts`: agregar "Chavo del 8" (item + why + emoji 📺) y "¿...y dónde están las rubias?" (item + why + emoji 👯, dos agentes disfrazados de rubias) — **sin foto**
- [x] 6.3 `src/pages/index.astro`: el subtítulo "22 referencias para inspirarte" pasa a 18 (o se calcula desde `COSTUMES.length`)
- [x] 6.4 Limpiar el mapa `PHOTO` de las entradas que se fueron y verificar que las 8 fotos restantes siguen mapeadas a la referencia correcta
- [x] 6.5 Verificar que no queda ninguna referencia a las películas quitadas en el HTML renderizado

## 7. Premios

- [x] 7.1 `src/data/awards.ts`: reescribir `AWARDS_INTRO` sin la instrucción "Organizá un concurso a mitad de la noche y entregá estatuillas similares a los Premios Oscar"
- [x] 7.2 `src/data/awards.ts`: quitar el flag `revealed` de las 6 categorías
- [x] 7.3 `src/pages/index.astro`: mostrar todas las categorías (`AWARDS` directo, sin `.filter()`) y sacar el texto "Las categorías se anuncian en el momento"
- [ ] 7.4 (opcional, NO bloqueante) Toggle de premios desde `/admin`: tabla de settings + endpoint + switch. Solo si se quiere recuperar el efecto "se anuncian en la noche" — **fuera de alcance de este change**

## 8. Música de fondo

- [x] 8.1 `src/pages/index.astro`: cargar `https://www.youtube.com/iframe_api` y crear el player con `playerVars: { autoplay: 1, mute: 1, loop: 1, playlist: 'PIb6AZdTr-A' }` (video oficial de Cyndi Lauper)
- [x] 8.2 Player oculto: `position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none` — no ocupa layout
- [x] 8.3 Listener único de `pointerdown`/`keydown` que hace `unMute()` una sola vez al primer gesto
- [x] 8.4 Botón visible 🎵/🔇 con `aria-pressed` que hace `pauseVideo()`/`playVideo()` + mute/unmute; hint "toca para escuchar" mientras esté muteado
- [x] 8.5 El botón es alcanzable por teclado y tiene foco visible
- [x] 8.6 Manejo de error: si el player no carga, el resto de la página sigue funcionando y el botón no rompe
- [x] 8.7 Verificar: autoplay muteado al cargar, unmute al primer clic, pausa/reanuda, sin que el player ocupe espacio

## 9. Verificación y docs

- [x] 9.1 `npm run check` (0 errores) y `npm run build` (SSR) pasan
- [x] 9.2 Verificación manual en `http://localhost:4321/` con Playwright a 390px y 1280px: scroll lateral, h1, `<title>`, favicon, fondo responsive (vertical/horizontal) y blur al scrollear, secciones nuevas, disfraces (18), premios visibles, carrusel de películas, decoración parallax, música
- [x] 9.3 Consola del browser sin errores
- [x] 9.4 Actualizar `DECISIONS.md` con las decisiones de este change (fecha real, fondo en 2 capas, YouTube IFrame API, premios visibles)
- [x] 9.5 Actualizar `README.md` si cambió algo de la estructura (favicon, assets)
- [x] 9.6 Marcar en `openspec/changes/juli30-landing/tasks.md` los ítems 8.2/8.3 de deploy como pendientes (siguen bloqueados por el VPS)

## 10. Nota: carpeta `.claude/`

- [x] 10.1 Constatar en el commit inicial (`4b9ebe1`, "autoskills") que `.claude/skills/*` eran **symlinks** a `../../.agents/skills/*` (11 symlinks), generados por el scaffold de skills
- [x] 10.2 Conclusión: **no se restaura**. Los skills viven en `.agents/skills/` (estándar cross-agent) y `.opencode/skills/` (OpenSpec); los symlinks de `.claude/` eran redundantes para este repo, que usa opencode
- [x] 10.3 Decidir si el borrado se commitea (queda como ` D` en `git status`) o se deja sin commitear
- [x] 10.4 Agregar `.claude/` a `.gitignore` para que el scaffold no lo vuelva a crear

## 11. Imágenes, carrusel y decoración

- [x] 11.1 Todas las imágenes servidas viven en `public/img/` (fondos, iconos, `photos/`, `movies/`); rutas actualizadas en `Layout.astro`, `global.css`, `gallery.ts` y `costumes.ts`
- [x] 11.2 `prepare-photos.mjs` genera fotos 576 px q82 y los fondos desktop/mobile; no reescribe el manifiesto si no hay fuentes
- [x] 11.3 `prepare-movies.mjs` genera 25 imágenes 360×480 q75 en `public/img/movies/` y `src/data/movies.ts` (`npm run movies:prepare`)
- [x] 11.4 Carrusel de películas: la fila de arriba usa la primera mitad de las imágenes y la de abajo la segunda; loop CSS sin salto y animación más lenta (55 s)
- [x] 11.5 Decoración parallax: 4 globos y 6 confetis fijos que se mueven solo con el scroll, con velocidades distintas; estáticos con `prefers-reduced-motion`
- [x] 11.6 README, DECISIONS y seed de la DB actualizados a las rutas `/img/...`
- [x] 11.7 Se elimina la sección "Ideas de disfraz" (grid y subtítulo) y su data (`costumes.ts`); el carrusel ocupa ese lugar
