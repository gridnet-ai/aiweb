export type PricingPlanId = 'plus' | 'business' | 'agency' | 'agency_pro' | 'enterprise';

export type PricingPlan = {
  id: PricingPlanId;
  name: string;
  /** Monthly price in USD cents; null = custom / sales-led */
  amountCents: number | null;
  /** Annual price in USD cents. Live Stripe prices, about 20% off monthly. */
  annualCents: number | null;
};

/**
 * Same AI Web Company Stripe catalog OS uses
 * (plus / business / agency / agency_pro).
 */
export const PRICING_PLANS: PricingPlan[] = [
  { id: 'plus', name: 'Plus', amountCents: 1999, annualCents: 19190 },
  { id: 'business', name: 'Business', amountCents: 4900, annualCents: 47000 },
  { id: 'agency', name: 'Agency', amountCents: 49900, annualCents: 479000 },
  { id: 'agency_pro', name: 'Agency Pro', amountCents: 149900, annualCents: 1439000 },
  { id: 'enterprise', name: 'Enterprise', amountCents: null, annualCents: null },
];

export const CHECKOUT_PLAN_IDS = ['plus', 'business', 'agency', 'agency_pro'] as const;
export type CheckoutPlanId = (typeof CHECKOUT_PLAN_IDS)[number];

export function isCheckoutPlanId(id: string): id is CheckoutPlanId {
  return (CHECKOUT_PLAN_IDS as readonly string[]).includes(id);
}
