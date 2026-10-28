import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LandingNavV2 } from '@/components/corp/LandingNavV2';
import { HOME_PATH, PHONE_SITE_URL } from '@/lib/corpSiteRoutes';
import {
  trackPhoneInstallEvent,
  type PhoneInstallPlatform,
} from '@/lib/phoneInstallAnalytics';
import {
  AIWEB_AI_NUMBER_EXAMPLE,
  AIWEB_AI_NUMBER_FORMAT,
} from '@/lib/siteSeo';
import '@/styles/phonePlatformLanding.css';

export type PhonePlatformLandingContent = {
  platform: PhoneInstallPlatform;
  title: string;
  subheadline: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  steps: readonly string[];
  otherPlatform: {
    label: string;
    to: string;
  };
};

export function PhonePlatformLanding({ content }: { content: PhonePlatformLandingContent }) {
  useEffect(() => {
    trackPhoneInstallEvent({
      event: 'phone_install_guide_view',
      platform: content.platform,
    });
  }, [content.platform]);

  return (
    <div className="phone-platform landing-v2">
      <LandingNavV2 />
      <main className="phone-platform-main">
        <article className="phone-platform-card">
          <p className="phone-platform-eyebrow">
            <img src="/icons/aiweb-cloud.png?v=2" alt="" className="phone-platform-cloud" />
            AIWEB Phone · $4.99/mo
          </p>
          <h1 className="phone-platform-title">{content.title}</h1>
          <p className="phone-platform-sub">{content.subheadline}</p>

          <figure className="phone-platform-figure">
            <img src={content.imageSrc} alt={content.imageAlt} width={269} height={202} />
          </figure>

          <p className="phone-platform-desc">{content.description}</p>

          <div className="phone-platform-meta">
            <p>
              <strong>Public AI number</strong>
              <span>
                {AIWEB_AI_NUMBER_FORMAT} · example {AIWEB_AI_NUMBER_EXAMPLE}
              </span>
            </p>
            <p>
              <strong>How it works</strong>
              <span>Call → Receipt → Mail — same app on every platform</span>
            </p>
          </div>

          <section className="phone-platform-install" aria-labelledby="phone-install-heading">
            <h2 id="phone-install-heading">How to install</h2>
            <ol>
              {content.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <a
            className="phone-platform-cta"
            href={PHONE_SITE_URL}
            onClick={() =>
              trackPhoneInstallEvent({
                event: 'phone_install_open_app',
                platform: content.platform,
              })
            }
          >
            Get AIWEB Phone — $4.99/mo
          </a>

          <ul className="phone-platform-limits">
            <li>Not a cellular carrier</li>
            <li>No SMS</li>
            <li>No emergency calling</li>
          </ul>

          <p className="phone-platform-switch">
            On a different device?{' '}
            <Link to={content.otherPlatform.to}>{content.otherPlatform.label}</Link>
            {' · '}
            <Link to={`${HOME_PATH}#install`}>All install options</Link>
          </p>
        </article>
      </main>
    </div>
  );
}
