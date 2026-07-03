# learn-smth

Enter a topic → get a Data-Center-style sim game that teaches it. For programmers, not classrooms: place real components, wire them, watch work-units physically flow, queues fill, bottlenecks glow red, hardware crashes mid-level.

## Run

```
node server.cjs        # → http://localhost:7901
```

Two hand-tuned topics ship in `specs/` (Computer Networking, Kubernetes). Generate more from the UI ("Generate" box) or CLI:

```
node generate.cjs "Apache Kafka"          # free AI chain (ai.cjs), tier=smart
GEN_TIER=deep node generate.cjs "..."     # stronger ensemble
GEN_TIER=genius node generate.cjs "..."   # free draft + Claude verify (Max plan)
```

## How it works

- `public/engine.js` — ONE generic flow-sim engine (vanilla canvas). Place nodes, drag wires, balls route via BFS with least-loaded tie-break (load balancing emerges naturally). Spike + crash events, SLA drops, money economy, level goals, codex cards.
- `specs/*.json` — a topic spec is the entire game: nodeTypes (real components w/ cost/capacity/latency + practitioner codex), flows (work types w/ routes), levels (budget, spawn rates, events, brief/debrief lessons).
- `generate.cjs` — prompts the free AI with the full networking spec as a few-shot example; 3 attempts with validation feedback.
- `lib/validate.cjs` — the moat: schema repair + **solvability check** (Little's law per stage + N+1 on crash-targeted roles + 25% headroom must fit the budget, completed-goals capped at 80% of expected spawns, SLAs must exceed physical route time). Auto-repairs budgets/goals, rejects unteachable specs.

## The lesson design

The mechanic IS the lesson (Data Center's trick): capacity × (1/latency) ceilings, headroom before spikes, N+1 redundancy, cache vs DB economics. Briefs tell you what to build; debriefs map what just happened to the real concept.
