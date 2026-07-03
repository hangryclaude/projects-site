# Tiger

A tiger runs across your screen forever, spelled out of the word "tiger". A one-page variant of the flowtype engine where the subject moves.

## How it works

Same type-printing core as the static flowtype engine, but instead of a raymarched glyph, the brightness buffer is driven each frame by a procedurally-articulated tiger silhouette — gallop gait, volume shading, stripes — translating across the screen on a ~6 second loop. Variable-weight Inter does the shading; a faint "tiger tiger tiger" stream fills the negative space.

## Stack

Vanilla JS, Canvas 2D, variable fonts, single HTML file

## Status

Working local experiment. 341 lines, one file.
