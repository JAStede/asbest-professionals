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
