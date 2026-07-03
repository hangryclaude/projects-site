# Engram — The Honest Enneagram Test

An in-depth, free Enneagram test (dark UI, TTS, animated).
- Scores all 9 types from weighted Likert items
- Forced-choice tiebreaker between close types (RHETI-style ego-defense bypass)
- Reports core type + **wing**, **tritype**, and **instinctual variant**
- Full score chart

## Run locally
    npx serve .        # or: python3 -m http.server 8080

## Regenerate item bank (free AI, $0)
    node gen-items.cjs   # writes data/items.json

## Deploy
    vercel --prod
