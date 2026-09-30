import { LandingNavV2 } from '@/components/corp/LandingNavV2';
import { LandingParadoxV2 } from '@/components/corp/LandingParadoxV2';
import { useJsonLd, useMarketingPageSeo, useScrollReveal } from '@/hooks/useScrollReveal';
import {
  DEFAULT_KEYWORDS,
  DEFAULT_PAGE_DESCRIPTION,
  DEFAULT_PAGE_TITLE,
  homePageJsonLd,
} from '@/lib/siteSeo';
import '@/styles/landingV2.css';
import '@/styles/landingV2Paradox.css';

/** Live homepage. Previous homepage remains at `/classic`. */
export function HomePageV2() {
  useScrollReveal();
  useMarketingPageSeo({
    title: DEFAULT_PAGE_TITLE,
    description: DEFAULT_PAGE_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    canonicalPath: '/',
  });
  useJsonLd(homePageJsonLd());

  return (
    <div className="landing-v2">
      <LandingNavV2 />
      <LandingParadoxV2 />
    </div>
  );
}
