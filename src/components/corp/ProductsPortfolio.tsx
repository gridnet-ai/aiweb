import { PRODUCT_URLS } from '@/lib/aiWebCompanyBrand';

const PRODUCTS = [
  {
    name: 'AI Web App',
    blurb: 'Search, Chat, and Publish — the Progressive Web App for bots, agents, and humans.',
    href: PRODUCT_URLS.aiWebApp,
  },
  {
    name: 'Big Search',
    blurb: 'Multi-model search and AI visibility — Auth and registry backend of record.',
    href: PRODUCT_URLS.bigSearch,
  },
  {
    name: 'Publish To AI',
    blurb: 'Ship machine-readable presence for generative and answer engines.',
    href: PRODUCT_URLS.publishToAi,
  },
] as const;

export function ProductsPortfolio() {
  return (
    <section className="marketing-reveal relative overflow-hidden border-t border-marketing-border px-4 py-14 sm:px-5 md:px-8 md:py-20">
      <div
        className="pointer-events-none absolute -left-28 bottom-0 h-[400px] w-[400px] rounded-full bg-[conic-gradient(from_200deg_at_50%_50%,#FFC629_0%,#ff6b4a_25%,#c850c0_55%,#635bff_80%,#FFC629_100%)] opacity-15 blur-3xl"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-[1080px]">
        <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
          Products
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-marketing-ink">
          The AI Web portfolio
        </h2>
        <p className="mt-4 max-w-xl text-base text-marketing-muted">
          Company storytelling lives here. Product conversion lives on each product domain.
        </p>

        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {PRODUCTS.map((product) => (
            <li key={product.name} className="border-t border-marketing-border pt-5">
              <h3 className="text-lg font-bold text-marketing-ink">{product.name}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-marketing-muted">{product.blurb}</p>
              <a
                href={product.href}
                className="mt-4 inline-flex text-[13px] font-semibold text-marketing-crimson hover:text-marketing-crimsonDark"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
