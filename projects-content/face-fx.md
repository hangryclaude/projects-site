# Face FX

Point your webcam at yourself and get real-time WebGL effects driven by your face and hands, entirely in the browser. No server, no upload — your face never leaves the tab.

## How it works

Three MediaPipe Tasks Vision models run in parallel on the GPU: hand landmark detection, face mesh with blendshapes, and selfie segmentation. Their outputs drive a WebGL canvas every frame. Each model loads independently, so if one fails the rest keep working. Two views: `index.html` is the main 2D effects mode with a HUD, controls, and a recording toggle; `cloud.html` re-renders you as a 3D point cloud with depth estimation.

## Stack

Vanilla JS, WebGL, MediaPipe Tasks Vision 0.10.14, no build step, Vercel

## Status

Working. Deployed on Vercel.
