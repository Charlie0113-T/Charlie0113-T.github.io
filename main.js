/* ═══════════════════════════════════════════════
   PERSONAL OS — MAIN SCRIPT
   Fade-in observer · Cursor · Smooth interactions
   Module Panel · Charts · Timeline · Essays
   ═══════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════
   i18n — Language state
   ═══════════════════════════════════════════════ */
let LANG = localStorage.getItem('lang') || 'en';

/** Return the right-language string */
const t = (en, zh) => LANG === 'zh' ? zh : en;

/** Apply language to all [data-en] / [data-zh] elements */
function applyLang() {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = LANG === 'zh' ? el.dataset.zh : el.dataset.en;
  });
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = LANG === 'zh' ? 'EN' : '中文';
  document.documentElement.lang = LANG === 'zh' ? 'zh' : 'en';
}

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
    name: 'Height App',        name_zh: 'Height App',
    status: 'LIVE',            status_zh: '已上线',
    summary: 'A web tool for height unit conversion and BMI calculations. Built with Flask and served via Docker.',
    summary_zh: '身高单位换算与 BMI 计算的网页工具，基于 Flask 构建，通过 Docker 部署。',
    tags: ['Python', 'Flask', 'Docker', 'Web'],
    url: '#',
  },
  {
    num: '02',
    name: 'StoryForge DAO',     name_zh: 'StoryForge DAO',
    status: 'BETA',             status_zh: '测试版',
    summary: 'A decentralized autonomous organization platform for collaborative storytelling and co-authorship.',
    summary_zh: '面向协作创作与联合著作的去中心化自治组织平台。',
    tags: ['Blockchain', 'DAO', 'Web3'],
    url: '#',
  },
  {
    num: '03',
    name: 'EchoForge DAO',      name_zh: 'EchoForge DAO',
    status: 'MVP',              status_zh: 'MVP',
    summary: 'An AI-powered content echo system built as a DAO. Enables structured knowledge amplification across nodes.',
    summary_zh: '以 DAO 形式构建的 AI 内容回响系统，实现跨节点的结构化知识放大。',
    tags: ['AI', 'DAO', 'Python', 'Streamlit'],
    url: '#',
  },
  {
    num: '04',
    name: 'Personal OS',        name_zh: '个人操作系统',
    status: 'ACTIVE',           status_zh: '运行中',
    summary: 'This website — a structured, minimal personal operating system representing my thinking and output in public.',
    summary_zh: '本网站——一个结构化、极简的个人操作系统，公开记录我的思考与产出。',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: '#',
  },
  {
    num: '05',
    name: 'HP Web Runner',      name_zh: 'HP Web Runner',
    status: 'ARCHIVED',         status_zh: '已归档',
    summary: 'Web application runner for server-side execution and deployment pipeline testing.',
    summary_zh: '用于服务端执行与部署流水线测试的网页应用运行器。',
    tags: ['Python', 'Web', 'DevOps'],
    url: '#',
  },
  {
    num: '06',
    name: 'Python/C++ Lab',     name_zh: 'Python/C++ 实验室',
    status: 'ONGOING',          status_zh: '持续进行',
    summary: 'Low-level systems programming and scripting experiments. Exploring memory, algorithms, and performance-critical code in both Python and C++.',
    summary_zh: '底层系统编程与脚本实验，在 Python 与 C++ 中探索内存、算法及性能关键代码。',
    tags: ['Python', 'C++', 'Systems', 'Algorithms'],
    url: '#',
  },
];

const ESSAYS = [
  {
    title: 'Personal OS',
    title_zh: '个人操作系统',
    date: '',
    readTime: '',
    content: `# Personal OS\n\n**Layer 4**\nDistribution\nTwitter / Youtube / GitHub\n\n**Layer 3**\nFrontend\nstickmancharles.com\n\n**Layer 2**\nThinking System\nObsidian\n\n**Layer 1**\nReality\nBooks / School / Life / Investing`,
    content_zh: `# 个人操作系统\n\n**第四层**\n传播层\nTwitter / Youtube / GitHub\n\n**第三层**\n展示层\nstickmancharles.com\n\n**第二层**\n思考系统\nObsidian\n\n**第一层**\n现实输入\n书籍 / 学校 / 生活 / 投资`,
  },
  {
    title: 'Stickman Charles — Metacognition',
    title_zh: 'Stickman Charles 元认知',
    date: '2026/3/7',
    readTime: '约6分钟',
    content: `Hello, I’m Stickman Charles.\n\nTeacher Li Xiaolai once said: “Clear and correct concepts are the foundation of all thinking. In fact, whether a person is intelligent can almost be reduced to two questions: Do they possess enough clear, accurate, and correct concepts? And are the relationships between those concepts clear, accurate, and correct?”\n\nMetacognition is the first concept we should understand. It is also the foundation for all the concepts and behaviors that follow.\n\nMetacognition refers to the ability to think about one’s own thinking and behavior.\n\nIn _Cognitive Awakening_, the author describes the theory of the three brains: the instinctive brain, the emotional brain, and the rational brain (the neocortex). The instinctive brain originated about 360 million years ago. It has a simple structure and reacts quickly, focusing mainly on pleasure and avoiding harm. The emotional brain emerged about 200 million years ago and is responsible for processing emotions and social interactions. The rational brain appeared around 2.5 million years ago and handles higher-level cognitive functions, including metacognition.\n\nIn daily life, the instinctive brain and emotional brain process more than 90% of incoming information because they respond quickly. The rational brain reacts much more slowly. Often, it can only respond after the fact, or occasionally intervene in small moments. This is one reason why many people in the stock market lack a long-term investment mindset. They hope to get rich quickly, buy high by following the crowd without independent thinking, and sell low because they lack confidence in assets they never truly analyzed themselves.\n\nThe same pattern appears in everyday life. Many people occasionally lose control of their words or actions and later regret it deeply. This is also a sign of weak metacognitive ability. If the rational brain could intervene before those words were spoken or those actions taken, many regrets might never occur. There is an old Chinese saying: “Think three times before you act.” It expresses the same idea.\n\nSo how can we train our metacognitive ability? I use three methods.\n\nFirst, when facing emotional stimulation, pause for six seconds. This gives the rational brain enough time to respond and take control of behavior.\n\nSecond, write a daily journal—also known as a review. It does not need to be complicated. Simply list the three things you most need to improve today and propose solutions for them.\n\nThird, maintain good sleep. The rational brain relies on the prefrontal cortex (PFC), which is highly sensitive to sleep deprivation. Once sleep drops below six hours, this region begins to lose oxygen efficiency, making metacognitive control much harder to access. This is why people who stay up late are more likely to lose emotional control.\n\nI was born in 2012, which means I should theoretically be entering my rebellious teenage years. Here I want to thank my father, my mother, and Professor Sun. When I was young, they introduced me to the concept of metacognition and helped me develop the habit of observing and regulating my own behavior.\n\nStarting today, you can begin training your own metacognitive ability and become one of the few people who can deliberately activate their rational brain in real time.\n\nIf you have any thoughts or suggestions about metacognition, feel free to contact me at:\n\n[charlesisworkinghard@gmail.com](mailto:charlesisworkinghard@gmail.com)\n\nKeep thinking, and take care.`,
    content_zh: `你好，我是 Stickman Charles。\n\n李笑来老师曾经说过：“清晰且正确的概念是一切思考的基石。而衡量一个人是否聪明，几乎可以凝练成他是否符合下面这两个条件：他有没有足够多的清晰、准确、正确的概念；他的概念之间有没有清晰、准确、正确的联系。”\n\n元认知是我们要了解的第一个概念，也是之后所有概念和行为的基石。\n\n所谓元认知能力，就是对自己当前行为的独立思考。\n\n在《认知觉醒》中，作者提到了三个大脑理论：本能脑、情绪脑和理智脑/新皮层。本能脑起源于3.6亿年前，结构简单、反应快，只专注于享乐和“避害”；情绪脑起源于2亿年前，可以处理情绪和社交；理智脑起源于250万年前，负责高级认知功能，其中就包括我们提到的元认知。\n\n在日常生活中，你的本能脑和情绪脑因为响应速度快，掌控了90%以上的信息处理。理智脑因为响应速度慢，很多时候只能事后再反应，或者见缝插针地偶尔干预一下你的行为。这也就导致了在股市里，很多人没有长期投资的心态——总想着一笔暴富，又或者是高买——喜欢跟风，不独立思考；低卖——对不经过自己思考的资产没有信心，害怕没人接盘。\n\n又或者说，很多人在生活中总有那么几次控制不住自己的言行，最后酿成大祸。这也是元认知能力缺失的体现。如果能在说出这些话、做出这些事之前先动用理智脑想一想，也许很多人的遗憾就不会再出现了。中国有句古话：“三思而后行。”讲的也是这个道理。\n\n那么，怎样锻炼自己的元认知能力呢？我用了以下三种方法：\n\n第一，在受到情绪刺激时，暂停6秒钟。给我的理智脑充足的响应时间，接管我的行为。\n\n第二，每天坚持写日志——也可以被称为复盘。不需要太复杂，只需要把自己今天最应该提升的三个点列出来，并给出解决方案就行。\n\n第三，保持良好的睡眠。理智脑依赖前额叶皮层（PFC），这个区域对睡眠不足最敏感。一旦睡眠小于6小时，该区域就会缺氧，导致元认知调用的难度大幅上升。因此可以说，熬夜的人情绪更容易失控。\n\n我出生于2012年，现在按理来说应该处在叛逆期。在这里我很想感谢我的父亲、母亲和孙教授，他们在我小的时候教会了我元认知的概念，让我有了控制自己言行的习惯和意识。\n\n从今天开始，你也可以开始锻炼自己的元认知能力，让自己成为那些为数不多能即时调用理智脑的人之一。\n\n如果你有任何对于元认知的想法和建议，请通过\ncharlesisworkinghard@gmail.com\n联系我，期待你的思考！\n\n保持思考，保重。`,
  },
];

const MILESTONES = [
  {
    year: '2023',
    items: [
      { date: '2023', title: 'Invested in NASDAQ 100 Index Fund', title_zh: '投资纳斯达克100指数基金', desc: 'Made my first investment in the NASDAQ 100, marking the start of my financial journey.', desc_zh: '完成纳斯达克100的首次投资，开启了我的财务旅程。', major: true, tag: 'INVEST' },
    ]
  },
  {
    year: '2024',
    items: [
      { date: '2024-01-26', title: 'Dogs Travel Startup Event I', title_zh: '狗狗旅行创业活动 I', desc: 'Organized and led the first Dogs travel entrepreneurship event, exploring new business models with a passionate team.', desc_zh: '组织并主导了第一届狗狗旅行创业活动，与热情的团队共同探索新商业模式。', major: true, tag: 'STARTUP' },
      { date: '2024-05-01', title: 'Dogs Travel Startup Event II', title_zh: '狗狗旅行创业活动 II', desc: 'Held the second Dogs travel entrepreneurship event, further validating the concept and expanding the community.', desc_zh: '举办第二届狗狗旅行创业活动，进一步验证概念并扩大社区规模。', major: true, tag: 'STARTUP' },
      { date: '2024-09', title: 'First Encounter with AI Art, Music, and Writing', title_zh: '初次接触 AI 艺术、音乐与写作', desc: 'Explored generative AI for the first time, creating art, music, and written works with cutting-edge tools.', desc_zh: '首次探索生成式 AI，用前沿工具创作艺术、音乐与文字作品。', major: true, tag: 'AI' },
      { date: '2024-11', title: 'Python NCT Level 1 Excellence', title_zh: 'Python NCT 一级优秀', desc: 'Achieved excellent results in the Python NCT Level 1 exam, demonstrating strong programming fundamentals.', desc_zh: '在 Python NCT 一级考试中取得优秀成绩，展现扎实的编程基础。', major: false, tag: 'PYTHON' },
    ]
  },
  {
    year: '2025',
    items: [
      { date: '2025-03-03', title: 'First Blockchain Experience & Investment', title_zh: '首次区块链体验与投资', desc: 'Dove into blockchain technology and made my first investment, opening a new chapter in tech and finance.', desc_zh: '深入区块链技术并完成首次投资，开启科技与金融融合的新篇章。', major: true, tag: 'BLOCKCHAIN' },
      { date: '2025-06-06', title: 'Invested in TSLA', title_zh: '投资特斯拉', desc: 'Added Tesla to my investment portfolio, betting on innovation and the future of mobility.', desc_zh: '将特斯拉纳入投资组合，押注创新与出行的未来。', major: false, tag: 'INVEST' },
      { date: '2025-08-01', title: 'Discovered VS Code', title_zh: '发现 VS Code', desc: 'Started using Visual Studio Code, which greatly improved my coding efficiency and workflow.', desc_zh: '开始使用 Visual Studio Code，大幅提升了编码效率与工作流程。', major: false, tag: 'TOOLS' },
      { date: '2025-09-14', title: 'Cardano Academy Master Level', title_zh: 'Cardano 学院大师级', desc: 'Achieved Master Level at Cardano Academy, deepening my understanding of blockchain and smart contracts.', desc_zh: '在 Cardano 学院取得大师级认证，深化了对区块链与智能合约的理解。', major: true, tag: 'CARDANO' },
      { date: '2025-12-21', title: 'Launched My First C++ Website', title_zh: '发布首个 C++ 网站', desc: 'Deployed my first website built with C++, marking a milestone in my systems programming journey.', desc_zh: '部署了第一个用 C++ 构建的网站，标志着系统编程旅程的重要里程碑。', major: true, tag: 'C++' },
      { date: '2025-12-21', title: 'Completed StoryForge DAO MVP', title_zh: '完成 StoryForge DAO MVP', desc: 'Finished and launched the MVP for my blockchain startup project, StoryForge DAO.', desc_zh: '完成并发布区块链创业项目 StoryForge DAO 的最小可行产品。', major: true, tag: 'DAO' },
    ]
  },
  {
    year: '2026',
    items: [
      { date: '2026-02-28', title: 'Launched stickmancharles.me', title_zh: '发布 stickmancharles.me', desc: 'Released my personal website, stickmancharles.me, to share my work and ideas with the world.', desc_zh: '发布个人网站 stickmancharles.me，向世界分享我的作品与想法。', major: true, tag: 'WEB' },
      { date: '2026-03-04', title: 'First Cardano Aiken LLM', title_zh: '首个 Cardano Aiken 大语言模型', desc: 'Deployed my first LLM using Cardano Aiken, pushing the boundaries of blockchain AI integration.', desc_zh: '使用 Cardano Aiken 部署首个大语言模型，突破区块链 AI 融合的边界。', major: true, tag: 'AI' },
      { date: '2026-03-04', title: 'EchoForgeDAO MVP Complete', title_zh: 'EchoForgeDAO MVP 完成', desc: 'Completed the MVP for my blockchain project EchoForgeDAO, advancing decentralized content creation.', desc_zh: '完成区块链项目 EchoForgeDAO 的 MVP，推动去中心化内容创作向前迈进。', major: true, tag: 'DAO' },
      { date: '2026-03-06', title: 'Read 5,234,000 Words of Literature', title_zh: '累计阅读 523 万字文学作品', desc: 'Achieved a personal record by reading over 5.23 million words, demonstrating dedication to literary exploration.', desc_zh: '创下个人记录，累计阅读超过 523 万字，展现对文学探索的坚定投入。', major: true, tag: 'LITERATURE' },
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
  projects:  { index: '01', tag: 'BUILD',     tag_zh: '构建',  title: 'Projects',             title_zh: '项目' },
  essays:    { index: '02', tag: 'WRITE',     tag_zh: '写作',  title: 'Essays',               title_zh: '文章' },
  milestone: { index: '03', tag: 'MILESTONE', tag_zh: '里程碑', title: 'Milestone',             title_zh: '里程碑' },
  review:    { index: '04', tag: 'REVIEW',    tag_zh: '复盘',  title: 'Monthly System Review', title_zh: '月度系统复盘' },
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
    document.getElementById('panel-tag-label').textContent = t(meta.tag, meta.tag_zh);
    document.getElementById('panel-title').textContent     = t(meta.title, meta.title_zh);

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

  // ── Language toggle ──
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      LANG = LANG === 'en' ? 'zh' : 'en';
      localStorage.setItem('lang', LANG);
      applyLang();
    });
  }

  // Apply saved language on load
  applyLang();
}

// ── Content builders ──────────────────────────

function buildProjects() {
  return `<div class="projects-grid">` +
    PROJECTS.map(p => `
      <div class="project-cell">
        <div class="project-cell-header">
          <span class="project-num">${p.num}</span>
          <span class="project-status">${t(p.status, p.status_zh)}</span>
        </div>
        <div class="project-name">${t(p.name, p.name_zh)}</div>
        <p class="project-summary">${t(p.summary, p.summary_zh)}</p>
        <div class="project-tags">${p.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
        <a href="${p.url}" class="project-url">${t('View Project →', '查看项目 →')}</a>
      </div>`).join('') +
  `</div>`;
}

function buildEssays() {
  return `<div class="essays-list">` +
    ESSAYS.map((e, i) => {
      const content = t(e.content, e.content_zh || e.content);
      return `
      <div class="essay-item" data-essay="${i}">
        <div class="essay-header">
          <div class="essay-header-left">
            <div class="essay-title">${t(e.title, e.title_zh || e.title)}</div>
            <div class="essay-meta">
              <span>${e.date}</span>
              <span>${e.readTime}</span>
            </div>
          </div>
          <span class="essay-toggle">+</span>
        </div>
        <div class="essay-content">
          <div class="md-body">${typeof marked !== 'undefined' ? marked.parse(content) : content.replace(/\n/g,'<br>')}</div>
        </div>
      </div>`;
    }).join('') +
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
          <div class="timeline-item-title">${t(item.title, item.title_zh || item.title)}</div>
          <p class="timeline-item-desc">${t(item.desc, item.desc_zh || item.desc)}</p>
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
        <div class="review-period">// ${REVIEW_DATA.period} — ${t('System Review', '系统复盘')}</div>
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
    },
    options: {
      scales: {
        r: {
          beginAtZero: true,
          min: 0,
          max: 30,
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
