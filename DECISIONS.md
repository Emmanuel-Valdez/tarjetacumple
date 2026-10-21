# Decisiones — Tarjeta Cumple (Juli 30)

## Proyecto
- Invitación web de cumpleaños 30 con temática cine (disfrazes de películas/series).
- Fecha, hora y lugar: los define `src/data/event.ts` (fuente única; no se repiten en los docs). Zona ART = UTC-3 fijo, sin DST.
- Subdominio: `juli30.evaldez.ar`.
- Temática: fiesta de disfraces con referencias a películas/series icónicas.
- Estilo visual: negro + dorado + rojo cortina, tira de film, claqueta, "próximo estreno".

## Stack (decidido)
- Frontend: Astro + TypeScript + Tailwind CSS (patrón Pastelería Ivanna).
- Backend: Astro SSR (Node adapter) — un solo contenedor, sin API separada.
- DB: SQLite (archivo en volumen Docker). ORM/query builder: por definir (Drizzle o better-sqlite3 con prepared statements).
- Deploy: Docker Compose + Nginx (VPS Oracle) + GitHub Actions CI/CD con Tailscale SSH.
- HTTPS vía Nginx + Cloudflare (Full strict), como portfolio.

## Funcionalidades
- Hero: nombre + frase invitación + countdown (client JS, `prefers-reduced-motion`).
- Sección ubicación: link a mapa + dirección.
- Playlist: embed de Spotify (iframe) + lista propia donde invitados agregan "canción + artista" (guardado en DB, link "buscar en Spotify"). Reproducción en página solo vía embed.
- RSVP: botón → modal (focus trap, ESC, retorno foco). Formulario: nombre, acompañantes, confirmación asistencia (solo "sí"). Persistido en SQLite.
- Contador en vivo de confirmados (actualiza al confirmar).
- Panel admin (`/admin`): login simple (user `juli`), listar RSVPs, eliminar entradas no reales. Ver también fotos y likes.
- Galería estilo Instagram (grid) + carrusel con botón "like" persistente (1 like por visitante vía cookie anónima).
- Fotos: solo el admin las sube (upload en panel admin). Sin personalización por invitados.

## Accesibilidad (requisito)
- HTML semántico, ARIA en modal, skip link, labels + aria-describedby, contraste AA.
- `prefers-reduced-motion` en countdown/animaciones.
- `aria-live` solo en hitos, no cada segundo.
- Teclado completo (modal, carrusel, formularios).

## Seguridad
- Secretos en `.env` (nunca commitear). Admin password vía env `ADMIN_PASSWORD` (valor real solo en VPS, no en repo).
- Session cookie admin: httpOnly, secure, sameSite.
- Password hasheado (bcrypt/argon2) — no guardar en claro.
- Validación de inputs (zod), prepared statements (sin SQL injection).
- Upload: validar mime/size, nombre aleatorio, servir desde volumen.
- Rate limiting en endpoints RSVP/likes/upload.
- CSRF en formularios mutadores.

## Persistencia de archivos
- Uploads en volumen Docker montado (ej. `/data/uploads`), servidos por Astro endpoint o Nginx.
- DB SQLite en volumen (ej. `/data/db.sqlite`).

## Abierto / por definir
- ORM vs query builder (Drizzle recomendado por tipado).
- Identificación de visitante para likes (cookie anónima vs fingerprint). Recomendación: cookie con id aleatorio.
- Dominio de imágenes: ¿optimizar con astro:assets (build-time) no aplica a uploads runtime → servir directo.
- Diseño detallado de secciones cine/series.

## Reglas de trabajo (agregada)
- **No hacer commit ni push sin pedido explícito del usuario.** Stagear/editar archivos está ok; commitear solo cuando se pida.
- Repo: `https://github.com/Emmanuel-Valdez/tarjetacumple.git` (origin configurado).

## Respuestas a hilos abiertos
- Fecha confirmada: 10 de enero 2027.
- Subdominio: `juli30.evaldez.ar`.
- Admin: login simple, user `juli`, password vía env `ADMIN_PASSWORD` (valor real solo en VPS).
- RSVP: solo confirmación "sí".
- Stack: Astro SSR (Node) + SQLite, un contenedor (sin API separada).
- CI/CD con HTTPS (Nginx + Cloudflare Full strict), máxima seguridad.
- Visitor ID para likes: **cookie anónima** (recomendado, aceptado).
- Contador en vivo: **polling 15s** (aceptado).
- Upload de fotos: **input simple** (aceptado).
- Galería: fotos propias de Juli (pendiente de que las suba).

## Spotify OAuth "para Juli" (cómo sería)
Para que Juli agregue canciones a su playlist real de Spotify:
1. Juli autoriza la app una vez (OAuth con scopes `playlist-modify-public`/`private`).
2. Se guarda su **refresh token** cifrado en SQLite (env para la clave).
3. Endpoint `/api/playlist/add` busca el track en Spotify Search API y lo agrega a su playlist vía Web API.
4. En v1: mock visual (lista + embed) para que ella confirme el diseño; luego se conecta OAuth.
- Requiere cuenta Spotify Premium de Juli + crear app en Spotify Developer Dashboard.

## Sección "Disfraces sugeridos" (nueva idea)
Mostrar las 20 referencias como tarjetas (título + item característico caricaturizado + por qué funciona), para inspirar a los invitados. Items caricaturizados: máscara de Ghostface, capucha de Batman, globo rojo de Pennywise, traje a rayas de Beetlejuice, etc.

Referencias (20):
1. Pulp Fiction — Mia Wallace / Vincent Vega (camisa blanca + bob negro / traje negro)
2. Beetlejuice — Beetlejuice / Lydia Deetz (rayas + pelo verde / vestido rojo gótico)
3. Clueless — Cher Horowitz (tartán amarillo)
4. The Matrix — Neo / Trinity (gabardina cuero negro + lentes)
5. Barbie — Barbie / Ken (vaquera rosa / patinaje neón)
6. El Extraño Mundo de Jack — Jack / Sally
7. Kill Bill — La Novia (chándal amarillo + katana)
8. La Familia Addams — Miércoles / Morticia
9. El Caballero de la Noche — Joker (Heath Ledger)
10. El Diario de la Princesa — Mia Thermopolis (tiara + audífonos)
11. It — Pennywise (+ globo rojo)
12. Scream — Ghostface
13. El Quinto Elemento — Leeloo (arnés blanco / pelo naranja)
14. El Cisne Negro — Nina (tutú negro + maquillaje)
15. Legalmente Rubia — Elle Woods (todo rosa + chihuahua)
16. La Casa de Papel — Atracador (mono rojo + máscara Dalí)
17. Bastardos Sin Gloria — Shosanna (vestido rojo + velo)
18. Midsommar — Dani (corona de flores)
19. El Gran Lebowski — The Dude (bata + sandalias)
20. Joker (2019) — Arthur Fleck (traje rojo + chaleco amarillo)

## Tema visual (actualizado)
- Concepto: **"fiesta en el cine"** — noche de estreno, luces de neón, cortinilla.
- Fondos oscuros (negro profundo) con letras **fluor/neón** que destellan (glow) para simular fiesta nocturna.
- Acentos: dorado (cortina) + neón (cian/magenta/verde) para texto destacado.
- Divisores: tira de film, claqueta, estrellas, luces de sala.
- Fotos: placeholders / imágenes web por ahora (Juli subirá las reales después).

## Sección "Disfraces sugeridos"
- Componente: **carrusel** (y posiblemente grid alternativo para elegir). 20+ referencias → carrusel con paginación.
- Cada tarjeta: título + item característico caricaturizado + "por qué funciona".

## Referencias adicionales (disfraces)
21. Harry Potter — capa, varita, bufanda de casa, lentes redondos.
22. El Señor de los Anillos — capa élfica, espada, anillo, orejas puntiagudas.

## Spotify (v1)
- v1: mock visual (lista + embed) para aprobación de diseño.
- OAuth real (cuenta de Juli) se implementa después de aprobación.
## Abierto / por definir

- ORM vs query builder (Drizzle recomendado por tipado).
- Subida de fotos: ¿validar dimensiones mínimas?
- Dominio de imágenes: servir directo desde volumen (sin astro:assets en runtime).
- Diseño detallado de secciones cine/series.

## Ronda 3 — decisiones (2026-10)

- **Contenido en `src/data/`**: `event.ts` (fecha/lugar/Maps/Spotify), `costumes.ts` (22 disfraces con item + por qué + foto), `awards.ts` (premios con flag `revealed`), `gallery.ts` (generado). No se hardcodea copy en los `.astro`.
- **Fotos del repo**: `src/img/*.jpg` → `public/img/photos/*.webp` con `npm run photos:prepare` (sharp, máx 576px, q82). Los fondos salen del mismo script a `public/img/fondo-desktop.webp` y `fondo-mobile.webp`. Se registran solas en la DB al arrancar (seed idempotente). Las fotos en `public/` se sirven estáticas; las subidas por admin viven en el volumen.
- **Subida de imágenes**: sharp reescala a WebP (1600px, q82) en el server → ~100 KB por foto en vez de varios MB. Tope de entrada 12 MB. Sin límite de cantidad.
- **Sharp** (`sharp@0.35.5`) como dependencia directa: es el análogo de SkiaSharp que usa VaultShop, pero native de Node.
- **Galería**: carrusel horizontal minimalista, scroll infinito (3 copias de la pista, wrap en scroll), sin botones, arrastre con mouse — en el estilo de fddtour.com.ar.
- **Hero**: `fondo.webp` de fondo fijo, entra nítido y se difumina (blur 9px + brightness 0.7) a los 2.4 s. `prefers-reduced-motion` lo muestra ya difuminado. *(Superado en Ronda 5 por el fondo único que se difumina al scrollear.)*
- **Premios Oscar**: sección "Los Premios de la Noche". *(En Ronda 4 pasan a categorías siempre visibles.)*
- **Ubicación real**: la de `src/data/event.ts` (con place id de Maps).
- **Contador de confirmados**: cuenta *personas* (1 + acompañantes), no filas.
- **Deploy**: el build ocurre **en el VPS** (`git pull && docker compose build && up -d` por Tailscale SSH). No se publica imagen en GHCR. Compose usa `env_file: .env` y volumen `juli30_data` para db + uploads.
- **`SESSION_SECRET` obligatorio en producción**: `src/lib/auth.ts` tira error si falta o es el valor de dev. Firma las cookies de sesión con HMAC: quien lo conozca puede suplantar a Juli o a la organizadora. Generar con `openssl rand -hex 32`.
- **Cookies de sesión**: se agrega `Secure` cuando `NODE_ENV=production`.
- **Admin**: ahora también gestiona canciones (listar/borrar) y fotos (listar/subir/borrar, con likes visibles).
- **OpenSpec**: `tasks.md` actualizado con la sección 9 (contenido y diseño v2); specs de `landing`, `gallery`, `rsvp` y `admin` actualizadas.


## Respuestas (ronda 2)
- Hora y dirección: placeholders por ahora. Dirección exacta se puede poner con link compartido de Google Maps ("Compartir" → copiar enlace).
- Dress code: mensaje gracioso para quienes vayan sin disfraz (ej. "si venís de civil, te toca ser extra de fondo").
- Frase de invitación (propuesta): "Algunas historias merecen una secuela. La mía cumple 30 y la fiesta es de disfraces. ¿Te sumás al reparto?"
- Countdown: días/horas/min/seg.
- RSVP incluye campo "dedicatoria".
- Dos logins: Juli (no ve dedicatorias) y organizadora (hermana, recolecta dedicatorias para video). Export/copiar lista.
- Admin: copy-to-clipboard mínimo; CSV opcional.

## Change de OpenSpec
- Change `juli30-landing` creado y validado (proposal, specs x5, design, tasks). Listo para implementar al salir de explore mode.

## Mobile-first
- Diseño mobile-first: base styles para móvil, escalar con breakpoints sm/md. Touch targets ≥44px.
- API separada / microservicios.
- Auth de invitados (solo admin).
- Personalización de fotos por invitados.
- Notificaciones email (posible después).

## Ronda 4 — front-polish (change `front-polish`)

- **Fecha real**: la de `src/data/event.ts` (`date`, `time` y `dateISO`; ART = UTC-3 fijo, Argentina no usa DST). El countdown lee `EVENT.dateISO`.
- **Scroll lateral**: la causa era `.banda-fiesta` con `transform: scale(1.05)` (el transform suma al overflow visual). Se reemplaza por `background-size: 108%` y se agrega `body { overflow-x: clip }` como red de seguridad (`clip`, no `hidden`, para no romper `position: sticky` ni recortar focus rings).
- **Fondo en dos capas**: `.fondo-cine` muestra `fondo.webp` **entero y nítido** (`contain` + letterbox del color de fondo) y `.fondo-fiesta` (foto de la fiesta con `blur(18px)`) entra al scrollear vía `IntersectionObserver` sobre el hero. Se elimina el `@keyframes hero-blur`. `prefers-reduced-motion` quita la transición. *(Superado en Ronda 5: un solo fondo, horizontal en desktop y vertical en mobile, que se difumina al scrollear.)*
- **Identidad**: `<h1>` = "Juli: tener 30, ser coqueta y prospera"; `<title>` = "Juli: capitulo 30, la pelicula". Favicon zombie de MJ dibujado a mano en `public/img/favicon.svg`, rasterizado con sharp a `apple-touch-icon.png` (180) e `icon-512.png` (512). El `.ico` legacy se descarta (sharp no emite `.ico`).
- **Música de fondo**: YouTube IFrame API con el video oficial de *Girls Just Want to Have Fun* (`PIb6AZdTr-A`), autoplay **muteado** (política de los navegadores), unmute al primer `pointerdown`/`keydown` y botón visible 🎵/🔇 con `aria-pressed`. Sin dependencias npm nuevas.
- **Premios visibles**: se quita el flag `revealed` y el filtro; las 6 categorías se muestran siempre. Se reescribe `AWARDS_INTRO` sin la instrucción al organizador. El toggle desde `/admin` queda descartado (nota en `tasks.md` §7).
- **Disfraces**: se quitan Clueless, El Quinto Elemento, Midsommar, Legalmente Rubia, El Gran Lebowski y La Casa de Papel; se suman Chavo del 8 y ¿...y dónde están las rubias? (sin foto). Quedan 18 referencias, 8 con foto.
- **Secciones nuevas**: "Solo adultos" (aviso +18 en tono de ficha de cine) y "Qué hay que traer" (tu presencia + tu bebida alcohólica).
- **`.claude/`**: los symlinks a `.agents/skills/` eran redundantes (los skills viven en `.agents/skills/` y `.opencode/skills/`). No se restaura; `.claude/` queda en `.gitignore`.

## Ronda 5 — imágenes, fondo único y carrusel

- **Carpeta única de imágenes**: todo lo servido vive en `public/img/` (versionado): `fondo-desktop.webp`, `fondo-mobile.webp`, `favicon.svg`, `apple-touch-icon.png`, `icon-512.png`, `photos/` y `movies/`. Las fuentes siguen en `src/img/` (gitignored).
- **Optimización por uso**: fotos de galería/disfraces 576 px q82; carrusel 360×480 q75 (cards de 120×160 a 3x); fondos 1376×768 y 896×1200 q80.
- **Fondo único**: `.fondo-cine` usa `fondo-mobile.webp` en portrait y `fondo-desktop.webp` en landscape (`@media (orientation: landscape)`). Se elimina `.fondo-fiesta` y la foto de fiesta.
- **Blur al scrollear**: un `IntersectionObserver` sobre el hero agrega `.difuminado` (`blur(9px) brightness(0.7)`) al fondo cuando el hero sale del viewport. `prefers-reduced-motion` quita la transición.
- **Carrusel de películas**: 25 imágenes en dos filas con loop CSS; el desplazamiento compensa el `gap` (`calc(-50% - 0.375rem)`) para que no salte.
- **Ideas de disfraz**: se elimina la sección completa (grid + subtítulo) y `src/data/costumes.ts`. La reemplaza el carrusel: cada fila muestra la mitad de las imágenes (arriba la primera, abajo la segunda) y la animación baja a 55 s para que no se trabe.
- **Decoración parallax**: se descarta el confeti animado. En su lugar hay 4 globos y 6 confetis fijos que suben solo al scrollear, a velocidades distintas (efecto de profundidad) y sin bucle de animación. Con `prefers-reduced-motion` quedan estáticos.
- **Título de pestaña**: "Juli: capitulo 30, la pelicula" (reemplaza a "Juli: De repente 30").

## Ronda 6 — deploy, archivo de changes y privacidad de los datos

- **Deploy**: `juli30.evaldez.ar` live detrás de Cloudflare (Full strict) + Nginx (Let's Encrypt) → `127.0.0.1:3000`. CI/CD: `tailscale/github-action@v3` + `appleboy/ssh-action` con `VPS_SSH_KEY`; en el VPS `git pull --ff-only && docker compose build && docker compose up -d`. El health check del workflow reintenta (`curl --retry 10 --retry-all-errors --retry-delay 2`) porque la app tarda en levantar.
- **Headers de seguridad**: los agrega el bloque `server` de Nginx (`Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`). Van a nivel `server`, no en `location`, para que se hereden.
- **OpenSpec**: `juli30-landing` y `front-polish` archivados en `openspec/changes/archive/2026-10-21-*` y sus deltas sincronizados a `openspec/specs/` (6 capabilities: admin, gallery, landing, music, playlist, rsvp). El requirement "Costume ideas carousel" se retiró de la spec de `landing` porque el carrusel de películas lo reemplaza (el delta no lo declaraba como `REMOVED`).
- **Trampa de tooling**: `astro dev` mantiene un handle abierto sobre `openspec/changes/` y bloquea `Move-Item`/`Rename-Item` (Access denied) → hay que frenar el dev server antes de archivar un change. Además, `rtk` no debe envolver `astro dev --background`: no cierra la sesión.
- **Privacidad**: la fecha, la hora, el lugar, la dirección y el nombre completo no se documentan (README, AGENTS, DECISIONS, HANDOFF, specs). La fuente única de contenido es `src/data/event.ts`. Los valores ya quedaron en el historial de git: para que no sigan accesibles, la palanca real es la visibilidad del repo (privado) o reescribir el historial.


