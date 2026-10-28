import { useEffect, useState } from 'react';
import {
  isCheckoutPlanId,
  PRICING_PLANS,
  type CheckoutPlanId,
  type PricingPlanId,
} from '@/lib/pricingPlans';
import { startCheckout, type BillingInterval } from '@/lib/stripeCheckout';

type Cell = string | 'check' | 'dash';

const FEATURE_ROWS: { label: string; values: Record<PricingPlanId, Cell> }[] = [
  {
    label: 'Price',
    values: {
      phone: '$4.99',
      business_500: '$500',
      seller: '$19.99',
      plus: '$19.99',
      business: '$49',
      agency: 'from $499',
      agency_pro: '$1,499',
      enterprise: 'Custom',
    },
  },
  {
    label: 'AI work hour ( aiWh )',
    values: {
      phone: '—',
      business_500: '—',
      seller: '—',
      plus: '500',
      business: '1,000',
      agency: '8,000',
      agency_pro: 'Dedicated',
      enterprise: 'Custom',
    },
  },
  {
    label: 'Pages',
    values: {
      phone: '1',
      business_500: 'Unlimited',
      seller: 'Unlimited',
      plus: 'Unlimited',
      business: 'Unlimited',
      agency: 'Unlimited',
      agency_pro: 'Unlimited',
      enterprise: 'Unlimited',
    },
  },
  {
    label: 'Projects',
    values: {
      phone: '—',
      business_500: 'Unlimited',
      seller: 'Unlimited',
      plus: 'Unlimited',
      business: 'Unlimited',
      agency: 'Unlimited',
      agency_pro: 'Unlimited',
      enterprise: 'Unlimited',
    },
  },
  {
    label: 'AIWEB OS Agent',
    values: {
      phone: 'dash',
      business_500: 'dash',
      seller: 'dash',
      plus: 'check',
      business: 'check',
      agency: 'check',
      agency_pro: 'check',
      enterprise: 'check',
    },
  },
  {
    label: 'AI Check',
    values: {
      phone: 'dash',
      business_500: 'dash',
      seller: 'dash',
      plus: 'check',
      business: 'check',
      agency: 'check',
      agency_pro: 'check',
      enterprise: 'check',
    },
  },
  {
    label: 'Get Quote / AIWEB Actions',
    values: {
      phone: 'dash',
      business_500: 'dash',
      seller: 'dash',
      plus: 'check',
      business: 'check',
      agency: 'check',
      agency_pro: 'check',
      enterprise: 'check',
    },
  },
  {
    label: 'Project organization',
    values: {
      phone: 'dash',
      business_500: 'dash',
      seller: 'dash',
      plus: 'Basic',
      business: 'Basic',
      agency: 'check',
      agency_pro: 'check',
      enterprise: 'check',
    },
  },
  {
    label: 'Client reporting',
    values: {
      phone: 'dash',
      business_500: 'dash',
      seller: 'dash',
      plus: 'dash',
      business: 'dash',
      agency: 'check',
      agency_pro: 'check',
      enterprise: 'check',
    },
  },
  {
    label: 'Team permissions',
    values: {
      phone: 'dash',
      business_500: 'dash',
      seller: 'dash',
      plus: 'dash',
      business: 'dash',
      agency: 'Basic',
      agency_pro: 'Advanced',
      enterprise: 'Custom',
    },
  },
  {
    label: 'API / integrations',
    values: {
      phone: 'dash',
      business_500: 'dash',
      seller: 'dash',
      plus: 'dash',
      business: 'dash',
      agency: 'dash',
      agency_pro: 'check',
      enterprise: 'check',
    },
  },
];

const CTA_CLASS =
  'inline-flex w-full items-center justify-center border border-marketing-ink px-3 py-2.5 text-[13px] font-bold tracking-[-0.01em] transition disabled:cursor-wait disabled:opacity-50 sm:w-auto sm:min-w-[7.5rem] sm:py-2 sm:text-[12px]';

function CellValue({ value }: { value: Cell }) {
  if (value === 'check') {
    return (
      <span className="text-[15px] font-semibold text-marketing-ink" aria-label="Included">
        ✓
      </span>
    );
  }
  if (value === 'dash') {
    return (
      <span className="text-marketing-muted2" aria-label="Not included">
        —
      </span>
    );
  }
  return <span className="text-[13px] font-semibold text-marketing-ink sm:text-[14px]">{value}</span>;
}

const PHONE_FEATURES = [
  'AI Number (AI-###-###-###-###)',
  'Unlimited Calls',
  'Unlimited AIWEB Page',
  'Unlimited Mailbox',
  'Unlimited AIWEB Cloud',
] as const;

const PHONE_COMPATIBLE = [
  { id: 'chatgpt', label: 'Chat GPT', src: '/images/promo/chatgpt-mark.png' },
  { id: 'claude', label: 'Claude', src: '/images/promo/claude-mark.png' },
  { id: 'gemini', label: 'Gemini', src: '/images/promo/gemini-mark.png' },
  { id: 'grok', label: 'Grok', src: '/images/demo/workers/grok.png' },
  { id: 'muse', label: 'Muse', src: '/images/promo/muse-mark.png' },
  { id: 'web', label: 'Internet', src: '/images/promo/web-mark.svg' },
] as const;

const SELLER_FEATURES = [
  'Instant publish to Chat GPT',
  'Unlimited AIWEB pages',
  'Unlimited Calling Cards',
  'Direct messaging',
  'Basic analytics',
] as const;

const BUSINESS_FEATURES = [
  'Everything in Seller',
  'Verified business',
  'Rich product and service catalog',
  'Get Quote and AIWEB Actions',
  'Multiple inbox users',
  'Message routing',
  'Files and media',
  'Business analytics',
  'Priority support',
] as const;

const AGENCY_FEATURES = [
  'Multiple businesses or brands',
  'Bulk publishing',
  'Shared administration',
  'Team permissions',
  'Client reporting',
  'API and integrations',
  'Centralized billing',
] as const;

const SALES_MAILTO = 'mailto:sales@theaiwebcompany.com';

const OFFER_CARDS = {
  phone: {
    price: '$4.99',
    lede: 'Your number on the AIWEB.',
    features: PHONE_FEATURES,
    compatible: PHONE_COMPATIBLE,
    cta: 'Get AIWEB Phone',
    sales: false,
  },
  business_500: {
    price: '$500',
    lede: 'For businesses ready for more calls.',
    features: SELLER_FEATURES,
    cta: 'Start selling through AIWEB',
    sales: false,
  },
  seller: {
    price: '$19.99',
    lede: 'For the entrepreneur.',
    features: SELLER_FEATURES,
    cta: 'Start selling through AIWEB',
    sales: false,
  },
  plus: {
    price: '$19.99',
    lede: 'For the entrepreneur.',
    features: SELLER_FEATURES,
    cta: 'Start selling through AIWEB',
    sales: false,
  },
  business: {
    price: '$49',
    lede: 'Designed for operating businesses.',
    features: BUSINESS_FEATURES,
    cta: 'Connect with ChatGPT users',
    sales: false,
  },
  agency: {
    price: 'from $499',
    lede: 'Designed for agencies, associations, publishers and multi-brand operators.',
    features: AGENCY_FEATURES,
    cta: 'Contact sales',
    sales: true,
  },
} as const;

const VISIBLE_PLANS = PRICING_PLANS.filter(
  (plan) =>
    plan.id !== 'agency_pro' &&
    plan.id !== 'seller' &&
    plan.id !== 'business_500' &&
    plan.id !== 'phone',
);

const BEST_PLAN_ID: PricingPlanId = 'business';

function formatUsd(cents: number): string {
  const dollars = cents / 100;
  return dollars.toLocaleString('en-US', {
    minimumFractionDigits: Number.isInteger(dollars) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

function displayPrice(planId: PricingPlanId, billing: BillingInterval): { amount: string; period: string } {
  const plan = PRICING_PLANS.find((item) => item.id === planId);
  if (!plan || plan.amountCents == null) return { amount: 'Custom', period: '' };
  const prefix = planId === 'agency' ? 'from ' : '';
  const cents = billing === 'annual' ? (plan.annualCents ?? plan.amountCents * 10) : plan.amountCents;
  return {
    amount: `${prefix}$${formatUsd(cents)}`,
    period: billing === 'annual' ? '/year' : '/month',
  };
}

const PLAN_TITLES: Record<PricingPlanId, string> = {
  phone: 'Phone',
  business_500: 'Business',
  seller: 'Seller',
  plus: 'Seller',
  business: 'Pro',
  agency: 'Business',
  agency_pro: 'Agency Pro',
  enterprise: 'Enterprise',
};

function PlanBrand({
  name,
  headingId,
  stacked = false,
}: {
  name: string;
  headingId?: string;
  stacked?: boolean;
}) {
  const label = (
    <>
      <img src="/images/promo/aiweb-nav-logo-black.png" alt="" className="seller-plan-logo" />
      <span>{name}</span>
    </>
  );
  const className = `${stacked ? 'flex flex-col items-center' : 'inline-flex items-center'} min-w-0 justify-center gap-1.5 font-display text-[1.05rem] font-extrabold leading-none tracking-[-0.02em] text-marketing-ink`;
  if (headingId) {
    return (
      <h3 id={headingId} className={className} aria-label={`aiweb ${name}`}>
        {label}
      </h3>
    );
  }
  return (
    <span className={`${className} justify-center`} aria-label={`aiweb ${name}`}>
      {label}
    </span>
  );
}

function PlanPrice({ amount, period }: { amount: string; period: string }) {
  return (
    <p className="text-right text-[0.95rem] font-extrabold leading-none tracking-[-0.02em] text-marketing-ink">
      {amount}
      {period ? (
        <span className="mt-0.5 block text-[11px] font-semibold text-marketing-muted2">{period}</span>
      ) : null}
    </p>
  );
}

function PlanCta({
  planId,
  busy,
  onSelect,
  label,
  sales = false,
}: {
  planId: PricingPlanId;
  busy: CheckoutPlanId | null;
  onSelect: (id: CheckoutPlanId) => void;
  label?: string;
  sales?: boolean;
}) {
  if (planId === 'enterprise' || sales) {
    return (
      <a
        href={SALES_MAILTO}
        className={`${CTA_CLASS} bg-white text-marketing-ink hover:bg-marketing-ink hover:text-white`}
      >
        {label ?? 'Contact sales'}
      </a>
    );
  }
  if (!isCheckoutPlanId(planId)) return null;
  const phoneCta = planId === 'phone';
  return (
    <button
      type="button"
      disabled={busy !== null}
      onClick={() => onSelect(planId)}
      data-checkout={planId}
      className={
        phoneCta
          ? `${CTA_CLASS} seller-plan-cta--phone`
          : `${CTA_CLASS} bg-white text-marketing-ink hover:bg-marketing-ink hover:text-white`
      }
    >
      {busy === planId ? 'Redirecting…' : label ?? (planId === 'plus' ? 'Get Plus' : 'Subscribe')}
    </button>
  );
}

/**
 * Comparison pricing — stacked plans on mobile, matrix table from md up.
 */
export function PublisherPricingTable({
  showHeading = true,
  planIds,
}: {
  showHeading?: boolean;
  planIds?: PricingPlanId[];
} = {}) {
  const [busy, setBusy] = useState<CheckoutPlanId | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [billing, setBilling] = useState<BillingInterval>('monthly');

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, '');
    const id = raw.startsWith('plan-') ? raw.slice(5) : raw;
    if (!id) return;
    const nodes = document.querySelectorAll<HTMLElement>(`[data-plan-id="${id}"]`);
    const visible = [...nodes].find((n) => n.getClientRects().length > 0) ?? nodes[0];
    visible?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const plans = (planIds ?? VISIBLE_PLANS.map((plan) => plan.id))
    .map((id) => PRICING_PLANS.find((plan) => plan.id === id))
    .filter((plan): plan is (typeof PRICING_PLANS)[number] => Boolean(plan));
  const singleOffer = plans.length === 1;
  const offerOnly = plans.every((plan) => plan.id in OFFER_CARDS);

  const onSelect = async (planId: CheckoutPlanId) => {
    setError(null);
    setBusy(planId);
    try {
      await startCheckout(
        planId,
        planId === 'phone' || planId === 'seller' || planId === 'business_500' ? 'monthly' : billing,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed. Try again.');
      setBusy(null);
    }
  };

  return (
    <div className={showHeading ? 'mt-16' : ''} id="pricing">
      {showHeading ? (
        <>
          <h2 className="text-center font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-marketing-ink">
            Pricing
          </h2>
          <p className="mx-auto mt-3 max-w-[36rem] px-1 text-center text-[15px] font-semibold leading-snug text-marketing-ink sm:text-[16px] md:text-[17px]">
            Publish and sell inside ChatGPT — pick the plan that fits your team.
          </p>
        </>
      ) : null}

      {singleOffer || offerOnly ? null : (
        <div className="billing-toggle">
          <div className="billing-toggle-track" role="group" aria-label="Billing period">
            <button
              type="button"
              aria-pressed={billing === 'monthly'}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={billing === 'annual'}
              onClick={() => setBilling('annual')}
            >
              Annual
              <span className="billing-toggle-save">−20%</span>
            </button>
          </div>
        </div>
      )}

      {/* Offer cards: single centered, or a responsive grid when every plan has a card. */}
      <div
        className={
          singleOffer
            ? 'mx-auto mt-3 max-w-[28rem]'
            : offerOnly
              ? 'mt-3 grid gap-3 sm:grid-cols-2'
              : 'mt-3 grid gap-3 sm:grid-cols-2 md:hidden'
        }
      >
        {plans.map((plan) => {
          const priced = displayPrice(plan.id, billing);
          const offer = plan.id in OFFER_CARDS ? OFFER_CARDS[plan.id as keyof typeof OFFER_CARDS] : null;
          if (offer) {
            return (
              <section
                key={plan.id}
                id={plan.id === 'phone' ? 'phone' : undefined}
                data-plan-id={plan.id}
                className={`seller-plan scroll-mt-24${plan.id === BEST_PLAN_ID ? ' seller-plan--best' : ''}${plan.id === 'phone' ? ' seller-plan--phone' : ''}`}
                aria-labelledby={`plan-${plan.id}-name`}
              >
                {plan.id === BEST_PLAN_ID ? <p className="seller-plan-best">Best choice</p> : null}
                <div className="flex items-center justify-between gap-2">
                  <img src="/images/promo/aiweb-nav-logo-black.png" alt="" className="seller-plan-logo" />
                  <div className="flex flex-col items-end gap-1">
                    <h3
                      id={`plan-${plan.id}-name`}
                      className="font-display text-[1.05rem] font-extrabold leading-none tracking-[-0.02em] text-marketing-ink"
                      aria-label={`aiweb ${PLAN_TITLES[plan.id]}`}
                    >
                      <span>{PLAN_TITLES[plan.id]}</span>
                    </h3>
                    <PlanPrice amount={priced.amount} period={priced.period} />
                  </div>
                </div>
                <p className="mt-1.5 text-[12px] font-medium leading-snug text-marketing-muted">{offer.lede}</p>
                <ul className="seller-feature-grid">
                  {offer.features.map((feature) => (
                    <li key={feature} className="seller-feature-card">
                      {feature}
                    </li>
                  ))}
                  {'compatible' in offer && offer.compatible ? (
                    <li className="seller-feature-card seller-feature-card--compatible">
                      <span className="seller-feature-compatible-label">Compatible</span>
                      <ul className="seller-feature-compatible-row" aria-label="Compatible AI assistants">
                        {offer.compatible.map((assistant) => (
                          <li key={assistant.id}>
                            <img src={assistant.src} alt={assistant.label} title={assistant.label} />
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : null}
                </ul>
                <div className="mt-2.5">
                  <PlanCta
                    planId={plan.id}
                    busy={busy}
                    onSelect={(id) => void onSelect(id)}
                    label={offer.cta}
                    sales={offer.sales}
                  />
                </div>
              </section>
            );
          }
          return (
            <section
              key={plan.id}
              data-plan-id={plan.id}
              className="seller-plan scroll-mt-24"
              aria-labelledby={`plan-${plan.id}-name`}
            >
              <div className="flex items-center justify-between gap-2">
                <img src="/images/promo/aiweb-nav-logo-black.png" alt="" className="seller-plan-logo" />
                <div className="flex flex-col items-end gap-1">
                  <h3
                    id={`plan-${plan.id}-name`}
                    className="font-display text-[1.05rem] font-extrabold leading-none tracking-[-0.02em] text-marketing-ink"
                    aria-label={`aiweb ${PLAN_TITLES[plan.id]}`}
                  >
                    <span>{PLAN_TITLES[plan.id]}</span>
                  </h3>
                  <PlanPrice amount={priced.amount} period={priced.period} />
                </div>
              </div>
              <div className="mt-2.5">
                <PlanCta planId={plan.id} busy={busy} onSelect={(id) => void onSelect(id)} />
              </div>
            </section>
          );
        })}
      </div>

      {/* Desktop: comparison matrix (skipped when every plan is an offer card). */}
      {singleOffer || offerOnly ? null : (
      <div className="mt-10 hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#d8d5cf]">
              <th className="py-3 pr-4 text-[12px] font-bold uppercase tracking-[0.12em] text-marketing-muted2">
                <span className="sr-only">Feature</span>
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  data-plan-id={plan.id}
                  className="scroll-mt-24 px-2 py-3 text-center font-display text-[15px] font-extrabold tracking-[-0.02em] text-marketing-ink lg:text-[17px]"
                >
                  <div className="flex flex-col items-center">
                    <PlanBrand name={PLAN_TITLES[plan.id]} stacked />
                    {plan.id === BEST_PLAN_ID ? (
                      <span className="mt-1 block text-[11px] font-semibold normal-case tracking-normal text-[#0071e3]">
                        Best choice
                      </span>
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FEATURE_ROWS.map((row) => (
              <tr key={row.label} className="border-b border-[#d8d5cf]">
                <th
                  scope="row"
                  className="py-3.5 pr-4 text-[13px] font-semibold text-marketing-ink lg:text-[14px]"
                >
                  {row.label}
                </th>
                {plans.map((plan) => (
                  <td key={plan.id} className="px-2 py-3.5 text-center align-middle">
                    <CellValue
                      value={
                        row.label === 'Price'
                          ? `${displayPrice(plan.id, billing).amount}${displayPrice(plan.id, billing).period}`
                          : row.values[plan.id]
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row" className="py-5 pr-4">
                <span className="sr-only">Get started</span>
              </th>
              {plans.map((plan) => (
                <td key={plan.id} className="px-2 py-5 text-center align-middle">
                  <PlanCta
                    planId={plan.id}
                    busy={busy}
                    onSelect={(id) => void onSelect(id)}
                    sales={plan.id === 'agency'}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      )}

      {error ? (
        <p className="mt-4 text-center text-[13px] font-semibold text-marketing-crimson" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
