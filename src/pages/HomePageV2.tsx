import { LandingNavV2 } from '@/components/corp/LandingNavV2';
import { LandingParadoxV2 } from '@/components/corp/LandingParadoxV2';
import {
  useAiwebVcap,
  useJsonLd,
  useMarketingPageSeo,
  useScrollReveal,
} from '@/hooks/useScrollReveal';
import {
  DEFAULT_KEYWORDS,
  DEFAULT_PAGE_DESCRIPTION,
  DEFAULT_PAGE_TITLE,
  homePageJsonLd,
  SITE_CANONICAL_DESCRIPTION,
} from '@/lib/siteSeo';
import '@/styles/landingV2.css';
import '@/styles/landingV2Paradox.css';

/** Live homepage. The pre-Calling-Card version remains at `/archive`. Older homepage remains at `/classic`. */
export function HomePageV2() {
  useScrollReveal();
  useMarketingPageSeo({
    title: DEFAULT_PAGE_TITLE,
    description: DEFAULT_PAGE_DESCRIPTION,
    ogDescription: SITE_CANONICAL_DESCRIPTION,
    twitterDescription: SITE_CANONICAL_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    canonicalPath: '/',
  });
  useJsonLd(homePageJsonLd());
  useAiwebVcap();

  return (
    <div className="landing-v2 landing-v2--dark">
      <LandingNavV2 />
      <LandingParadoxV2 />
    </div>
  );
}
