# AWS Console Clone

A high-fidelity clone of the AWS Management Console — the top nav, services menu, search bar, and working pages for EC2 (with a launch wizard), S3 (buckets and objects), Lambda, and CloudWatch. Everything AWS, except the part where you get billed.

## How it works

Next.js App Router with a shared chrome shell (`TopNav`, `ServicesMenu`, `SearchBar`, `Shell`) wrapping per-service pages. All data is mocked in `lib/mock/` — instances, buckets, functions, metrics, regions, services — with widgets like a cost bar and metric charts rendering it convincingly. Service pages not built individually fall through to a generic `services/[slug]` route.

## Stack

TypeScript, Next.js, React, Tailwind

## Status

Working frontend clone, mock data only.
