# macintosh-disk

Mac OS 8 boot disk image (Quadra HFS, ~650 MB), split into 95 MB chunks so it
can be served as static GitHub assets and fetched via HTTP Range from a
WASM Basilisk II emulator running in a browser.

Used by the `/mac` route on [madebyangus.com](https://madebyangus.com).

## Files

`disk.part.aa` … `disk.part.ag` — concatenate in alphabetical order to
reconstruct the original `disk` file:

```sh
cat disk.part.* > disk
```

A `manifest.json` lists each chunk's byte range so the browser worker can
fetch the right one with a sub-Range without downloading the rest.

## Provenance

The disk image is vendored from
[`felixrieseberg/macintosh.js`](https://github.com/felixrieseberg/macintosh.js)
v1.2.0 (the macOS `.app` bundle, `Contents/Resources/app/src/basilisk/disk`).
That project in turn assembles the disk from Apple's Mac OS 8 install and a
curated selection of period software — see its README + LICENSE for details.

## License

The host scripts and metadata in this repo are MIT. The disk image itself
is bound by Apple's Mac OS 8 license and the licenses of the bundled
applications. This mirror exists only for the same fair-use educational /
nostalgia purpose as macintosh.js. If you are a rights-holder and want
something removed, open an issue.
