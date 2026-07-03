# depop-flipper

A sell-first arbitrage toolkit for Depop: generate listings, price flips, source the
cheapest copy after a sale lands, and track running profit — with optional
Claude-driven posting and sale monitoring. The UI is a single local `index.html`
(no server, no build).

## The model

**List first, buy second.** You post an item, and only *after* it sells do you buy
the cheapest copy and ship it to the buyer — so you never hold inventory.

## Daily loop

1. **List** — generate a listing (Flip Tools tab), price it with the calculator,
   post on Depop, hit *Save as listed order*.
2. **Sale lands** — paste the search term into Sourcing, open the source links.
3. **Buy** — cheapest private-seller copy; enter the buyer's name + address at checkout.
4. **Ship** — mark shipped on Depop with the source's tracking number.
5. **Track** — the Orders tab shows running net profit; history lives in `orders.json`.

## Tabs

- **Calculator** — enter cost, sale price and fees → color-coded profit/loss.
- **Flip Tools** — generate a trendy Depop-style listing (title, description, etc.).
- **Sourcing** — turn a sold item into source-site search links.
- **Orders** — local order ledger with running net profit (`orders.json`).

## Claude-driven mode (optional, needs a logged-in browser)

`PROMPT.txt` / `PLAYBOOK.md` describe driving the shop with Claude:

- **Post a listing** — Claude fills the Depop *Sell* form (you upload photos + click Post).
- **Check for sales** — Claude reads the seller hub and surfaces sourcing links for new orders.
- Can run on a `/loop` to poll for sales every ~30 min while the browser is connected.

## Use

```bash
open index.html        # or drag it into any browser
```

## Stack

Vanilla HTML/CSS/JS · `orders.json` local ledger · optional Claude browser automation.
