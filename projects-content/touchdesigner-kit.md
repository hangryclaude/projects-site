# TouchDesigner Kit

Three exploration scripts for finding where MediaPipe data actually lives inside a TouchDesigner project, because TD's operator tree tells you nothing until you interrogate it.

## How it works

Each script runs in the TD Textport and walks the `/project1` hierarchy: one deep-scans hand-tracking CHOPs for live channels, one finds camera TOPs (VideoDevice, Syphon, NDI) and reads specific landmark channels like `h1:index_finger_tip`, one hunts name-hinted webcam TOPs and MediaPipe output connectors. Output is paths, channel names, and dimensions — everything you need before wiring a patch.

## Stack

Python (TouchDesigner runtime), zero dependencies

## Status

Working scratch tools from a TD exploration session.
