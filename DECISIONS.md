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

## No-goals (por ahora)
- API separada / microservicios.
- Auth de invitados (solo admin).
- Personalización de fotos por invitados.
- Notificaciones email (posible después).
