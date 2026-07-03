# AI VFX Reel

Feed it anything — a brand, a logo, an emoji, a photo of yourself — and get back a finished vertical 9:16 reel in the viral "how did they make this" style: a mascot living in a real place, a 2D icon come alive, a giant product orbiting a model.

## How it works

A Claude Code skill. It classifies the subject into one of five archetypes, writes the production pack itself — reference-image prompt, per-shot cinematic motion prompts, hook caption, audio direction — as a `spec.json`, then a Node script renders it through fal.ai (Flux/nano-banana for the locked reference still, Veo 3/Kling/Wan for image-to-video) and stitches, crops, and captions with ffmpeg. 2–4 shots, ≤8s each, ~$1–2 per reel. No `FAL_KEY`? It still writes the full prompt pack so nothing is wasted.

## Stack

Node.js, fal.ai (Veo 3, Kling, Wan, Flux), ffmpeg

## Status

Working skill. Output lands in ~/reels/<slug>/.
