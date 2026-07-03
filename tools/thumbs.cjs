#!/usr/bin/env node
/* thumbs.cjs — one thumbnail per project into assets/thumbs/<slug>.webp
 * Screenshot if entry.shot URL is set (or slug in SHOTS below), else seeded
 * generative tile via tile.html. Run: NODE_PATH=$(npm root -g) node tools/thumbs.cjs [slug ...]
 */
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'assets/thumbs');
const { projects } = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/projects.json'), 'utf8'));

/* live pages worth shooting (slug → url). Everything else gets a tile. */
const SHOTS = {
  'madebyangus': 'https://agentworks-xi.vercel.app',
  'plinth': 'https://plinth-mauve.vercel.app',
  'website-maker': 'https://wm-showcase.vercel.app',
  /* lusion-wallpaper renders black in headless WebGL — tile instead */
  'ai-brain': 'http://localhost:7910',
  'nox-bullet': 'https://hangryclaude.github.io/nox-bullet/',
};

const CAT_KEY = {
  'Growth machine': 'growth',
  'AI agents & orchestration': 'agents',
  'macOS power tools': 'macos',
  'Web & creative': 'web',
  'Markets & bots': 'markets',
};

async function toWebp(page, pngBuffer) {
  return page.evaluate(async (b64) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    c.getContext('2d').drawImage(img, 0, 0);
    return c.toDataURL('image/webp', 0.88).split(',')[1];
  }, pngBuffer.toString('base64'));
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const only = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 750 }, deviceScaleFactor: 2 });
  const results = { shot: [], tile: [], failed: [] };

  for (const p of projects) {
    if (only.length && !only.includes(p.slug)) continue;
    const dest = path.join(OUT, `${p.slug}.webp`);
    const url = SHOTS[p.slug];
    try {
      let png;
      if (url) {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 }).catch(() => {});
        await page.waitForTimeout(3500); // let WebGL/animations settle into something
        png = await page.screenshot({ type: 'png' });
        results.shot.push(p.slug);
      } else {
        const tileUrl = 'file://' + path.join(__dirname, 'tile.html') +
          `?slug=${encodeURIComponent(p.slug)}&cat=${CAT_KEY[p.category] || 'agents'}`;
        await page.goto(tileUrl);
        await page.waitForFunction('window.__done === true', { timeout: 5000 });
        png = await page.locator('#c').screenshot({ type: 'png' });
        results.tile.push(p.slug);
      }
      const webpB64 = await toWebp(page, png);
      fs.writeFileSync(dest, Buffer.from(webpB64, 'base64'));
      console.log(`${url ? 'SHOT' : 'TILE'} ${p.slug} (${(fs.statSync(dest).size / 1024).toFixed(0)}kb)`);
    } catch (e) {
      results.failed.push(`${p.slug}: ${e.message.split('\n')[0]}`);
      console.error(`FAIL ${p.slug}: ${e.message.split('\n')[0]}`);
    }
  }
  await browser.close();
  console.log(`\nshots=${results.shot.length} tiles=${results.tile.length} failed=${results.failed.length}`);
  if (results.failed.length) { console.log(results.failed.join('\n')); process.exit(1); }
})();
