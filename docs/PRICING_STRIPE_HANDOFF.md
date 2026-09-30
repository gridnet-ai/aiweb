# Handoff: clone Pricing + Stripe Checkout update

**Source project:** `aiweb` (`c:\aiweb`) — corporate site  
**Source URL (local):** `http://localhost:5174/#pricing`  
**Live hosting:** `https://aiweb-7e40e.web.app` (Firebase project `aiweb-7e40e`)  
**Audience:** Another Cursor / Vite+React+Tailwind project that should mirror this Pricing section and Checkout API.

Related: 4-step story [`PUBLISHER_PAGE_HANDOFF.md`](./PUBLISHER_PAGE_HANDOFF.md) · ChatGPT plugin [`CHATGPT_PLUGIN_HANDOFF.md`](./CHATGPT_PLUGIN_HANDOFF.md) · living MCP log `c:\aiweb-publisher\DEV_LOG.md`

---

## Paste into the other Cursor project

```
Copy-clone the Publisher Pricing + Stripe Checkout update from:
  c:\aiweb\docs\PRICING_STRIPE_HANDOFF.md
  c:\aiweb\src\components\corp\PublisherPricingTable.tsx
  c:\aiweb\src\lib\pricingPlans.ts
  c:\aiweb\src\lib\stripeCheckout.ts
  c:\aiweb\src\pages\CheckoutResultPages.tsx
  c:\aiweb\api\dev-server.mjs
  c:\aiweb\functions\src\index.ts
  c:\aiweb\docs\STRIPE_CHECKOUT.md

Goal: same pricing matrix (mobile stacked / desktop table) + Stripe
subscription Checkout for Business / Agency / Agency Pro.

Rules:
- One Stripe Product per plan (do not put tiers on a single Product).
- Checkout Sessions mode: subscription — omit payment_method_types.
- Enterprise = mailto sales, not Checkout.
- Never commit STRIPE_SECRET_KEY; use .env / Firebase secrets.
- Wire table under the portable AI Web Page section (or equivalent).
```

Or add `c:\aiweb` as a second workspace folder and point the agent at this file.

---

## What shipped

| Piece | Detail |
|-------|--------|
| Pricing UI | `#pricing` under “The portable AI Web Page” |
| Mobile | Stacked plan blocks (feature list + full-width CTA) |
| Desktop (`md+`) | Comparison matrix table |
| Plans | Business $49 · Agency $499 · Agency Pro $1,499 · Enterprise Custom |
| Checkout | `POST /api/create-checkout-session` `{ planId }` → Stripe Checkout URL |
| Returns | `/checkout/success`, `/checkout/canceled` |

---

## Files to copy

### Frontend

```
src/components/corp/PublisherPricingTable.tsx
src/lib/pricingPlans.ts
src/lib/stripeCheckout.ts
src/pages/CheckoutResultPages.tsx
```

Wire into the page that owns the portable / product section:

```tsx
import { PublisherPricingTable } from '@/components/corp/PublisherPricingTable';
// …
<PublisherPricingTable />
```

Routes (see `src/App.tsx`):

```tsx
<Route path="/checkout/success" element={<CheckoutSuccessPage />} />
<Route path="/checkout/canceled" element={<CheckoutCanceledPage />} />
```

### Backend

```
api/dev-server.mjs                 # local Vite proxy target (no Stripe SDK)
functions/src/index.ts             # Firebase HTTPS function `api`
functions/package.json
functions/tsconfig.json
firebase.json                      # rewrite /api/** → function api (before SPA **)
```

### Config / docs

```
.env.example
docs/STRIPE_CHECKOUT.md
vite.config.ts                     # proxy /api → http://localhost:8787
package.json scripts: dev:api, deploy:all
```

---

## Stripe catalog (already created on AI Web Company account)

Account: `acct_1Rv3tbDSe2OspJOf` (same live key as Big Search `bigsearch-fd03f`).

| Plan | Product | Price ID (monthly USD) |
|------|---------|-------------------------|
| Business | `prod_V72ICL7FiD8Bmh` | `price_1U6oDzDSe2OspJOfuqu2JxKT` ($49) |
| Agency | `prod_V72IXAdZefOJ4z` | `price_1U6oE9DSe2OspJOfNU590041` ($499) |
| Agency Pro | `prod_V72IwAjvFygw4P` | `price_1U6oEVDSe2OspJOfZN4alfoE` ($1,499) |
| Enterprise | — | Contact `sales@theaiwebcompany.com` |

Env:

```bash
STRIPE_SECRET_KEY=sk_live_…   # from bigsearch Firebase secret STRIPE_SECRET_KEY
STRIPE_PRICE_BUSINESS=price_1U6oDzDSe2OspJOfuqu2JxKT
STRIPE_PRICE_AGENCY=price_1U6oE9DSe2OspJOfNU590041
STRIPE_PRICE_AGENCY_PRO=price_1U6oEVDSe2OspJOfZN4alfoE
SITE_ORIGIN=https://your-production-origin
API_PORT=8787
```

**Do not invent new price IDs** unless creating a separate Stripe catalog for that product.

To pull the shared secret from Big Search (same as this repo did):

```bash
npx firebase-tools@15.15.0 functions:secrets:access STRIPE_SECRET_KEY --project bigsearch-fd03f
```

`C:\aiwebpage` does **not** store its own secret — checkout is shared via Big Search / this Stripe account.

---

## Local smoke

```bash
cp .env.example .env   # fill STRIPE_SECRET_KEY + price IDs
npm run dev:api        # :8787
npm run dev            # :5174, proxies /api
```

1. Open `/#pricing` — mobile stacked, desktop table.
2. Subscribe → Stripe Checkout (live key = real charges; use a test card only on `sk_test_`).
3. Success/cancel URLs land on `/checkout/success` and `/checkout/canceled`.

---

## Production deploy

**Hosting only** (UI):

```bash
npm run deploy:hosting   # project aiweb-7e40e
```

**Checkout on production** also needs the function:

```bash
cd functions && npm i && npm run build && cd ..
firebase functions:secrets:set STRIPE_SECRET_KEY --project aiweb-7e40e
# ensure STRIPE_PRICE_* / SITE_ORIGIN params match catalog
firebase deploy --only functions,hosting --project aiweb-7e40e
# or: npm run deploy:all
```

Hosting rewrite order matters: `/api/**` → `api` **before** `**` → `index.html`.

---

## Feature matrix (keep in sync)

| Feature | Plus | Business | Agency | Agency Pro | Enterprise |
|---------|------|----------|--------|------------|------------|
| Price | $19.99 | $49 | $499 | $1,499 | Custom |
| aiWh | 500 | 1,000 | 8,000 | Dedicated | Custom |
| Pages | Unlimited | Unlimited | Unlimited | Unlimited | Unlimited |
| Projects | Unlimited | Unlimited | Unlimited | Unlimited |
| Publisher Agent | ✓ | ✓ | ✓ | ✓ |
| AI Check | ✓ | ✓ | ✓ | ✓ |
| Get Quote / AIWEB Actions | ✓ | ✓ | ✓ | ✓ |
| Project organization | Basic | ✓ | ✓ | ✓ |
| Client reporting | — | ✓ | ✓ | ✓ |
| Team permissions | — | Basic | Advanced | Custom |
| API / integrations | — | — | ✓ | ✓ |

---

## Do not copy

- Full welcome hero / unrelated corp pages (unless you want the whole site)
- Committing `.env` or live `sk_live_` keys
- Putting all tiers as Prices on one Stripe Product

---

## Tax / portal (follow-ups)

- Enable [Stripe Tax registrations](https://docs.stripe.com/billing/taxes/collect-taxes) before `automatic_tax` (not enabled in this code yet).
- Enable [Customer Portal](https://docs.stripe.com/customer-management/integrate-customer-portal) for self-serve cancel/upgrade.
