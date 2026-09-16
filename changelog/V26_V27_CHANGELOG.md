# NON X V26-V27 — MÁS PROFESIONALISMO + ADMIN CON FOTOS + KLAVIYO

## Admin (`admin.html`)
- Subida de fotos real: arrastra o elige el archivo, se comprime
  automáticamente en el navegador (canvas → WebP) y queda embebida como
  data-URI directamente en `products.json` — ya no hay que escribir
  rutas de archivo a mano ni alojar las fotos en otro lado primero.
- Miniatura real de cada producto en la lista.
- Estimado de peso del archivo final, visible junto al botón de descarga.

## Más presencia visual en el sitio
- Color de acento (ice-blue) aplicado con moderación: corazón de
  favoritos, tag de "DROP", contador del carrito, subrayado del menú,
  y el foco de teclado — antes todo era blanco/negro puro.
- Barra de progreso de scroll (línea fina arriba, en el acento).
- Skeleton de carga (tarjetas fantasma animadas) mientras se hace fetch
  de `data/products.json`, en vez de que la grilla quede en blanco esos
  primeros milisegundos.
- Scrollbar propio, en tono con la marca.
- Borde sutil con el acento al pasar el mouse sobre una tarjeta de
  producto.

## Newsletter real (`js/newsletter-signup.js`, nuevo)
- Conecta el formulario "ENTRA AL DROP" a Klaviyo (gratis hasta 250
  contactos, integración nativa con Shopify). Mientras no esté
  configurado, sigue mostrando el mismo aviso genérico de siempre.
- Se investigó el estado 2026 de Shopify Customer Accounts (cuentas sin
  contraseña, login por código al correo) y de la eliminación de
  cuenta: no es autoservicio nativo — el flujo normal es una solicitud
  por correo que el comercio procesa manualmente. Para el tamaño actual
  de NON X esto es suficiente y no requiere una app adicional.
