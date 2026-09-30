import { CORP_CONTACTS } from '@/lib/aiWebCompanyBrand';
import { PageHero } from '@/components/corp/PageHero';
import { CompetitorMapSection } from '@/components/marketing/CompetitorMapSection';
import { MarketTamSamSomSection } from '@/components/marketing/MarketTamSamSomSection';
import { TractionTimelineSection } from '@/components/marketing/TractionTimelineSection';
import { useMarketingPageSeo, useScrollReveal } from '@/hooks/useScrollReveal';

export function InvestorsPage() {
  useScrollReveal();
  useMarketingPageSeo({
    title: 'Investors · AI Web Company',
    description:
      'Investor and partner overview for AI Web Company — traction, market, landscape, and contact.',
    canonicalPath: '/investors',
  });

  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Partner with AI Web Company."
        lede="Qualified overview for angels, funds, and strategic partners — not a public pitch deck dump."
      />

      <TractionTimelineSection />
      <MarketTamSamSomSection />
      <CompetitorMapSection />

      <section className="marketing-reveal w-full border-t border-marketing-border px-4 py-14 sm:px-5 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-[1080px]">
          <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
            Partners
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold tracking-[-0.03em] text-marketing-ink">
            Ecosystem and pilots
          </h2>
          <ul className="mt-8 space-y-4 text-[15px] leading-relaxed text-marketing-muted">
            <li className="border-l-2 border-marketing-gold pl-4">
              Google for Startups member (Mar 2026)
            </li>
            <li className="border-l-2 border-marketing-gold pl-4">
              SATX District One pilot — signed LOI (Jun 2026)
            </li>
            <li className="border-l-2 border-marketing-gold pl-4">
              Founder Institute Austin Cohort 25 alumnus
            </li>
          </ul>
        </div>
      </section>

      <section className="marketing-reveal w-full border-t border-marketing-border px-4 py-14 pb-20 sm:px-5 md:px-8">
        <div className="mx-auto w-full max-w-[1080px]">
          <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
            Contact
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold tracking-[-0.03em] text-marketing-ink">
            Request the deck
          </h2>
          <p className="mt-4 max-w-xl text-marketing-muted">
            Confidential materials are shared on request — not hotlinked publicly.
          </p>
          <a
            href={CORP_CONTACTS.investors}
            className="mt-6 inline-flex min-h-[44px] items-center justify-center bg-marketing-crimson px-6 text-[14px] font-semibold text-white transition hover:bg-marketing-crimsonDark"
          >
            Email investors@theaiwebcompany.com
          </a>
        </div>
      </section>
    </>
  );
}
