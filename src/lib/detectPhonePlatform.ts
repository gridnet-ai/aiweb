import {
  HOME_PATH,
  PHONE_ANDROID_PATH,
  PHONE_IOS_PATH,
  PHONE_SITE_URL,
} from '@/lib/corpSiteRoutes';
import type { PhoneInstallPlatform } from '@/lib/phoneInstallAnalytics';

export type DetectedPhonePlatform = PhoneInstallPlatform | 'other';

/** Best-effort client OS detect for Phone install routing. */
export function detectPhonePlatform(
  ua = typeof navigator !== 'undefined' ? navigator.userAgent : '',
): DetectedPhonePlatform {
  if (!ua) return 'other';
  // iPadOS 13+ can report as MacIntel with touch.
  const iPadOsDesktopUa =
    typeof navigator !== 'undefined' &&
    navigator.platform === 'MacIntel' &&
    navigator.maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/i.test(ua) || iPadOsDesktopUa) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return 'other';
}

export type PhoneDownloadTarget = {
  href: string;
  /** External URL — open in a new tab. */
  external: boolean;
  platform: DetectedPhonePlatform;
};

/**
 * Open the Phone host so the browser can offer Add to Home Screen / Install.
 * Signup should happen only after launch from the installed app (phone host).
 */
export function phoneInstallAppHref(platform: DetectedPhonePlatform): string {
  const url = new URL(PHONE_SITE_URL);
  url.searchParams.set('from', 'company_download');
  url.searchParams.set('platform', platform);
  // Hint for Phone host: show install surface, defer signup until standalone.
  url.searchParams.set('install', '1');
  url.searchParams.set('deferSignup', '1');
  return url.toString();
}

/**
 * Download → OS-specific install guide on this site (never jumps straight to signup).
 * Desktop → #install chooser so they pick a phone platform.
 */
export function phoneDownloadTarget(
  platform: DetectedPhonePlatform = detectPhonePlatform(),
): PhoneDownloadTarget {
  if (platform === 'ios') {
    return { href: PHONE_IOS_PATH, external: false, platform };
  }
  if (platform === 'android') {
    return { href: PHONE_ANDROID_PATH, external: false, platform };
  }
  return { href: `${HOME_PATH}#install`, external: false, platform };
}
