# Lockless

Recover a forgotten Screen Time / Restrictions PIN — or, when a modern iPhone leaves no PIN to read, lay out every real way to clear Screen Time. You own the device, you locked yourself out, and this gets you back in without hand-waving.

## How it works

On iOS 7 through 11.4 the passcode lived in the backup as a PBKDF2-SHA1 hash plus salt; Lockless reads it out and brute-forces the tiny 4-digit (or 6-digit) space in seconds. On iOS 12+ Apple moved it into the Secure-Enclave keychain, so backups no longer carry it — but on a jailbroken device (checkm8 / palera1n, iPhone X and older) the **live** keychain can be read over an SSH-over-USB tunnel, and the `--keychain` mode pulls the Screen Time item and recovers the PIN. It handles both the plaintext and the binary key+salt shapes the value takes across versions, and it reads the exact model to tell you whether *your* device is even eligible.

The honest part: on modern A12+/iOS 17+ hardware the PIN cannot be read at all. The only ways to clear Screen Time there are Apple's Apple-ID reset (no wipe) or a full erase + restore (wipes the device) — `--remove` spells both out and `--erase` drives the recovery-mode restore. It never bypasses Activation Lock, so it only ever helps the device's real owner, and it says so.

## Stack

Python 3, stdlib only (hashlib, plistlib, sqlite3, subprocess). Device paths shell out to libimobiledevice + ssh/scp; bundles the BSD-3 `keychain_dumper`.

## Status

Working. Backup path (iOS 7–11.4) and keychain path (iOS 12–16) both covered, with a universal `--remove` / `--erase` fallback for any iPhone. Unit tests included (`python3 test_lockless.py`).
