## Why

La invitación necesita una organización más clara para el público adulto, y la votación actual mezcla demasiadas fotos con la página principal. Además, la lista completa de premios y el acceso a votar se muestran antes de que la organizadora o Juli abran el concurso, lo que elimina la sorpresa prevista.

## What Changes

- Reorganizar la landing: unificar dress code, solo adultos y qué traer en tarjetas; actualizar el hero y el copy; ubicar julifiesta bajo la ubicación y julilogramos antes de la playlist.
- Reemplazar las tiras de fotos por una sola foto destacada de Juli y retirar el CRUD y la funcionalidad pública exclusiva de las tiras. Mantener el CRUD de imágenes candidatas del concurso.
- Retirar del sitio los recursos de galería que ya no se muestran, conservando los recursos usados por el carrusel de películas.
- Actualizar la lista a diez categorías: conservar las cuatro categorías vigentes que no se pidieron quitar, eliminar Casa de los Espellos y Esfuerzo Heroico, y agregar las seis categorías nuevas indicadas.
- Mostrar antes de abrir el concurso solo dos categorías de adelanto y el texto “y varias categorías más”; revelar el listado completo y mostrar el acceso a votar solo cuando se habilite la votación.
- Mover el flujo de votación a una vista propia en el mismo sitio (`/votar`), separada de la landing para presentar las aproximadamente 50 fotos candidatas.
- Agregar las secciones Regalos (con placeholder para los datos de transferencia) y un enlace para volver a la invitación desde el panel y el login. Los datos reales de transferencia se incorporarán desde variables de entorno cuando estén definidos.

## Capabilities

### New Capabilities

### Modified Capabilities
- `landing`: cambia el contenido, orden y presentación de la invitación, las categorías visibles antes y durante el concurso y el acceso a la vista de votación.
- `gallery`: se eliminan las tiras públicas y sus likes; se conserva la imagen destacada de Juli y se mantienen intactos los recursos del carrusel de películas.
- `admin`: el panel mantiene solo la gestión de fotos candidatas del concurso y ofrece navegación de regreso a la invitación.
- `contest`: la votación se realiza en una vista independiente y el acceso público aparece solo mientras el concurso está abierto; Juli y la organizadora pueden habilitarla desde el panel.

## Impact

- Landing y nueva ruta pública `/votar`; datos de premios y recursos de imagen.
- Panel `/admin` y sus APIs de fotos y control del concurso.
- APIs públicas de concurso y fotos; posible retiro de la API de likes que solo servía a las tiras.
- Manifiesto generado de galería y recursos en `public/img/photos/`; los archivos de `public/img/movies/` siguen en uso y no se eliminan.
- Configuración de entorno del servidor para los datos reales de transferencia, cuando se proporcionen.
