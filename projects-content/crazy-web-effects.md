# Crazy Web Effects

Every expensive agency web effect — fluid cursors, GPGPU particles, raymarched metaballs, slime-mold simulations — rebuilt as 31 composable Claude Code skills. Instead of hand-rolling a shader every time a site needs a wow moment, you ask for one and the skill emits verified, working code. A `site-architect` meta-skill composes them into complete deploy-ready sites.

## How it works

Each skill ships two tracks from one engine: a static no-build form (self-contained `index.html` + `engine.js`) and a React/Next (R3F) form. The clever part is the shared runtime contract: one Stage owns the render loop, the lerped pointer, smoothed scroll, and z-index layers, so five effects can run on one page without fighting each other. Skills also publish buffers on the Stage bus — the flowmap trail's texture, for example, can drive any sibling shader's UV distortion. Everything honors `prefers-reduced-motion` and degrades on low-power devices. Installs as a Claude Code plugin marketplace.

The catalog covers the whole Awwwards playbook: Navier-Stokes fluid, curl-noise particle fields, particle morphing into logos, Gray-Scott reaction-diffusion, physarum organisms, boids, glass transmission with dispersion, ASCII/CRT postprocessing, kinetic type, magnetic cursors, infinite draggable galleries, Matter.js physics pits, page transitions, and a cinematic grading pass to finish any of them.

## Stack

JavaScript, GLSL, three.js (esm.sh, no build), Matter.js, Lenis, postprocessing, React/R3F adapters

## Status

Working — 31 skills live in `~/.claude/skills`, used to build several shipped sites (nox-bullet, plinth, madebyangus among them).
