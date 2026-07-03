# heynox-ad

A 9-second vertical TikTok in-feed ad for RPLY, modeled shot-for-shot on Revolut's — dark, cinematic, minimal type, App Store install card — produced for $0. No paid video or image generation anywhere in the pipeline.

## How it works
Five beats scripted in `src/build.py`: "you left them on read" → "meet RPLY" → drafting footage → "every app. one inbox." → logo lockup with the tagline **"leave read behind."** Each beat composites a real product screen recording as a floating glowing screen on a purple gradient, with kinetic SF-font type. `src/chrome.py` PIL-renders the full TikTok UI overlay (action rail, caption, "Ad · RPLY · Get" card); `src/audio.py` synthesizes the sound bed from scratch — sub drone, pad, whooshes synced to the whip/zoom transitions borrowed from the savic-ai engine. ffmpeg stitches it into `out/rply_ad.mp4`.

## Stack
Python, PIL, ffmpeg, numpy audio synthesis, savic-ai transition engine

## Status
Working — renders the finished ad locally on one command.
