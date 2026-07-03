# SpellFix 🔤

**System-wide automatic spelling correction for macOS — like iPhone autocorrect, but everywhere.**

Type in any app — Messages, Mail, Slack, Notes, a browser text box — and when you
finish a word with a **space**, SpellFix quietly swaps an obvious typo for the right
word. `teh ` → `the `, `recieve ` → `receive `, `tommorow ` → `tomorrow `.

- **100% local & free** — uses the built-in macOS spell engine (the same one Mail and
  Pages use). Nothing is sent anywhere, no AI tokens, no cost.
- **Never sends your message** — it only triggers on the **space** key, never on Return,
  so it can't accidentally fire off a half-typed text.
- **Respects your texting voice** — leaves slang alone (`u`, `lol`, `gonna`, `tbh`, `bruh`…),
  only touches clean alphabetic words ≥ 3 letters, and preserves your capitalisation.
- **Skips password fields** entirely.
- **Menu-bar app** — no Dock icon. Pause/resume any time; remembers your fixes count.

## Install / run

```bash
cd ~/Tools/spellfix
./run.sh
```

Then **grant Accessibility access** (one time):
System Settings → Privacy & Security → **Accessibility** → toggle **SpellFix** on.

That's it — start typing anywhere. Look for the **abc** icon in the menu bar.

## Menu bar

- *SpellFix is on / paused* + how many words it's fixed this session + the last fix made.
- **Pause / Resume SpellFix** — toggle without quitting.
- **Quit SpellFix**.

## How it works

1. A `CGEventTap` watches keystrokes (listen-only — never swallows your typing).
2. On a **space**, it reads the focused field via the Accessibility API
   (`AXUIElementCreateSystemWide` → focused element → value + caret offset).
3. It pulls the word just before the caret and asks `NSSpellChecker.correction(...)`
   for the single best autocorrection.
4. If there's a confident fix, it deletes the typo + space and types the correction +
   space back in at the caret via synthetic Unicode key events (no clipboard touched).

## Tuning

Don't like a word being "corrected"? Add it to the `keep` set in
`Sources/SpellFix/SpellFixer.swift`, then `./run.sh` to rebuild.

Built on the proven Accessibility + event-tap plumbing from Ghostype (`~/Tools/ghostype`).
