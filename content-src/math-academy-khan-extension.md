# Khan Academy Video for Math Academy

A Chrome extension that puts the right Khan Academy video one click away, right inside a Math Academy lesson.

Math Academy tells you *what* to learn but not always *how*. This extension reads the topic you're working on and drops a floating **▶ Play Video** button on the page. Click it and the matching Khan Academy explainer opens in a popup player, so you never leave the lesson.

It finds videos by live search using your own YouTube Data API key, so there's no stale bundled list. It also remembers: paste a YouTube URL for a topic once and it's saved locally, instant next time.

## Install

1. `git clone https://github.com/hangryclaude/math-academy-khan-extension.git`
2. Go to `chrome://extensions`, turn on **Developer mode** (top right).
3. Click **Load unpacked** and select the cloned folder.
4. Open the extension popup and paste a [YouTube Data API v3 key](https://developers.google.com/youtube/v3/getting-started) (free).
5. Open any lesson on **mathacademy.com** — the floating play button appears.

## Features

- **▶ Floating player** — a non-intrusive button on every Math Academy page; opens the video in a popup window (no in-page CSP conflicts).
- **Live search** — pulls the best-matching Khan Academy video on demand via the YouTube Data API. No bundled, outdated mappings.
- **Self-improving memory** — override any topic with your own video URL; it's saved locally and reused automatically.
- **Topic-aware** — ships with a large Math Academy topic map so it knows what you're actually studying.
- **Private by design** — your API key lives only in `chrome.storage.local`. No analytics, no servers, nothing leaves your browser.

## How it works

```
mathacademy.com lesson
        │  content.js reads the current topic
        ▼
  saved override?  ──yes──►  open your stored video
        │ no
        ▼
  YouTube Data API search  ──►  best Khan Academy match  ──►  floating popup player
```

`khan-topics.js` holds the topic map, `db.js` manages the local override store, `content.js` injects the button and resolves the video, and `player.html` renders the popup. Manifest V3, service-worker background, zero external dependencies.

## Stack

Chrome Extension (Manifest V3) · vanilla JavaScript · YouTube Data API v3 · `chrome.storage.local`

## License

MIT. Fork it, improve the topic map, add your own subjects.

Built by [HANGRY](https://github.com/hangryclaude).
