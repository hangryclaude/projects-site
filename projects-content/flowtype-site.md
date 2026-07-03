# Flowtype Site

A generator for andrew.net-style landing pages: one glyph rendered as 3D type you can drag and zoom, on a page that ships as two static files. I reverse-engineered the technique, parametrized it, and turned it into a skill that stamps out new ones.

## How it works

The engine bakes a chosen glyph into a signed distance field, extrudes it, sphere-traces it into a brightness buffer, then prints the whole frame as text — variable-weight glyphs shade the solid, a faint word-stream fills the negative space. The skill copies `engine.js` verbatim and fills a template: glyph, flow word, palette, extrusion depth, nav links, slide-up section panels. All customization is config; the engine never changes. Both angusangus.com and the tiger experiment came out of this.

## Stack

Vanilla JS, Canvas 2D, variable fonts, no build

## Status

Working skill, two sites shipped from it.
