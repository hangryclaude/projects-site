#!/usr/bin/env node
/* merge-entries.cjs — data/entries-*.json → data/projects.json */
const fs = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '../data');

const ORDER = ['growth', 'agents', 'macos', 'web', 'markets'];
const CATEGORIES = [
  'Growth machine',
  'AI agents & orchestration',
  'macOS power tools',
  'Web & creative',
  'Markets & bots',
];

const projects = [];
for (const key of ORDER) {
  const f = path.join(DATA, `entries-${key}.json`);
  if (!fs.existsSync(f)) { console.error(`missing ${f}`); process.exit(1); }
  const entries = JSON.parse(fs.readFileSync(f, 'utf8'));
  projects.push(...entries);
}

const seen = new Set();
for (const p of projects) {
  if (seen.has(p.slug)) { console.error(`dup slug ${p.slug}`); process.exit(1); }
  seen.add(p.slug);
  const md = path.join(__dirname, '../projects-content', `${p.slug}.md`);
  if (!fs.existsSync(md)) console.warn(`WARN no writeup for ${p.slug}`);
}

const out = {
  meta: {
    title: 'Projects — Angus Duncan',
    heading: 'Projects',
    subheading: `${projects.length} things I actually shipped, out of a lot more repos than that. Agents, cold email at scale, Mac tools, and websites that move.`,
  },
  categories: CATEGORIES,
  projects,
};
fs.writeFileSync(path.join(DATA, 'projects.json'), JSON.stringify(out, null, 2));
console.log(`merged ${projects.length} projects across ${CATEGORIES.length} categories`);
