# Handoff: clone the ChatGPT plugin (MCP) write-up

**Living source (do not rewrite from memory):**  
`c:\aiweb-publisher\DEV_LOG.md` — section **How the ChatGPT plugin (MCP) works — current source**

**MCP version documented:** `aiweb-publisher` **1.4.19** (22–23 Aug 2026)  
**Directory listing:** **AIWEB** `1.0.0` (OpenAI Review). Composer chip `@AIWEB`.  
**MCP URL:** `https://publisher.theaiwebcompany.com/mcp` (alias `/api/v1/mcp`)  
**This repo (`c:\aiweb`):** company marketing site — holds the **OpenAI domain challenge** for `theaiwebcompany.com` / `www`. It is **not** the plugin server.

Nothing in the publisher working tree was committed when this log was written. Deploy was CLI (Hosting/Functions), not a git tag.

---

## Paste into the other Cursor project

```
Copy-clone the ChatGPT plugin (MCP) documentation and company-site
verification bits from:

  c:\aiweb-publisher\DEV_LOG.md
  c:\aiweb\docs\CHATGPT_PLUGIN_HANDOFF.md
  c:\aiweb\public\.well-known\openai-apps-challenge
  c:\aiweb\firebase.json   (headers for the challenge file; do not ignore .well-known)

Living write-up is DEV_LOG.md in aiweb-publisher, from current source
publisherMcpHttp 1.4.19 — section “How the ChatGPT plugin (MCP) works”
after the 22 Aug submit notes.

Rules:
- Two people, one receipt. ChatGPT requesters never pay or see upgrade copy.
  Owners buy Publisher and work in Metrics → Leads.
- Directory name is AIWEB (@AIWEB). Operator product is AIWEB Publisher.
  MCP process name stays aiweb-publisher.
- Always say AIWEB Receipt (receiptId = lead id). Never Lead ID in marketing.
- Widgets render in ChatGPT Apps only, not Cursor.
- Do not pull Firebase/MCP/functions into the marketing site.
- Company site must keep the 43-byte openai-apps-challenge as text/plain
  no-store (not SPA HTML). Remove **/.* from Hosting ignore.
- Phase B is the ten-tool surface, not only list_actions / execute_action.
```

Or add `c:\aiweb-publisher` **and** `c:\aiweb` as workspace folders and point the agent at `DEV_LOG.md`.

---

## Two people, one receipt

| Who | Where | Pay | Must never see |
|-----|--------|-----|----------------|
| **ChatGPT user (requester)** | ChatGPT `@AIWEB` | Never. No upgrade, deposit, Instant Checkout | Publisher billing, “upgrade”, Big Search, Stripe, craft/publish |
| **Page owner** | `publisher.theaiwebcompany.com` | Publisher plan if they want **Get Quote** | ChatGPT widget chrome; work arrives in **Metrics → Leads** |

One write path: IRL form, JSON `POST /irl/{slug}/leads` / `…/actions/request_quote`, widget `submit_quote`, MCP `execute_action` → `submitLead` (`functions/src/lib/submitLead.ts`). Firestore `irlLeads/{id}` **is** the **AIWEB Receipt**.

Operator copy: **Upgrade to receive customer inquiries and quote requests.**  
Public / ChatGPT: **This business is not accepting quote requests right now.**

Sale after **Selected** happens off-ChatGPT between requester and business.

---

## Architecture (locked)

- Auth + Stripe entitlements: Big Search Firebase `bigsearch-fd03f` `users/{uid}`
- Pages, IRL, leads, storage, Hosting, Functions: registry Firebase `aiweb-publisher`
- Bridge: `mintRegistrySessionHttp` (Big Search ID token → registry custom token, same uid)
- Company marketing: **this repo** (`aiweb-7e40e` / `theaiwebcompany.com`) — challenge token only for directory verification

---

## Source map (publisher repo)

| File | What it is |
|------|------------|
| `functions/src/publisherMcpHttp.ts` | HTTP transport, challenge, health, `McpServer`, ten tools |
| `functions/src/lib/quoteConversion.ts` | Widget URIs, `MCP_QUOTE_INSTRUCTIONS`, business-feed records |
| `functions/src/lib/quoteWidgets.ts` | Get Quote / compare / proposal HTML + CSP |
| `functions/src/lib/pageMediaWidget.ts` | AIWEB Player |
| `functions/src/lib/findIrlPages.ts` | Published-page search |
| `functions/src/lib/submitLead.ts` | Canonical write → `irlLeads` |
| `functions/src/lib/aiwebReceipt.ts` | Public receipt for `get_receipt` |
| `functions/src/quoteMediaUploadHttp.ts` | `POST /api/v1/quote-media` requester photos |
| `src/components/hits/LeadsPanel.tsx` | Owner inbox + Answer composer |
| `chatgpt-app-submission.json` | Directory form draft |
| Submit screenshots | `docs/dev-log/chatgpt-app-submit/` |
| Icons | `chatgpt-app-submission/icons/` |

---

## How `/mcp` runs

Function `publisherMcpHttp` (`onRequest`, 512MiB, 60s, `cors: false`). Lazy `@modelcontextprotocol/sdk` Streamable HTTP (`enableJsonResponse: true`). Identity: `name: aiweb-publisher`, `version: 1.4.19`. Rate limit 120 / IP / 60s.

HTTP branch order: OPTIONS → challenge path → not `/mcp` 404 → browser GET health JSON → rate limit → `handleRequest`.

**Domain verify:** `GET https://<challenge-base>/.well-known/openai-apps-challenge` must be **plain text**, exact 43-byte token, no HTML.

Token (same on publisher + company):

```
0FN_OgEjhbDj35xURfknV3XfD_j_18Rd97abcN5IXZM
```

**This repo:** `public/.well-known/openai-apps-challenge`  
`firebase.json`: do **not** ignore `**/.*`; header `Content-Type: text/plain; charset=utf-8`, `Cache-Control: no-store`. Apex/www must not serve SPA HTML for that path.

---

## Ten tools (Phase B)

| Tool | Hint | Widget | Job |
|------|------|--------|-----|
| `find_pages` | READ | Get Quote **or** player | Search. Get Quote / type search auto-opens quote card (1.4.17 empty-player fix). “Three/several” skips auto-open. |
| `present_media` | READ | `page-media-v2.html` | Play music/video |
| `list_actions` | READ | Player if media-only | Manifest for one slug |
| `request_service` | READ | `request-service.html` | Get Quote launcher (no write) |
| `submit_quote` | WRITE | widget-only | Form → `submitLead` → `receiptId`; photos after via quote-media |
| `execute_action` | WRITE | none | One or `slugs[]` (max 5); needs `confirmed=true` |
| `get_receipt` | READ | `quote-proposal-v9.html` | Status by `receiptId` (do not ask email) |
| `reply_receipt` | WRITE, closed-world | widget | Follow-up on same receipt |
| `list_receipts` | READ | `compare-quotes.html` | Compare by requester email |
| `select_quote` | WRITE, closed-world | widget | Pursue one quote; no payment |

Starter chips → real calls:

1. Wedding catering 80 guests Saturday → `find_pages` (full sentence) → Get Quote card  
2. Play “Type” from the AI Web Album → `present_media`  
3. Three caterers same dinner → `find_pages` (no auto form) then `execute_action` `{ slugs, confirmed: true }`

---

## Company site files to keep (this repo)

```
public/.well-known/openai-apps-challenge
firebase.json          # challenge headers; Hosting ignore must allow .well-known
docs/CHATGPT_PLUGIN_HANDOFF.md
docs/PUBLISHER_PAGE_HANDOFF.md   # marketing 4-step story (separate)
docs/PRICING_STRIPE_HANDOFF.md   # pricing table + Checkout (separate)
```

Legal URLs on the listing point at company Terms/Privacy — counsel copy before reviewers click (gap in DEV_LOG).

---

## Do not copy into marketing

- `functions/` MCP, `submitLead`, widgets, Firebase Admin
- ChatGPT widget HTML
- Full Publisher app / Metrics data layer

Marketing already embeds a **demo** of the 4-step story (`PublisherHowItWorks`) — that is not the live plugin.

---

## Smoke (plugin, not this site)

1. `GET https://publisher.theaiwebcompany.com/mcp` → tools JSON, “No Instant Checkout”
2. `GET https://www.theaiwebcompany.com/.well-known/openai-apps-challenge` → 43-byte token, `text/plain`
3. ChatGPT Developer Mode `@AIWEB`: Get Quote card (not empty player); Play Type; three caterers; owner Answers in Leads
4. Requester never sees upgrade copy

Full chronology, mermaid, tool inputs, widget JS, owner surfaces: **`c:\aiweb-publisher\DEV_LOG.md`**.
