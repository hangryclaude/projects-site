# mathsnap

Drag-select any math problem on screen and get it solved instantly — answer spoken aloud.

## What it does

Uses your screen's interactive region-select (`screencapture -i`) to capture a math problem, sends the image to Claude Sonnet via the Anthropic Vision API, and returns the answer. The result appears in a native macOS dialog notification and is read aloud via TTS. Answer comes first, then concise step-by-step working.

## Run

**Command line:**
```bash
node ~/Tools/mathsnap/mathsnap.mjs
```

**Raycast:** Install `mathsnap.raycast.sh` as a Raycast script command — it appears as "MathSnap" (🧮) and runs silently.

Reads `ANTHROPIC_API_KEY` from the environment or `~/Tools/jarvis/.env`.

## Stack

Node.js (ESM) · Claude Sonnet 4.6 vision API · macOS `screencapture` + `osascript` · Raycast script integration.

> Uses the Anthropic API directly — not the free AI chain, so it draws on your Anthropic key.
