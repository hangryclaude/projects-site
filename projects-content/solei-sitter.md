# Solei Sitter

A babysitting/house-sitting landing page for Solei, a student in Santa Barbara. Serif type, a Miami-sunset background photo, and a booking form — a real small-business site for a real person.

## How it works

Static page with a request-a-date form. Submissions hit a Vercel serverless function that texts Solei directly via Twilio SMS, with a honeypot field to silently eat bot submissions. No dashboard, no database — the notification IS the product.

## Stack

HTML, CSS, Vercel serverless, Twilio

## Status

Working. Deployed on Vercel.
