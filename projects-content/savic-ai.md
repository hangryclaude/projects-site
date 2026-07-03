# SavicAI

Nikolai Savic is a short-form editor with a recognizable style — whip pans, zoom blurs, mask reveals, speed ramps. SavicAI watches his public catalog, learns his actual transition mix, then auto-edits your footage the way he would cut it.

## How it works

`yt-dlp` pulls his clips, PySceneDetect finds every cut, OpenCV optical flow extracts motion features around each one, and a free vision model labels the transition type. A local sklearn classifier trains on those labels to learn his signature distribution. The auto-editor then normalizes your clips and inserts the transitions with ffmpeg `xfade` (each Savic technique mapped to a tuned xfade + duration), exporting a vertical MP4. All of v1 runs locally on an M4 Pro for $0 — the AI labeling routes through the free model chain. A parked phase 2 (`runpod/`) covers renting a 4090 for a deep classifier, with the math on why buying a GPU box doesn't pay off yet.

## Stack

Python, yt-dlp, PySceneDetect, OpenCV, scikit-learn, ffmpeg

## Status

v1 working locally; GPU phase parked on purpose.
