# term-grid

Twelve live terminals in a browser grid. Instead of juggling tabs and windows in a terminal app, you get a wall of real shells rendered in the browser — every one a genuine PTY you can type into.

## How it works

A Node server spins up real pseudo-terminals with node-pty and bridges each one to the browser over a WebSocket (`ws`). Express serves the front end; keystrokes travel to the PTY and its output streams back, so each cell in the grid is a fully interactive shell — not a log view, an actual session. Twelve at once by default, laid out as a grid so you can watch a fleet of processes at a glance.

It's the browser-native cousin of his other terminal tools (term-tile, startup-claude): the same "see everything running at once" instinct, but reachable from any browser pointed at the server instead of tied to iTerm.

## Stack

Node.js, Express, node-pty, ws (WebSockets), vanilla JS front end

## Status

Working prototype. `npm start` runs the server; open the browser to the grid.
