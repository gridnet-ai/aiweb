import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, lede, children }: PageHeroProps) {
  return (
    <header className="marketing-reveal relative w-full overflow-hidden pt-10 pb-10 md:pt-14 md:pb-12">
      <div
        className="pointer-events-none absolute -right-16 top-0 h-[320px] w-[320px] rounded-full opacity-50 blur-3xl md:h-[420px] md:w-[420px]"
        style={{
          background:
            'conic-gradient(from 200deg at 50% 50%, #FFC629 0%, #ff6b4a 25%, #c850c0 55%, #635bff 80%, #FFC629 100%)',
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-[1080px] px-4 sm:px-5 md:px-8">
        <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-marketing-ink">
          {title}
        </h1>
        {lede ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-marketing-muted md:text-lg">
            {lede}
          </p>
        ) : null}
        {children}
      </div>
    </header>
  );
}
