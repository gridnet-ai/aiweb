import { PRODUCT_URLS } from '@/lib/aiWebCompanyBrand';
import { MAIL_SITE_URL, PHONE_CHECKOUT_URL } from '@/lib/corpSiteRoutes';
import type { CheckoutPlanId } from '@/lib/pricingPlans';

function aiwebOsOrigin(): string {
  const fromEnv =
    (import.meta.env.VITE_AIWEB_OS_ORIGIN as string | undefined)?.trim() ||
    (import.meta.env.VITE_PUBLISHER_ORIGIN as string | undefined)?.trim();
  return (fromEnv || PRODUCT_URLS.aiWebOs).replace(/\/$/, '');
}

export type BillingInterval = 'monthly' | 'annual';

/** Mail-hosted public offers. Monthly only. The mail host owns Launch and Stripe. */
const MAIL_CHECKOUT_PLANS = ['phone', 'business_500', 'seller'] as const;
type MailCheckoutPlanId = (typeof MAIL_CHECKOUT_PLANS)[number];

function isMailCheckoutPlan(planId: CheckoutPlanId): planId is MailCheckoutPlanId {
  return (MAIL_CHECKOUT_PLANS as readonly string[]).includes(planId);
}

function mailCheckoutUrl(planId: MailCheckoutPlanId): string {
  if (planId === 'phone') return PHONE_CHECKOUT_URL;
  const url = new URL(MAIL_SITE_URL);
  url.searchParams.set('checkout', planId);
  url.searchParams.set('from', 'company');
  url.searchParams.set('interval', 'monthly');
  return url.toString();
}

/** AIWEB Phone — Mail-armed checkout (price_1UUCOd… / aiweb_phone_monthly). */
export function phoneCheckoutUrl(): string {
  return PHONE_CHECKOUT_URL;
}

/** Plus, Business, Agency, and Agency Pro stay on AIWEB OS. */
export function publisherCheckoutUrl(
  planId: Exclude<CheckoutPlanId, MailCheckoutPlanId>,
  interval: BillingInterval = 'monthly',
): string {
  const url = new URL('/publisher', `${aiwebOsOrigin()}/`);
  url.searchParams.set('checkout', planId);
  url.searchParams.set('from', 'company');
  url.searchParams.set('interval', interval);
  return url.toString();
}

/** Hidden $19.99 Seller offer. Monthly only. */
export function sellerCheckoutUrl(): string {
  return mailCheckoutUrl('seller');
}

/** Starting public offer. Monthly only. */
export function businessCheckoutUrl(): string {
  return mailCheckoutUrl('business_500');
}

export async function startCheckout(
  planId: CheckoutPlanId,
  interval: BillingInterval = 'monthly',
): Promise<void> {
  if (isMailCheckoutPlan(planId)) {
    window.location.assign(mailCheckoutUrl(planId));
    return;
  }
  window.location.assign(publisherCheckoutUrl(planId, interval));
}
