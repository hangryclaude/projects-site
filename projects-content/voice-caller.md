# voice-caller

A human-sounding AI phone agent: ElevenLabs voice, Claude brain, Twilio line. It dials a number, has a real back-and-forth conversation, qualifies the lead, tries to book a 15-minute follow-up, then hangs up. Turn-based rather than streaming — ~2–4s per reply, but it never talks over you and never falls apart mid-call.

## How it works

A conversation server holds the call state; Twilio handles telephony through an ngrok tunnel. Each turn, the caller's speech goes to Claude with the persona and objective in `src/brain.ts`, and the reply renders through ElevenLabs — clone your own voice in their UI and it makes calls as you. `npm run say -- "text"` previews the voice as an mp3 without placing a call; `npm run call -- +1805...` dials for real.

The guardrails are built in and meant to stay on: an AI-disclosure opener (required by the FCC and several states — skipping it is how you get fined), a calling-hours window defaulting to 8am–9pm, and a do-not-call list, all enforced in `place-call.ts` before a call goes out. It's built for callbacks, opt-ins, and leads expecting to hear from you — not mass-dialing cold numbers. That's the line between "tool" and "lawsuit."

## Stack

TypeScript, Anthropic Claude, ElevenLabs, Twilio, ngrok

## Status

Working — places live calls; tested against my own number first, as intended.
