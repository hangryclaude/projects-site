# Snack Shack

A point-of-sale and inventory tracker for an actual snack shack, backed entirely by a Google Sheet. Tap an item, sale recorded, stock decremented, transaction logged — hosting cost: zero.

## How it works

Google Apps Script serves a dark, touch-friendly card UI (`doGet` returns the HTML); `setupSheets` creates Inventory, Sales Log, and Settings tabs in the sheet. Every tap appends a row to the Sales Log and updates Inventory — the sheet *is* the database, so the books are always inspectable by anyone who can open a spreadsheet. Setup is five minutes: paste `Code.gs`, paste `index.html`, deploy as a web app.

## Stack

Google Apps Script, Google Sheets as datastore, HTML/CSS/JS.

## Status

Working.
