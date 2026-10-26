import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { CorpPublicSiteLayout } from '@/components/CorpPublicSiteLayout';
import { AboutPage } from '@/pages/AboutPage';
import { BlogIndexPage } from '@/pages/BlogIndexPage';
import { BlogPostPage } from '@/pages/BlogPostPage';
import { CareersPage } from '@/pages/CareersPage';
import { CheckoutCanceledPage, CheckoutSuccessPage } from '@/pages/CheckoutResultPages';
import { HomePage } from '@/pages/HomePage';
import { InvestorsPage } from '@/pages/InvestorsPage';
import { NewsIndexPage } from '@/pages/NewsIndexPage';
import { NewsPostPage } from '@/pages/NewsPostPage';
import { OverviewPage } from '@/pages/OverviewPage';
import { ProsperPitchDeckPage } from '@/pitchdeck/ProsperPitchDeckPage';
import { ExecutiveSummaryPage } from '@/pitchdeck/ExecutiveSummaryPage';
import { PressPage } from '@/pages/PressPage';
import { PricingPage } from '@/pages/PricingPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { SupportPage } from '@/pages/SupportPage';
import { TeamPage } from '@/pages/TeamPage';
import { TermsPage } from '@/pages/TermsPage';
import { WhitepaperPage } from '@/pages/WhitepaperPage';
import { PluginsPage } from '@/pages/PluginsPage';
import { AlbumPage } from '@/pages/AlbumPage';
import { AiwebOsScratchPage } from '@/pages/dev/AiwebOsScratchPage';
import { HomePageArchive } from '@/pages/archive/HomePageArchive';
import { HomePageV2 } from '@/pages/HomePageV2';
import { OsPage } from '@/pages/OsPage';
import { PluginPage } from '@/pages/PluginPage';
import { GeekdomPage } from '@/pages/GeekdomPage';

export default function App() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/dev/aiweb-os')) {
    return <AiwebOsScratchPage />;
  }
  if (pathname.startsWith('/plugins')) {
    return <PluginsPage />;
  }
  if (pathname === '/moa' || pathname === '/albums') {
    return <Navigate to="/album" replace />;
  }
  if (pathname.startsWith('/album')) {
    return <AlbumPage />;
  }
  if (pathname.startsWith('/pitchdeck')) {
    return <ProsperPitchDeckPage />;
  }
  if (pathname.startsWith('/executivesummary')) {
    return <ExecutiveSummaryPage />;
  }
  if (pathname.startsWith('/whitepaper')) {
    return <WhitepaperPage />;
  }

  return (
    <CorpPublicSiteLayout>
      <Routes>
        <Route path="/" element={<HomePageV2 />} />
        <Route path="/archive" element={<HomePageArchive />} />
        <Route path="/os" element={<OsPage />} />
        <Route path="/plugin" element={<PluginPage />} />
        <Route path="/geekdom" element={<GeekdomPage />} />
        <Route path="/classic" element={<HomePage />} />
        <Route path="/v2" element={<Navigate to="/" replace />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/press" element={<PressPage />} />
        <Route path="/investors" element={<InvestorsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/news" element={<NewsIndexPage />} />
        <Route path="/news/:slug" element={<NewsPostPage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
        <Route path="/checkout/canceled" element={<CheckoutCanceledPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CorpPublicSiteLayout>
  );
}
