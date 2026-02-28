/* ═══════════════════════════════════════════════
   PERSONAL OS — MAIN SCRIPT
   Fade-in observer · Cursor · Smooth interactions
   ═══════════════════════════════════════════════ */

'use strict';

// ── Intersection Observer: fade-in on scroll ──
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  }
);

// Trigger hero elements immediately on load
window.addEventListener('DOMContentLoaded', () => {
  fadeEls.forEach((el) => observer.observe(el));

  // Force hero section elements visible after short delay
  const heroFadeEls = document.querySelectorAll('.hero .fade-in');
  heroFadeEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 80 + i * 130);
  });
});

// ── Nav: add border on scroll ──
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    nav.style.borderBottomColor = 'rgba(255,255,255,0.12)';
  } else {
    nav.style.borderBottomColor = 'transparent';
  }
}, { passive: true });

// ── Smooth anchor scroll ──
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = document.querySelector('.nav')?.offsetHeight ?? 56;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - navH - 24,
      behavior: 'smooth',
    });
  });
});

// ── Live clock in status text (optional atmosphere) ──
const statusText = document.querySelector('.status-text');
if (statusText) {
  const updateTime = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    statusText.textContent = `System online — ${hh}:${mm}:${ss}`;
  };
  updateTime();
  setInterval(updateTime, 1000);
}

// ── Module card: subtle tilt on mouse move ──
document.querySelectorAll('.module-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 6;
    card.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
    card.style.transition = 'transform 0.45s ease, background 0.25s ease, border-color 0.25s ease';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.08s ease, background 0.25s ease, border-color 0.25s ease';
  });
});
