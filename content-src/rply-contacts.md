# RPLY Contacts

**Your contacts, organized for you.** A companion iPhone app for [RPLY](https://heynox.com) that turns a messy address book — full of raw numbers and half-named people — into a clean, photo'd, first-name list. Everything runs **on-device**; nothing is ever uploaded.

<p align="center"><em>iOS 26 · SwiftUI · 100% local · matches the RPLY look</em></p>

---

## What it does

**📇 Contacts** — every contact at a glance, with live counts (total, unlabeled, no photo). Tap anyone to edit them inline: rename, strip to first name, see their numbers and emails. Unlabeled numbers are flagged so you can spot them instantly.

**🪄 Clean Up** — three one-tap bulk actions, each with a preview and a full **Undo**:
- **First names only** — turns "Carly Otness" into "Carly" across your whole book.
- **Default profile pictures** — generates matching gradient-monogram avatars for everyone missing a photo, in your chosen style.
- **Duplicates** — finds the same number saved twice and merges them, keeping the named contact and pulling in any extra numbers, emails, or photo.

**💬 Label** — paste a conversation from *any* app (Messages, Instagram, WhatsApp, X) and RPLY Contacts finds the self-introduction — "my name's Sarah from the gym", "it's Mike Reynolds", "- Jess" — then lets you attach that name to the right unknown number. The detection runs entirely on-device with no AI service.

**⚙️ Options** — set your own name (so it's skipped when scanning), pick the default avatar style, and a big honest **Undo all changes** safety net that puts everything back exactly as it was.

## Privacy

Everything happens on the phone. RPLY Contacts uses Apple's standard Contacts permission and writes back through the system Contacts framework — there is no network code, no account, and no server. Every change is journaled locally so it can be reversed.

## Design

Colors are sampled from the real RPLY app (purple-navy surfaces `#181226`/`#261E40`, violet accent `#8B5CF6`), with the heynox.com animated gradient blobs on onboarding and the NB International / Geist brand fonts. It's built to feel like it shipped from the same team.

## Run it

### On a connected iPhone
```bash
# One-time: open RPLYContacts.xcodeproj in Xcode, add your Apple ID under
# Settings → Accounts, then with the iPhone plugged in:
./flash.sh
```

### In the Simulator (with demo data — no real contacts touched)
```bash
xcodegen generate
open RPLYContacts.xcodeproj        # ▶ to a simulator, or:
xcodebuild -project RPLYContacts.xcodeproj -scheme RPLYContacts \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' build

./demo-seed.sh                     # seeds realistic fake contacts + a duplicate
xcrun simctl launch booted com.angus.rply.contacts
```

The demo seed includes well-labeled contacts, raw unknown numbers, people with no photo, and a duplicate — so every feature has something to act on.

## Project layout

```
App/
  RPLYContactsApp.swift   entry point
  RootView.swift          onboarding + 4-tab shell
  ContactsStore.swift     the engine — fetch, rename, photos, merge, undo journals
  ContactsListView.swift  Contacts tab + person rows + avatars
  ContactDetailView.swift tap-to-edit sheet
  CleanupView.swift       bulk first-names / photos / duplicates
  LabelView.swift         paste-a-conversation name finder
  OptionsView.swift       settings + undo-everything
  NameExtractor.swift     on-device self-introduction detection
  AvatarMaker.swift       gradient monogram avatar generator
  Theme.swift             RPLY palette, fonts, blob background, button style
```

## Built with

SwiftUI · Contacts framework · `@Observable` · zero third-party dependencies · iOS 26 · xcodegen

---

Made as a companion piece for the RPLY team.
