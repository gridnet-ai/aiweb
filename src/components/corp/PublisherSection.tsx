import { useState } from 'react';
import { AIWebLogo } from '@/components/welcome/AIWebLogo';
import { AppWindow, Archive, Download, Share2, Shield } from 'lucide-react';
import { PRODUCT_URLS } from '@/lib/aiWebCompanyBrand';
import { PublisherIcon } from '@/components/welcome/PublisherIcon';
import { PublisherStoryPanel } from '@/components/corp/PublisherStoryPanel';
import { PublisherStoryToggle } from '@/components/corp/PublisherStoryToggle';
import { PublisherPricingTable } from '@/components/corp/PublisherPricingTable';
import { LeadsStoryCard } from '@/demo/chatgptStorySteps';
import { AiwebPageDefinition } from '@/components/corp/AiwebPageDefinition';
import { CustomerValueSection } from '@/components/corp/CustomerValueSection';
import { AiwebOsDemoBlock } from '@/demo/aiwebOsAnimation/AiwebOsDemoBlock';
import { getAiwebOsDemos } from '@/demo/aiwebOsAnimation/demos';
import type { PublisherStoryId } from '@/demo/quoteReplayStories';
import '@/demo/aiwebOsAnimation/aiwebOsAnimation.css';
import '@/components/corp/publisherStoryToggle.css';

const AIWEB_OS_STEPS = [
  {
    title: 'Log in to ChatGPT',
    body: 'Open ChatGPT and sign in to your account.',
  },
  {
    title: 'Open a new browser tab',
    body: 'Inside the ChatGPT app, open a new browser tab from the workspace.',
  },
  {
    title: 'Log in to AIWEB OS',
    body: 'In the new tab, log in to your AIWEB OS and tell ChatGPT to build a new AIWEB Page, update or publish an AIWEB Page, or check messages and callbacks from an AIWEB Page.',
  },
] as const;

/**
 * AIWEB OS product section — sits under the welcome hero.
 */
export function PublisherSection() {
  const [story, setStory] = useState<PublisherStoryId>('shopper');
  const osDemos = getAiwebOsDemos(story);

  return (
    <section className="relative bg-[var(--pwa-stage-bg,#eceae6)] px-4 pb-16 pt-2 sm:px-5 md:px-8 md:pb-24">
      <div className="mx-auto max-w-[1080px]">
        <div className="mx-auto mb-12 max-w-[820px] text-center md:mb-14">
          <h2 className="mt-3 font-display text-[clamp(1.75rem,4.6vw,2.85rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-marketing-ink">
            Publish AIWEB Pages that AI agents can discover, understand, and act through.
          </h2>
          <p className="mx-auto mt-4 max-w-[40rem] font-mono-marketing text-[11px] font-bold uppercase tracking-[0.12em] text-marketing-muted2">
            Build. Publish. Get discovered. Receive Calls. Respond. Improve. Repeat.
          </p>
          <p className="mx-auto mt-3 max-w-[44rem] text-[13px] font-medium leading-snug text-marketing-muted2">
            *Gemini, Claude, Grok, Perplexity team lead coming soon.
          </p>
        </div>

        <PublisherStoryToggle value={story} onChange={setStory} />

        <div className="mx-auto mb-12 max-w-[820px] text-center md:mb-14">
          <AiwebOsDemoBlock
            key={`${story}-build`}
            demo={osDemos[0]}
            index={0}
            storyId={story}
            showHeader={false}
            className="aos-publisher-demo--hero"
          />
          <a
            href={PRODUCT_URLS.aiWebOs}
            target="_blank"
            rel="noopener noreferrer"
            className="publisher-os-cta-combo"
            aria-label="Get started with AIWEB OS"
          >
            <span className="publisher-os-lockup" aria-hidden>
              <AIWebLogo
                color="#000000"
                width={120}
                className="pwa-logo-bare pwa-logo-wordmark publisher-os-lockup-aiweb"
              />
              <span className="publisher-os-lockup-os">
                <span className="publisher-os-lockup-mark-clip">
                  <PublisherIcon variant="light" className="publisher-os-lockup-mark" alt="" />
                </span>
                <span className="publisher-os-lockup-s">S</span>
              </span>
            </span>
            <span className="publisher-os-cta-box">Get started with AIWEB OS</span>
          </a>
          <AiwebPageDefinition />
        </div>

        <ol className="mx-auto mb-4 grid max-w-[820px] list-none gap-3 p-0 text-left md:grid-cols-3 md:gap-4">
          {AIWEB_OS_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="border border-[#d8d5cf] bg-white/80 px-4 py-4 shadow-[0_1px_0_rgba(255,255,255,0.8)]"
            >
              <span className="font-mono-marketing text-[10px] font-bold uppercase tracking-[0.14em] text-marketing-muted2">
                Step {index + 1}
              </span>
              <h3 className="mt-2 font-display text-[15px] font-extrabold leading-snug tracking-[-0.02em] text-marketing-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-[13px] font-medium leading-relaxed text-marketing-ink/75">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        {osDemos.slice(1).map((demo, index) => (
          <AiwebOsDemoBlock key={`${story}-${demo.id}`} demo={demo} index={index + 1} storyId={story} />
        ))}

        <div className="mb-12 md:mb-14" aria-hidden />

        <PublisherStoryPanel story={story} />

        <div className="mt-10 text-center">
          <p className="whitespace-nowrap font-display text-[clamp(1.05rem,2.2vw,1.5rem)] font-extrabold tracking-[-0.03em] text-marketing-ink">
            Get started with AIWEB OS today!
          </p>
          <a
            href={PRODUCT_URLS.aiWebAppStore}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex justify-center"
          >
            <img
              src="/icons/run-on-the-webapp-store.png?v=5"
              alt="Run on the WebApp Store"
              className="h-11 w-auto sm:h-12"
              height={48}
            />
          </a>
        </div>

        <CustomerValueSection />

        <div className="mt-16">
          <img
            src="/images/create-ai-web-page.png"
            alt="Business owner creating on a laptop"
            className="mb-8 block h-auto w-full rounded-none object-cover shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
            width={1600}
            height={600}
          />
          <h3 className="mb-5 text-center font-display text-[clamp(1.15rem,2.4vw,1.5rem)] font-extrabold tracking-[-0.03em] text-marketing-ink">
            How to Create Your Own AI Web Page for Your Business
          </h3>
          <video
            className="block h-auto w-full rounded-none shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
            src="/demo/create-to-publish.webm"
            poster="/demo/create-to-publish-human.png"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            aria-label="AIWEB OS — create to publish"
          />
        </div>

        <div className="mx-auto mt-10 max-w-[36rem] text-left">
          <p className="font-display text-[2rem] font-extrabold leading-none tracking-[-0.03em] text-marketing-ink">
            AI Web Page
          </p>
          <p className="mt-1.5 text-[13px] text-marketing-muted">
            <span className="italic">noun</span>
          </p>
          <ol className="mt-5 list-decimal space-y-4 pl-5 text-[15px] leading-relaxed text-marketing-ink">
            <li>
              a downloadable web page built to be read and used by both people and AI systems — not
              just displayed to a browser.
              <p className="mt-2 text-[14px] italic text-marketing-muted">
                “Publish an AI Web Page to prove and control your AI visibility.”
              </p>
            </li>
            <li>
              the basic content unit of the AI Web, addressed by an IRL (Intelligence Resource
              Locator) rather than a standard URL.
            </li>
          </ol>
          <p className="mt-6 text-[15px] font-semibold leading-snug text-marketing-ink">
            Prove and control your AI visibility with an AI Web Page.
          </p>
        </div>

        <div className="mt-16">
          <p className="font-mono-marketing text-[10px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
            Human Side
          </p>
          <h3 className="mt-1 font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-extrabold tracking-[-0.03em] text-marketing-ink">
            The page people see
          </h3>
          <img
            src="/demo/create-to-publish-human.png"
            alt="AIWEB OS Human Side — the page people see"
            className="mt-5 block h-auto w-full rounded-none shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
            width={1600}
            height={1000}
          />
        </div>

        <div className="mt-16">
          <p className="font-mono-marketing text-[10px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
            Machine Side
          </p>
          <h3 className="mt-1 font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-extrabold tracking-[-0.03em] text-marketing-ink">
            The page AI agents read
          </h3>
          <img
            src="/demo/create-to-publish.png"
            alt="AIWEB OS Machine Side — the page AI agents read"
            className="mt-5 block h-auto w-full rounded-none shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
            width={1600}
            height={1000}
          />
        </div>
        <div className="mt-10 text-center">
          <p className="whitespace-nowrap font-display text-[clamp(1.05rem,2.2vw,1.5rem)] font-extrabold tracking-[-0.03em] text-marketing-ink">
            Get started with AIWEB OS today!
          </p>
          <a
            href={PRODUCT_URLS.aiWebAppStore}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex justify-center"
          >
            <img
              src="/icons/run-on-the-webapp-store.png?v=5"
              alt="Run on the WebApp Store"
              className="h-11 w-auto sm:h-12"
              height={48}
            />
          </a>
        </div>

        <div className="mt-16">
          <h2 className="text-center font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-marketing-ink">
            AI Discovery Metrics
          </h2>
          <p className="mt-2 text-center text-[16px] font-semibold text-marketing-ink md:text-[17px]">
            See when AI finds and engages your business.
          </p>
          <video
            className="mt-8 block h-auto w-full rounded-none shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
            src="/demo/metrics-hits.webm"
            poster="/demo/metrics-hits.png"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            aria-label="AI Web Metrics — H.I.T.S"
          />
          <div className="mx-auto mt-10 max-w-[36rem] text-left">
            <p className="font-display text-[2rem] font-extrabold leading-none tracking-[-0.03em] text-marketing-ink">
              H.I.T.S
            </p>
            <p className="mt-1.5 text-[13px] text-marketing-muted">
              <span className="font-marketing">/hits/</span>
              <span className="mx-2 text-[#c8c5bf]">·</span>
              <span className="italic">noun</span>
            </p>

            <ol className="mt-5 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-marketing-ink">
              <li>
                Real-time tracking of AI crawlers, agents, and bots reading or using an AI webpage.
              </li>
              <li>
                An AI discovery metric that reports Human &amp; Intelligence Traffic Signals when AI
                finds and engages a published business.
              </li>
            </ol>

            <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.12em] text-marketing-muted2">
              Origin
            </p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-marketing-muted">
              2026; acronym from <span className="italic text-marketing-ink">Human</span> +{' '}
              <span className="italic text-marketing-ink">Intelligence Traffic Signals</span>. Coined
              for machine-readable pages whose readers are crawlers and agents, not only browsers.
            </p>

            <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.12em] text-marketing-muted2">
              Word breakdown
            </p>
            <dl className="mt-2 divide-y divide-[#d8d5cf] border-y border-[#d8d5cf] text-[14px]">
              {[
                ['H', 'Human'],
                ['I', 'Intelligence'],
                ['T', 'Traffic'],
                ['S', 'Signals'],
              ].map(([letter, word]) => (
                <div key={letter} className="flex gap-4 py-2">
                  <dt className="w-6 shrink-0 font-bold text-marketing-ink">{letter}</dt>
                  <dd className="text-marketing-muted">{word}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="publisher-how mt-10">
            <div className="publisher-how-stage publisher-how-stage--leads overflow-hidden rounded-none shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
              <LeadsStoryCard playKey={0} loop onMount={() => undefined} />
            </div>
          </div>

          <a
            href={PRODUCT_URLS.aiWebAppStore}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex justify-center"
          >
            <img
              src="/icons/run-on-the-webapp-store.png?v=5"
              alt="Run on the WebApp Store"
              className="h-11 w-auto sm:h-12"
              height={48}
            />
          </a>
        </div>

        <div className="mt-16">
          <h2 className="text-center font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-marketing-ink">
            The portable AI Web Page
          </h2>
          <p className="mx-auto mt-3 max-w-[36rem] text-center text-[16px] font-semibold leading-snug text-marketing-ink md:text-[17px]">
            The new AI document you can download, email, text, save to disk, upload and more.
          </p>
          <img
            src="/icons/aiweb-file.png?v=2"
            alt=".aiweb file"
            className="mx-auto mt-8 h-40 w-auto sm:h-48"
            height={192}
          />
          <video
            className="mt-8 block h-auto w-full rounded-none shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
            src="/demo/aiweb-download.webm"
            poster="/demo/aiweb-download.png"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            aria-label="Download a .aiweb file"
          />
          <ul className="mx-auto mt-10 grid max-w-[720px] grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
            {[
              { icon: Download, text: 'Download your full △iweb Page' },
              { icon: AppWindow, text: 'Open with any browser.' },
              { icon: 'publisher' as const, text: 'Open with AIWEB OS for full experience.' },
              { icon: Share2, text: 'Share .aiweb files across the company.' },
              { icon: Archive, text: 'Great for archives.' },
              { icon: Shield, text: 'Secure medium for art, music and film.' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d8d5cf] bg-white/70 text-marketing-ink">
                  {Icon === 'publisher' ? (
                    <PublisherIcon size={18} className="scale-[1.15]" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                  )}
                </span>
                <span className="pt-1 text-[14px] font-semibold leading-snug text-marketing-ink">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <PublisherPricingTable />
      </div>
    </section>
  );
}
