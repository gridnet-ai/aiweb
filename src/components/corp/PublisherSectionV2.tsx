import { AiwebOsDemoBlock } from '@/demo/aiwebOsAnimation/AiwebOsDemoBlock';
import { getAiwebOsDemos } from '@/demo/aiwebOsAnimation/demos';
import { LeadsStoryCard } from '@/demo/chatgptStorySteps';
import { AiwebPageDefinition } from '@/components/corp/AiwebPageDefinition';
import { AGENCY_PILOT_HREF } from '@/components/corp/LandingNavV2';
import { PRODUCT_URLS } from '@/lib/aiWebCompanyBrand';
import '@/demo/aiwebOsAnimation/aiwebOsAnimation.css';
import '@/demo/publisherHowItWorks.css';
import '@/demo/publisherHowItWorks.css';

const STORY = 'shopper' as const;

const STEPS = [
  {
    title: 'Tell ChatGPT what the client needs.',
    body: 'Create a page, update an offer or publish new product information using plain language.',
    caption: 'Employee requesting the dress page in ChatGPT',
    demo: 'build' as const,
  },
  {
    title: 'AIWEB completes the work.',
    body: 'AIWEB builds and publishes an action-ready page with accurate information and a working customer action.',
    caption: 'Published dress page inside AIWEB',
    demo: 'publish' as const,
  },
  {
    title: 'Measure what happens.',
    body: 'See when customers and AI systems engage, capture calls and quote requests, and report results to the client.',
    caption: 'Shopper requesting a quote and the business responding',
    demo: 'leads' as const,
  },
] as const;

const ROLES = [
  {
    title: 'For the agency owner',
    body: 'Add a new service line, standardize delivery and understand the work being completed.',
  },
  {
    title: 'For the agency team',
    body: 'Create and manage client pages through ChatGPT instead of learning another complicated production workflow.',
  },
  {
    title: 'For the client',
    body: 'Publish accurate information that AI assistants can read and give customers a direct path to call, request a quote or take the next step.',
  },
] as const;

/**
 * Landing v2 body — product steps, agency value, impact, deeper product, sample metrics, pilot pricing.
 */
export function PublisherSectionV2() {
  const demos = getAiwebOsDemos(STORY);
  const buildDemo = demos[0];
  const publishDemo = { ...demos[2], title: 'Publish to the AI Web' };
  const inboxDemo = {
    ...demos[3],
    title: 'Inbox',
    description:
      'Visitors request a call on your published AIWEB Page. The lead lands in Inbox — reply with a callback from Calls.',
  };

  return (
    <>
      <section id="product" className="landing-v2-section" aria-labelledby="product-heading">
        <p className="landing-v2-kicker">From request to result</p>
        <h2 id="product-heading" className="landing-v2-section-title">
          What is the self-improving web page
        </h2>
        <p className="landing-v2-section-lede">
          Each webpage in the operating system runs a check across multiple AI models such as
          ChatGPT, Claude, Gemini, Grok, and Perplexity — then optimizes the webpage for top
          performance.
        </p>

        <div className="landing-v2-steps">
          {STEPS.map((step, index) => (
            <article key={step.title} className="landing-v2-step">
              <p className="landing-v2-step-num">Step {index + 1}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <div className="landing-v2-demo-frame landing-v2-step-media">
                {step.demo === 'build' ? (
                  <AiwebOsDemoBlock
                    demo={buildDemo}
                    index={0}
                    storyId={STORY}
                    showHeader={false}
                  />
                ) : null}
                {step.demo === 'publish' ? (
                  <AiwebOsDemoBlock
                    demo={publishDemo}
                    index={0}
                    storyId={STORY}
                    showHeader={false}
                  />
                ) : null}
                {step.demo === 'leads' ? (
                  <div className="publisher-how-stage publisher-how-stage--leads">
                    <LeadsStoryCard playKey={0} loop onMount={() => undefined} />
                  </div>
                ) : null}
                <p className="landing-v2-step-caption">{step.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="agencies" className="landing-v2-section" aria-labelledby="agencies-heading">
        <p className="landing-v2-kicker">Agency value</p>
        <h2 id="agencies-heading" className="landing-v2-section-title">
          One workflow for every client
        </h2>
        <p className="landing-v2-section-lede">
          Give each team member a consistent way to deliver AI optimization across multiple client
          accounts.
        </p>
        <div className="landing-v2-roles">
          {ROLES.map((role) => (
            <article key={role.title} className="landing-v2-role">
              <h3>{role.title}</h3>
              <p>{role.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="impact" className="landing-v2-impact" aria-labelledby="impact-heading">
        <div className="landing-v2-impact-inner">
          <p className="landing-v2-kicker">Impact</p>
          <h2 id="impact-heading">AI opportunity should reach every business</h2>
          <p>
            As customers move from search engines to AI assistants, businesses without technical
            resources risk being left behind.
          </p>
          <p>
            AIWEB is being designed to help local agencies, workers and business owners deliver AI
            optimization through tools they already understand.
          </p>
          <p>
            We are preparing a San Antonio pilot to test whether this approach can make AI
            participation more understandable, measurable and affordable for small businesses.
          </p>
          <div className="landing-v2-cta-row">
            <a href="#impact-detail" className="landing-v2-btn landing-v2-btn--light">
              Learn about our impact
            </a>
          </div>
          <p id="impact-detail" className="scroll-mt-24">
            The commercial path stays clear: agencies deliver AI optimization through ChatGPT. The
            pilot studies whether that same workflow can widen access for local businesses — without
            replacing the agency product story at the top of the site.
          </p>
        </div>
      </section>

      <section className="landing-v2-section" aria-labelledby="product-deep-heading">
        <p className="landing-v2-kicker">Product</p>
        <h2 id="product-deep-heading" className="landing-v2-section-title">
          What an AIWEB Page does
        </h2>
        <p className="landing-v2-section-lede">
          Pages AI assistants can read — with a direct path for customers to call, request a quote,
          or take the next step. Confirmations include a tracking number your team and client can
          follow.
        </p>
        <div className="mt-8">
          <AiwebPageDefinition tone="agency" />
        </div>

        <div className="mt-12">
          <p className="landing-v2-sample">Sample data</p>
          <h3 className="landing-v2-section-title" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>
            See engagement after publish
          </h3>
          <p className="landing-v2-section-lede">
            Track when customers and AI systems engage a published page. Simulated analytics below
            are sample data for demonstration only.
          </p>
          <video
            className="mt-8 block h-auto w-full border border-[#d8d5cf] shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
            src="/demo/metrics-hits.webm"
            poster="/demo/metrics-hits.png"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            aria-label="Sample AI discovery metrics"
          />
          <p className="mt-4 text-[13px] font-medium text-[#5c564e]">
            H.I.T.S. (Human &amp; Intelligence Traffic Signals) is the discovery metric shown in
            product — presented here only after the demonstration, and labeled as sample data.
          </p>
        </div>

        <div className="mt-12">
          <p className="landing-v2-kicker">Inbox</p>
          <h3 className="mt-2 font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-extrabold tracking-[-0.03em]">
            Calls land where your team already works
          </h3>
          <p className="landing-v2-section-lede">
            When a shopper requests a quote, the conversation continues in Inbox with a confirmation
            and tracking number — so agencies can respond and report back to the client.
          </p>
          <div className="landing-v2-demo-frame landing-v2-step-media mt-6">
            <AiwebOsDemoBlock demo={inboxDemo} index={0} storyId={STORY} showHeader={false} />
            <p className="landing-v2-step-caption">Inbox — sample conversation</p>
          </div>
        </div>
      </section>

      <section id="pricing" className="landing-v2-section landing-v2-pricing">
        <p className="landing-v2-kicker">Pricing</p>
        <h2 className="landing-v2-section-title">Agency pilot pricing</h2>
        <p className="landing-v2-section-lede">
          Full plan packaging is being calibrated to page-unit delivery. Until then, apply for the
          agency pilot — we will walk through scope, seats and reporting for your client roster.
        </p>
        <div className="landing-v2-cta-row justify-center">
          <a href={AGENCY_PILOT_HREF} className="landing-v2-btn landing-v2-btn--primary">
            Apply for the agency pilot
          </a>
          <a
            href={PRODUCT_URLS.aiWebOs}
            target="_blank"
            rel="noopener noreferrer"
            className="landing-v2-btn landing-v2-btn--ghost"
          >
            Sign in to AIWEB OS
          </a>
        </div>
      </section>
    </>
  );
}
