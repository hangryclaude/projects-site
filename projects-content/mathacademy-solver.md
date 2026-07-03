# Math Academy Solver

The v2 of the Math Academy auto-solver, and yes, it is exactly what it sounds like: a cheat tool. It reads the current question — text, answer choices, and this time the diagram image too — answers it with a vision model, fills it in, submits, and in Auto mode advances to the next question until it gets one wrong or runs out.

## How it works

A Chrome MV3 extension captures the question from the page and messages its background worker, which POSTs to a local server on `127.0.0.1:7676`. The server routes through the shared `ai.cjs` brain: free GitHub Models `gpt-4o` vision by default ($0), auto-upgrading to Claude Sonnet if an Anthropic key exists. Doing the localhost fetch from the background worker instead of the page sidesteps Chrome's mixed-content and private-network blocking — the diagram never leaves the machine except to the model API. A floating panel offers "Solve one" and "Auto-solve all"; every call logs to the spend tracker.

Supports multiple choice (clicks the option), MathQuill free response (best-effort typing), and diagram questions via vision.

## Stack

Chrome extension (MV3), Node.js local server, GitHub Models gpt-4o / Claude Sonnet vision, ai.cjs free-first router

## Status

Working. Kept local and quiet, for obvious reasons.
