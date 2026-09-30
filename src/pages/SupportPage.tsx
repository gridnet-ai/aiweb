import { PageHero } from '@/components/corp/PageHero';
import { CORP_CONTACTS } from '@/lib/aiWebCompanyBrand';
import { PRIVACY_PATH, TERMS_PATH } from '@/lib/corpSiteRoutes';
import { useMarketingPageSeo, useScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';

const TOPICS = [
  {
    title: 'AIWEB OS & AI Web Pages',
    items: [
      'Creating and managing AI Web Pages',
      'Projects and client organization',
      'Publishing and updating pages',
      'AIWEB OS Agent',
      'AI Check',
      'Big Search and Chat',
      'aiWh usage',
      'Media and business information',
    ],
  },
  {
    title: 'AIWEB Actions & Leads',
    body: (
      <>
        If you have questions about a quote request, inquiry, or other AIWEB Action, please include
        any available <strong className="font-semibold text-marketing-ink">AIWEB Receipt ID</strong>{' '}
        with your support request. Receipt IDs help us locate and troubleshoot specific interactions.
      </>
    ),
  },
  {
    title: 'Billing & Subscriptions',
    items: [
      'AIWEB OS subscriptions',
      'Plan changes',
      'aiWh usage',
      'Billing',
      'Payments',
      'Account access',
    ],
  },
  {
    title: 'Technical Support',
    intro: 'If something isn\u2019t working correctly, please include:',
    items: [
      'A description of the problem',
      'The page or feature affected',
      'Your AI Web Page URL, if applicable',
      'Your AIWEB Receipt ID, if applicable',
      'Any error message you received',
      'Screenshots when helpful',
    ],
  },
] as const;

export function SupportPage() {
  useScrollReveal();
  useMarketingPageSeo({
    title: 'Support · AI Web Company',
    description:
      'Get help with AIWEB OS, AI Web Pages, Actions, Receipts, billing, and your account.',
    canonicalPath: '/support',
  });

  return (
    <div className="mx-auto w-full max-w-[760px] px-4 sm:px-5 md:px-8">
      <PageHero
        eyebrow="Support"
        title="AIWEB Support"
        lede="Need help with AIWEB, AIWEB OS, your AI Web Pages, AIWEB Actions, Receipts, billing, or your account? We're here to help."
      >
        <nav
          aria-label="Legal pages"
          className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-marketing-border pt-5"
        >
          <Link
            to={TERMS_PATH}
            className="text-[13px] font-semibold text-marketing-crimson hover:text-marketing-crimsonDark"
          >
            Terms
          </Link>
          <Link
            to={PRIVACY_PATH}
            className="text-[13px] font-semibold text-marketing-crimson hover:text-marketing-crimsonDark"
          >
            Privacy
          </Link>
        </nav>
      </PageHero>

      {TOPICS.map((topic) => (
        <section
          key={topic.title}
          className="marketing-reveal border-t border-marketing-border py-10"
        >
          <h2 className="font-display text-[1.25rem] font-extrabold tracking-[-0.02em] text-marketing-ink md:text-[1.35rem]">
            {topic.title}
          </h2>
          {'body' in topic && topic.body ? (
            <p className="mt-3 text-[15px] leading-relaxed text-marketing-muted">{topic.body}</p>
          ) : null}
          {'intro' in topic && topic.intro ? (
            <p className="mt-3 text-[15px] leading-relaxed text-marketing-muted">{topic.intro}</p>
          ) : null}
          {'items' in topic && topic.items ? (
            <>
              {!('intro' in topic && topic.intro) && !('body' in topic && topic.body) ? (
                <p className="mt-3 text-[15px] leading-relaxed text-marketing-muted">Get help with:</p>
              ) : null}
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] text-marketing-muted">
                {topic.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}
        </section>
      ))}

      <section className="marketing-reveal border-t border-marketing-border py-10 pb-20">
        <h2 className="font-display text-[1.25rem] font-extrabold tracking-[-0.02em] text-marketing-ink md:text-[1.35rem]">
          Contact AIWEB
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-marketing-muted">
          <strong className="font-semibold text-marketing-ink">AI WEB · The AI Web Company</strong>
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-marketing-muted">
          Email:{' '}
          <a
            href={CORP_CONTACTS.support}
            className="font-semibold text-marketing-crimson hover:text-marketing-crimsonDark"
          >
            support@theaiwebcompany.com
          </a>
        </p>
        <p className="mt-4 text-[14px] leading-relaxed text-marketing-muted2">
          Please do not submit passwords, API keys, payment-card numbers, or other sensitive
          credentials in a support request.
        </p>
      </section>
    </div>
  );
}
