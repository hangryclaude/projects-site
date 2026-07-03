# Domain Grabber

Brainstorm brandable domain names with the free AI stack, then check *real* availability via RDAP — the official registry protocol. No API key, no rate-limit pain, no "premium availability API" subscription.

## How it works

`node grab.cjs "fintech for teens" --tlds com,io,ai --count 40` — the AI generates candidates, then each one hits the registry: 404 means available, 200 means registered, anything else is honestly reported as unknown. Also does exact-domain checks (`--check nox.com`) and bare labels tried across TLDs. Defaults to com/io/ai/co/app/dev/xyz; `--available-only` and `--json` for piping into other tools.

## Stack

Node.js, free AI chain (`~/Tools/lib/ai.cjs`), RDAP.

## Status

Working, aliased as `dgrab`.
