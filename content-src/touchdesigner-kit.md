# touchdesigner-kit

Exploration scripts for mapping MediaPipe operator trees inside TouchDesigner.

## What it does

Three Python scripts intended to be run inside the TouchDesigner scripting console. They walk the `/project1` operator hierarchy to locate hand-tracking CHOPs, face/pose tracking components, webcam TOPs, and live MediaPipe output connectors — printing channel names, paths, and dimensions so you know exactly where hand and face data lives before wiring it into a patch.

- `td_explore.py` — lists `/project1` children and deep-scans `hand_tracking2` for any live CHOP channels.
- `td_explore2.py` — finds camera-type TOPs (VideoDevice, MovieFileIn, Syphon, NDI), checks the MediaPipe comp tree, and reads specific hand landmark channels (`h1:index_finger_tip`, `h1:wrist`, etc.).
- `td_explore3.py` — hunts name-hinted TOPs (webcam, camera, rgb…), surfaces large live TOPs inside MediaPipe (≥480 px wide), and lists MediaPipe output connector wiring.

## Use

Paste or drag each script into the TouchDesigner **Textport / Script DAT** and execute it. Output goes to the Textport console.

```
# Inside TouchDesigner Textport
exec(open('td_explore.py').read())
exec(open('td_explore2.py').read())
exec(open('td_explore3.py').read())
```

## Stack

Python (TouchDesigner runtime) — no external dependencies, no API calls.
