# AIWEB Phone checkout handoff

AIWEB Phone is a **$4.99/month** additive subscription. It does not replace Plus/Seller tiers.

Entry (after launch):

```
https://phone.theaiwebcompany.com/
https://mail.theaiwebcompany.com/?checkout=phone&from=phone&interval=monthly
```

Corp website pricing card: see [AIWEB_PHONE_CORP_PLAN_HANDOFF.md](./AIWEB_PHONE_CORP_PLAN_HANDOFF.md).

## Stripe catalog (live)

Live account: AI Web Company, `acct_1Rv3tbDSe2OspJOf`. Livemode.

| Field | Value |
| --- | --- |
| Product | `prod_VVCnv6NRoy6X2f` |
| Product name | AIWEB Phone |
| Statement descriptor | AIWEB PHONE |
| Tax code | `txcd_10000000` |
| Price | `price_1UUCOdDSe2OspJOfFFkYPOSU` |
| Lookup key | `aiweb_phone_monthly` |
| Nickname | AIWEB Phone Monthly |
| Amount | 499 USD, recurring, month |
| Price metadata | `planId=phone`, `billing=monthly` |
| Product metadata | `planId=phone`, `product=aiweb-phone` |

No Phone annual price. No Phone promotion code. Do not use Plus or Seller prices for this plan.

Wired in publisher:

- `src/lib/aiwebPhonePlan.ts` → `PHONE_STRIPE_PRODUCT_ID` / `PHONE_STRIPE_PRICE_ID`
- `functions/src/lib/stripePlatform.ts` → `STRIPE_PRICE_IDS.phoneMonthly`
- Functions env: `AIWEB_PHONE_STRIPE_PRICE_ID=price_1UUCOdDSe2OspJOfFFkYPOSU`

Optional client override: `VITE_AIWEB_PHONE_PRICE_ID` (defaults to the live price id above).

## Checkout callable (Big Search)

`createCheckoutSession` with:

```
tier: phone
billing: monthly
surface: mail | phone
onboarding: true when creating mailbox after pay
priceId: price_1UUCOdDSe2OspJOfFFkYPOSU
planId: phone
returnOrigin: phone or mail origin
metadata: uid, tier=phone, planId=phone
```

Big Search must accept `tier=phone` / this `priceId` and must **not** overwrite Plus/Seller `subscriptionTier` solely because Phone subscribed. Phone entitlement is additive: `users/{uid}.aiwebPhone`.

Success → Phone Service → ANA allocate IRL (idempotent on `subscription.id` / `session.id`).  
Cancel → no mailbox activation, no number.

## Number lifecycle (product rules)

| Event | Behavior |
| --- | --- |
| Username green check | Handle only — **no** IRL allocate |
| Checkout success | ANA allocates once; never reassign in v1 |
| Past due | Calls OK **7 days**, then pause; number held |
| Canceled | Calls stop; number held **30 days** for reactivate (not recycled in v1) |

## Webhook

Existing `https://www.theaiwebcompany.com/api/stripe/webhook` (and publisher `stripeWebhook`):

- Detect Phone via price id `price_1UUCOdDSe2OspJOfFFkYPOSU` or metadata `tier` / `planId` = `phone`
- Write additive `users/{uid}.aiwebPhone` (do not clear Plus/Seller tier)
- Call ANA allocate / hold on status changes

Stripe Tax is not turned on for this session. Product tax code is set; enable `automatic_tax` only after a registration is active.
