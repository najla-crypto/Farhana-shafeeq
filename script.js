const audio=document.getElementById('nasheed');
const enter=document.getElementById('enterButton');
const musicToggle=document.getElementById('musicToggle');
const musicLabel=document.getElementById('musicLabel');
const opening=document.querySelector('.opening');
let musicStarted=false;
function startExperience(){
  opening.classList.add('started');
  musicToggle.hidden=false;
  if(!musicStarted){audio.volume=.72;audio.play().then(()=>{musicStarted=true;musicToggle.classList.remove('paused');musicLabel.textContent='Music on'}).catch(()=>{musicToggle.classList.add('paused');musicLabel.textContent='Play music'});}
  document.querySelector('.intro').scrollIntoView({behavior:'smooth'});
}
enter.addEventListener('click',startExperience);
musicToggle.addEventListener('click',()=>{if(audio.paused){audio.play().then(()=>{musicToggle.classList.remove('paused');musicLabel.textContent='Music on'}).catch(()=>{});}else{audio.pause();musicToggle.classList.add('paused');musicLabel.textContent='Music off';}});
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.16});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
// Start the opening reveal on page load; later sections reveal only as they enter view.
window.addEventListener('load',()=>{setTimeout(()=>opening.classList.add('started'),180);});
// A restrained number of tiny gold petals drift across the page.
const field=document.querySelector('.petal-field');
for(let i=0;i<13;i++){const p=document.createElement('span');p.className='petal';p.style.left=(Math.random()*100)+'%';p.style.animationDuration=(13+Math.random()*15)+'s';p.style.animationDelay=(-Math.random()*24)+'s';p.style.opacity=(.22+Math.random()*.32).toFixed(2);p.style.transform=`scale(${.55+Math.random()*.8})`;field.appendChild(p);}
// Countdown uses Kochi local time (India Standard Time, UTC+05:30).
const target=new Date('2026-12-27T12:00:00+05:30').getTime();
function updateCountdown(){let diff=Math.max(0,target-Date.now());const d=Math.floor(diff/86400000);diff%=86400000;const h=Math.floor(diff/3600000);diff%=3600000;const m=Math.floor(diff/60000);const s=Math.floor((diff%60000)/1000);document.getElementById('days').textContent=String(d).padStart(3,'0');document.getElementById('hours').textContent=String(h).padStart(2,'0');document.getElementById('minutes').textContent=String(m).padStart(2,'0');document.getElementById('seconds').textContent=String(s).padStart(2,'0');}
updateCountdown();setInterval(updateCountdown,1000);
