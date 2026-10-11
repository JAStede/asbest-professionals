document.querySelector('.menu-toggle')?.addEventListener('click',function(){const nav=document.querySelector('#mainnav');const open=nav.classList.toggle('open');this.setAttribute('aria-expanded',String(open));});document.querySelector('#year')?.replaceChildren(document.createTextNode(new Date().getFullYear()));document.querySelector('#request-form')?.addEventListener('submit',function(e){e.preventDefault();if(!this.reportValidity())return;const f=new FormData(this);const body=[...f.entries()].map(([k,v])=>k+': '+v).join('\n');const url='mailto:info@asbest-professionals.nl?subject='+encodeURIComponent('Demo aanvraag asbest: '+f.get('onderwerp'))+'&body='+encodeURIComponent(body);document.querySelector('#form-status').textContent='Uw e-mailprogramma wordt geopend. Controleer de aanvraag en verzend de e-mail zelf.';window.location.href=url;});
// Geanimeerde cijfers, alleen zichtbaar en met respect voor reduced motion.
(()=>{const items=[...document.querySelectorAll('[data-count]')];if(!items.length)return;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;const animate=(el)=>{if(el.dataset.done)return;el.dataset.done='1';const target=Number(el.dataset.count),suffix=el.dataset.suffix||'';if(reduced){el.textContent=target+suffix;return;}const start=performance.now(),duration=1300;const frame=(now)=>{const t=Math.min(1,(now-start)/duration),ease=1-Math.pow(1-t,3);el.textContent=Math.max(1,Math.round(target*ease))+suffix;if(t<1)requestAnimationFrame(frame);};el.textContent='1'+suffix;requestAnimationFrame(frame);};if(!('IntersectionObserver'in window)){items.forEach(animate);return;}const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){animate(e.target);observer.unobserve(e.target);}})},{threshold:.25});items.forEach(e=>observer.observe(e));})();


/* Projectfoto's homepage: 5 seconden, alleen indien zichtbaar, respecteert reduced motion. */
(()=>{
 const hero=document.querySelector('.hero-slideshow');
 if(!hero)return;
 const slides=[...hero.querySelectorAll('.hero-slide')];
 if(slides.length<2||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 let current=0;
 const showNext=()=>{if(document.hidden)return;slides[current].classList.remove('is-active');current=(current+1)%slides.length;slides[current].classList.add('is-active')};
 window.setInterval(showNext,5000);
})();


/* LJ Studio: optionele verbeteringen zonder wijzigingen aan overige HTML-pagina's. */
(()=>{
  // Eén vaste contactbalk op mobiel; geen duplicatie op desktop.
  const bar=document.createElement('div');bar.className='mobile-contact-bar';bar.setAttribute('aria-label','Snel contact');
  bar.innerHTML='<a href="tel:+31612051430">Bel direct</a><a href="./contact.html">Offerte aanvragen</a>';
  document.body.append(bar);document.body.classList.add('has-mobile-contact');
  // Scroll-entree alleen op geschikte apparaten, met veilige fallback.
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce&&'IntersectionObserver'in window){
    const candidates=[...document.querySelectorAll('.section .card, .section .service-card, .section .prose, .section .sidebar, .section .project-card')].filter(el=>!el.closest('.process-showcase'));
    if(candidates.length){document.documentElement.classList.add('js-motion');
      const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.08,rootMargin:'0px 0px 60px 0px'});
      candidates.forEach(el=>{el.classList.add('motion-reveal');io.observe(el)});
    }
  }
  const root=document.querySelector('.process-showcase');if(!root)return;
  const data=[
    ['✉','Uw aanvraag',"Vertel ons wat er speelt. Foto's, locatie en eventuele rapporten helpen bij het bepalen van de volgende stap."],
    ['☑','Inventarisatie en voorbereiding','We bekijken welke onderzoeken, documenten, meldingen en veiligheidsmaatregelen nodig zijn.'],
    ['⚒','Zorgvuldige uitvoering','De werkzaamheden worden afgestemd op de situatie, de risicoklasse en de geldende eisen.'],
    ['✓','Controle en oplevering','Waar vereist vindt een onafhankelijke eindbeoordeling plaats. Daarna ontvangt u de relevante documenten.']
  ];
  const steps=[...root.querySelectorAll('[data-process-step]')],icon=root.querySelector('.process-art-icon'),title=root.querySelector('.process-heading'),copy=root.querySelector('.process-copy'),idx=root.querySelector('.process-index'),pause=root.querySelector('.process-pause');
  let current=0,paused=reduce||document.hidden,interval;
  const show=i=>{current=i;steps.forEach((s,n)=>{s.classList.toggle('is-current',n===i);if(n===i)s.setAttribute('aria-current','step');else s.removeAttribute('aria-current')});icon.textContent=data[i][0];title.textContent=data[i][1];copy.textContent=data[i][2];idx.textContent=String(i+1).padStart(2,'0');icon.style.animation='none';void icon.offsetWidth;icon.style.animation='';};
  const stop=()=>{if(interval){clearInterval(interval);interval=null}};
  const start=()=>{stop();if(paused||document.hidden)return;interval=setInterval(()=>show((current+1)%data.length),4400)};
  steps.forEach((button,i)=>button.addEventListener('click',()=>{show(i);start()}));
  pause.addEventListener('click',()=>{paused=!paused;pause.textContent=paused?'Start animatie':'Pauzeer animatie';pause.setAttribute('aria-pressed',String(paused));start()});
  if(paused){pause.textContent='Start animatie';pause.setAttribute('aria-pressed','true')}
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else start()});
  const observer=('IntersectionObserver'in window)?new IntersectionObserver(entries=>{if(entries[0].isIntersecting)start();else stop()},{threshold:0}):null;
  if(observer)observer.observe(root);else start();
})();
