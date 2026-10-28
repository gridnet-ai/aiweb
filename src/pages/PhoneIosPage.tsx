import { useEffect } from 'react';
import { phoneInstallAppHref } from '@/lib/detectPhonePlatform';
import { trackPhoneInstallEvent } from '@/lib/phoneInstallAnalytics';
import { useMarketingPageSeo } from '@/hooks/useScrollReveal';
import { PHONE_IOS_PATH } from '@/lib/corpSiteRoutes';

/** Send iOS install traffic to the Phone host — never install this company page. */
export function PhoneIosPage() {
  useMarketingPageSeo({
    title: 'AIWEB Phone for iOS — Install from Safari',
    description:
      'Install AIWEB Phone on iPhone from Safari, then open it from your Home Screen to sign up. $4.99/mo. Not a cellular carrier.',
    canonicalPath: PHONE_IOS_PATH,
    image: '/images/promo/aiweb-phone-ios.png',
  });

  useEffect(() => {
    trackPhoneInstallEvent({
      event: 'phone_install_guide_view',
      platform: 'ios',
    });
    trackPhoneInstallEvent({
      event: 'phone_install_open_app',
      platform: 'ios',
    });
    window.location.replace(phoneInstallAppHref('ios'));
  }, []);

  return (
    <main className="phone-platform landing-v2" style={{ padding: '4rem 1.25rem', textAlign: 'center' }}>
      <p>Opening AIWEB Phone to install…</p>
      <p>
        <a href={phoneInstallAppHref('ios')}>Continue to install</a>
      </p>
    </main>
  );
}
