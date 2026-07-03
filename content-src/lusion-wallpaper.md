# lusion-wallpaper

**Live:** https://lusion-wallpaper.vercel.app
*A dark, iridescent WebGL fluid that reacts to your cursor.*

## What it does

Renders a domain-warped fractional Brownian motion flow field in WebGL. Six octaves of noise feed a two-pass warp that produces slow, organic fluid motion. The cursor exerts a gravitational pull on the flow field; faster mouse movement injects more energy. Color comes from a cosine-palette that shifts through deep purples, blues, and irridescent highlights — Lusion-style dark glow. Runs entirely in the browser, no server, no dependencies.

## Use

Open `index.html` in any modern browser — that's it.

| Key | Action |
|-----|--------|
| Move mouse | Warps the flow field |
| `F` | Toggle fullscreen |
| `S` | Save the current frame as a PNG |

## Stack

Single-file HTML + WebGL (GLSL) — no build step, no npm, no paid API.
