# Snack Shack 🍫

A tiny **point-of-sale + inventory tracker for a snack shack**, backed by a Google
Sheet. Ring up sales, track stock, and log every transaction — all stored in a sheet
you own, with a clean dark touch-friendly interface.

## What it does

- **Sell** — tap an item to record a sale; stock decrements automatically.
- **Inventory** — items, prices and quantities live in an `Inventory` sheet.
- **Sales log** — every sale is appended to a `Sales Log` sheet for the records.
- **Settings** — configurable via a `Settings` sheet.
- **Zero hosting cost** — runs as a Google Apps Script web app on top of your sheet.

## Architecture

- `index.html` — the frontend (dark, card-based, touch-friendly).
- `Code.gs` — Google Apps Script backend: `doGet` serves the page; `setupSheets`
  creates the Inventory / Sales Log / Settings tabs; handlers read/write the sheet.

## Setup

Full step-by-step is in **`SETUP.md`** (~5 minutes). In short:

1. Create a Google Sheet named **Snack Shack**.
2. **Extensions → Apps Script**, paste in `Code.gs`.
3. Add an HTML file named `index`, paste in `index.html`.
4. Run `setupSheets` once to create the tabs (authorize when prompted).
5. **Deploy → New deployment → Web app** to get a shareable URL.

To preview the frontend locally (without the sheet backend):

```bash
open index.html
```

## Stack

Google Apps Script · Google Sheets (datastore) · HTML/CSS/JS · Inter + Material Icons.
