const menuToggle=document.getElementById('menuToggle');
const mainNav=document.getElementById('mainNav');
menuToggle.addEventListener('click',()=>mainNav.classList.toggle('open'));
document.querySelectorAll('#mainNav a').forEach(link=>link.addEventListener('click',()=>mainNav.classList.remove('open')));
const lightbox=document.getElementById('lightbox');
const lightboxImage=document.getElementById('lightboxImage');
const closeLightbox=document.getElementById('closeLightbox');
document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{lightboxImage.src=item.dataset.full;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false')}));
function closeGallery(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImage.src=''}
closeLightbox.addEventListener('click',closeGallery);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeGallery()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeGallery()});
const tracks=[{name:'Música da campanha 1',src:'assets/audios/musica-1.mp3'},{name:'Música da campanha 2',src:'assets/audios/musica-2.mp3'}];
const audio=document.getElementById('campaignAudio'),playPause=document.getElementById('playPause'),trackName=document.getElementById('trackName'),progressBar=document.getElementById('progressBar'),playerClose=document.getElementById('playerClose'),campaignPlayer=document.getElementById('campaignPlayer');let currentTrack=0;
function loadTrack(index){currentTrack=index%tracks.length;audio.src=tracks[currentTrack].src;trackName.textContent=tracks[currentTrack].name;progressBar.style.width='0%'}
async function toggleAudio(){if(audio.paused){try{await audio.play();playPause.textContent='❚❚'}catch(e){console.warn(e)}}else{audio.pause();playPause.textContent='▶'}}
playPause.addEventListener('click',toggleAudio);audio.addEventListener('ended',async()=>{loadTrack(currentTrack+1);try{await audio.play();playPause.textContent='❚❚'}catch(e){playPause.textContent='▶'}});audio.addEventListener('timeupdate',()=>{if(audio.duration)progressBar.style.width=`${audio.currentTime/audio.duration*100}%`});audio.addEventListener('pause',()=>playPause.textContent='▶');playerClose.addEventListener('click',()=>{audio.pause();campaignPlayer.classList.add('hidden')});loadTrack(0);
