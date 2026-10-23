## 1. Sistema tipográfico

- [x] 1.1 Definir en `global.css` `--font-sans` y `--font-serif` como tokens del tema, aplicar la sans en `body` y la serif en `.titulo-seccion` y `.hashtag`. Verificado en el render: `body` = system-ui, todos los `h2` de sección = serif, sin requests a orígenes de fuentes.
- [x] 1.2 Escala explícita con `clamp()` en `.titulo-seccion` (28 px a 375, 40 px a 1280) y `.hashtag` (35 px a 375, 48 px a 1280); el `h1` sigue siendo el mayor (36/60 px). Verificado: ningún `h2` comparte tamaño con el cuerpo (16 px).
- [x] 1.3 Descripciones de tarjetas, bajada de películas y contexto del hashtag pasan de `text-sm` a 16 px; `text-sm` queda en metadata (contador, estados, artistas, cuenta, kicker, labels de formulario). Verificado: 16 px y line-height 1.5+ en el copy nuevo.
- [x] 1.4 Las instrucciones y descripciones de tarjeta quedan alineadas a la izquierda; centrados solo hero, fotos, hashtag y regalos. Verificado a 375 y 1280.
- [x] 1.5 El countdown se deja como estaba: `font-mono` + `gap-4` ya separa los bloques y un rótulo extra competiría con el CTA. `ponytail: sin rótulo, agregar si alguien confunde las unidades.`
- [x] 1.6 Comentario `ponytail:` junto a `--font-serif` nombrando el techo (stack del sistema) y el upgrade (autoalojar una display serif).

## 2. Copy de la landing

- [x] 2.1 Hero: "Cumplo 30 y esta función necesita reparto. ¿Te sumás?" (`index.astro:31`). Contraste AA sostenido por el scrim existente.
- [x] 2.2 "Qué hay que traer" → "El kit de la noche"; tarjetas reescritas sin repetir "obligatorio", adultos en tono de invitación y bebida en una línea. Verificado sin overflow a 375 px.
- [x] 2.3 "Peliculas" → "Películas"; bajada en cuerpo y `gray-300`; carrusel sin cambios de comportamiento.
- [x] 2.4 "Los premios de la noche" y "Y todavía faltan varias categorías más."; el JS que oculta `#awards-more` sigue funcionando.
- [x] 2.5 Regalos: "podés hacerlo por transferencia:" en ambos estados (configurado y placeholder).
- [x] 2.6 "La escena final es con vos"; el `alt` de la foto sigue siendo independiente del título.
- [x] 2.7 Playlist: "Agregá una canción y armamos la banda sonora entre todos."; botón "Agregar"; contrato de `/api/tracks` intacto.
- [x] 2.8 `Canción sumada a la playlist.`, `Buscar en Spotify`, botón del RSVP "Confirmar asistencia", `aria-label` "Controlar música". Mensajes de error sin cambios.
- [x] 2.9 Revisión de tildes y mayúsculas: ningún `h2`/`h3` en title case (los títulos de premios quedan como los fija la spec).
- [x] 2.10 Hero: "Juli protagoniza:" → "Juli presenta:" y marquesina "Legalmente 30" con mayúscula inicial, según pedido.

## 3. Sección `#Juli30`

- [x] 3.1 `hashtag: '#Juli30'` en `EVENT`; `npm run check` sin errores con `as const`.
- [x] 3.2 Sección entre julilogramos y playlist: `h2` "Compartí la noche", línea de contexto y hashtag como `<p>`. Sin botón, sin `tabindex`, sin rol de control.
- [x] 3.3 Estilo con la paleta vigente: caja `gray-950/90` con borde `neon-cyan/25`, título serif dorado y hashtag serif itálico verde. Medido: hashtag 14.57:1, título 9.39:1, contexto por encima de 15:1.
- [x] 3.4 Verificado a 375 px: hashtag 35 px, sin overflow (`scrollWidth = clientWidth`) y texto seleccionable con el mecanismo nativo.

## 4. Marquesina del hero

- [x] 4.1 `padding-block: 0.14em` en `.marquee` y `line-height: 1.18` en el `span`. Medido a 375 (30 px de fuente): 6.7 px libres arriba y abajo; a 1280 (48 px): 6.7 px libres. Capturas `hashtag-hero-rest-375.png` y `hashtag-hero-rest-1280.png`: la "g" de "Legalmente" se ve completa.

## 5. Verificación

- [x] 5.1 `npm run check`: 0 errores, 0 warnings, 0 hints. `npm run build`: completo en 7,6 s.
- [x] 5.2 Revisado a 375 y 1280: jerarquía visible (h1 36/60, sección 28/40, cuerpo 16), sin scroll horizontal (360/360 y 1265/1265), contraste AA en el copy nuevo y targets de 44 px intactos.
- [x] 5.3 Al archivar, sincronizar los deltas a `openspec/specs/landing/spec.md` y `openspec/specs/ui-quality/spec.md`.
