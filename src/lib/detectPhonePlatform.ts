import { PHONE_SITE_URL } from '@/lib/corpSiteRoutes';
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
  /** Always same-tab to the Phone host so install attaches to the right origin. */
  external: boolean;
  platform: DetectedPhonePlatform;
};

/**
 * Phone host URL where Chrome/Safari can install the real AIWEB Phone app.
 * Never point install at the company marketing site — that installs the wrong PWA.
 */
export function phoneInstallAppHref(platform: DetectedPhonePlatform): string {
  const url = new URL(PHONE_SITE_URL);
  url.searchParams.set('from', 'company_download');
  url.searchParams.set('platform', platform);
  url.searchParams.set('install', '1');
  url.searchParams.set('deferSignup', '1');
  return url.toString();
}

/** Download / install always opens the Phone host (correct install origin). */
export function phoneDownloadTarget(
  platform: DetectedPhonePlatform = detectPhonePlatform(),
): PhoneDownloadTarget {
  return {
    href: phoneInstallAppHref(platform),
    external: false,
    platform,
  };
}
