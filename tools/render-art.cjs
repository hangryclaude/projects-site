#!/usr/bin/env node
/* render-art.cjs — screenshot every tools/art/<slug>.html → assets/thumbs/<slug>.webp
 * Run: NODE_PATH=$(npm root -g) node tools/render-art.cjs [slug ...]
 */
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const ART = path.join(__dirname, 'art');
const OUT = path.join(__dirname, '../assets/thumbs');

(async () => {
  const only = process.argv.slice(2);
  const files = fs.readdirSync(ART).filter(f => f.endsWith('.html'))
    .map(f => f.replace('.html', ''))
    .filter(s => !only.length || only.includes(s));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1300, height: 850 }, deviceScaleFactor: 2 });
  for (const slug of files) {
    await page.goto('file://' + path.join(ART, slug + '.html'));
    await page.waitForTimeout(250);
    const png = await page.locator('#frame').screenshot({ type: 'png' });
    const webpB64 = await page.evaluate(async (b64) => {
      const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      c.getContext('2d').drawImage(img, 0, 0);
      return c.toDataURL('image/webp', 0.9).split(',')[1];
    }, png.toString('base64'));
    fs.writeFileSync(path.join(OUT, slug + '.webp'), Buffer.from(webpB64, 'base64'));
    console.log('ART', slug);
  }
  await browser.close();
  console.log(`rendered ${files.length} art tiles`);
})();
