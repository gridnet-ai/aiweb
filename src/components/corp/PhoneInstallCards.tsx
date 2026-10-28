import { Link } from 'react-router-dom';
import { PHONE_ANDROID_PATH, PHONE_IOS_PATH } from '@/lib/corpSiteRoutes';
import {
  trackPhoneInstallEvent,
  type PhoneInstallPlatform,
} from '@/lib/phoneInstallAnalytics';

type PhoneInstallCard = {
  id: PhoneInstallPlatform;
  title: string;
  description: string;
  support: string;
  preview: string;
  imageSrc: string;
  imageAlt: string;
  to: string;
};

const CARDS: readonly PhoneInstallCard[] = [
  {
    id: 'ios',
    title: 'AIWEB Phone for iOS',
    description: 'Install on iPhone first. Sign up opens in the installed app.',
    support: 'Install from Safari. No App Store download required.',
    preview: 'Share → Add to Home Screen → Open app → Sign up',
    imageSrc: '/images/promo/aiweb-phone-ios.png',
    imageAlt: 'iPhone showing the home screen, ready for AIWEB Phone as a web app.',
    to: PHONE_IOS_PATH,
  },
  {
    id: 'android',
    title: 'AIWEB Phone for Android',
    description: 'Install on Android first. Sign up opens in the installed app.',
    support: 'Install directly from Chrome. No Play Store download required.',
    preview: 'Install app → Open from Home Screen → Sign up',
    imageSrc: '/images/promo/aiweb-phone-android.png',
    imageAlt: 'Android phone showing the home screen, ready for AIWEB Phone as a web app.',
    to: PHONE_ANDROID_PATH,
  },
] as const;

function onCardClick(platform: PhoneInstallPlatform) {
  trackPhoneInstallEvent({
    event: 'phone_install_card_click',
    platform,
  });
}

export function PhoneInstallCards() {
  return (
    <section
      id="install"
      className="lv2p-phone-install"
      aria-labelledby="lv2p-phone-install-heading"
    >
      <div className="lv2p-phone-install-inner">
        <header className="lv2p-phone-install-head">
          <h2 id="lv2p-phone-install-heading">Install AIWEB Phone</h2>
          <p>Choose your device. Same app, same AI number — install guide for your platform.</p>
        </header>
        <div className="lv2p-phone-install-grid">
          {CARDS.map((card) => (
            <Link
              key={card.id}
              className="lv2p-phone-install-card"
              to={card.to}
              data-platform={card.id}
              onClick={() => onCardClick(card.id)}
            >
              <img
                className="lv2p-phone-install-card-media"
                src={card.imageSrc}
                alt={card.imageAlt}
                width={269}
                height={202}
                loading="lazy"
                decoding="async"
              />
              <span className="lv2p-phone-install-card-body">
                <span className="lv2p-phone-install-card-title">{card.title}</span>
                <span className="lv2p-phone-install-card-desc">{card.description}</span>
                <span className="lv2p-phone-install-card-support">{card.support}</span>
                <span className="lv2p-phone-install-card-preview">{card.preview}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
