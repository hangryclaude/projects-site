# RobloxBR

A Roblox third-person shooter / battle royale inspired by Rivals (Nosniy Games) — solo, duo, and squad rounds on island maps, with weapons, grapple movement, cosmetics, emotes, achievements, and seasonal rewards. Built as a Rojo project so the entire game is readable source instead of a binary place file.

## How it works

`Main.server.luau` runs authoritative match flow on the server; client controllers drive the loading screen, UI, and moment-to-moment gameplay. Everything content-shaped is data-driven in `src/shared/` — weapon configs and models, grapple tuning, POIs, vehicles, prefabs, cosmetics, dialogue, achievements, season rewards — so adding content means editing typed Luau tables, not clicking through Studio. A `notes/` folder holds a research brief on Rivals' mechanics, rewritten in my own words, that the tuning was checked against. Match history surfaces through a controller reading JSON attributes. The `game.rbxl` place file isn't committed; `wally install` plus `rojo build` reconstructs it from source, and `rojo serve` live-syncs into Studio. Selene and StyLua keep the Luau honest.

## Stack

Luau, Rojo, Wally, Selene + StyLua, Roblox Studio

## Status

Working Rojo project — builds and runs from source. Not published on Roblox.
