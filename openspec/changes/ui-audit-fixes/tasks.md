## 1. Fase 1 - Correcciones de accesibilidad y robustez

- [ ] 1.1 Borrar los cuatro spans con `opacity-0` y el `span.relative` de "Qué hay que traer" y verificar en el DOM renderizado que no queda ningún elemento con texto invisible, que cada encabezado se anuncia una sola vez y que `documentElement.scrollWidth` iguala a `clientWidth` a 375 px.
- [ ] 1.2 Marcar los dos emojis que faltan con `aria-hidden="true"` y verificar en el árbol de accesibilidad que los cuatro emojis decorativos quedan fuera de la lectura.
- [ ] 1.3 Agregar `aria-labelledby="rsvp-title"` al diálogo RSVP y `id="rsvp-title"` al encabezado del formulario, y verificar que el diálogo reporta nombre accesible y que el foco vuelve al botón que lo abrió.
- [ ] 1.4 Cambiar el borde de los cinco inputs de `border-gray-700` a `border-gray-500` y verificar que el límite en reposo de cada control queda en 3:1 o más contra el fondo del campo.
- [ ] 1.5 Cambiar el gris del artista de la playlist de `text-gray-500` a `text-gray-400` y verificar que el texto secundario de la lista queda en 4.5:1 o más.
- [ ] 1.6 Agregar el scrim sobre `.fondo-cine` y llevar las tarjetas a un fondo casi opaco, y verificar que el hero, un título de sección y el texto de una tarjeta mantienen 4.5:1 o más sobre la zona más clara de la foto.
- [ ] 1.7 Agregar `min-h-11` a los controles que hoy miden menos de 44 px (toggle de música, botón Sumar, inputs de la playlist, enlace de Google Maps y botones del modal) y verificar que ningún control interactivo queda por debajo de 44 px a 375 px.
- [ ] 1.8 Envolver los envíos del RSVP y de la playlist con manejo de error y timeout, y mostrar el mensaje en `#rsvp-status` y `#track-status`, y verificar con la API caída que aparece un mensaje de error y nunca un mensaje de éxito.
- [ ] 1.9 Cubrir la carga de la lista de tracks y la del contador de confirmados, y verificar que no quedan promesas rechazadas y que el contador muestra "confirmaciones no disponibles" en lugar de "0" cuando la consulta falla.
- [ ] 1.10 Deshabilitar el envío del RSVP mientras la petición está en vuelo y verificar que una doble pulsación registra un solo RSVP y no infla el contador.
- [ ] 1.11 Hacer que el control de música reporte el estado real del reproductor (muteado, reproduciendo, pausado, no disponible) y verificar que en la carga inicial no declara que hay sonido mientras el tema está muteado.

## 2. Fase 2 - Craft: paleta, movimiento y previsualización

- [ ] 2.1 Quitar `.neon-text` de los títulos de sección, de los encabezados de tarjeta, del kicker, de la fecha y del countdown, pasar los subtítulos a `text-cinema-gold` y verificar que el halo queda solo en el título de la página y en el botón de confirmación.
- [ ] 2.2 Redefinir los keyframes del marquee para que tenga un tramo de lectura y verificar que la frase "legalmente 30" queda completamente dentro del recuadro mientras descansa en la posición de lectura.
- [ ] 2.3 Agregar `animation-play-state: paused` al hover y al foco del marquee y de las filas de posters, y verificar que el movimiento se detiene al pasar el puntero y al mover el foco con el teclado.
- [ ] 2.4 Envolver la mitad duplicada de cada fila en un contenedor que se oculte con `display: none` en `pointer: coarse`, y convertir la fila en un contenedor con `overflow-x: auto` y `scroll-snap-type: x mandatory`, y verificar en un viewport táctil emulado que se recorren todos los posters sin repetir.
- [ ] 2.5 Agregar `meta description` y las etiquetas Open Graph al head, y agregar un script `scripts/prepare-og.mjs` con su alias en `package.json` que genere `public/img/og.png` de 1200×630 desde el fondo existente, y verificar que el PNG se genera, queda versionado y que el head contiene la descripción y las etiquetas de previsualización.

## 3. Fase 3 - Performance

- [ ] 3.1 Quitar `will-change: transform` de los hijos de `.decor`, que no tienen animación propia, y verificar que el parallax sigue desplazándose con el scroll.
- [ ] 3.2 Bajar el sondeo del concurso a 10 segundos, detenerlo con `document.hidden` y cancelarlo cuando el concurso está cerrado y los ganadores ya se revelaron, y verificar la cantidad de requests a la API en un minuto de página abierta.
- [ ] 3.3 Limpiar el intervalo del countdown cuando la fecha del evento ya pasó y verificar que el contador deja de actualizarse y muestra el mensaje de cierre.

## 4. Verificación integral

- [ ] 4.1 Correr `npm run check` y `npm run build` y verificar que terminan sin errores ni warnings nuevos.
- [ ] 4.2 Repetir la medición completa sobre la página renderizada a 375 px y 1280 px (contraste del texto, contraste de los límites, overflow del documento, tamaño de los targets y estado pausado del movimiento) y registrar los valores obtenidos junto a cada tarea que los verifica.
- [ ] 4.3 Correr `npx impeccable detect --json http://localhost:4321` y verificar que los 34 hallazgos previos bajan y que los que quedan son decisiones de diseño aceptadas y no regresiones.
- [ ] 4.4 Revisar capturas de la página completa a 375 px y 1280 px y verificar que la identidad de sala de cine se mantiene y que el cartel de claqueta del fondo sigue visible a través del scrim.
