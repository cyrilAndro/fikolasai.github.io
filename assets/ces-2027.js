/* Tally owns validation, network errors and confirmation. Never transmit answers to analytics. */
(() => {
  'use strict';
  const allowed={utm_source:['fikolasai','linkedin','frenchtech','qr','email'],utm_medium:['website','social','event','email','qr'],utm_campaign:['ces_2027']};
  const original=new URLSearchParams(location.search),safe=new URLSearchParams();
  Object.keys(allowed).forEach(key=>{if(allowed[key].includes(original.get(key)))safe.set(key,original.get(key));});
  const hash=location.hash==='#rencontre'?'#rencontre':'';
  if(location.search||location.hash!==hash)history.replaceState(null,'',location.pathname+(safe.toString()?'?'+safe:'')+hash);
  document.addEventListener('DOMContentLoaded',()=>{
    const frame=document.querySelector('#ces-tally');if(!frame)return;
    const lang=document.documentElement.lang==='en'?'en':'fr',formId=frame.dataset.formId;
    if(Date.now()>=Date.parse('2027-01-10T00:00:00-08:00')){
      document.querySelector('#event-status').hidden=false;document.querySelector('#rencontre').hidden=true;
      document.querySelectorAll('[data-before-ces]').forEach(el=>{el.hidden=true;});
      document.querySelectorAll('[data-meet-cta]').forEach(link=>{link.href=lang==='en'?'/en/#offers':'/#offers';link.textContent=lang==='en'?'Continue the conversation':'Poursuivons la conversation';});return;
    }
    let recorded=false;
    window.addEventListener('message',event=>{
      if(event.origin!=='https://tally.so'||event.source!==frame.contentWindow)return;
      let data;try{data=typeof event.data==='string'?JSON.parse(event.data):event.data;}catch(_){return;}
      if(!data||data.event!=='Tally.FormSubmitted'||!data.payload||data.payload.formId!==formId||recorded)return;
      recorded=true;let consent=false;try{consent=localStorage.getItem('fikolasai-analytics-consent')==='granted';}catch(_){}
      if(consent&&typeof window.gtag==='function')window.gtag('event','generate_lead',{method:'tally',campaign:'ces_2027',language:lang});
    });
    const load=()=>{if(window.Tally)window.Tally.loadEmbeds();};
    const widget=document.querySelector('#tally-widget');if(widget)widget.addEventListener('load',load,{once:true});load();
  });
})();
