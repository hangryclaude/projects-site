# Engram

An in-depth, free Enneagram test — dark UI, text-to-speech, animated — because the good ones charge and the free ones are shallow.

## How it works

Scores all 9 types from weighted Likert items, then runs a forced-choice tiebreaker between close types (RHETI-style, to bypass ego-defense answering). Reports core type plus wing, tritype, and instinctual variant with a full score chart. The item bank isn't hand-written: `gen-items.cjs` regenerates `data/items.json` from the free AI chain at $0.

## Stack

Static HTML/CSS/JS, Web Speech API (TTS), Node generator script on the free AI chain

## Status

Working — runs from any static host, `vercel --prod` to deploy.
