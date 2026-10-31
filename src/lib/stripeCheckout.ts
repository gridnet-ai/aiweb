import { PRODUCT_URLS } from '@/lib/aiWebCompanyBrand';
import {
  PHONE_CHECKOUT_URL,
  PHONE_SITE_URL,
  SELLER_CHECKOUT_URL,
} from '@/lib/corpSiteRoutes';
import type { CheckoutPlanId } from '@/lib/pricingPlans';

function aiwebOsOrigin(): string {
  const fromEnv =
    (import.meta.env.VITE_AIWEB_OS_ORIGIN as string | undefined)?.trim() ||
    (import.meta.env.VITE_PUBLISHER_ORIGIN as string | undefined)?.trim();
  return (fromEnv || PRODUCT_URLS.aiWebOs).replace(/\/$/, '');
}

export type BillingInterval = 'monthly' | 'annual';

/** Phone-hosted public offers. Monthly only. Phone owns Launch and Stripe. */
const PHONE_CHECKOUT_PLANS = ['phone', 'business_500', 'seller'] as const;
type PhoneCheckoutPlanId = (typeof PHONE_CHECKOUT_PLANS)[number];

function isPhoneCheckoutPlan(planId: CheckoutPlanId): planId is PhoneCheckoutPlanId {
  return (PHONE_CHECKOUT_PLANS as readonly string[]).includes(planId);
}

function phoneHostedCheckoutUrl(planId: PhoneCheckoutPlanId): string {
  if (planId === 'phone') return PHONE_CHECKOUT_URL;
  if (planId === 'seller') return SELLER_CHECKOUT_URL;
  const url = new URL(PHONE_SITE_URL);
  url.searchParams.set('checkout', planId);
  url.searchParams.set('from', 'company');
  url.searchParams.set('interval', 'monthly');
  return url.toString();
}

/** AIWEB Phone — Phone-host checkout (price_1UUCOd… / aiweb_phone_monthly). */
export function phoneCheckoutUrl(): string {
  return PHONE_CHECKOUT_URL;
}

/** Plus, Business, Agency, and Agency Pro stay on AIWEB OS. */
export function publisherCheckoutUrl(
  planId: Exclude<CheckoutPlanId, PhoneCheckoutPlanId>,
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
  return SELLER_CHECKOUT_URL;
}

/** Starting public offer. Monthly only. */
export function businessCheckoutUrl(): string {
  return phoneHostedCheckoutUrl('business_500');
}

export async function startCheckout(
  planId: CheckoutPlanId,
  interval: BillingInterval = 'monthly',
): Promise<void> {
  if (isPhoneCheckoutPlan(planId)) {
    window.location.assign(phoneHostedCheckoutUrl(planId));
    return;
  }
  window.location.assign(publisherCheckoutUrl(planId, interval));
}
