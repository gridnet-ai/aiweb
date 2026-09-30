import { FounderProfileSection } from '@/components/marketing/FounderProfileSection';
import { PageHero } from '@/components/corp/PageHero';
import { PRODUCT_URLS } from '@/lib/aiWebCompanyBrand';
import { useJsonLd, useMarketingPageSeo, useScrollReveal } from '@/hooks/useScrollReveal';
import { organizationJsonLd } from '@/lib/siteSeo';

const HOW_WE_SHOW_UP = [
  {
    title: 'Search',
    body: 'Multi-model discovery and AI visibility through Big Search.',
    href: PRODUCT_URLS.bigSearch,
  },
  {
    title: 'Publish',
    body: 'Machine-readable presence for generative and answer engines via Publish To AI.',
    href: PRODUCT_URLS.publishToAi,
  },
  {
    title: 'AI Web Pages',
    body: 'Structured pages agents and humans can both use — inside AI Web App.',
    href: PRODUCT_URLS.aiWebApp,
  },
  {
    title: 'IRL / VCAP',
    body: 'Real-world presence and merchant surfaces — product-hosted, not on this domain.',
    href: `${PRODUCT_URLS.aiWebApp}/irl`,
  },
] as const;

export function AboutPage() {
  useScrollReveal();
  useMarketingPageSeo({
    title: 'About · AI Web Company',
    description:
      'AIWEB is the commercial action layer for AI. Publish AIWEB Pages that AI agents can discover, understand, and act through.',
    canonicalPath: '/about',
  });
  useJsonLd(organizationJsonLd());

  return (
    <>
      <PageHero
        eyebrow="About"
        title="AIWEB is the commercial action layer for AI."
        lede="Publish AIWEB Pages that AI agents can discover, understand, and act through. Build. Publish. Get discovered. Receive Calls. Respond. Improve. Repeat."
      />

      <section className="marketing-reveal w-full border-t border-marketing-border px-4 py-14 sm:px-5 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-[1080px]">
          <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
            Company
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold tracking-[-0.03em] text-marketing-ink">
            Holding company for the AI Web portfolio
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-marketing-muted">
            Product conversion for AIWEB OS lives on theaiwebcompany.com/pricing. Search, Publish
            To AI, and AI Web App remain on their product domains. This site is also for company
            story, talent, press, and capital — one canonical home per topic.
          </p>
        </div>
      </section>

      <section className="marketing-reveal w-full border-t border-marketing-border px-4 py-14 sm:px-5 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-[1080px]">
          <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
            Mission
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold tracking-[-0.03em] text-marketing-ink">
            AI as a utility
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-marketing-muted">
            The same adoption curve that turned computing and the internet into everyday utilities is
            happening again with AI. We build infrastructure so bots, agents, and humans can discover,
            publish, and show up on that network.
          </p>
        </div>
      </section>

      <section className="marketing-reveal w-full border-t border-marketing-border px-4 py-14 sm:px-5 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-[1080px]">
          <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
            How we show up
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold tracking-[-0.03em] text-marketing-ink">
            Search · Publish · Pages · IRL
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {HOW_WE_SHOW_UP.map((item) => (
              <li key={item.title} className="border-t border-marketing-border pt-5">
                <h3 className="text-lg font-bold text-marketing-ink">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-marketing-muted">{item.body}</p>
                <a
                  href={item.href}
                  className="mt-3 inline-flex text-[13px] font-semibold text-marketing-crimson hover:text-marketing-crimsonDark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Product →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FounderProfileSection />
    </>
  );
}
