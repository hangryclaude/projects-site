/**
 * engine.js — magnetic-cursor
 * ─────────────────────────────────────────────────────────────────────────
 * The signature Cuberto / Lusion pointer treatment, as ONE engine on the shared
 * Stage (CONTRACT.md): a smooth follower ring + leading dot that lerp toward
 * `stage.pointer`, plus any `[data-magnetic]` element that is physically pulled
 * toward the cursor on approach and springs back on leave.
 *
 * It does NOT run its own rAF loop and NEVER attaches scroll/mousemove listeners:
 * it registers ONE callback on `stage.register(cb)` and reads the already-lerped
 * pointer (`stage.pointer.x/y`, viewport px) + `stage.scroll` from the Stage. So
 * five effects on a page share one clock and one pointer — no jitter, no double-rAF.
 *
 * Harvested + adapted from website-maker/skills/custom-cursor and
 * website-maker/skills/magnetic-buttons (the GSAP quickTo studio stack), stripped
 * to plain ESM with frame-lerped physics — zero dependencies.
 *
 *   import { initMagneticCursor } from './engine.js'
 *   const cursor = initMagneticCursor(document.body, { size: 40, blend: true, magnetStrength: 0.4 })
 *   // mark buttons:  <a data-magnetic data-magnetic-strength="0.5">Hire us</a>
 *   cursor.destroy()
 *
 * Touch / coarse-pointer devices and prefers-reduced-motion → the native cursor
 * is restored and no custom cursor is drawn (re-checked live). Idempotent destroy().
 */

import { getStage } from 'cwe/stage';

const RM_QUERY = '(prefers-reduced-motion: reduce)';
const HOVER_QUERY = '(hover: hover) and (pointer: fine)';

const DEFAULTS = {
  /** Outer ring diameter in px. */
  size: 40,
  /** Inner dot diameter in px (0 hides the dot). */
  dotSize: 6,
  /** Ring + dot color (any CSS color). */
  color: '#ffffff',
  /** mix-blend-mode: difference so the cursor inverts content beneath it. */
  blend: false,
  /** Extra trailing smoothing of the ring toward the (already-lerped) pointer, 0→1. */
  ringLerp: 0.2,
  /** Smoothing of the dot toward the pointer (snappier than the ring), 0→1. */
  dotLerp: 0.5,
  /** Ring scale multiplier while hovering a magnetic target. */
  hoverScale: 1.9,
  /** Enable the [data-magnetic] pull. */
  magnet: true,
  /** Selector for magnetic targets. */
  magnetSelector: '[data-magnetic]',
  /** Fraction of the pointer→center offset a magnet travels, 0→1. */
  magnetStrength: 0.4,
  /** Extra px BEYOND a magnet's bounds where the pointer still grabs it. */
  magnetRadius: 80,
  /** Hide the OS cursor while active. */
  hideNativeCursor: true,
  /** z-index of the cursor layer (sits above the --cwe-z-fx band). */
  zIndex: 2147483646,
};

export function initMagneticCursor(container = (typeof document !== 'undefined' ? document.body : null), config = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return inertHandle();

  const C = Object.assign({}, DEFAULTS, config);
  const stage = config.stage || getStage();
  const root = container || document.body;

  const hoverMql = window.matchMedia(HOVER_QUERY);
  // Coarse pointer (touch): never hijack the cursor — return a valid no-op handle.
  if (!hoverMql.matches) return inertHandle();

  let destroyed = false;

  /* ---- build the ring + dot -------------------------------------------- */
  const ring = document.createElement('div');
  ring.className = 'cwe-magnetic-cursor-ring';
  ring.setAttribute('data-cwe', 'magnetic-cursor');
  ring.setAttribute('aria-hidden', 'true');
  ring.style.cssText = [
    'position:fixed', 'left:0', 'top:0',
    `width:${C.size}px`, `height:${C.size}px`,
    'border-radius:999px', 'box-sizing:border-box',
    'pointer-events:none', `z-index:${C.zIndex}`,
    'will-change:transform,opacity', 'opacity:0',
    'transform:translate3d(-100px,-100px,0) translate(-50%,-50%)',
  ].join(';');

  const dot = document.createElement('div');
  dot.className = 'cwe-magnetic-cursor-dot';
  dot.setAttribute('data-cwe', 'magnetic-cursor');
  dot.setAttribute('aria-hidden', 'true');
  dot.style.cssText = [
    'position:fixed', 'left:0', 'top:0',
    `width:${C.dotSize}px`, `height:${C.dotSize}px`,
    'border-radius:999px', `background:${C.color}`,
    'pointer-events:none', `z-index:${C.zIndex}`,
    'will-change:transform,opacity', 'opacity:0',
    'transform:translate3d(-100px,-100px,0) translate(-50%,-50%)',
  ].join(';');

  function styleRing() {
    if (C.blend) {
      ring.style.background = C.color;
      ring.style.border = '0';
      ring.style.mixBlendMode = 'difference';
    } else {
      ring.style.background = 'transparent';
      ring.style.border = `1.5px solid ${C.color}`;
      ring.style.mixBlendMode = 'normal';
    }
    dot.style.display = C.dotSize > 0 ? 'block' : 'none';
  }
  styleRing();

  document.body.appendChild(ring);
  document.body.appendChild(dot);

  /* ---- hide the native cursor ------------------------------------------ */
  const prevRootCursor = root.style.cursor;
  const styleTag = document.createElement('style');
  styleTag.setAttribute('data-cwe', 'magnetic-cursor');
  function hideNative() {
    if (!C.hideNativeCursor) return;
    root.style.cursor = 'none';
    styleTag.textContent =
      `${root === document.body || root === document.documentElement ? 'html,body' : ''} *{cursor:none !important}`;
    if (!styleTag.isConnected) document.head.appendChild(styleTag);
  }
  function restoreNative() {
    root.style.cursor = prevRootCursor;
    styleTag.remove();
  }

  /* ---- magnetic targets ------------------------------------------------- */
  let magnets = [];
  function num(v, fb) { const n = parseFloat(v); return Number.isFinite(n) ? n : fb; }
  function scanMagnets() {
    for (const m of magnets) { m.el.style.transform = ''; m.el.style.willChange = ''; }
    magnets = [];
    if (!C.magnet) return;
    document.querySelectorAll(C.magnetSelector).forEach((el) => {
      el.setAttribute('data-cwe', 'magnetic-cursor');
      el.style.willChange = 'transform';
      magnets.push({
        el,
        strength: num(el.dataset.magneticStrength, C.magnetStrength),
        radius: num(el.dataset.magneticRadius, C.magnetRadius),
        left: 0, right: 0, top: 0, bottom: 0, cx: 0, cy: 0,
        curX: 0, curY: 0,
      });
    });
    measure();
  }
  function measure() {
    for (const m of magnets) {
      const prev = m.el.style.transform; m.el.style.transform = '';
      const r = m.el.getBoundingClientRect();
      m.el.style.transform = prev;
      m.left = r.left; m.right = r.right; m.top = r.top; m.bottom = r.bottom;
      m.cx = r.left + r.width / 2; m.cy = r.top + r.height / 2;
    }
  }

  /* ---- frame state ------------------------------------------------------ */
  let ringX = stage.pointer.x, ringY = stage.pointer.y;
  let dotX = ringX, dotY = ringY;
  let scaleCur = 1;
  let shown = false;
  let staticMode = false;
  let lastScroll = stage.scroll.y;

  function show() { shown = true; ring.style.opacity = '1'; dot.style.opacity = C.dotSize > 0 ? '1' : '0'; }
  function enterStatic() {
    staticMode = true;
    ring.style.opacity = '0'; dot.style.opacity = '0';
    restoreNative();
    for (const m of magnets) { m.curX = m.curY = 0; m.el.style.transform = ''; }
  }
  function exitStatic() { staticMode = false; hideNative(); if (shown) show(); }

  function frame() {
    // prefers-reduced-motion → static: native cursor back, no custom cursor, no pull.
    if (stage.reducedMotion) { if (!staticMode) enterStatic(); return; }
    if (staticMode) exitStatic();
    if (!shown) show();

    const px = stage.pointer.x, py = stage.pointer.y;

    // Re-measure magnet bounds only when the page scrolled (no scroll listener).
    if (C.magnet && magnets.length && stage.scroll.y !== lastScroll) {
      measure(); lastScroll = stage.scroll.y;
    }

    // Magnetic pull + detect hover for the ring grow.
    let hovering = false;
    if (C.magnet) {
      for (const m of magnets) {
        const inside =
          px >= m.left - m.radius && px <= m.right + m.radius &&
          py >= m.top - m.radius && py <= m.bottom + m.radius;
        const tx = inside ? (px - m.cx) * m.strength : 0;
        const ty = inside ? (py - m.cy) * m.strength : 0;
        const k = inside ? 0.25 : 0.12; // pull fast, spring back softer
        m.curX += (tx - m.curX) * k;
        m.curY += (ty - m.curY) * k;
        if (Math.abs(m.curX) < 0.01 && Math.abs(m.curY) < 0.01) { m.curX = 0; m.curY = 0; }
        m.el.style.transform = `translate3d(${m.curX.toFixed(2)}px, ${m.curY.toFixed(2)}px, 0)`;
        if (inside) hovering = true;
      }
    }

    // Ring trails the pointer; dot leads (snappier).
    ringX += (px - ringX) * C.ringLerp;
    ringY += (py - ringY) * C.ringLerp;
    dotX += (px - dotX) * C.dotLerp;
    dotY += (py - dotY) * C.dotLerp;

    const targetScale = hovering ? C.hoverScale : 1;
    scaleCur += (targetScale - scaleCur) * 0.2;

    ring.style.transform =
      `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%,-50%) scale(${scaleCur.toFixed(3)})`;
    dot.style.transform =
      `translate3d(${dotX.toFixed(2)}px, ${dotY.toFixed(2)}px, 0) translate(-50%,-50%)`;
  }

  /* ---- boot ------------------------------------------------------------- */
  hideNative();
  scanMagnets();
  const offFrame = stage.register(frame);
  const offResize = stage.onResize(measure);

  return {
    /** Re-scan the DOM for [data-magnetic] targets (after dynamic inserts). */
    refresh() { scanMagnets(); },
    /** Force a bounds re-measure (after layout shifts). */
    recalc() { measure(); },
    destroy() {
      if (destroyed) return; destroyed = true;
      offFrame?.(); offResize?.();
      restoreNative();
      for (const m of magnets) { m.el.style.transform = ''; m.el.style.willChange = ''; }
      magnets = [];
      ring.remove(); dot.remove();
    },
  };
}

function inertHandle() {
  const noop = () => {};
  return { refresh: noop, recalc: noop, destroy: noop };
}

export default initMagneticCursor;
