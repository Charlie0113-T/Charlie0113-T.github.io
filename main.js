/* ═══════════════════════════════════════════════
   PERSONAL OS — MAIN SCRIPT
   Fade-in observer · Cursor · Smooth interactions
   Module Panel · Charts · Timeline · Essays
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

  initPanel();
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
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navH = document.querySelector('.nav')?.offsetHeight ?? 56;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - navH - 24,
      behavior: 'smooth',
    });
  });
});

// ── Live clock in status text ──
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

/* ═══════════════════════════════════════════════
   MODULE PANEL SYSTEM
   ═══════════════════════════════════════════════ */

// ── Data ──────────────────────────────────────

const PROJECTS = [
  {
    num: '01',
    name: 'Height App',
    status: 'LIVE',
    summary: 'A web tool for height unit conversion and BMI calculations. Built with Flask and served via Docker.',
    tags: ['Python', 'Flask', 'Docker', 'Web'],
    url: '#',
  },
  {
    num: '02',
    name: 'StoryForge DAO',
    status: 'BETA',
    summary: 'A decentralized autonomous organization platform for collaborative storytelling and co-authorship.',
    tags: ['Blockchain', 'DAO', 'Web3'],
    url: '#',
  },
  {
    num: '03',
    name: 'EchoForge DAO',
    status: 'MVP',
    summary: 'An AI-powered content echo system built as a DAO. Enables structured knowledge amplification across nodes.',
    tags: ['AI', 'DAO', 'Python', 'Streamlit'],
    url: '#',
  },
  {
    num: '04',
    name: 'Personal OS',
    status: 'ACTIVE',
    summary: 'This website — a structured, minimal personal operating system representing my thinking and output in public.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: '#',
  },
  {
    num: '05',
    name: 'HP Web Runner',
    status: 'ARCHIVED',
    summary: 'Web application runner for server-side execution and deployment pipeline testing.',
    tags: ['Python', 'Web', 'DevOps'],
    url: '#',
  },
  {
    num: '06',
    name: 'C++ Systems Lab',
    status: 'ONGOING',
    summary: 'Low-level systems programming experiments. Exploring memory, algorithms, and performance-critical code.',
    tags: ['C++', 'Systems', 'Algorithms'],
    url: '#',
  },
];

const ESSAYS = [
  {
    title: 'Personal OS',
    date: '',
    readTime: '',
    content: `# Personal OS\n\n**Layer 4**\nDistribution\n传播层\nTwitter / Youtube / GitHub\n\n**Layer 3**\nFrontend\n展示层\nstickmancharles.com\n\n**Layer 2**\nThinking System\n思考系统\nObsidian\n\n**Layer 1**\nReality\n现实输入\nBooks / School / Life / Investing`,
  },
];

const MILESTONES = [
  {
    year: '2023',
    items: [
      { date: '2023', title: 'Invested in NASDAQ 100 Index Fund', desc: 'Made my first investment in the NASDAQ 100, marking the start of my financial journey.', major: true, tag: 'INVEST' },
    ]
  },
  {
    year: '2024',
    items: [
      { date: '2024-01-26', title: 'Dogs Travel Startup Event I', desc: 'Organized and led the first Dogs travel entrepreneurship event, exploring new business models with a passionate team.', major: true, tag: 'STARTUP' },
      { date: '2024-05-01', title: 'Dogs Travel Startup Event II', desc: 'Held the second Dogs travel entrepreneurship event, further validating the concept and expanding the community.', major: true, tag: 'STARTUP' },
      { date: '2024-09', title: 'First Encounter with AI Art, Music, and Writing', desc: 'Explored generative AI for the first time, creating art, music, and written works with cutting-edge tools.', major: true, tag: 'AI' },
      { date: '2024-11', title: 'Python NCT Level 1 Excellence', desc: 'Achieved excellent results in the Python NCT Level 1 exam, demonstrating strong programming fundamentals.', major: false, tag: 'PYTHON' },
    ]
  },
  {
    year: '2025',
    items: [
      { date: '2025-03-03', title: 'First Blockchain Experience & Investment', desc: 'Dove into blockchain technology and made my first investment, opening a new chapter in tech and finance.', major: true, tag: 'BLOCKCHAIN' },
      { date: '2025-06-06', title: 'Invested in TSLA', desc: 'Added Tesla to my investment portfolio, betting on innovation and the future of mobility.', major: false, tag: 'INVEST' },
      { date: '2025-08-01', title: 'Discovered VS Code', desc: 'Started using Visual Studio Code, which greatly improved my coding efficiency and workflow.', major: false, tag: 'TOOLS' },
      { date: '2025-09-14', title: 'Cardano Academy Master Level', desc: 'Achieved Master Level at Cardano Academy, deepening my understanding of blockchain and smart contracts.', major: true, tag: 'CARDANO' },
      { date: '2025-12-21', title: 'Launched My First C++ Website', desc: 'Deployed my first website built with C++, marking a milestone in my systems programming journey.', major: true, tag: 'C++' },
      { date: '2025-12-21', title: 'Completed StoryForge DAO MVP', desc: 'Finished and launched the MVP for my blockchain startup project, StoryForge DAO.', major: true, tag: 'DAO' },
    ]
  },
  {
    year: '2026',
    items: [
      { date: '2026-02-28', title: 'Launched stickmancharles.me', desc: 'Released my personal website, stickmancharles.me, to share my work and ideas with the world.', major: true, tag: 'WEB' },
      { date: '2026-03-04', title: 'First Cardano Aiken LLM', desc: 'Deployed my first LLM using Cardano Aiken, pushing the boundaries of blockchain AI integration.', major: true, tag: 'AI' },
      { date: '2026-03-04', title: 'EchoForgeDAO MVP Complete', desc: 'Completed the MVP for my blockchain project EchoForgeDAO, advancing decentralized content creation.', major: true, tag: 'DAO' },
      { date: '2026-03-06', title: 'Wrote 5,234,000 Words of Literature', desc: 'Achieved a personal record by writing over 5.23 million words, demonstrating dedication to literary creation.', major: true, tag: 'LITERATURE' },
    ]
  },
];

const REVIEW_DATA = {
  period: 'FEB 2026',
  dims: [
    { name: 'Build',    score: 24 },
    { name: 'Learn',    score: 21 },
    { name: 'Health',   score: 18 },
    { name: 'Finance',  score: 22 },
    { name: 'Social',   score: 15 },
    { name: 'Focus',    score: 21 },
  ],
  notes: [],
};

// ── Meta map ───────────────────────────────────

const MODULE_META = {
  projects:  { index: '01', tag: 'BUILD',      title: 'Projects' },
  essays:    { index: '02', tag: 'WRITE',      title: 'Essays' },
  milestone: { index: '03', tag: 'MILESTONE',  title: 'Milestone' },
  review:    { index: '04', tag: 'REVIEW',     title: 'Monthly System Review' },
};

// ── Panel DOM refs ─────────────────────────────

let radarChart = null;

function initPanel() {
  const panel     = document.getElementById('module-panel');
  const backdrop  = document.getElementById('panel-backdrop');
  const closeBtn  = document.getElementById('panel-close');

  const openPanel = (moduleKey) => {
    const meta = MODULE_META[moduleKey];
    if (!meta) return;

    document.getElementById('panel-index').textContent     = meta.index;
    document.getElementById('panel-tag-label').textContent = meta.tag;
    document.getElementById('panel-title').textContent     = meta.title;

    const body = document.getElementById('panel-body');
    body.innerHTML = '';

    // destroy previous chart
    if (radarChart) { radarChart.destroy(); radarChart = null; }

    if (moduleKey === 'projects')  body.innerHTML = buildProjects();
    if (moduleKey === 'essays')    { body.innerHTML = buildEssays(); bindEssayToggle(); }
    if (moduleKey === 'milestone') body.innerHTML = buildMilestone();
    if (moduleKey === 'review')    { body.innerHTML = buildReview(); initRadarChart(); }

    panel.classList.add('panel-open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closePanel = () => {
    panel.classList.remove('panel-open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // open via card click or card-link click
  document.querySelectorAll('.module-card[data-module]').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-link')) return; // handled separately
      openPanel(card.dataset.module);
    });
  });
  document.querySelectorAll('.card-link[data-module]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openPanel(link.dataset.module);
    });
  });

  backdrop.addEventListener('click', closePanel);
  closeBtn.addEventListener('click', closePanel);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
  });
}

// ── Content builders ──────────────────────────

function buildProjects() {
  return `<div class="projects-grid">` +
    PROJECTS.map(p => `
      <div class="project-cell">
        <div class="project-cell-header">
          <span class="project-num">${p.num}</span>
          <span class="project-status">${p.status}</span>
        </div>
        <div class="project-name">${p.name}</div>
        <p class="project-summary">${p.summary}</p>
        <div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <a href="${p.url}" class="project-url">View Project →</a>
      </div>`).join('') +
  `</div>`;
}

function buildEssays() {
  return `<div class="essays-list">` +
    ESSAYS.map((e, i) => `
      <div class="essay-item" data-essay="${i}">
        <div class="essay-header">
          <div class="essay-header-left">
            <div class="essay-title">${e.title}</div>
            <div class="essay-meta">
              <span>${e.date}</span>
              <span>${e.readTime}</span>
            </div>
          </div>
          <span class="essay-toggle">+</span>
        </div>
        <div class="essay-content">
          <div class="md-body">${typeof marked !== 'undefined' ? marked.parse(e.content) : e.content.replace(/\n/g,'<br>')}</div>
        </div>
      </div>`).join('') +
  `</div>`;
}

function bindEssayToggle() {
  document.querySelectorAll('.essay-header').forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.closest('.essay-item');
      item.classList.toggle('expanded');
    });
  });
}

function buildMilestone() {
  let html = `<div class="timeline">`;
  MILESTONES.forEach(section => {
    html += `<div class="timeline-section-label">${section.year}</div>`;
    section.items.forEach(item => {
      html += `
        <div class="timeline-item${item.major ? ' major' : ''}">
          <div class="timeline-dot"></div>
          <div class="timeline-date">${item.date}</div>
          <div class="timeline-item-title">${item.title}</div>
          <p class="timeline-item-desc">${item.desc}</p>
          <span class="timeline-item-tag">${item.tag}</span>
        </div>`;
    });
  });
  html += `</div>`;
  return html;
}

function buildReview() {
  const dimRows = REVIEW_DATA.dims.map(d => `
    <div class="review-dim">
      <span class="review-dim-name">${d.name}</span>
      <div class="review-dim-bar-wrap">
        <div class="review-dim-bar">
          <div class="review-dim-fill" style="width:${(d.score / 30) * 100}%"></div>
        </div>
        <span class="review-dim-score">${d.score} / 30</span>
      </div>
    </div>`).join('');

  return `
    <div class="review-layout">
      <div class="review-chart-wrap">
        <canvas id="radar-chart"></canvas>
      </div>
      <div class="review-meta">
        <div class="review-period">// ${REVIEW_DATA.period} — System Review</div>
        <div class="review-dim-list">${dimRows}</div>
      </div>
    </div>`;
}

function initRadarChart() {
  const ctx = document.getElementById('radar-chart');
  if (!ctx || typeof Chart === 'undefined') return;

  const labels = REVIEW_DATA.dims.map(d => d.name);
  const data   = REVIEW_DATA.dims.map(d => d.score);

  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        data,
        borderColor: 'rgba(255, 255, 255, 0.75)',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderWidth: 1.5,
        pointBackgroundColor: 'rgba(255, 255, 255, 0.9)',
        pointBorderColor: 'rgba(255, 255, 255, 0)',
        pointRadius: 4,
        pointHoverRadius: 6,
      }],
    {
      num: '06',
      name: 'Python/C++ Lab',
      status: 'ONGOING',
      summary: 'Low-level systems programming and scripting experiments. Exploring memory, algorithms, and performance-critical code in both Python and C++.',
      tags: ['Python', 'C++', 'Systems', 'Algorithms'],
      url: '#',
    },
          ticks: {
            stepSize: 5,
            display: false,
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.08)',
            lineWidth: 1,
          },
          angleLines: {
            color: 'rgba(255, 255, 255, 0.08)',
            lineWidth: 1,
          },
          pointLabels: {
            color: 'rgba(170, 170, 170, 0.9)',
            font: {
              family: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              size: 12,
              weight: '400',
            },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(10, 10, 10, 0.92)',
          borderColor: 'rgba(255, 255, 255, 0.15)',
          borderWidth: 1,
          titleColor: '#ffffff',
          bodyColor: '#aaaaaa',
          titleFont: { family: 'Courier New', size: 11, weight: 'normal' },
          bodyFont: { family: 'Inter', size: 12 },
          padding: 10,
          callbacks: {
            title: (items) => items[0].label.toUpperCase(),
            label: (item) => `  Score: ${item.raw} / 30`,
          },
        },
      },
    },
  });
}
