# WebMCP — Development Log

**Scope:** Beginning-to-end record of how AIWEB adopted, shipped, and extended **WebMCP** (page-open / browser-agent tools) alongside **Remote MCP** (ChatGPT Apps / server tools).  
**Hosts:** Canonical OS `https://os.theaiwebcompany.com` · registry Firebase `aiweb-publisher` · auth/billing `bigsearch-fd03f`.  
**Living plans:** [`.cursor/plans/webmcp_vcap_ship_ddf26ad6.plan.md`](../.cursor/plans/webmcp_vcap_ship_ddf26ad6.plan.md) · [`.cursor/plans/aui_work_telemetry_fbfb77e6.plan.md`](../.cursor/plans/aui_work_telemetry_fbfb77e6.plan.md)  
**Related general log:** [`DEV_LOG.md`](../DEV_LOG.md) (Publisher pilot + ChatGPT Apps submit through late Aug 2026).

---

## Executive summary

WebMCP is the **page-open Agent User Interface (AUI)** for an AIWEB Page. Remote MCP is the **anytime** adapter. Same identity, actions, and Call/Receipt write path; different discovery surface and channel tag.

| Adapter | When it works | How agents find tools | Channel / surface |
|---------|---------------|----------------------|-------------------|
| **WebMCP** | Human HTML open in a WebMCP-capable browser | `document` / `navigator.modelContext.registerTool` (experimental) | Calls: `channel: webmcp` · Editor work: `surface: editor_webmcp` |
| **Remote MCP** | Always (no tab required) | `https://os.theaiwebcompany.com/mcp` (+ `/mcp/call`, `/play`, `/social`, `/mail`) | Calls: `channel: mcp` |

**Product rule (locked):** An AIWEB Page is **WebMCP-capable while open** and **Remote-MCP-capable always**. Do not put Publisher admin tools on the public `/irl/{slug}` page. Do not change the ChatGPT-reviewed `/mcp` tool contracts when shipping in-page WebMCP.

**Four WebMCP surfaces in this repo:**

1. **Published page** — consumer tools on live `/irl/{slug}` HTML  
2. **Editor (AIWEB OS)** — authoring tools while the owner has a draft open  
3. **Mail** — requester Call/Receipt tools on Mail pages  
4. **Challenge Edition** — AGPL demo package (`challenge-edition/`), not production

---

## Timeline (beginning → present)

### 2026-08-28 — Framing: what WebMCP is vs what AIWEB already is

**Context.** Industry talks (Hugo / Google Dev Expert; Tara / WebMCP community) described WebMCP as a W3C WebML Community Group **draft**: the open webpage registers typed tools; a supporting browser agent calls those tools instead of scraping or vision-clicking. Complementary to Remote MCP (server, anytime). Not a finished standard; not Google-only.

**AIWEB differentiation recorded then:**

| | Screen / vision agents | WebMCP | Remote MCP | AIWEB Page |
|--|--|--|--|--|
| Mechanism | Screenshots, DOM, click | Approved in-page tools | Server tools | Registered dual-surface document |
| Needs | Fragile, token-heavy | Tab/browser open | Network to MCP host | Registry + publish |
| Gap filled alone | Navigation | In-page action | Always-on action | **Find + act + measure** across channels |

**Locked one-liner:**

> **WebMCP** lets an AI agent operate approved features on the webpage currently open in the browser.  
> **AIWEB Pages** keep businesses available to agents whether or not a human tab is open — and measure that activity as HITS / Calls / Receipts.

Brand work around the same time: MCP socket vs AIWEB Page cloud marks under `public/brand/logo-family/` (see that folder’s README for positioning).

### 2026-08-29 — Decision: inject WebMCP into every published page + VCAP advertise

**Question:** How do we add WebMCP to VCAP so every page is published with it?

**Answer:** WebMCP does **not** replace `mcp.json`. It is a **client-side adapter injected into human HTML**. VCAP **documents** that adapter. Remote MCP stays the closed-tab / anytime path.

**Ship plan:** single phase (no Phase 1/2 split) — [`.cursor/plans/webmcp_vcap_ship_ddf26ad6.plan.md`](../.cursor/plans/webmcp_vcap_ship_ddf26ad6.plan.md). All todos completed.

**Design rules captured in the plan:**

1. Tool concerns **this page’s identity**  
2. Completes or advances a meaningful user task  
3. Bounded input/output contract  
4. Can be authorized, measured, and issued a result or Receipt  

**In-page vs multi-page website:**

| | Multi-page website | AIWEB Page |
|--|--|--|
| Object | Many routes | One human + machine document |
| WebMCP | Tools change per route | Tools = this page’s capabilities ∩ author toggles |
| Search | Crawl the site | `search_page` = **this page only** |
| Other businesses | Site nav | Remote MCP `find_pages` only |

**Git:** `73c0c7f` — *Ship mobile Publisher shell, WebMCP on IRL pages, and restore functions src/lib to git.*

### 2026-08-29 — What shipped on live IRL pages

| Deliverable | Detail |
|-------------|--------|
| Shared catalog | `functions/src/lib/webMcpCatalog.ts` + client mirror `src/lib/webMcpCatalog.ts` |
| Bootstrap | `functions/src/lib/webMcpBootstrap.ts` + client mirror `src/lib/webMcpBootstrap.ts` |
| Inject | `merchantIrlHtmlHttp` → `injectWebMcpScript` on every live human HTML response |
| Head meta | `aiweb:webmcp=1` |
| Author toggles | Publisher Settings → **Agent tools (WebMCP)** → `layers.webmcp.disabledTools` |
| Publish stamp | `irlPublishHttp` writes `webmcpDisabledTools` onto `irlPages/{slug}` |
| Channel | `LeadChannel` includes `webmcp`; leads accept `x-aiweb-channel: webmcp` / body channel → `submitLead({ explicitChannel: 'webmcp' })` |
| Metrics | Calls UI labels WebMCP vs MCP (`LeadsPanel`) |
| VCAP advertise | `llms.txt` WebMCP section; `mcp.json.webmcp`; `openapi.json` `x-webmcp` |
| Preview parity | `irlPreview.ts` injects the same bootstrap for draft/localhost inspectors |
| Force-on | `get_page` cannot be disabled |

**Strongest contract (must work):** when quotes are accepted — `get_page` · `list_offerings` · `request_quote` · `check_receipt` · `reply_to_message` — plus every other already-on capable tool in the same delivery.

### 2026-08-30 — Editor WebMCP + Mail requester WebMCP

**Git:** `ff38b44` — *Ship Mail MVP, Calls inbox, dark Publisher chrome, and Check AI fixes.*

| Surface | Module | Role |
|---------|--------|------|
| Editor | `src/lib/editorWebMcp.ts` + `editorWebMcpCatalog.ts` | ChatGPT/browser agent authors the draft in OS; hooked from `PublisherWorkspace` |
| Mail | `src/lib/mailWebMcp.ts` | Requester tools on Mail inbox / receipt pages → `/api/v1/mail/*` |

Editor tools are **separate** from published-page consumer tools (explicit comment in catalog). `publish_draft` requires `confirm: true`. Agent must `get_draft_snapshot` before editing (judge acts enforce this).

### 2026-08-31 → ~2026-09-03 — WebMCP Challenge (judges + Challenge Edition)

**Git:**

- `7838edc` — Judge test acts + demo image bundles  
- `6a0454f` — Challenge judge edition packaging + submission docs  
- `dc0cd07` — Runnable Challenge Edition + cleared fixtures  

**Judge path (production OS, not Challenge Edition):**

1. Sign into https://os.theaiwebcompany.com (own account)  
2. Blank page → attach scenario images → paste Act 1 Build prompt  
3. Agent uses **editor WebMCP** to build / validate / AI Check  
4. Judge replies **yes** only to publish  
5. Customer agent uses **published-page WebMCP** (or human form) for Call → Receipt  

**Docs / assets:**

- [`docs/JUDGE_TEST_ACTS.md`](JUDGE_TEST_ACTS.md) — Pet Voyage + optional industries; Build / Call / Receipt acts  
- [`docs/WEBMCP_JUDGE_PROMO.md`](WEBMCP_JUDGE_PROMO.md) — Stripe code `WEBMCPJUDGE` (3 months 100% off, max 100, first-time customers)  
- Live zip: `https://os.theaiwebcompany.com/demo-assets/webmcp-judge-image-bundles.zip`  
- Example outcome: `https://os.theaiwebcompany.com/irl/petvoyage`  
- AGPL seed: [`challenge-edition/`](../challenge-edition/) (localStorage; reduced catalogs; `#/editor`, `#/p/:slug`, `#/receipt/:id`)

**Acts narrative (what judges prove):** Build the address → Use the line → Continue the relationship (Receipt).

### 2026-09 (working tree) — AUI work telemetry = Agent Actions

**Plan:** [`.cursor/plans/aui_work_telemetry_fbfb77e6.plan.md`](../.cursor/plans/aui_work_telemetry_fbfb77e6.plan.md) (todos completed).  
**Kernel inventory:** [`docs/AISW_KERNEL_INVENTORY.md`](AISW_KERNEL_INVENTORY.md) — AISW advertises **K1–K15 only**; do not invent K16.

**Framing:**

```
Lead agent (ChatGPT / Claude / Gemini)
  → WebMCP (AUI)
    → AIWEB OS / AIWA-style runtime
      → page tools, policy, memory, observability (future kernels)
```

| Concept | Role |
|---------|------|
| **VCAP** | Machine contract published with the page |
| **WebMCP** | Page-open **AUI** |
| **AUX** | Agent User Experience (discover tools, complete work, recover) |
| **Agent Actions** | OS tool work telemetry (not HITS) |
| **HITS** | Discovery / activity on published pages |
| **AIWEB Receipts** | Call / Callback communication |

**Implementation:**

| Piece | Path |
|-------|------|
| Client schema + IndexedDB outbox | `src/lib/webmcpWorkTelemetry.ts` (`aui-work-receipt/0.1`) |
| Server append-only | `functions/src/webmcpWorkReceiptHttp.ts` — server timestamps only |
| Endpoint | `POST /api/v1/agent/work-receipt` |
| Collection | `webmcpWorkReceipts` (owner read; client write denied) |
| Metrics UI | `AgentWorkPanel` · Metrics `?tab=agent` |
| Wiring | Editor tools emit receipts except `get_work_log` |

**Locked formulas (Agent work Metrics):** completed count; success rate = completed ÷ terminal; failures vs rejected separate; retries via `retryOf`; avg duration. Never mix into HITS.

---

## Architecture reference

### Published-page path

```
GET /irl/{slug}
  merchantIrlHtmlHttp
    → finalizeHumanHtml
    → injectWebMcpScript(webMcpBootstrap)
    → vcapHeadTags (aiweb:webmcp=1, mcp alternate, llms/mcp.json/openapi links)

Effective tools = capable(page) − layers.webmcp.disabledTools
  (get_page always on)

Write tools → same-origin POST /irl/{slug}/leads (+ receipt routes)
  header/body channel → submitLead({ explicitChannel: 'webmcp' })
```

**Bootstrap behavior:**

- Inline `<script data-aiweb="webmcp">` with tools + page snapshot JSON  
- Feature-detect: `document.modelContext` → `navigator.modelContext` → `navigator.modelContextProtocol` → `window.modelContext`  
- Retries: `modelcontextready`, `DOMContentLoaded`, timeouts 0 / 500 / 2000 ms  
- No-op if API missing (page still loads for humans)

### Editor path

```
PublisherWorkspace (signed-in owner, page open)
  → registerEditorWebMcp(editorWebMcpCatalog)
  → mutations persist draft
  → optional publish_draft(confirm:true)
  → webmcpWorkTelemetry → POST /api/v1/agent/work-receipt
```

### Mail path

```
MailInboxPage / MailReceiptPage
  → injectMailWebMcpBootstrap
  → list_calls | get_call | reply_to_call | select_call
  → /api/v1/mail/*
```

### VCAP advertise (per slug)

| Surface | WebMCP content |
|---------|----------------|
| HTML head | `meta name="aiweb:webmcp" content="1"` |
| `llms.txt` | `## WebMCP (page open)` + effective tool names |
| `mcp.json` | `webmcp: { status: 'experimental', requires: 'open_page', tools, humanPage }` + `remoteMcp` |
| `openapi.json` | `x-webmcp` (tools, leadPath, same-write-path note) |
| `chatgpt.txt` | Mentions in-page tools when page is open |

VCAP letters: **V** `llms.txt` · **C** `json.ld` · **A** `mcp.json` · **P** `openapi.json`.

---

## Tool catalogs (record)

### A. Published page (~40 IDs) — `webMcpCatalog`

Capability-gated. Author may disable any except `get_page`.

**Always capable:** `get_page`, `get_page_summary`, `get_identity`, `search_page`, `share_page`, `copy_page_link`

**Conditional (examples):**

| Gate | Tools |
|------|--------|
| Phone | `get_contact_information` |
| Address / lat-lng | `get_location` |
| FAQs | `get_faqs` |
| Material / citations | `get_verified_facts` |
| Offerings ≥1 | `list_offerings`, `recommend_offering` |
| Offerings ≥2 | `filter_offerings`, `compare_offerings` |
| Works | `list_media`, `get_media_details`, play/pause/resume/stop/seek, `select_track` |
| Gallery / cover / logo | `view_gallery` |
| Inquiry form | `get_form_requirements`, `check_quote_requirements`, `open_form` |
| Form + quotes enabled | Quote/receipt loop + aliases (`request_quote`, `submit_inquiry`, `request_estimate`, `request_consultation`, `request_callback`, `submit_project_brief`, `start_conversation`, `check_receipt`, `get_messages`, `reply_to_message`, `select_option`, `accept_quote`) |
| CTA URL | `open_primary_action` |
| Section ids in HTML | `open_section` |

Source of truth: `WEBMCP_TOOL_META` in `src/lib/webMcpCatalog.ts` and `functions/src/lib/webMcpCatalog.ts` (**keep in sync**).

### B. Editor (26 tools) — `editorWebMcpCatalog`

`get_draft_snapshot`, `edit_identity`, `set_slug`, `add_faq`, `update_faq`, `delete_faq`, `replace_faqs`, `set_primary_cta`, `set_form_fields`, `get_page_structure`, `insert_section`, `update_section`, `move_block`, `delete_block`, `validate_draft`, `get_publish_hints`, `publish_draft`, `run_ai_check`, `apply_ai_finding`, `list_assets`, `place_asset`, `get_inbox_summary`, `get_page_metrics`, `preview_patch`, `get_operation_status`, `check_quality`, `get_work_log`

### C. Mail (4 tools) — `mailWebMcp`

`list_calls`, `get_call`, `reply_to_call`, `select_call`

### D. Challenge Edition published subset

`get_page`, `get_faqs`, `get_form_requirements`, `request_quote`, `submit_inquiry`, `check_receipt`, `get_messages`, `reply_to_message`

### E. Remote MCP (contrast — not WebMCP)

Live tools on `/mcp` (from merchant / publisher MCP): e.g. `find_pages`, `present_media`, `list_actions`, `request_service`, `submit_quote`, `execute_action`, `get_receipt`, `reply_receipt`, `list_receipts`, `select_quote`. ChatGPT widgets use **versioned** `ui://widget/*` URIs (cache bust) — that pattern is Remote MCP / Apps, not the in-page WebMCP bootstrap.

---

## Endpoints & live URLs

| URL / path | Role |
|------------|------|
| `https://os.theaiwebcompany.com` | AIWEB OS |
| `https://os.theaiwebcompany.com/irl/{slug}` | Human page + WebMCP inject |
| `…/irl/{slug}/llms.txt` · `mcp.json` · `openapi.json` · `json.ld` | VCAP (+ WebMCP advertise) |
| `POST …/irl/{slug}/leads` | Call write (`channel: webmcp` when from bootstrap) |
| `…/irl/{slug}/receipts/…` | Receipt GET / reply / select |
| `POST /api/v1/agent/work-receipt` | Agent Actions telemetry |
| `https://os.theaiwebcompany.com/mcp` | Remote MCP (alias `/api/v1/mcp`) |
| `/mcp/call` · `/mcp/play` · `/mcp/social` · `/mcp/mail` | Specialized Remote MCP |
| `https://os.theaiwebcompany.com/irl/petvoyage` | Example published page |
| `…/demo-assets/webmcp-judge-image-bundles.zip` | Judge image pack |

Legacy host `publisher.theaiwebcompany.com` still appears in some early judge docs; prefer `os.theaiwebcompany.com` ([`ADDRESS_ARCHITECTURE.md`](ADDRESS_ARCHITECTURE.md)).

---

## File map

| Path | Purpose |
|------|---------|
| `functions/src/merchantIrlHtmlHttp.ts` | Live `/irl/**` HTML + VCAP + leads/receipts; injects WebMCP |
| `functions/src/lib/webMcpBootstrap.ts` | Server inline bootstrap builder |
| `functions/src/lib/webMcpCatalog.ts` | Published tool IDs, capability, disable-list |
| `functions/src/irlPublishHttp.ts` | Stamps `webmcpDisabledTools` |
| `functions/src/webmcpWorkReceiptHttp.ts` | Agent Actions receipt HTTP |
| `functions/src/lib/submitLead.ts` | Shared Call write path |
| `src/lib/webMcpBootstrap.ts` / `webMcpCatalog.ts` | Client mirrors (preview) |
| `src/lib/editorWebMcp.ts` / `editorWebMcpCatalog.ts` | OS editor tools |
| `src/lib/mailWebMcp.ts` | Mail requester tools |
| `src/lib/webmcpWorkTelemetry.ts` | AUI receipt emit + outbox |
| `src/lib/irlPreview.ts` | Preview HTML + VCAP parity |
| `src/publisher/PublisherSettings.tsx` | Agent tools toggles |
| `src/publisher/PublisherWorkspace.tsx` | Registers editor WebMCP |
| `src/components/hits/AgentWorkPanel.tsx` | Metrics → Agent Actions |
| `src/components/hits/LeadsPanel.tsx` | WebMCP vs MCP Call labels |
| `challenge-edition/src/lib/webmcp/*` | Challenge catalogs / register / handlers |
| `firestore.rules` | `webmcpWorkReceipts` owner-read / no client write |
| `firebase.json` | Rewrites for `/irl/**`, `/mcp*`, work-receipt |

---

## Explicitly out of ship / reserved catalog

Needs new structured fields or product work first (names reserved only):

- Hours, policies, credentials, social links, page-update feeds  
- Commerce / cart / checkout / payments / donate / subscribe  
- Real telephony `call_business`, appointment calendar  
- File upload / waitlist / RSVP unless already in form  
- Publisher admin tools on public `/irl`  
- Expanding frozen ChatGPT `/mcp` tool lists as part of WebMCP work  
- Claiming WebMCP is a finished W3C standard (docs: **experimental**)  
- Full ViteAIWA / AISW kernel runtime in this repo (Agent Actions = precursor to future observability, esp. K11)

---

## Operational notes & gotchas

1. **Client/server catalog duplication** — `webMcpCatalog` and `webMcpBootstrap` exist in both `src/lib` and `functions/src/lib`; keep IDs and capability rules aligned.  
2. **Registration race** — experimental browser API may appear late; bootstrap retries intentionally.  
3. **Capability gates** — removing FAQs/works/form drops tools even if Settings still “on.”  
4. **No `find_pages` on public page** — discovery of other businesses stays Remote MCP.  
5. **Channel vs surface** — Call channel `webmcp` ≠ Agent Actions surface `editor_webmcp`. Collection name `webmcpWorkReceipts` is storage; product term is **Agent Actions**.  
6. **Remote MCP widget cache** — versioned `ui://widget/…-vN.html` in `quoteConversion.ts` is a ChatGPT Apps concern; republish/reload is enough for in-page WebMCP bootstrap changes.  
7. **Challenge Edition ≠ production** — smaller catalogs, localStorage, AGPL packaging for Devpost/judges.  
8. **Promo codes** — `WEBMCPJUDGE` (hackathon judges) ≠ `FI-PORTFOLIO` (Founder Institute) ≠ `AIWEBBETA`.

---

## Verify checklist (from original ship plan)

1. Quote page with FAQs + works → inspector shows full already-on capable set.  
2. Settings: disable `request_quote` → republish → tool gone; human form still present.  
3. `request_quote` → Call `channel: webmcp` → `check_receipt` → `reply_to_message`.  
4. Media tools play/pause against live player.  
5. No `find_pages`, no Publisher admin tools on public page.  
6. Non-WebMCP browser: page loads; script no-ops.  
7. Editor: Build act uses tools (not prose-only); publish only after explicit **yes**.  
8. Agent Actions: Metrics `?tab=agent` shows receipts; HITS counts unchanged.

---

## Doc index (WebMCP-related)

| Doc | Use |
|-----|-----|
| This file | Full WebMCP project record |
| [`JUDGE_TEST_ACTS.md`](JUDGE_TEST_ACTS.md) | Judge reproduction scripts |
| [`WEBMCP_JUDGE_PROMO.md`](WEBMCP_JUDGE_PROMO.md) | Judge Stripe promo |
| [`AISW_KERNEL_INVENTORY.md`](AISW_KERNEL_INVENTORY.md) | K1–K15; Agent Actions vs kernels |
| [`ADDRESS_ARCHITECTURE.md`](ADDRESS_ARCHITECTURE.md) | OS vs `{brand}.irl.…` delivery plane |
| [`CHATGPT_PLUGIN.md`](CHATGPT_PLUGIN.md) | Remote MCP / widgets / dual-surface |
| [`CHATGPT_WIDGET_DESKTOP_MOUNT.md`](CHATGPT_WIDGET_DESKTOP_MOUNT.md) | **P0:** iOS mounts Callback/Reply form, desktop does not — URI cache, `_meta`, deploy + QA gate (2026-09-11) |
| [`../DEV_LOG.md`](../DEV_LOG.md) | Broader Publisher + Apps submit log |
| [`../README.md`](../README.md) | Challenge entry points |
| Plan `webmcp_vcap_ship_ddf26ad6` | Original ship spec |
| Plan `aui_work_telemetry_fbfb77e6` | Agent Actions / AUX metrics |

---

*Last updated: 2026-09-07 — compiled from ship plans, git history (`73c0c7f` … `dc0cd07`), product framing sessions (2026-08-28+), and current tree.*
