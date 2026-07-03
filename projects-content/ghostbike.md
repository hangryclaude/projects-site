# Ghostbike

A stealth range computer for e-bikes and e-motos. A themed touchscreen GPS that answers the one question every Sur-Ron rider actually has: how far can I really go from this battery? It factors weight, passenger, hills, and speed instead of trusting the optimistic number on the dash.

## How it works

The whole app is a single `index.html` PWA — map, range calc, saved places, and a BLE hook — installable to a phone home screen for a fullscreen handlebar launcher. The range model is explicit, not a black box: available watt-hours from pack size and charge, divided by a watt-hours-per-mile estimate built from a weight factor (+12% per 50 lb over 200), terrain multiplier, a U-shaped speed factor (most efficient around 28 mph), and a passenger penalty. There are presets for real bikes (Sur-Ron Light Bee, Zooz, Talaria). A "Connect Bike BMS" button tries Web Bluetooth against the standard battery service, though most stock BMSes use proprietary protocols. For a permanent build there's a Raspberry Pi path: `pi/setup.sh` boots straight into kiosk Ghostbike, with a USB GPS daemon streaming NMEA fixes over WebSocket so it works with no cell signal. All data stays local.

## Stack

Single-file HTML/JS PWA, Web Bluetooth, Leaflet map, Raspberry Pi + gpsd (Python), systemd

## Status

Working — runs on a phone today; Pi handlebar build documented and scripted.
