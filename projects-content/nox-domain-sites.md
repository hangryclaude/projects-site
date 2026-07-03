# nox-domain-sites

The NOX campaign owned a pile of landing domains; this generates a unique landing page for every one of them and wires them all to Vercel. 22 domains, 22 brand voices, one script.

## How it works
`generate.cjs` runs each domain through a template system with AI-generated copy — a distinct voice and headline per domain — writing self-contained HTML pages that need no build step. A `manifest.json` makes the pipeline idempotent, so re-runs resume instead of re-spending API calls. `attach-domains.sh` then bulk-attaches every domain in `nox-domains.txt` to the single `rply-landing` Vercel project.

## Stack
Node.js, Bash, Vercel API

## Status
Working — the pages behind the campaign's domain portfolio.
