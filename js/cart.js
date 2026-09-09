/* OUTFLOW V8 — CARRITO
   El carrito guarda producto + variante + cantidad. */
let cart = JSON.parse(localStorage.getItem('outflow-cart') || '[]');
const money = n => new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0}).format(n);

function cartKey(productId, variant){
  return `${productId}::${variant}`;
}

function addToCart(productId, variant, quantity = 1){
  const product = getProduct(productId);
  if(!product || !variant) return;
  const q = Math.min(999, Math.max(1, Number.parseInt(quantity, 10) || 1));
  const key = cartKey(productId, variant);
  const existing = cart.find(item => item.key === key);
  if(existing) existing.q = Math.min(999, existing.q + q);
  else cart.push({key, id:productId, variant, q});
  saveCart();
  openCart();
  showToast('Añadido al carrito.');
}

function saveCart(){
  localStorage.setItem('outflow-cart', JSON.stringify(cart));
  renderCart();
}

function changeQuantity(key, delta){
  const item = cart.find(x => x.key === key);
  if(!item) return;
  item.q = Math.min(999, Math.max(1, item.q + delta));
  saveCart();
}

function setQuantity(key, value){
  const item = cart.find(x => x.key === key);
  if(!item) return;
  const parsed = Number.parseInt(value, 10);
  if(!Number.isFinite(parsed) || parsed < 1){ removeItem(key); return; }
  item.q = Math.min(999, parsed);
  saveCart();
}

function removeItem(key){
  cart = cart.filter(item => item.key !== key);
  saveCart();
}

function renderCart(){
  const cartCount = cart.reduce((sum, item) => sum + item.q, 0);
  document.getElementById('cartNum').textContent = cartCount;
  const list = document.getElementById('cartList');
  let total = 0;

  if(!cart.length){
    list.innerHTML = '<div class="cart-empty"><strong>TU CARRITO ESTÁ VACÍO</strong><span>Agrega productos para comenzar.</span></div>';
    document.getElementById('cartTotal').textContent = money(0);
    return;
  }

  list.innerHTML = cart.map(item => {
    const product = getProduct(item.id);
    if(!product) return '';
    const lineTotal = product.price * item.q;
    total += lineTotal;
    return `
      <article class="cart-row">
        <div class="cart-thumb" style="${getProductImageStyle(product)}"></div>
        <div class="cart-item-info">
          <div class="cart-item-top">
            <div>
              <h3>${product.name}</h3>
              <p class="cart-price">${item.variant} · ${money(product.price)} c/u</p>
            </div>
            <strong class="cart-line-total">${money(lineTotal)}</strong>
          </div>
          <div class="cart-item-bottom">
            <div class="quantity-control" aria-label="Cantidad de ${product.name}">
              <button type="button" class="quantity-btn" aria-label="Disminuir cantidad" onclick="changeQuantity('${item.key}',-1)">−</button>
              <input class="quantity-input" type="number" min="1" max="999" value="${item.q}" inputmode="numeric" aria-label="Cantidad" onchange="setQuantity('${item.key}',this.value)" onkeydown="if(event.key==='Enter'){this.blur()}" />
              <button type="button" class="quantity-btn" aria-label="Aumentar cantidad" onclick="changeQuantity('${item.key}',1)">+</button>
            </div>
            <button type="button" class="remove" onclick="removeItem('${item.key}')">Eliminar</button>
          </div>
        </div>
      </article>`;
  }).join('');

  document.getElementById('cartTotal').textContent = money(total);
}

function openCart(){ document.getElementById('drawer').classList.add('open'); document.getElementById('overlay').classList.add('open'); }
function closeCart(){ document.getElementById('drawer').classList.remove('open'); document.getElementById('overlay').classList.remove('open'); }
function showToast(message){ const toast=document.getElementById('toast'); toast.textContent=message; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),1500); }
