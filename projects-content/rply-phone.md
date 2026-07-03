# RPLY Phone

RPLY on iPhone via the only loophole iOS allows: a custom keyboard. The Mac app can auto-draft because it sees the screen; iOS sandboxing makes that flatly impossible (no app can read another app's messages or send on your behalf), so this is the honest 2-tap version — copy their message, switch to the RPLY keyboard, generate.

## How it works
A keyboard extension reads the clipboard as the message to reply to (the standard trick — no keyboard can see chat bubbles), picks from six tones (Natural through Flirty), and runs a quantized Qwen2.5 model fully on-device via MLX. Private, offline after the ~300MB model download, $0, no API key. Swap one `modelID` string for a smarter 1.5B model if you'll spare 900MB.

## Stack
Swift, MLX, Qwen2.5-0.5B/1.5B 4-bit, iOS keyboard extension

## Status
Working — sideloads via Xcode; the README documents exactly why full auto-reply can't exist on iOS.
