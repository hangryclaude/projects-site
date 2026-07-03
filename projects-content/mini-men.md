# Mini Men

A generator for the viral TikTok genre where tiny construction workers build giant food. One command turns a subject — "pizza", "ramen bowl", "giant sneaker" — into a finished 9:16 reel with caption and hashtags, for $1–2 per video.

## How it works

All the genre knowledge is baked into a single CLI: phase templates (site prep → assembly → detail work → reveal), a prompt formula for the tilt-shift miniature-diorama look, a gag bank, and caption generation. It renders image-first — per-phase stills carry the miniature aesthetic, then image-to-video models (Kling 2.5 Pro by default; Wan for drafts, Veo 3 for hero tier) add motion, and ffmpeg stitches the 1080×1920 output. Runs through the ai-vfx-reel pipeline on fal.ai.

Two rules are load-bearing. Orange vests, yellow hard hats, and tilt-shift language are genre constants — restyle them and it stops reading as the genre. And every video keeps a peril gag ("someone's in the oven"), because that's the comment engine.

`--ideas 10` prints subjects for free, `--series 3 --render` batches videos, `--dry` previews the full spec and prompts without spending anything.

## Stack

Node, fal.ai (Kling 2.5 Pro / Wan / Veo 3, flux stills), ffmpeg

## Status

Working — ships as a Claude Code skill; renders take 2–5 min per shot.
