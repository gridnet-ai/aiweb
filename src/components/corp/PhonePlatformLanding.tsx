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
          <h1 className="phone-platform-title">{content.title}</h1>
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
            target="_blank"
            rel="noopener noreferrer"
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
