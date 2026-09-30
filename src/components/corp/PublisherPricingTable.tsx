import { useEffect, useState } from 'react';
import { PRICING_PLANS, type CheckoutPlanId, type PricingPlanId } from '@/lib/pricingPlans';
import { startCheckout } from '@/lib/stripeCheckout';

type Cell = string | 'check' | 'dash';

const FEATURE_ROWS: { label: string; values: Record<PricingPlanId, Cell> }[] = [
  {
    label: 'Price',
    values: {
      plus: '$19.99',
      business: '$49',
      agency: '$499',
      agency_pro: '$1,499',
      enterprise: 'Custom',
    },
  },
  {
    label: 'AI work hour ( aiWh )',
    values: {
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
      plus: 'Unlimited',
      business: 'Unlimited',
      agency: 'Unlimited',
      agency_pro: 'Unlimited',
      enterprise: 'Unlimited',
    },
  },
  {
    label: 'AIWEB OS Agent',
    values: { plus: 'check', business: 'check', agency: 'check', agency_pro: 'check', enterprise: 'check' },
  },
  {
    label: 'AI Check',
    values: { plus: 'check', business: 'check', agency: 'check', agency_pro: 'check', enterprise: 'check' },
  },
  {
    label: 'Get Quote / AIWEB Actions',
    values: { plus: 'check', business: 'check', agency: 'check', agency_pro: 'check', enterprise: 'check' },
  },
  {
    label: 'Project organization',
    values: { plus: 'Basic', business: 'Basic', agency: 'check', agency_pro: 'check', enterprise: 'check' },
  },
  {
    label: 'Client reporting',
    values: { plus: 'dash', business: 'dash', agency: 'check', agency_pro: 'check', enterprise: 'check' },
  },
  {
    label: 'Team permissions',
    values: { plus: 'dash', business: 'dash', agency: 'Basic', agency_pro: 'Advanced', enterprise: 'Custom' },
  },
  {
    label: 'API / integrations',
    values: { plus: 'dash', business: 'dash', agency: 'dash', agency_pro: 'check', enterprise: 'check' },
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

function PlanCta({
  planId,
  busy,
  onSelect,
}: {
  planId: PricingPlanId;
  busy: CheckoutPlanId | null;
  onSelect: (id: CheckoutPlanId) => void;
}) {
  if (planId === 'enterprise') {
    return (
      <a
        href="mailto:sales@theaiwebcompany.com"
        className={`${CTA_CLASS} bg-marketing-ink text-white hover:bg-black`}
      >
        Contact sales
      </a>
    );
  }
  return (
    <button
      type="button"
      disabled={busy !== null}
      onClick={() => onSelect(planId)}
      className={`${CTA_CLASS} bg-white text-marketing-ink hover:bg-marketing-ink hover:text-white`}
    >
      {busy === planId ? 'Redirecting…' : planId === 'plus' ? 'Get Plus' : 'Subscribe'}
    </button>
  );
}

/**
 * Comparison pricing — stacked plans on mobile, matrix table from md up.
 */
export function PublisherPricingTable({ showHeading = true }: { showHeading?: boolean } = {}) {
  const [busy, setBusy] = useState<CheckoutPlanId | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, '');
    const id = raw.startsWith('plan-') ? raw.slice(5) : raw;
    if (!id) return;
    const nodes = document.querySelectorAll<HTMLElement>(`[data-plan-id="${id}"]`);
    const visible = [...nodes].find((n) => n.getClientRects().length > 0) ?? nodes[0];
    visible?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const onSelect = async (planId: CheckoutPlanId) => {
    setError(null);
    setBusy(planId);
    try {
      await startCheckout(planId);
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

      {/* Mobile: one plan per block */}
      <div className="mt-8 space-y-8 md:hidden">
        {PRICING_PLANS.map((plan) => {
          const price = FEATURE_ROWS[0].values[plan.id];
          return (
            <section
              key={plan.id}
              data-plan-id={plan.id}
              className="scroll-mt-24 border-y border-[#d8d5cf] py-6"
              aria-labelledby={`plan-${plan.id}-name`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3
                  id={`plan-${plan.id}-name`}
                  className="font-display text-[1.35rem] font-extrabold tracking-[-0.02em] text-marketing-ink"
                >
                  {plan.name}
                </h3>
                <p className="shrink-0 text-[1.1rem] font-extrabold tracking-[-0.02em] text-marketing-ink">
                  {price === 'Custom' ? 'Custom' : (
                    <>
                      {price}
                      <span className="ml-0.5 text-[12px] font-semibold text-marketing-muted2">/mo</span>
                    </>
                  )}
                </p>
              </div>
              <dl className="mt-4 divide-y divide-[#e8e5df]">
                {FEATURE_ROWS.filter((row) => row.label !== 'Price').map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 py-2.5">
                    <dt className="min-w-0 text-[13px] font-medium text-marketing-muted">{row.label}</dt>
                    <dd className="shrink-0 text-right">
                      <CellValue value={row.values[plan.id]} />
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5">
                <PlanCta planId={plan.id} busy={busy} onSelect={(id) => void onSelect(id)} />
              </div>
            </section>
          );
        })}
      </div>

      {/* Desktop: comparison matrix */}
      <div className="mt-10 hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#d8d5cf]">
              <th className="py-3 pr-4 text-[12px] font-bold uppercase tracking-[0.12em] text-marketing-muted2">
                <span className="sr-only">Feature</span>
              </th>
              {PRICING_PLANS.map((plan) => (
                <th
                  key={plan.id}
                  data-plan-id={plan.id}
                  className="scroll-mt-24 px-2 py-3 text-center font-display text-[15px] font-extrabold tracking-[-0.02em] text-marketing-ink lg:text-[17px]"
                >
                  {plan.name}
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
                {PRICING_PLANS.map((plan) => (
                  <td key={plan.id} className="px-2 py-3.5 text-center align-middle">
                    <CellValue value={row.values[plan.id]} />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row" className="py-5 pr-4">
                <span className="sr-only">Get started</span>
              </th>
              {PRICING_PLANS.map((plan) => (
                <td key={plan.id} className="px-2 py-5 text-center align-middle">
                  <PlanCta planId={plan.id} busy={busy} onSelect={(id) => void onSelect(id)} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {error ? (
        <p className="mt-4 text-center text-[13px] font-semibold text-marketing-crimson" role="alert">
          {error}
        </p>
      ) : null}
      <p className="mt-4 text-center text-[12px] text-marketing-muted2">
        Prices shown monthly · billed in USD via Stripe. You’ll sign in to AIWEB OS, then complete
        checkout.
      </p>
    </div>
  );
}
