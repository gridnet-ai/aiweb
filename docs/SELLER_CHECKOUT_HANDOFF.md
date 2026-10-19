# AIWEB Seller checkout handoff

The public starting plan is Business at $500 a month. Stripe price `price_1USLPKDSe2OspJOfHSKBL8Wb` on product `prod_VTHz5Xfa8fKpCm`. Lookup key `aiweb_business_500_monthly`. Monthly only. Big Search tier `business_500`.

“Start selling through AIWEB” opens only:

```
https://mail.theaiwebcompany.com/?checkout=business_500&from=company&interval=monthly
```

The company site does not bill, does not create the mailbox, and does not send this plan to AIWEB OS. There is no annual price for this plan.

The hidden Seller checkout, if used again, remains:

```
https://mail.theaiwebcompany.com/?checkout=seller&from=company&interval=monthly
```

## Stripe catalog

Live account: AI Web Company, `acct_1Rv3tbDSe2OspJOf`. Livemode. Automatic tax is off. Tax code `txcd_10000000`.

| Plan | Product | Price | Lookup key | Amount |
| --- | --- | --- | --- | --- |
| Business | `prod_VTHz5Xfa8fKpCm` | `price_1USLPKDSe2OspJOfHSKBL8Wb` | `aiweb_business_500_monthly` | 50000 USD, month |
| Seller | `prod_VSwOSGlOK3QFtT` | `price_1US0VfDSe2OspJOfV6KzhwmZ` | `aiweb_seller_monthly` | 1999 USD, month |

Neither plan has an annual price or a promotion code. Big Search tier for the public plan is `business_500`. Launch calls `createCheckoutSession` with `billing: 'monthly'`, `surface: 'mail'`, and `onboarding: true`. Success returns to `https://mail.theaiwebcompany.com/?billing=success&session_id=...`.

Company env name: `STRIPE_PRICE_BUSINESS_500=price_1USLPKDSe2OspJOfHSKBL8Wb`.
