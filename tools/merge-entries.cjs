#!/usr/bin/env node
/* merge-entries.cjs — data/entries-*.json → data/projects.json */
const fs = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '../data');

const CATEGORIES = [
  'Growth machine',
  'NOX & RPLY',
  'AI agents & orchestration',
  'macOS power tools',
  'Web & creative',
  'Commerce & hustles',
  'School & learning',
  'Markets & bots',
  'Games, family & chaos',
  'Scraps & experiments',
];

/* move some wave-1 entries into the NOX section */
const RECAT = {
  'creator-hunt': 'NOX & RPLY',
  'heynox-tunnel': 'NOX & RPLY',
  'nox-bullet': 'NOX & RPLY',
  'crew-kit': 'Web & creative', // B1 writer confirmed it's madebyangus component lib, not NOX tooling
};

const projects = [];
for (const f of fs.readdirSync(DATA).filter(f => /^entries-.*\.json$/.test(f)).sort()) {
  projects.push(...JSON.parse(fs.readFileSync(path.join(DATA, f), 'utf8')));
}

const seen = new Set();
for (const p of projects) {
  if (seen.has(p.slug)) { console.error(`dup slug ${p.slug}`); process.exit(1); }
  seen.add(p.slug);
  if (RECAT[p.slug]) p.category = RECAT[p.slug];
  if (!CATEGORIES.includes(p.category)) { console.error(`bad category "${p.category}" on ${p.slug}`); process.exit(1); }
  const md = path.join(__dirname, '../projects-content', `${p.slug}.md`);
  if (!fs.existsSync(md)) console.warn(`WARN no writeup for ${p.slug}`);
}

/* stable order: category order, then title */
projects.sort((a, b) =>
  CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category) ||
  a.title.localeCompare(b.title));

const out = {
  meta: {
    title: 'Projects — Angus Duncan',
    heading: 'Projects',
    subheading: `All ${projects.length} of them — every repo, tool, site, bot, and experiment. Some are live products, some died in a day. That's the point.`,
  },
  categories: CATEGORIES,
  projects,
};
fs.writeFileSync(path.join(DATA, 'projects.json'), JSON.stringify(out, null, 2));
console.log(`merged ${projects.length} projects across ${CATEGORIES.length} categories`);
