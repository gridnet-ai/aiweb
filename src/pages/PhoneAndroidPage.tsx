import { useEffect } from 'react';
import { phoneInstallAppHref } from '@/lib/detectPhonePlatform';
import { trackPhoneInstallEvent } from '@/lib/phoneInstallAnalytics';
import { useMarketingPageSeo } from '@/hooks/useScrollReveal';
import { PHONE_ANDROID_PATH } from '@/lib/corpSiteRoutes';

/** Send Android install traffic to the Phone host — never install this company page. */
export function PhoneAndroidPage() {
  useMarketingPageSeo({
    title: 'AIWEB Phone for Android — Install from Chrome',
    description:
      'Install AIWEB Phone on Android from Chrome, then open it from your Home Screen to sign up. $4.99/mo. Not a cellular carrier.',
    canonicalPath: PHONE_ANDROID_PATH,
    image: '/images/promo/aiweb-phone-android.png',
  });

  useEffect(() => {
    trackPhoneInstallEvent({
      event: 'phone_install_guide_view',
      platform: 'android',
    });
    trackPhoneInstallEvent({
      event: 'phone_install_open_app',
      platform: 'android',
    });
    window.location.replace(phoneInstallAppHref('android'));
  }, []);

  return (
    <main className="phone-platform landing-v2" style={{ padding: '4rem 1.25rem', textAlign: 'center' }}>
      <p>Opening AIWEB Phone to install…</p>
      <p>
        <a href={phoneInstallAppHref('android')}>Continue to install</a>
      </p>
    </main>
  );
}
