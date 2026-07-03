# rust-study

Learning Rust properly, with a system instead of vibes. A local workspace (no repo — it's a scratchpad) that pairs the standard curriculum with a custom AI tutor that costs $0 to ask.

## How it works

The path: rustlings v6.5.0 (all ~90 exercises initialized at `~/dev/rustlings` — variables through ownership, lifetimes, traits, smart pointers, threads, macros) running in watch mode, alongside a freeform cargo workspace for practice. `src/main.rs` is currently a hand-built move-vs-borrow demo with a commented-out line that exists specifically to make the borrow checker deliver the lesson. `cargo clippy` is treated as the best teacher in the room.

Getting unstuck is free: a `rust-tutor` Claude subagent explains concepts, generates drills, and reviews code for idiom and bugs, running entirely on the free `ai` stack. Milestones are written down, ending with the graduation project: porting one of the existing Node CLIs from `~/bin` to Rust.

## Stack

Rust, rustup + cargo + clippy, rustlings, rust-tutor subagent on the free AI chain

## Status

In progress — toolchain installed 2026-07-01, ownership chapter underway.
