## Context

Ver `proposal.md` para la motivation y los cinco deltas de spec para los requisitos. La landing es SSR con Astro 7 + Tailwind v4 (tokens en `@theme`), una sola página con todo el markup y tres scripts de cliente en línea (countdown/RSVP/playlist/premios, parallax y música). El fondo cinematográfico es una imagen fija a pantalla completa con un `filter: blur()` que se activa cuando el hero sale del viewport. Los tokens de color del tema son `--color-cinema-black`, `--color-cinema-gold` y tres neones (`cyan`, `magenta`, `green`); la clase `.neon-text` aplica el halo cromático a todo elemento que la use.

El sitio se comparte por enlace en WhatsApp y se lee en teléfono, así que el ancho de referencia para medir es 375 px. La base es SQLite con Drizzle; `rsvps` no tiene índices únicos y la API de RSVP inserta siempre. `sharp` ya es dependencia y hay scripts generadores en `scripts/` con alias en `package.json` (`photos:prepare`, `movies:prepare`) que escriben en `public/img/`.

Restricciones del repo: español rioplatense en el copy visible, HTML semántico, foco visible, `prefers-reduced-motion` respetado, touch targets de 44 px, Zod para validar input de API y `sql` de Drizzle sin strings concatenados. Los datos del evento viven en `src/data/event.ts` y no se tocan.

## Goals / Non-Goals

**Goals:**
- Cerrar las violaciones de WCAG AA medidas (1.4.3 texto, 1.4.11 límites de control, 4.1.2 nombre accesible, 2.2.2 movimiento pausable) sin cambiar el contenido ni el tono del sitio.
- Bajar los 34 hallazgos de estilo del detector sin perder la identidad de sala de cine: la foto, la cartelera y los premios dorados ya sostienen el tema.
- Dejar cada corrección verificada con una medición reproducible, no con una impresión visual.

**Non-Goals:**
- Reemplazar la estética neón por otra paleta completa: se reduce el halo, no se cambia el concepto de cartelera iluminada.
- Agregar un sistema de diseño (`DESIGN.md`), un token nuevo de color o una librería de UI.
- Cambiar el contrato de las APIs públicas o el schema de la base.
- Revisar la página de votación `/votar` y el panel de admin, que quedan fuera del alcance de esta auditoría.
- Tocar la foto, la música o los datos del evento.

## Decisions

### Un scrim CSS sobre la foto, sin regenerar imágenes
El contraste del hero y de las tarjetas depende de qué zona de la foto queda detrás, y con `bg-gray-950/60` sobre una zona blanca el texto de apoyo queda en 2.13:1. Se agrega una capa de scrim (gradiente vertical) sobre `.fondo-cine`, y las tarjetas pasan a un fondo casi opaco. La alternativa descartada era pre-generar una versión oscura de la imagen con `sharp`: agrega un asset y un paso de build para un resultado que CSS resuelve en tres líneas. La alternativa de "oscurecer la foto original" se descarta porque mata la foto, que es lo que da identidad a la página.

### La paleta se reduce quitando el halo, no los tokens
`.neon-text` se deja únicamente en el `h1` y en el botón de confirmación. Los `h2` de sección y los `h3` de tarjeta pasan a `text-cinema-gold` sin halo, y el kicker, la fecha y el countdown conservan su color neón pero sin sombra de texto. Se conservan los tokens `--color-neon-*` porque el CTA y el `h1` los siguen usando: borrarlos sería un refactor sin beneficio. El dorado (`#d4af37`) sobre el negro da 8.5:1, así que los subtítulos quedan por encima de AA con holgura.

### Los spans de las tarjetas se borran
Los cuatro `span` con `opacity-0` de "Qué hay que traer" no tienen estado hover ni focus: no son un patrón, son markup muerto que duplica la etiqueta en el árbol de accesibilidad y desborda 4 px el documento. Se borran, junto con el `span.relative` del emoji que ya no aporta nada. La alternativa de convertirlos en badges visibles se descarta porque repetirían el texto del encabezado.

### El emoji decorativo se marca siempre
Las dos tarjetas con `aria-hidden="true"` en el emoji y las dos sin él quedan iguales: los cuatro emojis son decorativos y se ocultan de forma consistente.

### Bordes de input a `border-gray-500`
`border-gray-700` sobre `bg-gray-900` da 1.72:1 y WCAG 1.4.11 pide 3:1 para el límite de un control. `border-gray-500` da 3.67:1 y es un token ya disponible. La alternativa de usar `border-neon-cyan/50` exigiría mezclar el color con el fondo para calcular el ratio y complica el estado de foco.

### El doble envío se previene en el cliente
`POST /api/rsvp` inserta siempre y `rsvps` no tiene índice único, así que una segunda pulsación infla el contador. Se deshabilita el botón de envío mientras la petición está en vuelo. La alternativa de un índice único por nombre normalizado se descarta: dos invitados distintos pueden llamarse igual y el segundo quedaría bloqueado sin explicación. La API no cambia.

### Los errores de red se muestran en los nodos de estado que ya existen
`#rsvp-status` y `#track-status` ya son `role="status"` con `aria-live="polite"`: se reutilizan para el mensaje de error. El contador de confirmados pasa a mostrar "—" con un texto de "no disponible" cuando la consulta falla, en lugar de "0 personas", que es un dato falso. `loadTracks()` no tenía ningún `catch` y dejaba una promesa rechazada sin manejar: se cubre igual que los envíos.

### El carrusel se decide por tipo de puntero, no por ancho
El problema real es el dispositivo, no el viewport: en un teléfono entran 4 de los 13 posters de cada fila y la tira se mueve sola sin pausa. Con `pointer: coarse` la fila pasa a ser un contenedor con `overflow-x: auto` y `scroll-snap-type: x mandatory`, sin animación; con `pointer: fine` mantiene el auto-scroll. La mitad duplicada de cada fila se envuelve en un contenedor que se oculta con `display: none` en `pointer: coarse`: así el ancho real es el de una mitad y el scroll manual recorre posters sin repetir. Se descartó partir por ancho de pantalla porque un viewport angosto con mouse es un caso real y un teléfono con trackpad no lo es.

### La pausa del movimiento es CSS
`animation-play-state: paused` en `:hover` y `:focus-within` cubre el marquee y las filas de posters sin JavaScript. El script de IntersectionObserver ya resuelve el caso de reduced motion para el parallax.

### El marquee gana una pausa de lectura
Los keyframes actuales van de `translateX(100%)` a `translateX(-100%)` en 12 s, así que la frase central sale del recuadro. Se redefinen los tramos para que el texto entre, se detenga centrado en la posición de lectura y recién después siga. El cambio es de keyframes, no de markup.

### El desenfoque del fondo se mantiene
El `filter: blur(9px)` se aplica una sola vez por visita, cuando el hero sale del viewport, con una transición de 0.6 s: no es un costo continuo. Se descarta reemplazarlo por opacidad porque el desenfoque es parte de la metáfora de "salir del foco" y el costo medible está en otro lado. El `will-change` permanente de `.decor` sí se quita, porque ahí no hay animación: solo hay scroll.

### El polling se corta por visibilidad y por estado
El sondeo del concurso pasa de 3 s a 10 s, se detiene con `document.hidden` y se cancela cuando el concurso está cerrado y los ganadores ya se mostraron. El intervalo del countdown se limpia al pasar la fecha del evento.

### La imagen de previsualización se genera con `sharp`
Los clientes de mensajería no renderizan `.webp` en las previsualizaciones, así que hace falta un PNG. Se agrega un script `scripts/prepare-og.mjs` con su alias en `package.json` que genera `public/img/og.png` (1200×630) recortando el fondo existente con `sharp`. El PNG generado se versiona, igual que el resto de los assets generados en `public/img/`. No se compone texto dentro de la imagen: el título y la descripción viajan en los tags, y evitar el renderizado de texto con fuentes elimina una fuente de fallos entre máquinas.

### Los targets táctiles se resuelven con `min-h-11`
44 px es el mínimo pedido por el repo. Se agrega `min-h-11` a los controles que hoy miden entre 36 y 42 px: toggle de música, botón "Sumar", inputs de la playlist, botón de Google Maps y los botones del modal. Se prefiere `min-h-11` sobre cambiar el padding para no alterar el ritmo vertical de las secciones.

### El diálogo se nombra por referencia
`<dialog id="rsvp-modal">` recibe `aria-labelledby="rsvp-title"` y el `h2` del formulario recibe ese `id`. Se descarta `aria-label` porque duplicaría el texto del encabezado y podría desincronizarse.

## Risks / Trade-offs

- **El scrim oscurece la foto y puede tapar el cartel de claqueta** → Mitigación: el scrim es un gradiente, más denso donde se concentra el texto (centro y parte superior) y transparente en los bordes, y se revisa en captura a 375 y 1280 px antes de dar por cerrada la fase 1.
- **El dorado reemplaza al cian en los subtítulos y cambia el ritmo de color** → Mitigación: el cian sobrevive en el kicker, la fecha y el enlace de mapa, así el trío no desaparece; se revisa la captura de página completa contra la actual.
- **El carrusel pasa a scroll manual en táctil y deja de moverse solo** → Mitigación: es el comportamiento que exige el requisito de alcanzabilidad, y en `pointer: fine` el auto-scroll sigue igual; el efecto cine se conserva en el marquee del hero.
- **El contador muestra "—" durante una caída de la API y puede leerse como un bug** → Mitigación: el texto acompaña al valor ("confirmaciones no disponibles") y el caso es transitorio.
- **Deshabilitar el botón de envío confunde si la petición queda colgada** → Mitigación: el `fetch` no tiene timeout; se resuelve con `AbortController` con un timeout razonable para que el botón vuelva a habilitarse.
- **La verificación depende de medir sobre la página renderizada y no hay navegador en CI** → Mitigación: las comprobaciones críticas son de un solo comando de medición documentado en `tasks.md`; el build y el check de tipos siguen siendo la puerta automática.
- **Generar `public/img/og.png` agrega un archivo binario al repo** → Mitigación: es el mismo patrón que `photos:prepare` y `movies:prepare`, y el script queda disponible para regenerarlo.

## Migration Plan

1. Fase 1 (correcciones): borrar el markup muerto, nombrar el diálogo, corregir bordes y grises, agregar el scrim, los `min-h-11`, los `try/catch`, la guarda de doble envío y el contador honesto. Medir contraste, overflow y targets.
2. Fase 2 (craft): reducir el halo, agregar los tramos de lectura del marquee, convertir el carrusel en tira con snap en táctil y sumar los tags de previsualización con el PNG nuevo.
3. Fase 3 (performance): sacar el `will-change` muerto, bajar el polling, cortar los timers.

Cada fase es independiente y deja el sitio publicable: si solo se aplica la fase 1, el sitio ya cumple AA en contraste, targets y errores. El orden importa solo para la fase 2, que lee la composición final de la fase 1.

Rollback: revertir el release. No hay migración de datos, no hay cambios de schema y no hay cambios de contrato de API, así que no hace falta plan de reversa de base.
