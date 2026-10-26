import { useEffect, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AI_WEB_COMPANY_BRAND, PRODUCT_URLS } from '@/lib/aiWebCompanyBrand';
import {
  GEEKDOM_PATH,
  HOME_PATH,
  OS_PATH,
  PLUGIN_PATH,
  PLUGINS_PATH,
  PRICING_PATH,
  PRIVACY_PATH,
  SUPPORT_PATH,
  TERMS_PATH,
} from '@/lib/corpSiteRoutes';
import { AIWebLogo } from '@/components/welcome/AIWebLogo';
import '@/styles/marketing.css';
import '@/styles/welcome.css';
import '@/styles/index.css';

interface CorpPublicSiteLayoutProps {
  children: ReactNode;
}

export function CorpPublicSiteLayout({ children }: CorpPublicSiteLayoutProps) {
  const { pathname } = useLocation();
  const isClassicHome = pathname === '/classic';
  const isNewHome =
    pathname === HOME_PATH ||
    pathname === '/v2' ||
    pathname === '/archive' ||
    pathname === OS_PATH ||
    pathname === PLUGIN_PATH ||
    pathname === GEEKDOM_PATH;
  const isDarkHome =
    pathname === HOME_PATH || pathname === PLUGIN_PATH || pathname === GEEKDOM_PATH;

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = isDarkHome ? 'dark' : 'light';
  }, [isDarkHome]);

  return (
    <div
      className={[
        'marketing-site flex min-h-screen flex-col font-marketing text-marketing-ink',
        isClassicHome ? 'bg-[var(--pwa-stage-bg,#eceae6)]' : isDarkHome ? 'bg-black' : 'bg-white',
      ].join(' ')}
    >
      <main className="flex min-w-0 flex-1 flex-col overflow-x-clip">{children}</main>
      {isNewHome ? null : <CorpFooter />}
    </div>
  );
}

function CorpFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex max-w-marketing flex-col gap-10 px-5 py-14 md:px-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <Link to={HOME_PATH} aria-label="AI Web Company — home" className="inline-flex">
              <AIWebLogo color="#ffffff" width={140} className="h-8 w-auto" />
            </Link>
            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-white/60">
              Building AI as a utility for bots, agents, and humans.
            </p>
            <p className="mt-2 font-mono-marketing text-[11px] text-white/40">
              {AI_WEB_COMPANY_BRAND.watermarkDomain}
            </p>
          </div>
          <a
            href={PRODUCT_URLS.aiWebAppStore}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AI Web App Store"
            className="inline-flex shrink-0"
          >
            <img
              src="/icons/run-on-the-webapp-store.png?v=5"
              alt="Run on the WebApp Store"
              className="h-11 w-auto sm:h-12"
              height={48}
            />
          </a>
        </div>
        <nav
          aria-label="Legal and support"
          className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-[13px] text-white/55"
        >
          <Link to={PLUGINS_PATH} className="hover:text-white">
            Plugins
          </Link>
          <Link to={PRICING_PATH} className="hover:text-white">
            Pricing
          </Link>
          <Link to={SUPPORT_PATH} className="hover:text-white">
            Support
          </Link>
          <Link to={TERMS_PATH} className="hover:text-white">
            Terms
          </Link>
          <Link to={PRIVACY_PATH} className="hover:text-white">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
