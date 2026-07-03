# dropkit

AirDrop is great and its UI is a dead end: open Finder, right-click, wait, click a face. dropkit turns it into a CLI — `drop send ~/deck.pdf --to phone,laptop` fans a file out to your device fleet in parallel. Also: clipboard drops, URL drops, screenshot drops, a watch-folder that auto-sends anything you drop in it, a live radar of nearby receptive devices, and an opt-in QR kiosk for events.

## How it works

Two engines. `native` drives the real macOS AirDrop sheet via osascript and Accessibility permissions — reaches your contacts and owned devices by name. `opendrop` (seemoo-lab's Python implementation) does programmatic discovery and send, but modern macOS owns `awdl0` and blocks userspace mDNS, so discovery usually fails — `drop doctor` probes this and says so. For reaching a whole room, the kiosk sidesteps AirDrop entirely: a big projectable QR code of your link, with opendrop as a bonus channel if it happens to work.

One hard rule: no mass-blasting strangers. `--to all` is rejected on purpose — every target is a device you own, one you manually pick from radar, or someone who opted in at your kiosk.

## Stack

JavaScript (Node.js), osascript/AppleScript, opendrop (Python venv), qrcode

## Status

Working — native engine solid; opendrop channel limited by macOS awdl0 restrictions, documented honestly.
