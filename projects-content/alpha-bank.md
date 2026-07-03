# Alpha Bank

A play-money banking system for the Alpha classroom. The class ran its currency on a spreadsheet until the spreadsheet broke; this replaces it with a real-time app — checking and savings per student, transfers, peer-to-peer pay, achievements, and a teacher admin panel.

## How it works

Next.js App Router frontend on Firebase auth + real-time data. Students get an animated balance card and live transaction history; transfer and peer-pay modals move Alpha currency between accounts with confirmations. A lockout screen closes the bank outside allowed hours so nobody's trading during class. Badges and milestones reward good habits, charts track balances over time, and an xlsx importer brought the old spreadsheet data in. Confetti and a particle background because the users are kids and kids deserve confetti.

## Stack

TypeScript, Next.js 16, React 19, Firebase, framer-motion, Tailwind CSS 4, Netlify

## Status

Working. Built for one classroom, does what one classroom needs.
