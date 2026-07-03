# dropkit 📡

The ultimate macOS AirDrop power tool — fire files, folders, clipboard, URLs, and
screenshots to your device fleet, watch a folder and auto-drop, scope nearby
devices on a live radar, and run an **opt-in event kiosk** for public drops.

```bash
drop send ~/deck.pdf --to phone,laptop      # fan out to your fleet in parallel
drop clip --to phone                        # AirDrop whatever's on the clipboard
drop url stripe.com/dashboard --to laptop   # send a link (opens in their browser)
drop shot --to phone                        # screenshot → AirDrop
drop watch ~/Drop --to phone                # anything dropped in the folder → sent
drop radar                                  # live scope of nearby receptive devices
drop kiosk ./freebie.pdf --title "Grab the deck" --url mysite.com  # opt-in booth
```

## The one hard rule

dropkit **does not mass-blast unsolicited content at strangers.** There's no
"send to everyone nearby" command, and `--to all`/`*` is rejected on purpose.

Why: AirDrop has no silent push — every transfer requires the recipient to tap
**Accept**, and "Everyone" mode auto-reverts after 10 minutes. Spraying random
phones with unsolicited files (especially images, which preview before Accept) is
the textbook harassment / "cyberflashing" vector that's now illegal in the UK and
several US states. So dropkit only ever targets:

1. **devices you saved/own** (`drop send --to phone`),
2. **one device you pick from the radar** (manual, one at a time, like Finder), or
3. **people who opted in at your kiosk** (they set their phone to "Everyone" in
   front of your sign, and still tap Accept) — pull, not push.

## Reaching a whole room (fundraiser / event)

For "get this link to everyone here," the **QR code wins** — it works on 100% of
phones instantly, no AirDrop setup, no Accept tap. Run the kiosk with your URL:

```bash
drop kiosk reef.org/donate --title "Save the Reef" --name "Reef Fundraiser"
```

It opens a big, projectable QR of your link and renders one in the terminal. If
the opendrop AirDrop channel happens to work on your Mac, it *also* drops the link
(shown as from "Reef Fundraiser") to anyone who opts in by setting their phone to
AirDrop **Everyone** — otherwise it cleanly runs QR-only. Either way the room gets
your link.

## Engines

| engine | how | reaches | needs |
|--------|-----|---------|-------|
| `native` | drives the real macOS AirDrop sheet via `osascript` | contacts + owned devices by name | Accessibility + Automation perms |
| `opendrop` | [seemoo-lab/opendrop](https://github.com/seemoo-lab/opendrop) in a venv — programmatic discover + send | devices in **Everyone** mode | `awdl0` mDNS (see note) |

> **macOS note:** opendrop is really a Linux tool. On modern macOS the system owns
> `awdl0` and blocks userspace mDNS (`No route to host`), so opendrop **discovery
> usually fails** — `drop doctor` probes this and tells you. When it's blocked, use
> the **QR kiosk** (best for crowds) or the **native** engine (named devices).

`--engine auto` (default) uses opendrop only if a live probe shows it works on
your machine, else native. Check anytime with `drop doctor`.

## Install

```bash
cd ~/dropkit
npm run setup     # brew deps + opendrop venv + npm i + links `drop` into ~/bin
drop doctor       # see what's ready
```

One-time macOS permissions (System Settings → Privacy & Security):
- **Accessibility** → your terminal (needed for the native engine to click the recipient)
- **Automation** → your terminal → System Events
- Bluetooth + Wi-Fi on (AirDrop won't work otherwise)

## Commands

| command | what |
|---------|------|
| `drop send <file> --to <a,b>` | send a file/folder (folders auto-zip) |
| `drop clip --to <a>` | send clipboard (image or text) |
| `drop url <url> --to <a>` | send a web link as a `.webloc` |
| `drop shot [--full] --to <a>` | screenshot (interactive/full) and send |
| `drop add <alias> --name "<AirDrop name>" [--id <opendropId>]` | save a device |
| `drop devices` / `drop rm <alias>` | list / remove saved devices |
| `drop radar` | live nearby-device scope; press a digit to send to one |
| `drop kiosk <payload> --title "<sign>" [--url <link>] [--rate N]` | opt-in booth |
| `drop watch <dir> --to <a>` | auto-send anything dropped into a folder |
| `drop log` | recent drop history |
| `drop doctor` | environment + engine health |

## Troubleshooting

- **opendrop "AirDrop discovery blocked / No route to host"** → expected on modern
  macOS; the system owns `awdl0` and blocks third-party mDNS. Not fixable from
  userspace. Use the **QR kiosk** or the **native** engine instead.
- **`awdl0` down** → `sudo ifconfig awdl0 up`, then `drop doctor`.
- **opendrop import fails** → usually `libarchive`; `brew install libarchive` and
  re-run `npm run setup` (dropkit points opendrop at the brew dylib via `LIBARCHIVE`).
- **native engine can't find the recipient** → grant Accessibility to your terminal;
  the AirDrop sheet is left open so you can click manually.
- **"No devices on radar"** → the other device must set AirDrop receiving to
  **Everyone** (Control Center → AirDrop), and be within ~9 m.

## Config & state

- saved devices → `~/.config/dropkit/devices.json`
- drop history → `~/.config/dropkit/history.jsonl`
- transient payloads (zips/screenshots/weblocs) → `~/.config/dropkit/tmp/`
