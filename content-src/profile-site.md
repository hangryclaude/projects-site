# profile-site

A Vercel site of the sending fleet's personas. A friend can open the link and
**set each profile's name + upload a profile picture, live** — saved for everyone
(Vercel KV for names, Vercel Blob for photos), behind a shared passcode. No git,
no redeploy.

Without storage configured it runs **read-only** (great as a public showcase).

## 1. Deploy

```bash
cd profile-site
npx vercel          # first run: log in + link (one time)
npx vercel --prod
```
…or import the GitHub repo at **vercel.com/new** (Framework preset: **Other**,
no build command). Every push then auto-deploys.

## 2. Turn on editing (so your friend can save)

In the Vercel dashboard → your project:

1. **Storage → Create → KV** (Upstash Redis) → connect to the project.
2. **Storage → Create → Blob** → connect to the project.
   (Both auto-add the env vars the API needs.)
3. **Settings → Environment Variables → add `EDIT_PASSCODE`** = a code you give
   your friend.
4. **Redeploy** (Deployments → ⋯ → Redeploy) so the new env vars take effect.

That's it. Now the site shows an **✎ edit** button. Your friend clicks it, enters
the passcode once, then on any profile can edit the **name** and click the
**avatar to upload a photo** — both save instantly for everyone.

## How it works

| piece            | role                                                        |
|------------------|------------------------------------------------------------|
| `profiles.json`  | base data (id, name, role, gender, bio…) from the engine   |
| `api/overrides`  | GET — the friend's edits (name + photo URL) from KV         |
| `api/edit`       | POST — save a name / upload a photo (passcode-gated)        |
| `app.js`         | gallery, profile pages, the editor                         |
| Vercel KV        | stores `{ id: { name, photo } }` overrides                  |
| Vercel Blob      | stores the uploaded images (public URLs)                    |

Photos are resized to ~512px JPEG in the browser before upload, so saves are
fast and storage stays small. Profiles without a photo show a generated gradient
avatar with their initials.

## Run locally

```bash
npm run dev    # http://localhost:4321 — read-only (the /api routes need Vercel)
```

## Regenerate data from the engine

```bash
cd ../inbox-engine
node scripts/export-profiles.js ../profile-site/profiles.json
# or the demo fleet: DB_PATH=./data/demo.db node scripts/export-profiles.js ../profile-site/profiles.json
```
