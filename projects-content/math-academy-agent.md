# Math Academy Agent

Auto-solves Math Academy exercises with Claude Sonnet, answering at a human-like pace. The first of the Math Academy tools — built to find out whether an LLM could actually keep up with the curriculum.

## How it works

Two parts. A local Node HTTP server on `127.0.0.1:7676` takes math questions and asks the Claude Sonnet API. A Tampermonkey userscript on `mathacademy.com` reads each question's LaTeX from the page, posts it to the server, waits for the answer, and types it in — with randomised delays so the pacing looks like a person, not a script. Handles multiple-choice and free-response. Questions that need a diagram the model can't see get flagged and left for manual entry.

Superseded by mathacademy-solver, which added vision so the diagram questions stopped being a dead end.

## Stack

Node.js, Claude Sonnet (Anthropic API), Tampermonkey userscript

## Status

Working, but replaced by the vision-based mathacademy-solver.
