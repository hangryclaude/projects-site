# ORBITAL // Abandoned Recon 🛰

A satellite-terminal for the world's abandoned places. Boots like a ground
station, drops you on a spinning 3D Earth studded with **64 real, documented
abandoned sites** — Pripyat, Hashima Island, Kolmanskop, Varosha, Bodie —
then deploys onto live satellite imagery to sweep any area on the planet for
abandoned structures.

## What it does

- **Globe target-select** — boot lands on a WebGL Earth (globe.gl). Click a
  red beacon for a researched dossier on a documented abandoned site, click
  any ground to free-deploy, or search any city/town.
- **World registry** — 64 researched, publicly documented abandoned places
  with stories, dates and recon notes, pinned on the globe and the map.
- **Abandoned-structure sweep** — real pixel analysis of ArcGIS World Imagery
  plus Esri Wayback time-lapse (then vs now) to score neglect: overgrowth up,
  manicured lawns/pools down. Auto-pilot mode logs ranked candidates hands-free.
- **Intel uplink (bring your own free key)** — plug in a free Gemini / Groq /
  OpenRouter API key and ORBITAL researches real documented abandoned places
  near your current area of operations and pins them with dossiers. The key
  lives only in your browser; calls go directly from you to the provider.
- **Save to Google Doc** — one-time Apps Script webhook setup, then every
  saved spot streams straight into your own doc.
- **Terminal aesthetic** — green-on-black CRT, boot sequence, scanlines,
  inspection bay with thermal/night/topo views.

## Run

```bash
open index.html
# or serve it:
python3 -m http.server 8080
```

## Stack

Single `index.html` · vanilla JS · Leaflet 1.9 · globe.gl · ArcGIS World
Imagery + Esri Wayback (keyless) · no build, no backend.

---

ORBITAL is a recon simulation for exploration and research. Documented sites
are real — always research legal access and permission. Never trespass.
