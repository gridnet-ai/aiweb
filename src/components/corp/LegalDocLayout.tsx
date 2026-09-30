import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '@/components/corp/PageHero';
import { PRIVACY_PATH, SUPPORT_PATH, TERMS_PATH } from '@/lib/corpSiteRoutes';

interface LegalDocLayoutProps {
  eyebrow: string;
  title: string;
  effectiveDate: string;
  lede?: string;
  children: ReactNode;
}

const LEGAL_NAV = [
  { label: 'Terms', to: TERMS_PATH },
  { label: 'Privacy', to: PRIVACY_PATH },
  { label: 'Support', to: SUPPORT_PATH },
] as const;

export function LegalDocLayout({
  eyebrow,
  title,
  effectiveDate,
  lede,
  children,
}: LegalDocLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-[760px] px-4 sm:px-5 md:px-8">
      <PageHero eyebrow={eyebrow} title={title} lede={lede}>
        <p className="mt-4 font-mono-marketing text-[12px] text-marketing-muted2">
          Effective Date: {effectiveDate}
        </p>
        <nav
          aria-label="Legal pages"
          className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-marketing-border pt-5"
        >
          {LEGAL_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[13px] font-semibold text-marketing-crimson hover:text-marketing-crimsonDark"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </PageHero>

      <article className="legal-doc marketing-reveal border-t border-marketing-border pb-20 pt-10">
        {children}
      </article>

      <p className="border-t border-marketing-border pb-16 pt-6 text-[12px] leading-relaxed text-marketing-muted2">
        Working draft for product launch readiness. Not attorney-reviewed; confirm open placeholders
        with counsel before treating as final.
      </p>
    </div>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-10 first:mt-0">
      <h2 className="font-display text-[1.25rem] font-extrabold tracking-[-0.02em] text-marketing-ink md:text-[1.35rem]">
        {title}
      </h2>
      <div className="legal-doc__body mt-3 space-y-3 text-[15px] leading-relaxed text-marketing-muted">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-1.5 pl-5 text-marketing-muted">{children}</ul>;
}

export function LegalPlaceholder({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm bg-amber-50 px-1 text-[13px] font-medium text-amber-900 ring-1 ring-amber-200/80">
      {children}
    </span>
  );
}
