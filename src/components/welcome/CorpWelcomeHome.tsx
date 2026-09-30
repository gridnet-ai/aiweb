import { AIWebLogo } from '@/components/welcome/AIWebLogo';
import { WebPageHistoryTimeline } from '@/components/welcome/WebPageHistoryTimeline';
import { WelcomeCloudCarousel } from '@/components/welcome/WelcomeCloudCarousel';

/**
 * Corp home welcome — visual port of aiweb-publisher WelcomeScreen (no Auth).
 */
export function CorpWelcomeHome() {
  return (
    <div className="pwa-root pwa-root--welcome pwa-root--corp-home">
      <WelcomeCloudCarousel />
      <div className="pwa-welcome">
        <div className="pwa-welcome-main">
          <div className="pwa-welcome-brand-block">
            <div className="pwa-welcome-logo-wrap" aria-hidden>
              <AIWebLogo color="#000000" width={280} className="pwa-logo-bare pwa-logo-wordmark" />
            </div>
            <p className="pwa-welcome-tagline pwa-welcome-hero-reveal">
              AIWEB is the commercial action layer for AI.
            </p>
          </div>
          <WebPageHistoryTimeline />
        </div>
      </div>
    </div>
  );
}
