# NON X V22 — EXPERIENCIA DE ENTRADA + HERRAMIENTA ADMIN

## WhatsApp
- Número real conectado: +56 9 4001 5603 (antes placeholder).

## Experiencia de entrada ("archive access")
Un solo momento orquestado, no efectos sueltos — así lo pide la guía de diseño:
mejor una secuencia bien pensada que motion disperso en cada sección.
- Nueva secuencia de intro al cargar el sitio: "NON X / ARCHIVE — IDX 001",
  barra de progreso, texto "ACCESANDO REGISTRO" con cursor parpadeante estilo
  terminal Y2K. Se resuelve con un wipe tipo persiana (clip-path) que revela
  el hero debajo — como si se abriera un registro de archivo.
- Se muestra una vez por sesión (`sessionStorage`), nunca en navegación
  interna (son anchors, no hay recarga).
- Funciona aunque JavaScript esté desactivado: el propio CSS la cierra sola
  después de ~2.1s (`animation-delay` + `clip-path`). JS solo evita
  repetirla en la misma sesión y sincroniza la entrada del hero.
- Respeta `prefers-reduced-motion` (delay casi nulo, sin parpadeo).
- Clic/tap en el intro lo salta inmediatamente.
- El stagger existente del hero (`heroUp`, ya estaba bien hecho) ahora
  arranca justo cuando el intro termina de abrirse, en vez de correr en
  paralelo — se siente como una sola secuencia continua.
- Textura de grano sutil (film grain / VHS) sobre el hero, vía SVG inline,
  opacity 5%, `mix-blend-mode:overlay` — refuerza la estética "archivo"
  sin animar nada ni afectar el peso de la página (no es una imagen, es CSS).

## Herramienta admin (`admin.html`)
Página nueva, standalone, sin backend ni login — para agregar/editar productos
con formulario en vez de escribir JSON a mano.
- Carga el `products.json` actual (subiendo el archivo o pegando el JSON).
- Formulario con los campos reales del catálogo: nombre, precio, categoría,
  tallas, material, descripción, detalles, cuidados, imagen, galería
  adicional, guía de tallas, y marcado de "Drop destacado".
- Editar y eliminar productos ya cargados.
- Vista previa del JSON resultante en cualquier momento.
- Botón "Descargar products.json" — el archivo queda listo para subir a
  `data/products.json` en el hosting.
- ⚠️ No tiene autenticación: no la subas al mismo dominio público del sitio,
  o al menos no la enlaces desde ningún lado visible. Ver la propuesta de
  admin real más abajo para cuando quieran algo multi-usuario y en vivo.

## Nota
`README.md` y este changelog reflejan la versión actual del proyecto.
