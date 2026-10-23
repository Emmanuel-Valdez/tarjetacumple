## Why

La auditoría de la landing (detector de UI + revisión manual en 375 px y 1280 px) encontró 34 hallazgos de estilo genérico y 9 defectos verificables que caen justo sobre lo que el invitado necesita: texto duplicado en lectores de pantalla, 4 px de overflow horizontal, contraste no garantizado contra la foto de fondo, bordes de inputs en 1.72:1, un diálogo sin nombre accesible, targets táctiles de 38 a 42 px, errores de red silenciados y un contador de confirmados que puede mostrar "0" cuando en realidad falló la consulta. La invitación se comparte por WhatsApp y se lee en teléfono, así que cada defecto aterriza sobre el mensaje central de la fiesta. Ninguno es urgente, pero son baratos de arreglar y expensive de explicar después.

## What Changes

- Eliminar el markup muerto de las tarjetas de "Qué hay que traer" (spans con `opacity-0` sin estado visible): hoy duplican la etiqueta en lectores de pantalla y desbordan 4 px el documento, contradiciendo el requisito vigente de no tener scroll horizontal.
- Garantizar contraste WCAG AA con un scrim sobre el fondo fotográfico, de modo que el hero, los títulos de sección y los textos de tarjeta tengan un ratio verificable y no dependan de la zona de la foto que quede detrás.
- Subir los bordes de los inputs a 3:1 (WCAG 1.4.11) y corregir el gris del artista de la playlist, hoy en 4.09:1.
- Dar nombre accesible al diálogo RSVP (`aria-labelledby`) y llevar todos los controles interactivos a 44 px de alto.
- Manejar los errores de red del RSVP y de la playlist con mensajes visibles, en lugar de dejar el formulario sin respuesta.
- Evitar el doble envío que infla el contador de confirmados, y dejar de mostrar "0 personas" cuando la consulta falla.
- Reducir el neón: el glow queda reservado para el `h1` y el CTA, y los subtítulos pasan a dorado cine y texto claro, en lugar de repetir el trío cian/magenta/verde con halo en cada título.
- Pausar el marquee del hero y las filas de posters en hover y focus (WCAG 2.2.2), y hacer que "legalmente 30" quede legible en todo momento.
- Agregar `description` y etiquetas Open Graph, con una imagen de previsualización de 1200×630, para la previsualización del enlace en WhatsApp.
- Ajustar el costo de rendering: `will-change` acotado a lo que realmente se anima, polling menos frecuente y timers que se cortan al terminar.

## Capabilities

### New Capabilities

- `ui-quality`: reglas transversales de calidad de interfaz que aplican a todas las superficies públicas: contraste AA verificable, targets táctiles de 44 px, política de movimiento pausable, ausencia de markup muerto y de overflow horizontal.

### Modified Capabilities

- `landing`: hero y tarjetas con contraste garantizado, paleta de neón reducida, movimiento pausable, carrusel de películas discoverable en mobile, meta description y Open Graph, polling y timers acotados, y eliminación del markup muerto que rompe el requisito de no tener scroll horizontal.
- `rsvp`: errores de red visibles, un solo envío por pulsación, contador honesto cuando la consulta falla, diálogo con nombre accesible e inputs con contraste AA.
- `playlist`: estado de error visible cuando la API no responde y controles con contraste AA.
- `music`: el control expone el estado real del reproductor (muteado, reproduciendo, pausado) y alcanza un tamaño táctil de 44 px.

## Impact

- `src/pages/index.astro`: marcado de las tarjetas, clases de color y glow, scripts del cliente (countdown, contador, RSVP, playlist, polling de premios) y tamaño de los controles.
- `src/styles/global.css`: escala de color del tema, regla de glow, animaciones del marquee y de las filas de posters, tratamiento del fondo y `will-change`.
- `src/layouts/Layout.astro`: `meta description` y etiquetas Open Graph.
- Sin cambios en el contrato de las APIs públicas, sin cambios de schema de base de datos y sin dependencias nuevas.
- Verificación: `npm run check`, `npm run build` y medición de contraste, overflow y targets táctiles sobre la página renderizada en anchos de 375 px y 1280 px.
