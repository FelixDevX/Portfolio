/* ===================================================
   Felix Y Lingam Portfolio — script.js
   =================================================== */

'use strict';

/* ─── 1. Scroll Progress Bar ─── */
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = Math.min(progress, 100) + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });

/* ─── 2. Navbar Scroll State & Active Section ─── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNavbar() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

function updateActiveNavLink() {
  const scrollMid = window.scrollY + window.innerHeight / 2;
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 80;
    const bottom = top + section.offsetHeight;
    if (scrollMid >= top && scrollMid < bottom) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', () => {
  updateNavbar();
  updateActiveNavLink();
}, { passive: true });

updateNavbar();
updateActiveNavLink();

/* ─── 3. Mobile Nav Toggle ─── */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

/* ─── 4. Intersection Observer — Reveal Animations ─── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children within same parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        const idx = Array.from(siblings).indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 80) + 'ms';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── 5. Hero Canvas — Particle Network ─── */
(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  // Skip heavy animation if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;
  let W, H;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56,189,248,${this.alpha})`;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.min(Math.floor((W * H) / 14000), 80);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function drawConnections() {
    const maxDist = 140;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animId = requestAnimationFrame(animate);
  }

  const ro = new ResizeObserver(() => {
    resize();
    initParticles();
  });
  ro.observe(canvas);

  resize();
  initParticles();
  animate();
})();

/* ─── 6. Footer Year ─── */
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ─── 7. Copy Email Button ─── */
function copyEmail(event) {
  event.preventDefault();
  event.stopPropagation();
  const email = 'felixlingam@gmail.com';
  const btn = document.getElementById('copyEmailBtn');

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => {
      showCopied(btn);
    }).catch(() => fallbackCopy(email, btn));
  } else {
    fallbackCopy(email, btn);
  }
}

function fallbackCopy(text, btn) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); showCopied(btn); } catch (e) {}
  document.body.removeChild(ta);
}

function showCopied(btn) {
  if (!btn) return;
  btn.classList.add('copied');
  btn.title = 'Copied!';
  const original = btn.innerHTML;
  btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
  setTimeout(() => {
    btn.classList.remove('copied');
    btn.title = 'Copy email';
    btn.innerHTML = original;
  }, 2500);
}

/* ─── 8. Contact Form with Validation + Mailto Fallback ─── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      const name    = document.getElementById('contactName').value.trim();
      const email   = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const mailto = `mailto:felixlingam@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    }
  });
}

function validateForm() {
  let valid = true;

  const fields = [
    { id: 'contactName',    errId: 'nameError',    msg: 'Please enter your name.',          check: v => v.trim().length >= 2 },
    { id: 'contactEmail',   errId: 'emailError',   msg: 'Please enter a valid email.',      check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    { id: 'contactSubject', errId: 'subjectError', msg: 'Please enter a subject.',          check: v => v.trim().length >= 3 },
    { id: 'contactMessage', errId: 'messageError', msg: 'Please enter a message (min 10 characters).', check: v => v.trim().length >= 10 },
  ];

  fields.forEach(({ id, errId, msg, check }) => {
    const input = document.getElementById(id);
    const errEl = document.getElementById(errId);
    const val = input ? input.value : '';
    if (!check(val)) {
      valid = false;
      if (input) input.classList.add('error');
      if (errEl) errEl.textContent = msg;
    } else {
      if (input) input.classList.remove('error');
      if (errEl) errEl.textContent = '';
    }
  });

  return valid;
}

// Live validation: clear error on input
['contactName','contactEmail','contactSubject','contactMessage'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', () => {
    el.classList.remove('error');
    const errId = id.replace('contact', '').toLowerCase() + 'Error';
    const errEl = document.getElementById(errId.charAt(0).toUpperCase() + errId.slice(1)) ||
                  document.getElementById(errId);
    if (errEl) errEl.textContent = '';
  });
});

// Explicit field-to-error mapping
const fieldErrMap = {
  contactName: 'nameError',
  contactEmail: 'emailError',
  contactSubject: 'subjectError',
  contactMessage: 'messageError',
};
Object.entries(fieldErrMap).forEach(([fieldId, errId]) => {
  const el = document.getElementById(fieldId);
  const errEl = document.getElementById(errId);
  if (el && errEl) {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      errEl.textContent = '';
    });
  }
});

/* ─── 9. Smooth Scroll for Anchor Links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── 10. Chip / Skill Hover Ripple Effect ─── */
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('mouseenter', () => {
    chip.style.transform = 'translateY(-2px) scale(1.04)';
  });
  chip.addEventListener('mouseleave', () => {
    chip.style.transform = '';
  });
});

/* ─── 11. Profile Image Fallback Check ─── */
const profileImg = document.getElementById('profileImg');
const profileFallback = document.getElementById('profileFallback');
if (profileImg) {
  profileImg.addEventListener('load', () => {
    // Image loaded successfully
    if (profileFallback) profileFallback.style.display = 'none';
    profileImg.style.display = 'block';
  });
  // If already cached/loaded
  if (profileImg.complete && profileImg.naturalWidth > 0) {
    if (profileFallback) profileFallback.style.display = 'none';
  }
}

/* ─── 12. Project Card Tilt Effect (Subtle) ─── */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-6px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });
}

/* ─── 13. Keyboard Accessibility — ESC closes mobile menu ─── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.focus();
  }
});
