# Lusion Wallpaper

A dark, iridescent WebGL fluid that reacts to your cursor — generative art meant to sit on your desktop as a live wallpaper. Six octaves of noise pretending to be a lava lamp.

## How it works

A fragment shader renders domain-warped fractional Brownian motion: six octaves of noise feed a two-pass warp, which is what produces the slow, organic fluid motion instead of the usual static-y noise look. The cursor exerts a gravitational pull on the flow field, and faster mouse movement injects more energy. Color comes from a cosine palette cycling through deep purples, blues, and iridescent highlights — the Lusion-studio dark-glow register. `F` toggles fullscreen, `S` saves the current frame as a PNG.

Everything is one HTML file. No server, no npm, no build step — open `index.html` and it runs.

## Stack

Single-file HTML, WebGL, GLSL

## Status

Live at lusion-wallpaper.vercel.app.
