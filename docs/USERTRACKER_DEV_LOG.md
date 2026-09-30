# Company User Tracker — Development Log

**URL:** [https://os.theaiwebcompany.com/usertracker](https://os.theaiwebcompany.com/usertracker)  
**Purpose:** Internal Active User Roster + MAU / billed vs list MRR·ARR / 30-day logo churn for AI Web Company ops.  
**Shipped:** 2026-09-05 (registry Functions + Hosting). Access hardened same day to a single staff seat.

---

## Login (staff only)

| Field | Value |
|-------|--------|
| **Dashboard** | https://os.theaiwebcompany.com/usertracker |
| **Email** | `admin@theaiwebcompany.com` |
| **Sign-in method** | Email & password (Firebase Auth on **Big Search** project `bigsearch-fd03f`) |
| **Firebase UID** | `Y0iC89pweVhbuVWE5AS7dquZYZM2` |
| **Password** | **Not stored in this repo.** Use the existing password for that Auth user (operator password manager / Firebase reset if forgotten). |
| **Who may access** | **Only** `admin@theaiwebcompany.com` — UI and API both enforce this. Other `@theaiwebcompany.com` accounts are denied. |

### How to sign in

1. Open https://os.theaiwebcompany.com (or go straight to `/usertracker`).
2. Sign out if you are on any other account (e.g. BILT Books, personal).
3. Sign in with **email & password**: `admin@theaiwebcompany.com` + your admin password.
4. Open https://os.theaiwebcompany.com/usertracker — roster and metrics should load.

Optional override (Functions env only, not for normal ops): `COMPANY_STAFF_EMAILS` comma-list can add emails. Default allowlist remains admin only.

---

## What it tracks

| Metric | Meaning |
|--------|---------|
| **MAU** | Distinct roster users with recent activity (30-day window in roster logic) |
| **Active paid** | Paid tiers with `active` / `trialing` status |
| **List MRR / ARR** | Contracted list price (annual → monthly equivalent × 12 for ARR) |
| **Billed MRR / ARR** | After promo — e.g. FI-PORTFOLIO / WEBMCPJUDGE seats contribute **$0 billed** until promo ends, but still count toward active paid + list MRR |
| **30-day logo churn** | Logos canceled in the last 30 days / rate |

**Roster collection:** `companyActiveUserRoster/{uid}` on registry Firestore (`aiweb-publisher`).  
**Snapshots:** `companyMetricsSnapshots`.  
**Billing source of truth:** Big Search `users/{uid}` (+ Stripe); roster is the ops mirror.

Promo example already on roster: BILT Books (`biltbooks@theaiwebcompany.com`) — Agency annual, FI-PORTFOLIO, list MRR $399, billed $0 while promo applies. Full seat record: [`BILTBOOKS_DEV_LOG.md`](BILTBOOKS_DEV_LOG.md).

---

## Architecture

```
Browser (/usertracker)
  → Big Search ID token (admin@…)
  → GET/POST /api/v1/company/user-tracker
       companyUserTrackerHttp
         verifyIdToken → email claim must be admin@…
         listActiveUserRoster / syncActiveUserRosterFromBigSearch
         computeTrackerMetrics
```

| Piece | Path |
|-------|------|
| UI | `src/pages/UserTrackerPage.tsx` |
| Client API | `src/lib/companyUserTracker.ts` |
| Route | `src/App.tsx` — `/usertracker` bypasses onboarding gate |
| HTTP | `functions/src/companyUserTrackerHttp.ts` |
| Roster + metrics | `functions/src/lib/activeUserRoster.ts` |
| Staff check | `isCompanyStaffEmail` — hardcoded admin + optional `COMPANY_STAFF_EMAILS` |
| Auth resolve | `functions/src/lib/resolveRequestUid.ts` — email from **ID token** (not Auth Admin `getUser`) |
| Stripe mirror | `stripeWebhookHttp` upserts roster on subscription changes |
| Seed script | `functions/scripts/seed-active-user-roster.mjs` |
| Rules | Client R/W denied on roster collections; Functions only |

### API

| Method | Path | Role |
|--------|------|------|
| `GET` | `/api/v1/company/user-tracker` | JSON `{ metrics, rows }` |
| `GET` | `/api/v1/company/user-tracker?format=csv` | CSV download |
| `POST` | `/api/v1/company/user-tracker?sync=1` | Rebuild roster from Big Search users |

Auth: `Authorization: Bearer <idToken>` (also accepted as `x-api-key` for the same JWT).

---

## Timeline / fixes

### 2026-09-05 — Initial ship

- Roster schema + sync from Big Search / Stripe webhook  
- Dashboard at `/usertracker` with Sync + CSV  
- Seeded existing users into `companyActiveUserRoster`  
- Deployed `companyUserTrackerHttp` + Hosting + rules  

### 2026-09-05 — Access lock + auth fix

**Problem:** Signed in as `admin@theaiwebcompany.com` still saw *Company staff only (@theaiwebcompany.com)* because staff resolution tried Auth Admin lookup with the wrong project SA.

**Fix:**

1. Allow **only** `admin@theaiwebcompany.com` (not all company domain emails).  
2. Staff email taken from verified **ID token** `email` claim.  
3. Removed the long explanatory blurb under the dashboard header.  

Redeployed Functions + Hosting.

---

## Security notes

- Do **not** commit plaintext passwords for this (or any) account.  
- Do not widen the allowlist to all `@theaiwebcompany.com` without an explicit ops decision.  
- Roster collections must stay client-denied; leaks would expose customer billing emails and Stripe ids.  
- If the admin password is lost: reset via Firebase Console → Authentication → `bigsearch-fd03f` → user `admin@theaiwebcompany.com`, or Identity Toolkit reset email — then update the operator password manager.

---

## Related

| Doc / surface | |
|---------------|--|
| Live dashboard | https://os.theaiwebcompany.com/usertracker |
| WebMCP project log | [`WEBMCP_DEV_LOG.md`](WEBMCP_DEV_LOG.md) |
| General Publisher log | [`../DEV_LOG.md`](../DEV_LOG.md) |
| FI promo | [`FI_PORTFOLIO_PROMO.md`](FI_PORTFOLIO_PROMO.md) |

---

*Last updated: 2026-09-07*
