# SendLab

Your own Resend, in a box. A multi-provider email sending engine with a Resend-style HTTP API and a Mac app (SendLab.app) on top — dashboard, one-button mass blast, warm-up ramps, domain setup with auto SPF/DKIM/DMARC, and open/click tracking. Send millions through whichever provider is cheapest.

## How it works

`router.cjs` ranks every configured provider by cost at your volume and picks the cheapest, with failover and a circuit breaker — five fails and a provider is skipped for 30 seconds, so a dead one never tanks throughput. Providers are drop-in adapter modules (`{id, configured(), send()}`): dryrun simulates for free, plus Elastic Email ($0.09/1k), Mailgun, and any SMTP host via nodemailer. The API covers single sends, batches, `/blast` jobs with progress, `/campaign` warm-up ramps (start-per-day, double-every-N), domain DNS records, API keys, bounce webhooks feeding a suppression list, and pixel/redirect tracking. State is JSON on disk; `verify.cjs` runs a 17-check end-to-end test.

## Stack

Node, nodemailer, Elastic Email / Mailgun / SMTP adapters, JSON persistence.

## Status

Working — engine passes its own 17-check verify; real sending needs a provider key pasted into Setup.
