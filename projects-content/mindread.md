# Mindread

Paste the message you're about to send and find out how it will actually land — before the other person tells you the hard way. Mindread keeps psychological profiles of the people in your life and analyzes drafts against them.

## How it works

An Express server with a SQLite database of profiles: name, relationship, values held, hot buttons, what works, what fails. You submit a draft plus a goal, and a heavily-loaded Claude system prompt analyzes it through actual frameworks — Cialdini's influence levers, Kahneman's System 1/2 and loss aversion, Haidt's moral foundations, Goffman's face-work, attachment styles, power asymmetry. It returns a brutally honest read on how the message lands for that specific person, plus a rewrite. Every draft, analysis, and outcome is stored, so the profile gets sharper over time.

## Stack

Node.js, Express, better-sqlite3, Anthropic SDK (Sonnet)

## Status

Working prototype, local only.
