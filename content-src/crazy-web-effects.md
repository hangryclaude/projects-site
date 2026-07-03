# crazy-web-effects

**31 composable Claude Code skills that generate award-winning interactive website effects — and a `site-architect` meta-skill that composes them into full, deploy-ready sites.** One person replaces a design team.

![AURORA — a full studio site composed from 7 effect-skills](docs/screenshots/demo-aurora-static.png)

> The site above was composed by `site-architect` from 7 effect-skills into one no-build `index.html`. More in [SHOWCASE.md](./SHOWCASE.md).

Every effect ships two tracks from one engine: a **static, no-build** form (self-contained `index.html` + `engine.js`, deploys to GitHub Pages / Netlify / Vercel) and a **React/Next (R3F)** form. They all plug into one shared runtime so five effects can run on one page without fighting over the render loop, the pointer, scroll, or z-index — see [`CONTRACT.md`](./CONTRACT.md).

## Install (Claude Code plugin)

```
/plugin marketplace add hangryclaude/crazy-web-effects
/plugin install crazy-web-effects
```

Then just ask: *"make me an Awwwards-style site with a shader hero, kinetic headline, and a fluid cursor"* — `site-architect` composes the right effect-skills.

## The skills

| Skill | Effect | Track |
|---|---|---|
| **webgl-scene-kit** *(foundation)* | shared Stage runtime (one loop/pointer/scroll) + three.js bootstrap | static + react |
| **smooth-scroll-stage** | Lenis smooth scroll + `data-speed` parallax spine | static + react |
| **kinetic-type** | split/scramble/wave reveals + variable-font weight on scroll velocity | static + react |
| **magnetic-cursor** | lerp follower cursor + magnetic buttons | static + react |
| **shader-backdrop** | full-screen FBM/gradient or raymarched-SDF hero | static + react |
| **webgl-image-hover** | displacement / RGB-shift hover + click-to-detail | static + react |
| **page-transition-router** | mask/wipe route reveals (View Transitions API) | static + react |
| **ascii-halftone-pass** | ASCII / halftone / dither / CRT postprocess | static + react |
| **physics-playground** | draggable / throwable objects, gravity footers | static + react |
| **flowtype-site** | generative SDF flowing-variable-type calling card | static + react |
| **gpgpu-particle-field** | curl-noise GPU particle hero / image-morph | static + react |
| **fluid-cursor** | Navier-Stokes ink/fluid pointer trail | static + react |
| **liquid-raymarch** | metaball / liquid-metal raymarched centerpiece | static + react |
| **particle-morph** | GPGPU particles assemble into text/logos + staggered morphing | static + react |
| **webgl-text-fx** | SDF typography in GL (troika): liquid / dissolve / scramble / wave | static + react |
| **reaction-diffusion** | Gray-Scott organic growth hero, pointer-seeded, logo-mask aware | static + react |
| **physarum-organism** | GPU slime-mold networks that swarm the cursor | static + react |
| **infinite-grid** | infinite draggable momentum WebGL image grid / strip carousel | static + react |
| **shader-transitions** | displacement/noise/flow-mask slideshow + dual-scene x-ray reveal | static + react |
| **scroll-sequence** | Apple-style pinned image-sequence scroll scrubbing (zero-dep) | static + react |
| **cinematic-grade** | finish pass: bloom + CA + grain + vignette (postprocessing) | static + react |
| **ribbon-trails** | silky iridescent 3D ribbons chasing the cursor (Lusion look) | static + react |
| **depth-parallax** | fake-3D photos tilting volumetrically (depth maps, gyro) | static + react |
| **image-trail** | image stream spawning along the cursor path (zero-dep) | static + react |
| **flowmap-trail** | the studio "cheap fluid" pointer-trail buffer + stage.buffers bus | static + react |
| **glass-transmission** | refractive glass/crystal heroes with chromatic dispersion | static + react |
| **boids-flock** | GPU murmurations that split around the cursor predator | static + react |
| **voronoi-shatter** | images shatter into glass shards, scrubbed by scroll | static + react |
| **gooey-filters** | SVG goo / molten wobble / squiggle / liquid-glass (zero-dep) | static + react |
| **webgpu-particles** | up to 1M TSL compute particles, WebGL2 fallback (three r185) | static + react |
| **site-architect** *(meta)* | brief → layout/palette/motion → composes effects → deploy-ready bundle | — |

## How it works

- **One Stage, one loop.** `webgl-scene-kit/assets/stage.js` owns the single `requestAnimationFrame`, a lerped pointer, the scroll snapshot, viewport, and the `prefers-reduced-motion` gate. Effects `register(cb)` onto it.
- **Scroll is smoothed once.** `smooth-scroll-stage` drives Lenis on that loop and feeds `stage.setScroll(...)`, so every scroll-driven effect reads one value.
- **Composition contract.** Every effect is `init(container, config) → { destroy() }`, namespaced (`data-cwe`), reduced-motion-aware, and ships static + React adapters with the same result.

## Verify

```
npm i          # dev: puppeteer-core
node tools/verify.mjs <url> shot.png   # headless render + console/error capture + screenshot
```

Built by reverse-engineering Awwwards / FWA / Codrops technique, seeded from `website-maker`. MIT.
