# Kairos Tracker 🚀

A gamified classroom tracker — rockets, coins, levels, shop upgrades, team battles, and a live race view for the projector. The whole app is **one HTML file**. No build step, no server, no dependencies.

**Three modes:** Guide (teacher controls), Kid (pick your name, see your rocket/stats), and TV (auto-cycling leaderboard + race for the projector). Syncs live across all devices.

## Make your own copy

1. **Get the code** — fork this repo or just download `index.html` (green "Code" button → Download ZIP).
2. **Create a free Firebase project** at [firebase.google.com](https://firebase.google.com) → add a **Realtime Database** (test mode is fine to start).
3. **Paste your config** — in Firebase: Project Settings → "Your apps" → Web app → copy the config object. Open `index.html` and replace the `FIREBASE_CONFIG` placeholder at the top of the file (it's clearly marked).
4. **Put it online** — easiest is [Netlify Drop](https://app.netlify.com/drop): drag the folder in, done. GitHub Pages, Vercel, or any static host also works.

That's it. Open the link on your phone, the projector, and the kids' tablets — everything syncs in real time.

## Customize it

Everything lives in the one file: colors, point values, shop items, animations. Search the file for what you want to change — it's plain HTML/CSS/JS, so tweak away and refresh.

- Two point systems: **Kairos Points** (behavior) + **GP Coins** (currency, spent in the rocket shop)
- 8 shop categories: Paint, Thrusters, Trails, Cockpit, Wings, Decals, Shields, Antennas
- Works offline-ish too: falls back to localStorage if Firebase isn't configured yet

Made by a teacher, for teachers. Have fun with it.
