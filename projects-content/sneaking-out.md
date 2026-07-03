# Sneaking Out

A location spoofer with an honest name. A CRT-green map UI that pushes fake GPS coordinates to a USB-tethered iPhone, so the phone reports you're somewhere you're not. Draw a route, set a walking speed, and it plays the movement back.

## How it works

A FastAPI backend bridges a MapLibre UI to `pymobiledevice3`, driving Apple's DVT "simulate location" instrument — the same hook Xcode uses for testing. On iOS 17+ that requires a root tunnel daemon (`sudo pymobiledevice3 remote tunneld`) running alongside; iOS 16 and older just need macOS's built-in usbmuxd, and the backend auto-detects which transport each device uses. Endpoints set a point, clear it, or play a route of points at a given speed, with a WebSocket pushing device status about once a second.

## Stack

FastAPI (Python), pymobiledevice3, MapLibre GL, WebSocket

## Status

Working prototype, requires Developer Mode and a wired phone. Use responsibly.
