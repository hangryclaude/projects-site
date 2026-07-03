# PLINTH

A deadpan sample storefront for meme furniture. "Serious furniture for unserious objects." DROP 001 is twelve products: a baseball cap the size of an armchair, a coffee table shaped like a giant wristwatch, a UFO lamp mid-cow-abduction, an 8-ball rug. Every product page is played completely straight — editorial catalog photography, SKUs, spec sheets ("Materials: ABS saucer, one (1) cow, tractor beam. Cow: non-negotiable.").

## How it works

The whole shop is driven by one `catalog.json`: name, price, copy, spec, accent color, and an image prompt per product. A Node script feeds those prompts through fal.ai's flux model (queue API) and emits 4:5 webp product shots, so the entire catalog's photography is generated for cents and regenerating a product is a one-line edit. The storefront itself is a static `index.html` + `app.js` gallery styled like a design-object shop, with effects from the crazy-web-effects library.

The joke only lands because the presentation never winks — the comedy is entirely in the copy and the objects.

## Stack

HTML, CSS, vanilla JS, Node, fal.ai (flux) for product imagery

## Status

Live at plinth-mauve.vercel.app — a sample shop, nothing is actually for sale.
