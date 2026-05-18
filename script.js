/* ============================================================
   script.js — All interactivity for "For Isha, Always"
   ============================================================ */

/* ── Custom cursor ───────────────────────────────────────── */
const cursorGlow = document.getElementById('cursorGlow');
const dot = document.createElement('div');
dot.className = 'cursor-dot';
document.body.appendChild(dot);

let mx = 0, my = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
  cursorGlow.style.left = mx + 'px';
  cursorGlow.style.top  = my + 'px';
});

/* ── Parallax hero background on mouse move ──────────────── */
const heroBg = document.querySelector('.hero-bg');
document.addEventListener('mousemove', e => {
  if (!heroBg) return;
  const xPct = (e.clientX / window.innerWidth  - 0.5) * 6;
  const yPct = (e.clientY / window.innerHeight - 0.5) * 6;
  heroBg.style.transform = `scale(1.06) translate(${xPct}px, ${yPct}px)`;
});

/* ── Particle canvas ─────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Create particles with randomised properties
  function makeParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      vy: -(Math.random() * 0.35 + 0.1),     // drift upward
      vx: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.45 + 0.05,
      // warm amber or rose tint
      hue: Math.random() > 0.6 ? 22 : 350,
    };
  }

  particles = Array.from({ length: 90 }, makeParticle);

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 70%, 75%, ${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.0008;

      // Reset when invisible or offscreen
      if (p.alpha <= 0 || p.y < -10 || p.x < -10 || p.x > W + 10) {
        Object.assign(p, makeParticle());
        p.y = H + 10; // restart from bottom
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Scroll reveal (IntersectionObserver) ────────────────── */
const revealSelectors = '.reveal-up, .reveal-text, .reveal-float';
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(revealSelectors).forEach(el => observer.observe(el));

/* ── Lightbox ────────────────────────────────────────────── */
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// Expose globally so onclick attributes work
window.openLightbox  = openLightbox;
window.closeLightbox = closeLightbox;

/* ── Music toggle ────────────────────────────────────────── */
const musicToggle = document.getElementById('musicToggle');
const musicLabel  = musicToggle.querySelector('.music-label');
const audio       = document.getElementById('ambientAudio');

musicToggle.addEventListener('click', () => {
  if (audio.paused) {
    // Browsers require a user gesture to play — this click IS one
    audio.play().then(() => {
      musicToggle.classList.add('playing');
      musicLabel.textContent = 'pause';
    }).catch(() => {
      // No audio source attached yet — silently ignore
      musicLabel.textContent = 'no audio';
    });
  } else {
    audio.pause();
    musicToggle.classList.remove('playing');
    musicLabel.textContent = 'play';
  }
});

/* ── Subtle staggered hero symbol y-offsets ──────────────── */
// Already handled purely in CSS via custom properties — nothing extra needed.

/* ── Prevent lightbox from closing when clicking the image ── */
lightboxImg.addEventListener('click', e => e.stopPropagation());
