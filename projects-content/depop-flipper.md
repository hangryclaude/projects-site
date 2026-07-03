# Depop Flipper

A sell-first arbitrage desk for Depop, in one local `index.html`. The model: list the item first, and only buy the cheapest copy *after* it sells — shipped straight to the buyer. You never hold inventory, so the worst case is a cancelled order, not a closet full of Carhartt.

## How it works

Four tabs, no server, no build. Calculator prices a flip after fees. Flip Tools generates a Depop-style listing (title, description). Sourcing turns a sold item into search links across source sites so you can find the cheapest private-seller copy. Orders is a local ledger (`orders.json`) tracking running net profit. There's an optional Claude-driven mode: with a logged-in browser attached, Claude fills the Depop Sell form and polls the seller hub for new sales on a `/loop` every ~30 minutes.

## Stack

Vanilla HTML/CSS/JS, local `orders.json` ledger, optional Claude browser automation.

## Status

Working. The manual loop is solid; the Claude-driven posting needs a connected browser session.
