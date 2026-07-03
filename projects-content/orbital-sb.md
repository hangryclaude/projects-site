# ORBITAL

A satellite ground station for the world's abandoned places. It boots like a terminal — green-on-black CRT, scanlines, boot sequence — drops you on a spinning WebGL Earth pinned with 64 real, documented abandoned sites (Pripyat, Hashima Island, Kolmanskop, Varosha, Bodie), then deploys onto live satellite imagery to sweep any area for abandoned structures.

## How it works

The globe is globe.gl; the deploy view is Leaflet over ArcGIS World Imagery. The sweep does real pixel analysis: it scores neglect from the imagery (overgrowth scores up, manicured lawns and pools score down) and diffs against Esri Wayback time-lapse tiles for a then-vs-now read. Auto-pilot mode logs ranked candidates hands-free. Bring a free Gemini/Groq/OpenRouter key and it researches documented abandoned places near your area and pins them with dossiers — the key stays in your browser. Saved spots stream to a Google Doc via an Apps Script webhook. All of it is one `index.html`: no build, no backend, keyless imagery.

## Stack

Single-file HTML, vanilla JS, Leaflet, globe.gl, ArcGIS World Imagery, Esri Wayback

## Status

Live at orbital-sb.vercel.app. Documented sites are real — don't trespass.
