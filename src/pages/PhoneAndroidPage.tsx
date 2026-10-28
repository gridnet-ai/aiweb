import { PhonePlatformLanding } from '@/components/corp/PhonePlatformLanding';
import { useMarketingPageSeo } from '@/hooks/useScrollReveal';
import { PHONE_ANDROID_PATH, PHONE_IOS_PATH } from '@/lib/corpSiteRoutes';

export function PhoneAndroidPage() {
  useMarketingPageSeo({
    title: 'AIWEB Phone for Android — Install from Chrome',
    description:
      'Get an AI number that AI assistants can call. Install AIWEB Phone on Android from Chrome — $4.99/mo. Not a cellular carrier.',
    canonicalPath: PHONE_ANDROID_PATH,
    image: '/images/promo/aiweb-phone-android.png',
  });

  return (
    <PhonePlatformLanding
      content={{
        platform: 'android',
        title: 'AIWEB Phone for Android',
        subheadline: 'Your AI number, right on your Android phone.',
        description:
          'Get an AI number that AI assistants can call. Receive inquiries, manage conversations, and reply through AIWEB Mail.',
        imageSrc: '/images/promo/aiweb-phone-android.png',
        imageAlt: 'Android phone ready for AIWEB Phone as an installed web app.',
        steps: [
          'Get AIWEB Phone and complete subscription.',
          'Open phone.theaiwebcompany.com in Chrome.',
          'Select Install app from the browser prompt or menu when available.',
          'Confirm installation.',
          'Open AIWEB from the Home Screen or launcher.',
        ],
        otherPlatform: {
          label: 'iOS install guide',
          to: PHONE_IOS_PATH,
        },
      }}
    />
  );
}
