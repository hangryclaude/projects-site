# ReplyKey

A custom iOS keyboard with one extra key: ✨ Generate Reply. Works system-wide — Snapchat, iMessage, Instagram, WhatsApp, anywhere you can type. Tap it, and it reads what's in the text box, writes a reply in your chosen tone, and types it in. Backed by free Ollama Cloud inference, so it costs $0 to run.

## How it works

Three targets from one XcodeGen spec: a SwiftUI container app for onboarding and settings, the keyboard extension itself (`KeyboardViewController.swift`), and a shared layer with the AI client and settings synced through an App Group. The keyboard hits `ollama.com/v1/chat/completions` (gemma3:27b-cloud) directly.

The honest iOS constraint: a keyboard extension can only read text inside the field you're typing in — Apple sandboxes it from the conversation above. So the flow is type the gist (or paste the incoming message), hit ✨, and it rewrites that into a real reply. Tone presets (Casual, Flirty, Funny, Professional, Hype, Short & dry) plus a free-text "your voice" note shape every generation. Requires Allow Full Access for the network call; free Apple ID signing works but expires weekly.

## Stack

Swift, SwiftUI, iOS keyboard extension, App Groups, XcodeGen, Ollama Cloud

## Status

Working — simulator build verified, sideloads to a real iPhone with a free Apple ID.
