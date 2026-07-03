# GHOSTBIKE

**Live:** https://ghostbike.vercel.app

Stealth range computer for e-bikes and e-motos. Themed touchscreen GPS that calculates how far you can actually go from current battery, factoring weight, passenger, hills, and speed.

```
> GHOSTBIKE_
```

## What's in here

| File | What it is |
|---|---|
| `index.html` | The PWA — entire app, single file. Map, range calc, saved places, BLE BMS hook. |
| `manifest.webmanifest` + `icon.svg` | PWA install support. Add to home screen → fullscreen launcher. |
| `start.sh` | Local dev server: `./start.sh` → http://localhost:8088 |
| `pi/setup.sh` | Raspberry Pi installer. Boots straight into kiosk Ghostbike. |
| `pi/gpsd.py` | USB GPS NMEA daemon. Streams fixes over WebSocket so the PWA works without cell. |
| `SHOPPING.md` | Hardware buy list — three tiers (phone mount → Pi build → rugged tablet). |

## Quick start (any device)

```bash
./start.sh
# open http://localhost:8088
```

Set destination: **right-click** map (desktop) or **shift-click**, or use the PLACES tab to search / save.

## Phone mount path

Deploy `index.html` (and the manifest + icon) to any static host (Cloudflare Pages, Vercel, GitHub Pages). Open on phone over HTTPS, **Add to Home Screen**, mount on bars. See `SHOPPING.md` Path A.

## Pi handlebar build

```bash
# on the Pi, from a fresh Pi OS Bookworm:
git clone <this> ~/ghostbike   # or rsync the folder over
cd ~/ghostbike
sudo bash pi/setup.sh
sudo reboot
```

After reboot the Pi auto-logs in, starts X, and Chromium launches Ghostbike fullscreen. The local web server (port 8088) and GPS daemon (port 8089) run as systemd services.

Logs:
```bash
journalctl -u ghostbike-web -u ghostbike-gps -f
```

## Range model

`Wh available = pack_Wh × charge% × (1 − 10% reserve if enabled)`

`Wh/mi = base × weight_factor × terrain_mult × speed_factor × passenger_penalty`

- `weight_factor`: +12% per 50 lb above 200 lb total load
- `terrain_mult`: flat 1.0 / rolling 1.18 / hilly 1.42 / mountain 1.85
- `speed_factor`: U-curve, minimum at 28 mph; ~1.36× at 50 mph
- `passenger_penalty`: 1.05× (extra wind drag)

Tweak `whmi` per-bike in the BIKE tab if your real-world consumption differs.

## Bike presets

Sur-Ron Light Bee X / Ultra Bee / Storm Bee, Zooz Ultra Moto / Carl 2.0, Talaria Sting R MX4, generic e-bike, fully custom.

## BLE BMS

The "Connect Bike BMS" button uses Web Bluetooth to look for the standard battery service (`0x180F`). Most stock Sur-Ron / Zooz BMSes don't expose this — they use proprietary protocols. If yours does (smart-BMS upgrade or some 2024+ Ultras), live battery % flows in automatically.

## All data is local

Saved places, bike config, battery history → `localStorage` in your browser, or the Pi's disk. Nothing phones home.
