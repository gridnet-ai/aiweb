import { LandingNavV2 } from '@/components/corp/LandingNavV2';
import { LandingParadoxV2 } from '@/components/corp/LandingParadoxV2';
import { useJsonLd, useMarketingPageSeo, useScrollReveal } from '@/hooks/useScrollReveal';
import { organizationJsonLd } from '@/lib/siteSeo';
import '@/styles/landingV2.css';
import '@/styles/landingV2Paradox.css';

const OS_TITLE = 'AIWEB OS — publish pages AI can call';
const OS_DESCRIPTION =
  'Create, publish, and measure AIWEB Pages in AIWEB OS. Automate the boring stuff everywhere you create for AI.';

export function OsPage() {
  useScrollReveal();
  useMarketingPageSeo({
    title: OS_TITLE,
    description: OS_DESCRIPTION,
    canonicalPath: '/os',
  });
  useJsonLd(organizationJsonLd());

  return (
    <div className="landing-v2">
      <LandingNavV2 />
      <LandingParadoxV2 page="os" />
    </div>
  );
}
