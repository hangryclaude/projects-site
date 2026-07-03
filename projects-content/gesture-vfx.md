# Gesture VFX

Hollywood-adjacent VFX on my own phone footage, tracked to my actual body — free and local, no AI video generator involved.

## How it works

`vfx.py` runs three MediaPipe models (pose, hands, selfie segmentation) over a source clip frame by frame, then draws effects locked to the tracked landmarks: neon hand trails with additive multi-radius Gaussian bloom, a glowing pose skeleton, ghost echoes cut from the segmentation mask, frozen hand clones, and a Matrix-rain "hacker" mode with scanline vignettes. The clones mode even extracts the audio track with ffmpeg, computes RMS onsets, and snaps clone reveals to the beat. Frames pipe straight into an ffmpeg libx264 encode — no intermediate files.

## Stack

Python, MediaPipe 0.10.14, OpenCV, NumPy, ffmpeg

## Status

Working. Six modes rendered from real footage; outputs sit next to the source clip.
