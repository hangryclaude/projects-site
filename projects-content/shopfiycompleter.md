# ShopfiyCompleter

Yes, the repo name misspells Shopify. It stays. Underneath the typo is the biggest build in this category: a full multi-store Shopify admin panel that connects to real stores over OAuth.

## How it works

FastAPI backend with SQLAlchemy + Alembic migrations, Shopify OAuth flow, and REST clients for products, orders, inventory, customers, themes, and store settings — multi-store with role-based access (users, admins, RBAC guards). React + TypeScript + Vite frontend: dashboard, data tables, store switcher, protected routes. Login, connect a store, manage it from one panel.

## Stack

Python, FastAPI, SQLAlchemy, Alembic, React, TypeScript, Vite, Shopify Admin API + OAuth.

## Status

Prototype — the architecture is all there; never ran against a paying store.
