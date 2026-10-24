# Handoff: AIWEB Phone on the company website plans section

**Build this in:** corp website project (`c:\aiweb` — `www.theaiwebcompany.com`)  
**Source of truth (billing):** `c:\aiweb-publisher` — Stripe live catalog + Mail/Phone checkout  
**Related:** [`AIWEB_PHONE_CHECKOUT_HANDOFF.md`](./AIWEB_PHONE_CHECKOUT_HANDOFF.md) · [`AIWEB_PHONE_V1.md`](./AIWEB_PHONE_V1.md) · Seller pattern in [`SELLER_CHECKOUT_HANDOFF.md`](./SELLER_CHECKOUT_HANDOFF.md)

---

## Paste into the corp website Cursor project

```
Update the company site pricing / plans section for AIWEB Phone from:
  c:\aiweb-publisher\docs\AIWEB_PHONE_CORP_PLAN_HANDOFF.md

Hosts: www.theaiwebcompany.com (and apex redirect).
Add an AIWEB Phone plan card ($4.99/mo). CTA opens Mail or Phone checkout — do not invent a second Stripe product.
Do not replace Seller, Plus, Business, Agency cards. Phone is additive.
```

---

## What visitors should feel

1. They open **Pricing** (or the homepage plans / seller block).
2. They see **AIWEB Phone** as its own low-friction consumer plan: **your number on the AIWEB**.
3. They tap the Phone CTA and land on checkout that creates an AIWEB Number **only after payment** (not at username green check).
4. After pay they can Call / be Called via ChatGPT or Muse into AIWEB Mail.

---

## Stripe (already live — do not recreate)

| Field | Value |
| --- | --- |
| Account | AI Web Company `acct_1Rv3tbDSe2OspJOf` |
| Product | `prod_VVCnv6NRoy6X2f` — **AIWEB Phone** |
| Price | `price_1UUCOdDSe2OspJOfFFkYPOSU` |
| Lookup key | `aiweb_phone_monthly` |
| Amount | **$4.99 / month** (499 USD) |
| Metadata | `planId=phone`, `product=aiweb-phone` |

No annual Phone price. Do **not** point the Phone CTA at Plus (`price_1U7PWu…`) or Seller (`price_1US0Vf…`).

---

## CTA URLs (use these)

Primary (consumer Phone host):

```
https://phone.theaiwebcompany.com/
```

Or Mail-armed checkout (same pattern as Seller):

```
https://mail.theaiwebcompany.com/?checkout=phone&from=company&interval=monthly
```

Optional deep link with pricing section hash if you add `#phone` on the company page:

```
https://www.theaiwebcompany.com/pricing#phone
```

Company “Get AIWEB Phone” / card button → **mail or phone URL above**. Do not send Phone checkout to OS plan picker unless that surface already supports `tier=phone`.

Mirror Seller: company site does **not** hold the Stripe secret. Checkout stays on Mail / Phone host → Big Search `createCheckoutSession` with `priceId=price_1UUCOdDSe2OspJOfFFkYPOSU`.

---

## Card copy (plan section)

Use a distinct card — not a row inside Seller.

| Element | Copy |
| --- | --- |
| Name | **AIWEB Phone** |
| Price | **$4.99**/month |
| One-liner | Your number on the AIWEB. |
| Bullets (pick 3–4) | IRL Number (`IRL-###-###-###-###`) · Page + Mail · Calls from ChatGPT & Muse · No carrier required for AIWEB messaging |
| CTA label | **Get AIWEB Phone** |
| Footnote | Additive — keep Plus or Seller if you already have them. Number issued after payment. |

**Do not promise:** traditional telephone, SMS, 911, or free personal numbers.

---

## Placement

- Prefer a card **near Seller** (consumer / SMB wedge): Phone = identity + messaging; Seller = list/sell through AIWEB.
- Or a dedicated strip under the main plan grid: **Also: AIWEB Phone — $4.99/mo**.
- Anchor id: `id="phone"` (and keep existing `#seller` for Seller).

Suggested order if both appear in one grid:

1. AIWEB Phone — $4.99  
2. Seller — $19.99  
3. Plus / Business / Agency (existing)

---

## Product rules the site must not contradict

| Rule | Site implication |
| --- | --- |
| Number after payment | CTA copy: “Get your number” OK; do not say “pick a number at signup” before pay |
| Username ≠ number | Green check on `irl/name` is the handle; IRL digits are separate |
| Never reassign (v1) | Do not market “numbers go back into the pool” |
| Grace | Optional fine print: unpaid/canceled holds the number for reactivation (7-day past-due / 30-day cancel hold) — Calls pause when held |

---

## Engineering checklist (corp repo)

- [ ] Add Phone card / section with `$4.99` and CTA URLs above  
- [ ] `id="phone"` for deep links  
- [ ] Nav or pricing TOC link “Phone” if you have plan anchors  
- [ ] Confirm `corpSiteRoutes` (or equivalent) exports `PHONE_SITE_URL` / checkout query if needed  
- [ ] No new Stripe Product in corp repo  
- [ ] Visual: distinct from Seller; brand-first; no purple-default AI look  

---

## Acceptance

- [ ] Pricing page shows AIWEB Phone at $4.99/mo  
- [ ] CTA opens `phone.theaiwebcompany.com` or `mail…?checkout=phone…`  
- [ ] Stripe Checkout line item is **AIWEB Phone** / $4.99 (price id above)  
- [ ] After pay, Account / Phone landing shows an `IRL-…` number bound to that user  
- [ ] Seller and Plus CTAs unchanged  
