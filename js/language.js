/* NON X V21 — IDIOMAS
   Fuente operativa única para la interfaz ES / EN / PT.
   El catálogo de productos mantiene sus propios nombres/descripciones para no alterar datos comerciales.
*/
(() => {
  const translations = {
    es: {
      topbar:'ENVÍOS A TODO CHILE · NUEVOS INGRESOS CADA SEMANA',
      nav_shop:'Tienda', nav_new:'Novedades', nav_categories:'Categorías⌄', nav_about:'Nosotros',
      search_placeholder:'Buscar productos...',
      hero_title:'VISTE|FUERA|DE LO COMÚN.', hero_description:'Streetwear seleccionado para quienes no quieren verse como todos.',
      explore_collection:'EXPLORAR COLECCIÓN →', categories_title:'CATEGORÍAS', see_all:'VER TODAS →',
      view_collection:'Ver colección →', featured_products:'PRODUCTOS DESTACADOS', see_all_products:'VER TODOS →',
      catalog_note:'Selecciona un producto para ver tallas, detalles y agregarlo al carrito.',
      newsletter_title:'ENTRA AL DROP.', email_placeholder:'Tu correo electrónico', join:'UNIRME →',
      shipping_chile:'ENVÍOS A TODO CHILE', shipping_sub:'Rápidos y seguros.', pay:'PAGA COMO QUIERAS', pay_sub:'Webpay, transferencia, etc.',
      secure:'COMPRA SEGURA', secure_sub:'Tus datos protegidos.', returns:'CAMBIOS Y DEVOLUCIONES', returns_sub:'Sin complicaciones.',
      material:'MATERIAL', fit:'FIT', product_details:'DETALLES DEL PRODUCTO', size_guide:'GUÍA DE TALLAS', care:'CUIDADOS',
      shipping_returns:'ENVÍOS Y CAMBIOS', size_note:'Medidas referenciales en cm. La tabla se reemplazará por las medidas reales.',
      returns_note:'Los cambios y devoluciones estarán sujetos a la política final de NON X.', size:'TALLA',
      select_size:'Selecciona una talla para continuar.', selected_size:'Talla seleccionada:', add_to_cart:'AGREGAR AL CARRITO →',
      new_tag:'NUEVO', view_product:'VER PRODUCTO →', no_size_guide:'No disponible.', size_label:'TALLA', foot_cm:'PIE (CM)',
      cm:'CM', shipping_default:'Despacho estimado: 3–7 días hábiles dentro de Chile.',
      video_error:'Tu navegador no puede reproducir este video.', image_label:'imagen', video_label:'video',
      related_products:'TAMBIÉN TE PUEDE INTERESAR'
    },
    en: {
      topbar:'SHIPPING WORLDWIDE · NEW DROPS EVERY WEEK',
      nav_shop:'Shop', nav_new:'New arrivals', nav_categories:'Categories⌄', nav_about:'About',
      search_placeholder:'Search products...',
      hero_title:'DRESS|OUTSIDE|THE ORDINARY.', hero_description:'Curated streetwear for those who refuse to look like everyone else.',
      explore_collection:'EXPLORE COLLECTION →', categories_title:'CATEGORIES', see_all:'VIEW ALL →',
      view_collection:'View collection →', featured_products:'FEATURED PRODUCTS', see_all_products:'VIEW ALL →',
      catalog_note:'Select a product to view sizes, details and add it to your cart.',
      newsletter_title:'ENTER THE DROP.', email_placeholder:'Your email address', join:'JOIN →',
      shipping_chile:'WORLDWIDE SHIPPING', shipping_sub:'Fast and secure.', pay:'PAY YOUR WAY', pay_sub:'Webpay, bank transfer, etc.',
      secure:'SECURE SHOPPING', secure_sub:'Your data is protected.', returns:'RETURNS & EXCHANGES', returns_sub:'No complications.',
      material:'MATERIAL', fit:'FIT', product_details:'PRODUCT DETAILS', size_guide:'SIZE GUIDE', care:'CARE',
      shipping_returns:'SHIPPING & RETURNS', size_note:'Reference measurements in cm. The table will be replaced with real measurements.',
      returns_note:'Returns and exchanges will be subject to NON X’s final policy.', size:'SIZE',
      select_size:'Select a size to continue.', selected_size:'Selected size:', add_to_cart:'ADD TO CART →',
      new_tag:'NEW', view_product:'VIEW PRODUCT →', no_size_guide:'Not available.', size_label:'SIZE', foot_cm:'FOOT (CM)',
      cm:'CM', shipping_default:'Estimated delivery: 3–7 business days within Chile.',
      video_error:'Your browser cannot play this video.', image_label:'image', video_label:'video',
      related_products:'YOU MIGHT ALSO LIKE'
    },
    pt: {
      topbar:'ENVIO PARA TODO O MUNDO · NOVAS ENTRADAS TODA SEMANA',
      nav_shop:'Loja', nav_new:'Novidades', nav_categories:'Categorias⌄', nav_about:'Sobre nós',
      search_placeholder:'Buscar produtos...',
      hero_title:'VISTA|FORA|DO COMUM.', hero_description:'Streetwear selecionado para quem não quer parecer igual a todo mundo.',
      explore_collection:'EXPLORAR COLEÇÃO →', categories_title:'CATEGORIAS', see_all:'VER TODAS →',
      view_collection:'Ver coleção →', featured_products:'PRODUTOS EM DESTAQUE', see_all_products:'VER TODOS →',
      catalog_note:'Selecione um produto para ver tamanhos, detalhes e adicioná-lo ao carrinho.',
      newsletter_title:'ENTRE NO DROP.', email_placeholder:'Seu e-mail', join:'ENTRAR →',
      shipping_chile:'ENVIO PARA TODO O MUNDO', shipping_sub:'Rápido e seguro.', pay:'PAGUE COMO QUISER', pay_sub:'Webpay, transferência, etc.',
      secure:'COMPRA SEGURA', secure_sub:'Seus dados protegidos.', returns:'TROCAS E DEVOLUÇÕES', returns_sub:'Sem complicações.',
      material:'MATERIAL', fit:'FIT', product_details:'DETALHES DO PRODUTO', size_guide:'GUIA DE TAMANHOS', care:'CUIDADOS',
      shipping_returns:'ENVIO E TROCAS', size_note:'Medidas de referência em cm. A tabela será substituída pelas medidas reais.',
      returns_note:'Trocas e devoluções estarão sujeitas à política final da NON X.', size:'TAMANHO',
      select_size:'Selecione um tamanho para continuar.', selected_size:'Tamanho selecionado:', add_to_cart:'ADICIONAR AO CARRINHO →',
      new_tag:'NOVO', view_product:'VER PRODUTO →', no_size_guide:'Não disponível.', size_label:'TAMANHO', foot_cm:'PÉ (CM)',
      cm:'CM', shipping_default:'Entrega estimada: 3–7 dias úteis no Chile.',
      video_error:'Seu navegador não pode reproduzir este vídeo.', image_label:'imagem', video_label:'vídeo',
      related_products:'VOCÊ TAMBÉM PODE GOSTAR'
    }
  };

  let currentLanguage = localStorage.getItem('nonx-language') || localStorage.getItem('outflow-language') || 'es';

  window.nonxLanguage = {
    get lang(){ return currentLanguage; },
    t(key){ return translations[currentLanguage]?.[key] ?? translations.es[key] ?? key; },
    apply(){
      document.documentElement.lang=currentLanguage;
      document.querySelectorAll('[data-i18n]').forEach(el=>{
        const value=this.t(el.dataset.i18n);
        if(value.includes('|')){
          el.innerHTML=value.split('|').join('<br>');
        } else el.textContent=value;
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>el.placeholder=this.t(el.dataset.i18nPlaceholder));
      const toggle=document.getElementById('languageToggle');
      const menu=document.getElementById('languageMenu');
      if(toggle) toggle.textContent=(currentLanguage==='en'?'EN':currentLanguage==='pt'?'PT':'ES')+' ▾';
      menu?.classList.remove('open'); toggle?.setAttribute('aria-expanded','false');
      window.dispatchEvent(new CustomEvent('nonx:languagechange',{detail:{lang:currentLanguage}}));
    },
    set(lang){
      if(!translations[lang]) return;
      currentLanguage=lang; localStorage.setItem('nonx-language',lang); this.apply();
    }
  };

  const toggle=document.getElementById('languageToggle');
  const menu=document.getElementById('languageMenu');
  toggle?.addEventListener('click',e=>{ e.stopPropagation(); menu?.classList.toggle('open'); toggle.setAttribute('aria-expanded',menu?.classList.contains('open')?'true':'false'); });
  document.querySelectorAll('[data-set-lang]').forEach(btn=>btn.addEventListener('click',()=>window.nonxLanguage.set(btn.dataset.setLang)));
  document.addEventListener('click',()=>menu?.classList.remove('open'));
  window.nonxLanguage.apply();
})();
