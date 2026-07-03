#!/usr/bin/env node
/* build.cjs — renders index.html + projects/<slug>/index.html from data/projects.json
 * Static, no deps. Run: node build.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/projects.json'), 'utf8'));
const { projects, categories, meta } = data;

/* ── tiny markdown → html (headers, lists, bold/em/code/links, paragraphs) ── */
function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function inline(s) {
  return s
    .replace(/`([^`]+)`/g, (_, c) => `<code>${esc(c)}</code>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}
function md(src) {
  const lines = src.split('\n');
  const out = [];
  let para = [], list = null, code = null;
  const flushPara = () => { if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; } };
  const flushList = () => { if (list) { out.push(`<ul>${list.map(i => `<li>${inline(i)}</li>`).join('')}</ul>`); list = null; } };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (code !== null) {
      if (/^```/.test(line)) { out.push(`<pre><code>${esc(code.join('\n'))}</code></pre>`); code = null; }
      else code.push(raw);
      continue;
    }
    if (/^```/.test(line)) { flushPara(); flushList(); code = []; continue; }
    if (/^#{1,6}\s/.test(line)) {
      flushPara(); flushList();
      const level = line.match(/^#+/)[0].length;
      if (level === 1) continue; // page already renders the title
      out.push(`<h${level}>${inline(line.replace(/^#+\s*/, ''))}</h${level}>`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) { flushPara(); (list ??= []).push(line.replace(/^[-*]\s+/, '')); continue; }
    if (line === '') { flushPara(); flushList(); continue; }
    para.push(line);
  }
  flushPara(); flushList();
  return out.join('\n');
}

/* ── shared page chrome ── */
const IMPORTMAP = `<script type="importmap">{
  "imports": {
    "lenis": "https://esm.sh/lenis@1.1.18",
    "cwe/smooth-scroll-stage": "/cwe/smooth-scroll-stage.js",
    "cwe/kinetic-type": "/cwe/kinetic-type.js",
    "cwe/magnetic-cursor": "/cwe/magnetic-cursor.js",
    "cwe/stage": "/cwe/stage.js"
  }
}</script>`;

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Ubuntu+Mono:wght@400;700&display=swap" rel="stylesheet">`;

const FAVICON = `<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='18' fill='%23111'/%3E%3Ctext x='50' y='68' font-size='52' text-anchor='middle' fill='%23fff' font-family='sans-serif' font-weight='700'%3EA%3C/text%3E%3C/svg%3E">`;

function nav(active) {
  return `<nav class="site-nav">
  <a class="brand" href="https://madebyangus.com" data-magnetic>Angus Duncan</a>
  <div class="links mono">
    <a href="/" ${active === 'projects' ? 'aria-current="page"' : ''} data-magnetic><span class="navnum">01</span> Projects</a>
    <a href="https://github.com/hangryclaude" target="_blank" rel="noopener" data-magnetic><span class="navnum">02</span> GitHub</a>
    <a href="https://madebyangus.com" data-magnetic><span class="navnum">03</span> Hire me</a>
  </div>
</nav>`;
}

const FOOT = `<footer class="site-foot">
  <div class="wrap">
    <span class="mono">© 2026 Angus Duncan</span>
    <span class="mono">built by hand, shipped by habit</span>
    <a class="mono" href="https://github.com/hangryclaude" target="_blank" rel="noopener" data-magnetic>github/hangryclaude</a>
  </div>
</footer>`;

const EFFECTS = `<script type="module">
  import { initSmoothScroll } from 'cwe/smooth-scroll-stage';
  initSmoothScroll({ lerp: 0.09, parallax: false });
  import { initMagneticCursor } from 'cwe/magnetic-cursor';
  const dark = matchMedia('(prefers-color-scheme: dark)').matches;
  initMagneticCursor(document.body, { size: 30, dotSize: 4, color: dark ? '#e8e6e2' : '#111', blend: false, hoverScale: 1.5, magnetStrength: 0.25 });
  import { initKineticType } from 'cwe/kinetic-type';
  const h = document.querySelector('[data-headline]');
  if (h) initKineticType(h, { split: 'chars', mode: 'reveal', stagger: 0.035, duration: 0.7, rise: 1.1, skew: 6 });
</script>`;

function page({ title, desc, body, pathDepth = 0 }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${FAVICON}
${FONTS}
${IMPORTMAP}
<link rel="stylesheet" href="/assets/css/site.css">
</head>
<body>
${body}
${FOOT}
${EFFECTS}
</body>
</html>`;
}

/* ── index ── */
function card(p) {
  const href = `/projects/${p.slug}/`;
  return `<a class="card" href="${href}">
  <div class="card-img"><img loading="lazy" src="/assets/thumbs/${p.slug}.webp" alt="${esc(p.title)} thumbnail"></div>
  <div class="card-text">
    <p class="card-title">${esc(p.title)}</p>
    <p class="card-desc">${esc(p.tagline)}</p>
  </div>
</a>`;
}

const sections = categories.map(cat => {
  const items = projects.filter(p => p.category === cat);
  if (!items.length) return '';
  return `<section class="cat">
  <div class="cat-head">
    <h2>${esc(cat)}</h2>
    <span class="count mono">${String(items.length).padStart(2, '0')}</span>
  </div>
  <div class="grid">
${items.map(card).join('\n')}
  </div>
</section>`;
}).join('\n');

const indexBody = `${nav('projects')}
<main class="wrap">
  <header class="intro">
    <h1 data-headline>${esc(meta.heading)}</h1>
    <p class="sub">${esc(meta.subheading)}</p>
  </header>
${sections}
</main>`;

fs.writeFileSync(path.join(ROOT, 'index.html'),
  page({ title: meta.title, desc: meta.subheading, body: indexBody }));

/* ── detail pages ── */
let built = 0;
for (const p of projects) {
  const mdPath = path.join(ROOT, 'projects-content', `${p.slug}.md`);
  if (!fs.existsSync(mdPath)) { console.warn(`MISSING writeup: ${p.slug}`); continue; }
  const bodyHtml = md(fs.readFileSync(mdPath, 'utf8'));
  const links = [
    p.repo ? `<a class="btn mono" href="https://github.com/${p.repo}" target="_blank" rel="noopener" data-magnetic>GitHub ↗</a>` : '',
    p.live ? `<a class="btn mono" href="${p.live}" target="_blank" rel="noopener" data-magnetic>Live ↗</a>` : '',
  ].filter(Boolean).join('\n    ');
  const body = `${nav('projects')}
<main class="wrap detail">
  <a class="back mono" href="/" data-magnetic>← All projects</a>
  <header class="detail-head">
    <h1 data-headline>${esc(p.title)}</h1>
    <div class="meta mono">
      <span>${esc(p.category)}</span>${p.lang ? `<span>${esc(p.lang)}</span>` : ''}<span>${esc(p.year || '2026')}</span>
    </div>
    <div class="actions">
    ${links}
    </div>
  </header>
  <div class="hero-img"><img src="/assets/thumbs/${p.slug}.webp" alt="${esc(p.title)}"></div>
  <article class="body">
${bodyHtml}
  </article>
</main>`;
  const dir = path.join(ROOT, 'projects', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'),
    page({ title: `${p.title} — Angus Duncan`, desc: p.tagline, body }));
  built++;
}
console.log(`built index + ${built}/${projects.length} detail pages`);
