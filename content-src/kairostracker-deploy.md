KAIROS TRACKER — Deployment Instructions
========================================
Domain: kairostracker.com

WHAT THIS IS
------------
A single-page web app (gamified classroom tracker). The entire app is
one file: index.html. No build step, no dependencies, no server needed.

HOW TO DEPLOY
-------------
1. Upload index.html to the web host for kairostracker.com
2. That's it. There is no step 2.

The file goes in the root directory of the site so it loads at
kairostracker.com (not kairostracker.com/index.html — though that
will also work).

HOSTING OPTIONS
---------------
Any static hosting works:
  - Netlify: drag & drop the folder at app.netlify.com/drop
  - Vercel: import the folder
  - GitHub Pages: push to a repo, enable Pages
  - Traditional hosting (GoDaddy, Bluehost, etc.): upload via FTP
  - Cloudflare Pages: connect a repo or direct upload

FIREBASE (ALREADY CONFIGURED)
------------------------------
The Firebase Realtime Database is already set up and the config is
embedded in the file. No additional setup needed — it will sync
data in real time as soon as it's live.

REQUIREMENTS
------------
- A web host pointed to kairostracker.com
- That's it. No Node.js, no database, no server-side code.

NOTES
-----
- The file is ~12,000 lines but it's fully self-contained (HTML + CSS + JS)
- All fonts load from Google Fonts CDN
- Firebase SDK loads from Google's CDN
- Works on desktop, tablet, and mobile
