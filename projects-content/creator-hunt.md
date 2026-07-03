# Creator Hunt

Finds startup and build-in-public creators (10k–100k followers) across X, Threads, Instagram, and TikTok, extracts their business emails, scores them for fit, writes each one a personalized offer, and sends: post about NOX (heynox.com) for $50 cash, lifetime Pro, an affiliate cut, and a repost. NOX is an AI inbox for founders, so a startup creator's audience is exactly the ICP.

## How it works

A composable pipeline: discover → classify → enrich-links → verify → score → pitch → queue → send. Discovery runs through Apify's pay-per-result actors, so no personal accounts or IPs ever touch the platforms — zero ban risk. Classification and pitch-writing run on a free AI fleet at $0. Email extraction crawls each creator's bio links; verification does local MX checks then Reoon. Nothing sends until an explicit `--send`, everything lands in a reviewable queue.md first, sends cap at 25/day through Gmail with bounce → suppress, and the sender hard-refuses to run without a real physical mailing address in config (CAN-SPAM).

Batch one is entirely free: 116 curated prospects imported before a single paid API call.

## Stack

Node.js, Apify, Reoon, Gmail SMTP, free-tier LLM routing

## Status

Working — pipeline complete, sends gated behind keys and the review queue.
