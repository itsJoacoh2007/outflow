# NON X V24 — INTEGRACIÓN SHOPIFY (checkout real, lista para activar)

## Contexto
Definiciones del negocio: sin dominio/hosting todavía, pago real vía
Shopify + Webpay/Flow, primera tanda de 1 a 3 prendas.

## Nuevo: `js/shopify-checkout.js`
- Conecta el botón de checkout con un checkout REAL de Shopify (JS Buy SDK)
  sin cambiar en nada el diseño ni el carrito propio de NON X — Shopify
  solo se usa como motor de pago/pedidos, nunca se ve como "tienda Shopify".
- Mientras `SHOPIFY_CONFIG` no esté completado (dominio, token, mapa de
  variantes), el botón sigue mostrando el mismo aviso de siempre — no se
  rompe nada por dejarlo a medias.
- Instrucciones paso a paso dentro del propio archivo (comentario de
  cabecera): crear la tienda, generar el token de Storefront API, mapear
  cada producto a su variantId de Shopify.
- `app.js` ya no tiene su propio handler de checkout (vivía ahí antes);
  ahora lo maneja este archivo exclusivamente, para no tener dos
  listeners pisándose.

## Investigado y confirmado antes de construir esto
Transbank lanzó una app oficial de Webpay para Shopify Chile en octubre
2025. Reseñas reales de comercios chilenos (dic. 2025 – feb. 2026)
confirman que ya está funcionando para varios, aunque la activación del
código de comercio puede tardar (de días a más de una semana según el
caso) — pedirla apenas se cree la tienda, no al final. Flow y Mercado
Pago siguen como alternativas si Webpay se demora.

## Importante — doble carga de productos mientras el catálogo sea chico
Con esta integración, cada uno de los 1-3 productos necesita existir en
DOS lugares al principio:
1. En Shopify (admin de Shopify) — para que el pago/checkout funcione.
2. En `data/products.json` (vía `admin.html`) — para que se vea con el
   diseño real de NON X en la tienda.
No son la misma base de datos. Para 1-3 productos es perfectamente
manejable a mano; si el catálogo crece mucho, ahí conviene evaluar
sincronizarlos automáticamente (Shopify tiene su propia API para leer
productos, se puede automatizar más adelante).
