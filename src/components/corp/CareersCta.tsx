import { Link } from 'react-router-dom';
import { CAREERS_PATH } from '@/lib/corpSiteRoutes';

export function CareersCta() {
  return (
    <section className="marketing-reveal border-t border-marketing-border bg-marketing-ink px-4 py-14 text-white sm:px-5 md:px-8 md:py-16">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.16em] text-marketing-gold">
            Careers
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
            We’re hiring.
          </h2>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-white/70">
            Join the team building AI as a utility — San Antonio roots, remote-friendly collaboration.
          </p>
        </div>
        <Link
          to={CAREERS_PATH}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center bg-marketing-crimson px-6 text-[14px] font-semibold text-white transition hover:bg-marketing-crimsonDark"
        >
          View careers
        </Link>
      </div>
    </section>
  );
}
