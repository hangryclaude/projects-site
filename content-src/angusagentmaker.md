# Angus Agent Maker — angusagentmaker.com

Clean landing page for a Santa Barbara local AI-agent service for businesses.
Phone-number signup → Angus texts the lead → builds them a Claude-powered agent.

- `index.html` — single-page site (dark, Claude coral, inline SVG burst logo)
- `api/signup.js` — captures phone numbers (Vercel Blob if BLOB_READ_WRITE_TOKEN set, else logs)

## Run locally
    npx serve .          # or any static server; /api needs `vercel dev`

## Deploy
    vercel --prod
