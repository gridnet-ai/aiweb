# Stripe + Checkout for AIWEB Publisher pricing

## UI

Pricing table is under **The portable AI Web Page** (`PublisherPricingTable`, `#pricing`).

| Plan | Monthly | Stripe Price ID |
|------|---------|-----------------|
| Business | $49 | `price_1U6oDzDSe2OspJOfuqu2JxKT` |
| Agency | $499 | `price_1U6oE9DSe2OspJOfNU590041` |
| Agency Pro | $1,499 | `price_1U6oEVDSe2OspJOfZN4alfoE` |
| Enterprise | Custom | Contact sales (`mailto:sales@theaiwebcompany.com`) |

Products live on Stripe account **AI Web Company** (`acct_1Rv3tbDSe2OspJOf`).

## Backend

- **Local:** `api/dev-server.mjs` — `POST /api/create-checkout-session` `{ planId }`
- **Prod:** Firebase Function `api` + hosting rewrite `/api/**`

Checkout uses Billing + Checkout Sessions (`mode: 'subscription'`). No `payment_method_types` (dynamic PMs).

## Local run

1. Copy `.env.example` → `.env` and set `STRIPE_SECRET_KEY`
2. `npm run dev:api`
3. `npm run dev` (proxies `/api` → `:8787`)

## Deploy functions (needs free disk for `functions/npm i`)

```bash
cd functions && npm i && npm run build && cd ..
firebase functions:secrets:set STRIPE_SECRET_KEY --project aiweb-7e40e
firebase deploy --only functions,hosting --project aiweb-7e40e
```

Or `npm run deploy:all` after functions deps are installed.

## Tax

If charging US/EU customers, set up [Stripe Tax registrations](https://docs.stripe.com/billing/taxes/collect-taxes) before enabling `automatic_tax` (not on yet).

## Customer Portal

Enable the [Billing Customer Portal](https://docs.stripe.com/customer-management/integrate-customer-portal) for cancel/upgrade self-serve.
