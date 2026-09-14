# NON X V21 — AUDITORÍA TÉCNICA Y HARDENING

Cambios aplicados sobre V20.1 tras auditoría integral (CEO/ingeniería/diseño/seguridad).

## ⚠️ Pendiente crítico (no técnico, requiere decisión de negocio)
NX-001 ("BRAZIL HALF-ZIP TRAINING TOP") usa fotografía real de una polera de
entrenamiento Nike × Jordan Brand × CBF (selección de Brasil), con el logo
Jumpman y el escudo de la CBF visibles en las 3 vistas y el video 360°.
Es el producto hero de toda la tienda (Drop 001). Riesgo de infracción de
marca registrada y de suspensión inmediata en Shopify/Meta/TikTok Shop.
**No publicar ni promocionar el sitio con este producto sin resolver esto
primero** (foto propia y/o prenda distinta).

## Seguridad
- Añadido helper `escapeHtml()` (en `products.js`, carga antes que el resto)
  y aplicado en todos los puntos donde datos de producto se insertan vía
  `innerHTML`: grilla de catálogo, ficha de producto, carrito, drop showcase,
  galería de medios y miniaturas. Mitiga XSS almacenado si el catálogo llega
  a alimentarse desde un backend/CMS con múltiples editores.
- Validación de forma del carrito leído desde `localStorage` (evita romper
  el render si el valor guardado tiene una forma inesperada).

## Corrección de marca (OUTFLOW → NON X)
- Textos visibles en ES/EN/PT (`manifesto_text`, `returns_note`,
  descripción por defecto de producto).
- Watermark CSS gigante (`content:"OUTFLOW"`) en la sección Nosotros
  (`.brand-story:before`) — visible aunque muy sutil (opacidad 2.5%).
  Corregido a "NON X".
- Namespace/evento internos renombrados: `window.outflowLanguage` →
  `window.nonxLanguage`, evento `outflow:languagechange` →
  `nonx:languagechange`. `localStorage` migra sola (`nonx-*` con fallback
  a `outflow-*` para no perder preferencias de visitantes antiguos).
- Comentarios de cabecera de archivo actualizados en los 5 `.js` y en `main.css`.

## Bugs corregidos
- El aviso superior (topbar) nunca cambiaba de idioma: faltaba la clave
  `topbar` en el objeto de traducciones real. Agregada en ES/EN/PT.
- `data/translations.json` era código muerto (nada lo leía vía `fetch`) —
  eliminado. `js/language.js` queda como única fuente de traducciones.
- `@import` duplicado de Google Fonts en `main.css` (ya se cargaba vía
  `<link>` en el `<head>`) — eliminado.
- Sección `.manifesto` y claves `manifesto_title`/`manifesto_text`: CSS e
  i18n huérfanos de una sección que ya no existe en el HTML — eliminados.
- Bindings de arranque en `app.js` ahora usan `?.` en vez de acceso directo:
  si falta un id en el HTML, ese binding puntual queda inactivo en lugar de
  detener la ejecución de todo el script.

## Rendimiento
- 5 imágenes de producto convertidas de PNG a WebP (con alpha preservado):
  ~6.8 MB → ~213 KB (−97%).
- 2 videos de producto recomprimidos (sin pista de audio, que de todas
  formas se reproducen muteados): ~6.6 MB → ~1.3 MB (−81%).
- 10 archivos huérfanos eliminados (no referenciados por ningún producto):
  ~8.5 MB liberados, incluida una versión rota de 44 bytes.
- Peso total del proyecto: 22 MB → ~2.4 MB.

## SEO / metadatos
- `canonical`, `og:url`, `og:image` (+ dimensiones), `twitter:image`.
- `manifest.json` con íconos PNG reales (192×192, 512×512) generados desde
  el favicon SVG, más `apple-touch-icon.png` (180×180).
- `sitemap.xml` (con nota honesta: solo puede listar la home mientras el
  catálogo sea una SPA sin URLs propias por producto — ver auditoría).
- `robots.txt` ahora referencia el sitemap.

## Funcionalidad nueva
- **Cross-sell "También te puede interesar"** en la ficha de producto:
  usa datos ya existentes del catálogo (misma categoría primero), sin
  necesidad de backend.
- **Botón flotante de WhatsApp** (número placeholder marcado con TODO).
- Placeholders comentados de GA4 y Meta Pixel en el `<head>` (comentados a
  propósito: un ID de ejemplo activo enviaría datos basura a una cuenta que
  no existe — descomentar y reemplazar el ID real antes de publicar).

## Todo lo que sigue igual, a propósito
- El botón "checkout" sigue siendo un aviso (no hay pasarela de pago real
  conectada) — requiere decisión de negocio (Shopify+Webpay/Flow vs backend
  propio), no es algo que se "arregle" con una edición de código.
- `LOCAL_PRODUCTS` (respaldo de catálogo para abrir `index.html` con
  `file://`) se mantiene: si vas a servir el sitio siempre desde un
  hosting/servidor, es seguro eliminarlo más adelante.
