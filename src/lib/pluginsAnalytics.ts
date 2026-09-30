import type { ChatgptPlanId } from '@/lib/pluginsCtas';

export type PluginsAnalyticsEvent =
  | 'plugins_page_view'
  | 'platform_tab_selected'
  | 'chatgpt_plan_selected'
  | 'chatgpt_plugin_cta_clicked'
  | 'publisher_cta_clicked'
  | 'agency_cta_clicked'
  | 'portfolio_cta_clicked';

export type PluginsAnalyticsPayload = {
  event: PluginsAnalyticsEvent;
  platform?: string;
  chatgpt_plan?: ChatgptPlanId;
  cta?: string;
};

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: unknown[]) => void;
};

export function trackPluginsEvent(payload: PluginsAnalyticsPayload): void {
  const detail = {
    ...payload,
    surface: 'plugins',
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
      chatgpt_plan: payload.chatgpt_plan,
      cta: payload.cta,
    });
  }
}
