# wiggle out 🙏

An AI tool that drafts **honest, persuasive texts to send to your adults** — the
"can I please…" message, written to actually land. You give it the situation; it
writes a respectful, well-argued draft you can send to a parent, teacher or boss.

"Honest persuasion" is the whole point: it makes a real case, it doesn't lie or
manipulate.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
```

### Environment

The drafting runs through Claude — set your key:

```
ANTHROPIC_API_KEY=sk-...
```

## Stack

Next.js 16 · React 19 · Tailwind CSS 4 · `@anthropic-ai/sdk`.
