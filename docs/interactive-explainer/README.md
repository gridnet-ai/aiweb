# Interactive AI Web explainer — console port kit

Snapshot of the marketing **CorpHeroDistribution** interactive explainer from `theaiwebcompany.com` (`C:\aiweb`), packaged for reuse in the **AI Web console** UI (`C:\aiwebpage`).

**Updated:** 2026-07-30 (includes hub remove control, Connect 1/2/3 on current graph, circular aiWh meter)

**Source of truth in this folder**

| File | Purpose |
|------|---------|
| `CorpHeroDistribution.tsx` | Full React component (copy into console) |
| `corp-hero-dist.css` | Animations + meter / federation styles |
| `ai-web-logo-white.png` | Hub / origin mark (dark tiles) |
| `ai-web-logo-black.png` | Sub-web mark (light tiles) |
| `README.md` | This porting guide |

Live marketing source (may drift after this snapshot):

- `src/components/corp/CorpHeroDistribution.tsx`
- `src/styles/marketing.css` (`.corp-hero-dist*` rules)
- Hosted in `MissionStrip` on the home page

---

## What it teaches

1. **Spin up** top-level AI Webs (click hub; up to 4).
2. **Remove an AI Web** via the corner **−** control on each hub (hidden when only one web remains).
3. **Nest Sub Webs** under the active web (click again; up to 5 each).
4. **Start / Stop** intelligence flow: RGB Search / Chat / Publish packets along the graph (merge toward white).
5. **aiWh meter** at the Search·Chat·Publish junction (live ticking circle while flowing / federated).
6. **Connect 1 / 2 / 3** federation on *existing* live webs & sub-webs only (does not invent nodes; control stays clickable; lines appear when ≥2 connectable nodes exist):
   - **1** — peers (root↔root, or root↔subs if only one live web)
   - **2** — cross (roots + cross-sub links, or sibling subs)
   - **3** — full mesh of all connectable nodes

---

## Dependencies

```txt
react
lucide-react   # Bot, Link2, Minus, Play, Plus, RefreshCw, Sparkles, Square, User
```

Tailwind utility classes are used heavily. Marketing tokens used in class names:

| Class / token | Hex / role |
|---------------|------------|
| `text-marketing-ink` / `bg-marketing-ink` | near-black ink |
| `text-marketing-muted` / `muted2` | secondary text |
| `border-marketing-border` | hairline border |
| `bg-marketing-off` | soft off-white fill |
| `text-marketing-crimson` / `bg-marketing-crimson` / `border-marketing-crimson` | `#C8202F` federation + remove accent |
| `ring-marketing-gold` | `#FFC629` selection |
| `font-mono-marketing` | mono labels (Source Code Pro or console mono) |

**Capability colors (inline):** Search `#E53935` · Chat `#22C55E` · Publish `#2563EB` · merged packet `#FFFFFF`.

**Hub remove control:** `.corp-hero-dist__hub-remove` — absolute corner button (`Minus` icon); styled via Tailwind utilities in the TSX (no extra CSS required).

---

## Console integration checklist

1. Copy `CorpHeroDistribution.tsx` → e.g. `src/components/console/AiWebInteractiveExplainer.tsx` (rename export if desired).
2. Import `corp-hero-dist.css` from the console CSS entry (or merge into `aiWebConsole.css`).
3. Place logos under console public assets and update image paths:
   - Marketing: `/marketing/ai-web-logo-white.png`, `/marketing/ai-web-logo-black.png`
   - Console example: `/ai-web-logo-white.png` (or your existing brand asset paths).
4. Remap Tailwind `marketing-*` classes to console tokens (`aiweb-*` / GCP-style chrome) **or** add temporary aliases in `tailwind.config`.
5. Mount where it fits console UX, e.g.:
   - Empty-state / onboarding panel on Overview
   - “How AI Webs work” drawer next to Create AI Web
   - Help / Learn tab
6. Optional: wire `Start`/`Stop`/`fedMode`/`removeRoot` to real lifecycle later; today they are **local demo state only**.

### Minimal mount

```tsx
import { CorpHeroDistribution } from '@/components/console/AiWebInteractiveExplainer';
import '@/styles/corp-hero-dist.css'; // or path after copy

export function ExplainerPanel() {
  return (
    <section className="…">
      <CorpHeroDistribution />
    </section>
  );
}
```

---

## Suggested console UX adaptations

- Drop the marketing intro line (“Try our interactive explainer below”) or replace with console copy.
- Match toolbar buttons to `AiWebLifecycleToolbar` density (`aiweb-btn` / row lifecycle styles) while keeping Connect **1 · 2 · 3** segmented control.
- Prefer console logo assets already used in Overview / Create wizard.
- For dark console shells: invert hub fills, meter border, and federation stroke (`#C8202F` still works on dark); keep remove chip high-contrast.
- Keep federation **relative to graph nodes already present** — do not auto-spawn webs when porting unless product asks for demo presets.
- Map hub **−** to console delete / stop-instance patterns if this becomes a live topology editor.

---

## Behavior notes for engineers

- Federation SVG arcs are measured from `[data-fed-node="…"]` centers inside the graph host (`ResizeObserver` + layout key).
- `fedMode` `useEffect` recomputes `links` whenever mode or `roots` change.
- Intelligence flow uses SVG `<animateMotion>` packets; Stop clears `flowing` only (does not clear federation).
- `removeRoot(id)` drops a hub when `roots.length > 1`; reassigns `activeId` if needed; federation links refresh via the `roots` effect.
- Reset clears roots, links, flow, and federation mode.

---

## Refreshing this kit from marketing

From `C:\aiweb`:

```powershell
Copy-Item src\components\corp\CorpHeroDistribution.tsx docs\interactive-explainer\CorpHeroDistribution.tsx -Force
# Re-extract .corp-hero-dist* rules from src\styles\marketing.css into corp-hero-dist.css if styles changed
Copy-Item public\marketing\ai-web-logo-white.png docs\interactive-explainer\ -Force
Copy-Item public\marketing\ai-web-logo-black.png docs\interactive-explainer\ -Force
```
