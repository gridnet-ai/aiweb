import { CorpWelcomeHome } from '@/components/welcome/CorpWelcomeHome';
import { PublisherSection } from '@/components/corp/PublisherSection';
import { useJsonLd, useMarketingPageSeo, useScrollReveal } from '@/hooks/useScrollReveal';
import {
  DEFAULT_KEYWORDS,
  DEFAULT_PAGE_DESCRIPTION,
  DEFAULT_PAGE_TITLE,
  organizationJsonLd,
} from '@/lib/siteSeo';

export function HomePage() {
  useScrollReveal();
  useMarketingPageSeo({
    title: DEFAULT_PAGE_TITLE,
    description: DEFAULT_PAGE_DESCRIPTION,
    canonicalPath: '/classic',
    robots: 'noindex, nofollow',
    keywords: DEFAULT_KEYWORDS,
  });
  useJsonLd(organizationJsonLd());

  return (
    <>
      <CorpWelcomeHome />
      <PublisherSection />
    </>
  );
}
