# Graham

Graham Duncan (East Rock Capital) is famous for one question when assessing people: "What's going on here, with this human being?" This tool reads a person — a founder, a hire, a reference — the way he would, grounded in his actual essays rather than a vibes-based system prompt. Runs entirely on the free AI ensemble: $0, no Anthropic tokens.

## How it works

Three-step pipeline. `scrape.cjs` pulls Duncan's essays from grahamduncan.blog into a corpus (pure HTTP, zero tokens). `distill.cjs` runs a free-AI map-reduce over them to produce a weighted rubric — his actual lens: self-awareness and reality perception (25%), strategic game awareness (20%), locus of control (18%), learning velocity (15%), credibility in context (12%), infinite-game mindset (10%). `graham.cjs` then evaluates a person against the rubric plus his own prose. Feed it a one-line description, a dossier file, or a URL; it returns the read beneath the surface story, per-dimension scores with evidence rolled up to 0–100, green and red flags, the one highest-leverage question to ask in a reference call, "bet big if / walk away if," and a verdict in Duncan's voice. The rubric is editable — add interview transcripts to the corpus and re-distill to deepen it.

## Stack

Node.js, free multi-model ensemble via `~/Tools/lib/ai.cjs`, scraped essay corpus

## Status

Working — outputs markdown and JSON evals per person.
