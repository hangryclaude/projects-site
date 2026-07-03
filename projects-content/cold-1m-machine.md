# Cold 1M Machine

The full plan and control dashboards for a million-email cold operation — built by parallel research and fact-check agents, then honest enough to conclude you shouldn't send a million emails. Companion to inbox-engine, which does the actual sending.

## How it works

A set of static HTML dashboards linked from one command center: a step-by-step morning runbook, a setup tracker with saved progress, an animated end-to-end flow diagram, a ~500-task tree across 6 agent branches, a pan/zoom map of the whole fleet (500 domains and every inbox), a live cost and ROI calculator, and a persona kit that generates sending identities — AI headshots via fal.ai, mapped to names, emails, domains, and CAN-SPAM signatures.

The centerpiece is verification.html: every claim fact-checked against 2026 primary sources. Findings: several "Microsoft rules" circulating in cold-email circles are vendor inventions, the cheap $0.30 inboxes are gray-market Azure, the reply-rate math everyone quotes is ~5x optimistic, and lookalike domains plus rented mailboxes is a genuine legal landmine. Recommendation, in its own words: run 20–50k/month signal-targeted and personalized, not 1M spray.

## Stack

HTML/JS dashboards, Node persona scripts, fal.ai headshot generation, nox-keys credential vault

## Status

Working as a planning and command layer; the verdict page talked the operation down from its own name.
