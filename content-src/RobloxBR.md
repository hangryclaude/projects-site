# RobloxBR 🎯

A Roblox third-person shooter / battle-royale inspired by **Rivals** (Nosniy Games) —
solo / duo / squad rounds on island maps, with weapons, grapple movement, cosmetics,
emotes, achievements and seasonal rewards. Built as a Rojo project so the whole game
lives as readable source.

## Highlights

- **Combat & movement** — weapons (`WeaponsDB`, `WeaponConfig`, `WeaponModels`),
  grapple traversal (`GrappleConfig`), tuned against real gameplay (see `notes/`).
- **Match flow** — server `Main.server.luau` runs rounds; client controllers,
  loading screen and UI drive the experience.
- **Content databases** — POIs, vehicles, prefabs, cosmetics, emotes, dialogue,
  achievements and season rewards, all data-driven in `src/shared/`.
- **Match history** — recent matches surfaced via a controller + JSON attributes.

## Build & run

This is a [Rojo](https://rojo.space) project. The compiled place file (`game.rbxl`) is
**not** committed — rebuild it from source:

```bash
wally install            # fetch packages (wally.toml)
rojo build -o game.rbxl  # build the place
rojo serve               # or live-sync into Roblox Studio
```

Lint/format configured via `selene.toml` and `stylua.toml`.

## Layout

- `src/server/` — authoritative game logic.
- `src/client/` — controllers, loading screen, UI.
- `src/shared/` — typed config + content databases shared by both.
- `notes/` — research brief (Rivals mechanics, in our own words).

## Stack

Luau · Rojo · Wally (packages) · Selene + StyLua · Roblox Studio.
