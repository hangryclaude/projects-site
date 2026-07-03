# ReplyKey — one button, AI replies in every app

A custom iOS **keyboard** with a ✨ Generate Reply button. Works system-wide:
Snapchat, iMessage, Instagram, WhatsApp, anywhere you can type. Tap the button,
it reads the text in the box, writes a reply in your chosen tone, and types it in.
Backed by **free** Ollama Cloud inference ($0).

## How it works (and the one iOS limit)
A keyboard extension can only read/replace text **inside the text field you're typing in** —
Apple sandboxes it from the messages *above* on screen. So the flow is:
type the gist or paste the incoming message into the box → hit ✨ → it rewrites it
into a real reply. (For full-context replies later, a screenshot→share-sheet path can be added.)

## Project layout
- `App/` — container app: onboarding + tone/voice settings (SwiftUI)
- `Keyboard/` — the keyboard extension (the ✨ button) — `KeyboardViewController.swift`
- `Shared/` — `AIClient.swift` (free Ollama Cloud call) + `Settings.swift` (App Group)
- `project.yml` — XcodeGen spec. Regenerate with `xcodegen generate`.

## Build / run
```bash
cd ~/Tools/ReplyKey
xcodegen generate                       # after editing project.yml
open ReplyKey.xcodeproj
```
Simulator build verified:
```bash
xcodebuild -scheme ReplyKey -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' \
  CODE_SIGNING_ALLOWED=NO build
```

## Get it on your real iPhone
1. Plug in iPhone, open `ReplyKey.xcodeproj` in Xcode.
2. Select both targets ▸ Signing & Capabilities ▸ set your **Team** (free Apple ID works).
   - Bundle IDs must be unique — if taken, change `com.angus.replykey` in `project.yml`.
3. Pick your iPhone as the run destination ▸ ⌘R.
4. On the phone: **Settings ▸ General ▸ Keyboard ▸ Keyboards ▸ Add New Keyboard ▸ ReplyKey**.
5. Tap **ReplyKey ▸ turn ON "Allow Full Access"** (required for the AI network call).
6. In any app: tap the text box, switch keyboard with 🌐, type the gist, hit ✨.

> Free Apple ID signing expires every 7 days (re-run from Xcode to refresh).
> A paid Apple Developer account ($99/yr) makes it permanent + TestFlight-shareable.

## Settings that shape replies
- **Tone**: Casual / Flirty / Funny / Professional / Hype / Short & dry
- **Your voice**: free-text notes (slang, name, vibe) added to every prompt
Both live in the App Group so the keyboard and app stay in sync.

## AI backend
`Shared/AIClient.swift` → `https://ollama.com/v1/chat/completions`,
model `gemma3:27b-cloud`, key from `~/.ai.env` (OLLAMA_API_KEY). Free tier.
Swap `model`/`endpoint` there to use GitHub Models, Groq, etc.
