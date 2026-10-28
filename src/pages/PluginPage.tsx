import { LandingNavV2 } from '@/components/corp/LandingNavV2';
import { LandingParadoxV2 } from '@/components/corp/LandingParadoxV2';
import { useLandingTheme } from '@/hooks/useLandingTheme';
import { useMarketingPageSeo, useScrollReveal } from '@/hooks/useScrollReveal';
import { PLUGIN_PATH } from '@/lib/corpSiteRoutes';
import '@/styles/landingV2.css';
import '@/styles/landingV2Paradox.css';

export function PluginPage() {
  const { isDark } = useLandingTheme();
  useScrollReveal();
  useMarketingPageSeo({
    title: 'AIWEB Plugin — DM for ChatGPT',
    description:
      'A new communications network connecting people and businesses through AI assistants—starting with ChatGPT.',
    canonicalPath: PLUGIN_PATH,
  });

  return (
    <div className={`landing-v2${isDark ? ' landing-v2--dark' : ''}`}>
      <LandingNavV2 />
      <LandingParadoxV2 page="plugin" />
    </div>
  );
}
