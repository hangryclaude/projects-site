# RPLY Contacts

Companion iPhone app for RPLY that fixes the messy address book problem: raw numbers, half-named people, no photos. It turns all of that into a clean, photo'd, first-name list — entirely on-device, nothing uploaded, every change reversible.

## How it works
Three one-tap bulk actions with preview and full undo: strip everyone to first names, generate gradient-monogram avatars for anyone missing a photo, and merge duplicate numbers (keeping the named contact, pulling in extra emails/photos). The clever bit is **Label**: paste a conversation from any app and it finds the self-introduction — "my name's Sarah from the gym", "- Jess" — with on-device text detection (no AI service), then attaches the name to the right unknown number. Writes back through Apple's Contacts framework; a local journal makes "Undo all changes" actually mean it. Styled to match the real RPLY app, down to the sampled purple-navy palette.

## Stack
Swift, SwiftUI, iOS Contacts framework, xcodegen

## Status
Working — installs to a phone via `./flash.sh`, ships a demo-seed script for the simulator.
