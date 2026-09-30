import { Link } from 'react-router-dom';
import { PRODUCT_URLS } from '@/lib/aiWebCompanyBrand';
import { ABOUT_PATH } from '@/lib/corpSiteRoutes';

export function CorpHero() {
  return (
    <header className="marketing-reveal relative w-full overflow-hidden pt-10 pb-14 md:pt-16 md:pb-20">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -right-12 top-0 h-[min(480px,125vw)] w-[min(480px,125vw)] rounded-full opacity-70 blur-3xl sm:-right-16 sm:opacity-75 md:-right-16 md:top-[5%] md:h-[min(520px,70vw)] md:w-[min(520px,70vw)] md:opacity-90 lg:h-[min(680px,58vw)] lg:w-[min(680px,58vw)]"
          style={{
            background:
              'conic-gradient(from 200deg at 50% 50%, #FFC629 0%, #ff6b4a 25%, #c850c0 55%, #635bff 80%, #FFC629 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto box-border w-full min-w-0 max-w-[1080px] px-4 sm:px-5 md:px-8">
        <div className="flex max-w-3xl flex-col gap-6">
          <h1 className="font-display text-[clamp(2.5rem,8vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-marketing-ink">
            Building the AI Web.
          </h1>

          <p className="max-w-full font-marketing text-[clamp(1.375rem,5.2vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-marketing-ink">
            The new cloud on-demand access to artificial intelligence as a utility - chat, search and
            publish delivered all-in-one web that you control.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to={ABOUT_PATH}
              className="inline-flex min-h-[44px] items-center justify-center bg-marketing-crimson px-5 text-[14px] font-semibold text-white transition hover:bg-marketing-crimsonDark"
            >
              About the company
            </Link>
            <a
              href={PRODUCT_URLS.aiWebApp}
              className="inline-flex min-h-[44px] items-center justify-center border border-marketing-border bg-white/80 px-5 text-[14px] font-semibold text-marketing-ink transition hover:border-marketing-ink"
            >
              Open AI Web App
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
