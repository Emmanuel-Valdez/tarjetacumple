# Decisiones — Tarjeta Cumple (Juli 30)

## Proyecto
- Invitación web para cumpleaños 30 de **Julieta "Juli" Rosales**.
- Fecha del evento: **10 de enero de 2027** (DD/MM).
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

