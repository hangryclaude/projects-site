# howdynox

Static clone of the RPLY (heynox.com) marketing site, parked on howdynox.com as a download-campaign funnel. Every "Download for Mac" button on the page is intercepted and pointed wherever the campaign needs — the installer, an App Store page, a tracking link.

## How it works
Plain HTML mirror of the real site plus one `redirect.js` with a single `REDIRECT_URL` constant. Change the line, change where every button goes. `vercel.json` gives it clean URLs. It got superseded fast: the static mirror couldn't reproduce the hero animations, so the campaign switched to deploying the real site source (see howdynox-app).

## Stack
HTML, vanilla JS, Vercel

## Status
Parked — replaced by howdynox-app, which serves the actual howdynox.com.
