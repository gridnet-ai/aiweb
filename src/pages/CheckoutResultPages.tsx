import { Link } from 'react-router-dom';
import { PRODUCT_URLS } from '@/lib/aiWebCompanyBrand';
import { PRICING_PATH } from '@/lib/corpSiteRoutes';

export function CheckoutSuccessPage() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-[36rem] flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="font-display text-[clamp(1.75rem,4vw,2.25rem)] font-extrabold tracking-[-0.03em] text-marketing-ink">
        You’re subscribed
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-marketing-muted">
        Your AIWEB OS plan is activating. Open AIWEB OS to receive inquiries and quote
        requests.
      </p>
      <a
        href={`${PRODUCT_URLS.aiWebOs}/publisher`}
        className="mt-8 inline-flex border border-marketing-ink bg-marketing-ink px-5 py-2.5 text-[13px] font-bold text-white"
      >
        Open AIWEB OS
      </a>
    </main>
  );
}

export function CheckoutCanceledPage() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-[36rem] flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="font-display text-[clamp(1.75rem,4vw,2.25rem)] font-extrabold tracking-[-0.03em] text-marketing-ink">
        Checkout canceled
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-marketing-muted">
        No charge was made. You can pick a plan anytime.
      </p>
      <Link
        to={PRICING_PATH}
        className="mt-8 inline-flex border border-marketing-ink bg-white px-5 py-2.5 text-[13px] font-bold text-marketing-ink"
      >
        View pricing
      </Link>
    </main>
  );
}
