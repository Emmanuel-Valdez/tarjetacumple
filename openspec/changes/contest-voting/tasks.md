## 1. Base de datos

- [ ] 1.1 `src/db/schema.ts`: agregar `kind` a `photos` (`text('kind').notNull().default('backstage')`) y las tablas `contest` (fila única `id=1`, `status` idle|open|closed, `opened_at`, `closed_at`), `contest_categories` (slug único, title, emoji, teaser, position, `winner_photo_id`, `winner_votes`) y `contest_votes` (category_id, photo_id, visitor_id, created_at, `UNIQUE(category_id, visitor_id)`). Verificar que `drizzle-kit generate` produce una migración con un solo ALTER y los CREATE TABLE.
- [ ] 1.2 `src/db/index.ts`: el seed inserta solo las fotos del repo que falten, con `kind='backstage'`, sin borrar ni actualizar filas y sin tocar fotos subidas. Verificar arrancando dos veces la app: `select count(*) from photos` no crece y las fotos subidas siguen ahí.
- [ ] 1.3 Aplicar la migración en local (`npm run db:migrate`) y verificar que `photos` conserva las filas existentes con `kind='backstage'`.

## 2. Almacenamiento de imágenes

- [ ] 2.1 `src/lib/images.ts`: la optimización pasa a `rotate()` + `resize({width:1440,height:1440,fit:'inside',withoutEnlargement:true})` + `webp({quality:80})`; se elimina el `MAX_EDGE` de 1600 y el nombre del archivo pasa a ser `<uuid>.webp`. Verificar subiendo una foto de 4000x3000: el archivo guardado mide 1440x1080 y pesa menos de 300 KB.
- [ ] 2.2 `src/pages/api/admin/photos.ts` (POST): acepta el campo `kind` (`backstage` | `contest`, default `backstage`) y lo guarda en la fila; el nombre del archivo es un UUID (nunca sobreescribe). Verificar subiendo dos fotos con el mismo nombre original: quedan dos archivos distintos.
- [ ] 2.3 `src/pages/api/admin/photos.ts` (DELETE): rechazar con 409 las fotos del repo (`filename` empieza con `/`) y las que tengan votos en `contest_votes`; borrar fila **y** archivo solo en el caso permitido. Verificar: borrar una foto del repo devuelve error y sigue en la galería; borrar una foto subida sin votos la elimina de la galería y del volumen.
- [ ] 2.4 `src/pages/api/photos.ts`: el listado acepta el destino y, mientras el concurso esté `open`, excluye las fotos `contest`. Verificar con el concurso abierto: las fotos de destino `contest` no aparecen en el listado de las tiras.

## 3. API del concurso (público)

- [ ] 3.1 `GET /api/contest`: devuelve `{ status, categories: [{id, slug, title, emoji, teaser, voted}], pending }` con las categorías pendientes en **orden aleatorio** y `voted` según la cookie `visitor_id`. Verificar: dos peticiones del mismo visitante devuelven el mismo `voted`, y el orden de las pendientes cambia entre llamadas.
- [ ] 3.2 `GET /api/contest`: cuando el estado es `closed`, devuelve los ganadores (`winner_photo_id`, `winner_votes`) por categoría. Verificar: tras cerrar, la respuesta trae el ganador de cada categoría con su conteo de votos.
- [ ] 3.3 `POST /api/contest/vote`: valida con zod `{ categoryId, photoId }`; rechaza si el concurso no está `open`, si la categoría ya fue votada por ese visitante, o si la foto no es de destino `contest`; inserta el voto con la cookie de visitante. Verificar: dos votos del mismo visitante en la misma categoría → el segundo devuelve error y el conteo no cambia; un voto con `photoId` de una foto `backstage` → error.
- [ ] 3.4 Los votos se counted por categoría y se devuelven solo al admin. Verificar: `GET /api/contest` mientras el concurso está abierto no incluye conteos de votos por foto.

## 4. API admin del concurso

- [ ] 4.1 `POST /api/admin/contest` con `{ action: 'open' | 'close' }`: `open` congela las categorías de `src/data/awards.ts` en `contest_categories` y pone el estado en `open`; `close` calcula el ganador por categoría (más votos), lo guarda y pasa el estado a `closed`. Verificar: abrir congela la lista; cerrar calcula los ganadores.
- [ ] 4.2 `close` es definitivo: `open` sobre un concurso cerrado devuelve 409. Verificar: intentar reabrir después de cerrar devuelve error y los ganadores siguen iguales.
- [ ] 4.3 `GET /api/admin/contest`: devuelve el estado y el tally por categoría (foto + votos). Verificar: con votos de prueba, el tally los refleja.
- [ ] 4.4 Ambas rutas validan `verifySession` (admin) como el resto de las mutaciones. Verificar: sin cookie de sesión devuelven 401.
- [ ] 4.5 `POST /api/admin/contest` con `{ action: 'reset', confirm: 'reiniciar' }`: borra los votos, limpia los ganadores, vacía las categorías y vuelve el estado a `idle`. Sin `confirm` con el texto exacto devuelve 400. Las fotos no se tocan. Verificar: reset con la palabra → el conteo de votos queda en 0 y el estado vuelve a `idle`; reset sin la palabra → 400 y no se borra nada.

## 5. Landing: tiras y sección de concurso

- [ ] 5.1 `src/pages/index.astro`: eliminar la sección "El backstage" (carrusel) y su JS de scroll infinito / arrastre; eliminar de `src/styles/global.css` las reglas `.gallery-track`, `.gallery-pista`, `.gallery-item`. Verificar: no queda referencia a `gallery-pista` en el HTML renderizado.
- [ ] 5.2 `src/pages/index.astro`: agregar **cuatro tiras** de fotos en grilla entre las secciones de texto (después de ubicación, dress code, solo adultos y "qué hay que traer"), con la card actual (imagen + botón de corazón + contador) en caja 3:4 con `object-cover`. Verificar en 390 px: grilla de 2 columnas, sin scroll horizontal.
- [ ] 5.3 El reparto de fotos entre tiras es determinista por índice (foto *i* → tira `i % 4`) y se hace en el cliente con los datos de `/api/photos`. Verificar: subir una foto nueva no cambia de tira las fotos ya publicadas.
- [ ] 5.4 `src/pages/index.astro`: botón "Votar por los premios" en la sección de premios que lleva a la sección de concurso (`#concurso`), con foco visible y `scroll-behavior: smooth`. Verificar con teclado: el botón se alcanza con Tab y el destino recibe el foco.
- [ ] 5.5 Sección de concurso: muestra la categoría pendiente con sus candidatos (sin conteo de votos), botón de confirmar deshabilitado hasta elegir una foto, y al confirmar pasa a la siguiente categoría; cuando el visitante terminó todas, avisa que están completos. Verificar: elegir una foto habilita el botón; al confirmar avanza de categoría.
- [ ] 5.6 Sección de concurso en estado `idle`: mensaje de "el voting todavía no abre" sin controles de voto. Verificar antes de abrir el concurso.
- [ ] 5.7 Anuncio con suspenso: con el estado `closed`, la página muestra la animación de 3-5 s y recién después pinta los ganadores en las cards de premios; con `prefers-reduced-motion` los ganadores aparecen sin animación. Verificar en ambos casos.
- [ ] 5.8 Las cards de premios muestran la foto del ganador cuando hay ganadores y quedan sin foto antes del cierre. Verificar con el concurso abierto y después de cerrarlo.
- [ ] 5.9 La página hace polling del estado del concurso (2 s) mientras está abierta y `open`, para que el reveal ocurra sin recargar. Verificar: con el concurso abierto en otra pestaña, la que está mirando cambia sola al cerrar.

## 6. Panel admin

- [ ] 6.1 `src/pages/admin/index.astro`: el formulario de subida de fotos tiene un selector de destino (Tiras / Concurso) que manda `kind` en el POST. Verificar: una foto subida como "Concurso" no aparece en las tiras de la landing mientras el concurso está abierto.
- [ ] 6.2 `src/pages/admin/index.astro`: sección de concurso con el estado, los botones "Abrir" y "Cerrar", y el tally por categoría. El botón "Cerrar" pide confirmación con el texto "una vez cerrado no se puede volver a abrir". Verificar: los botones reflejan el estado (no se puede cerrar un concurso que no está abierto) y al cancelar la confirmación el concurso sigue abierto.
- [ ] 6.3 `src/pages/admin/index.astro`: al borrar una foto, mostrar el error del servidor (409) en vez de silenciarlo. Verificar: al intentar borrar una foto del repo se lee el mensaje de error.
- [ ] 6.4 La lista de fotos del admin muestra el destino de cada foto. Verificar.
- [ ] 6.5 `src/pages/admin/index.astro`: botón "Reiniciar concurso" con un aviso de que borra los votos y no se debe usar durante el evento; pide escribir la palabra "reiniciar" en un input antes de habilitarlo. Verificar: sin la palabra el botón no hace nada; con la palabra el concurso vuelve a `idle` y el tally queda en 0.

## 7. Backup de la base

- [ ] 7.1 `scripts/backup-db.mjs` con `db.backup()` de better-sqlite3 hacia `data/backups/db-<timestamp>.sqlite`, y el script `npm run db:backup` en `package.json`. Verificar: el archivo de backup se crea y abre con `sqlite3` sin errores (debe incluir los datos del WAL).
- [ ] 7.2 `Dockerfile`: copiar `scripts/` a la imagen final para poder correr el backup dentro del contenedor. Verificar con `docker compose exec app node ./scripts/backup-db.mjs`.

## 8. Verificación y documentación

- [ ] 8.1 `npm run check` (0 errores) y `npm run build` (SSR) pasan. Verificar ambos comandos.
- [ ] 8.2 Prueba manual a 390 px y 1280 px: tiras de fotos, sección de concurso (votar una categoría completa), reveal con suspenso y ganadores en las cards. Verificar con el dev server (`npx astro dev --background`).
- [ ] 8.3 Prueba de carga: 50 votos simultáneos desde curl contra `POST /api/contest/vote` → todos quedan contados y ningún voto se pierde. Verificar el conteo en la DB.
- [ ] 8.4 Consola del browser sin errores en la landing y en `/admin`. Verificar.
- [ ] 8.5 `DECISIONS.md`: ronda con las decisiones de este change (almacenamiento de fotos, `kind`, reglas de borrado, concurso, snapshot de categorías, backup).
- [ ] 8.6 `README.md`: actualizar la tabla de APIs (rutas nuevas) y el comando `db:backup`.
- [ ] 8.7 `openspec/changes/contest-voting/tasks.md`: marcar todo lo hecho y archivar el change (`openspec archive`) **con el dev server frenado** (`astro dev stop`).
