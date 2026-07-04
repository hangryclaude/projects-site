#!/usr/bin/env node
/* build.cjs — renders index.html (curated), all/index.html (full archive),
 * and projects/<slug>/index.html from data/. Static, no deps.
 * BASE env = path prefix for subpath hosting (GH Pages). Run: BASE=/projects-site node build.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const BASE = process.env.BASE || '';
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/projects.json'), 'utf8'));
const sel = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/selected.json'), 'utf8'));
const { projects, categories, meta } = data;
const bySlug = Object.fromEntries(projects.map(p => [p.slug, p]));

for (const s of [...sel.featured, ...sel.selected]) {
  if (!bySlug[s]) { console.error(`selected.json references unknown slug: ${s}`); process.exit(1); }
}

/* ── tiny markdown → html ── */
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
      if (level === 1) continue;
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

/* ── chrome ── */
const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Ubuntu+Mono:wght@400;700&display=swap" rel="stylesheet">`;

const FAVICON = `<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='18' fill='%23111'/%3E%3Ctext x='50' y='68' font-size='52' text-anchor='middle' fill='%23fff' font-family='sans-serif' font-weight='700'%3EA%3C/text%3E%3C/svg%3E">`;

/* reveal-on-scroll: pure IntersectionObserver toggling a class — no scroll hijack, nothing to glitch */
const REVEAL_JS = `<script>
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('js');
  const io = new IntersectionObserver((es) => {
    for (const e of es) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
})();
</script>`;

function nav(active) {
  return `<nav class="site-nav">
  <a class="brand" href="${BASE}/">Angus Duncan</a>
  <div class="links mono">
    <a href="${BASE}/" ${active === 'projects' ? 'aria-current="page"' : ''}><span class="navnum">01</span> Projects</a>
    <a href="${BASE}/all/" ${active === 'archive' ? 'aria-current="page"' : ''}><span class="navnum">02</span> Archive</a>
    <a href="https://github.com/hangryclaude" target="_blank" rel="noopener"><span class="navnum">03</span> GitHub</a>
  </div>
</nav>`;
}

const FOOT = `<footer class="site-foot">
  <div class="wrap">
    <span class="mono">© 2026 Angus Duncan</span>
    <span class="mono">built by hand, shipped by habit</span>
    <a class="mono" href="https://github.com/hangryclaude" target="_blank" rel="noopener">github/hangryclaude</a>
  </div>
</footer>`;

function page({ title, desc, body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="view-transition" content="same-origin">
${FAVICON}
${FONTS}
<link rel="stylesheet" href="${BASE}/assets/css/site.css">
</head>
<body>
${body}
${FOOT}
${REVEAL_JS}
</body>
</html>`;
}

const thumb = p => `${BASE}/assets/thumbs/${p.slug}.webp`;
const href = p => `${BASE}/projects/${p.slug}/`;

/* ── curated index ── */
function featuredCard(p, i) {
  return `<a class="feat" href="${href(p)}" data-reveal style="--d:${i * 60}ms">
  <div class="feat-img"><img ${i < 2 ? 'fetchpriority="high"' : 'loading="lazy"'} src="${thumb(p)}" alt="${esc(p.title)}"></div>
  <div class="feat-text">
    <span class="mono feat-num">${String(i + 1).padStart(2, '0')}</span>
    <p class="feat-title">${esc(p.title)}</p>
    <p class="feat-desc">${esc(p.tagline)}</p>
    <span class="mono feat-meta">${esc(p.category)}${p.lang ? ' · ' + esc(p.lang) : ''}${p.live ? ' · live' : ''}</span>
  </div>
</a>`;
}
function card(p, i) {
  return `<a class="card" href="${href(p)}" data-reveal style="--d:${(i % 3) * 60}ms">
  <div class="card-img"><img loading="lazy" src="${thumb(p)}" alt="${esc(p.title)} thumbnail"></div>
  <div class="card-text">
    <p class="card-title">${esc(p.title)}</p>
    <p class="card-desc">${esc(p.tagline)}</p>
  </div>
</a>`;
}

const featured = sel.featured.map(s => bySlug[s]);
const selected = sel.selected.map(s => bySlug[s]);

const indexBody = `${nav('projects')}
<main class="wrap">
  <header class="intro">
    <h1>Projects</h1>
    <p class="sub">I'm Angus. I'm 15 and I ship constantly — AI agents, cold email infrastructure, Mac tools, and things that move on screens. These are the ones that matter.</p>
  </header>
  <section class="cat">
    <div class="cat-head"><h2>Selected work</h2><span class="count mono">${String(featured.length).padStart(2, '0')}</span></div>
    <div class="grid-feat">
${featured.map(featuredCard).join('\n')}
    </div>
  </section>
  <section class="cat">
    <div class="cat-head"><h2>More projects</h2><span class="count mono">${String(selected.length).padStart(2, '0')}</span></div>
    <div class="grid">
${selected.map(card).join('\n')}
    </div>
  </section>
  <a class="archive-link" href="${BASE}/all/" data-reveal>
    <span class="big">The other ${projects.length - featured.length - selected.length}.</span>
    <span class="sub-line">Every repo, scrap, and one-night experiment — the full archive of ${projects.length} →</span>
  </a>
</main>`;

fs.writeFileSync(path.join(ROOT, 'index.html'),
  page({ title: 'Projects — Angus Duncan', desc: 'Selected work: AI agents, cold email at scale, Mac tools, and visuals that move.', body: indexBody }));

/* ── archive (/all/) ── */
const catId = c => c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const sections = categories.map(cat => {
  const items = projects.filter(p => p.category === cat);
  if (!items.length) return '';
  return `<section class="cat" id="${catId(cat)}">
  <div class="cat-head">
    <h2>${esc(cat)}</h2>
    <span class="count mono">${String(items.length).padStart(2, '0')}</span>
  </div>
  <div class="grid">
${items.map((p, i) => card(p, i)).join('\n')}
  </div>
</section>`;
}).join('\n');

const archiveBody = `${nav('archive')}
<main class="wrap">
  <header class="intro">
    <h1>The Archive</h1>
    <p class="sub">${esc(meta.subheading)}</p>
    <nav class="toc mono">
${categories.filter(c => projects.some(p => p.category === c)).map(c =>
  `      <a href="#${catId(c)}">${esc(c)} <span>${String(projects.filter(p => p.category === c).length).padStart(2, '0')}</span></a>`).join('\n')}
    </nav>
  </header>
${sections}
</main>`;

fs.mkdirSync(path.join(ROOT, 'all'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'all/index.html'),
  page({ title: 'Archive — Angus Duncan', desc: meta.subheading, body: archiveBody }));

/* ── detail pages ── */
let built = 0;
for (const p of projects) {
  const mdPath = path.join(ROOT, 'projects-content', `${p.slug}.md`);
  if (!fs.existsSync(mdPath)) { console.warn(`MISSING writeup: ${p.slug}`); continue; }
  const bodyHtml = md(fs.readFileSync(mdPath, 'utf8'));
  const links = [
    p.repo ? `<a class="btn mono" href="https://github.com/${p.repo}" target="_blank" rel="noopener">GitHub ↗</a>` : '',
    p.live ? `<a class="btn mono" href="${p.live}" target="_blank" rel="noopener">Live ↗</a>` : '',
  ].filter(Boolean).join('\n    ');
  const body = `${nav('projects')}
<main class="wrap detail">
  <a class="back mono" href="${BASE}/">← All projects</a>
  <header class="detail-head">
    <h1>${esc(p.title)}</h1>
    <div class="meta mono">
      <span>${esc(p.category)}</span>${p.lang ? `<span>${esc(p.lang)}</span>` : ''}<span>${esc(p.year || '2026')}</span>
    </div>
    <div class="actions">
    ${links}
    </div>
  </header>
  <div class="hero-img"><img src="${thumb(p)}" alt="${esc(p.title)}"></div>
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
console.log(`built curated index (${featured.length}+${selected.length}) + archive (${projects.length}) + ${built} detail pages`);
