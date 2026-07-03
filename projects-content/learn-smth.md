# learn-smth

Type a topic, get a sim game that teaches it. Place real components, wire them together, watch work-units physically flow, queues fill, bottlenecks glow red, and hardware crash mid-level. Built for programmers, not classrooms — the inspiration is the game Data Center, where the mechanic *is* the lesson.

## How it works

One generic flow-sim engine (`engine.js`, vanilla canvas) runs every topic. A topic is just a JSON spec: node types with real cost/capacity/latency numbers plus practitioner codex cards, flows with routes, and levels with budgets, spawn rates, and crash events. Balls route via BFS with a least-loaded tie-break, so load balancing emerges naturally instead of being scripted.

New topics generate from the free AI chain with the networking spec as a few-shot example. The moat is `validate.cjs`: a solvability check runs Little's law per stage, demands N+1 redundancy on crash-targeted roles plus 25% headroom within the level budget, and requires SLAs to exceed physical route time. Specs that can't be won get auto-repaired or rejected — no unteachable levels ship. Briefs tell you what to build; debriefs map what just happened to the real concept (headroom before spikes, cache vs DB economics, capacity × latency ceilings).

## Stack

Node.js, vanilla canvas, JSON topic specs, free AI chain (ai.cjs) with tiered generation

## Status

Working — two hand-tuned topics ship (Computer Networking, Kubernetes); more generate on demand.
