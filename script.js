/* ============================================= */
/* CONFIGURACIÓN                                 */
/* ============================================= */
const STORY_LINE_DURATION = 1.6;
const FINAL_LINE_DURATION = 1.8;

/* ============================================= */
/* REFERENCIAS                                   */
/* ============================================= */
const cakeScreen     = document.getElementById('cakeScreen');
const cakeScene      = document.getElementById('cakeScene');
const cakeEl         = document.getElementById('cake');
const startBtn       = document.getElementById('startBtn');
const introLine1     = document.getElementById('introLine1');
const introLine2     = document.getElementById('introLine2');
const bgMusic        = document.getElementById('bgMusic');
const musicToggle    = document.getElementById('musicToggle');
const flame          = document.getElementById('flame');
const flameGlow      = document.getElementById('flameGlow');
const candleWick     = document.getElementById('candleWick');
const smoke          = document.getElementById('smoke');
const spark          = document.getElementById('spark');
const sparkTrail     = document.getElementById('sparkTrail');
const mainExperience = document.getElementById('mainExperience');
const lastHeart      = document.getElementById('lastHeart');
const fadeToDark     = document.getElementById('fadeToDark');

const bgGradient  = document.getElementById('bgGradient');
const bgNebula    = document.getElementById('bgNebula');
const bgBokeh     = document.getElementById('bgBokeh');
const bgStars     = document.getElementById('bgStars');
const bgParticles = document.getElementById('bgParticles');
const bgSparkles  = document.getElementById('bgSparkles');
const bgHearts    = document.getElementById('bgHearts');
const bgShooting  = document.getElementById('bgShooting');

/* ============================================= */
/* ESTADO                                        */
/* ============================================= */
let isMusicPlaying = false;
let isStarted = false;
let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 🎵 PLAYLIST: 2 canciones
let currentTrackIndex = 0;
const playlistTracks = Array.from(document.querySelectorAll('#playlist span'))
  .map(el => el.dataset.src);

const IS_MOBILE = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
const COUNT = {
  stars:     IS_MOBILE ? 90  : 180,
  bokeh:     IS_MOBILE ? 6   : 10,
  particles: IS_MOBILE ? 18  : 35,
  sparkles:  IS_MOBILE ? 10  : 20,
  hearts:    IS_MOBILE ? 8   : 14,
  nebulas:   4
};

/* ============================================= */
/* 1. CONSTRUIR CAPAS DEL FONDO                  */
/* ============================================= */
function buildNebulas() {
  for (let i = 1; i <= COUNT.nebulas; i++) {
    const n = document.createElement('div');
    n.className = `nebula nebula-${i}`;
    bgNebula.appendChild(n);
  }
}

function buildBokeh() {
  const colors = ['#b873a8', '#7a5cc7', '#4a5fa8', '#d4a3c2', '#8a6bd4', '#5c4ba8'];
  for (let i = 0; i < COUNT.bokeh; i++) {
    const d = document.createElement('div');
    d.className = 'bokeh';
    d.style.left = Math.random() * 100 + '%';
    d.style.top  = Math.random() * 100 + '%';
    d.style.width  = (120 + Math.random() * 160) + 'px';
    d.style.height = d.style.width;
    d.style.background = colors[i % colors.length];
    d.style.opacity = 0.15 + Math.random() * 0.25;
    bgBokeh.appendChild(d);
  }
}

function buildStars() {
  const types = ['tiny', 'small', 'small', 'medium', 'medium', 'bright'];
  for (let i = 0; i < COUNT.stars; i++) {
    const s = document.createElement('span');
    let type = types[Math.floor(Math.random() * types.length)];
    if (Math.random() < 0.2) type = Math.random() < 0.5 ? 'gold' : 'pink';
    s.className = `star ${type}`;
    s.style.left = Math.random() * 100 + '%';
    s.style.top  = Math.random() * 100 + '%';
    s.dataset.type = type;
    bgStars.appendChild(s);
  }
}

function buildParticles() {
  const colors = ['white', 'gold', 'pink', 'violet', 'blue'];
  for (let i = 0; i < COUNT.particles; i++) {
    const p = document.createElement('span');
    p.className = `particle ${colors[Math.floor(Math.random() * colors.length)]}`;
    const size = (2 + Math.random() * 3).toFixed(1);
    p.style.width  = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.top  = Math.random() * 100 + '%';
    bgParticles.appendChild(p);
  }
}

function buildSparkles() {
  const symbols = ['✦', '✧', '⋆'];
  for (let i = 0; i < COUNT.sparkles; i++) {
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    s.style.left = Math.random() * 100 + '%';
    s.style.top  = Math.random() * 100 + '%';
    s.style.fontSize = (6 + Math.random() * 10) + 'px';
    bgSparkles.appendChild(s);
  }
}

function buildHearts() {
  for (let i = 0; i < COUNT.hearts; i++) {
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = Math.random() < 0.7 ? '♥' : '♡';
    h.style.left = Math.random() * 90 + 5 + '%';
    h.style.bottom = '-30px';
    h.style.fontSize = (10 + Math.random() * 12) + 'px';
    bgHearts.appendChild(h);
  }
}

/* ============================================= */
/* 2. ANIMACIONES DEL FONDO                      */
/* ============================================= */
function animateBackground() {
  if (reducedMotion) return;

  gsap.to(bgGradient, {
    backgroundPosition: '100% 100%, 0% 0%, 50% 50%',
    duration: 35, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });

  document.querySelectorAll('.bg-nebula .nebula').forEach((n, i) => {
    gsap.to(n, {
      x: gsap.utils.random(-140, 140), y: gsap.utils.random(-100, 100),
      scale: gsap.utils.random(0.85, 1.35),
      duration: gsap.utils.random(20, 40),
      repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 2
    });
    gsap.to(n, {
      opacity: gsap.utils.random(0.25, 0.7),
      duration: gsap.utils.random(8, 16),
      repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 1.5
    });
  });

  document.querySelectorAll('.bg-bokeh .bokeh').forEach((b, i) => {
    gsap.to(b, {
      x: gsap.utils.random(-120, 120), y: gsap.utils.random(-90, 90),
      scale: gsap.utils.random(0.7, 1.4),
      duration: gsap.utils.random(12, 24),
      repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.6
    });
    gsap.to(b, {
      opacity: gsap.utils.random(0.1, 0.45),
      duration: gsap.utils.random(5, 11),
      repeat: -1, yoyo: true, ease: 'sine.inOut', delay: Math.random() * 4
    });
  });

  document.querySelectorAll('.bg-stars .star').forEach((s) => {
    const type = s.dataset.type;

    gsap.to(s, {
      opacity: Math.random() * 0.85 + 0.15,
      duration: 1 + Math.random() * 3,
      repeat: -1, yoyo: true, ease: 'sine.inOut',
      delay: Math.random() * 4
    });

    if (type === 'bright' || type === 'gold' || type === 'pink' || type === 'medium') {
      gsap.to(s, {
        scale: 0.5 + Math.random() * 1.5,
        duration: 1.5 + Math.random() * 4,
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        delay: Math.random() * 5
      });
    }

    if (Math.random() < 0.5) {
      gsap.to(s, {
        x: gsap.utils.random(-30, 30), y: gsap.utils.random(-30, 30),
        duration: gsap.utils.random(15, 35),
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        delay: Math.random() * 6
      });
    }
  });

  document.querySelectorAll('.bg-particles .particle').forEach((p) => {
    const dirX = Math.random() < 0.5 ? -1 : 1;
    const dirY = Math.random() < 0.5 ? -1 : 1;
    gsap.to(p, {
      x: dirX * gsap.utils.random(80, 200),
      y: dirY * gsap.utils.random(100, 240),
      duration: gsap.utils.random(18, 38),
      repeat: -1, yoyo: true, ease: 'sine.inOut',
      delay: Math.random() * 5
    });
    gsap.to(p, {
      opacity: gsap.utils.random(0.15, 1),
      duration: gsap.utils.random(2, 7),
      repeat: -1, yoyo: true, ease: 'sine.inOut',
      delay: Math.random() * 4
    });
  });

  document.querySelectorAll('.bg-sparkles .sparkle').forEach((s) => {
    gsap.fromTo(s,
      { opacity: 0, scale: 0.5 },
      {
        opacity: gsap.utils.random(0.5, 1),
        scale: gsap.utils.random(0.9, 1.6),
        duration: gsap.utils.random(1, 2.5),
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        delay: Math.random() * 8
      }
    );
  });

  document.querySelectorAll('.bg-hearts .heart').forEach((h, i) => {
    animateHeart(h, i);
  });

  scheduleShootingStar();
}

function animateHeart(el, index) {
  const startX = 5 + Math.random() * 90;
  const duration = 12 + Math.random() * 10;
  const delay = index * 1.5 + Math.random() * 4;

  gsap.set(el, { left: startX + '%', bottom: '-30px' });

  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: Math.random() * 6 + 3,
    delay: delay
  });

  tl.fromTo(el,
    { opacity: 0, y: 0, x: 0, rotate: -15, scale: 0.7 },
    { opacity: 0.5 + Math.random() * 0.4, duration: duration * 0.2, ease: 'power1.out' }
  )
  .to(el, {
    y: -window.innerHeight - 100,
    x: -30 + Math.random() * 60,
    rotation: -25 + Math.random() * 50,
    scale: 1 + Math.random() * 0.3,
    duration: duration * 0.8, ease: 'none'
  })
  .to(el, { opacity: 0, duration: duration * 0.15, ease: 'power1.in' }, '-=1.5');
}

function scheduleShootingStar() {
  if (reducedMotion) return;
  setTimeout(() => {
    spawnShootingStar();
    scheduleShootingStar();
  }, 4000 + Math.random() * 4000);
}

function spawnShootingStar() {
  const s = document.createElement('div');
  s.className = 'shooting';
  s.style.left = (20 + Math.random() * 70) + '%';
  s.style.top  = (-5 + Math.random() * 30) + '%';
  bgShooting.appendChild(s);

  const travelX = -40 + Math.random() * -30;
  const travelY = 20 + Math.random() * 30;

  gsap.set(s, { opacity: 0, x: 0, y: 0, scaleX: 0.4 });

  const tl = gsap.timeline({ onComplete: () => s.remove() });
  tl.to(s, { opacity: 1, scaleX: 1, duration: 0.4, ease: 'power2.out' })
    .to(s, {
      x: `${travelX}vw`, y: `${travelY}vh`,
      duration: 1.2 + Math.random() * 0.8, ease: 'power2.in'
    }, '-=0.2')
    .to(s, { opacity: 0, duration: 0.6, ease: 'power2.in' }, '-=0.5');
}

/* ============================================= */
/* 3. PARALLAX CON MOUSE                         */
/* ============================================= */
function initParallax() {
  if (reducedMotion || IS_MOBILE) return;

  let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
  });

  function raf() {
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;
    gsap.set(bgNebula,    { x: targetX * -10, y: targetY * -10 });
    gsap.set(bgBokeh,     { x: targetX * -18, y: targetY * -18 });
    gsap.set(bgStars,     { x: targetX * 10,  y: targetY * 10 });
    gsap.set(bgParticles, { x: targetX * 22,  y: targetY * 22 });
    gsap.set(bgSparkles,  { x: targetX * 16,  y: targetY * 16 });
    gsap.set(bgHearts,    { x: targetX * 28,  y: targetY * 28 });
    requestAnimationFrame(raf);
  }
  raf();
}

/* ============================================= */
/* 4. 🎵 PLAYLIST: CARGAR Y REPRODUCIR           */
/* ============================================= */
function loadTrack(index) {
  if (!playlistTracks[index]) return;
  bgMusic.src = playlistTracks[index];
  bgMusic.load();
  bgMusic.play().then(() => {
    isMusicPlaying = true;
    musicToggle.textContent = '♫';
  }).catch(() => {
    isMusicPlaying = false;
    musicToggle.textContent = '×';
  });
  currentTrackIndex = index;
  console.log(`🎵 Reproduciendo canción ${index + 1} de ${playlistTracks.length}`);
}

// Cuando termina una canción, pasa a la siguiente (bucle infinito)
bgMusic.addEventListener('ended', () => {
  const next = (currentTrackIndex + 1) % playlistTracks.length;
  loadTrack(next);
});

// Si hay error de carga, salta a la siguiente
bgMusic.addEventListener('error', () => {
  console.warn('Error al cargar canción, saltando a la siguiente...');
  const next = (currentTrackIndex + 1) % playlistTracks.length;
  setTimeout(() => loadTrack(next), 500);
});

/* ============================================= */
/* 5. CHISPA MÁGICA → ENCENDER VELA              */
/* ============================================= */
function startSparkJourney() {
  const startX = -120;
  const startY = 80;

  gsap.set(spark, { x: startX, y: startY, scale: 0, opacity: 0 });
  gsap.set(sparkTrail, { width: 0, opacity: 0 });

  const tl = gsap.timeline({ onComplete: () => igniteCandle() });

  tl.to(spark, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' });
  tl.to(sparkTrail, { width: 22, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3');

  tl.to(spark, {
    duration: 2.6, ease: 'power2.inOut',
    keyframes: [
      { x: -48, y: 48,   duration: 0.5, ease: 'sine.inOut' },
      { x: -60, y: -40,  duration: 0.5, ease: 'sine.inOut' },
      { x: 30,  y: -140, duration: 0.6, ease: 'sine.inOut' },
      { x: -15, y: -220, duration: 0.5, ease: 'sine.inOut' },
      { x: 0,   y: -260, duration: 0.5, ease: 'power2.out' }
    ]
  });

  tl.to(spark, { scale: 1.4, duration: 0.35, ease: 'power2.out' });
  tl.to(spark, { scale: 0.4, opacity: 0, duration: 0.35, ease: 'power2.in' });
  tl.to(sparkTrail, { opacity: 0, width: 0, duration: 0.3 }, '-=0.3');
}

/* ============================================= */
/* 6. ENCENDER LA VELA                           */
/* ============================================= */
function igniteCandle() {
  candleWick.classList.add('lit');

  const flash = document.createElement('div');
  flash.className = 'candle-flash';
  cakeEl.appendChild(flash);

  gsap.to(flash, {
    opacity: 1, scale: 1.4, duration: 0.35, ease: 'power2.out',
    onComplete: () => {
      gsap.to(flash, {
        opacity: 0, scale: 1.9, duration: 0.7, ease: 'power2.in',
        onComplete: () => flash.remove()
      });
    }
  });

  gsap.set(flame, { opacity: 0, scale: 0.15 });

  const tl = gsap.timeline({ delay: 0.15 });
  tl.to(flame, { opacity: 1, scale: 0.35, duration: 0.45, ease: 'power2.out' });
  tl.to(flame, { scale: 0.6, duration: 0.5, ease: 'power2.out' });
  tl.to(flame, { scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.55)' });
  tl.to(flameGlow, { opacity: 1, scale: 1, duration: 1.3, ease: 'power2.out' }, '-=0.9');
  tl.to(cakeEl, {
    filter: 'drop-shadow(0 0 34px rgba(255, 170, 90, 0.28))',
    duration: 1.6, ease: 'power2.out'
  }, '-=1.3');
  tl.call(() => startFlameLoop());
  tl.call(() => revealIntroTexts(), null, '+=1.5');
  tl.call(() => revealButton(), null, '+=1.4');
}

/* ============================================= */
/* 7. LOOP DE LA LLAMA                           */
/* ============================================= */
function startFlameLoop() {
  if (reducedMotion) return;
  gsap.to(flame, { scaleX: 1.08, duration: 0.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to(flame, { scaleY: 1.12, duration: 0.85, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to(flame, { rotate: 3, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: 'center bottom' });
  gsap.to(flameGlow, { scale: 1.15, opacity: 0.85, duration: 1.7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
}

/* ============================================= */
/* 8. MOSTRAR TEXTOS Y BOTÓN                     */
/* ============================================= */
function revealIntroTexts() {
  const tl = gsap.timeline();
  tl.to(introLine1, { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' })
    .to(introLine2, { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' }, '-=0.7');
}

function revealButton() {
  gsap.to(startBtn, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' });
}

/* ============================================= */
/* 9. BOTÓN COMENZAR                             */
/* ============================================= */
function startExperience() {
  if (isStarted) return;
  isStarted = true;

  // 🎵 Iniciar la PRIMERA canción de la playlist
  bgMusic.volume = 0.4;
  loadTrack(0);

  const tl = gsap.timeline({
    onComplete: () => {
      cakeScreen.classList.add('hidden');
      revealHistory();
    }
  });

  tl.to([startBtn, introLine1, introLine2], {
    opacity: 0, y: -10, duration: 0.6, stagger: 0.08, ease: 'power2.in'
  });
  tl.to(cakeScene, { scale: 1.25, duration: 2.2, ease: 'power2.inOut' }, '-=0.2');
  tl.to(flame, { scale: 0.6, duration: 0.4, ease: 'power2.in' });
  tl.to(flame, { scaleX: 0.5, scaleY: 0.9, duration: 0.15, repeat: 3, yoyo: true, ease: 'sine.inOut' });
  tl.to(flame, { scale: 0, opacity: 0, duration: 0.4, ease: 'power2.in' });
  tl.to(flameGlow, { opacity: 0, scale: 0.4, duration: 0.6, ease: 'power2.in' }, '<');
  tl.call(() => candleWick.classList.remove('lit'));

  tl.call(() => {
    smoke.style.opacity = '1';
    const parts = smoke.querySelectorAll('span');
    parts.forEach((p, i) => {
      gsap.fromTo(p,
        { opacity: 0, y: 0, x: 0, scale: 0.4 },
        {
          opacity: 0.75, y: -140 - i * 22, x: gsap.utils.random(-35, 35),
          scale: 1.6 + i * 0.16, rotate: gsap.utils.random(-28, 28),
          duration: 2.6 + i * 0.3, ease: 'power1.out', delay: i * 0.16
        }
      );
      gsap.to(p, { opacity: 0, duration: 2.2, delay: 1.8 + i * 0.16, ease: 'power1.in' });
    });
  });

  tl.to(cakeScreen, {
    backgroundColor: 'rgba(5,3,15,1)',
    duration: 2.4, ease: 'power2.inOut'
  }, '-=1.2');
  tl.to(cakeScreen, { opacity: 0, duration: 1.2, ease: 'power2.inOut' }, '-=0.6');
}

/* ============================================= */
/* 10. REVELAR HISTORIA                          */
/* ============================================= */
function revealHistory() {
  mainExperience.classList.add('visible');

  try {
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  } catch (e) { console.warn('ScrollTrigger no disponible:', e); }

  try {
    const storyLines = document.querySelectorAll('.story-line');
    gsap.set(storyLines, { opacity: 0, y: 30, filter: 'blur(8px)' });

    const storyTl = gsap.timeline({ delay: 0.4 });
    storyLines.forEach((line, i) => {
      storyTl.to(line, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: STORY_LINE_DURATION, ease: 'power2.out'
      }, i === 0 ? 0 : `-=${STORY_LINE_DURATION - 0.6}`);
    });
  } catch (e) {
    document.querySelectorAll('.story-line').forEach(l => {
      l.style.opacity = '1';
      l.style.filter = 'none';
    });
  }

  try {
    setupScrollAnimations();
  } catch (e) {
    console.warn('Error en setupScrollAnimations:', e);
    document.querySelectorAll(
      '.memory-media, .memory-text, .pause-line, .future-line, ' +
      '.final-pause-line, .promise-line, .meaning-line, .letter-intro, ' +
      '.letter-p, .personal-message-text, .final-line'
    ).forEach(el => {
      el.style.opacity = '1';
      el.style.filter = 'none';
      el.style.transform = 'none';
    });
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================= */
/* 11. SCROLLTRIGGER                             */
/* ============================================= */
function setupScrollAnimations() {
  if (!window.ScrollTrigger) {
    document.querySelectorAll(
      '.memory-media, .memory-text, .pause-line, .future-line, ' +
      '.final-pause-line, .promise-line, .meaning-line, .letter-intro, ' +
      '.letter-p, .personal-message-text, .final-line'
    ).forEach(el => {
      el.style.opacity = '1';
      el.style.filter = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // MEMORIAS
  document.querySelectorAll('.memory-section').forEach(section => {
    const media = section.querySelector('.memory-media');
    const video = section.querySelector('video');
    const texts = section.querySelectorAll('.memory-text');
    const anim  = media.dataset.anim || 'fade-scale';

    switch (anim) {
      case 'fade-scale':      gsap.set(media, { opacity: 0, scale: 0.92, filter: 'blur(8px)' }); break;
      case 'slide-left':      gsap.set(media, { opacity: 0, x: -80, filter: 'blur(10px)' }); break;
      case 'rise-rotate':     gsap.set(media, { opacity: 0, y: 80, scale: 0.94, rotate: -3 }); break;
      case 'video-cinematic': gsap.set(media, { opacity: 0, scale: 0.92, filter: 'blur(14px)' }); break;
      case 'parallax-rotate': gsap.set(media, { opacity: 0, x: 80, rotate: 3, filter: 'blur(8px)' }); break;
      case 'video-rise':      gsap.set(media, { opacity: 0, y: 60, scale: 0.95 }); break;
      case 'cinematic-zoom':  gsap.set(media, { opacity: 0, scale: 1.15 }); break;
      case 'final-zoom':      gsap.set(media, { opacity: 0, scale: 1.2 }); break;
    }

    gsap.set(texts, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    switch (anim) {
      case 'fade-scale':      tl.to(media, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.8, ease: 'power2.out' }); break;
      case 'slide-left':      tl.to(media, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.8, ease: 'power3.out' }); break;
      case 'rise-rotate':     tl.to(media, { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 1.8, ease: 'power3.out' }); break;
      case 'video-cinematic': tl.to(media, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2, ease: 'power2.out' }); break;
      case 'parallax-rotate': tl.to(media, { opacity: 1, x: 0, rotate: 0, filter: 'blur(0px)', duration: 1.8, ease: 'power3.out' }); break;
      case 'video-rise':      tl.to(media, { opacity: 1, y: 0, scale: 1, duration: 1.6, ease: 'power3.out' }); break;
      case 'cinematic-zoom':
        tl.to(media, { opacity: 1, scale: 1, duration: 2.5, ease: 'power2.out' });
        tl.to(media, { scale: 1.06, duration: 8, ease: 'sine.inOut' });
        break;
      case 'final-zoom':
        tl.to(media, { opacity: 1, scale: 1, duration: 3, ease: 'power2.out' });
        tl.to(media, { scale: 1.05, duration: 10, ease: 'sine.inOut' });
        break;
    }

    texts.forEach((t, i) => {
      tl.to(t, { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out' }, `-=${1.3 - i * 0.2}`);
    });

    if (video) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        onEnter: () => video.play().catch(() => {}),
        onLeave: () => video.pause(),
        onEnterBack: () => video.play().catch(() => {})
      });
    }
  });

  animateStaggered('.pause-line');
  animateStaggered('.future-line');
  animateStaggered('.final-pause-line');
  animateStaggered('.promise-line');
  animateStaggered('.meaning-line');

  // CARTA + MENSAJE PERSONAL
  const letterIntro = document.querySelector('.letter-intro');
  const letterParagraphs = document.querySelectorAll('.letter-p');
  const personalParagraphs = document.querySelectorAll('.personal-message-text');

  if (letterIntro) gsap.set(letterIntro, { opacity: 0, y: 30, filter: 'blur(8px)' });
  gsap.set(letterParagraphs, { opacity: 0, y: 30, filter: 'blur(6px)' });
  gsap.set(personalParagraphs, { opacity: 0, y: 25, filter: 'blur(6px)' });

  const letterTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#letterSection',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    }
  });

  if (letterIntro) {
    letterTl.to(letterIntro, {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 1.8, ease: 'power2.out'
    });
  }

  letterParagraphs.forEach(p => {
    letterTl.to(p, {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 1.5, ease: 'power2.out'
    }, '-=1.15');
  });

  personalParagraphs.forEach((p) => {
    letterTl.to(p, {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 1.6, ease: 'power2.out'
    }, '-=1.1');
  });

  // FINAL
  const finalLines = document.querySelectorAll('.final-line');
  gsap.set(finalLines, { opacity: 0, y: 30 });

  const finalTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#finalSection',
      start: 'top 65%',
      toggleActions: 'play none none reverse',
      onEnter: () => animateFloatingMemories(),
      onEnterBack: () => animateFloatingMemories()
    }
  });

  finalLines.forEach((line, i) => {
    finalTl.to(line, {
      opacity: 1, y: 0, duration: FINAL_LINE_DURATION, ease: 'power2.out'
    }, i === 0 ? 0 : '-=1.2');
  });

  ScrollTrigger.create({
    trigger: '#finalSection',
    start: 'bottom 80%',
    onEnter: () => {
      if (lastHeart) {
        gsap.to(lastHeart, {
          opacity: 0.9, y: -window.innerHeight * 0.6, scale: 1.4,
          duration: 7, ease: 'power1.inOut'
        });
        gsap.to(lastHeart, { opacity: 0, duration: 3, delay: 4.5, ease: 'power2.in' });
      }
      if (fadeToDark) {
        gsap.to(fadeToDark, { opacity: 0.85, duration: 4, delay: 8, ease: 'power2.inOut' });
      }
    }
  });
}

function animateStaggered(selector) {
  const lines = document.querySelectorAll(selector);
  lines.forEach((line, i) => {
    gsap.from(line, {
      scrollTrigger: {
        trigger: line,
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0, y: 40, filter: 'blur(8px)',
      duration: 1.8, delay: i * 0.15, ease: 'power2.out'
    });
  });
}

/* ============================================= */
/* 12. RECUERDOS FLOTANTES                       */
/* ============================================= */
function animateFloatingMemories() {
  const container = document.getElementById('floatingMemories');
  if (!container || container.dataset.done === '1') return;
  container.dataset.done = '1';

  const photos = [
    'assets/photos/foto01.jpg', 'assets/photos/foto02.jpg',
    'assets/photos/foto03.jpg', 'assets/photos/foto04.jpg',
    'assets/photos/foto05.jpg', 'assets/photos/foto06.jpg'
  ];
  const positions = [
    { top: '12%', left: '6%', scale: 1 },
    { top: '22%', left: '72%', scale: 0.85 },
    { top: '55%', left: '4%', scale: 0.95 },
    { top: '68%', left: '78%', scale: 0.8 },
    { top: '82%', left: '18%', scale: 1.05 },
    { top: '38%', left: '44%', scale: 0.9 }
  ];

  photos.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.style.top = positions[i].top;
    img.style.left = positions[i].left;
    container.appendChild(img);

    if (reducedMotion) { gsap.set(img, { opacity: 0.35 }); return; }

    gsap.set(img, { opacity: 0, scale: 0.5 * positions[i].scale, rotate: gsap.utils.random(-10, 10), filter: 'blur(6px)' });
    gsap.to(img, { opacity: 0.7, scale: positions[i].scale, filter: 'blur(0px)', duration: 3.5, delay: i * 0.5, ease: 'power2.out' });
    gsap.to(img, {
      y: gsap.utils.random(-40, 40), x: gsap.utils.random(-30, 30),
      rotate: gsap.utils.random(-8, 8),
      duration: gsap.utils.random(10, 18),
      repeat: -1, yoyo: true, ease: 'sine.inOut',
      delay: i * 0.6
    });
  });
}

/* ============================================= */
/* 13. PARTÍCULAS FINALES                        */
/* ============================================= */
function buildFinalParticles() {
  const container = document.getElementById('finalParticles');
  if (!container) return;
  const symbols = ['✦', '✧', '·', '⋆', '♥'];
  for (let i = 0; i < 22; i++) {
    const s = document.createElement('span');
    s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    s.style.left = Math.random() * 100 + '%';
    s.style.bottom = '-10%';
    s.style.fontSize = (0.6 + Math.random() * 1).toFixed(2) + 'rem';
    s.style.opacity = (0.25 + Math.random() * 0.45).toFixed(2);
    container.appendChild(s);

    if (!reducedMotion) {
      gsap.fromTo(s,
        { y: 0, opacity: 0 },
        {
          y: -window.innerHeight - 100,
          opacity: s.style.opacity,
          rotate: gsap.utils.random(-25, 25),
          duration: gsap.utils.random(12, 22),
          repeat: -1, ease: 'none',
          delay: Math.random() * 12
        }
      );
    }
  }
}

/* ============================================= */
/* 14. MÚSICA — BOTÓN TOGGLE                     */
/* ============================================= */
function toggleMusic() {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggle.textContent = '×';
    isMusicPlaying = false;
  } else {
    bgMusic.play().catch(() => {});
    musicToggle.textContent = '♫';
    isMusicPlaying = true;
  }
}

/* ============================================= */
/* 15. EVENT LISTENERS                           */
/* ============================================= */
startBtn.addEventListener('click', startExperience);
musicToggle.addEventListener('click', toggleMusic);

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (isMusicPlaying) bgMusic.pause();
  } else {
    if (isMusicPlaying) bgMusic.play().catch(() => {});
  }
});

/* ============================================= */
/* 16. INICIALIZACIÓN                            */
/* ============================================= */
(function init() {
  buildNebulas();
  buildBokeh();
  buildStars();
  buildParticles();
  buildSparkles();
  buildHearts();
  buildFinalParticles();

  animateBackground();
  initParallax();

  document.querySelectorAll('video').forEach(v => {
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
  });

  gsap.set(flame, { opacity: 0, scale: 0 });
  gsap.set(flameGlow, { opacity: 0, scale: 0 });
  gsap.set(introLine1, { opacity: 0, y: 15 });
  gsap.set(introLine2, { opacity: 0, y: 15 });
  gsap.set(startBtn, { opacity: 0, y: 15 });

  setTimeout(() => {
    startSparkJourney();
  }, 1500);

  console.log('🎂 Fondo animado + chispa mágica listos');
})();