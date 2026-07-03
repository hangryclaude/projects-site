# voice-caller

Human-sounding AI phone agent. ElevenLabs voice + Claude brain + Twilio line.
It dials a number, has a real back-and-forth conversation, qualifies the lead,
and tries to book a 15-min follow-up — then hangs up. Turn-based (robust),
~2–4s per reply.

## Setup
```bash
cd ~/Tools/voice-caller
npm install
cp .env.example .env      # then fill in the 3 keys: ElevenLabs, Anthropic, Twilio
```

## Hear the voice first (no call placed)
```bash
npm run say -- "Hey, this is Sam — got a quick second?"
# prints an .mp3 path; open it to listen
```

## Make a live call
Two terminals:
```bash
npm start                 # 1) the conversation server
npm run tunnel            # 2) ngrok -> copy the https URL into PUBLIC_URL in .env, restart `npm start`
npm run call -- +18055551234   # 3) dial (start with YOUR OWN number to test)
```

## Tune it
- Voice: `ELEVENLABS_VOICE_ID` (clone your own voice in the ElevenLabs UI for a custom one).
- Script/personality: `src/brain.ts` (the `SYSTEM` prompt).
- Identity: `COMPANY_NAME`, `AGENT_NAME` in `.env`.

## Built-in guardrails (leave these on)
- **AI disclosure** opener (`DISCLOSURE_ON=1`) — required by the FCC + several
  states for AI/auto-voice calls. Skipping it is how you get fined.
- **Calling-hours window** (`CALL_HOURS_START/END`, default 8am–9pm) and a
  **do-not-call list** (`DNC_LIST`) — both enforced in `place-call.ts`.
- Don't mass-dial cold numbers. Use it for callbacks, opt-ins, and leads that
  expect to hear from you. That's the line between "tool" and "lawsuit."
