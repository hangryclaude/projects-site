# angusangus.com

My personal calling card: an ∞ glyph rendered in 3D, printed entirely out of live flowing type. Drag rotates it, scroll zooms. The technique is a faithful port of andrew.net's landing page.

## How it works

The glyph is baked into a 3D signed distance field, extruded, and sphere-traced into a brightness buffer every frame. That buffer is then drawn as text: bold variable-weight glyphs shade the solid, while a faint stream of words flows through the negative space at low opacity. All look-and-feel lives in a `SITE_CONFIG` block in `index.html`; `engine.js` is the verbatim flowtype-site engine and never gets edited. No framework, no build step — two files on a static host.

## Stack

Vanilla JS, Canvas 2D, variable fonts, Cloudflare Pages

## Status

Live at angusangus.com.
