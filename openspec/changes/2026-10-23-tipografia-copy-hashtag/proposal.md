## Why

La landing funciona y su identidad cine/neón está resuelta, pero toda la página habla con una sola voz tipográfica: `system-ui` en `global.css` y `text-2xl font-bold` repetido en cada `h2`. Los títulos de sección no se distinguen entre sí, los textos explicativos comparten tamaño con la metadata y las frases personales ("Te espero, no me falles") no tienen tratamiento propio. A eso se suma un copy desparejo: falta una tilde en "Peliculas", hay capitalización tipo inglés ("Los Premios de la Noche"), etiquetas genéricas ("Enviar", "buscar") y frases que contradicen el tono de invitación ("No traigas chicos").

Además se pide una sección nueva para compartir la noche con el hashtag `#Juli30`, en la línea de la referencia visual: título editorial, una línea de contexto, el hashtag como pieza central y **sin** botón de copiar. Hoy el hashtag no existe en ningún lado del código, así que también hay que darle un lugar en el módulo de contenido.

## What Changes

- Establecer una escala tipográfica de dos voces: sans del sistema para información y navegación, serif editorial para títulos de sección y frases personales. Sin dependencias nuevas ni fuentes externas; queda marcado en CSS el punto de upgrade a una serif autoalojada si más adelante se quiere más carácter.
- Aplicar una escala explícita (display, título de sección, subtítulo, cuerpo, metadata) en lugar de repetir `text-2xl` en todos los `h2`, con line-height y medida de línea acordes a cada nivel.
- Corregir el copy visible de la landing: tildes, mayúsculas, tono rioplatense consistente, etiquetas de acción que digan qué pasa al usarlas ("Confirmar asistencia" en vez de "Enviar") y mensajes de estado que nombren el objeto ("Canción sumada a la playlist" en vez de "¡Sumada!").
- Agregar la sección **Compartí la noche** con el hashtag `#Juli30`, ubicada entre la foto de julilogramos y la playlist, adaptada a la estética oscura actual (fondo translúcido, borde cian, hashtag en serif y color de acento). Sin botón ni texto de copiar.
- Incorporar `hashtag` a `src/data/event.ts` para que el valor no quede hardcodeado en el markup.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `landing`: nueva sección de hashtag, textos visibles actualizados y títulos de sección con jerarquía tipográfica en lugar de un mismo tamaño repetido.
- `ui-quality`: escala tipográfica y roles de fuente definidos como regla transversal de las superficies públicas.

## Impact

- `src/styles/global.css`: familias tipográficas, escala, line-height y clases de título de sección.
- `src/pages/index.astro`: marcado y clases de los títulos, copy de las secciones, etiquetas de botones y mensajes de estado, y la sección nueva de hashtag.
- `src/data/event.ts`: campo `hashtag`.
- Sin cambios de schema, endpoints, dependencias ni assets.
- Verificación: `npm run check`, `npm run build`, y revisión renderizada a 375 px y 1280 px (jerarquía visible, sin overflow horizontal, contraste AA sostenido).
