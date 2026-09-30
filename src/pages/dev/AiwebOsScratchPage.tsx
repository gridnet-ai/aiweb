import { Link } from 'react-router-dom';
import { ChatGptDressShopReplay } from '@/demo/ChatGptDressShopReplay';
import { ChatGptDressFollowUpReplay } from '@/demo/ChatGptDressFollowUpReplay';
import { AiwebOsViewport } from '@/demo/aiwebOsAnimation/AiwebOsViewport';
import { AIWEB_OS_DEMOS } from '@/demo/aiwebOsAnimation/demos';
import '@/demo/aiwebOsAnimation/aiwebOsAnimation.css';

/** Catering 3-scene replay — import when needed: ChatGptCateringQuoteReplay from @/demo/ChatGptGetQuoteReplay */

/**
 * Dev scratch page — animated AIWEB OS mocks. Not linked from production nav.
 * Fine-tune animations here before swapping into PublisherSection.
 */
export function AiwebOsScratchPage() {
  return (
    <div className="aos-scratch-page">
      <p className="aos-scratch-banner">
        Dev scratch — AIWEB OS animation (not production).
        <Link to="/">Back to homepage</Link>
      </p>
      <div className="aos-scratch-stage">
        {AIWEB_OS_DEMOS.map((demo, index) => {
          const { Component, title, description } = demo;
          return (
            <section key={demo.id} className="aos-scratch-section">
              <h2 className="aos-scratch-section-title">
                {index + 1} · {title}
              </h2>
              <p className="aos-scratch-section-desc">{description}</p>
              <AiwebOsViewport>
                <Component storyId="shopper" />
              </AiwebOsViewport>
            </section>
          );
        })}

        <section className="aos-scratch-section">
          <h2 className="aos-scratch-section-title">5 · Shop for a dress in ChatGPT</h2>
          <p className="aos-scratch-section-desc">
            Casual wedding-dress chat — ChatGPT responds like a stylist with a horizontal carousel
            of options and prices. Get Quote contacts the seller the same way as catering.
          </p>
          <ChatGptDressShopReplay />
        </section>

        <section className="aos-scratch-section">
          <h2 className="aos-scratch-section-title">6 · Seller call back + shopper receives it</h2>
          <p className="aos-scratch-section-desc">
            Maya&apos;s dress call lands in AIWEB Mail — the seller sends a call back. The shopper
            checks the receipt in ChatGPT and replies to schedule a try-on.
          </p>
          <ChatGptDressFollowUpReplay />
        </section>
      </div>
    </div>
  );
}
