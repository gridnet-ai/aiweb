import { LandingParadoxV2 } from '@/components/corp/archive/LandingParadoxV2';
import { LandingNavV2 } from '@/components/corp/LandingNavV2';
import { useJsonLd, useMarketingPageSeo, useScrollReveal } from '@/hooks/useScrollReveal';
import {
  DEFAULT_KEYWORDS,
  DEFAULT_PAGE_DESCRIPTION,
  DEFAULT_PAGE_TITLE,
  homePageJsonLd,
} from '@/lib/siteSeo';
import '@/styles/landingV2.css';
import '@/styles/landingV2Paradox.css';

/** Frozen copy of the homepage before the Calling Card hero. Not indexed. */
export function HomePageArchive() {
  useScrollReveal();
  useMarketingPageSeo({
    title: DEFAULT_PAGE_TITLE,
    description: DEFAULT_PAGE_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    canonicalPath: '/archive',
    robots: 'noindex, nofollow',
  });
  useJsonLd(homePageJsonLd());

  return (
    <div className="landing-v2">
      <LandingNavV2 />
      <LandingParadoxV2 />
    </div>
  );
}
