import { PRODUCT_URLS } from '@/lib/aiWebCompanyBrand';
import type { CheckoutPlanId } from '@/lib/pricingPlans';

function aiwebOsOrigin(): string {
  const fromEnv =
    (import.meta.env.VITE_AIWEB_OS_ORIGIN as string | undefined)?.trim() ||
    (import.meta.env.VITE_PUBLISHER_ORIGIN as string | undefined)?.trim();
  return (fromEnv || PRODUCT_URLS.aiWebOs).replace(/\/$/, '');
}

/** Sign-in happens on AIWEB OS, then Stripe Checkout — one billing pipeline. */
export function publisherCheckoutUrl(planId: CheckoutPlanId): string {
  const url = new URL('/publisher', `${aiwebOsOrigin()}/`);
  url.searchParams.set('checkout', planId);
  url.searchParams.set('from', 'company');
  return url.toString();
}

export async function startCheckout(planId: CheckoutPlanId): Promise<void> {
  window.location.assign(publisherCheckoutUrl(planId));
}
