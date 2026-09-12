/* OUTFLOW V11 — DETALLE DE PRODUCTO / GALERÍA / VARIANTES */
let selectedProduct = null;
let selectedVariant = null;
let detailQuantity = 1;
let activeMediaIndex = 0;

const T = (key) => window.outflowLanguage?.t(key) ?? key;

function productMedia(product){
  if(product?.media?.length) return product.media;
  if(product?.image) return [{type:'image',src:product.image,alt:product.name,role:'primary'}];
  return [{type:'image',src:'assets/images/products.jpg',alt:product?.name || 'Producto NON X',role:'primary'}];
}

function mediaRole(item, index){
  if(item.role) return item.role.toUpperCase();
  if(item.type==='360') return '360°';
  if(item.type==='video') return 'VIDEO';
  return ['PRIMARY','BACK','3/4','DETAIL','EDITORIAL'][index] || `VIEW ${String(index+1).padStart(2,'0')}`;
}

function productCode(product){
  const idx=Math.max(1, products.indexOf(product)+1);
  return product.code || `NX-${String(idx).padStart(3,'0')}`;
}

function renderProductMedia(product, index=0){
  const media = productMedia(product);
  activeMediaIndex = Math.min(Math.max(index,0), media.length-1);
  const main = media[activeMediaIndex];
  const stage = document.getElementById('modalProductMedia');
  const thumbs = document.getElementById('modalMediaThumbs');
  const label = document.getElementById('modalMediaLabel');
  if(!stage || !thumbs) return;

  const prevIndex = (activeMediaIndex - 1 + media.length) % media.length;
  const nextIndex = (activeMediaIndex + 1) % media.length;
  stage.innerHTML = (main.type === '360')
    ? `<div class="product-360-stage"><video class="product-media-video product-360-video" autoplay muted loop playsinline preload="metadata" poster="${main.poster || ''}" aria-label="${main.alt || product.name} — 360 grados"><source src="${main.src}" type="video/mp4">${T('video_error')}</video><span class="product-360-badge">360°</span><button class="gallery-arrow gallery-arrow-prev" type="button" data-media-jump="${prevIndex}" aria-label="Vista anterior">‹</button><button class="gallery-arrow gallery-arrow-next" type="button" data-media-jump="${nextIndex}" aria-label="Vista siguiente">›</button></div>`
    : (main.type === 'video'
    ? `<div class="product-video-stage"><video class="product-media-video" controls playsinline preload="metadata" poster="${main.poster || ''}" aria-label="${main.alt || product.name}"><source src="${main.src}" type="video/mp4">${T('video_error')}</video><button class="gallery-arrow gallery-arrow-prev" type="button" data-media-jump="${prevIndex}" aria-label="Vista anterior">‹</button><button class="gallery-arrow gallery-arrow-next" type="button" data-media-jump="${nextIndex}" aria-label="Vista siguiente">›</button></div>`
    : `<div class="product-image-stage"><img class="product-media-image" src="${main.src}" alt="${main.alt || product.name}" loading="eager" decoding="async"><button class="gallery-arrow gallery-arrow-prev" type="button" data-media-jump="${prevIndex}" aria-label="Vista anterior">‹</button><button class="gallery-arrow gallery-arrow-next" type="button" data-media-jump="${nextIndex}" aria-label="Vista siguiente">›</button><button class="gallery-expand" type="button" data-media-jump="${activeMediaIndex}" aria-label="Ampliar imagen">⛶</button></div>`);

  stage.querySelectorAll('[data-media-jump]').forEach(btn=>btn.addEventListener('click',()=>renderProductMedia(product,Number(btn.dataset.mediaJump))));


  if(label) label.textContent=`${String(activeMediaIndex+1).padStart(2,'0')} / ${mediaRole(main,activeMediaIndex)}`;
  thumbs.innerHTML = media.map((item,i)=>`
    <button type="button" class="media-thumb ${i===activeMediaIndex?'selected':''}" data-media-index="${i}" aria-label="${mediaRole(item,i)} — ${i+1}">
      ${item.type==='360' ? `<span class="thumb-video thumb-360"><span>360°</span></span>` : item.type==='video' ? `<span class="thumb-video"><span>▶</span></span>` : `<img src="${item.src}" alt="" loading="lazy" decoding="async">`}
      <span class="media-thumb-label">${String(i+1).padStart(2,'0')} ${mediaRole(item,i)}</span>
    </button>`).join('');

  thumbs.querySelectorAll('[data-media-index]').forEach(btn=>btn.addEventListener('click',()=>renderProductMedia(product,Number(btn.dataset.mediaIndex))));
}

function renderSizeGuide(product){
  const box=document.getElementById('modalSizeGuide');
  if(!box) return;
  const guide=product.sizeGuide || {};
  const entries=Object.entries(guide);
  if(!entries.length){ box.innerHTML=`<p>${T('no_size_guide')}</p>`; return; }
  const first=entries[0][1];
  if(typeof first==='number'){
    box.innerHTML=`<div class="size-guide-head"><span>${T('size_label')}</span><span>${T('foot_cm')}</span></div>${entries.map(([size,cm])=>`<div class="size-guide-row"><strong>${size}</strong><span>${cm.toFixed(1)}</span></div>`).join('')}`;
    return;
  }
  const keys=Object.keys(first);
  const labels={cintura:'CINTURA',largo:'LARGO',pecho:'PECHO',ancho:'ANCHO',manga:'MANGA'};
  box.innerHTML=`<div class="size-guide-head"><span>${T('size_label')}</span>${keys.map(k=>`<span>${labels[k]||k.toUpperCase()}</span>`).join('')}</div>${entries.map(([size,values])=>`<div class="size-guide-row"><strong>${size}</strong>${keys.map(k=>`<span>${values[k] ?? '—'}</span>`).join('')}</div>`).join('')}<div class="size-guide-unit">${T('cm')}</div>`;
}


function initAccordions(){
  document.querySelectorAll('[data-accordion-group]').forEach(group=>{
    group.querySelectorAll('.accordion-trigger').forEach(trigger=>{
      if(trigger.dataset.accordionReady) return;
      trigger.dataset.accordionReady='1';
      trigger.addEventListener('click',()=>{
        const item=trigger.closest('.accordion-item');
        const willOpen=!item.classList.contains('is-open');
        group.querySelectorAll('.accordion-item').forEach(other=>{
          other.classList.remove('is-open');
          other.querySelector('.accordion-trigger')?.setAttribute('aria-expanded','false');
        });
        if(willOpen){
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded','true');
        }
      });
    });
  });
}

function openProduct(productId){
  const product = getProduct(productId);
  if(!product) return;
  selectedProduct = product;
  selectedVariant = null;
  detailQuantity = 1;

  const modal = document.getElementById('productModal');
  renderProductMedia(product,0);
  document.getElementById('modalCategory').textContent = product.category.toUpperCase();
  document.getElementById('modalProductName').textContent = product.name;
  document.getElementById('modalProductVariant').textContent = product.color || '';
  const codeEl=document.getElementById('modalProductCode'); if(codeEl) codeEl.textContent=productCode(product);
  const dropEl=document.getElementById('modalProductDrop'); if(dropEl) dropEl.textContent=product.drop ? `DROP ${product.dropNumber || ''}`.trim() : 'NON X / ARCHIVE';
  const editorialEl=document.getElementById('modalEditorialText'); if(editorialEl) editorialEl.textContent=product.editorial || 'A documented piece within the NON X archive.';
  document.getElementById('modalProductPrice').textContent = money(product.price);
  const favBtn=document.getElementById('modalFavorite');
  if(favBtn){ const isFav=favorites.includes(product.id); favBtn.textContent=isFav?'♥':'♡'; favBtn.classList.toggle('is-favorite',isFav); favBtn.setAttribute('aria-pressed',String(isFav)); favBtn.setAttribute('aria-label',isFav?'Quitar de favoritos':'Agregar a favoritos'); }
  const stockEl=document.getElementById('modalStock');
  if(stockEl) stockEl.textContent=product.stock===0?'AGOTADO':(product.stock && product.stock<=3?`ÚLTIMAS ${product.stock}`:'DISPONIBLE');
  document.getElementById('modalDescription').textContent = product.description || 'Prenda seleccionada por OUTFLOW.';
  document.getElementById('modalMaterial').textContent = product.composition || product.material || '—';
  document.getElementById('modalFit').textContent = product.fit || '—';
  document.getElementById('modalDetails').innerHTML = (product.details || []).map(item => `<li>${item}</li>`).join('');
  document.getElementById('modalCare').innerHTML = (product.care || []).map(item => `<li>${item}</li>`).join('');
  document.getElementById('modalShipping').textContent = product.shipping || T('shipping_default');
  renderSizeGuide(product);
  document.getElementById('modalVariants').innerHTML = (product.sizes || []).map(size => `<button type="button" class="variant-btn" data-variant="${size}">${size}</button>`).join('');
  document.getElementById('detailQuantity').value = 1;
  document.getElementById('modalAdd').disabled = true;
  document.getElementById('modalVariantHint').textContent = T('select_size');

  initAccordions();
  const firstAccordion = document.querySelector('[data-accordion-group] .accordion-item');
  if(firstAccordion){
    document.querySelectorAll('[data-accordion-group] .accordion-item').forEach((item,i)=>{
      const open=i===0;
      item.classList.toggle('is-open',open);
      item.querySelector('.accordion-trigger')?.setAttribute('aria-expanded',String(open));
    });
  }

  document.querySelectorAll('.variant-btn').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.variant-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedVariant = button.dataset.variant;
    document.getElementById('modalAdd').disabled = false;
    document.getElementById('modalVariantHint').textContent = `${T('selected_size')} ${selectedVariant}`;
  }));

  const favoriteButton=document.getElementById('modalFavorite');
  if(favoriteButton && !favoriteButton.dataset.ready){ favoriteButton.dataset.ready='1'; favoriteButton.addEventListener('click',()=>{ if(!selectedProduct) return; toggleFavorite(selectedProduct.id); const isFav=favorites.includes(selectedProduct.id); favoriteButton.textContent=isFav?'♥':'♡'; favoriteButton.classList.toggle('is-favorite',isFav); favoriteButton.setAttribute('aria-pressed',String(isFav)); favoriteButton.setAttribute('aria-label',isFav?'Quitar de favoritos':'Agregar a favoritos'); }); }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}

function closeProduct(){
  const modal=document.getElementById('productModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
  const video=modal.querySelector('video');
  if(video) video.pause();
}

function changeDetailQuantity(delta){
  detailQuantity = Math.min(999, Math.max(1, detailQuantity + delta));
  document.getElementById('detailQuantity').value = detailQuantity;
}

function addSelectedProduct(){
  if(!selectedProduct || !selectedVariant) return;
  const quantity = Math.min(999, Math.max(1, Number.parseInt(document.getElementById('detailQuantity').value,10) || 1));
  addToCart(selectedProduct.id, selectedVariant, quantity);
  closeProduct();
}

let catalogState = { query:'', category:'all', maxPrice:0, size:'all', sort:'featured', favoritesOnly:false };
let favorites = JSON.parse(localStorage.getItem('nonx-favorites') || localStorage.getItem('outflow-favorites') || '[]');

function toggleFavorite(id){
  favorites = favorites.includes(id) ? favorites.filter(x=>x!==id) : [...favorites,id];
  localStorage.setItem('nonx-favorites', JSON.stringify(favorites));
  renderProducts();
}
function getCatalogSizes(){
  return [...new Set(products.flatMap(p=>p.sizes||[]))].sort((a,b)=>{
    const na=Number(a), nb=Number(b);
    return Number.isNaN(na)||Number.isNaN(nb) ? String(a).localeCompare(String(b)) : na-nb;
  });
}
function initCatalogFilters(){
  const sizeSelect=document.getElementById('sizeFilter');
  if(sizeSelect) sizeSelect.innerHTML='<option value="all">TODAS</option>'+getCatalogSizes().map(size=>`<option value="${size}">${size}</option>`).join('');
  document.querySelectorAll('.filter-tab').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-tab').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active'); catalogState.category=btn.dataset.category; renderProducts();
  }));
  document.getElementById('priceFilter')?.addEventListener('change',e=>{catalogState.maxPrice=Number(e.target.value)||0;renderProducts()});
  document.getElementById('sizeFilter')?.addEventListener('change',e=>{catalogState.size=e.target.value;renderProducts()});
  document.getElementById('sortFilter')?.addEventListener('change',e=>{catalogState.sort=e.target.value;renderProducts()});
  document.getElementById('clearFilters')?.addEventListener('click',()=>{
    catalogState={query:'',category:'all',maxPrice:0,size:'all',sort:'featured',favoritesOnly:false};
    const search=document.getElementById('search'); if(search) search.value='';
    document.getElementById('priceFilter').value='0'; document.getElementById('sizeFilter').value='all'; document.getElementById('sortFilter').value='featured';
    document.querySelectorAll('.filter-tab').forEach(x=>x.classList.toggle('active',x.dataset.category==='all'));
    renderProducts();
  });
  document.getElementById('favoritesToggle')?.addEventListener('click',()=>{catalogState.favoritesOnly=!catalogState.favoritesOnly; document.getElementById('favoritesToggle').classList.toggle('active',catalogState.favoritesOnly); renderProducts()});
}
function renderProducts(filter){
  if(typeof filter==='string') catalogState.query=filter;
  const grid=document.getElementById('products'); if(!grid) return;
  const q=catalogState.query.trim().toLowerCase();
  let visible=products.filter(product=>{
    const hay=`${product.name} ${product.color||''} ${product.category||''} ${product.description||''}`.toLowerCase();
    return (!q || hay.includes(q)) &&
      (catalogState.category==='all' || product.category===catalogState.category) &&
      (!catalogState.maxPrice || product.price<=catalogState.maxPrice) &&
      (catalogState.size==='all' || (product.sizes||[]).includes(catalogState.size)) &&
      (!catalogState.favoritesOnly || favorites.includes(product.id));
  });
  if(catalogState.sort==='price-asc') visible.sort((a,b)=>a.price-b.price);
  if(catalogState.sort==='price-desc') visible.sort((a,b)=>b.price-a.price);
  if(catalogState.sort==='name') visible.sort((a,b)=>a.name.localeCompare(b.name));
  const count=document.getElementById('catalogCount'); if(count) count.textContent=`${visible.length} ${visible.length===1?'PRODUCTO':'PRODUCTOS'}`;
  const fc=document.getElementById('favoritesCount'); if(fc) fc.textContent=favorites.length;
  grid.innerHTML=visible.length ? visible.map(product=>{
    const fav=favorites.includes(product.id);
    const isDrop=Boolean(product.drop);
    const tagLabel=isDrop ? `DROP ${product.dropNumber || ''}`.trim() : T('new_tag');
    const sizes=(product.sizes||[]).join(' · ');
    const productIndex=Math.max(1, products.indexOf(product)+1);
    const productCode=`NX-${String(productIndex).padStart(3,'0')}`;
    return `<article class="product" tabindex="0" role="button" aria-label="${T('view_product')} ${product.name}" data-product-id="${product.id}">
      <div class="product-photo" style="${getProductImageStyle(product)}">
        <div class="product-photo-shade" aria-hidden="true"></div>
        <span class="tag ${isDrop?'tag-drop':''}">${tagLabel}</span>
        <button type="button" class="heart ${fav?'is-favorite':''}" data-favorite="${product.id}" aria-label="${fav?'Quitar de favoritos':'Agregar a favoritos'}" aria-pressed="${fav}">${fav?'♥':'♡'}</button>
        <button type="button" class="card-quick-view" data-view-product="${product.id}">${T('view_product')} <span>→</span></button>
      </div>
      <div class="product-info">
        <div class="product-code">${productCode}</div><div class="product-name-row"><div class="product-name">${product.name}</div><span class="product-color">${product.color || product.category}</span></div>
        <div class="product-meta"><span class="product-sizes">${sizes ? `TALLAS ${sizes}` : 'VER DETALLES'}</span><span class="price">${money(product.price)}</span></div>
        <button type="button" class="view-product" data-view-product="${product.id}">${T('view_product')} <span>→</span></button>
      </div>
    </article>`;
  }).join('') : `<div class="catalog-empty"><strong>NO HAY RESULTADOS</strong><span>Prueba otra búsqueda o limpia los filtros.</span></div>`;
  grid.querySelectorAll('.product').forEach(card=>{
    card.addEventListener('click',()=>openProduct(card.dataset.productId));
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProduct(card.dataset.productId)}});
  });
  grid.querySelectorAll('[data-view-product]').forEach(btn=>btn.addEventListener('click',e=>{e.stopPropagation();openProduct(btn.dataset.viewProduct)}));
  grid.querySelectorAll('[data-favorite]').forEach(btn=>btn.addEventListener('click',e=>{
    e.stopPropagation();
    toggleFavorite(btn.dataset.favorite);
    const isFav=favorites.includes(btn.dataset.favorite);
    btn.classList.toggle('is-favorite',isFav);
    btn.setAttribute('aria-pressed',String(isFav));
    btn.textContent=isFav?'♥':'♡';
    btn.animate([{transform:'scale(.82)'},{transform:'scale(1.14)'},{transform:'scale(1)'}],{duration:280,easing:'cubic-bezier(.22,1,.36,1)'});
  }));
}

window.addEventListener('outflow:languagechange',()=>{
  renderProducts(document.getElementById('search')?.value || '');
  if(selectedProduct && document.getElementById('productModal')?.classList.contains('open')) openProduct(selectedProduct.id);
});
