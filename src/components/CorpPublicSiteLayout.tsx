import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import {
  GEEKDOM_PATH,
  HOME_PATH,
  PLUGIN_PATH,
} from '@/lib/corpSiteRoutes';
import { applyLandingTheme, useLandingTheme } from '@/hooks/useLandingTheme';
import '@/styles/marketing.css';
import '@/styles/welcome.css';
import '@/styles/index.css';

interface CorpPublicSiteLayoutProps {
  children: ReactNode;
}

export function CorpPublicSiteLayout({ children }: CorpPublicSiteLayoutProps) {
  const { pathname } = useLocation();
  const { theme, isDark } = useLandingTheme();
  const isClassicHome = pathname === '/classic';
  const isThemeableHome =
    pathname === HOME_PATH || pathname === PLUGIN_PATH || pathname === GEEKDOM_PATH;
  const isDarkHome = isThemeableHome ? isDark : false;

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    if (isThemeableHome) {
      applyLandingTheme(theme);
      return;
    }
    document.documentElement.style.colorScheme = 'light';
    delete document.documentElement.dataset.landingTheme;
  }, [isThemeableHome, theme]);

  return (
    <div
      className={[
        'marketing-site flex min-h-screen flex-col font-marketing text-marketing-ink',
        isClassicHome ? 'bg-[var(--pwa-stage-bg,#eceae6)]' : isDarkHome ? 'bg-black' : 'bg-white',
      ].join(' ')}
    >
      <main className="flex min-w-0 flex-1 flex-col overflow-x-clip">{children}</main>
    </div>
  );
}
