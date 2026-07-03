/**
 * kinetic-type — engine.js  (plain ESM, copy verbatim)
 * ─────────────────────────────────────────────────────────────────────────
 * Editorial kinetic typography for crazy-web-effects.
 *
 * Splits a headline into words/chars, then plays a staggered, masked entrance
 * (modes: 'reveal' | 'scramble' | 'wave'). Continuously maps the shared Stage's
 * scroll *velocity* onto a live skew + variable-font weight (font-variation-
 * settings 'wght') so the type "has weight" as the page moves — the Obys /
 * editorial-Awwwards hero feel.
 *
 * CONTRACT compliance:
 *   • No requestAnimationFrame, no scroll/mousemove listeners of its own — it
 *     registers ONE callback on the shared Stage (cwe/stage) and reads
 *     stage.scroll.velocity each frame.
 *   • stage.reducedMotion → renders the text statically, fully visible, no skew.
 *   • init returns an instance with an idempotent destroy() that restores the
 *     original DOM exactly (zero leaks).
 *   • DOM namespaced with data-cwe="kinetic-type" and cwe-kt-* classes.
 *
 * Provenance: split-text-reveal (masked rise + per-unit skew), text-scramble
 * (glyph decode), scroll-velocity-skew (spring-smoothed velocity → skew),
 * stagger-reveal (choreographed stagger). GSAP-free: a tiny built-in splitter.
 *
 *   import { initKineticType } from './engine.js'
 *   const kt = initKineticType(document.querySelector('h1'), { mode:'reveal' })
 *   // kt.replay(); kt.destroy()
 */

import { getStage } from 'cwe/stage';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________ABCDEFGHJKMNPQRSTVWXYZ0123456789';

export const DEFAULTS = {
  /** Headline text. If omitted, the element's existing textContent is used. */
  text: null,
  /** Optional selector resolved within the container (otherwise container itself). */
  selector: null,
  /** Split granularity: 'words' | 'chars'. @default 'chars' */
  split: 'chars',
  /** Entrance mode: 'reveal' | 'scramble' | 'wave'. @default 'reveal' */
  mode: 'reveal',
  /** Per-unit stagger in seconds. @default 0.045 */
  stagger: 0.045,
  /** Per-unit entrance duration in seconds. @default 0.9 */
  duration: 0.9,
  /** Reveal entrance: rise distance as a fraction of unit height. @default 1.05 */
  rise: 1.05,
  /** Reveal/wave: initial per-unit skew (deg), relaxes to 0. @default 8 */
  skew: 8,
  /** Wave mode: vertical amplitude in px. @default 14 */
  waveAmplitude: 14,
  /** Wave mode: spatial frequency across units. @default 0.5 */
  waveFrequency: 0.5,
  /** Wave mode: temporal speed. @default 1.6 */
  waveSpeed: 1.6,
  /** Scramble: frames each char spends scrambling. @default 16 */
  scrambleFrames: 16,
  /** Glyph pool for scramble. @default symbols+alnum */
  glyphs: GLYPHS,
  /** Auto-play the entrance once the element enters the viewport. @default true */
  autoplay: true,
  /** IntersectionObserver fire line (0..1 down the viewport). @default 0.85 */
  threshold: 0.85,
  /** Map scroll velocity → live skew (deg per px/frame, before saturation). @default 0.5 */
  velocityToSkew: 0.5,
  /** Velocity (px/frame) at which skew/weight saturate. @default 60 */
  velocityCap: 60,
  /** Variable-font weight range [rest, max] driven by |velocity|. @default [400, 800] */
  weightRange: [400, 800],
  /** Spring stiffness for velocity smoothing. @default 0.12 */
  stiffness: 0.12,
  /** Spring damping 0..1 (higher = less wobble). @default 0.78 */
  damping: 0.78,
  /** Optional external stage (else the shared singleton). */
  stage: null,
};

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
const saturate = (x) => Math.tanh(x);
const rnd = (set) => set[(Math.random() * set.length) | 0];

export function initKineticType(container, config = {}) {
  const cfg = Object.assign({}, DEFAULTS, config);
  const stage = cfg.stage || getStage();

  const el =
    (cfg.selector && (container.querySelector?.(cfg.selector))) ||
    container;
  if (!el) return { replay() {}, destroy() {} };

  // ── Preserve original so destroy() is lossless + keep accessible string ──
  const originalHTML = el.innerHTML;
  const hadAriaLabel = el.hasAttribute('aria-label');
  const hadDataCwe = el.hasAttribute('data-cwe');
  const text = (cfg.text != null ? String(cfg.text) : (el.textContent || '')).replace(/\s+/g, ' ').trim();

  el.setAttribute('data-cwe', 'kinetic-type');
  el.setAttribute('aria-label', text);
  el.classList.add('cwe-kt-root');

  // ── Build the split DOM (mask wrapper + transformable unit) ─────────────
  // units carry transforms; spaces are real text nodes so wrapping is natural.
  const units = [];   // { node, inner, to, x, order }
  el.textContent = '';

  const tokens = cfg.split === 'words' ? text.split(/(\s+)/) : Array.from(text);
  let order = 0;
  tokens.forEach((tok) => {
    if (tok === '') return;
    if (/^\s+$/.test(tok)) { el.appendChild(document.createTextNode(tok)); return; }
    const mask = document.createElement('span');
    mask.className = 'cwe-kt-mask';
    mask.setAttribute('aria-hidden', 'true');
    mask.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;';
    const inner = document.createElement('span');
    inner.className = 'cwe-kt-unit';
    inner.style.cssText = 'display:inline-block;will-change:transform,opacity,font-variation-settings;';
    inner.textContent = tok;
    mask.appendChild(inner);
    el.appendChild(mask);
    units.push({ node: inner, mask, to: tok, order: order++ });
  });
  const n = units.length || 1;

  const reduced = stage.reducedMotion;

  // ── Entrance state ──────────────────────────────────────────────────────
  let elapsed = 0;          // seconds since play() started
  let playing = false;
  let entranceDone = false;

  function primeHidden() {
    if (cfg.mode === 'scramble') {
      for (const u of units) { u.node.textContent = ''; }
    } else {
      for (const u of units) {
        u.node.style.opacity = '0';
        u.node.style.transform = `translateY(${cfg.rise * 100}%) skewY(${cfg.skew}deg)`;
        u.node.style.transformOrigin = '0% 100%';
      }
    }
  }

  function showStatic() {
    for (const u of units) {
      u.node.textContent = u.to;
      u.node.style.opacity = '1';
      u.node.style.transform = '';
    }
    entranceDone = true;
  }

  // ease — expo.out
  const expoOut = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

  function renderEntrance() {
    if (cfg.mode === 'scramble') {
      const frame = elapsed * 60;                  // virtual ~60fps frame counter
      let allDone = true;
      for (const u of units) {
        const start = u.order * cfg.stagger * 60;   // staggered scramble start
        const end = start + cfg.scrambleFrames;
        if (frame >= end) { u.node.textContent = u.to; }
        else if (frame >= start) { u.node.textContent = rnd(cfg.glyphs); allDone = false; }
        else { u.node.textContent = ''; allDone = false; }
      }
      if (allDone) finishEntrance();
      return;
    }
    // reveal / wave entrance share the masked rise; wave keeps a residual sway.
    let allDone = true;
    for (const u of units) {
      const local = (elapsed - u.order * cfg.stagger) / cfg.duration;
      const t = clamp(local, 0, 1);
      const e = expoOut(t);
      if (t < 1) allDone = false;
      const ty = (1 - e) * cfg.rise * 100;
      const sk = (1 - e) * cfg.skew;
      u.node.style.opacity = String(e);
      u.node.style.transform = `translateY(${ty.toFixed(2)}%) skewY(${sk.toFixed(2)}deg)`;
    }
    if (allDone) finishEntrance();
  }

  function finishEntrance() {
    entranceDone = true;
    playing = false;
    for (const u of units) {
      if (cfg.mode === 'scramble') u.node.textContent = u.to;
      u.node.style.opacity = '1';
      if (cfg.mode !== 'wave') u.node.style.transform = '';
    }
  }

  // ── Velocity → skew + variable weight (live, post-entrance & during) ────
  let smoothed = 0, springVel = 0;
  const [wRest, wMax] = cfg.weightRange;

  function applyKinetic(dt, t) {
    const target = stage.scroll.velocity || 0;
    // critically-damped spring toward live velocity
    const frame = clamp(dt * 60, 0.25, 4);
    const force = (target - smoothed) * cfg.stiffness;
    springVel = (springVel + force) * Math.pow(cfg.damping, frame);
    smoothed += springVel * frame;

    const norm = saturate(smoothed / cfg.velocityCap);   // -1..1 soft-knee
    const skewDeg = norm * cfg.velocityToSkew * 20;       // deg, signed
    const weight = Math.round(wRest + Math.abs(norm) * (wMax - wRest));

    // live variable-font weight on the whole headline
    el.style.fontVariationSettings = `'wght' ${weight}`;

    if (cfg.mode === 'wave' && entranceDone) {
      for (const u of units) {
        const phase = u.order * cfg.waveFrequency - t * 0.001 * cfg.waveSpeed * 6.283;
        const dy = Math.sin(phase) * cfg.waveAmplitude;
        u.node.style.transform = `translateY(${dy.toFixed(2)}px) skewY(${skewDeg.toFixed(2)}deg)`;
      }
    } else if (entranceDone && cfg.mode !== 'wave') {
      for (const u of units) u.node.style.transform = `skewY(${skewDeg.toFixed(2)}deg)`;
    }
  }

  // ── The single registered frame callback ────────────────────────────────
  const onFrame = (dt, t) => {
    if (stage.reducedMotion) { if (!entranceDone) showStatic(); return; }
    if (playing) { elapsed += dt; renderEntrance(); }
    applyKinetic(dt, t);
  };

  function play() {
    if (reduced) { showStatic(); return; }
    elapsed = 0;
    entranceDone = false;
    playing = true;
    primeHidden();
  }

  // ── Boot ────────────────────────────────────────────────────────────────
  let off = null;
  let io = null;
  let destroyed = false;

  if (reduced) {
    showStatic();
  } else {
    primeHidden();
    off = stage.register(onFrame);
    if (cfg.autoplay && typeof IntersectionObserver !== 'undefined') {
      const bottom = Math.round((1 - cfg.threshold) * 100);
      io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { play(); io.unobserve(el); }
        }
      }, { threshold: 0, rootMargin: `0px 0px -${bottom}% 0px` });
      io.observe(el);
    } else if (cfg.autoplay) {
      play();
    }
  }

  return {
    /** Force-replay the entrance from the start. */
    replay() { if (!destroyed) play(); },
    /** The transformable unit elements (read-only). */
    get units() { return units.map((u) => u.node); },
    /** Idempotent teardown: restores original DOM, removes all hooks. */
    destroy() {
      if (destroyed) return;
      destroyed = true;
      off?.();
      io?.disconnect();
      io = null;
      el.style.fontVariationSettings = '';
      el.classList.remove('cwe-kt-root');
      el.innerHTML = originalHTML;
      if (!hadAriaLabel) el.removeAttribute('aria-label');
      if (!hadDataCwe) el.removeAttribute('data-cwe');
    },
  };
}

export default initKineticType;
