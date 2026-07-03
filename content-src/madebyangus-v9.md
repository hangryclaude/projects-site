# madebyangus-v8

3D-laptop portfolio for Angus Duncan, web designer (Montecito, CA).

A clean laptop sits in a warm void. Click it; the camera flies into the
screen; an iframe inside the screen loads one of Angus's real client
sites, fully interactive. A side panel lists all 30 sites; ⌘K opens a
quick-jump search.

## Run it

```sh
cd ~/madebyangus-v8
npm install        # only needed the first time
npm run dev
```

Then open the URL Vite prints (default `http://localhost:5173`, or 5174
if 5173 is taken).

## What's running

- Vite 6 dev server
- React 19 / TypeScript 5
- Three.js 0.160 — vanilla, **not** react-three-fiber (see "deviations" below)
- GSAP 3.15 for the camera tween
- The Kenney CC0 laptop GLB (`public/models/laptop.glb`, 13 KB) loaded
  via `GLTFLoader`. Falls back to box-primitives if the GLB fails.
- Three-point lighting rig (warm key + cool fill + bright rim) plus a
  shadow-receiving ground plane.
- All 30 client sites in `public/sites/` and `public/showcases/`,
  swappable on the laptop screen.
- Sidebar with industry filter chips + Email + Calendar CTAs.
- ⌘K (or Ctrl+K) Spotlight overlay for quick site jumps.

## Architecture in five bullets

- **Vite** — TS + React + HMR. Static assets in `public/sites/<slug>/`
  are served at `/sites/<slug>/...` so the iframe just points there.
- **Three.js (vanilla)** — One React component (`src/scene/Scene.tsx`)
  owns one `WebGLRenderer` plus one `CSS3DRenderer`, both driven by the
  same `PerspectiveCamera`. The component mounts and tears down inside
  `useEffect`. No R3F.
- **CSS3DRenderer for the iframe** — The screen's iframe is a
  `CSS3DObject` parented to the same hinge transform as the lid mesh,
  so its CSS3D matrix stays locked to the laptop's screen plane on
  every frame. Where the screen sits, the WebGL canvas is punched
  transparent (a `colorWrite: false` plane writes depth only) so the
  iframe shows through.
- **GSAP camera rig** — Two named poses live in
  `src/scene/cameraTargets.ts` (`POSE_IDLE`, `computeZoomedPose()`).
  When `view` flips between `idle` and `zoomed`, a GSAP timeline tweens
  position, look-at target, and FOV over 1.4s with `power3.inOut`.
- **Iframe pointer-event gating** — While idle the iframe has
  `pointer-events: none` so clicks fall through to the WebGL canvas
  (which raycasts the screen plane to detect "click to enter"). When
  the zoom-in tween completes, the canvas goes `pointer-events: none`
  and the iframe gets `auto`, so the embedded site is fully interactive.

## Phases shipped so far

| Phase | What landed |
|---|---|
| 0 | Vite + Three.js + CSS3DRenderer scaffold; primitive box-laptop; iframe-in-screen; click-to-zoom GSAP timeline |
| 1 | All 30 client sites copied into `public/`; Sidebar with industry filter chips; Email + Calendar CTAs; Scene swaps iframe `src` on active-site change |
| 2 | Kenney CC0 laptop GLB loaded (replaces boxes); three-point lighting rig; shadow-receiving ground plane; ⌘K Spotlight overlay for quick site jumps |
| 3 | ⌘K Spotlight quick-jump (search 30 sites by name/number/industry/year); Mobile 2D fallback (≤880px); idle motion (mouse parallax + Lissajous drift) |
| 4 | Cloudflare Pages deploy infra (`wrangler.toml`, GitHub Actions, manual `scripts/deploy.sh`, `_headers`/`_redirects`); GitHub repo at `Hangry69/madebyangus-v8`; manual auth steps documented in `DEPLOYMENT.md` |
| 5 | Polish pass: SEO/OG meta tags, custom favicon, vendor bundle split (three / gsap / app), Fraunces + Geist + JetBrains Mono typography |

## Phases still to come

- **Cloudflare manual setup** — Three steps remaining (the only blocking ones), all documented in `DEPLOYMENT.md`: (1) create the Pages project in the dashboard, (2) paste two secrets into GitHub, (3) point `madebyangus.com` at the project. Plan ~10 min total.
- **Real Cal.com URL** — The Calendar CTA points to `cal.com/angusduncan/30min`. Needs a real account or swap to Calendly / Google Calendar's "appointment schedules" embed.
- **Sound + cinematic polish** — Audio feedback on click-to-zoom, optional ambient loop, Lighthouse pass, HDRI environment for proper screen reflections.

## Deviations from the original brief

The brief specified `@react-three/fiber` 8.x + `@react-three/drei` 9.x
and `<Html transform>` for the iframe-on-screen. We tried that pairing
plus R3F 9 + React 19 and could not get R3F's reconciler to mount
its child tree in this environment — `<Canvas>` rendered the canvas DOM
correctly but never invoked `onCreated` and never called any child
component. Vanilla Three.js with `CSS3DRenderer` is the path drei
itself uses internally for transformed `<Html>`, so we get the same
runtime behaviour without the reconciler dependency.

If R3F starts working in this environment later, swapping back is a
mechanical refactor: turn `Scene.tsx`'s imperative scene-build into JSX
inside a `<Canvas>`, and replace the manual `CSS3DObject`/`cssScene`
plumbing with drei's `<Html transform occlude="blending">`.

## Files of note

```
src/
├── main.tsx                  React root + top-level error boundary
├── App.tsx                   View-mode state, active-site state, layout
├── Sidebar.tsx               Left rail — 30-site list with industry filters + Email/Calendar CTAs
├── SearchOverlay.tsx         ⌘K Spotlight quick-jump
├── data/herd.ts              Single source of truth for the 30 sites
├── index.css                 Void-black background, HUD, sidebar, spotlight styles
└── scene/
    ├── cameraTargets.ts      Geometry constants + idle/zoomed pose math
    └── Scene.tsx             Three.js scene, GLB loader, GSAP rig, iframe gating

public/
├── models/
│   ├── laptop.glb            Kenney's CC0 laptop (~13 KB)
│   └── laptop.LICENSE.txt    CC0 1.0 license file
├── sites/<slug>/             26 client sites (mirrors ~/madebyangus/sites/)
└── showcases/<slug>/          4 showcase sites (mirrors ~/madebyangus/showcases/)
```

## Asset attributions

- **Laptop model** — "Laptop" by Kenney, CC0 1.0 Public Domain. Sourced
  from poly.pizza. License preserved in `public/models/laptop.LICENSE.txt`.
- **Client site content** — All 30 sites are Angus Duncan's own work.
