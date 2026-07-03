# OnlyWebsites

Find OnlyFans creators, cold-email them under the **OnlyWebsites** brand, and sell a custom
website that grows their business (owned link-hub + fan-funnel + promo/SEO page). Price anchors
~$1k, quoted per-creator on a call. All AI runs on the free chain (`~/Tools/lib/ai.cjs`) — $0.

## How sourcing works (all verified live)

Two complementary channels feed one SQLite pipeline (`data/leads.db`):

1. **Dork channel — `dork.cjs` (primary, ~40-50% email yield).**
   Search dorks pre-filter to link-hub pages that *already publish* a business email, e.g.
   `site:linktr.ee onlyfans "business inquiries" gmail.com <niche>`. URLs are harvested via the
   **WebSearch tool** (search engines captcha-block plain curl from this host) into
   `seeds/dork-urls.txt`, then `dork.cjs` fetches each page and extracts the email.

2. **Breadth channel — `source.cjs` (onlyaccounts.io).**
   `onlyaccounts.io/api/filter?q=<niche>` is plain-curl-able (no Cloudflare) and returns handle +
   **subscriber metrics inline** (which drive the price tier). For each handle it guesses
   `linktr.ee/<handle>` + `allmylinks/<handle>` and extracts the email. Lower yield, huge volume.

**Email extraction** (`lib/email.cjs`): linktr.ee `__NEXT_DATA__` JSON · allmylinks `data-cfemail`
XOR decode · website `mailto:` · X bio (Discordbot UA). Every email is **OF-presence gated** (the
page must tie back to the OF handle — kills the linktr.ee name-collision trap) and **MX-verified**.
We never scrape onlyfans.com itself (ToS).

## Pipeline

```
harvest.cjs   WebSearch-fed → append hub URLs to seeds/dork-urls.txt (deduped)
dork.cjs      hub URLs → verified-email leads            (primary)
source.cjs    onlyaccounts niches → leads + metrics      (breadth)
score.cjs     free-AI 0-100 score + price tier ($1k/$1.5k/$2.5k by subs)
draft.cjs     genius-tier personalized cold email → HARD lint → queue/
send.cjs      review queue → SMTP send (ramp 10→25→50/day, caps, suppression)
replies.cjs   IMAP poll → classify → text Angus + stage demo + step-2 email
stats.cjs     text status (no dashboard)
```

## Cold-email rules (enforced by `lib/lint.cjs`, not just prompted)
No price/money/$ · no links/URLs/portfolio · no calendar · confident pro tone · CAN-SPAM footer
(brand + Goleta PMB address + STOP-to-unsubscribe). A draft that fails the linter is regenerated
up to 3× then skipped. Pricing, portfolio, and the calendar link happen **only** after a reply.

## The bot (autonomous operator)

`bot.cjs` runs the whole funnel on a tick loop and self-heals:
- **Replenish** — keeps ~60 qualified drafts ready (source → score → draft), copy weighted by what's converting
- **Send** — approved drafts inside the warm-up ramp + daily cap + send window, paced
- **Replies** — poll inbox → classify → on interest, auto-build a demo + stage step-2 + text Angus
- **Follow-up** — one rule-compliant bump to no-reply leads after 4 days
- **Sentinels** — auto-pause + alert if today's bounce/error rate spikes
- **Learn** — reply-rate per pitch angle (Wilson-scored) feeds back into drafting
- **Digest** — hourly cc-text summary (batched; urgent events fire immediately)

Safe by default: sends only when go-live creds exist. Until then it runs the free half (replenish/learn)
so the pipeline is always stocked.

```bash
node bot.cjs --once       # single tick (test)
node bot.cjs              # run forever
./install-bot.sh          # install as a launchd daemon (auto-start + restart on crash)
./install-bot.sh uninstall
```

## Quick start
```bash
node harvest.cjs --stdin < urls.txt   # (or just edit seeds/dork-urls.txt)
node dork.cjs                          # verified-email leads
node source.cjs --niches cosplay,alt --limit 200
node score.cjs
node draft.cjs                         # drafts → queue/
node send.cjs --review                 # eyeball drafts
node stats.cjs
```

## Go-live (manual, one-time — keeps Angus's name off everything)
1. Buy a domain (private WHOIS) and set `brand.domain` / `from_email` / `reply_to` in `config.json`.
2. Persona inbox (Workspace/Zoho) + app password → `ONLYWEBSITES_SMTP_PASS` (SMTP) and
   `ONLYWEBSITES_IMAP_PASS` (replies). Verify SPF/DKIM/DMARC.
3. Persona calendar (Cal.com) → `brand.calendar_url` (sent only in step-2).
4. Flip `sending.enabled = true`. Start with the review queue; auto-send only after reply data
   proves the template. Reputation is isolated from Lead-Agent (separate domain + creds).
```
