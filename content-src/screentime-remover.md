# Lockless 🔓

Recover a forgotten **Screen Time / Restrictions PIN** — from an iTunes backup, or
straight off a jailbroken device's keychain — and, when a modern iPhone leaves no PIN to
read, lay out every real way to clear Screen Time.

| iOS | Method | Wipe? |
|-----|--------|-------|
| 7 – 11.4 | read the PBKDF2-SHA1 hash from an **iTunes backup**, brute-force it | no |
| 12 – 16 | **jailbroken ≤ iPhone X** → dump the live keychain over SSH → read the PIN | no |
| 17+ / A12+ | PIN can't be read — Apple-ID reset (no wipe) or erase+restore | — |

This is a recovery tool for *your own* device. It does **not** bypass Activation Lock:
after an erase the device still needs its owner's Apple ID, so it only helps the real owner.

## Use

```bash
python3 lockless.py                       # iOS 7–11.4: recover the PIN from a backup
python3 lockless.py --keychain            # iOS 12–16: read it off a jailbroken device
python3 lockless.py --remove              # any iPhone: show every real removal option
python3 lockless.py --erase --yes-wipe    # universal: wipe + restore in recovery mode
python3 lockless.py --doctor              # check tools + device, print a readiness report
```

## How it works

The passcode is `PBKDF2-HMAC-SHA1(pin, salt, 1000)`. Pre-iOS-12 it lives in a plist inside
every backup; iOS 12+ moved it into the Secure-Enclave keychain, so Lockless reads the
**live** keychain over an `iproxy` USB tunnel on a jailbroken device and pulls the
`ParentalControls` item — handling both the plaintext and the binary key+salt forms. It
detects the exact model (checkm8 eligibility) so it tells you what's possible for *your*
device, not a generic guess.

## Stack

Python 3, stdlib only (`hashlib`, `plistlib`, `sqlite3`, `subprocess`); shells out to
`libimobiledevice` + `ssh`/`scp` for the device paths. Bundles `keychain_dumper` (BSD-3).
