# leads-cold-call — heynox cold-calling kit

Call businesses (real-estate offices by default) and pitch **heynox** for their
whole team. Scrape phone numbers free, work a live call script with A/B pricing,
and track answer rate + which price converts.

## Flow

```bash
cd ~/Tools/leads-cold-call

node scrape.js              # fill leads.db from Google Maps (free, no API)
node scrape.js --max 30     # quick test: stop after 30 new leads
node scrape.js --city "Austin TX" --headful   # one city, watch it

node call.js               # cockpit: shows next lead + script, you log outcome
node stats.js              # answer rate, close rate, pricing A/B scoreboard
node stats.js --text       # also iMessage the summary to Angus
```

## How it works
- **scrape.js** — Playwright drives Google Maps over every niche × city in
  `config.js`, scrolls each feed, qualifies (rating/reviews/phone) and dedupes
  into `leads.db`. Uses the Playwright already installed in `~/Tools/faceless`.
- **call.js** — pulls the next best lead (warm leads first), prints the heynox
  script (`pitch.js`) with a **rotating price variant**, you dial, then log:
  outcome / seats / notes. A `sold` fires an iMessage via `cc-text`.
- **stats.js** — answer rate (reached a human ÷ dialed), interested/close rates,
  seats sold → revenue run-rate, and a **pricing A/B table** showing which of
  monthly / annual / lifetime is winning.

## Tune it (`config.js`)
- `niches`, `cities` — who you call. Add more cities to go nationwide.
- `qualify` — rating/reviews/phone thresholds.
- `pricing.variants` — the A/B prices (Mollly's $100/seat is the base).
- `outcomes` — the codes you log per call.

## The pitch
heynox = an AI reply assistant that drafts the perfect text/email reply in any
app in ~2 seconds. Real-estate angle: **speed-to-lead wins deals** — agents reply
instantly and on-brand, $100/seat team-wide. Full script + objection handling in
`pitch.js`.

> Numbers come from public Google Maps listings. Follow your local cold-calling /
> DNC rules; this kit dials nothing automatically — you place every call.
