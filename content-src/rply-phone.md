# RPLY Phone — heynox.com / RPLY, but on your iPhone

On-device AI reply generator that works **inside any app** — Snapchat, Messages,
Instagram, WhatsApp — via a custom keyboard. Runs an MLX model fully on-device:
private, $0, no API key, works offline once the model is downloaded.

## Why it can't be 100% automatic (the iOS truth)

A truly hands-free "someone texts me → it auto-replies" flow is **impossible**
on a non-jailbroken iPhone. iOS sandboxes every app:

- No app can read Snapchat's or iMessage's incoming messages in the background.
- No app can auto-send a message on your behalf.

That's why the Mac RPLY can be automatic (it sees the screen) but the phone
version can't. The closest possible — and what this does — is a **2-tap** flow.

## How it actually works (the flow)

1. Someone messages you (Snap chat text, iMessage, IG DM…).
2. **Long-press their message → Copy.**
3. Tap into the reply box, **switch to the RPLY keyboard** (🌐 globe).
4. Pick a tone, tap **✨ Generate reply** → it reads the copied message and
   types a reply on-device.
5. Tweak if you want, hit send.

The keyboard reads the **clipboard** as the message to reply to (it can't see
the chat bubbles directly — no keyboard can). That's the standard trick every
iOS reply app uses.

> Snapchat note: works for **chat text** (long-press to copy). It can't read
> snaps/images — those are images, not selectable text.

## Setup (one time)

1. Plug in your iPhone, sign your Apple ID into Xcode (Settings → Accounts → +).
2. `./flash.sh`, then press ▶ in Xcode to install on the phone.
3. Open the **RPLY** app once on Wi-Fi → it downloads the on-device model (~300MB).
4. Settings → General → Keyboard → Keyboards → **Add New Keyboard… → RPLY**.
5. Tap **RPLY** in that list → enable **Allow Full Access**
   (required so the keyboard can read the copied message).

## Tuning quality

Bigger model = better replies. In `Shared/RPLYEngine.swift`, swap `modelID`:

- `mlx-community/Qwen2.5-0.5B-Instruct-4bit` — default, fast, ~300MB
- `mlx-community/Qwen2.5-1.5B-Instruct-4bit` — noticeably smarter, ~900MB

Tones live in `ReplyTone` (Natural / Friendly / Funny / Flirty / Short / Professional).
