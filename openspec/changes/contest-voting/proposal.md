## Why

La galería tiene hoy tres problemas que se van a notar el día de la fiesta: (1) el borrado de fotos desde `/admin` es ambiguo — borra la fila pero no el archivo, y el seed del arranque la vuelve a insertar, así que una foto "borrada" reaparece al reiniciar el contenedor; (2) las fotos del repo y las subidas viven en dos lugares distintos con reglas distintas, y la versión guardada de cada subida es una reescala genérica de 1600 px que no corresponde con el formato que se muestra en pantalla; (3) la sección "El backstage" es un carrusel horizontal con scroll infinito que no se scrollea bien en el celu y a la invitada no le gusta cómo queda.

Además falta la pieza principal de la noche: un **concurso de premios por voto**, con fotos de los disfraces que se suben en vivo desde el panel, votación desde el celular de cada invitado y anuncio de ganadores. Todo eso tiene que poder operarse **desde `/admin` a la hora de la fiesta, sin deploy y sin tocar código**.

## What Changes

### Almacenamiento de fotos (arquitectura)

- **Una sola versión por foto, inmutable**: cada subida se procesa con sharp y se guarda **únicamente** el resultado optimizado (WebP, lado mayor ≤ 1440 px, sin agrandar, sin recorte destructivo). El original **no se guarda**. El nombre es un UUID: nunca se sobreescribe un archivo existente.
- **El recorte visual lo hace el CSS** (`object-cover`) sobre una card de **3:4**, que es la proporción nativa de las fotos de celular en vertical: una foto tomada en portrait no se recorta nada. No se recorta al guardar: una foto de pareja en horizontal no pierde a nadie de forma permanente.
- **Las fotos del repo y las subidas se separan por origen, no por comportamiento**: la columna `filename` sigue diciendo `/` = estática (sirvida por Nginx/Astro desde `public/`) vs UUID = subida (sirvida por `/api/photos/[id]/file` desde el volumen).
- **Se agrega `photos.kind`** (`backstage` | `contest`): las fotos del repo son `backstage`; el admin elige a qué destino sube cada foto.
- **El borrado desde `/admin` deja de ser ambiguo**: las fotos del repo **no se pueden borrar** desde el panel (error explícito, en vez de un borrado a medias que el seed revierte). Las subidas sí se pueden borrar, **pero solo si no tienen votos** asociados.
- **El seed deja de resucitar filas**: solo inserta las fotos del repo que falten y nunca inserta una foto subida.

### "El backstage" deja de ser carrusel

- Se elimina el carrusel horizontal con scroll infinito (HTML, CSS y JS).
- Las fotos pasan a mostrarse en **tiras de fotos entre las secciones que solo hablan** (ubicación, dress code, solo adultos, qué hay que traer), en grilla, **reutilizando la card actual con el corazón y el contador de likes**.
- Las fotos del concurso **no aparecen en las tiras mientras el concurso está abierto**: solo los votos necesitan verlas, y así no se descargan imágenes que nadie está mirando. Después del concurso pasan a las tiras.

### Concurso de premios por voto (nuevo)

- **Sección de投票** con un botón de acceso ("Votar por los premios") en la sección de premios.
- **El admin abre el concurso** desde `/admin`: se congela la lista de categorías (los premios de `src/data/awards.ts`) y se habilita el voto.
- **Cada invitado vota desde su celular** con la cookie `visitor_id` que ya usa el corazón: ve una categoría, elige una foto, confirma, y pasa a la siguiente. El orden de las categorías es aleatorio y cada invitado vota **una sola vez por categoría**.
- **El admin cierra el concurso**: pide confirmación ("una vez cerrado no se puede volver a abrir") y, al confirmar, se calcula y **congela** el ganador de cada categoría. Los votos posteriores se rechazan.
- **El admin puede reiniciar el concurso** para ensayar (probarlo una vez y otra con la clienta): borra los votos y los ganadores y lo deja listo para abrir de nuevo. Exige escribir la palabra "reiniciar" y no se usa durante la fiesta.
- **Anuncio con suspenso**: al cerrarse, la página pública muestra una animación de 3 a 5 s y recién después revela los ganadores, que aparecen en las cards de cada premio.
- **Durante la votación no se muestra el tally** de cada foto (evita el efecto bandwagon); el conteo se ve al cerrar.

### Operativa de la noche

- Todo lo que hace falta durante la fiesta se opera desde `/admin`: subir fotos, elegir destino, abrir/cerrar el concurso, ver el tally y borrar fotos sin votos.
- **Script de backup del SQLite** (`npm run db:backup`) con backup online consistente (incluye el WAL), porque hoy la base no tiene ninguna copia.

## Capabilities

### New Capabilities

- `contest`: concurso de premios por voto — apertura/cierre desde el admin, votación por invitado con cookie de visitante, snapshot de ganadores y anuncio con suspenso.

### Modified Capabilities

- `gallery`: deja de ser un carrusel; pasa a ser tiras de fotos con like entre secciones; las fotos se guardan en una sola versión optimizada e inmutable; las fotos del repo no se borran desde el admin y las que tienen votos tampoco.
- `landing`: nueva sección de concurso con acceso, botón de votación y winners en las cards de premios.
- `admin`: nuevos controles del concurso (abrir, cerrar, tally) y destino de las fotos subidas.

## Impact

- **DB**: nueva migración (columna `photos.kind` + tablas `contest`, `contest_categories`, `contest_votes` con `UNIQUE(category_id, visitor_id)`). La migración corre sola al arrancar (`src/db/index.ts`), como hasta ahora.
- **APIs nuevas**: `GET /api/contest`, `POST /api/contest/vote`, `GET|POST /api/admin/contest`. Se modifica `GET|POST|DELETE /api/admin/photos` (nuevo campo `kind`, reglas de borrado) y `GET /api/photos` (filtra por destino y estado del concurso).
- **Código**: `src/pages/index.astro` (tiras, sección de concurso, winners), `src/pages/admin/index.astro` (controles), `src/pages/api/**`, `src/db/schema.ts`, `src/db/index.ts`, `src/lib/images.ts`, `src/data/awards.ts` (slug estable por premio), `src/styles/global.css`.
- **Datos**: `src/data/awards.ts` pasa a ser la fuente de las categorías del concurso (con `slug` estable). Las categorías se deciden con la cliente en los días previos y **las escribe el dev en ese archivo**: cambiarlas requiere un deploy, que se hace **antes** de la fiesta. Editar categorías en vivo desde `/admin` queda **fuera de alcance**.
- **Sin dependencias nuevas**: sharp ya está instalado; el reveal del suspense es CSS + un timeout en el cliente.
- **Deploy**: el change debe estar en producción **antes** de la noche; durante la fiesta solo se usa `/admin`.
