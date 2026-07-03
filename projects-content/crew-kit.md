# crew-kit

The madebyangus tiny construction crew, packaged as a React component library: fifteen workers (barrow, saw-duo, crane-op, lunch break...), a big crane, and an hourglass, droppable into any React page at any size.

## How it works
Each sprite is an alpha-video clip with a baked-in base64 webp poster (`posters.json`) for instant paint. Components normalize scale so one worker figure is always a consistent height regardless of the clip's box shape, with `flip` to walk the other way. A `CrewProvider` context sets the video base URL (defaults to the live madebyangus deploy) and can force static posters instead of animation. Built to dual CJS/ESM with types via tsup.

## Stack
TypeScript, React, tsup, alpha-video sprites + webp posters

## Status
Working library, used by the madebyangus site. Not NOX tooling — it lives in this batch by assignment, not by nature.
