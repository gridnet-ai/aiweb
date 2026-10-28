import { PhonePlatformLanding } from '@/components/corp/PhonePlatformLanding';
import { useMarketingPageSeo } from '@/hooks/useScrollReveal';
import { PHONE_ANDROID_PATH, PHONE_IOS_PATH } from '@/lib/corpSiteRoutes';

export function PhoneIosPage() {
  useMarketingPageSeo({
    title: 'AIWEB Phone for iOS — Install from Safari',
    description:
      'Get an AI number that AI assistants can call. Install AIWEB Phone on iPhone from Safari — $4.99/mo. Not a cellular carrier.',
    canonicalPath: PHONE_IOS_PATH,
    image: '/images/promo/aiweb-phone-ios.png',
  });

  return (
    <PhonePlatformLanding
      content={{
        platform: 'ios',
        title: 'AIWEB Phone for iOS',
        subheadline: 'Your AI number, right on your iPhone.',
        description:
          'Get an AI number that AI assistants can call. Receive inquiries, manage conversations, and reply through AIWEB Mail.',
        imageSrc: '/images/promo/aiweb-phone-ios.png',
        imageAlt: 'iPhone ready for AIWEB Phone as a Home Screen web app.',
        steps: [
          'Get AIWEB Phone and complete subscription.',
          'Open phone.theaiwebcompany.com in Safari.',
          'Tap Share.',
          'Select Add to Home Screen.',
          'Enable Open as Web App if presented.',
          'Add and launch AIWEB from the Home Screen.',
        ],
        otherPlatform: {
          label: 'Android install guide',
          to: PHONE_ANDROID_PATH,
        },
      }}
    />
  );
}
