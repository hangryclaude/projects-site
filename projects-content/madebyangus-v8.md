# Made by Angus v8

Iteration eight of the portfolio site. A laptop sits in a warm void. Click it and the camera flies into the screen — which is a real iframe loading one of 30 actual client sites, fully interactive. A sidebar lists them all; ⌘K opens quick-jump search.

## How it works

The trick is CSS3DRenderer: the iframe is a `CSS3DObject` parented to the same hinge transform as the laptop lid, so it stays locked to the screen plane every frame. Where the screen sits, a `colorWrite: false` plane punches the WebGL canvas transparent so the iframe shows through. GSAP tweens the camera between two named poses over 1.4s, and pointer events flip between canvas and iframe depending on whether you're zoomed in. The laptop is a 13 KB Kenney CC0 GLB with a box-primitive fallback.

## Stack

TypeScript, React, Three.js (vanilla, no R3F), GSAP, Vite

## Status

Superseded by v9, then by the live madebyangus site. Version history.
