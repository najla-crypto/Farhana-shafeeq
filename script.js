
const audio = document.getElementById('weddingMusic');
const openButton = document.getElementById('openInvitation');
const musicToggle = document.getElementById('musicToggle');

// Start music after the visitor taps Open Invitation
async function startMusic() {
  try {
    await audio.play();
    musicToggle.classList.add('playing');
    musicToggle.textContent = '♫';
  } catch (error) {
    musicToggle.classList.remove('playing');
  }
}

openButton.addEventListener('click', async () => {
  await startMusic();
  document.querySelector('.intro').scrollIntoView({
    behavior: 'smooth'
  });
});

// Music play and pause button
musicToggle.addEventListener('click', async () => {
  if (audio.paused) {
    await startMusic();
  } else {
    audio.pause();
    musicToggle.classList.remove('playing');
  }
});

// Reveal each section as the visitor scrolls
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(section => {
  revealObserver.observe(section);
});

// Live wedding countdown
const target = new Date('2026-12-27T12:00:00+05:30').getTime();

function updateCountdown() {
  let remaining = Math.max(0, target - Date.now());

  const units = [
    ['days', 86400000],
    ['hours', 3600000],
    ['minutes', 60000],
    ['seconds', 1000]
  ];

  units.forEach(([id, size]) => {
    const value = Math.floor(remaining / size);
    document.getElementById(id).textContent =
      String(value).padStart(2, '0');
    remaining %= size;
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Floating golden petals
const petalLayer = document.querySelector('.petal-layer');

function makePetal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const petal = document.createElement('span');
  petal.className = 'petal';
  petal.style.left = Math.random() * 100 + 'vw';

  petal.style.setProperty(
    '--drift',
    (Math.random() * 160 - 80) + 'px'
  );

  petal.style.animationDuration =
    (8 + Math.random() * 8) + 's';

  petal.style.opacity =
    (0.25 + Math.random() * 0.45).toFixed(2);

  petalLayer.appendChild(petal);

  setTimeout(() => petal.remove(), 17000);
}

setInterval(makePetal, 850);
