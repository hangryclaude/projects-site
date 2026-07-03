# cheat-glasses

AI homework solver. Camera input → Claude vision → spoken answer in your ear.

## Setup

```bash
cd ~/cheat-glasses
.venv/bin/pip install -r requirements.txt
cp .env.example .env       # paste ANTHROPIC_API_KEY
```

## Run desktop dev mode (webcam + TTS)

```bash
.venv/bin/python main.py
```

Keys: `SPACE` snap · `A` auto-mode · `M` mute TTS · `Q` quit.

## Run as HTTP server (for phone/glasses client to POST images)

```bash
.venv/bin/uvicorn server:app --host 0.0.0.0 --port 8766
```

```bash
curl -X POST http://localhost:8766/solve -F "image=@page.jpg"
# -> {"answer": "...", "no_questions": false, "ms": 2053}
```

## Tests

```bash
.venv/bin/python -m pytest tests/ -v       # all tests, hits real Claude API
CHEAT_NO_API=1 .venv/bin/python -m pytest  # skip live API tests
```

## Files

- `core.py` — Claude vision pipeline (encode → solve → retry).
- `main.py` — webcam dev mode.
- `server.py` — FastAPI HTTP endpoint.
- `speak.py` — macOS TTS (routes to AirPods if connected).
- `tests/` — sanity + live API smoke tests.
- `samples/` — test images.
- `logs/` — runtime logs.
