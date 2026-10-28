import { PhonePlatformLanding } from '@/components/corp/PhonePlatformLanding';
import { useMarketingPageSeo } from '@/hooks/useScrollReveal';
import { PHONE_ANDROID_PATH, PHONE_IOS_PATH } from '@/lib/corpSiteRoutes';

export function PhoneAndroidPage() {
  useMarketingPageSeo({
    title: 'AIWEB Phone for Android — Install from Chrome',
    description:
      'Install AIWEB Phone on Android from Chrome, then open it from your Home Screen to sign up. $4.99/mo. Not a cellular carrier.',
    canonicalPath: PHONE_ANDROID_PATH,
    image: '/images/promo/aiweb-phone-android.png',
  });

  return (
    <PhonePlatformLanding
      content={{
        platform: 'android',
        title: 'Install AIWEB Phone on Android',
        subheadline: 'Install the app first. Sign up opens when you launch it from your Home Screen.',
        description:
          'AIWEB Phone is a web app. Install it from Chrome, then launch it from your Home Screen or app drawer — that first launch is where you get your AI number.',
        imageSrc: '/images/promo/aiweb-phone-android.png',
        imageAlt: 'Android phone ready for AIWEB Phone as an installed web app.',
        openInBrowserLabel: 'Open in Chrome to install',
        steps: [
          'Tap Open in Chrome to install.',
          'Use Install app / Add to Home screen from the browser prompt or Chrome menu.',
          'Confirm the install.',
          'Open AIWEB Phone from your Home Screen or app drawer — signup is the first screen.',
        ],
        otherPlatform: {
          label: 'iOS install guide',
          to: PHONE_IOS_PATH,
        },
      }}
    />
  );
}
