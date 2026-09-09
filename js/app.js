/* OUTFLOW V11 — APP / INICIALIZACIÓN / ANIMACIONES */

document.getElementById('openCart').onclick=openCart;
document.getElementById('closeCart').onclick=closeCart;
document.getElementById('overlay').onclick=closeCart;
document.getElementById('checkout').onclick=()=>alert('El checkout real se conectará a Shopify en la siguiente etapa.');
document.getElementById('search').addEventListener('input',e=>renderProducts(e.target.value));

// V14 — navegación por categorías y acceso rápido a favoritos
function initNavigation(){
  document.querySelectorAll('[data-category-link]').forEach(el=>el.addEventListener('click',event=>{
    event.preventDefault();
    const category=el.dataset.categoryLink;
    const tab=document.querySelector(`.filter-tab[data-category=\"${category}\"]`);
    if(tab) tab.click();
    else if(category==='all') document.querySelector('.filter-tab[data-category=\"all\"]')?.click();
    document.getElementById('tienda')?.scrollIntoView({behavior:'smooth',block:'start'});
  }));
  document.getElementById('accountBtn')?.addEventListener('click',()=>{
    document.getElementById('tienda')?.scrollIntoView({behavior:'smooth',block:'start'});
    const fav=document.getElementById('favoritesToggle');
    if(fav && !fav.classList.contains('active')) fav.click();
  });
}

document.getElementById('newsletter').addEventListener('submit',e=>{
  e.preventDefault();
  alert('¡Listo! Te avisaremos de los próximos drops.');
  e.target.reset();
});

document.getElementById('closeProduct').onclick=closeProduct;
document.getElementById('productModal').addEventListener('click',event=>{
  if(event.target.id==='productModal') closeProduct();
});
document.getElementById('detailMinus').onclick=()=>changeDetailQuantity(-1);
document.getElementById('detailPlus').onclick=()=>changeDetailQuantity(1);
document.getElementById('detailQuantity').addEventListener('change',event=>{
  const value=Number.parseInt(event.target.value,10);
  detailQuantity=Math.min(999,Math.max(1,Number.isFinite(value)?value:1));
  event.target.value=detailQuantity;
});
document.getElementById('modalAdd').onclick=addSelectedProduct;

document.addEventListener('keydown',event=>{ if(event.key==='Escape'){ closeProduct(); closeCart(); } });

(async()=>{
  await loadProducts();
  initCatalogFilters();
  renderProducts();
  renderCart();
  initDropHero();
  initDropShowcase();
  initMobileMenu();
  initNavigation();
})();

/* HERO / DROP FEATURE — el video del producto marcado como drop=true se muestra en portada. */
function initDropHero(){
  const hero=document.querySelector('.hero');
  const video=document.getElementById('heroVideo');
  if(!hero || !video || !Array.isArray(products)) return;
  const drop=products.find(product=>product.drop && product.heroMedia) || products.find(product=>product.heroMedia);
  if(!drop) return;

  video.src=drop.heroMedia;
  video.muted=true;
  video.loop=true;
  video.playsInline=true;
  video.setAttribute('muted','');
  video.play().catch(()=>{});

  hero.dataset.drop=drop.dropNumber || '001';
  const eyebrow=document.getElementById('heroDropLabel');
  const label=document.getElementById('heroProductLabel');
  const cta=document.getElementById('heroDropCta');
  if(eyebrow) eyebrow.textContent=`OUTFLOW / ${drop.dropNumber || '001'}`;
  if(label) label.textContent=`${String(drop.dropLabel || drop.name).toUpperCase()} · DROP ${drop.dropNumber || '001'}`;
  if(cta) cta.addEventListener('click',()=>{
    const card=document.querySelector(`[data-product-id="${drop.id}"]`);
    card?.scrollIntoView({behavior:'smooth',block:'center'});
  });

  const updateHeroFade=()=>{
    const rect=hero.getBoundingClientRect();
    const total=Math.max(hero.offsetHeight-window.innerHeight,1);
    const progress=Math.min(1,Math.max(0,-rect.top/Math.max(hero.offsetHeight*.72,1)));
    const opacity=.82*(1-progress);
    video.style.opacity=String(Math.max(0,opacity));
    video.style.transform=`scale(${1.03 + progress*.035})`;
  };
  updateHeroFade();
  window.addEventListener('scroll',updateHeroFade,{passive:true});
  window.addEventListener('resize',updateHeroFade);
}

/* ANIMACIONES */
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}
  });
},{threshold:.14,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal,.stagger').forEach(el=>revealObserver.observe(el));

const hero=document.querySelector('.hero');
hero?.addEventListener('mousemove',e=>{
  const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  document.querySelector('.hero-copy').style.transform=`translate(${x*7}px,${y*5}px)`;
});
hero?.addEventListener('mouseleave',()=>document.querySelector('.hero-copy').style.transform='');


/* V13 — DROP DINÁMICO */
function initDropShowcase(){
  const root=document.getElementById('dropProducts');
  if(!root || !Array.isArray(products)) return;
  const drop=products.find(p=>p.drop) || products[0];
  if(!drop) return;
  const related=products.filter(p=>p.id!==drop.id).slice(0,2);
  const cards=[drop,...related];
  root.innerHTML=cards.map((p,i)=>{
    const image=p.image || p.media?.find(m=>m.type==='image')?.src || 'assets/images/products.jpg';
    return `<article class="drop-card ${i===0?'drop-card-featured':''}" data-product-id="${p.id}">
      <button class="drop-card-media" type="button" aria-label="Ver ${p.name}" data-open-product="${p.id}">
        <img src="${image}" alt="${p.name} — ${p.color||''}" loading="lazy">
        ${p.id===drop.id && p.heroMedia ? '<span class="drop-play">▶ VIDEO</span>' : ''}
      </button>
      <div class="drop-card-info"><div><span>${String(p.category||'').toUpperCase()}</span><h3>${p.name}</h3></div><button type="button" data-open-product="${p.id}">VER PRODUCTO →</button></div>
    </article>`;
  }).join('');
  root.querySelectorAll('[data-open-product]').forEach(btn=>btn.addEventListener('click',()=>openProduct(btn.dataset.openProduct)));
}

/* V13 — MENÚ MÓVIL */
function initMobileMenu(){
  const btn=document.getElementById('mobileMenuBtn'), menu=document.getElementById('mobileMenu'), close=document.getElementById('mobileMenuClose');
  if(!btn||!menu) return;
  const set=open=>{menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));document.body.classList.toggle('menu-open',open)};
  btn.addEventListener('click',()=>set(true));
  close?.addEventListener('click',()=>set(false));
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>set(false)));
}
