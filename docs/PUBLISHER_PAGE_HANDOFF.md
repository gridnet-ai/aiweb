# Handoff: copy-clone the corporate Publisher marketing page

**Source project:** `aiweb` (`c:\aiweb`) — corporate site for **theaiwebcompany.com**  
**Source URL (local):** `http://localhost:5174/` (home → Introducing Publisher)  
**Live:** Firebase Hosting project `aiweb-7e40e` (`https://aiweb-7e40e.web.app`)  
**Audience:** Another Cursor / Vite+React+Tailwind project that should mirror this Publisher section (not the full corp site).

**ChatGPT plugin (MCP):** living write-up is `c:\aiweb-publisher\DEV_LOG.md` (MCP 1.4.19). Clone notes for this company site: [`CHATGPT_PLUGIN_HANDOFF.md`](./CHATGPT_PLUGIN_HANDOFF.md).

---

## What this is

The **Introducing Publisher** block on the marketing home page: positioning copy, a **4-step live React story** (AIWEB × ChatGPT), CTAs, create-to-publish media, Human/Machine shots, Metrics + H.I.T.S + Leads animation, and the portable `.aiweb` section.

Prefer **porting the React demo UI** over re-encoding WebMs. The old skewed step videos were replaced by animated components.

**Brand rules**

- Always say **AIWEB Receipt** — never “Lead ID”.
- Product name in CTAs: **AIWEB Publisher**.
- Story customer: **Savory Moments Wedding Catering** (Becky Smith quote flow).

---

## Paste into the other Cursor project

```
Copy-clone the Introducing Publisher marketing page from:
  c:\aiweb\docs\PUBLISHER_PAGE_HANDOFF.md
  c:\aiweb\src\components\corp\PublisherSection.tsx
  c:\aiweb\src\demo\PublisherHowItWorks.tsx
  c:\aiweb\src\demo\chatgptStorySteps.tsx
  c:\aiweb\src\demo\chatgptReceiptDemo.css
  c:\aiweb\src\demo\publisherHowItWorks.css
  c:\aiweb\src\styles\publisher-chrome-demo.css

Goal: same 4-step chessboard story + CTAs + media on our site.

Rules:
- Keep AIWEB Receipt / AIWEB Publisher branding.
- Port live React animations (PublishStoryCard, ChatCard, LeadsStoryCard),
  not the old step*.webm files.
- Copy logo/chrome deps + public icons listed in the handoff.
- Preserve owner steps (01, 03) as black full-bleed bands with soft
  sand edge gradients; ChatGPT steps (02, 04) stay on sand.
- Highlight “Business Owner” with the blue mark class.
- Do not pull Firebase/MCP or the full Publisher app.
```

Or: **File → Add Folder to Workspace** and add `c:\aiweb`, then point the agent at this file.

---

## Page structure (top → bottom)

| Block | Source |
|-------|--------|
| Introducing Publisher + 3 value pills | `PublisherSection.tsx` |
| How Publisher works (4 animated steps) | `PublisherHowItWorks.tsx` |
| CTA: “Get started with AIWEB Publisher today!” + store badge | `PublisherSection.tsx` (appears twice) |
| Separator photo + “How to Create Your Own AI Web Page…” + create-to-publish video | `PublisherSection.tsx` |
| AI Web Page dictionary | `PublisherSection.tsx` |
| Human Side / Machine Side screenshots | `PublisherSection.tsx` |
| CTA + store badge (again) | `PublisherSection.tsx` |
| AI Web Metrics video + H.I.T.S definition + **LeadsStoryCard** | `PublisherSection.tsx` |
| Store badge | `PublisherSection.tsx` |
| Portable AI Web Page + `.aiweb` video + 6-item grid | `PublisherSection.tsx` |

Home wiring in this repo: `HomePage.tsx` → `<PublisherSection />`.

---

## Story steps (keep copy in sync)

| Step | Side | Title |
|------|------|--------|
| 01 | **Business Owner** (black band) | Business Owner creates & publishes AI Web Page |
| 02 | ChatGPT user (sand) | ChatGPT user requests a quote using AIWEB Plugin and receives an AIWEB Receipt |
| 03 | **Business Owner** (black band) | Business Owner receives leads from ChatGPT in AIWEB Publisher dashboard |
| 04 | ChatGPT user (sand) | ChatGPT user requests the status using the AIWEB Receipt |

Constants in `chatgptStorySteps.tsx`:

- Receipt: `OPbWTEhIyAF1vRLh6qDK`
- Page: `Savory Moments Wedding Catering`
- Slug: `savory-moments-wedding-catering`
- Quote contact: Becky Smith / `bsloveflowers@email.com`

---

## Files to copy

### Required (demo + page)

```
src/components/corp/PublisherSection.tsx
src/demo/PublisherHowItWorks.tsx
src/demo/chatgptStorySteps.tsx
src/demo/chatgptReceiptDemo.css
src/demo/publisherHowItWorks.css
src/styles/publisher-chrome-demo.css
src/components/hits/CrawlerFamilyLogo.tsx
src/lib/hits/crawlerFamilyBrand.ts
src/publisher/AiScoreRing.tsx
src/lib/aiScoreTone.ts
```

### Reuse or copy (logos)

```
src/components/welcome/AIWebLogo.tsx
src/components/welcome/PublisherIcon.tsx
src/lib/aiWebCompanyBrand.ts          # PRODUCT_URLS.aiWebAppStore
```

If the destination already has equivalent logos, rewrite imports instead of duplicating.

### Public assets

```
public/images/create-ai-web-page.png
public/icons/aiweb-wordmark.png
public/icons/aiweb-wordmark-white.png
public/icons/publisher-icon-color-dark.png
public/icons/publisher-icon-color-light.png   # if component references it
public/icons/run-on-the-webapp-store.png
public/icons/isp/ChatGPT-Logo-black.svg
public/icons/isp/chat-gpt-logo-white.svg
public/icons/analyzer/human-traffic.svg
public/icons/analyzer/human-traffic-dark.svg
public/icons/aiweb-file.png                   # portable section
public/demo/create-to-publish.webm
public/demo/create-to-publish-human.png
public/demo/create-to-publish.png
public/demo/metrics-hits.webm
public/demo/metrics-hits.png
public/demo/aiweb-download.webm
public/demo/aiweb-download.png
```

Do **not** require `public/demo/step1-…step4-*.webm` for the how-it-works story (replaced by React).

---

## Config / tokens

Merge into destination `tailwind.config` `theme.extend.colors.brand` (used by story chrome):

```js
ink: '#0d0d0d',
accent: '#8e8e8e',
foam: '#ececec',
sand: '#f9f9f9',
panel: '#171717',
panelHover: '#212121',
line: '#e5e5e5',
```

Also ensure marketing tokens used by the section exist (`marketing.ink`, `muted`, `crimson`, `green`, …) **or** rewrite class names to the destination design system.

Fonts used: display (Merriweather), marketing (Source Sans 3), mono-marketing (Source Code Pro) — match or map.

`@/` → `src/` alias required (Vite).

---

## Visual behaviors to preserve

1. **Chessboard:** steps 01 & 03 = `.publisher-how-owner` full-bleed black with soft sand gradients at top/bottom; 02 & 04 = `.publisher-how-agent` on stage sand.
2. **Business Owner mark:** blue highlight via `.publisher-how-owner-mark` (see `publisherHowItWorks.css`).
3. **Stable stage sizes:** chat replies reserve final height; leads keeps both rows in the DOM; publish card scales to width on mobile (`PublishScaledStage`).
4. **CTA copy:** `Get started with AIWEB Publisher today!` with `whitespace-nowrap` above store badge (two placements).
5. **Leads animation** also under H.I.T.S word breakdown (`LeadsStoryCard`).

---

## Do not copy

- Firebase / Hosting deploy scripts (unless you also host the same way)
- Full welcome hero / clouds (unless you want the whole home)
- `functions/`, MCP, Publisher workspace, Metrics data layer, auth
- `html2canvas` export page from publisher’s `/demo/chatgpt` (marketing embed is download-free)

---

## Smoke check after port

1. Four how-it-works steps visible; 01/03 on black bands, 02/04 on sand.
2. “Business Owner” blue-highlighted on 01 and 03.
3. Step 1: Publish click → Published; mobile scale readable.
4. Step 2 & 4: ChatGPT reply types in; label **AIWEB Receipt**.
5. Step 3 / Metrics Leads: Becky Smith + ChatGPT logo + Receipt id.
6. Both CTAs: **Get started with AIWEB Publisher today!** (single line) + store badge.
7. Create section photo + video; Human/Machine; portable grid.

---

## Deploy note (this repo only)

```bash
cd c:\aiweb
npm run deploy:hosting   # build + firebase hosting --project aiweb-7e40e
```

Requires valid `firebase login`. Destination project uses its own hosting.
