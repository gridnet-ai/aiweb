import { PageHero } from '@/components/corp/PageHero';
import { TeamSection } from '@/components/marketing/TeamSection';
import { useMarketingPageSeo, useScrollReveal } from '@/hooks/useScrollReveal';

export function TeamPage() {
  useScrollReveal();
  useMarketingPageSeo({
    title: 'Team · AI Web Company',
    description:
      'Leadership at AI Web Company — infrastructure, legal and research, and grid-connected security.',
    canonicalPath: '/team',
  });

  return (
    <>
      <PageHero
        eyebrow="Team"
        title="The people building it."
        lede="Infrastructure, legal and research credibility, and grid-connected security — the disciplines this venture needs now."
      />
      <TeamSection />
    </>
  );
}
