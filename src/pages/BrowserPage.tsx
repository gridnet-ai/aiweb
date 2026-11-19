import { LandingNavV2 } from '@/components/corp/LandingNavV2';
import { useLandingTheme } from '@/hooks/useLandingTheme';
import { useMarketingPageSeo } from '@/hooks/useScrollReveal';
import { BROWSER_DOWNLOAD_URL, BROWSER_PATH } from '@/lib/corpSiteRoutes';
import '@/styles/landingV2.css';
import '@/styles/landingV2Paradox.css';

export function BrowserPage() {
  const { isDark } = useLandingTheme();
  useMarketingPageSeo({
    title: 'AIWEB Browser',
    description: 'Download AIWEB Browser.',
    canonicalPath: BROWSER_PATH,
  });

  return (
    <div className={`landing-v2${isDark ? ' landing-v2--dark' : ''}`}>
      <LandingNavV2 />
      <main className="browser-page">
        <h1 className="browser-page-title">Browser</h1>
        <a
          className="browser-page-download"
          href={BROWSER_DOWNLOAD_URL}
          download="AIWEB-Browser-Setup-win-x64.zip"
        >
          Download
        </a>
      </main>
    </div>
  );
}
