# fundraiser-qr

A dead-simple full-screen **SCAN TO DONATE** QR page. Open it on a phone/tablet,
paste your donation link, prop it up — the whole room can scan at once. No app,
no install, works on any phone (iPhone + Android).

## Use it
Live page: **https://hangryclaude.github.io/fundraiser-qr/**

1. Open that link on your old iPhone (or any screen).
2. Paste your donation URL, tap **Show QR**.
3. Full-screen QR appears. Done.

Skip the typing by passing the link in the URL:
```
https://hangryclaude.github.io/fundraiser-qr/?url=yourfundraiser.org/donate&title=Save%20the%20Reef
```

Bookmark that on the phone's home screen and it opens straight to the QR.

Pure static HTML — the QR is generated on-device with
[qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) (MIT).
