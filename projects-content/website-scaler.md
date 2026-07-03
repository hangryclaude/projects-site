# Website Scaler

An automated multi-agent system that finds local businesses without websites, builds them a site, and emails them a $50 offer. The pitch writes itself: here's your website, already built, fifty bucks.

## How it works

Ten agents run the loop under a Commander: Scout and Scraper find and pull data on website-less local businesses, Builder generates each one a site, Postman sends the offer email, Accountant tracks the money, and Sentinel watches the whole thing (with a shell watchdog to restart it when it falls over). Agents share a common BaseAgent class and queue through an Express server backed by SQLite.

On top sits a dark-mode command center: React + Vite + Tailwind, fed live over WebSocket — stats cards, an activity feed, a sales tracker, an issues panel, and a one-click deploy button.

## Stack

Node.js, Express, SQLite, React, Vite, Tailwind, WebSocket

## Status

Prototype — full agent architecture and dashboard built; an earlier take on the idea that lead-agent and leadkit later did with more discipline.
