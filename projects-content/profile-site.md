# Profile Site

The cold-email sending fleet has dozens of fake personas. This gives them a face — a public gallery a friend can edit live: rename any persona, click the avatar, upload a photo, saved for everyone. No git, no redeploy.

## How it works

Static gallery fed by `profiles.json` exported from inbox-engine. Edits go through two API routes: names land in Vercel KV, photos in Vercel Blob (resized to ~512px JPEG in the browser first so uploads stay fast). Editing sits behind a shared passcode; without the storage env vars it degrades to a read-only showcase. Personas without a photo get a generated gradient avatar with their initials.

## Stack

JavaScript, vanilla frontend, Vercel KV (Upstash), Vercel Blob

## Status

Working. Repo ready to import into Vercel; deploy blocked on a full-scope token.
