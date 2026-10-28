export type PhoneInstallPlatform = 'ios' | 'android';

export type PhoneInstallAnalyticsEvent =
  | 'phone_install_card_click'
  | 'phone_install_guide_view'
  | 'phone_install_open_app'
  | 'phone_install_download_click';

export type PhoneInstallAnalyticsPayload = {
  event: PhoneInstallAnalyticsEvent;
  platform: PhoneInstallPlatform | 'other';
};

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: unknown[]) => void;
};

export function trackPhoneInstallEvent(payload: PhoneInstallAnalyticsPayload): void {
  const detail = {
    ...payload,
    surface: 'phone_install',
    ts: Date.now(),
  };
  if (typeof window === 'undefined') return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(detail);
  w.dispatchEvent(new CustomEvent('aiweb:analytics', { detail }));
  if (typeof w.gtag === 'function') {
    w.gtag('event', payload.event, {
      platform: payload.platform,
    });
  }
}
