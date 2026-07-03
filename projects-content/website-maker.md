# Website Maker

An agent that builds interactive websites and grades its own work. It was trained on a scored corpus of award-tier reference sites, carries a library of 35 runnable effect modules, and iterates on a build until it clears a target score. Six generated demo sites average 76/100 on its own scale, with zero API spend.

## How it works

Five parts, one loop: scrape → score → decode → learn → generate. A Playwright-based scorer captures any site (DOM, JS/CSS, network, runtime, screenshots) and rates interactivity 0–100 across ten weighted dimensions — scroll, app-state, motion, craft, micro-interactions, 3D/WebGL, kinetic type, audio/video, cursor, physics — each with 0–10 anchors and automatable detection signals. A 7-facet decoder tears captured sites down into blueprints and steal-lists that feed a retrieval knowledge base. The generator takes a brief, plans, assembles from the skills library, then self-scores and retries until it hits the target tier (Static → Basic → Engaging → Immersive → Award-tier).

The self-grading is the point: the same rubric that rates bruno-simon.com rates the agent's output, so "good enough" is a number, not a vibe.

## Stack

TypeScript/JavaScript, Node, Playwright, static HTML/CSS/GLSL output, Vercel for demos

## Status

Working — showcase live at wm-showcase.vercel.app, six generated sites deployed.
