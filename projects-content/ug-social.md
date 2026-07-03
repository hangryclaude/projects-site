# UG Social

A daily social-video engine for the Underground805 clothing brand. Point it at the Shopify store and it spits out ready-to-post 9:16 shorts for each product — no editor, no designer, no monthly SaaS bill.

## How it works

It fetches active products from the Shopify Admin API, generates on-brand copy packs (hooks, on-screen beats, caption, hashtags) with a local Ollama model, then renders each product as a 9:16 MP4 with ffmpeg — a Ken Burns sequence over a blurred fill background, Chrome-headless text overlays, a CTA end card, and music. A rotation cursor tracks which products were rendered last so daily runs cycle the catalog; finished batches text me via `cc-text`. Everything runs locally at $0 — no paid API calls.

## Stack

Node.js, Shopify Admin API, local Ollama, ffmpeg, Chrome headless

## Status

Working — batch renders real product videos on demand.
