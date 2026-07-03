# Macintosh Disk

A Mac OS 8 boot disk image, chopped up so a browser can boot it. It's the asset backend for the `/mac` route on madebyangus.com, where a WASM Basilisk II emulator runs classic Mac OS in the browser.

## How it works

The full ~650 MB Quadra HFS disk image is split into 95 MB chunks so it can be served as static GitHub release assets. A `manifest.json` records each chunk's byte range, so a browser worker can HTTP Range-fetch only the slice it needs instead of downloading the whole disk. Reassembling locally is just `cat disk.part.* > disk`. The image itself is vendored from felixrieseberg/macintosh.js; the host scripts here are MIT, the OS is Apple's.

## Stack

HFS disk image, HTTP Range serving, JSON manifest, Basilisk II (WASM)

## Status

Live — powers the in-browser Mac OS 8 on madebyangus.com.
