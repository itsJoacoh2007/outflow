/* NON X V27 — INTEGRACIÓN KLAVIYO (newsletter real / lista de espera)
   ============================================================
   Conecta el formulario "ENTRA AL DROP" con una lista de correo real.
   Mientras KLAVIYO_CONFIG no esté completado, el formulario sigue
   mostrando el mismo aviso de siempre — no se rompe nada.

   CÓMO ACTIVARLO (2 pasos):

   1) Instala la app "Klaviyo: Email Marketing & SMS" desde el admin de
      Shopify (plan gratis alcanza hasta 250 contactos). Se sincroniza
      solo con tus clientes de Shopify.

   2) Crea un formulario de "signup" en Klaviyo (Sign-up Forms → Manage
      Forms → obtén el Public API Key: Klaviyo → Settings → API Keys).
      Completa la línea de abajo con ese Public API Key y la Lista (List ID,
      en Klaviyo → Lists → tu lista → ID en la URL).
   ============================================================ */

const KLAVIYO_CONFIG = {
  publicApiKey: 'TU_PUBLIC_API_KEY',
  listId: 'TU_LIST_ID'
};

function isKlaviyoConfigured(){
  return KLAVIYO_CONFIG.publicApiKey !== 'TU_PUBLIC_API_KEY' && KLAVIYO_CONFIG.listId !== 'TU_LIST_ID';
}

async function subscribeToKlaviyo(email){
  const res = await fetch(`https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_CONFIG.publicApiKey}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', revision: '2024-10-15'},
    body: JSON.stringify({
      data: {
        type: 'subscription',
        attributes: { profile: { data: { type: 'profile', attributes: { email } } } },
        relationships: { list: { data: { type: 'list', id: KLAVIYO_CONFIG.listId } } }
      }
    })
  });
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
}

document.getElementById('newsletter')?.addEventListener('submit', async e=>{
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  const email = input?.value.trim();
  if(!email) return;

  if(!isKlaviyoConfigured()){
    alert('¡Listo! Te avisaremos de los próximos drops.');
    e.target.reset();
    return;
  }
  const button = e.target.querySelector('button');
  const originalText = button.textContent;
  button.textContent = '...'; button.disabled = true;
  try{
    await subscribeToKlaviyo(email);
    alert('¡Listo! Quedaste en la lista — te avisamos apenas salga el próximo drop.');
    e.target.reset();
  }catch(err){
    console.error('Error al suscribir a Klaviyo:', err);
    alert('No se pudo completar la suscripción. Intenta de nuevo en unos segundos.');
  }finally{
    button.textContent = originalText; button.disabled = false;
  }
});
