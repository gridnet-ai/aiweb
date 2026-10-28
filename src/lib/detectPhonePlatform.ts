import { HOME_PATH, PHONE_SITE_URL } from '@/lib/corpSiteRoutes';
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

/** Where Download should send the visitor for their device. */
export function phoneDownloadHref(
  platform: DetectedPhonePlatform,
  options?: { onHome?: boolean },
): string {
  if (platform === 'ios' || platform === 'android') return PHONE_SITE_URL;
  return options?.onHome ? '#install' : `${HOME_PATH}#install`;
}
