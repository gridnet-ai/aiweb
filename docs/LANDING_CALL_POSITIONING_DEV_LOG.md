# AIWEB Landing — Call Positioning Dev Log

**Date:** 2026-09-29  
**Surface:** Marketing site `theaiwebcompany` / Firebase Hosting `aiweb-7e40e`  
**Live:** https://aiweb-7e40e.web.app · https://www.theaiwebcompany.com  
**Primary shift:** From “self-improving webpage” → **callable AIWEB identity** → **AIWEB Call is the DM for ChatGPT** (find, message from chat, track in AIWEB Mail; starting with ChatGPT, building toward assistants broadly).

---

## Finished product (end of day)

### Homepage (`/`)

A Call-first landing page that:

1. **Announces** AIWEB Call live in ChatGPT (promo banner).
2. **States the category** — “Simple messaging and calling for the AI era.”
3. **Shows** an in-view looping collage video (network of people/businesses).
4. **Defines the product** — what an AIWEB Call is (asynchronous message to a Call-enabled Page; no phone/email to hunt).
5. **Offers two actions** — Become callable (OS publish) · Try AIWEB Call (ChatGPT plugin).
6. **Mirrors the ChatGPT listing** — AIWEB Call panel with prompts, GEO-aligned copy, app meta, notice.
7. **Answers engines** — FAQ + entity glossary + VCAP tool sequence.
8. **Keeps conversion copies** — create carousel, AIWEB Pages block, pricing (`#start`).
9. **Points deeper product story** to `/os`.

### OS page (`/os`)

Full Paradox-style product narrative moved off the homepage: How To Get On The AIWEB, phones + steps, create carousel, stories/measure, product blocks (OS, pages, sites, inbox, calls, metrics), partners, capabilities, sized, resources, impact, pricing, newsletter.

### Positioning layers shipped on homepage

| Layer | What shipped |
| --- | --- |
| **SEO** | Title `AIWEB \| Messaging and Calling for the AI Era`; meta targeting AI messaging / directory / ChatGPT listing intents (not telephony “AI phone calls”); keywords updated in `siteSeo` + `index.html` |
| **AEO** | Visible FAQ (Call definition, not a phone call, become callable, availability, email precision); `FAQPage` JSON-LD |
| **GEO** | Canonical description + entity vocabulary (Page, Directory, Call, Mail, Receipt, Calling Card) on-page and in schema |
| **VCAP** | Advertised async Call capability + tool sequence `search_directory → prepare_call → send_call → get_receipt` (text/plain, user confirmation); primary machine entity = callable identity |

---

## Timeline — 2026-09-29

### Brand mark consistency

- Replaced nav `AIWebLogo` wordmark with ChatGPT Call mark (`/images/promo/aiweb-call-mark.png`) + **AIWEB** label for plugin parity.

### Homepage information architecture

- Moved hero CTAs under Create steps, then later relocated Create headline under those CTAs.
- Added **How To Get On The AIWEB** bridge (hero-scale type) → later moved with full lower body to `/os`.
- Split site: content below Call notice → **`/os`**; homepage keeps copies of create CTAs, create headline, create carousel, AIWEB Pages, pricing.
- Nav links for Create / Measure / OS / ChatGPT point at `/os#…`; Get started stays `#start` on home.
- Sites “Learn more” → `/os`.
- Stories carousel reduced to four measure images; nav dots hidden when `count <= 1`.

### Hero messaging & media

- Copy evolved from “The phone book for AI assistants.” →  
  **H1:** Simple messaging and calling for the AI era.  
  **Under visual:** NO PHONE NUMBER TO DIAL. NO EMAIL ADDRESS TO FIND.  
  **Explain (added with SEO pass):** definition of discoverable + AIWEB Call.  
  **CTAs:** Become callable · Try AIWEB Call.
- Promo banner → **AIWEB CALL IS NOW LIVE IN CHATGPT — Try it** (inline on small screens).
- Hero static collage → **animated MP4** (`/videos/cup-collage-animated.mp4`) with IntersectionObserver play-while-in-view / pause-when-offscreen; poster fallback to network PNG.

### Layout / mobile polish

- Hero lede wrap/shrink on small screens (later removed when copy moved).
- Create section top spacing tightened after OS split.
- Promo `flex-wrap: nowrap` + fluid type so banner stays one line on mobile.

### SEO / AEO / GEO / VCAP alignment (this pass)

**Files**

- `src/lib/siteSeo.ts` — canonical description, keywords, FAQ constants, VCAP capability stub, `homePageJsonLd()` graph (Organization, WebSite, SoftwareApplication, FAQPage).
- `index.html` — static title/description/OG/Twitter/Organization JSON-LD matched to new positioning.
- `src/pages/HomePageV2.tsx` — uses shared SEO defaults + full JSON-LD graph.
- `src/components/corp/LandingParadoxV2.tsx` — banner, hero explain + CTAs, Call listing opening paragraph (GEO), FAQ + entities + tool sequence.
- `src/styles/landingV2Paradox.css` — hero explain + FAQ styles.

**Call listing opening (GEO)**

> AIWEB Call lets ChatGPT users find and message a person or business with a published, Call-enabled AIWEB Page. The recipient receives the message in AIWEB Mail, and the sender receives an AIWEB Receipt.

VoA kept as a **technical note**, not the primary explanation.

**Email claim (AEO precision)**

> The recipient does not need to publish an email address. AIWEB routes the Call through the recipient’s AIWEB Page.

(Does **not** claim the sender form needs no email.)

### Deploys

Multiple `npm run deploy:hosting` releases to `aiweb-7e40e` through the day (nav mark, IA split, stories, hero video, etc.). Re-deploy after this positioning pass as needed.

---

## Entity vocabulary (locked for GEO)

| Entity | Meaning |
| --- | --- |
| **AIWEB** | Messaging and calling platform that makes people and businesses discoverable and reachable from AI assistants |
| **AIWEB Page** | Callable identity |
| **AIWEB Directory** | Public discovery layer |
| **AIWEB Call** | Asynchronous communication (not a PSTN telephone call) |
| **AIWEB Mail** | Recipient inbox |
| **AIWEB Receipt** | Sender delivery record |
| **Calling Card** | In-conversation interface |
| **Self-improving page** | Accuracy / optimization system **under** the callable identity (not the primary marketed entity) |

---

## VCAP Call capability (advertised shape)

```json
{
  "capabilities": {
    "call": {
      "enabled": true,
      "mode": "asynchronous",
      "mediaTypes": ["text/plain"],
      "requiresUserConfirmation": true,
      "tools": ["search_directory", "prepare_call", "send_call", "get_receipt"]
    }
  }
}
```

Do not advertise documents, live voice, persistent threads, or auth on this surface until they work end-to-end.

---

## Still open / next

- Dedicated SEO pages: AIWEB Call, Directory, Pages, Mail, How to become callable (homepage only introduces the system today).
- Propagate ChatGPT plugin store listing opening paragraph to match GEO copy in the live OpenAI listing UI (site mirror updated; store text may still lag).
- Per-Page VCAP records on published `/irl/{slug}` (identityName, aiwebId, verified, lastVerified, capabilities.call).
- Structured `ItemList` for Directory and profile-page JSON-LD when directory UI is linked from marketing.
- Classic `/classic` still shares `DEFAULT_PAGE_*` from `siteSeo` — confirm whether classic should keep older OS-automation framing.

---

## Key files

| Path | Role |
| --- | --- |
| `src/components/corp/LandingParadoxV2.tsx` | Home + OS Paradox landing |
| `src/components/corp/LandingNavV2.tsx` | Call-mark nav + `/os` deep links |
| `src/pages/HomePageV2.tsx` | `/` route + SEO/JSON-LD |
| `src/pages/OsPage.tsx` | `/os` route |
| `src/lib/siteSeo.ts` | Canonical copy, FAQ, schema helpers |
| `src/styles/landingV2Paradox.css` | Landing visual system |
| `public/videos/cup-collage-animated.mp4` | Hero animation |
| `public/images/promo/aiweb-call-mark.png` | Brand mark (ChatGPT parity) |
