# Agent·SB — AI agent setup landing page

A one-page site for your local Santa Barbara service: you install custom AI agents
on people's computers, come to their house, set it up, and run a tutorial. They fill
out a form about what they'd use it for; you reach back out.

> Pricing is intentionally **not** shown on the site.

## Make the form deliver to you (2 minutes)

The form needs somewhere to send submissions. Easiest free option is Formspree:

1. Sign up at https://formspree.io (free tier is plenty).
2. Create a new form, point it at your email (angusduncan805@gmail.com).
3. Copy the form ID — the part after `/f/` in your endpoint
   (e.g. `https://formspree.io/f/abcdwxyz` → `abcdwxyz`).
4. Open `index.html`, find `const FORMSPREE_ID = "YOUR_FORM_ID";` and paste it in.

Until you do that, the form falls back to opening a pre-filled email so nothing is lost.

## Run it locally

```
cd ~/agent-setup-sb
python3 -m http.server 8080
```
Then open http://localhost:8080

## Put it online

It's a single static file — drop it on any host:
- **Vercel:** `npx vercel` in this folder.
- **Netlify:** drag the folder onto app.netlify.com.
- **GitHub Pages:** push and enable Pages.
