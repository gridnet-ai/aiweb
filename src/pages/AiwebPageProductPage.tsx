import { LandingNavV2 } from '@/components/corp/LandingNavV2';
import { useLandingTheme } from '@/hooks/useLandingTheme';
import { useMarketingPageSeo } from '@/hooks/useScrollReveal';
import { PAGE_LEARN_MORE_URL, PAGE_PATH } from '@/lib/corpSiteRoutes';
import '@/styles/landingV2.css';
import '@/styles/landingV2Paradox.css';

export function AiwebPageProductPage() {
  const { isDark } = useLandingTheme();
  useMarketingPageSeo({
    title: 'AIWEB Page',
    description: 'Learn more about AIWEB Page.',
    canonicalPath: PAGE_PATH,
  });

  return (
    <div className={`landing-v2${isDark ? ' landing-v2--dark' : ''}`}>
      <LandingNavV2 />
      <main className="browser-page">
        <h1 className="browser-page-title">AIWEB Page</h1>
        <a
          className="browser-page-download"
          href={PAGE_LEARN_MORE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>
      </main>
    </div>
  );
}
