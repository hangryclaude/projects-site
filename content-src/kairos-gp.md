# Kairos GP 🏎️

A gamified classroom-management tracker built as a **Grand Prix**. Each student is a
race car; good work moves them around the track, onto the podium, and up the
leaderboard — with real-time sync so the whole class sees it live on the board.

## Features

- **Race-car students** — deep car customization (livery, style) per student.
- **Dual points** — track two point types and convert progress into track position.
- **Live leaderboard & podium** — standings update in real time across devices.
- **Streaks** — reward consistency, not just one-off wins.
- **Stat charts** — visualize each student's progress over time.
- **Class sound board + keyboard shortcuts** — run it fast from the front of the room.
- **Confetti & animations** — celebrations that make kids want the board on.

## Run

It's a single-file web app — open it, or serve the folder:

```bash
open index.html
# or
python3 -m http.server 8080
```

### Real-time sync (Firebase)

Live sync runs on **Firebase** (Firestore). The web config is embedded in
`index.html`; `firebase-setup.html` walks through wiring up your own project. (The
included keys are client config — secured by Firestore rules, not secret.)

## Files

- `index.html` — the app (everything is here).
- `firebase-setup.html` — guided Firebase setup.
- `reference-*.html` / `reference-kairos.jsx` — design iterations and prototypes kept
  for reference.

## Stack

Single-file HTML/CSS/JS · Firebase / Firestore (real-time sync) · deploys on Netlify.
