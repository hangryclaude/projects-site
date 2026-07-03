# Lockless

Recover a forgotten Screen Time / Restrictions PIN from your own iTunes backup. You locked yourself out, you own the device, and Apple's "Forgot Passcode?" flow doesn't exist on older iOS. This gets your number back.

## How it works

On iOS 7 through 11.4 the Restrictions passcode was stored in the backup as a PBKDF2-SHA1 hash plus a salt. Lockless reads that hash and salt out of the backup, then brute-forces the tiny 4-digit (or 6-digit with `--six`) PIN space against it — a few thousand candidates, done in seconds. Run it interactively to list and pick a backup, or point it at a specific backup directory. A companion `probe.html` handles the rate-limit case.

The honest limit: on iOS 12+ the passcode moved into the Secure Enclave keychain and is no longer recoverable this way. There you're stuck with Apple ID recovery, and Lockless says so instead of pretending.

## Stack

Python 3 (stdlib only — hashlib, plistlib, sqlite3). No dependencies.

## Status

Working. Scoped to iOS 7–11.4 backups; unit tests included (`python3 -m unittest test_lockless.py`).
