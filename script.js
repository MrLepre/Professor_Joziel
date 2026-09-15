const menuToggle=document.getElementById('menuToggle');
const mainNav=document.getElementById('mainNav');
menuToggle?.addEventListener('click',()=>{mainNav?.classList.toggle('open');menuToggle.classList.toggle('active')});
document.querySelectorAll('#mainNav a').forEach(link=>link.addEventListener('click',()=>{mainNav.classList.remove('open');menuToggle.classList.remove('active')}));

const lightbox=document.getElementById('lightbox');
const lightboxImage=document.getElementById('lightboxImage');
const closeLightbox=document.getElementById('closeLightbox');
document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{lightboxImage.src=item.dataset.full;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}));
function closeGallery(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImage.src='';document.body.style.overflow=''}
closeLightbox?.addEventListener('click',closeGallery);lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeGallery()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeGallery()});

const topbar=document.querySelector('.topbar');
const heroImage=document.querySelector('.hero-image');
const scrollProgress=document.getElementById('scrollProgress');
const cursorGlow=document.getElementById('cursorGlow');
const navLinks=[...document.querySelectorAll('#mainNav a[href^="#"]')];
function onScroll(){
  const y=window.scrollY; topbar?.classList.toggle('scrolled',y>45);
  const max=document.documentElement.scrollHeight-window.innerHeight; if(scrollProgress)scrollProgress.style.width=(max?Math.min(100,y/max*100):0)+'%';
  if(heroImage && window.innerWidth>820) heroImage.style.transform=`translateY(${y*0.08}px) scale(1.05)`;
}
window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
window.addEventListener('pointermove',e=>{if(!cursorGlow)return;cursorGlow.style.left=e.clientX+'px';cursorGlow.style.top=e.clientY+'px';cursorGlow.style.opacity='1'});window.addEventListener('pointerleave',()=>{if(cursorGlow)cursorGlow.style.opacity='0'});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.16});
document.querySelectorAll('.reveal,.reveal-stagger').forEach(el=>observer.observe(el));

const counters=document.querySelectorAll('[data-counter]');
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;const end=Number(el.dataset.counter);const start=0;const duration=1300;const startTime=performance.now();function tick(now){const p=Math.min(1,(now-startTime)/duration);const eased=1-Math.pow(1-p,3);el.textContent=Math.round(start+(end-start)*eased).toLocaleString('pt-BR');if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);counterObserver.unobserve(el)}),{threshold:.8});counters.forEach(el=>counterObserver.observe(el));

const sections=[...document.querySelectorAll('main section[id]')];
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id))}),{rootMargin:'-30% 0px -55% 0px'});sections.forEach(s=>sectionObserver.observe(s));

const tracks=[{name:'Música da campanha 1',src:'assets/audios/musica-1.mp3'},{name:'Música da campanha 2',src:'assets/audios/musica-2.mp3'}];
const audio=document.getElementById('campaignAudio'),playPause=document.getElementById('playPause'),trackName=document.getElementById('trackName'),progressBar=document.getElementById('progressBar'),playerClose=document.getElementById('playerClose'),campaignPlayer=document.getElementById('campaignPlayer');let currentTrack=0;
function loadTrack(index){currentTrack=index%tracks.length;audio.src=tracks[currentTrack].src;trackName.textContent=tracks[currentTrack].name;progressBar.style.width='0%'}
async function toggleAudio(){if(audio.paused){try{await audio.play();playPause.textContent='❚❚'}catch(e){console.warn(e)}}else{audio.pause();playPause.textContent='▶'}}
playPause?.addEventListener('click',toggleAudio);
audio?.addEventListener('ended',async()=>{loadTrack(currentTrack+1);try{await audio.play();playPause.textContent='❚❚'}catch(e){playPause.textContent='▶'}});
audio?.addEventListener('timeupdate',()=>{if(audio.duration)progressBar.style.width=`${audio.currentTime/audio.duration*100}%`});
audio?.addEventListener('pause',()=>playPause.textContent='▶');playerClose?.addEventListener('click',()=>{audio.pause();campaignPlayer.classList.add('hidden')});loadTrack(0);

window.addEventListener('load',()=>{if(window.instgrm)window.instgrm.Embeds.process()});

// V7 signature interactions: subtle, responsive, and disabled for reduced-motion.
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const cards = [...document.querySelectorAll('.tilt-grid .feature-card')];
  cards.forEach(card => {
    card.addEventListener('pointermove', e => {
      if (window.innerWidth < 900) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-y*3.2).toFixed(2)}deg) rotateY(${(x*4).toFixed(2)}deg) translateY(-8px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

  document.querySelectorAll('.hero-button, .button.primary, .nav-whatsapp').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      if (window.innerWidth < 900) return;
      const r = btn.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width/2);
      const y = e.clientY - (r.top + r.height/2);
      btn.style.transform = `translate(${x*.05}px,${y*.05}px)`;
    });
    btn.addEventListener('pointerleave', () => btn.style.transform = '');
  });

  const hero = document.querySelector('.hero');
  const seal = document.querySelector('.hero-seal');
  hero?.addEventListener('pointermove', e => {
    if (!seal || window.innerWidth < 900) return;
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - .5;
    const y = (e.clientY - r.top)/r.height - .5;
    seal.style.transform = `translate(${x*6}px,${y*6}px) rotate(${(-7+x*4).toFixed(2)}deg)`;
  });
  hero?.addEventListener('pointerleave', () => { if (seal) seal.style.transform = ''; });

  // Add a tiny active-section accent to the progress line.
  const updateBodyScroll = () => document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
  window.addEventListener('scroll', updateBodyScroll, {passive:true});
  updateBodyScroll();
})();
