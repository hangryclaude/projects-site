# PitchBet

A live play-money prediction market for startup pitch competitions. The audience bets fake currency on which startup will win, odds move as the room bets, and the host settles payouts when a winner is called. Built because watching pitches is passive — betting on them isn't.

## How it works

Each startup is a market. You pick a name (no accounts — each browser gets a localStorage identity), submit a startup if you're pitching, and place bets with a plain-English payout preview so nobody has to do decimal-odds math. The board polls every few seconds, so pools and odds update live as the room bets. An `/admin` panel lets the host declare the winner and settle payouts to everyone who backed it. State lives in Vercel Blob so it survives across serverless function invocations.

## Stack

Next.js, React 19, Vercel Blob, deployed on Vercel

## Status

Live at pitchbet.vercel.app — works end to end for a real event.
