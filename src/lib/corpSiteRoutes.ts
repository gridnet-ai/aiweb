export const HOME_PATH = '/';
export const OS_PATH = '/os';
export const MAIL_PATH = '/mail';
/** Public mailbox setup. www.mail.theaiwebcompany.com should redirect here. */
export const MAIL_SITE_URL = 'https://mail.theaiwebcompany.com';
/** Consumer AIWEB Phone host — number issued after payment. */
export const PHONE_SITE_URL = 'https://phone.theaiwebcompany.com';
/** Company-site platform onboarding pages (marketing → Phone host). */
export const PHONE_IOS_PATH = '/phone/ios';
export const PHONE_ANDROID_PATH = '/phone/android';
/** @deprecated Use PHONE_IOS_PATH — company site hosts install guides. */
export const PHONE_IOS_INSTALL_URL = PHONE_IOS_PATH;
/** @deprecated Use PHONE_ANDROID_PATH — company site hosts install guides. */
export const PHONE_ANDROID_INSTALL_URL = PHONE_ANDROID_PATH;
/** Mail-armed Phone checkout (same Stripe price as Phone host). */
export const PHONE_CHECKOUT_URL =
  'https://mail.theaiwebcompany.com/?checkout=phone&from=company&interval=monthly';
export const PRICING_PATH = '/pricing';
export const PLUGINS_PATH = '/plugins';
export const PLUGIN_PATH = '/plugin';
export const GEEKDOM_PATH = '/geekdom';
export const ALBUM_PATH = '/album';
/** Former marketing home (CorpHero + mission / team / products). */
export const OVERVIEW_PATH = '/overview';
export const ABOUT_PATH = '/about';
export const TEAM_PATH = '/team';
export const NEWS_PATH = '/news';
export const PRESS_PATH = '/press';
export const INVESTORS_PATH = '/investors';
export const CAREERS_PATH = '/careers';
export const BLOG_PATH = '/blog';
export const TERMS_PATH = '/terms';
export const PRIVACY_PATH = '/privacy';
export const SUPPORT_PATH = '/support';

export const CORP_NAV_LINKS = [
  { label: 'About', to: ABOUT_PATH },
  { label: 'Team', to: TEAM_PATH },
  { label: 'News', to: NEWS_PATH },
  { label: 'Press', to: PRESS_PATH },
  { label: 'Investors', to: INVESTORS_PATH },
  { label: 'Careers', to: CAREERS_PATH },
  { label: 'Blog', to: BLOG_PATH },
] as const;

export function newsPostPath(slug: string): string {
  return `${NEWS_PATH}/${slug}`;
}

export function blogPostPath(slug: string): string {
  return `${BLOG_PATH}/${slug}`;
}
