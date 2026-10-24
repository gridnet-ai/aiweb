import { Link } from 'react-router-dom';
import { PageHero } from '@/components/corp/PageHero';
import { PublisherPricingTable } from '@/components/corp/PublisherPricingTable';
import { AIWebLogo } from '@/components/welcome/AIWebLogo';
import { HOME_PATH } from '@/lib/corpSiteRoutes';
import { useMarketingPageSeo } from '@/hooks/useScrollReveal';

export function PricingPage() {
  useMarketingPageSeo({
    title: 'Pricing · AIWEB',
    description:
      'AIWEB Phone is $4.99 a month. Get an IRL-###-###-###-### number. Others reach you by prompting @AIWEB plus your number — Calls land in AIWEB Mail.',
    canonicalPath: '/pricing',
  });

  return (
    <>
      <div className="border-b border-marketing-border bg-white px-4 py-4 sm:px-5 md:px-8">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-4">
          <Link to={HOME_PATH} aria-label="AI Web Company — home" className="inline-flex">
            <AIWebLogo color="#000000" width={132} className="h-7 w-auto" />
          </Link>
          <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.14em] text-marketing-muted2">
            AIWEB
          </p>
        </div>
      </div>
      <PageHero
        eyebrow="Pricing"
        title="AIWEB Phone is $4.99 a month."
        lede="Your number on the AIWEB. Page, Mail, and unlimited calls — user to user."
      />
      <section className="w-full px-4 pb-20 sm:px-5 md:px-8">
        <div className="mx-auto max-w-[1080px]">
          <PublisherPricingTable showHeading={false} planIds={['phone']} />
        </div>
      </section>
    </>
  );
}
