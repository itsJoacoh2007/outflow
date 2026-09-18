# NON X V28 — FAQ VISIBLE Y ACCESIBLE

## Nuevo: sección FAQ (`#faq`)
8 preguntas reales en formato acordeón (reutiliza el mismo componente ya
usado en la ficha de producto): envíos, pago, seguridad, cambios/devoluciones,
tallas, por qué hay pocas unidades por drop, cómo enterarse de nuevos drops,
contacto. Traducido ES/EN/PT.

## Visible sin tener que buscarlo
- Enlace **"AYUDA"** agregado al nav desktop (con borde de color, no se
  pierde entre el resto de los links) y como botón destacado en el menú
  mobile.
- Los 4 badges de confianza que ya estaban arriba de la home (Envíos / Paga
  como quieras / Compra segura / Cambios) ahora son clicables — cada uno
  lleva directo a su pregunta correspondiente, la abre y la resalta con un
  pulso de color, en vez de solo bajar a la sección.

## Detalle técnico
- `initAccordions()` ahora también se llama al cargar la página (antes solo
  se ejecutaba al abrir un producto), así el acordeón del FAQ funciona
  desde el primer momento.
- Se acotó el "abrir automáticamente el primer ítem" para que solo aplique
  al acordeón del modal de producto — antes usaba un selector genérico que,
  al agregar el del FAQ, habría interferido entre ambos.
- Nueva función `openFaqFromHash()`: si se llega a la página con
  `#faq-algo` en la URL (por los badges o un link externo), abre esa
  pregunta puntual y hace scroll suave hasta ella.

## Skill nueva: `storefront-launch-kit`
A pedido, se empaquetó el patrón de trabajo de todo este proyecto (auditar
técnico/diseño/negocio/seguridad a la vez, revisar cada imagen del sitio
por temas de marca registrada — no solo la carpeta de productos, el patrón
de "código listo pero esperando credenciales", admin sin backend, estados
vacíos honestos, verificar todo con navegador real) como una skill
reutilizable para futuros proyectos similares.
