# EyeSite Saver 👁️

A native macOS menu-bar app that enforces the **20-20-20 rule**: every 20 minutes it
pops a full-screen, always-on-top countdown telling you to look 20 feet away for 20
seconds — over whatever you're doing, on the screen your mouse is on.

## What it does

- **Full-screen break overlay** — a clean, calm screen you can't miss: a thin
  progress ring that depletes over the break, a light countdown inside it, and a
  single eye-rest tip ("Look at something 20 feet away", "Blink slowly ten times"…).
  Soft fade in/out.
- **Menu-bar only** — runs invisibly in the background, no Dock icon.
- **Configurable intervals** — work interval (default 20 min) and break length
  (default 20 s), persisted via `UserDefaults`.
- **Lightweight & native** — pure Cocoa, no dependencies, tiny footprint.

## Build & run

```bash
./build.sh        # compile EyeSiteSaver.swift -> ./EyeSiteSaver
./run.sh          # build if needed, then launch
```

Or directly:

```bash
swiftc EyeSiteSaver.swift -o EyeSiteSaver && ./EyeSiteSaver
```

To launch it automatically, add `EyeSiteSaver` (or `run.sh`) as a macOS **Login Item**.

## Stack

Swift · Cocoa / AppKit · macOS. Single file (`EyeSiteSaver.swift`), no build system needed.
