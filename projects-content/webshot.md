# webshot

Screenshot any URL or local HTML file to a PNG from one command. Built so other tools and agents can render a page without opening a browser by hand.

## How it works

A thin Node wrapper over Playwright's headless Chromium. It resolves local paths to `file://` URLs, sets the viewport (`--width`/`--height`, so mobile widths just work), and captures either the viewport or the full page (`--full`). The pragmatic touch: it waits for `networkidle` but falls back to `domcontentloaded` when a long-polling site would otherwise hang the load forever, plus an extra `--wait` to let animations and JS settle. Finds the global Playwright install by appending `npm root -g` to the module path.

## Stack

Node.js, Playwright (headless Chromium)

## Status

Working plain CLI. Powers screenshotting across the rest of the toolkit.
