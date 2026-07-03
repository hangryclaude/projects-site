# Underground Brand Sheets

SMS list building for the Underground 805 store at exactly $0/month: capture phone numbers on the storefront, land them in a Google Sheet I own.

## How it works

A Google Apps Script web app exposes a `doPost` endpoint that appends `[phone, timestamp]` rows to the active sheet. A companion HTML snippet drops into the Shopify theme and posts the visitor's number to that endpoint. No Klaviyo bill, no third-party list holding my customers hostage.

## Stack

Google Apps Script, Google Sheets, HTML snippet for Shopify.

## Status

Working. It's two files; that's all it needs to be.
