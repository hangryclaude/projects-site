# Kairos Tracker

A gamified classroom tracker built for a real classroom: every student is a rocket, good behavior earns Kairos Points and GP Coins, coins buy rocket upgrades in a shop, and a live race view runs on the projector. Made by a teacher, for teachers — the whole app is one HTML file.

## How it works

Three modes from the same file: Guide (teacher controls), Kid (pick your name, see your rocket and stats), and TV (auto-cycling leaderboard and race for the projector). Firebase Realtime Database syncs everything live across the teacher's phone, the projector, and the kids' tablets; if Firebase isn't configured it falls back to localStorage. Two point systems — behavior points and spendable currency — feed an 8-category rocket shop: paint, thrusters, trails, cockpit, wings, decals, shields, antennas.

No build step, no server, no dependencies. Fork it, paste your own Firebase config into the marked slot, and drag the folder into Netlify Drop. A companion repo, `kairostracker-deploy`, holds the production build with Firebase pre-wired and deploy instructions for kairostracker.com — the entire deployment doc is basically "upload index.html, there is no step 2."

## Stack

Single-file HTML/CSS/JS (~12,000 lines), Firebase Realtime Database, Google Fonts

## Status

Working, deployed for classroom use at kairostracker.com.
