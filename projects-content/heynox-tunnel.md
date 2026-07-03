# Heynox Tunnel

A WebGL ad for RPLY: you fly through a 3D tunnel of notifications to reach the Nox vault. Ads are usually static banners nobody looks at — this one is a thing you steer, which turns out to be a much better way to make someone remember a product name.

## How it works

Three.js renders the tunnel and handles the fly-through navigation; the camera moves down the bore while notification elements stream past. Vite handles the asset pipeline and dev server. The viewport is responsive so the same build works across devices.

## Stack

JavaScript, Three.js, WebGL, Vite

## Status

Working — runs locally via `npm run dev`; built as a creative ad unit for the RPLY/NOX brand.
