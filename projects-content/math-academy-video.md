# Math Academy Video (Khan Booster)

Iteration two of the Khan-videos-inside-Math-Academy idea: same floating "Play Video" pill, more machinery behind it.

## How it works

Resolves the current topic to a Khan Academy YouTube video three ways, in order: a built-in topic-to-video-ID map, an optional YouTube Data API search, and a scrape-based fallback that needs no API key at all. The popup player grew four tabs — Now, Saved (pinned mappings), History (last 200 opens), and Settings. Everything stores locally in `chrome.storage.local`. Comes with test scripts that validate the bundled YouTube IDs actually resolve.

## Stack

Chrome extension (MV3), vanilla JS, YouTube IFrame API, YouTube Data API v3 (optional)

## Status

Working — plain unpacked extension, no build step.
