import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LandingNavV2 } from '@/components/corp/LandingNavV2';
import { HOME_PATH } from '@/lib/corpSiteRoutes';
import { phoneInstallAppHref } from '@/lib/detectPhonePlatform';
import {
  trackPhoneInstallEvent,
  type PhoneInstallPlatform,
} from '@/lib/phoneInstallAnalytics';
import '@/styles/phonePlatformLanding.css';

export type PhonePlatformLandingContent = {
  platform: PhoneInstallPlatform;
  title: string;
  subheadline: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  /** Ordered install-on-device steps (signup happens after first launch). */
  steps: readonly string[];
  openInBrowserLabel: string;
  otherPlatform: {
    label: string;
    to: string;
  };
};

function PlatformTitleIcon({ platform }: { platform: PhoneInstallPlatform }) {
  if (platform === 'ios') {
    return (
      <svg className="phone-platform-title-icon" viewBox="0 0 24 24" aria-hidden fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    );
  }
  return (
    <svg className="phone-platform-title-icon" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M17.59 9.48 19.43 6.3a.6.6 0 0 0-.26-.85.62.62 0 0 0-.83.22l-1.88 3.24a11.4 11.4 0 0 0-8.92 0L5.66 5.67a.62.62 0 0 0-.83-.22.6.6 0 0 0-.26.85l1.84 3.18C4.3 11.04 2.8 14.04 2.8 17.5h18.4c0-3.46-1.5-6.46-3.61-8.02ZM7.5 14.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm9 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
    </svg>
  );
}

export function PhonePlatformLanding({ content }: { content: PhonePlatformLandingContent }) {
  const installHref = phoneInstallAppHref(content.platform);

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
            AIWEB Phone · Install first
          </p>
          <h1 className="phone-platform-title">
            <PlatformTitleIcon platform={content.platform} />
            <span>{content.title}</span>
          </h1>
          <p className="phone-platform-sub">{content.subheadline}</p>

          <figure className="phone-platform-figure">
            <img src={content.imageSrc} alt={content.imageAlt} width={269} height={202} />
          </figure>

          <p className="phone-platform-desc">{content.description}</p>

          <section className="phone-platform-install" aria-labelledby="phone-install-heading">
            <h2 id="phone-install-heading">Install on this device</h2>
            <ol>
              {content.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="phone-platform-install-note">
              Sign up appears after you open AIWEB Phone from your Home Screen — not in the browser
              tab.
            </p>
          </section>

          <a
            className="phone-platform-cta"
            href={installHref}
            onClick={() =>
              trackPhoneInstallEvent({
                event: 'phone_install_open_app',
                platform: content.platform,
              })
            }
          >
            {content.openInBrowserLabel}
          </a>

          <ul className="phone-platform-limits">
            <li>Install the app before signing up</li>
            <li>Not a cellular carrier</li>
            <li>No SMS · No emergency calling</li>
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
