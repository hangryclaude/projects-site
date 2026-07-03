# howdynox.com

Static clone of the RPLY (heynox.com) marketing site, served on **howdynox.com** as a
download-campaign funnel. Every "Download for Mac" button is intercepted and redirected.

## Change where the download button goes
Edit the one line in [`redirect.js`](./redirect.js):

```js
var REDIRECT_URL   = "https://nox-website.s3.us-east-2.amazonaws.com/RPLY.dmg"; // ← destination
var ALSO_START_DMG = false; // true = start the real .dmg download AND then redirect
```

Point it at the real installer, an App Store page, or a tracking/attribution link.

## Run locally
```bash
python3 -m http.server 8899   # → http://localhost:8899
```

## Deploy
Static site. `vercel.json` enables clean URLs (`/pricing` serves `pricing.html`).
Deploy the folder to any static host (Vercel / Cloudflare Pages / Netlify) and assign
the `howdynox.com` domain.

_Source of truth for the real app: github.com/nox-devices/nox-website. This is a static
mirror for the campaign domain only — not the live app/backend._
