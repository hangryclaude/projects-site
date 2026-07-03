# Lockless 🔓

Recover a forgotten **Screen Time / Restrictions PIN** from an iTunes backup.

Works on **iOS 7 → 11.4**, where the Restrictions/Screen Time passcode was stored as
a PBKDF2-SHA1 hash inside the backup. On iOS 12+ the passcode moved into the
Secure-Enclave keychain and isn't recoverable this way — there, use
**Settings → Screen Time → "Forgot Passcode?"** with your Apple ID.

This is a recovery tool for *your own* backup and *your own* PIN.

## Use

```bash
python3 lockless.py            # interactive: list backups, pick one
python3 lockless.py <backup>   # target a specific backup dir
python3 lockless.py --six      # try 6-digit PINs instead of 4
```

Tests: `python3 -m unittest test_lockless.py`

## How it works

Reads the Restrictions hash + salt from the backup, then brute-forces the (small)
PIN space against the stored PBKDF2-SHA1 hash. `probe.html` is a companion
rate-limit probe.

## Stack

Python 3 (stdlib only — `hashlib`, `plistlib`, `sqlite3`). No dependencies.
