# Habit Tracker

Daily habit tracker at http://localhost:7575 — dark UI, streaks, scheduled reminders.

## Run

```
cd ~/Tools/habit-tracker
npm install
npm start
```

## What it does

- Daily checklist with one-click toggle, animations, streak counter, 30-day completion %.
- 14-day calendar grid (click any cell to backfill / unmark).
- Per-habit reminder time + channels: macOS notification, iMessage, or email (via Mail.app).
- Reminders only fire if the habit isn't checked off yet for the day.

## Reminders

- **Notification** — `osascript display notification`, no setup.
- **iMessage** — needs your phone number in Settings. Sends via Messages.app.
- **Email** — uses Mail.app via AppleScript. Mail.app must be signed in to an account.

## Storage

Plain JSON at `db.json` in the project root.
