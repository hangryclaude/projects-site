# Depop Scout

The other half of the Depop operation: find the mispriced listings before someone else does. It drives my actual installed Chrome — no API key, no scraping service — and flags anything priced well below what identical items are going for.

## How it works

Puppeteer-core launches real Chrome against Depop search, scrolls to load pages, and pulls price, seller, and card text from each result. For every query it computes the cohort median price, then flags items under a threshold (default 70% of median). Saved "lanes" bundle queries — `--lane workwear` runs carhartt, dickies, levis 501 in one pass. Output is a ranked terminal list plus optional raw JSON.

## Stack

Node.js, puppeteer-core driving installed Chrome, zero API costs.

## Status

Working. Lives in `~/bin`, selector-dependent so it breaks when Depop redesigns.
