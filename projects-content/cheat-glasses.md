# cheat-glasses

Camera sees the homework, Claude solves it, the answer arrives spoken in your ear. The name says what it's for. Point a webcam (or a glasses-mounted camera on a phone) at a worksheet and get the answer read aloud without touching anything.

## How it works

Two modes off one core. Desktop dev mode (`main.py`) watches the webcam — hit SPACE to snap, or turn on auto-mode and it captures on its own — and pipes frames through `core.py`: encode the image, send to Claude vision, retry on flake, return the answer. `speak.py` handles macOS text-to-speech and routes audio to AirPods when they're connected, which is the whole point. Server mode (`server.py`) exposes the same pipeline as a FastAPI endpoint, so a phone or glasses client just POSTs a JPEG to `/solve` and gets back `{"answer": ..., "ms": 2053}` — roughly two seconds from image to answer. If the frame has no actual questions in it, it says so instead of hallucinating one. There's a real test suite, including live-API smoke tests you can skip with `CHEAT_NO_API=1`.

## Stack

Python, Claude vision (Anthropic API), FastAPI, OpenCV webcam capture, macOS TTS

## Status

Working — desktop and HTTP server modes both functional. Use responsibly, or at least discreetly.
