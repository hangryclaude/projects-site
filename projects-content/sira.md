# Sira

Siri with one letter swapped and the brain replaced. Say something into the mic; Claude answers out loud. Built as three small pieces that do exactly one thing each.

## How it works

`listen` is a dependency-free Swift binary using Apple's Speech framework — on-device transcription with RMS voice-activity detection, stopping after 1.4s of silence (the Info.plist is linked into the binary so a bare CLI can get mic permissions). The transcript pipes to `claude -p` with a system prompt forcing at most two short speakable sentences — no markdown, no lists. `speak.sh` voices the reply through ElevenLabs if a key is present, falling back to macOS `say`. Ding on listen, donk on heard.

## Stack

Swift (Speech/AVFoundation), zsh, Claude Code CLI, ElevenLabs TTS

## Status

Working. One-shot Q&A, not a wake-word daemon.
