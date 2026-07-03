# oneword

A chatbot with one absolute rule: every reply is exactly one word. Ask it for an essay, a plan, a way out of a panic — Mono answers with the single most useful word it can find.

## How it works

A strict system prompt ("this rule overrides everything") plus a server-side cleanup that hard-truncates to one word, so even a misbehaving model can't break the bit. Recent turns fold into the prompt for light context. Runs on the free AI chain — $0, no API key.

## Stack

Node.js, Express, free `ai` router (`~/Tools/lib/ai.cjs`)

## Status

Working toy.
