/**
 * engine.js — smooth-scroll-stage
 * ─────────────────────────────────────────────────────────────────────────
 * Lenis inertial smooth-scroll + declarative `data-speed` parallax, wired into
 * the shared Stage (CONTRACT.md): it does NOT run its own rAF loop — it registers
 * on the Stage's single loop, drives `lenis.raf(t)` there, and pushes the smoothed
 * scroll into `stage.setScroll(...)` so every other effect reads one scroll value.
 *
 * Harvested + adapted from website-maker/skills/lenis-smooth-scroll (the Active
 * Theory / Lusion / Cuberto stack), stripped to plain ESM and bound to the Stage.
 *
 *   import { initSmoothScroll } from './engine.js'
 *   const scroll = initSmoothScroll({ lerp: 0.1, parallax: true,
 *     onScroll: ({progress}) => header.classList.toggle('shrunk', progress > 0.02) })
 *   // GSAP bridge: scroll.onFrame(() => ScrollTrigger.update())
 *   scroll.scrollTo('#contact', { offset: -80 }); scroll.destroy()
 *
 * Static deps: lenis from esm.sh (see template.html). prefers-reduced-motion →
 * native scroll, no parallax, re-evaluated live.
 */

import Lenis from 'lenis';
// Cross-skill foundation import via import-map alias (deploy-agnostic; see template.html).
import { getStage } from 'cwe/stage';

const RM_QUERY = '(prefers-reduced-motion: reduce)';
function num(v, fb) { if (v == null || v === '') return fb; const n = parseFloat(v); return Number.isFinite(n) ? n : fb; }

const DEFAULTS = {
  lerp: 0.1,
  orientation: 'vertical',
  wheelMultiplier: 1,
  touchMultiplier: 1,
  syncTouch: false,
  parallax: true,
  parallaxSelector: '[data-speed], [data-speed-x], [data-rotate]',
  respectReducedMotion: true,
  onScroll: null,
  lenisOptions: null,
};

export function initSmoothScroll(options = {}) {
  if (typeof window === 'undefined') return inertHandle();
  const C = Object.assign({}, DEFAULTS, options);
  const stage = options.stage || getStage();
  const mql = C.respectReducedMotion ? window.matchMedia(RM_QUERY) : null;

  let lenis = null;
  let destroyed = false;
  let offStageFrame = null;
  let offStageResize = null;
  const frameCallbacks = new Set();

  let targets = [];
  let viewportH = window.innerHeight;
  let parallaxEnabled = C.parallax;

  /* ---- parallax scan + measure ----------------------------------------- */
  function measureTarget(t) {
    const prev = t.el.style.transform; t.el.style.transform = '';
    const rect = t.el.getBoundingClientRect();
    const scrollY = lenis ? lenis.scroll : window.scrollY;
    t.offsetTop = rect.top + scrollY; t.height = rect.height;
    t.el.style.transform = prev;
  }
  function scanParallax() {
    for (const t of targets) t.el.style.transform = '';
    targets = [];
    if (!parallaxEnabled) return;
    document.querySelectorAll(C.parallaxSelector).forEach((el) => {
      const t = { el, speedY: num(el.dataset.speed, 1), speedX: num(el.dataset.speedX, 0),
        rotate: num(el.dataset.rotate, 0), lag: num(el.dataset.lag, 0),
        offsetTop: 0, height: 0, curY: 0, curX: 0, curR: 0 };
      el.style.willChange = 'transform';
      el.setAttribute('data-cwe', 'smooth-scroll-stage');
      measureTarget(t); targets.push(t);
    });
  }
  function applyParallax(scrollY) {
    if (!parallaxEnabled || !targets.length) return;
    for (const t of targets) {
      const elementCenter = t.offsetTop + t.height / 2;
      const viewportCenter = scrollY + viewportH / 2;
      const delta = viewportCenter - elementCenter;
      const targetY = delta * (1 - t.speedY);
      const targetX = delta * t.speedX;
      const passProgress = delta / (viewportH + t.height);
      const targetR = passProgress * t.rotate;
      if (t.lag > 0) {
        t.curY += (targetY - t.curY) * t.lag; t.curX += (targetX - t.curX) * t.lag; t.curR += (targetR - t.curR) * t.lag;
      } else { t.curY = targetY; t.curX = targetX; t.curR = targetR; }
      t.el.style.transform = `translate3d(${t.curX.toFixed(2)}px, ${t.curY.toFixed(2)}px, 0)` +
        (t.rotate ? ` rotate(${t.curR.toFixed(3)}deg)` : '');
    }
  }

  /* ---- push state to the Stage + onScroll callback --------------------- */
  function emitScrollState() {
    if (lenis) {
      stage.setScroll({ y: lenis.scroll, progress: lenis.progress, velocity: lenis.velocity });
      if (C.onScroll) C.onScroll({ scroll: lenis.scroll, limit: lenis.limit, progress: lenis.progress, velocity: lenis.velocity, direction: lenis.direction });
    } else {
      const max = document.documentElement.scrollHeight - viewportH;
      const scroll = window.scrollY;
      const progress = max > 0 ? scroll / max : 0;
      stage.setScroll({ y: scroll, progress, velocity: 0 });
      if (C.onScroll) C.onScroll({ scroll, limit: max, progress, velocity: 0, direction: 0 });
    }
  }

  /* ---- the frame, on the SHARED stage loop ----------------------------- */
  function frame(_dt, t) {
    lenis?.raf(t);
    applyParallax(lenis ? lenis.scroll : window.scrollY);
    for (const cb of frameCallbacks) cb(t);
  }

  function onStageResize() { viewportH = window.innerHeight; lenis?.resize(); for (const t of targets) measureTarget(t); }

  /* ---- build smooth vs native fallback --------------------------------- */
  function buildSmooth() {
    lenis = new Lenis(Object.assign({
      lerp: C.lerp, orientation: C.orientation, wheelMultiplier: C.wheelMultiplier,
      touchMultiplier: C.touchMultiplier, syncTouch: C.syncTouch, autoRaf: false,
    }, C.lenisOptions || {}));
    parallaxEnabled = C.parallax; scanParallax();
    lenis.on('scroll', emitScrollState);
    offStageFrame = stage.register(frame);
    emitScrollState();
  }
  function buildFallback() {
    lenis = null; parallaxEnabled = false; scanParallax();
    offStageFrame = stage.register(frame);   // still feed Stage scroll from native
    emitScrollState();
  }
  function teardownMode() {
    offStageFrame?.(); offStageFrame = null;
    if (lenis) { lenis.destroy(); lenis = null; }
    for (const t of targets) { t.el.style.transform = ''; t.el.style.willChange = ''; }
    targets = [];
  }
  function applyMode() { teardownMode(); if (mql && mql.matches) buildFallback(); else buildSmooth(); }
  function onMotionChange() { if (!destroyed) applyMode(); }

  /* ---- boot ------------------------------------------------------------- */
  applyMode();
  offStageResize = stage.onResize(onStageResize);
  mql?.addEventListener?.('change', onMotionChange);

  return {
    get lenis() { return lenis; },
    get isReducedMotion() { return !!(mql && mql.matches); },
    onFrame(cb) { frameCallbacks.add(cb); return () => frameCallbacks.delete(cb); },
    scrollTo(target, opts) {
      if (lenis) { lenis.scrollTo(target, opts); return; }
      if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
      else { const el = typeof target === 'string' ? document.querySelector(target) : target;
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + (opts?.offset ?? 0), behavior: 'smooth' }); }
    },
    stop() { lenis?.stop(); }, start() { lenis?.start(); },
    refresh() { onStageResize(); scanParallax(); },
    destroy() {
      if (destroyed) return; destroyed = true;
      teardownMode(); frameCallbacks.clear();
      offStageResize?.(); mql?.removeEventListener?.('change', onMotionChange);
    },
  };
}

function inertHandle() {
  const noop = () => {};
  return { lenis: null, isReducedMotion: false, onFrame: () => noop, scrollTo: noop, stop: noop, start: noop, refresh: noop, destroy: noop };
}

export default initSmoothScroll;
