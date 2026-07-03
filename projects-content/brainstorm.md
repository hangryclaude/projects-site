# brainstorm

Type one sentence, get a full project plan filed away — goal, architecture, feature set — ready to hand to an agent later. Built for the gap between having an idea and having time to build it.

## How it works

`node brainstorm.js "<idea>"` sends the prompt to AI and saves the generated plan as an executable structure in `plans/`. `ls`, `show <id>`, and `go <id>` list, inspect, and copy a plan out for immediate instantiation into a dev workflow.

## Stack

Node.js

## Status

Working CLI, small by design.
