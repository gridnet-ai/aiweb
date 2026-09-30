import { PRODUCT_URLS, SITE_ORIGIN } from '@/lib/aiWebCompanyBrand';

function envUrl(key: string, fallback: string): string {
  const raw = (import.meta.env as Record<string, string | undefined>)[key];
  const next = typeof raw === 'string' ? raw.trim() : '';
  return next || fallback;
}

/**
 * CTA destinations for /plugins. Set VITE_AIWEB_CHATGPT_* when public
 * Plugin Directory listing URLs exist; until then ChatGPT CTAs open chatgpt.com.
 */
export const PLUGINS_CTAS = {
  chatgpt: {
    directory: envUrl('VITE_AIWEB_CHATGPT_DIRECTORY_URL', 'https://chatgpt.com/'),
    business: envUrl('VITE_AIWEB_CHATGPT_BUSINESS_URL', 'https://chatgpt.com/'),
    plus: envUrl('VITE_AIWEB_CHATGPT_PLUS_URL', 'https://chatgpt.com/'),
    free: envUrl('VITE_AIWEB_CHATGPT_FREE_URL', 'https://chatgpt.com/'),
  },
  publisher: envUrl('VITE_AIWEB_OS_URL', PRODUCT_URLS.aiWebOs),
  learnPublisher: envUrl('VITE_AIWEB_LEARN_OS_URL', `${SITE_ORIGIN}/`),
  talkToAiweb: envUrl('VITE_AIWEB_TALK_URL', SITE_ORIGIN),
} as const;

export type ChatgptPlanId = 'business' | 'plus' | 'free';

export function chatgptCtaForPlan(plan: ChatgptPlanId): string {
  if (plan === 'business') return PLUGINS_CTAS.chatgpt.business;
  if (plan === 'plus') return PLUGINS_CTAS.chatgpt.plus;
  return PLUGINS_CTAS.chatgpt.free;
}
