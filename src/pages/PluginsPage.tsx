import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AIWebLogo } from '@/components/welcome/AIWebLogo';
import { ChatgptPlanNav } from '@/components/plugins/ChatgptPlanNav';
import { PlatformNav } from '@/components/plugins/PlatformNav';
import { trackPluginsEvent } from '@/lib/pluginsAnalytics';
import {
  chatgptCtaForPlan,
  PLUGINS_CTAS,
  type ChatgptPlanId,
} from '@/lib/pluginsCtas';
import { PLUGINS_PLATFORMS } from '@/lib/pluginsPlatforms';
import { usePluginsSeo } from '@/lib/pluginsSeo';
import './plugins.css';

function parsePlan(raw: string | null): ChatgptPlanId {
  if (raw === 'plus' || raw === 'free' || raw === 'business') return raw;
  return 'business';
}

function PluginsCta({
  href,
  children,
  event,
  platform,
  chatgptPlan,
  cta,
  ghost,
}: {
  href: string;
  children: ReactNode;
  event: 'chatgpt_plugin_cta_clicked' | 'publisher_cta_clicked' | 'agency_cta_clicked' | 'portfolio_cta_clicked';
  platform: string;
  chatgptPlan?: ChatgptPlanId;
  cta: string;
  ghost?: boolean;
}) {
  const internal = href.startsWith('/');
  const className = ghost ? 'pg-btn pg-btn--ghost' : 'pg-btn';
  const onClick = () => {
    trackPluginsEvent({ event, platform, chatgpt_plan: chatgptPlan, cta });
  };
  if (internal) {
    return (
      <Link className={className} to={href} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer" onClick={onClick}>
      {children}
    </a>
  );
}

export function PluginsPage() {
  const [params, setParams] = useSearchParams();
  const [platform, setPlatform] = useState('chatgpt');
  const [plan, setPlan] = useState<ChatgptPlanId>(() => parsePlan(params.get('plan')));
  const viewed = useRef(false);
  usePluginsSeo();

  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    trackPluginsEvent({
      event: 'plugins_page_view',
      platform: 'chatgpt',
      chatgpt_plan: parsePlan(params.get('plan')),
    });
  }, [params]);

  function selectPlatform(id: string) {
    setPlatform(id);
    trackPluginsEvent({ event: 'platform_tab_selected', platform: id, chatgpt_plan: plan });
  }

  function selectPlan(next: ChatgptPlanId) {
    setPlan(next);
    const nextParams = new URLSearchParams(params);
    nextParams.set('plan', next);
    setParams(nextParams, { replace: true });
    trackPluginsEvent({ event: 'chatgpt_plan_selected', platform, chatgpt_plan: next });
  }

  const chatgptUrl = chatgptCtaForPlan(plan);

  return (
    <div className="pg-root">
      <a className="pg-skip" href="#plugins-main">
        Skip to AIWEB Plugins
      </a>
      <header className="pg-chrome">
        <a className="pg-chrome-brand" href="/plugins" aria-label="AIWEB Plugins">
          <AIWebLogo width={118} className="pg-chrome-logo" />
        </a>
        <nav className="pg-chrome-nav" aria-label="Plugins">
          <Link to="/album">Album</Link>
          <Link to="/">The AI Web Company</Link>
        </nav>
      </header>

      <main id="plugins-main" className="pg-wrap">
        <section className="pg-hero">
          <img
            className="pg-hero-mark"
            src="/icons/aiweb-plugins-wordmark.png"
            alt="Plugins"
            width={280}
            height={72}
          />
          <p className="pg-kicker">AIWEB Plugins</p>
          <h1 className="pg-h1">AIWEB is the commercial action layer for AI.</h1>
          <p className="pg-lede">
            <strong>Use AIWEB where you already use AI.</strong>
          </p>
          <p className="pg-copy">
            AIWEB plugins connect AI assistants to the AI Web, allowing users to discover AIWEB
            Pages and interact with businesses and media without leaving their AI conversation.
          </p>
          <div className="pg-ctas">
            <a
              className="pg-btn"
              href="#chatgpt"
              onClick={() =>
                trackPluginsEvent({
                  event: 'chatgpt_plugin_cta_clicked',
                  platform,
                  chatgpt_plan: plan,
                  cta: 'hero_use_aiweb_chatgpt',
                })
              }
            >
              Use AIWEB in ChatGPT
            </a>
            <PluginsCta
              href={PLUGINS_CTAS.publisher}
              event="publisher_cta_clicked"
              platform={platform}
              chatgptPlan={plan}
              cta="hero_publish_page"
              ghost
            >
              Publish an AIWEB Page
            </PluginsCta>
          </div>
          <p className="pg-fine">
            Already have an AIWEB Page? Your published page can become available to supported AIWEB
            experiences.
          </p>
        </section>

        <PlatformNav
          platforms={PLUGINS_PLATFORMS}
          selectedId={platform}
          onSelect={selectPlatform}
        />

        <div id="plugins-platform-panel" role="tabpanel" aria-labelledby={`platform-tab-${platform}`}>
          {platform === 'chatgpt' ? (
            <ChatgptSection
              plan={plan}
              onSelectPlan={selectPlan}
              chatgptUrl={chatgptUrl}
              platform={platform}
            />
          ) : (
            <section className="pg-soon">
              <h2 className="pg-h2">More platforms coming soon</h2>
              <p className="pg-copy">
                AIWEB plugins are built so additional AI platforms can be added here. ChatGPT is
                available today.
              </p>
            </section>
          )}
        </div>

        <SellerSection platform={platform} plan={plan} />
        <AgencySection platform={platform} plan={plan} />
        <FaqSection />

        <p className="pg-legal">
          AIWEB and The AI Web Company are independent products and are not affiliated with,
          endorsed by, or sponsored by OpenAI. ChatGPT is a product of OpenAI. Availability of
          third-party plugins and their capabilities may vary by plan, account, workspace
          configuration, region and platform.
        </p>
      </main>
    </div>
  );
}

function ChatgptSection({
  plan,
  onSelectPlan,
  chatgptUrl,
  platform,
}: {
  plan: ChatgptPlanId;
  onSelectPlan: (id: ChatgptPlanId) => void;
  chatgptUrl: string;
  platform: string;
}) {
  return (
    <>
      <section className="pg-section" id="chatgpt">
        <p className="pg-kicker">ChatGPT</p>
        <h2 className="pg-h2">AIWEB for ChatGPT</h2>
        <p className="pg-lede">Find. Call. Play.</p>
        <p className="pg-copy">
          AIWEB brings the AI Web into ChatGPT. Users can discover published AIWEB Pages, contact
          participating businesses, request quotes, receive callbacks and interact with supported
          media directly through ChatGPT.
        </p>
        <div className="pg-products">
          <article className="pg-card">
            <span className="pg-card__verb">Find</span>
            <h3>AIWEB — Find</h3>
            <p>Discover businesses, services and other published AIWEB Pages.</p>
            <blockquote className="pg-quote">“Use AIWEB to find a lawyer.”</blockquote>
          </article>
          <article className="pg-card">
            <span className="pg-card__verb">Call</span>
            <h3>AIWEB Call — Call</h3>
            <p>
              Send a request to a participating business and receive a callback through the AIWEB
              Call workflow.
            </p>
            <blockquote className="pg-quote">
              “Use AIWEB to get a quote from Hilliard Law.”
            </blockquote>
          </article>
          <article className="pg-card">
            <span className="pg-card__verb">Play</span>
            <h3>AIWEB Play — Play</h3>
            <p>Discover and play supported media published to the AI Web.</p>
            <blockquote className="pg-quote">
              “Use AIWEB Play to play Type from the AI Web Album.”
            </blockquote>
          </article>
        </div>
      </section>

      <section className="pg-section" id="chatgpt-setup">
        <h2 className="pg-h2">Choose your ChatGPT plan</h2>
        <p className="pg-note">
          Plugin availability and capabilities may vary based on your ChatGPT plan, workspace
          settings, role, region and supported features.
        </p>
        <ChatgptPlanNav selected={plan} onSelect={onSelectPlan} />

        {plan === 'business' ? (
          <BusinessPanel url={chatgptUrl} platform={platform} plan={plan} />
        ) : null}
        {plan === 'plus' ? <PlusPanel url={chatgptUrl} platform={platform} plan={plan} /> : null}
        {plan === 'free' ? <FreePanel url={chatgptUrl} platform={platform} plan={plan} /> : null}
      </section>

      <section className="pg-section" id="compare">
        <h2 className="pg-h2">Business vs Plus vs Free</h2>
        <div className="pg-table-wrap">
          <table className="pg-table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">ChatGPT Business</th>
                <th scope="col">ChatGPT Plus</th>
                <th scope="col">ChatGPT Free</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Plugin Directory</th>
                <td>Yes*</td>
                <td>Yes*</td>
                <td>Yes*</td>
              </tr>
              <tr>
                <th scope="row">AIWEB discovery</th>
                <td>Where available</td>
                <td>Where available</td>
                <td>Where available</td>
              </tr>
              <tr>
                <th scope="row">AIWEB Calls</th>
                <td>Where available</td>
                <td>Where available</td>
                <td>Where available</td>
              </tr>
              <tr>
                <th scope="row">AIWEB Play</th>
                <td>Where available</td>
                <td>Where available</td>
                <td>Where available</td>
              </tr>
              <tr>
                <th scope="row">Workspace administration</th>
                <td>Yes</td>
                <td>No</td>
                <td>No</td>
              </tr>
              <tr>
                <th scope="row">Organization deployment</th>
                <td>Yes</td>
                <td>Personal account</td>
                <td>Personal account</td>
              </tr>
              <tr>
                <th scope="row">Usage limits</th>
                <td>Plan dependent</td>
                <td>Plan dependent</td>
                <td>Plan dependent</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="pg-fine">
          *The Plugin Directory is visible across ChatGPT plans, but installation and individual
          capabilities depend on plan, workspace settings, role, supported surface, region and the
          capabilities included with each plugin.
        </p>
      </section>
    </>
  );
}

function BusinessPanel({
  url,
  platform,
  plan,
}: {
  url: string;
  platform: string;
  plan: ChatgptPlanId;
}) {
  return (
    <div id="chatgpt-panel-business" role="tabpanel" aria-labelledby="chatgpt-plan-business">
      <h3 className="pg-h3">Using AIWEB with ChatGPT Business</h3>
      <p className="pg-copy">
        <strong>Recommended for organizations using AIWEB for business purchasing and procurement.</strong>
      </p>
      <h3 className="pg-h3">Installation</h3>
      <ol className="pg-ol">
        <li>Sign in to your ChatGPT Business workspace.</li>
        <li>
          Open <strong>Plugins</strong> in ChatGPT.
        </li>
        <li>
          Search the Plugin Directory for <strong>AIWEB</strong>.
        </li>
        <li>Open the AIWEB listing and review its available capabilities.</li>
        <li>
          Select <strong>Connect</strong> when available.
        </li>
        <li>If AIWEB is unavailable or disabled, contact your workspace administrator.</li>
        <li>Start a new ChatGPT conversation and use AIWEB.</li>
      </ol>
      <aside className="pg-callout">
        <h3 className="pg-h3">Workspace administrators</h3>
        <p className="pg-copy">
          ChatGPT Business administrators and owners can manage plugins through{' '}
          <strong>Workspace Settings → Plugins</strong>. Administrators can determine whether
          plugins are available or installed for eligible workspace roles and manage the underlying
          app permissions and actions.
        </p>
      </aside>
      <h3 className="pg-h3">Try these prompts</h3>
      <div className="pg-prompts">
        <blockquote className="pg-quote">“Use AIWEB to find a commercial roofing company.”</blockquote>
        <blockquote className="pg-quote">“Use AIWEB to find a lawyer.”</blockquote>
        <blockquote className="pg-quote">
          “Use AIWEB to get catering quotes for our company event.”
        </blockquote>
        <blockquote className="pg-quote">“Use AIWEB to check my AIWEB Receipt.”</blockquote>
      </div>
      <div className="pg-ctas">
        <PluginsCta
          href={url}
          event="chatgpt_plugin_cta_clicked"
          platform={platform}
          chatgptPlan={plan}
          cta="business_open_aiweb"
        >
          Open AIWEB in ChatGPT
        </PluginsCta>
      </div>
    </div>
  );
}

function PlusPanel({
  url,
  platform,
  plan,
}: {
  url: string;
  platform: string;
  plan: ChatgptPlanId;
}) {
  return (
    <div id="chatgpt-panel-plus" role="tabpanel" aria-labelledby="chatgpt-plan-plus">
      <h3 className="pg-h3">Using AIWEB with ChatGPT Plus</h3>
      <p className="pg-copy">
        AIWEB can provide ChatGPT users with access to businesses, services and media published on
        the AI Web where the plugin and its capabilities are available for their account.
      </p>
      <h3 className="pg-h3">Installation</h3>
      <ol className="pg-ol">
        <li>Sign in to ChatGPT.</li>
        <li>
          Open <strong>Plugins</strong>.
        </li>
        <li>
          Search for <strong>AIWEB</strong>.
        </li>
        <li>Open the AIWEB listing.</li>
        <li>
          Select <strong>Connect</strong> if available.
        </li>
        <li>Start a conversation.</li>
        <li>Ask ChatGPT to use AIWEB.</li>
      </ol>
      <h3 className="pg-h3">Try it</h3>
      <div className="pg-prompts">
        <blockquote className="pg-quote">“Use AIWEB to find a business.”</blockquote>
        <blockquote className="pg-quote">“Use AIWEB to get a quote.”</blockquote>
        <blockquote className="pg-quote">“Use AIWEB Play to find music.”</blockquote>
      </div>
      <p className="pg-fine">
        Plus accounts generally have higher usage limits than Free accounts. Plugin availability and
        individual capabilities may vary.
      </p>
      <div className="pg-ctas">
        <PluginsCta
          href={url}
          event="chatgpt_plugin_cta_clicked"
          platform={platform}
          chatgptPlan={plan}
          cta="plus_find_aiweb"
        >
          Find AIWEB in ChatGPT
        </PluginsCta>
      </div>
    </div>
  );
}

function FreePanel({
  url,
  platform,
  plan,
}: {
  url: string;
  platform: string;
  plan: ChatgptPlanId;
}) {
  return (
    <div id="chatgpt-panel-free" role="tabpanel" aria-labelledby="chatgpt-plan-free">
      <h3 className="pg-h3">Using AIWEB with ChatGPT Free</h3>
      <p className="pg-copy">
        AIWEB may be available to eligible signed-in ChatGPT Free users through the Plugin
        Directory.
      </p>
      <h3 className="pg-h3">Get started</h3>
      <ol className="pg-ol">
        <li>Sign in to ChatGPT.</li>
        <li>
          Open <strong>Plugins</strong>.
        </li>
        <li>
          Search for <strong>AIWEB</strong>.
        </li>
        <li>Open the AIWEB listing.</li>
        <li>
          If <strong>Connect</strong> is available, connect AIWEB.
        </li>
        <li>Start a conversation and ask ChatGPT to use AIWEB.</li>
      </ol>
      <h3 className="pg-h3">Try it</h3>
      <div className="pg-prompts">
        <blockquote className="pg-quote">“Use AIWEB to find a business.”</blockquote>
        <blockquote className="pg-quote">“Use AIWEB to find Hilliard Law.”</blockquote>
        <blockquote className="pg-quote">“Use AIWEB Play to find music.”</blockquote>
      </div>
      <p className="pg-note">
        Plugin availability, individual capabilities and usage limits depend on your ChatGPT
        account, region and current ChatGPT availability. If AIWEB cannot be connected from your
        account, check the AIWEB plugin listing for current requirements.
      </p>
      <div className="pg-ctas">
        <PluginsCta
          href={url}
          event="chatgpt_plugin_cta_clicked"
          platform={platform}
          chatgptPlan={plan}
          cta="free_check_availability"
        >
          Check AIWEB Availability
        </PluginsCta>
      </div>
    </div>
  );
}

function SellerSection({ platform, plan }: { platform: string; plan: ChatgptPlanId }) {
  return (
    <section className="pg-section" id="publish">
      <p className="pg-kicker">For businesses</p>
      <h2 className="pg-h2">Want your business to appear on the AI Web?</h2>
      <p className="pg-copy">
        Using AIWEB and publishing to AIWEB are different sides of the network.
      </p>
      <p className="pg-copy">
        <strong>AIWEB</strong> helps people discover and interact with AIWEB Pages.
      </p>
      <p className="pg-copy">
        <strong>AIWEB OS</strong> helps businesses create and manage those AIWEB Pages.
      </p>
      <div className="pg-flow" aria-hidden>
        <div className="pg-flow__node">Your Business</div>
        <div className="pg-flow__arrow">↓</div>
        <div className="pg-flow__node">AIWEB OS</div>
        <div className="pg-flow__arrow">↓</div>
        <div className="pg-flow__node">AIWEB Page</div>
        <div className="pg-flow__arrow">↓</div>
        <div className="pg-flow__node">AIWEB Plugins</div>
        <div className="pg-flow__arrow">↓</div>
        <div className="pg-flow__node">AI Users</div>
      </div>
      <h2 className="pg-h2">Get your business on the AI Web.</h2>
      <p className="pg-copy">
        Create an AIWEB Page for your business and make it available to supported AIWEB discovery
        and action experiences.
      </p>
      <div className="pg-ctas">
        <PluginsCta
          href={PLUGINS_CTAS.publisher}
          event="publisher_cta_clicked"
          platform={platform}
          chatgptPlan={plan}
          cta="create_aiweb_page"
        >
          Create Your AIWEB Page
        </PluginsCta>
        <PluginsCta
          href={PLUGINS_CTAS.learnPublisher}
          event="publisher_cta_clicked"
          platform={platform}
          chatgptPlan={plan}
          cta="learn_publisher"
          ghost
        >
          Learn About AIWEB OS
        </PluginsCta>
      </div>
    </section>
  );
}

function AgencySection({ platform, plan }: { platform: string; plan: ChatgptPlanId }) {
  return (
    <section className="pg-section" id="partners">
      <h2 className="pg-h2">Have multiple businesses?</h2>
      <div className="pg-agency">
        <article className="pg-card">
          <h3>Agencies</h3>
          <p>Get your clients on the AI Web.</p>
        </article>
        <article className="pg-card">
          <h3>Venture Capital &amp; Accelerators</h3>
          <p>Get your portfolio on the AI Web.</p>
          <a
            href={PLUGINS_CTAS.talkToAiweb}
            className="pg-text-link"
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackPluginsEvent({
                event: 'portfolio_cta_clicked',
                platform,
                chatgpt_plan: plan,
                cta: 'vc_card',
              })
            }
          >
            Talk to AIWEB
          </a>
        </article>
        <article className="pg-card">
          <h3>Organizations</h3>
          <p>Publish and manage multiple AIWEB Pages from AIWEB OS.</p>
        </article>
      </div>
      <div className="pg-ctas">
        <PluginsCta
          href={PLUGINS_CTAS.talkToAiweb}
          event="agency_cta_clicked"
          platform={platform}
          chatgptPlan={plan}
          cta="talk_to_aiweb"
        >
          Talk to AIWEB
        </PluginsCta>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="pg-section pg-faq" id="faq">
      <h2 className="pg-h2">FAQ</h2>
      <details>
        <summary>What is an AIWEB plugin?</summary>
        <p>
          An AIWEB plugin connects supported AI experiences with information and actions available
          through the AI Web.
        </p>
      </details>
      <details>
        <summary>What is an AIWEB Page?</summary>
        <p>
          An AIWEB Page is a published AI-native business or media page designed to make structured
          information and supported actions available to AI systems.
        </p>
      </details>
      <details>
        <summary>Do I need AIWEB OS to use AIWEB in ChatGPT?</summary>
        <p>
          No. People can use supported AIWEB plugins independently. AIWEB OS is for businesses and
          creators that want to publish and manage their presence on the AI Web.
        </p>
      </details>
      <details>
        <summary>Do I need ChatGPT Business?</summary>
        <p>
          Not necessarily. The ChatGPT Plugin Directory is visible across plans, but installation
          and available capabilities depend on the user&apos;s plan, region, account and workspace
          configuration.
        </p>
      </details>
      <details>
        <summary>Why is AIWEB disabled in my Business workspace?</summary>
        <p>
          Your organization&apos;s administrator may control plugin and app availability. Ask your
          ChatGPT Business workspace administrator to review AIWEB under{' '}
          <strong>Workspace Settings → Plugins</strong>.
        </p>
      </details>
      <details>
        <summary>Does AIWEB belong to OpenAI?</summary>
        <p>
          No. AIWEB is a product of The AI Web Company. ChatGPT is a third-party platform through
          which supported AIWEB capabilities may be available.
        </p>
      </details>
    </section>
  );
}
