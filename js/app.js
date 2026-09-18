
/* V15.1 — TEMA DARK / LIGHT */
function initTheme(){
  const root=document.documentElement;
  const buttons=[document.getElementById('themeToggle'),document.getElementById('mobileThemeToggle')].filter(Boolean);
  if(!buttons.length) return;
  const system=()=>window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
  const apply=(theme,save=true)=>{
    root.dataset.theme=theme;
    if(save) localStorage.setItem('nonx-theme',theme);
    const isLight=theme==='light';
    const themeMeta=document.getElementById('themeColor');
    if(themeMeta) themeMeta.setAttribute('content', isLight ? '#f4f4f2' : '#080808');
    buttons.forEach(btn=>{
      btn.setAttribute('aria-pressed',String(isLight));
      btn.setAttribute('aria-label',isLight?'Cambiar a modo oscuro':'Cambiar a modo claro');
      const icon=btn.querySelector('.theme-icon');
      if(icon) icon.textContent=isLight?'☼':'◐';
      const copy=btn.querySelector('.mobile-theme-copy');
      if(copy) copy.textContent=isLight?'TEMA CLARO':'TEMA OSCURO';
    });
  };
  const saved=localStorage.getItem('nonx-theme') || localStorage.getItem('outflow-theme');
  apply(saved || root.dataset.theme || system(),false);
  buttons.forEach(btn=>btn.addEventListener('click',()=>apply(root.dataset.theme==='light'?'dark':'light')));
  const media=window.matchMedia('(prefers-color-scheme: light)');
  media.addEventListener?.('change',()=>{if(!localStorage.getItem('nonx-theme')) apply(system(),false)});
}

/* NON X V21 — APP / INICIALIZACIÓN / ANIMACIONES
   Todos los bindings usan encadenamiento opcional (?.) a propósito: si en una futura
   edición se borra o renombra un id del HTML, ese binding puntual queda sin efecto
   en vez de detener la ejecución de todo el archivo. */

document.getElementById('openCart')?.addEventListener('click',openCart);
document.getElementById('closeCart')?.addEventListener('click',closeCart);
document.getElementById('overlay')?.addEventListener('click',closeCart);
/* El botón de checkout ahora lo maneja js/shopify-checkout.js (usa Shopify
   si ya está configurado, o muestra el mismo aviso mientras tanto). */
document.getElementById('search')?.addEventListener('input',e=>renderProducts(e.target.value));
const mobileSearch=document.getElementById('mobileSearch');
mobileSearch?.addEventListener('input',e=>{
  const desktopSearch=document.getElementById('search');
  if(desktopSearch) desktopSearch.value=e.target.value;
  renderProducts(e.target.value);
});

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

/* NON X V26 — permite saltar el intro con un clic/tap, por si alguien vuelve a probar rápido */
document.getElementById('archiveIntro')?.addEventListener('click',function(){ this.classList.add('archive-intro--skip'); });

/* Barra de progreso de scroll — indicador sutil de cuánto queda de página. */
(function initScrollProgress(){
  const bar=document.getElementById('scrollProgress');
  if(!bar) return;
  const update=()=>{
    const h=document.documentElement;
    const scrolled=h.scrollTop || document.body.scrollTop;
    const total=(h.scrollHeight - h.clientHeight) || 1;
    bar.style.transform=`scaleX(${Math.min(1, Math.max(0, scrolled/total))})`;
  };
  update();
  window.addEventListener('scroll', update, {passive:true});
  window.addEventListener('resize', update);
})();

/* El formulario de newsletter ahora lo maneja js/newsletter-signup.js
   (usa Klaviyo si ya está configurado, o muestra el mismo aviso mientras tanto). */

document.getElementById('closeProduct')?.addEventListener('click',closeProduct);
document.getElementById('productModal')?.addEventListener('click',event=>{
  if(event.target.id==='productModal') closeProduct();
});
document.getElementById('detailMinus')?.addEventListener('click',()=>changeDetailQuantity(-1));
document.getElementById('detailPlus')?.addEventListener('click',()=>changeDetailQuantity(1));
document.getElementById('detailQuantity')?.addEventListener('change',event=>{
  const value=Number.parseInt(event.target.value,10);
  detailQuantity=Math.min(999,Math.max(1,Number.isFinite(value)?value:1));
  event.target.value=detailQuantity;
});
document.getElementById('modalAdd')?.addEventListener('click',addSelectedProduct);

document.addEventListener('keydown',event=>{ if(event.key==='Escape'){ closeProduct(); closeCart(); } });

/* Skeleton de carga — se ve mientras se hace fetch() de data/products.json,
   en vez de que la grilla quede en blanco esos primeros milisegundos. */
function showCatalogSkeleton(count=8){
  const grid=document.getElementById('products');
  if(!grid) return;
  grid.innerHTML=Array.from({length:count}).map(()=>`
    <div class="skeleton-card" aria-hidden="true">
      <div class="skeleton-photo"></div>
      <div class="skeleton-line w60"></div>
      <div class="skeleton-line w40"></div>
    </div>`).join('');
}
showCatalogSkeleton();

/* NON X V28 — abre y resalta la pregunta del FAQ correcta si se llega por hash
   (ej. al hacer clic en los badges de envíos/pago/seguridad/cambios). */
function openFaqFromHash(){
  const id = location.hash.replace('#','');
  if(!id.startsWith('faq-')) return;
  const item = document.getElementById(id);
  if(!item) return;
  document.querySelectorAll('.faq-accordions .accordion-item').forEach(other=>{
    other.classList.remove('is-open');
    other.querySelector('.accordion-trigger')?.setAttribute('aria-expanded','false');
  });
  item.classList.add('is-open');
  item.querySelector('.accordion-trigger')?.setAttribute('aria-expanded','true');
  item.classList.add('faq-highlight');
  setTimeout(()=>item.classList.remove('faq-highlight'), 1700);
  requestAnimationFrame(()=>item.scrollIntoView({behavior:'smooth',block:'center'}));
}
window.addEventListener('hashchange', openFaqFromHash);

(async()=>{
  await loadProducts();
  initCatalogFilters();
  renderProducts();
  renderCart();
  initDropHero();
  initDropShowcase();
  initMobileMenu();
  initNavigation();
  initTheme();
  injectStructuredData();
  initAccordions();
  openFaqFromHash();
})();


function injectStructuredData(){
  if(!Array.isArray(products) || !products.length) return;
  const items=products.slice(0,24).map(product=>({
    '@type':'Product',
    name:product.name,
    description:product.description || '',
    image: product.image ? [new URL(product.image, document.baseURI).href] : [],
    sku:product.id,
    brand:{'@type':'Brand',name:'NON X'},
    offers:{'@type':'Offer',priceCurrency:product.currency || 'CLP',price:Number(product.price),availability:'https://schema.org/InStock',url:window.location.href+'#producto-'+encodeURIComponent(product.id)}
  }));
  const data={
    '@context':'https://schema.org',
    '@graph':[
      {'@type':'Organization',name:'NON X',url:window.location.href},
      {'@type':'WebSite',name:'NON X',url:window.location.href},
      ...items
    ]
  };
  const existing=document.getElementById('nonx-structured-data');
  if(existing) existing.remove();
  const script=document.createElement('script');
  script.id='nonx-structured-data';
  script.type='application/ld+json';
  script.textContent=JSON.stringify(data);
  document.head.appendChild(script);
}

/* HERO / DROP FEATURE — el video del producto marcado como drop=true se muestra en portada.
   Si todavía no hay ningún producto así (catálogo vacío o recién empezando), el hero
   pasa a un estado "próximamente" sin video ni foto de producto: no hay forma honesta
   de mostrar una prenda que todavía no existe en el catálogo. Los textos de ese estado
   usan T() para que sigan correctos si el visitante cambia de idioma. */
function applyEmptyHeroText(){
  const eyebrow=document.getElementById('heroDropLabel');
  const label=document.getElementById('heroProductLabel');
  const cta=document.getElementById('heroDropCta');
  const heroTitle=document.querySelector('.hero-copy h1');
  const heroDesc=document.querySelector('.hero-copy [data-i18n="hero_description"]');
  if(eyebrow) eyebrow.textContent='NON X / ARCHIVE';
  if(label) label.textContent=T('hero_empty_label');
  if(heroTitle) heroTitle.innerHTML=T('hero_empty_title').split('|').join('<br>');
  if(heroDesc) heroDesc.textContent=T('hero_empty_description');
  if(cta) cta.textContent=T('hero_empty_cta');
}

function initDropHero(){
  const hero=document.querySelector('.hero');
  const video=document.getElementById('heroVideo');
  if(!hero || !video || !Array.isArray(products)) return;
  const drop=products.find(product=>product.drop && product.heroMedia);

  const eyebrow=document.getElementById('heroDropLabel');
  const label=document.getElementById('heroProductLabel');
  const cta=document.getElementById('heroDropCta');

  if(!drop){
    hero.classList.add('hero-empty');
    video.removeAttribute('src'); video.load?.();
    applyEmptyHeroText();
    if(cta){
      cta.setAttribute('href','#newsletter');
      cta.addEventListener('click',e=>{
        e.preventDefault();
        document.getElementById('newsletter')?.scrollIntoView({behavior:'smooth',block:'center'});
        document.querySelector('#newsletter input[type="email"]')?.focus();
      });
    }
    window.addEventListener('nonx:languagechange',()=>{
      if(hero.classList.contains('hero-empty')) applyEmptyHeroText();
    });
    return;
  }

  hero.classList.remove('hero-empty');
  video.src=drop.heroMedia;
  video.muted=true;
  video.loop=true;
  video.playsInline=true;
  video.setAttribute('muted','');
  video.play().catch(()=>{});

  hero.dataset.drop=drop.dropNumber || '001';
  if(eyebrow) eyebrow.textContent=`NON X / ${drop.dropNumber || '001'}`;
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
  if(!drop){
    root.innerHTML=`<div class="drop-empty">
      <strong>TODAVÍA NO HAY PIEZAS PUBLICADAS</strong>
      <span>El equipo está confeccionando el primer drop. Vuelve pronto o déjanos tu correo más abajo.</span>
    </div>`;
    return;
  }
  const related=products.filter(p=>p.id!==drop.id).slice(0,2);
  const cards=[drop,...related];
  root.innerHTML=cards.map((p,i)=>{
    const image=p.image || p.media?.find(m=>m.type==='image')?.src || NX_PLACEHOLDER_IMAGE;
    return `<article class="drop-card ${i===0?'drop-card-featured':''}" data-product-id="${escapeHtml(p.id)}">
      <button class="drop-card-media" type="button" aria-label="Ver ${escapeHtml(p.name)}" data-open-product="${escapeHtml(p.id)}">
        <img src="${escapeHtml(image)}" alt="${escapeHtml(p.name)} — ${escapeHtml(p.color||'')}" loading="lazy" decoding="async">
        ${p.id===drop.id && p.heroMedia ? '<span class="drop-play">▶ VIDEO</span>' : ''}
      </button>
      <div class="drop-card-info"><div><span>${escapeHtml(String(p.category||'').toUpperCase())}</span><h3>${escapeHtml(p.name)}</h3></div><button type="button" data-open-product="${escapeHtml(p.id)}">VER PRODUCTO →</button></div>
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
  menu.querySelectorAll('a, [data-category-link]').forEach(el=>el.addEventListener('click',()=>set(false)));
}
