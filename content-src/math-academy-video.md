# math-academy-video

A Chrome extension that surfaces Khan Academy YouTube videos while you study on Math Academy.

## What it does

Khan Booster adds a floating "Play Video" pill to every Math Academy lesson page. When clicked, it resolves the current topic to a matching Khan Academy YouTube video — using a built-in topic map, a YouTube Data API search (optional), or a scrape-based fallback that requires no API key — then opens the video in a floating popup window that bypasses Math Academy's Content Security Policy. The popup has four tabs: **Now** (current topic), **Saved** (user-pinned mappings), **History** (last 200 opens), and **Settings** (enable/disable toggle, YouTube API key). All topic mappings, history, and stats are stored locally in `chrome.storage.local`.

## Run

Load as an unpacked extension from `chrome://extensions` with **Developer mode** on.

```
# Point Chrome at this directory as an unpacked extension.
# No build step required — plain JS/HTML/CSS.
```

Test the content-script UI without a live Math Academy session:

```
open test.html   # in a browser tab
```

Validate the bundled topic-to-YouTube-ID map:

```
node scripts/test-matcher.js
node scripts/validate-youtube-ids.js
```

## Stack

Chrome Extension Manifest V3 · Vanilla JS · `chrome.storage.local` · YouTube IFrame API · YouTube Data API v3 (optional)
