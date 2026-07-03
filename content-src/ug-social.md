# ug-social
> Daily social video engine for Underground805 — pulls live Shopify products and renders ready-to-post 9:16 short-form videos.

## What it does

Fetches active products from the Shopify store, generates on-brand copy packs (hooks, on-screen beats, caption, hashtags) via a local Ollama model, then renders a 9:16 MP4 for each product using ffmpeg. Each clip is a Ken Burns sequence of product images with a blurred fill background and Chrome-headless text overlays, finished with a CTA end card and background music. Outputs land in a dated `out/` queue. When a batch finishes, it texts Angus via `cc-text`. A rotation cursor tracks which products were rendered last so daily runs cycle through the catalog.

## Run

```bash
node run.js                          # daily batch — 3 products in rotation
node run.js --batch 5                # override batch size
node run.js --all                    # render every active product
node run.js --handle skull-hoodie    # render one or more specific handles

UG_NO_TEXT=1 node run.js            # skip iMessage notification
UG_FORCE_CONTENT=1 node run.js      # regenerate copy even if a pack already exists
UG_MODEL=llama3:8b node run.js      # override Ollama model (default: qwen2.5:32b)
```

Requires: `ffmpeg`, `ollama` running locally, Playwright's `chrome-headless-shell` (or Google Chrome), and a Shopify access token at `~/UndergroundBrandd/.shopify_token`.

## Stack

Node.js · Shopify Admin API · ffmpeg · Chrome headless (text overlays) · local Ollama — $0, no paid API calls.
