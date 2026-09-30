import { AiwebOsDemoBlock } from '@/demo/aiwebOsAnimation/AiwebOsDemoBlock';
import { getAiwebOsDemos } from '@/demo/aiwebOsAnimation/demos';
import { AGENCY_PILOT_HREF } from '@/components/corp/LandingNavV2';
import '@/demo/aiwebOsAnimation/aiwebOsAnimation.css';

const STORY = 'shopper' as const;

export function CorpWelcomeHomeV2() {
  const buildDemo = getAiwebOsDemos(STORY)[0];

  return (
    <section className="landing-v2-hero" aria-labelledby="landing-v2-hero-heading">
      <div className="landing-v2-hero-copy">
        <h1 id="landing-v2-hero-heading">
          <span className="landing-v2-hero-title">
            Deliver AI optimized self-improving web pages
          </span>
          <span className="landing-v2-hero-title-accent"> — in 3 easy steps</span>
        </h1>
        <ol className="landing-v2-lede-steps">
          <li>
            <span className="landing-v2-lede-steps-num" aria-hidden>
              1
            </span>
            <span className="landing-v2-lede-steps-text">
              Open AIWEB OS inside your ChatGPT browser.
            </span>
          </li>
          <li>
            <span className="landing-v2-lede-steps-num" aria-hidden>
              2
            </span>
            <span className="landing-v2-lede-steps-text">
              Tell ChatGPT what page to build, set to auto update and publish.
            </span>
          </li>
          <li>
            <span className="landing-v2-lede-steps-num" aria-hidden>
              3
            </span>
            <span className="landing-v2-lede-steps-text">
              Ask ChatGPT to check for messages, report analytics, or respond to messages.
            </span>
          </li>
        </ol>
        <div className="landing-v2-cta-row">
          <a href={AGENCY_PILOT_HREF} className="landing-v2-btn landing-v2-btn--primary">
            Apply for the agency pilot
          </a>
          <a href="#product" className="landing-v2-btn landing-v2-btn--ghost">
            Watch the demo
          </a>
        </div>
      </div>

      <div
        className="landing-v2-demo-frame landing-v2-hero-demo"
        aria-label="ChatGPT and AIWEB OS dress demonstration"
      >
        <AiwebOsDemoBlock
          demo={buildDemo}
          index={0}
          storyId={STORY}
          showHeader={false}
          className="aos-publisher-demo--hero"
        />
      </div>
    </section>
  );
}
