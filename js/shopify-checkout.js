/* NON X V24 — INTEGRACIÓN SHOPIFY (checkout real)
   ============================================================
   Este archivo conecta el botón "AGREGAR AL CARRITO / CHECKOUT" con un
   checkout REAL de Shopify, manteniendo 100% el diseño y el carrito
   propios de NON X — Shopify solo se usa como motor de pago y pedidos,
   nunca se ve como "tienda Shopify" para el cliente.

   CÓMO ACTIVARLO (3 pasos, cuando tengas tu cuenta Shopify):

   1) Crea tu tienda en shopify.com y agrega tus 1-3 productos reales
      desde el admin de Shopify (Productos → Agregar producto). Usa el
      mismo nombre que en data/products.json para no confundirte.

   2) Genera un token de Storefront API:
      Admin de Shopify → Configuración → Apps y canales de venta →
      Desarrollar apps → Crear una app → pestaña "API de Storefront" →
      activa los permisos "unauthenticated_checkout_write" y
      "unauthenticated_product_read" → Instalar app → copia el
      "Storefront API access token".

   3) Completa las 3 líneas de SHOPIFY_CONFIG más abajo:
      - domain: el dominio .myshopify.com de tu tienda
      - storefrontAccessToken: el token del paso 2
      - productVariantMap: por cada producto de tu catálogo, el ID de
        variante de Shopify (Admin → el producto → panel derecho, o
        inspeccionando la URL de la variante).

   Mientras esto no esté completado, el botón de checkout sigue
   mostrando el aviso de siempre — no se rompe nada por dejarlo a medias.
   ============================================================ */

const SHOPIFY_CONFIG = {
  // Reemplaza estos 3 valores cuando tengas tu tienda Shopify:
  domain: 'TU-TIENDA.myshopify.com',
  storefrontAccessToken: 'TU_STOREFRONT_ACCESS_TOKEN',
  // 'id-del-producto-en-products.json': 'gid://shopify/ProductVariant/XXXXXXXXXX'
  productVariantMap: {
    // 'nx-001': 'gid://shopify/ProductVariant/00000000000',
  }
};

function isShopifyConfigured(){
  return SHOPIFY_CONFIG.domain !== 'TU-TIENDA.myshopify.com'
    && SHOPIFY_CONFIG.storefrontAccessToken !== 'TU_STOREFRONT_ACCESS_TOKEN'
    && Object.keys(SHOPIFY_CONFIG.productVariantMap).length > 0;
}

let shopifyClientPromise = null;
function loadShopifyBuySdk(){
  if(window.ShopifyBuy) return Promise.resolve(window.ShopifyBuy);
  return new Promise((resolve, reject)=>{
    const script = document.createElement('script');
    script.src = 'https://sdks.shopifycdn.com/js-buy-sdk/v2/index.umd.min.js';
    script.onload = () => resolve(window.ShopifyBuy);
    script.onerror = () => reject(new Error('No se pudo cargar el SDK de Shopify (revisa tu conexión).'));
    document.head.appendChild(script);
  });
}
function getShopifyClient(){
  if(!shopifyClientPromise){
    shopifyClientPromise = loadShopifyBuySdk().then(ShopifyBuy => ShopifyBuy.buildClient({
      domain: SHOPIFY_CONFIG.domain,
      storefrontAccessToken: SHOPIFY_CONFIG.storefrontAccessToken
    }));
  }
  return shopifyClientPromise;
}

/* Toma el carrito propio de NON X (localStorage, ver cart.js) y abre el
   checkout real de Shopify con esas mismas líneas — Webpay/Flow/Mercado
   Pago (lo que hayas activado en tu tienda) aparece ahí como forma de pago. */
async function goToShopifyCheckout(cart){
  const lineItems = cart
    .map(item => ({ variantId: SHOPIFY_CONFIG.productVariantMap[item.id], quantity: item.q }))
    .filter(li => li.variantId);

  if(!lineItems.length){
    alert('Ninguno de los productos del carrito tiene todavía un variantId de Shopify configurado (ver js/shopify-checkout.js).');
    return;
  }
  try{
    const client = await getShopifyClient();
    const checkout = await client.checkout.create();
    const updated = await client.checkout.addLineItems(checkout.id, lineItems);
    window.location.href = updated.webUrl;
  }catch(err){
    console.error('Error creando el checkout de Shopify:', err);
    alert('No se pudo iniciar el pago. Intenta de nuevo en unos segundos.');
  }
}

/* Reemplaza el handler del botón de checkout: usa Shopify si ya está
   configurado, o mantiene el aviso original mientras tanto. */
document.getElementById('checkout')?.addEventListener('click', () => {
  if(isShopifyConfigured()){
    goToShopifyCheckout(cart);
  } else {
    alert('El checkout real se conectará a Shopify en la siguiente etapa.');
  }
});
