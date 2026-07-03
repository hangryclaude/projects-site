# MathSnap

Drag-select any math problem on your screen — a textbook PDF, a photo, a website — and get it solved instantly, answer spoken aloud. Homework-speed math without retyping anything into a calculator.

## How it works

It chains three things that already exist on a Mac. `screencapture -i` gives you the native crosshair region-select; the captured image goes to Claude Sonnet via the Anthropic vision API with a prompt that demands the answer first, then concise step-by-step working; the result comes back as a native macOS dialog and gets read aloud via TTS through `osascript`.

Runs two ways: straight from the command line as a Node script, or as a Raycast script command — install `mathsnap.raycast.sh` and it shows up as "MathSnap" in Raycast and runs silently. Reads `ANTHROPIC_API_KEY` from the environment. This is the one tool in the stable that intentionally uses the paid Anthropic API rather than the free model chain — vision quality matters when the input is a blurry screenshot of handwriting.

## Stack

Node.js (ESM), Claude Sonnet vision API, macOS screencapture + osascript, Raycast

## Status

Working — CLI and Raycast command both live.
