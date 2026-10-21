## 1. Datos del evento

- [ ] 1.1 `src/data/event.ts`: `date: 'sábado 9 de enero de 2027'`, `time: '22:00 h'`, `dateISO: '2027-01-09T22:00:00-03:00'` (UTC-3 fijo, Argentina sin DST)
- [ ] 1.2 `src/pages/index.astro`: el countdown deja de hardcodear la fecha y lee `EVENT.dateISO` (inyectado como `<script type="application/json">`); verificar que cuenta bien contra 2027-01-09T22:00:00-03:00
- [ ] 1.3 Verificar que el copy del hero y de la sección "Dónde y cuándo" no contradicen la nueva fecha

## 2. Scroll horizontal

- [ ] 2.1 `src/styles/global.css`: `.banda-fiesta` deja de usar `transform: scale(1.05)` y usa `background-size: 108%` en su lugar
- [ ] 2.2 `src/styles/global.css`: `body { overflow-x: clip; }` como red de seguridad (no `hidden`, para no romper `position: sticky` ni recortar focus rings)
- [ ] 2.3 Verificar en Playwright a 390px y 1280px: `documentElement.scrollWidth === clientWidth`

## 3. Títulos y favicon

- [ ] 3.1 `src/pages/index.astro`: `<h1>` → "Juli: tener 30, ser coqueta y prospera" (se reordena el hero para que el lema sea lo protagonista)
- [ ] 3.2 `src/layouts/Layout.astro`: `<title>` → "Juli: De repente 30" + `apple-touch-icon` + `theme-color`
- [ ] 3.3 Dibujar `public/favicon.svg` a mano: zombie de Michael Jackson (fedora, pelo rizado, ojos claros, boca abierta, rayo) sobre fondo oscuro
- [ ] 3.4 Rasterizar con sharp (ya instalado) a `public/apple-touch-icon.png` (180×180) y `public/icon-512.png` (512×512)
- [ ] 3.5 Regenerar o descartar `public/favicon.ico` legacy según cómo se vea; ajustar los `<link>` del `<head>`
- [ ] 3.6 Verificar en el navegador que la pestaña muestra el icono zombie y el título correcto

## 4. Fondo en dos capas

- [ ] 4.1 `src/styles/global.css`: `.fondo-cine` con `background-image: url('/fondo.webp')`, `background-size: contain`, `background-position: center`, color de fondo `#0a0a0f` (letterbox) — se ve **entero y nítido**
- [ ] 4.2 `src/styles/global.css`: `.fondo-fiesta` con la foto de fiesta en `cover`, `filter: blur(18px) saturate(1.2)`, `opacity: 0` → `1`, `pointer-events: none`
- [ ] 4.3 `src/pages/index.astro`: `IntersectionObserver` sobre el hero que alterna la opacidad de `.fondo-fiesta` al salir del viewport
- [ ] 4.4 Eliminar `@keyframes hero-blur` y la animación de 2.4s (contradice el pedido de verlo nítido al entrar)
- [ ] 4.5 `prefers-reduced-motion`: la capa de fiesta aparece sin transición
- [ ] 4.6 Verificar: al entrar se ve `fondo.webp` completo y sin blur; al scrollear entra el fondo de fiesta difuminado

## 5. Secciones nuevas

- [ ] 5.1 Sección "Solo adultos": copy gracioso y temático de disfraces, algo como "Público: +18. Si sos menor de edad, te toca ver la película desde la匹配的 butaca" — tono de ficha de cine
- [ ] 5.2 Sección "Regalos" (o "Qué hay que traer"): dos ítems — "Tu presencia" y "Lo que vayas a tomar" (bebidas,protovodka,etc. con el tono de la invitada)
- [ ] 5.3 Ambas secciones con HTML semántico, copy en español rioplatense y foco/contraste correctos
- [ ] 5.4 Verificar que no rompen el flujo de las secciones existentes (hero → ubicación → banda → dress code → disfraces → premios → playlist → galería)

## 6. Disfraces

- [ ] 6.1 `src/data/costumes.ts`: remover Clueless, El Quinto Elemento, Midsommar, Legalmente Rubia, El Gran Lebowski y La Casa de Papel
- [ ] 6.2 `src/data/costumes.ts`: agregar "Chavo del 8" (item + why + emoji 📺) y "¿...y dónde están las rubias?" (item + why + emoji 👯, dos agentes disfrazados de rubias) — **sin foto**
- [ ] 6.3 `src/pages/index.astro`: el subtítulo "22 referencias para inspirarte" pasa a 18 (o se calcula desde `COSTUMES.length`)
- [ ] 6.4 Limpiar el mapa `PHOTO` de las entradas que se fueron y verificar que las 8 fotos restantes siguen mapeadas a la referencia correcta
- [ ] 6.5 Verificar que no queda ninguna referencia a las películas quitadas en el HTML renderizado

## 7. Premios

- [ ] 7.1 `src/data/awards.ts`: reescribir `AWARDS_INTRO` sin la instrucción "Organizá un concurso a mitad de la noche y entregá estatuillas similares a los Premios Oscar"
- [ ] 7.2 `src/data/awards.ts`: quitar el flag `revealed` de las 6 categorías
- [ ] 7.3 `src/pages/index.astro`: mostrar todas las categorías (`AWARDS` directo, sin `.filter()`) y sacar el texto "Las categorías se anuncian en el momento"
- [ ] 7.4 (opcional, NO bloqueante) Toggle de premios desde `/admin`: tabla de settings + endpoint + switch. Solo si se quiere recuperar el efecto "se anuncian en la noche"

## 8. Música de fondo

- [ ] 8.1 `src/pages/index.astro`: cargar `https://www.youtube.com/iframe_api` y crear el player con `playerVars: { autoplay: 1, mute: 1, loop: 1, playlist: 'PIb6AZdTr-A' }` (video oficial de Cyndi Lauper)
- [ ] 8.2 Player oculto: `position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none` — no ocupa layout
- [ ] 8.3 Listener único de `pointerdown`/`keydown` que hace `unMute()` una sola vez al primer gesto
- [ ] 8.4 Botón visible 🎵/🔇 con `aria-pressed` que hace `pauseVideo()`/`playVideo()` + mute/unmute; hint "toca para escuchar" mientras esté muteado
- [ ] 8.5 El botón es alcanzable por teclado y tiene foco visible
- [ ] 8.6 Manejo de error: si el player no carga, el resto de la página sigue funcionando y el botón no rompe
- [ ] 8.7 Verificar: autoplay muteado al cargar, unmute al primer clic, pausa/reanuda, sin que el player ocupe espacio

## 9. Verificación y docs

- [ ] 9.1 `npm run check` (0 errores) y `npm run build` (SSR) pasan
- [ ] 9.2 Verificación manual en `http://localhost:4321/` con Playwright a 390px y 1280px: scroll lateral, h1, `<title>`, favicon, fondo en 2 capas, secciones nuevas, disfraces (18), premios visibles, música
- [ ] 9.3 Consola del browser sin errores
- [ ] 9.4 Actualizar `DECISIONS.md` con las decisiones de este change (fecha real, fondo en 2 capas, YouTube IFrame API, premios visibles)
- [ ] 9.5 Actualizar `README.md` si cambió algo de la estructura (favicon, assets)
- [ ] 9.6 Marcar en `openspec/changes/juli30-landing/tasks.md` los ítems 8.2/8.3 de deploy como pendientes (siguen bloqueados por el VPS)

## 10. Nota: carpeta `.claude/`

- [ ] 10.1 Constatar en el commit inicial (`4b9ebe1`, "autoskills") que `.claude/skills/*` eran **symlinks** a `../../.agents/skills/*` (11 symlinks), generados por el scaffold de skills
- [ ] 10.2 Conclusión: **no se restaura**. Los skills viven en `.agents/skills/` (estándar cross-agent) y `.opencode/skills/` (OpenSpec); los symlinks de `.claude/` eran redundantes para este repo, que usa opencode
- [ ] 10.3 Decidir si el borrado se commitea (queda como ` D` en `git status`) o se deja sin commitear
- [ ] 10.4 Agregar `.claude/` a `.gitignore` para que el scaffold no lo vuelva a crear
