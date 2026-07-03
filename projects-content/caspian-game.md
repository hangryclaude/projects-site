# Caspian

Data and tooling for a game called Caspian. The part that exists so far: a generator for a fictional in-game email client — because the game's world needed an inbox full of people trying to sell you something, and writing 2,000 emails by hand is not happening.

## How it works

Three Node scripts build the dataset. `generate-personas.js` creates 50 NPC senders with attribute tags (age, gender, role); `generate-messages.js` writes 50 message variants across 10 rhetorical angles, some with `requires` rules that gate which senders can carry them (a "teen-boy" variant only pairs with the 3 teen-male NPCs); `build-combos.js` computes the valid sender-by-message matrix — currently 2,000 combos. Avatars get fetched per persona, and a `preview.html` renders the whole inbox for eyeballing. Nothing sends email; the output is static JSON plus images the game draws from.

## Stack

Node.js, static JSON, HTML preview

## Status

The inbox data pipeline works. The game around it is still mostly in my head.
