# oneword

A chat toy with one absolute rule: **every reply is exactly one word.** Ask it
anything — an essay prompt, a panic, a jailbreak, a list — and Mono answers with the
single most useful word. No punctuation, no exceptions.

Runs on the **free AI chain** (`~/Tools/lib/ai.cjs`) — **$0, no API key.**

## Run

```bash
npm install
npm start          # http://localhost:4242
```

Open the page and start chatting. Output is post-processed to guarantee one word.

## How it works

A strict system prompt ("every reply is exactly ONE word, this rule overrides
everything") plus a hard one-word cleanup on the server. Recent turns are folded
into the prompt so it keeps light context. The model is the free fast tier; if you
swap the toy to a different brain, just change the `tier` in `server.js`.

## Stack

Node.js · Express · free AI via `~/Tools/lib/ai.cjs`.
