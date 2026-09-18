/* NON X V21 — IDIOMAS
   Fuente operativa única para la interfaz ES / EN / PT.
   El catálogo de productos mantiene sus propios nombres/descripciones para no alterar datos comerciales.
*/
(() => {
  const translations = {
    es: {
      topbar:'ENVÍOS A TODO CHILE · NUEVOS INGRESOS CADA SEMANA',
      nav_shop:'Tienda', nav_new:'Novedades', nav_categories:'Categorías⌄', nav_about:'Nosotros', nav_help:'Ayuda',
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
      related_products:'TAMBIÉN TE PUEDE INTERESAR',
      hero_empty_label:'PRÓXIMAMENTE', hero_empty_title:'EL ARCHIVO|SE ABRE|PRONTO.',
      hero_empty_description:'Estamos confeccionando las primeras piezas. Únete a la lista o escríbenos y te avisamos apenas esté disponible el primer drop.',
      hero_empty_cta:'UNIRME A LA LISTA →',
      tshirts:'CAMISETAS', jeans:'JEANS', hoodies:'POLERONES', sneakers:'ZAPATILLAS',
      faq_eyebrow:'NON X / AYUDA', faq_title:'PREGUNTAS|FRECUENTES',
      faq_q_shipping:'¿Cuánto tarda y cuánto cuesta el envío?',
      faq_a_shipping:'Despacho estimado de 3 a 7 días hábiles dentro de Chile. El costo se calcula en el checkout según tu comuna.',
      faq_q_payment:'¿Qué métodos de pago aceptan?',
      faq_a_payment:'Webpay, transferencia bancaria y otros medios que se habilitarán en el checkout. Toda transacción se procesa mediante pasarelas de pago certificadas — NON X nunca ve ni guarda los datos de tu tarjeta.',
      faq_q_security:'¿Es seguro comprar en NON X?',
      faq_a_security:'Sí. El pago se procesa a través de pasarelas certificadas (no en un formulario propio), y tus datos personales solo se usan para procesar tu pedido y avisarte de nuevos drops si te suscribes.',
      faq_q_returns:'¿Puedo cambiar o devolver una prenda?',
      faq_a_returns:'Sí, dentro de los primeros días después de recibir tu pedido, siempre que la prenda esté sin uso y con sus etiquetas. Escríbenos por WhatsApp para coordinar el cambio.',
      faq_q_sizing:'¿Cómo sé qué talla pedir?',
      faq_a_sizing:'Cada producto tiene su propia guía de tallas con medidas en cm dentro de la ficha del producto ("Guía de tallas"). Si aun así tienes dudas, escríbenos y te ayudamos a elegir.',
      faq_q_drops:'¿Por qué hay tan pocas unidades de cada pieza?',
      faq_a_drops:'Porque confeccionamos cada drop en lotes pequeños. Cuando una talla se agota, se agotó — no hay reposición automática de esa misma pieza.',
      faq_q_notify:'¿Cómo me entero cuando hay un drop nuevo?',
      faq_a_notify:'Únete a la lista más abajo — quienes están suscritos reciben el aviso antes que el resto.',
      faq_q_contact:'¿Cómo los contacto?',
      faq_a_contact:'Por el botón de WhatsApp en la esquina inferior, o escribiendo directamente a nuestro correo/redes cuando estén activos.'
    },
    en: {
      topbar:'SHIPPING WORLDWIDE · NEW DROPS EVERY WEEK',
      nav_shop:'Shop', nav_new:'New arrivals', nav_categories:'Categories⌄', nav_about:'About', nav_help:'Help',
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
      related_products:'YOU MIGHT ALSO LIKE',
      hero_empty_label:'COMING SOON', hero_empty_title:'THE ARCHIVE|OPENS|SOON.',
      hero_empty_description:'We are making the first pieces. Join the list or message us and we will let you know the moment the first drop is live.',
      hero_empty_cta:'JOIN THE LIST →',
      tshirts:'T-SHIRTS', jeans:'JEANS', hoodies:'HOODIES', sneakers:'SNEAKERS',
      faq_eyebrow:'NON X / HELP', faq_title:'FREQUENTLY|ASKED QUESTIONS',
      faq_q_shipping:'How long does shipping take and how much does it cost?',
      faq_a_shipping:'Estimated delivery of 3 to 7 business days within Chile. Cost is calculated at checkout based on your address.',
      faq_q_payment:'What payment methods do you accept?',
      faq_a_payment:'Webpay, bank transfer and other methods enabled at checkout. Every transaction runs through certified payment gateways — NON X never sees or stores your card details.',
      faq_q_security:'Is it safe to buy from NON X?',
      faq_a_security:'Yes. Payment is processed through certified gateways (not a form of our own), and your personal data is only used to process your order and notify you about new drops if you subscribe.',
      faq_q_returns:'Can I exchange or return an item?',
      faq_a_returns:'Yes, within the first few days after receiving your order, as long as the item is unused and still has its tags. Message us on WhatsApp to arrange the exchange.',
      faq_q_sizing:'How do I know what size to order?',
      faq_a_sizing:'Every product has its own size guide with measurements in cm inside the product page ("Size guide"). Still unsure? Message us and we will help you pick.',
      faq_q_drops:'Why are there so few units of each piece?',
      faq_a_drops:'Because every drop is made in small batches. Once a size sells out, it is out — that exact piece does not get automatically restocked.',
      faq_q_notify:'How do I find out about a new drop?',
      faq_a_notify:'Join the list below — subscribers get notified before everyone else.',
      faq_q_contact:'How can I reach you?',
      faq_a_contact:'Through the WhatsApp button in the bottom corner, or by writing directly to our email/socials once those are active.'
    },
    pt: {
      topbar:'ENVIO PARA TODO O MUNDO · NOVAS ENTRADAS TODA SEMANA',
      nav_shop:'Loja', nav_new:'Novidades', nav_categories:'Categorias⌄', nav_about:'Sobre nós', nav_help:'Ajuda',
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
      related_products:'VOCÊ TAMBÉM PODE GOSTAR',
      hero_empty_label:'EM BREVE', hero_empty_title:'O ARQUIVO|ABRE EM|BREVE.',
      hero_empty_description:'Estamos confeccionando as primeiras peças. Junte-se à lista ou nos escreva e avisamos assim que o primeiro drop estiver disponível.',
      hero_empty_cta:'ENTRAR NA LISTA →',
      tshirts:'CAMISETAS', jeans:'JEANS', hoodies:'MOLETONS', sneakers:'TÊNIS',
      faq_eyebrow:'NON X / AJUDA', faq_title:'PERGUNTAS|FREQUENTES',
      faq_q_shipping:'Quanto tempo demora e quanto custa o frete?',
      faq_a_shipping:'Entrega estimada de 3 a 7 dias úteis dentro do Chile. O custo é calculado no checkout de acordo com seu endereço.',
      faq_q_payment:'Quais métodos de pagamento vocês aceitam?',
      faq_a_payment:'Webpay, transferência bancária e outros meios habilitados no checkout. Toda transação é processada por gateways de pagamento certificados — a NON X nunca vê nem armazena os dados do seu cartão.',
      faq_q_security:'É seguro comprar na NON X?',
      faq_a_security:'Sim. O pagamento é processado por gateways certificados (não em um formulário próprio), e seus dados pessoais só são usados para processar seu pedido e avisar sobre novos drops se você se inscrever.',
      faq_q_returns:'Posso trocar ou devolver uma peça?',
      faq_a_returns:'Sim, dentro dos primeiros dias após receber seu pedido, desde que a peça esteja sem uso e com as etiquetas. Escreva no WhatsApp para combinar a troca.',
      faq_q_sizing:'Como sei qual tamanho pedir?',
      faq_a_sizing:'Cada produto tem seu próprio guia de tamanhos com medidas em cm na página do produto ("Guia de tamanhos"). Ainda com dúvidas? Escreva para nós.',
      faq_q_drops:'Por que há tão poucas unidades de cada peça?',
      faq_a_drops:'Porque cada drop é confeccionado em lotes pequenos. Quando um tamanho esgota, esgotou — essa peça não é reabastecida automaticamente.',
      faq_q_notify:'Como sei quando sai um novo drop?',
      faq_a_notify:'Entre na lista abaixo — quem está inscrito recebe o aviso antes de todo mundo.',
      faq_q_contact:'Como falo com vocês?',
      faq_a_contact:'Pelo botão de WhatsApp no canto inferior, ou escrevendo direto para nosso e-mail/redes quando estiverem ativos.'
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
