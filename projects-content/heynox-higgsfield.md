# heynox-higgsfield

An AI-video cut of the RPLY tunnel ad. The live WebGL version (heynox-tunnel) already had perfectly on-brand frames, so the play here was image-to-video: feed those exact renders to Higgsfield as start frames, let it add cinematic camera motion and grade, stitch the clips.

## How it works
The repo is a production kit, not code: 16:9 and 9:16 start frames exported from the WebGL build, a `SHOTLIST.md` storyboard with per-shot prompts and motion presets, copy-paste `prompts.txt`, and `assemble.sh` (ffmpeg concat + audio) to produce `out/final.mp4` once the generated clips land in `clips/`. Generation needs a human with a Higgsfield account — the one step that can't be automated.

## Stack
Shell, ffmpeg, Higgsfield (image-to-video), WebGL-exported frames

## Status
Kit complete; final render blocked on Higgsfield credits.
