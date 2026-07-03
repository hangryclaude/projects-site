# nox-redirect
Fast token-verified attribution redirects and click logging for NOXLab.

This service handles attribution redirects by verifying unique tokens and logging click events before issuing a 302 redirect to the final destination.

## Features
- Token-based verification for attribution tracking.
- Automated click logging for analytics.
- Fast 302 redirects to download endpoints.
- Optimized routing via Vercel rewrites.

## Run
Deploy to Vercel or run locally via:
```bash
vercel dev
```

## Stack
Node.js, Vercel Functions.
