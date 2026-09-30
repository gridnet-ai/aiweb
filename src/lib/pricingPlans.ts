export type PricingPlanId = 'plus' | 'business' | 'agency' | 'agency_pro' | 'enterprise';

export type PricingPlan = {
  id: PricingPlanId;
  name: string;
  /** Monthly price in USD cents; null = custom / sales-led */
  amountCents: number | null;
};

/** Catalog — one Stripe Product per plan (not multiple tiers on one product). */
export const PRICING_PLANS: PricingPlan[] = [
  { id: 'plus', name: 'Plus', amountCents: 1999 },
  { id: 'business', name: 'Business', amountCents: 4900 },
  { id: 'agency', name: 'Agency', amountCents: 49900 },
  { id: 'agency_pro', name: 'Agency Pro', amountCents: 149900 },
  { id: 'enterprise', name: 'Enterprise', amountCents: null },
];

export const CHECKOUT_PLAN_IDS = ['plus', 'business', 'agency', 'agency_pro'] as const;
export type CheckoutPlanId = (typeof CHECKOUT_PLAN_IDS)[number];

export function isCheckoutPlanId(id: string): id is CheckoutPlanId {
  return (CHECKOUT_PLAN_IDS as readonly string[]).includes(id);
}
