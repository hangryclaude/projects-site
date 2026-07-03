# Khan Academy Video for Math Academy

The legitimate sibling of the solver tools. Math Academy tells you *what* to learn but not always *how* — this Chrome extension reads the topic you're on and drops a floating Play Video button that opens the matching Khan Academy explainer in a popup, without leaving the lesson.

## How it works

`content.js` reads the current topic from the page and checks a local override store first — paste a YouTube URL for a topic once and it's saved in `chrome.storage.local`, instant next time. No override? It live-searches the YouTube Data API (your own free key) for the best Khan Academy match, so there's no stale bundled video list. The video opens in a popup window rather than an iframe, dodging Math Academy's CSP. Ships with a large Math Academy topic map; the API key never leaves the browser.

## Stack

Chrome extension (Manifest V3), vanilla JavaScript, YouTube Data API v3, chrome.storage.local

## Status

Working. MIT licensed — fork it and add your own subjects.
