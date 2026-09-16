# NON X — ESTADO ACTUAL Y PRÓXIMOS PASOS

Este es el documento de referencia. Los `changelog/V*.md` quedan como
historial técnico detallado, pero para saber "¿dónde estamos y qué
falta?", este archivo es el que hay que leer.

---

## ✅ Lo que funciona hoy, tal cual está

- **Sitio completo**: hero, categorías, catálogo, ficha de producto,
  carrito, favoritos, buscador, filtros, selector de idioma (ES/EN/PT),
  tema claro/oscuro — todo funcional y probado.
- **Catálogo vacío a propósito** (`data/products.json` = `[]`), con
  estados "el archivo se abre pronto" en vez de pantallas rotas o en
  blanco. Listo para recibir productos reales.
- **`admin.html`** — agregar/editar/ordenar productos con subida y
  compresión automática de fotos (arrastra o elige el archivo, sin
  escribir rutas a mano). Exporta el `products.json` listo para subir.
- **Seguridad**: datos de producto escapados antes de insertarse en el
  HTML (protección XSS), sin dependencias externas rotas.
- **SEO/social básico**: meta tags, `sitemap.xml`, `robots.txt`,
  imagen para compartir en redes (propia, sin fotografía de terceros).
- **WhatsApp real**: botón flotante con tu número (+56 9 4001 5603).
- **Sin ninguna imagen de otra marca** — se detectaron y eliminaron
  varias (Nike, Polo Ralph Lauren, New Balance) que venían de versiones
  anteriores del proyecto. Ver `changelog/V25_CHANGELOG.md` si quieres
  el detalle completo de qué se encontró.

## 🔌 Listo para conectar, pero esperando que crees las cuentas

Estos dos archivos ya tienen el código escrito — mientras no completes
sus 2-3 líneas de configuración, el sitio sigue funcionando exactamente
igual que ahora (con avisos genéricos en vez de la función real):

| Archivo | Qué activa | Qué necesitas crear primero |
|---|---|---|
| `js/shopify-checkout.js` | Checkout real (pago con Webpay/Flow vía Shopify) | Cuenta Shopify + productos cargados ahí + token de Storefront API |
| `js/newsletter-signup.js` | Lista de correo real para avisos de drops | Cuenta Klaviyo (gratis hasta 250 contactos) conectada a Shopify |

Las instrucciones exactas de cómo obtener cada dato están como
comentario al inicio de cada uno de esos dos archivos — no hace falta
buscarlas en otro lado.

## 📋 Cuando tengas la tienda Shopify creada, este es el orden

1. Crea la tienda en Shopify, agrega tus 1-3 productos reales ahí
   (nombre, precio, fotos, variantes de talla).
2. Instala la app **Webpay** de Transbank y pide la activación del
   código de comercio de inmediato (puede tardar días).
3. Instala **Klaviyo**, conecta tu lista de correo.
4. Sácame estos 3 datos y activo `shopify-checkout.js`:
   - Dominio `.myshopify.com`
   - Storefront API access token
   - El ID de variante de Shopify de cada producto
5. Sácame estos 2 datos y activo `newsletter-signup.js`:
   - Public API Key de Klaviyo
   - List ID de la lista de correo
6. Agrega los mismos 1-3 productos en `admin.html` (con las fotos
   reales) y sube el `products.json` resultante — así la tienda se ve
   con el diseño de NON X y no con un tema genérico de Shopify.

## 💡 Ideas ya definidas, pendientes de implementar cuando haya cuenta

- **VIP "Acceso Archivo"**: la lista de correo recibe el link de compra
  algunas horas antes que el público general — la escasez real de la
  producción se vuelve el beneficio, sin inventar nada falso.
- **"Founding Members"**: quien compre en el Drop 001 queda etiquetado
  en Shopify con acceso anticipado a todos los drops futuros, para
  siempre. Costo de implementación: cero (es un tag de cliente).

Ninguna de las dos necesita una base de datos propia — se arman con
tags de cliente de Shopify + segmentos de Klaviyo.

## ⚠️ Todavía pendiente / decisión tuya

- Política real de envíos y cambios/devoluciones (hoy son textos
  genéricos de ejemplo).
- Tabla de tallas con medidas reales en cm (por producto, se carga
  desde `admin.html`).
- Dominio y hosting (aún no existen — cuando los tengas, actualiza la
  URL en `<link rel="canonical">` y en los `og:image` de `index.html`,
  y en `robots.txt`/`sitemap.xml`).
- Handles de Instagram/TikTok (me avisas cuando existan y conecto los
  enlaces reales del footer).

## 🗂️ Estructura del proyecto

```
index.html              → el sitio
admin.html               → herramienta interna para cargar productos (no publicar)
css/main.css              → todos los estilos
js/language.js            → traducciones ES/EN/PT (única fuente)
js/products.js             → carga del catálogo + helpers compartidos
js/cart.js                 → carrito de compra
js/product-page.js          → ficha de producto, filtros, catálogo
js/app.js                   → animaciones, hero, navegación
js/shopify-checkout.js       → checkout real (ver arriba)
js/newsletter-signup.js       → lista de correo real (ver arriba)
data/products.json             → catálogo (vacío hoy, se llena con admin.html)
changelog/                      → historial técnico detallado por versión
```
