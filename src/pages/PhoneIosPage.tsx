import { PhonePlatformLanding } from '@/components/corp/PhonePlatformLanding';
import { useMarketingPageSeo } from '@/hooks/useScrollReveal';
import { PHONE_ANDROID_PATH, PHONE_IOS_PATH } from '@/lib/corpSiteRoutes';

export function PhoneIosPage() {
  useMarketingPageSeo({
    title: 'AIWEB Phone for iOS — Install from Safari',
    description:
      'Install AIWEB Phone on iPhone from Safari, then open it from your Home Screen to sign up. $4.99/mo. Not a cellular carrier.',
    canonicalPath: PHONE_IOS_PATH,
    image: '/images/promo/aiweb-phone-ios.png',
  });

  return (
    <PhonePlatformLanding
      content={{
        platform: 'ios',
        title: 'Install AIWEB Phone on iPhone',
        subheadline: 'Add it to your Home Screen first. Sign up opens in the installed app.',
        description:
          'AIWEB Phone is a web app. Install it from Safari, then launch it from your Home Screen — that first launch is where you get your AI number.',
        imageSrc: '/images/promo/aiweb-phone-ios.png',
        imageAlt: 'iPhone ready for AIWEB Phone as a Home Screen web app.',
        openInBrowserLabel: 'Open in Safari to install',
        steps: [
          'Tap Open in Safari to install (use Safari, not an in-app browser).',
          'Tap the Share button.',
          'Select Add to Home Screen.',
          'Enable Open as Web App if shown, then Add.',
          'Open AIWEB Phone from your Home Screen — signup is the first screen.',
        ],
        otherPlatform: {
          label: 'Android install guide',
          to: PHONE_ANDROID_PATH,
        },
      }}
    />
  );
}
