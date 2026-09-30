# AI Web Company — theaiwebcompany.com

Corporate marketing site for **AI Web Company**.

**Positioning**
- Headline: AIWEB is the commercial action layer for AI.
- Subheadline: Publish AIWEB Pages that AI agents can discover, understand, and act through.
- Product loop: Build. Publish. Get discovered. Receive Calls. Respond. Improve. Repeat.

## Develop

```bash
npm install
npm run dev
```

Dev server: http://localhost:5174

## Firebase

Project **`aiweb-7e40e`** — Hosting + Analytics only (`src/firebase/config.ts`). No Auth / Firestore product registry on corp.

## Build & deploy

```bash
npm run build
npm run deploy:hosting
```

Point DNS for `theaiwebcompany.com` / `www` at Firebase Hosting for `aiweb-7e40e`.

## Routes

`/` · `/about` · `/team` · `/press` · `/investors` · `/careers` · `/news` · `/blog` (+ post slugs)
