# face-fx

Real-time webcam face & hand tracking with WebGL effects, rendered in the browser.

## What it does

Captures webcam video and runs three MediaPipe models in parallel — hand landmark detection, face mesh with blendshapes, and selfie segmentation — all GPU-accelerated. The results drive a WebGL canvas with real-time visual effects. `index.html` is the main 2D effects view; `cloud.html` is an alternate 3D point-cloud mode. Models load independently so the app degrades gracefully if any fail.

## Use

Open in a browser (requires a server for ES module imports):

```
npx serve .
# or
python3 -m http.server
```

- `index.html` — main FX view with HUD, controls, and recording toggle
- `cloud.html` — 3D point-cloud mode with depth estimation

Deployed on Vercel at the `face-fx` project.

## Stack

Vanilla JS + WebGL · MediaPipe Tasks Vision 0.10.14 · No build step · Vercel
