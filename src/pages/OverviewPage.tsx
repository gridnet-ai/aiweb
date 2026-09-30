import { Link } from 'react-router-dom';
import { CareersCta } from '@/components/corp/CareersCta';
import { CorpHero } from '@/components/corp/CorpHero';
import { MissionStrip } from '@/components/corp/MissionStrip';
import { NewsTeaser } from '@/components/corp/NewsTeaser';
import { ProductsPortfolio } from '@/components/corp/ProductsPortfolio';
import { TeamSection } from '@/components/marketing/TeamSection';
import { TractionTimelineSection } from '@/components/marketing/TractionTimelineSection';
import { useJsonLd, useMarketingPageSeo, useScrollReveal } from '@/hooks/useScrollReveal';
import { OVERVIEW_PATH, TEAM_PATH } from '@/lib/corpSiteRoutes';
import {
  DEFAULT_KEYWORDS,
  DEFAULT_PAGE_DESCRIPTION,
  organizationJsonLd,
} from '@/lib/siteSeo';

/** Former marketing home — kept for reference and content reuse. */
export function OverviewPage() {
  useScrollReveal();
  useMarketingPageSeo({
    title: 'Overview · AI Web Company',
    description: DEFAULT_PAGE_DESCRIPTION,
    canonicalPath: OVERVIEW_PATH,
    keywords: DEFAULT_KEYWORDS,
  });
  useJsonLd(organizationJsonLd());

  return (
    <>
      <CorpHero />
      <MissionStrip />
      <TractionTimelineSection />
      <TeamSection limit={4} showFooterNote={false} />
      <div className="pb-6 text-center">
        <Link
          to={TEAM_PATH}
          className="text-[14px] font-semibold text-marketing-crimson hover:text-marketing-crimsonDark"
        >
          Full team →
        </Link>
      </div>
      <NewsTeaser />
      <ProductsPortfolio />
      <CareersCta />
    </>
  );
}
