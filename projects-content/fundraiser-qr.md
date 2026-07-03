# Fundraiser QR

Full-screen SCAN TO DONATE page. Paste your donation link, prop an old phone up on the table, and the whole room scans it. Built because passing one phone around a fundraiser is a terrible donation funnel.

## How it works

Pure static HTML. The QR is generated on-device with the MIT-licensed qrcode-generator library — no backend, no tracking. Pass `?url=...&title=...` in the URL and it opens straight to the QR, so you can bookmark it to a home screen and turn any retired iPhone into a donation kiosk.

## Stack

HTML, vanilla JS, qrcode-generator, GitHub Pages

## Status

Live at hangryclaude.github.io/fundraiser-qr.
