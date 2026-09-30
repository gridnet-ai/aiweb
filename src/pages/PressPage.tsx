import { CORP_CONTACTS } from '@/lib/aiWebCompanyBrand';
import { PageHero } from '@/components/corp/PageHero';
import { TEAM_PATH } from '@/lib/corpSiteRoutes';
import { Link } from 'react-router-dom';
import { useMarketingPageSeo, useScrollReveal } from '@/hooks/useScrollReveal';

const BOILERPLATES = [
  {
    label: '100 words',
    text: 'AIWEB is the commercial action layer for AI. Based in San Antonio, AI Web Company ships AIWEB OS so businesses can publish AIWEB Pages that AI agents can discover, understand, and act through — Build. Publish. Get discovered. Receive Calls. Respond. Improve. Repeat. Founded by U.S. Army Signal Corps veteran Terry French after Founder Institute Fall 2025, the company joined Google for Startups in 2026 and recorded early commercial traction including a SATX District One pilot LOI. Corporate news, press, investors, and careers live at theaiwebcompany.com.',
  },
  {
    label: '50 words',
    text: 'AIWEB is the commercial action layer for AI. From San Antonio, AI Web Company ships AIWEB OS, AI Web App, Big Search, and Publish To AI so agents can discover, understand, and act through AIWEB Pages.',
  },
  {
    label: '25 words',
    text: 'AIWEB is the commercial action layer for AI — publish AIWEB Pages that agents can discover, understand, and act through.',
  },
] as const;

export function PressPage() {
  useScrollReveal();
  useMarketingPageSeo({
    title: 'Press · AI Web Company',
    description:
      'Press kit for AI Web Company — boilerplate, brand assets, fact sheet, and media contact.',
    canonicalPath: '/press',
  });

  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 sm:px-5 md:px-8">
      <PageHero
        eyebrow="Press"
        title="Press kit"
        lede="Boilerplate, brand guidance, and media contact for coverage of AI Web Company."
      />

      <section className="marketing-reveal border-t border-marketing-border py-12">
        <h2 className="font-display text-2xl font-extrabold text-marketing-ink">Media contact</h2>
        <p className="mt-3 text-marketing-muted">
          <a
            href={CORP_CONTACTS.press}
            className="font-semibold text-marketing-crimson hover:text-marketing-crimsonDark"
          >
            press@theaiwebcompany.com
          </a>
        </p>
      </section>

      <section className="marketing-reveal border-t border-marketing-border py-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-2xl font-extrabold text-marketing-ink">Boilerplate</h2>
          <a
            href="/press/boilerplate.txt"
            className="text-[13px] font-semibold text-marketing-crimson hover:text-marketing-crimsonDark"
            download
          >
            Download .txt →
          </a>
        </div>
        <ul className="mt-8 space-y-8">
          {BOILERPLATES.map((b) => (
            <li key={b.label}>
              <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.14em] text-marketing-muted2">
                {b.label}
              </p>
              <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-marketing-muted">
                {b.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="marketing-reveal border-t border-marketing-border py-12">
        <h2 className="font-display text-2xl font-extrabold text-marketing-ink">Brand assets</h2>
        <p className="mt-3 max-w-2xl text-[15px] text-marketing-muted">
          Primary mark: shared app logo until a corp-specific lockup ships. Brand gold{' '}
          <code className="font-mono-marketing text-[13px]">#FFC629</code>. Crimson CTA{' '}
          <code className="font-mono-marketing text-[13px]">#C8202F</code>. Do not alter proportions
          or recolor the mark without approval.
        </p>
        <a
          href="/icons/app-logo.png"
          download
          className="mt-5 inline-flex min-h-[44px] items-center border border-marketing-border bg-white px-5 text-[14px] font-semibold text-marketing-ink transition hover:border-marketing-ink"
        >
          Download logo PNG
        </a>
      </section>

      <section className="marketing-reveal border-t border-marketing-border py-12">
        <h2 className="font-display text-2xl font-extrabold text-marketing-ink">Fact sheet</h2>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ['Founded', '2025 (FI graduation Dec 2025; MVP Jan 2026)'],
            ['HQ', 'San Antonio, Texas'],
            ['Products', 'AI Web App · Big Search · Publish To AI'],
            ['Highlights', 'Google for Startups · Node 0 · SATX District One LOI'],
          ].map(([dt, dd]) => (
            <div key={dt} className="border-t border-marketing-border pt-4">
              <dt className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.12em] text-marketing-muted2">
                {dt}
              </dt>
              <dd className="mt-1 text-[15px] text-marketing-ink">{dd}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="marketing-reveal border-t border-marketing-border py-12">
        <h2 className="font-display text-2xl font-extrabold text-marketing-ink">Executive bios</h2>
        <p className="mt-3 text-marketing-muted">
          Short bios and affiliation marks live on the{' '}
          <Link to={TEAM_PATH} className="font-semibold text-marketing-crimson">
            team page
          </Link>
          .
        </p>
      </section>

      <section className="marketing-reveal border-t border-marketing-border py-12 pb-20">
        <h2 className="font-display text-2xl font-extrabold text-marketing-ink">Recent coverage</h2>
        <p className="mt-3 text-marketing-muted">
          Curated outbound links will appear here as coverage lands. Seed empty for launch.
        </p>
      </section>
    </div>
  );
}
