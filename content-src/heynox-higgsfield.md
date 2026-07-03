# heynox-higgsfield — AI-video cut of the RPLY tunnel ad

A **separate** companion to the live WebGL experience (`~/Tools/heynox-tunnel`,
https://heynox-tunnel.vercel.app). That stays exactly as-is. This project explores
making a **cinematic AI-video** version of the same story using
[Higgsfield](https://higgsfield.ai/ai/video) (text-to-video + image-to-video with
dramatic camera-motion presets).

## The idea
Higgsfield's strength is animating a **start image** with cinematic camera motion.
We already have perfectly on-brand frames straight out of the WebGL build, so the
fastest path to a premium AI cut is **image-to-video**: upload our renders as the
start frame, let Higgsfield add motion + filmic polish, then stitch the clips.

- `startframes/`           — landscape (16:9) start images exported from the WebGL
- `startframes-vertical/`  — 9:16 versions for TikTok/Reels
- `clips/`                 — drop the Higgsfield-generated clips here (name them `01.mp4`, `02.mp4`, …)
- `audio/`                 — drop a music/SFX track here as `track.mp3` (or capture the WebAudio from the live site)
- `SHOTLIST.md`            — the storyboard: per-shot prompt + which start frame + motion preset
- `prompts.txt`            — just the prompts, copy-paste ready
- `assemble.sh`            — ffmpeg: concatenate `clips/01..05.mp4` (+ optional audio) → `out/final.mp4`

## How to run it (needs YOUR Higgsfield account)
I can't sign up, log in, or spend credits on Higgsfield, so this part is yours:
1. Open https://higgsfield.ai/ai/video and sign in.
2. For each shot in `SHOTLIST.md`: choose **Image-to-Video**, upload the listed
   start frame, paste the prompt, pick the suggested motion preset, generate.
   (For the tunnel-flight shots you can also try **Text-to-Video** with the same prompt.)
3. Download each clip into `clips/` as `01.mp4 … 05.mp4`.
4. `bash assemble.sh` → `out/final.mp4`.

## Two routes
- **Hybrid (recommended):** image-to-video from our WebGL frames → keeps the exact
  brand look, Higgsfield just adds motion/grade. Most consistent.
- **Full AI:** text-to-video from the prompts only → more "AI cinematic," less
  controllable, characters/icons may drift off-brand.

Keep this isolated from the WebGL repo and from Angus's other infra.
