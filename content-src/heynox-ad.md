# heynox-ad — RPLY TikTok in-feed ad generator

Builds a premium 9-second vertical TikTok in-feed ad for **RPLY (Nox / heynox.com)**, modelled on
the Revolut in-feed ad (dark cinematic, minimal type, App-Store install card).

$0 to produce: real Nox brand assets + free-model brainstorming (`ai.cjs`) + ffmpeg/PIL. No paid
video/image generation. Reuses the `~/Tools/savic-ai` transition engine for whip/zoom cuts.

## Concept
Chaos of unread messages → one perfect reply. Tagline: **"leave read behind."**

Beats (`src/build.py`):
1. *be honest* — "you left them on read" (inbox footage)
2. *introducing* — "meet RPLY"
3. "it writes the perfect reply" (drafting footage)
4. "every app. one inbox." (unified hive view)
5. logo lockup — "leave read behind" · heynox.com

## How it works
- `src/chrome.py` — PIL renders the TikTok UI overlay (tabs, action rail, @hey.nox, caption,
  "Ad" + "RPLY · Get" install card, bottom nav).
- `src/beats.py` — each beat = real product screen-recording composited as a floating, glowing,
  rounded screen on a dark-purple gradient (from `hero-bg-purple.png`) + animated kinetic type
  (SF font), gentle push-in.
- `src/build.py` — renders beats → stitches with Savic whip/zoom transitions → overlays chrome →
  adds the synth sound bed → exports `out/rply_ad.mp4`.
- `src/audio.py` — synthesizes a dark bed: sub drone + warm pad + whoosh swishes synced to the
  transitions + a final shimmer.

## Run
```bash
cd ~/Tools/heynox-ad
# assets are copied from ~/nox-website/public (gitignored — re-copy if missing)
../savic-ai/.venv/bin/python src/build.py
open out/rply_ad.mp4
```

## Edit the ad
Change copy/timing/footage in the `SCRIPT` list in `src/build.py`. Swap `assets/*.mp4` for new
product clips. Tweak palette/fonts in `src/common.py`.
