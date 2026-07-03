# EyeSite Saver

The 20-20-20 rule says every 20 minutes you should look at something 20 feet away for 20 seconds. Nobody does it, because a polite notification is trivially ignorable. EyeSite Saver isn't polite: it takes over your whole screen.

## How it works

A menu-bar-only Cocoa app (no Dock icon) runs a timer, and when it fires, a full-screen always-on-top overlay fades in on whichever display your mouse is on — a thin progress ring depleting over the break, a light countdown inside it, and one eye-rest tip ("Look at something 20 feet away", "Blink slowly ten times"). Twenty seconds later it fades out and you get back to work.

Work interval and break length are configurable and persist via UserDefaults. The whole thing is one Swift file compiled directly with `swiftc` — no Xcode project, no dependencies, no build system. Add it as a Login Item and forget it exists until it refuses to let you.

## Stack

Swift, Cocoa/AppKit, UserDefaults

## Status

Working — `./build.sh && ./run.sh`, single-file build.
