# SavicAI — learn Nikolai Savic's transitions, auto-apply them to your footage

Trains AI on **Nikolai Savic's** signature transitions (whip pans, zoom blurs, mask reveals,
speed ramps, match cuts), then **auto-edits your own clips** into a vertical short-form with
those transitions placed in the mix he actually uses.

Built for an **Apple M4 Pro, no NVIDIA GPU** — everything in v1 runs locally and free.
All AI brainstorming/labeling routes through the free model chain (`~/Tools/lib/ai.cjs`),
never the paid Anthropic plan.

## What it does (v1, all local)
1. **Pull** his public clips (`yt-dlp`).
2. **Detect** every cut (`PySceneDetect`).
3. **Extract** the frames around each cut + compute motion features (OpenCV optical flow).
4. **Label** each cut's transition type with the **free vision model**.
5. **Train** a local detector (sklearn) → learns his *signature transition mix*.
6. **Auto-edit**: normalize your clips → insert his transitions (ffmpeg `xfade`) → optional
   motion-smoothed seams → export a vertical MP4.

## Quick start
```bash
cd ~/Tools/savic-ai
# full pipeline (learn from him, then make a demo from samples/):
.venv/bin/python src/pipeline.py --url "https://www.tiktok.com/@nikolaisavic" --max 15

# already have footage? just auto-edit it:
.venv/bin/python src/autoedit.py --clips /path/to/your/clips --out out/myedit.mp4 --smooth

# re-cut a single long video with his transitions:
.venv/bin/python src/autoedit.py --from-video data/raw/<id>.mp4 --out out/recut.mp4
```

## Transitions
| Savic technique | engine (v1) |
|---|---|
| whip_pan | xfade smoothleft/right, 0.22s |
| zoom_blur | xfade zoomin, 0.42s |
| mask_reveal | xfade circleopen, 0.45s |
| speed_ramp | xfade smoothup, 0.18s |
| match_cut | xfade fade, 0.14s |

## Hardware / cost
- **v1 = your Mac, $0.** Detector is a motion-feature classifier; transitions are ffmpeg.
- **Phase 2 (parked, `runpod/`):** rent an RTX 4090/5090 (~$10) only if you want a deep video
  classifier or a generative FLF2V LoRA. Buying a dedicated NVIDIA PC (~$3–3.8k) only pays off
  past ~50 train-hours/month — not yet.

## Editing platform
ffmpeg renders the transitions headless here. For hand-finishing, **DaVinci Resolve** (free,
best on Apple Silicon) — drop `out/*.mp4` on a timeline and grade. CapCut for a fast mobile pass.
