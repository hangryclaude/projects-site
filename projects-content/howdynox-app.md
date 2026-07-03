# howdynox-app

The real heynox.com source, deployed to a second domain (howdynox.com) so the RPLY download campaign has its own funnel that never touches production. The static mirror attempt (howdynox) couldn't render the hero animations; this one is pixel-identical because it *is* the site.

## How it works
An isolated copy of the nox-website Next.js codebase with one addition: `public/redirect.js`, which reroutes every download button to the campaign target (`RPLY.dmg` on S3) and deliberately keeps heynox.com out of the click chain. Deployed as its own Vercel project with placeholder Supabase env so the build passes without prod credentials. DNS on Cloudflare, apex A record straight to Vercel.

## Stack
Next.js 15, React 18, TypeScript, Tailwind, Supabase, Stripe, GSAP/Three.js/Matter.js, Vercel, Cloudflare DNS

## Status
Live at howdynox.com — the working campaign domain.
