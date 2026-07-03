# angusangus.com

Angus Duncan's personal calling card — a flowtype generative-art page (andrew.net technique):
the ∞ glyph baked into a 3D SDF, sphere-traced, and printed out of live variable-weight type.
Drag rotates, scroll zooms. No build, no framework.

## Run
```bash
python3 -m http.server 8080   # ES modules need http://
```

## Deploy (Cloudflare Pages)
```bash
npx wrangler pages deploy . --project-name=angusangus
```
Custom domain angusangus.com is attached to the Pages project (zone lives in the same CF account).

All look-and-feel lives in `SITE_CONFIG` inside index.html; `engine.js` is the verbatim
flowtype-site engine — don't edit it.
