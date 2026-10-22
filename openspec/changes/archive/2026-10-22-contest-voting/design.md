## Context

Estado actual que condiciona el diseño (ver `proposal.md` para el porqué):

- **Dos orígenes de imágenes**: las del repo en `public/img/**` (se hornean en la imagen Docker, servidas como estáticas por Astro/Nginx) y las subidas por el admin en el volumen `juli30_data` → `/data/uploads/<uuid>.webp` (servidas por `/api/photos/[id]/file`). La tabla `photos` los distingue por el prefijo `/` del `filename`.
- **El borrado es ambiguo**: `DELETE /api/admin/photos` borra la fila pero no el archivo, y el seed de `src/db/index.ts` re-inserta toda foto del repo que falte en la tabla → una foto "borrada" reaparece al reiniciar el contenedor.
- **Las fotos del repo se sirven con `Cache-Control: public, max-age=31536000`**, así que aunque se borren, el browser y Cloudflare pueden seguir sirviendo el archivo un año.
- **Una sola foto, un solo proceso**: Astro SSR standalone (un proceso Node), better-sqlite3 **síncrono**, SQLite en WAL (lectores concurrentes, un escritor a la vez). Con ~50 personas votando a la vez el cuello de botella no existe: las escrituras son de milisegundos.
- **La noche no hay deploy**: todo lo que se haga durante la fiesta tiene que poder operarse desde `/admin`.
- Contenido editable en `src/data/*.ts`; los datos del evento (fecha, hora, lugar) viven solo en `src/data/event.ts`.

## Goals / Non-Goals

**Goals:**

- Que una foto, una vez subida, **no pueda cambiar ni desaparecer** mientras esté referenciada: un solo archivo, nombre único, nunca sobreescrito, y reglas de borrado que el admin entiende.
- Que el concurso se pueda **operar entero desde `/admin`** durante la noche: abrir, subir candidatos, ver el tally, cerrar.
- Que los ganadores queden **congelados** al cerrar el concurso y se anuncien con suspenso en la página.
- Que la página no descargue imágenes que nadie está mirando (los candidatos no se sirven en las tiras mientras se vota).

**Non-Goals:**

- Editar la lista de premios desde `/admin`: sigue siendo `src/data/awards.ts` (se cambia con un deploy, antes de la fiesta).
- Un login de invitados o un padrón: la identidad es la cookie anónima existente.
- Notificaciones, push o的结果 en vivo ("el ganador es X") antes del cierre.
- Una galería con filtros o búsqueda. Un solo camino de entrada: la API de fotos.

## Decisions

### D1 — Una sola versión por foto, sin recorte al guardar

**Qué:** `sharp(input).rotate().resize({ width: 1440, height: 1440, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 })`. Se guarda **solo** ese archivo (`.webp`, nombre UUID) en `/data/uploads`. El original no se guarda.

**Por qué el tope de 1440 en vez de "sin reescalar":** una foto de celular de 12 MP pesa 1-3 MB en WebP; 50 candidatos ≈ 100 MB de datos para los invitados esa noche, y la app los sirve con `readFile` en memoria. Con el tope, cada foto queda en 120-250 KB y 50 candidatos ≈ 10 MB. 1440 px de lado mayor es 3x la card de 3:4 (~180 px CSS) en un celu de 3x: no se ve diferencia a simple vista.

**Por qué no recortar al guardar:** el recorte es **permanente** y el original no se guarda, así que un recorte malo no se puede corregir. Una foto de pareja en horizontal (4:3 → 9:16) pierde el 58% del ancho y puede cortar a una persona de la foto. El recorte visual lo hace el CSS con `object-cover` sobre una card **3:4**, que es la proporción nativa de la cámara del celular en vertical: una foto tomada en portrait entra sin recorte, y una en horizontal (4:3) pierde 25% del ancho, no 58%. Si más adelante se quiere otra proporción, se cambia el `aspect-ratio` del CSS: **no hay que reprocesar ninguna foto**.

**Alternativa descartada:** guardar dos versiones (original + optimizada). Multiplica el disco, duplica la lógica de borrado y deja el "original" huérfano cuando la foto se borra.

### D2 — `photos.kind` en vez de una tabla nueva

Una columna de texto con dos valores (`backstage` | `contest`), default `backstage`, con índice. Las fotos del repo se registran como `backstage`; el admin elige el destino al subir. Una tabla nueva (`albums`, `photo_albums`) sería una JOIN extra por foto para guardar dos strings.

### D3 — Borrar: dos reglas explícitas, cero ambigüedad

| Foto | Resultado |
|---|---|
| Del repo (`filename` empieza con `/`) | **Rechazado (409)**: "las fotos del repo se borran del código, no desde acá". El archivo vive en la imagen del contenedor: borrarla es un cambio de código + deploy. |
| Subida, sin votos | Se borra la fila **y** el archivo del volumen. |
| Subida, con votos | **Rechazado (409)**: el voto quedaría apuntando a una foto inexistente. |

Esto elimina el caso "la borré y volvió": las fotos del repo ya no se pueden borrar desde el panel (no hay fila que el seed pueda resucitar) y las subidas nunca están en el manifiesto del seed.

### D4 — Seed idempotente y sin resucitar

El seed pasa a hacer **solo INSERT** de las fotos del repo que falten, con `kind='backstage'`. No borra ni actualiza filas existentes, y nunca inserta fotos subidas. Se elimina el `delete ... where filename = 'placeholder'`.

### D5 — El concurso es una máquina de estados de 3 estados

Tabla `contest` con **una sola fila** (`id = 1`):

| Estado | Significado |
|---|---|
| `idle` | Nadie lo abrió. La página dice "el voting todavía no abrió". |
| `open` | Se puede votar. Las categorías están congeladas. |
| `closed` | No se puede votar más. Los ganadores están calculados y congelados. |

**Abrir** → se copia `src/data/awards.ts` a `contest_categories` (slug, título, emoji, teaser, posición). **Cerrar** → por cada categoría se toma la foto con más votos y se guarda `winner_photo_id` + `winner_votes` en la misma fila de `contest_categories`.

**Cerrar es definitivo**: no hay reapertura. El pedido fue explícito ("una vez que el admin avise que se terminó el tiempo, ya no se puede acceder ni votar") y reabrir abriría la puerta a votos tardíos que cambian el resultado. El botón de cerrar pide confirmación explícita ("una vez cerrado no se puede volver a abrir") y el server la exige igual.

**Reset para ensayar**: como el cierre es irreversible, hace falta una vía para repetir el ensayo (probarlo una vez y otra con la clienta). Tercera acción de admin: `reset` → borra los votos, limpia los ganadores, vacía las categorías y deja el concurso en `idle` (listo para abrir de nuevo). **Guardas**: (a) el server exige `confirm: 'reiniciar'` en el body, así que un `fetch` accidental no borra nada; (b) la UI pide escribir la palabra "reiniciar" en un input; (c) el botón muestra un aviso de que no se use durante la fiesta. Las fotos candidatas **no** se borran (son contenido, no votos): el reset solo toca estado y votos.

### D6 — Los votos tienen `UNIQUE (category_id, visitor_id)`

La restricción está **en la base**, no en un check-then-insert de la app: un doble toque rápido no puede duplicar el voto (hoy `likes` sí tiene esa carrera: `src/pages/api/likes.ts` hace select y después insert).

La identidad es la cookie `visitor_id` que ya usa el corazón (HttpOnly, SameSite=Lax, 1 año). **Limitación conocida:** un invitado que cambie de celular o borre las cookies puede votar de nuevo. Para una fiesta es aceptable; los votos no tienen premio asociado a la persona.

### D7 — Las categorías salen de `src/data/awards.ts`, con `slug` estable

Cada premio gana un `slug` (`mejor-disfraz-femenino`, etc.). El slug es la clave de cruce entre `src/data/awards.ts` (cards de la landing) y `contest_categories` (snapshot + ganadores). El snapshot congela título/emoji/teaser: si después se edita el archivo, el concurso en curso no cambia.

**Quién las cambia y cuándo:** se deciden con la cliente en los días previos al evento y **las escribe el dev en `src/data/awards.ts`** (edit + deploy antes de la fiesta). No hay CRUD de categorías en `/admin`: durante la noche el snapshot las congela igual, y agrega una pantalla más que mantener para un cambio que ya está decidido antes del evento. Si alguna vez hace falta cambiarlas en vivo, se agrega el CRUD sobre la misma tabla `contest_categories`.

Categoría sin votos → **sin ganador**: la card queda sin foto (no se inventa un ganador).

### D8 — El tally no se muestra durante la votación

Mostrar "esta foto tiene 12 votos" induce el efecto bandwagon (se vota a la popular). Los candidatos se ven limpios; el conteo aparece al cerrar, en la card del ganador. El admin sí ve el tally en vivo.

### D9 — Los candidatos no están en las tiras mientras el concurso está abierto

`GET /api/photos` recibe un destino: las tiras piden las fotos `backstage` **más** las `contest` solo si el concurso ya no está `open`. Doble beneficio: (a) los invitados que están mirando la landing no descargan 50 fotos que no van a mirar, (b) las fotos de la casa ajena no circulan antes de tiempo.

### D10 — El suspense es del cliente, no del servidor

Cuando el estado pasa a `closed`, la página que está abierta hace polling cada 2 s; al ver `closed` renderiza la animación de 4 s y recién después pinta los ganadores. Con `prefers-reduced-motion` los ganadores se pintan directo. El reveal no depende de que el visitante estuviera mirando la página: cualquiera que la abra después ve los ganadores con la misma demora.

Los ganadores **no** se sirven como parte del listado de fotos: se leen de `contest_categories` (con `winner_photo_id`), de modo que el snapshot manda aunque el photo-list cambie.

### D11 — Tiras en grilla, con reparto determinista

Cuatro tiras de fotos (después de ubicación, después de dress code, después de solo adultos, después de "qué hay que traer"), en grilla de 2 columnas en mobile y 4 en desktop. El reparto es **por índice**: la foto *i* va a la tira `i % 4`. Con reparto determinista, subir una foto nueva no mueve las demás de lugar.

La card es la misma de hoy (imagen + botón de corazón + contador), con `object-cover` en una caja 3:4.

### D12 — Backup de la base

`scripts/backup-db.mjs` con `db.backup()` de better-sqlite3: es un **backup online consistente** (copia el contenido del WAL sin bloquear escrituras), a diferencia de copiar el `.sqlite` a mano. Sale en `data/backups/db-<timestamp>.sqlite`. El Dockerfile tiene que copiar `scripts/` a la imagen final para poder correrlo dentro del contenedor: `docker compose exec app node ./scripts/backup-db.mjs`.

## Risks / Trade-offs

- **[El deploy durante la fiesta reinicia el container]** → Se despliega antes de la noche. Si ocurre igual: la DB y los uploads viven en el volumen (no se pierden), el seed no toca fotos subidas y la migración es idempotente. Quedan segundos sin respuesta.
- **[Una foto con mal encuadre no se puede corregir]** (no se guarda el original) → Se sube de nuevo y se borra la anterior, siempre que no tenga votos.
- **[Un invitado cambia de celular y vota dos veces]** → Aceptado: el `UNIQUE` evita el doble toque, no el cambio de dispositivo. Los votos no tienen premio por persona.
- **[Caché de un año en `/api/photos/[id]/file`]** → Una foto borrada puede seguir descargándose por su URL directa, pero desaparece del listado (la API es dinámica) y el archivo local ya no existe. Los candidatos del concurso tienen URL con UUID: nunca se sirve una imagen vieja.
- **[Se cierra el concurso por error]** → No se puede reabrir. Mitigación: el botón de cerrar pide confirmación y el panel muestra el estado en vivo. Si igual hay que rehacerlo, el `reset` (que exige la palabra "reiniciar") deja el concurso como estaba al abrir.
- **[Alguien apretó "reset" en la fiesta]** → El server exige `confirm: 'reiniciar'`, la UI pide escribir la palabra y el botón avisa que no se use durante el evento. Riesgo residual aceptado.
- **[50 escrituras simultáneas sobre el mismo SQLite]** → WAL serializa las escrituras y el lock es de milisegundos. El `busy_timeout` default de better-sqlite3 (5 s) cubre el caso. Con ~50 votos en un minuto no hay problema.
- **[Editar la lista de premios después de abrir el concurso]** → El snapshot la ignora: el concurso sigue con las categorías congeladas (correcto para la noche, pero hay que avisar al admin en el panel).
- **Las fotos del repo no se pueden borrar desde `/admin`** → Es la decisión pedida (evita el borrado a medias). Borrarlas es borrar el `.webp` de `public/img/photos/`, regenerar el manifiesto y hacer deploy.

## Migration Plan

1. `npm run db:generate` → migración con `ALTER TABLE photos ADD COLUMN kind`, tabla `contest`, tabla `contest_categories`, tabla `contest_votes` (con `UNIQUE(category_id, visitor_id)`) e índices.
2. El seed pasa a insertar `kind='backstage'` y a no borrar filas.
3. `npm run check` + `npm run build` en local.
4. Deploy: `git pull && docker compose build && docker compose up -d` → la migración corre sola en el arranque (`src/db/index.ts`), como hasta ahora.
5. **Rollback**: volver al commit anterior. Las tablas nuevas quedan sin uso y no se pierde nada; lo único es que las fotos con `kind='contest'` vuelven a aparecer en la galería.

## Runbook de la noche

1. **Antes** (con el deploy hecho): revisar la lista de premios en `src/data/awards.ts` y el copy de la sección de votación.
2. **Durante**: el admin sube las fotos de los disfraces eligiendo destino **Concurso**, y abre el concurso con un clic.
3. Los invitados votan desde el celu (el botón "Votar por los premios" está en la sección de premios).
4. El admin mira el tally, y cuando termina el tiempo, **cierra** el concurso.
5. La página pública muestra el suspense y revela los ganadores en las cards de premios.
6. **Después**: backup de la base (`docker compose exec app node ./scripts/backup-db.mjs`).

## Open Questions

- La lista final de premios (cuántos y cuáles): se define antes de la fiesta; el snapshot la congela al abrir, así que cambiarla durante la noche no afecta al concurso en curso.
- Si al final se prefiere otra proporción (por ejemplo 9:16) para las cards: es un cambio de CSS, no de almacenamiento ni de reprocesado.
