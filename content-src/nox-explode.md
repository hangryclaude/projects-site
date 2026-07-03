# nox-explode

**Live:** https://nox-explode.vercel.app
*Click-to-detonate slow-motion explosion toy, rendered on a canvas.*

## What it does

Opens a black fullscreen canvas. Click anywhere to trigger a particle explosion. A bottom control panel lets you dial in the slow-motion playback speed (0.03×–1×), the blast force, and particle density in real time. The **Replay** button re-runs the last detonation with current settings.

## Use

Open `index.html` directly in a browser — no server, no build step, no dependencies.

```
open index.html
```

All controls are on-screen. There are no CLI flags or config files.

## Stack

Single self-contained HTML file — vanilla JS, Canvas 2D API, CSS backdrop-filter. No framework, no AI chain, no network calls.
