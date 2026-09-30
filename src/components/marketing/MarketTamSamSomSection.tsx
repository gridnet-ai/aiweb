const MARKET_LAYERS = [
  {
    tier: 'TAM',
    value: '$298.4B',
    subtitle: 'US digital ad spend, 2024 (Statista)',
    detail:
      'Total marketing and discoverability spend AI search is positioned to redirect as discovery shifts from traditional search to AI-mediated answers.',
  },
  {
    tier: 'SAM',
    value: '$28B–$37B',
    subtitle: '2026 · ~$50B–$69B by 2030/2031',
    detail:
      'US SEO + AI-visibility/GEO services spend — the actual pool of money currently spent on discoverability that GEO is positioned to redirect. North America’s 33.9% share of the global SEO services market (2025) applied to independent 2026 global estimates ($84B–$108B), growing with the market toward 2030/2031.',
  },
  {
    tier: 'Beachhead channel',
    value: '$4.7B',
    subtitle: '2026 · $12.3B by 2027 · ~38% CAGR',
    detail:
      'The vibe-coding / AI-app-builder market — Replit, Lovable, Bolt, v0, Base44, Cursor. Not a subset of SAM: the distribution channel into SAM — builders and businesses reachable through npx publishtoai.',
  },
] as const;

const BRIDGE_NOTE =
  'AI search is capturing a growing share of the $298.4B digital ad economy. The near-term SAM is the $28B–$37B US discoverability spend already flowing through SEO and GEO; vibe-coding platforms ($4.7B today, heading to $12.3B by 2027) are the beachhead channel into that pool.';

export function MarketTamSamSomSection() {
  return (
    <section className="marketing-reveal relative w-full overflow-hidden border-t border-marketing-border px-4 py-14 sm:px-5 md:px-8 md:py-20">
      <div
        className="pointer-events-none absolute -left-28 top-0 h-[430px] w-[430px] rounded-full bg-[conic-gradient(from_200deg_at_50%_50%,#FFC629_0%,#ff6b4a_25%,#c850c0_55%,#635bff_80%,#FFC629_100%)] opacity-20 blur-3xl md:h-[600px] md:w-[600px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-[1080px]">
        <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
          Market
        </p>
        <div className="mt-3 max-w-3xl">
          <h2 className="font-display text-[clamp(2.25rem,7vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-marketing-ink">
            TAM, SAM, and beachhead.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-marketing-muted md:text-lg">
            A new category forming inside a massive existing budget — from total digital ad spend
            down to the builders shipping products today.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-marketing-border bg-marketing-border md:grid-cols-3">
          {MARKET_LAYERS.map((layer, index) => (
            <article
              key={layer.tier}
              className={`bg-white/90 p-6 backdrop-blur-sm md:p-7 ${
                index === MARKET_LAYERS.length - 1 ? 'ring-1 ring-inset ring-marketing-gold/40' : ''
              }`}
            >
              <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.14em] text-marketing-muted2">
                {layer.tier}
              </p>
              <p className="font-display mt-2 text-3xl font-extrabold tracking-tight text-marketing-ink md:text-4xl">
                {layer.value}
              </p>
              <p className="mt-1 text-xs font-semibold text-marketing-ink md:text-[13px]">
                {layer.subtitle}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-marketing-muted">{layer.detail}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-3xl border-l-2 border-marketing-gold pl-4 text-sm leading-relaxed text-marketing-muted">
          {BRIDGE_NOTE}
        </p>
      </div>
    </section>
  );
}
