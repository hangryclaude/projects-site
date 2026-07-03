# Camera Watch

A proximity tracker for automated license-plate-reader cameras — so you know when you're being recorded. Pulls the locations of ALPR cameras near you onto a map from public map data.

## How it works

A small Express server proxies the OpenStreetMap Overpass API, querying for nodes tagged as ALPR surveillance within a bounding box, and normalizes them (id, lat/lon, operator, direction) for the frontend. Sightings persist to a local `sightings.json`. The whole thing is one server file plus a static page — no accounts, no tracking of you.

## Stack

Node.js, Express, OpenStreetMap Overpass API

## Status

Working prototype. Only as complete as OSM's crowd-sourced camera tags.
