# OnlyWebsites

A self-running business that finds OnlyFans creators with a published business email, cold-emails them under the OnlyWebsites brand, and sells a custom website — link-hub, fan-funnel, promo page — anchored around $1k. All AI runs on the free chain: $0 spend.

## How it works

Two sourcing channels feed one SQLite pipeline. The dork channel searches for link-hub pages that already publish a business email; the breadth channel pulls handles plus subscriber metrics from onlyaccounts.io (which sets the price tier). Email extraction decodes linktr.ee `__NEXT_DATA__`, allmylinks' XOR-obfuscated emails, and X bios; every address is OF-presence gated and MX-verified, and onlyfans.com itself is never scraped. Drafts go through a hard linter (no price, no links, no calendar, CAN-SPAM footer) with up to three regenerations. `bot.cjs` runs the whole funnel on a tick loop: replenish ~60 drafts, send inside a warm-up ramp, poll replies, auto-build a demo on interest, one follow-up bump after 4 days, and sentinels that pause it when things look wrong.

## Stack

Node.js, SQLite, free-chain LLM routing, SMTP/IMAP

## Status

Built end-to-end. Not actively sending.
