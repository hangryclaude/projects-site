# Writer brief — projects-site content pass

You are writing project entries for Angus Duncan's portfolio site (github: hangryclaude), modeled on theodore.net/projects. He's a 15-year-old solo builder who ships at absurd velocity. Voice: blunt, dry, confident, a little funny. ZERO marketing fluff — never "ultimate", "high-performance", "powerful", "seamless". Short sentences. Specifics beat adjectives (real numbers, real stack names).

## Tagline style (the card one-liner)
Like theodore.net: wry, concrete, makes you click. Examples of the register:
- "Did I really say that? Why yes, you did."
- "An AVR-based Bluetooth telegraphing shoe insole that lets you play chess the way Hans Niemann has been accused!"
- "Have a hard time deciding what to hang on your walls? Boy, do I have the solution for you."
Max ~110 chars. No period-spam, no exclamation unless earned.

## Detail page markdown (projects-content/<slug>.md)
150–300 words. Structure (use `##` headers exactly):

```
# <Title>

<one-paragraph hook: what it is and why it exists — the itch it scratches>

## How it works
<the mechanism: architecture, the clever part, 1-2 short paragraphs. Real stack names.>

## Stack
<comma list: languages, key libs/services>

## Status
<one line: live/working/prototype/parked — honest>
```

Do NOT pad. If a project is thin, say what it is in fewer words rather than inflating it. Honesty about "parked" or "prototype" is on-brand.

## Entry JSON
Each agent also writes `data/entries-<category>.json`:
```json
[{
  "slug": "ghostype",
  "title": "Ghostype",
  "tagline": "…",
  "category": "macOS power tools",
  "repo": "hangryclaude/ghostype",
  "live": "https://… or null (use homepageUrl from meta.json if plausible)",
  "lang": "Swift",
  "year": "2026"
}]
```
slug = repo name lowercased. Title = human name (e.g. "ReplyKey", "Crazy Web Effects").

## Sources
- `~/dev/projects-site/content-src/<name>.md` (README, may be empty) and `<name>.meta.json` (description, homepageUrl, language, pushedAt).
- If README is empty/thin: `gh api repos/hangryclaude/<name>/git/trees/HEAD?recursive=1 --jq '.tree[].path'` to see structure, and `gh api repos/hangryclaude/<name>/contents/<file>` for key files (package.json, main entry). Don't invent features.
