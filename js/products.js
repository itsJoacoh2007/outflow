/* NON X V21 — CATÁLOGO
   Fuente principal: data/products.json
   Compatibilidad local: si index.html se abre directamente con file://,
   se usa el catálogo integrado de respaldo para evitar el bloqueo de fetch(). */
let products = [];

/* Placeholder propio (SVG generado, sin archivo externo) para cuando un producto
   todavía no tiene foto cargada. products.js carga primero, así que queda
   disponible para cart.js, product-page.js y app.js. */
const NX_PLACEHOLDER_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><rect width='400' height='500' fill='%230f0f0f'/><path d='M200 158 L172 188 L186 198 L186 342 L214 342 L214 198 L228 188 Z' stroke='%23444' stroke-width='2' fill='none'/><circle cx='200' cy='148' r='9' stroke='%23444' stroke-width='2' fill='none'/><text x='200' y='400' font-family='Arial,sans-serif' font-size='13' fill='%23555' text-anchor='middle' letter-spacing='2'>SIN IMAGEN AÚN</text></svg>";

/* Escapa texto proveniente de datos de producto antes de insertarlo con innerHTML.
   Vive aquí porque products.js carga primero y lo necesitan cart.js, product-page.js y app.js.
   Evita XSS si en el futuro el catálogo se alimenta desde un backend/CMS con múltiples editores. */
function escapeHtml(value){
  return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

const LOCAL_PRODUCTS = [];

async function loadProducts(){
  try {
    const response = await fetch('data/products.json', {cache:'no-store'});
    if(!response.ok) throw new Error(`HTTP ${response.status}`);
    products = await response.json();
  } catch(error) {
    // fetch() falla normalmente al abrir index.html con file://.
    // Usamos el respaldo para que la demo local siga funcionando.
    console.warn('Catálogo JSON no disponible; usando respaldo local.', error);
    products = LOCAL_PRODUCTS;
  }
  return products;
}

function getProduct(id){
  return products.find(product => product.id === id) || null;
}

function getProductImageStyle(product){
  if(product?.image) return `background-image:url("${product.image}");background-size:cover;background-position:center`;
  return `background-image:url("${NX_PLACEHOLDER_IMAGE}");background-size:cover;background-position:center`;
}
