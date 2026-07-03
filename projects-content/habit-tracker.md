# Habit Tracker

A local daily habit tracker with reminders that actually reach you — macOS notification, iMessage, or email — and only fire if the habit isn't already checked off. The web-app predecessor to Habit Warden.

## How it works

Node server at `localhost:7575` serving a dark UI: one-click daily checklist, streak counter, 30-day completion percentage, and a 14-day calendar grid you can click to backfill missed days. Reminders route through macOS itself — `osascript display notification`, Messages.app for iMessage, Mail.app via AppleScript for email. Storage is a plain `db.json` in the project root.

## Stack

Node.js, vanilla JS frontend, AppleScript/osascript, JSON file storage

## Status

Working, superseded by habit-warden (the menubar enforcer).
