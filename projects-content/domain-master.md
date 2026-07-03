# Domain Master

The brute-force cousin of domain-grabber: scan the entire 3-character .com space against Verisign RDAP, hunting for available or soon-expiring domains. Three-letter .coms resell for real money; the game is catching drops.

## How it works

`scan3.py` generates permutations — letters, digits, alphanumeric, plus CVCVC and short-word wordlists for pronounceable targets — and checks each against Verisign's RDAP endpoint with `concurrent.futures` for parallel lookups. Registration data on hits shows what's expiring soon.

## Stack

Python 3, Verisign RDAP, wordlists.

## Status

Working. Spoiler: almost every 3-char .com is taken. The expiry data is the actual edge.
