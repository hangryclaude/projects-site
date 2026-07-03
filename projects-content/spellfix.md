# SpellFix

iPhone autocorrect, but for your Mac, in every app. Finish a word with a space and SpellFix quietly swaps the obvious typo: `teh ` → `the `, `recieve ` → `receive `. No AI, no cloud, no cost — it uses the same built-in macOS spell engine Mail and Pages use.

## How it works

A listen-only CGEventTap watches keystrokes. On a space, it reads the focused field through the Accessibility API (focused element → value + caret offset), pulls the word just before the caret, and asks `NSSpellChecker.correction(...)` for the single best fix. If there's a confident one, it deletes the typo and retypes the correction via synthetic Unicode key events — no clipboard touched.

The restraint is the feature. It only triggers on space, never Return, so it can't fire off a half-typed message. It leaves slang alone (`u`, `lol`, `gonna`, `bruh`), only touches clean alphabetic words of 3+ letters, preserves your capitalisation, and skips password fields entirely. Menu-bar only, no Dock icon, with a pause toggle and a running count of fixes.

Built on the same Accessibility + event-tap plumbing as Ghostype.

## Stack

Swift, AppKit, CGEventTap, Accessibility API, NSSpellChecker

## Status

Working — build and run with `./run.sh`, one-time Accessibility grant.
