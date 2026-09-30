import { useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { OS_LOGIN_HREF } from '@/components/corp/LandingNavV2';
import { PublisherPricingTable } from '@/components/corp/PublisherPricingTable';
import { PRIVACY_PATH, TERMS_PATH, OS_PATH } from '@/lib/corpSiteRoutes';
import { SITE_ORIGIN } from '@/lib/aiWebCompanyBrand';
import { AIWEB_CALL_FAQS, SITE_CANONICAL_DESCRIPTION } from '@/lib/siteSeo';

type LandingPage = 'home' | 'os';

function sectionHref(hash: string, page: LandingPage) {
  return page === 'home' ? `${OS_PATH}${hash}` : hash;
}

function HeroVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="lv2p-hero-visual"
      src="/videos/cup-collage-animated.mp4"
      poster="/images/promo/aiweb-phonebook-network.png"
      muted
      playsInline
      loop
      preload="metadata"
      aria-label="People and businesses connected in the AIWEB directory"
    />
  );
}

const CHATGPT_AIWEB_PLUGIN_HREF =
  'https://chatgpt.com/plugins/plugin_asdk_app_6a8e85029ad08191b8cd1435be85f221?q=call';
const PHONE_BOOK_HREF = 'https://os.theaiwebcompany.com/call';

const CREATE_CARDS = [
  {
    title: 'Self-improving Page Loop',
    body: 'Auto check the page across all AI models such as ChatGPT, Claude, Gemini, Grok, and Perplexity for easy optimization.',
    image: '/images/promo/aiweb-image-003.png',
    href: '#metrics',
  },
  {
    title: 'Page create and publish',
    body: 'Instantly connect a client brief with a page AI can read.',
    image: '/images/promo/aiweb-image-002.png',
    href: '#os',
  },
  {
    title: 'Instant Offer updates for AI SEO, GEO & AEO',
    body: 'Update a product, price, or photo through plain language.',
    image: '/images/promo/aiweb-image-004.png',
    href: '#pages',
  },
  {
    title: 'Customer calls',
    body: 'Give buyers a direct line from inside the chat to you.',
    image: '/images/promo/aiweb-image-001.png',
    href: '#inbox',
  },
  {
    title: 'HITS for AI SEO',
    body: 'Human and Intelligence Traffic Signals track page performance across bots, AI agents, and humans. How many HITS did your page get this month?',
    image: '/images/promo/aiweb-image-007.png',
    href: '#metrics',
  },
  {
    title: 'Tokens measure input. aiWh measures completed work.',
    body: 'The AI work hour metric shows the full unit clearly: one plain-language request becomes one finished, published, accurate, action-ready page.',
    image: '/images/promo/aiweb-image-026.png?v=1',
    href: '#start',
  },
] as const;

const STORY_STACKS = [
  {
    title: 'Measure',
    rows: [
      ['/images/promo/aiweb-image-011.png'],
      ['/images/promo/aiweb-image-012.png'],
      ['/images/promo/aiweb-image-018.png?v=1'],
      ['/images/promo/aiweb-image-020.png?v=1'],
    ],
  },
] as const;

const MORE_CARDS = [
  {
    kicker: 'ChatGPT',
    title: 'Direct the work where you already type.',
    image: '/images/aiweb-os-screenshot.png',
  },
  {
    kicker: 'Page voice',
    title: 'Build a page that sounds like the client.',
    image: '/images/promo/aiweb-image-025.png',
  },
  {
    kicker: 'Self-improving loop',
    title: 'See the same page the way other models read it.',
    image: '/demo/create-to-publish.png',
  },
] as const;

function Carousel({
  label,
  fade = true,
  count,
  children,
}: {
  label: string;
  fade?: boolean;
  children: ReactNode;
  count: number;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector<HTMLElement>(':scope > * > *');
    if (!viewport || !card) return;
    const gap = Number.parseFloat(getComputedStyle(card.parentElement!).columnGap) || 0;
    const distance = card.getBoundingClientRect().width + gap;
    const max = viewport.scrollWidth - viewport.clientWidth;
    const atStart = viewport.scrollLeft <= 2;
    const atEnd = viewport.scrollLeft >= max - 2;
    const left =
      direction === 1 && atEnd ? 0 : direction === -1 && atStart ? max : viewport.scrollLeft + direction * distance;
    viewport.scrollTo({ left, behavior: 'smooth' });
  };

  return (
    <div className={fade ? 'lv2p-carousel' : 'lv2p-carousel lv2p-carousel--plain'}>
      <div ref={viewportRef} className="lv2p-carousel-viewport" tabIndex={0}>
        <div className="lv2p-carousel-track">{children}</div>
      </div>
      {count > 1 ? (
        <div className="lv2p-carousel-nav">
          <button type="button" aria-label={`Previous ${label}`} onClick={() => scrollByCard(-1)}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" aria-label={`Next ${label}`} onClick={() => scrollByCard(1)}>
            <ChevronRight size={18} />
          </button>
        </div>
      ) : null}
    </div>
  );
}

function ProductBlock({
  id,
  tone,
  title,
  body,
  image,
  imageFirst = false,
  extra,
  learnMoreHref,
}: {
  id: string;
  tone: 'mint' | 'white' | 'black';
  title: string;
  body: string;
  image: string;
  imageFirst?: boolean;
  extra?: { title: string; body: string; image: string };
  learnMoreHref?: string;
}) {
  return (
    <section id={id} className={`lv2p-product lv2p-product--${tone}`}>
      <div className={`lv2p-product-inner${imageFirst ? ' is-image-first' : ''}`}>
        <div>
          <h3>{title}</h3>
          <p>{body}</p>
          <div className="lv2p-product-ctas">
            <a className="lv2p-pill lv2p-pill--fill" href={learnMoreHref ?? `#${id}`}>
              Learn more
            </a>
            <a className="lv2p-pill lv2p-pill--line" href={OS_LOGIN_HREF}>
              Get Started
            </a>
          </div>
        </div>
        <img src={image} alt="" />
      </div>
      {extra ? (
        <div className="lv2p-product-row">
          <img src={extra.image} alt="" />
          <div>
            <h3>{extra.title}</h3>
            <p>{extra.body}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function CreateCtas() {
  return (
    <div className="lv2p-product-ctas lv2p-hero-ctas">
      <a className="lv2p-pill lv2p-pill--fill lv2p-pill--lg" href={OS_LOGIN_HREF}>
        Publish AIWEB Page
      </a>
      <a
        className="lv2p-pill lv2p-pill--line lv2p-pill--lg"
        href={PHONE_BOOK_HREF}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Phone Book
      </a>
    </div>
  );
}

function CreateHeadline() {
  return <h2>Automate the boring stuff — everywhere you create for AI.</h2>;
}

function CreateCarousel({ page }: { page: LandingPage }) {
  return (
    <Carousel label="create steps" fade={false} count={CREATE_CARDS.length}>
      {CREATE_CARDS.map((card) => (
        <article key={card.title} className="lv2p-card">
          <img src={card.image} alt="" />
          <h3>{card.title}</h3>
          <p>{card.body}</p>
          <a href={sectionHref(card.href, page)}>Learn more ›</a>
        </article>
      ))}
    </Carousel>
  );
}

function SitesBlock() {
  return (
    <ProductBlock
      id="sites"
      tone="black"
      title="AIWEB Pages"
      body="Pages that convert — with a conversation."
      image="/images/promo/aiweb-image-022.png"
      learnMoreHref={OS_PATH}
    />
  );
}

function StartSection() {
  return (
    <section className="lv2p-close" id="start">
      <h2>Every great page starts with a conversation.</h2>
      <p className="lv2p-close-lede">Pick a plan, sign in to AIWEB OS, and start publishing.</p>
      <div className="lv2p-pricing">
        <PublisherPricingTable showHeading={false} />
      </div>
      <a className="lv2p-pill lv2p-pill--line" href={OS_LOGIN_HREF}>
        Get Started
      </a>
    </section>
  );
}

function LandingFooter({ page }: { page: LandingPage }) {
  const href = (hash: string) => sectionHref(hash, page);
  return (
    <footer className="lv2p-foot">
      <Link to="/" aria-label="AIWEB home">
        AIWEB
      </Link>
      <a href={page === 'os' ? '#os-top' : '#hero'}>Back to top</a>
      <div className="lv2p-foot-grid">
        <div>
          <p>Product</p>
          <a href={href('#os')}>AIWEB OS</a>
          <a href={href('#pages')}>Self-improving pages</a>
          <a href={href('#inbox')}>Inbox</a>
          <a href={href('#metrics')}>Metrics</a>
        </div>
        <div>
          <p>How we help</p>
          <a href={href('#create')}>Create</a>
          <a href={href('#pages')}>Update</a>
          <a href={page === 'home' ? '#sites' : href('#sites')}>Publish</a>
          <a href={href('#inbox')}>Respond</a>
        </div>
        <div>
          <p>Use cases</p>
          <a href={href('#sized')}>Agencies</a>
          <a href={href('#sized')}>Local business</a>
          <a href={href('#create')}>Retail</a>
          <a href={href('#create')}>Restaurant</a>
        </div>
        <div>
          <p>Partners</p>
          <a href={href('#partners')}>AIWEB for ChatGPT</a>
          <a href={href('#partners')}>Other models</a>
        </div>
      </div>
      <p className="lv2p-legal">© {new Date().getFullYear()} AI Web Company. Draft landing.</p>
    </footer>
  );
}

function OsBody() {
  return (
    <>
      <div className="lv2p-call-next">
        <a className="lv2p-call-next-title" href="#create">
          How To Get On The AIWEB
        </a>
      </div>

      <section id="create" className="lv2p-block">
        <div className="lv2p-phones" aria-hidden>
          <img className="lv2p-phone lv2p-phone--0" src="/images/chatgpt-get-quote.png" alt="" />
          <img className="lv2p-phone lv2p-phone--1" src="/images/aiweb-os-screenshot.png" alt="" />
          <img className="lv2p-phone lv2p-phone--2" src="/demo/create-to-publish-human.png" alt="" />
          <img className="lv2p-phone lv2p-phone--3" src="/images/demo/nbd-janhvi-maxi-dress.png" alt="" />
        </div>
        <ol className="lv2p-hero-steps">
          <li>
            <span className="lv2p-hero-step-label">Step 1</span>
            <span className="lv2p-hero-step-text">Publish an AIWEB Page</span>
          </li>
          <li>
            <span className="lv2p-hero-step-label">Step 2</span>
            <span className="lv2p-hero-step-text">Get listed in the AIWEB Directory</span>
          </li>
          <li>
            <span className="lv2p-hero-step-label">Step 3</span>
            <span className="lv2p-hero-step-text">
              Receive AIWEB Calls in AIWEB Mail—starting with ChatGPT
            </span>
          </li>
        </ol>
        <CreateCtas />
        <CreateHeadline />
        <CreateCarousel page="os" />
      </section>

      <section id="stories" className="lv2p-block">
        <h2>Measure the AI kitchen sink.</h2>
        <Carousel label="stories" fade={false} count={STORY_STACKS.length}>
          {STORY_STACKS.map((stack) => (
            <article key={stack.title} className="lv2p-story">
              {stack.rows.map((row) => (
                <div key={row.join('|')} className="lv2p-story-row">
                  {row.map((src) => (
                    <img key={src} src={src} alt="" />
                  ))}
                </div>
              ))}
            </article>
          ))}
        </Carousel>
        <a className="lv2p-pill lv2p-pill--fill" href={OS_LOGIN_HREF}>
          Get Started
        </a>
      </section>

      <section className="lv2p-block lv2p-block--tight">
        <h2>Tech you know, reimagined.</h2>
      </section>

      <ProductBlock
        id="os"
        tone="mint"
        title="AIWEB OS"
        body="Say hello to the operating system that publishes, not frustrates."
        image="/images/aiweb-os-screenshot.png"
      />
      <ProductBlock
        id="pages"
        tone="white"
        title="Self-improving pages"
        body="Enhance every client page without replacing the site you already run."
        image="/images/promo/aiweb-image-002.png"
        imageFirst
        extra={{
          title: 'Tokens measure input. aiWh measures completed work.',
          body: 'The AI work hour metric shows the full unit clearly: one plain-language request becomes one finished, published, accurate, action-ready page.',
          image: '/images/promo/aiweb-image-026.png?v=1',
        }}
      />
      <SitesBlock />
      <ProductBlock
        id="inbox"
        tone="white"
        title="Buyers message you from ChatGPT"
        body="Respond instantly, without all the work."
        image="/images/chatgpt-get-quote.png"
      />
      <ProductBlock
        id="calls"
        tone="mint"
        title="Calls"
        body="Requests that don't feel like extra work."
        image="/demo/create-to-publish.png"
        imageFirst
      />
      <ProductBlock
        id="metrics"
        tone="white"
        title="Metrics"
        body="Meet the metrics without the spreadsheet."
        image="/demo/metrics-hits.png"
      />

      <section id="partners" className="lv2p-block">
        <h2>Keep ChatGPT — and we'll make it better.</h2>
        <img className="lv2p-wide" src="/images/aiweb-os-screenshot.png" alt="" />
        <article className="lv2p-partner">
          <img src="/images/demo/workers/chatgpt.png" alt="" />
          <div className="lv2p-partner-copy">
            <h3>AIWEB for ChatGPT</h3>
            <p>Direct the work in the browser you already have open.</p>
          </div>
          <div className="lv2p-product-ctas">
            <a
              className="lv2p-pill lv2p-pill--fill"
              href={CHATGPT_AIWEB_PLUGIN_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
            <a
              className="lv2p-pill lv2p-pill--line"
              href={CHATGPT_AIWEB_PLUGIN_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </a>
          </div>
        </article>
      </section>

      <section className="lv2p-block">
        <h2>What else can AIWEB OS do?</h2>
        <Carousel label="capabilities" fade={false} count={MORE_CARDS.length}>
          {MORE_CARDS.map((card) => (
            <article key={card.title} className="lv2p-more">
              <img src={card.image} alt="" />
              <div>
                <p className="lv2p-kicker">{card.kicker}</p>
                <h3>{card.title}</h3>
              </div>
            </article>
          ))}
        </Carousel>
      </section>

      <section id="sized" className="lv2p-block">
        <h2>The right workflow, right-sized for you.</h2>
        <article className="lv2p-size">
          <h3>Agencies</h3>
          <p>One way to deliver AI optimization across every client account.</p>
          <img src="/images/aiweb-os-screenshot.png" alt="" />
        </article>
        <article className="lv2p-size lv2p-size--mint">
          <h3>Local businesses</h3>
          <img src="/images/promo/aiweb-image-023.png" alt="" />
        </article>
        <article className="lv2p-size">
          <h3>Independent operators</h3>
          <img src="/images/promo/aiweb-image-024.png" alt="" />
        </article>
        <div className="lv2p-chips">
          {['Retail', 'Restaurant', 'Services', 'Hospitality', 'Finance', 'Professional'].map(
            (chip) => (
              <a key={chip} href="#create">
                {chip} ›
              </a>
            ),
          )}
        </div>
      </section>

      <section id="resources" className="lv2p-block">
        <h2>Championing change for the teams who publish.</h2>
        <article className="lv2p-resource">
          <img src="/demo/metrics-hits.png" alt="" />
          <h3>AI for the page your customer can act on.</h3>
          <p>A field note on publishing pages assistants can read — article coming.</p>
          <Link to="/blog">Read soon ›</Link>
        </article>
        <Link className="lv2p-pill lv2p-pill--line" to="/blog">
          Visit the resource center
        </Link>
      </section>

      <section id="impact" className="lv2p-impact">
        <h2>So, what's the impact?</h2>
        <p className="lv2p-stat-brand">AIWEB</p>
        <p className="lv2p-stat">3</p>
        <p className="lv2p-stat-label">steps from brief to published page</p>
        <p className="lv2p-stat-brand">models</p>
        <p className="lv2p-stat">5</p>
        <p className="lv2p-stat-label">checks across ChatGPT, Claude, Gemini, Grok, Perplexity</p>
      </section>

      <StartSection />

      <section className="lv2p-news">
        <h2>Get the brief for people who publish, by the people building AIWEB.</h2>
        <form
          className="lv2p-news-form"
          action="mailto:support@theaiwebcompany.com"
          method="post"
          encType="text/plain"
        >
          <input type="email" name="email" placeholder="Business Email" required />
          <button type="submit">Sign Up</button>
        </form>
      </section>
    </>
  );
}

export function LandingParadoxV2({ page = 'home' }: { page?: LandingPage }) {
  if (page === 'os') {
    return (
      <div className="lv2p">
        <section id="os-top" className="lv2p-hero">
          <h1>OS</h1>
        </section>
        <OsBody />
        <LandingFooter page="os" />
      </div>
    );
  }

  return (
    <div className="lv2p">
      <a
        className="lv2p-promo"
        href={CHATGPT_AIWEB_PLUGIN_HREF}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>AIWEB CALL IS NOW LIVE IN CHATGPT</span>
        <span className="lv2p-promo-cta">Try it</span>
      </a>

      <section id="hero" className="lv2p-hero">
        <h1>AIWEB Call is the DM for ChatGPT.</h1>
        <HeroVisual />
        <p className="lv2p-hero-kicker">NO PHONE NUMBER TO DIAL. NO EMAIL ADDRESS TO FIND.</p>
        <p className="lv2p-hero-explain">
          Find a person or business, send them a message from the chat, and track the response in
          AIWEB Mail. We’re starting with ChatGPT and building toward AI assistants broadly.
        </p>
        <div className="lv2p-product-ctas lv2p-hero-ctas">
          <a className="lv2p-pill lv2p-pill--fill lv2p-pill--lg" href={OS_LOGIN_HREF}>
            Become callable
          </a>
          <a
            className="lv2p-pill lv2p-pill--line lv2p-pill--lg"
            href={CHATGPT_AIWEB_PLUGIN_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            Try AIWEB Call
          </a>
        </div>
      </section>

      <section id="call" className="lv2p-call">
        <div className="lv2p-call-head">
          <div className="lv2p-call-brand">
            <img
              className="lv2p-call-mark"
              src="/images/promo/aiweb-call-mark.png"
              alt=""
              width={44}
              height={44}
            />
            <div>
              <h2>AIWEB Call</h2>
              <p>Call through ChatGPT</p>
            </div>
          </div>
          <a
            className="lv2p-call-install"
            href={CHATGPT_AIWEB_PLUGIN_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            Install plugin
          </a>
        </div>
        <div className="lv2p-call-panel">
          {[
            '@AIWEB Call Sue Storm.',
            '@AIWEB Call a caterer for 80 guests this Saturday.',
            '@AIWEB Call three caterers for the same dinner.',
          ].map((prompt) => (
            <a
              key={prompt}
              className="lv2p-call-prompt"
              href={CHATGPT_AIWEB_PLUGIN_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{prompt}</span>
              <span className="lv2p-call-prompt-go" aria-hidden>
                →
              </span>
            </a>
          ))}
        </div>
        <div className="lv2p-call-copy">
          <p>{SITE_CANONICAL_DESCRIPTION}</p>
          <p>
            An AIWEB Page is a callable identity. The AIWEB Directory is the public discovery layer.
            AIWEB Mail is where recipients track messages and respond. The sender receives an AIWEB
            Receipt.
          </p>
          <p>
            Technical note: Voice over AI (VoA) is the communication model underneath—resolve by
            name or by intention, and continue the same Receipt for follow-ups. The app does not take
            payment or Instant Checkout in ChatGPT.
          </p>
        </div>
        <div className="lv2p-call-meta">
          <div className="lv2p-call-meta-block">
            <h3>App</h3>
            <div className="lv2p-call-meta-app">
              <img src="/images/promo/aiweb-call-mark.png" alt="" width={28} height={28} />
              <span>AIWEB Call</span>
            </div>
          </div>
          <div className="lv2p-call-meta-block">
            <h3>Information</h3>
            <dl className="lv2p-call-meta-list">
              <div>
                <dt>Developer</dt>
                <dd>AIWEB</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>Business &amp; Operations</dd>
              </div>
              <div>
                <dt>Website</dt>
                <dd>
                  <a href={SITE_ORIGIN} target="_blank" rel="noopener noreferrer" aria-label="Website">
                    <ExternalLink size={16} strokeWidth={1.75} />
                  </a>
                </dd>
              </div>
              <div>
                <dt>Version</dt>
                <dd>1.0.0</dd>
              </div>
              <div>
                <dt>Privacy Policy</dt>
                <dd>
                  <Link to={PRIVACY_PATH} aria-label="Privacy Policy">
                    <ExternalLink size={16} strokeWidth={1.75} />
                  </Link>
                </dd>
              </div>
              <div>
                <dt>Terms of Service</dt>
                <dd>
                  <Link to={TERMS_PATH} aria-label="Terms of Service">
                    <ExternalLink size={16} strokeWidth={1.75} />
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <p className="lv2p-call-notice">
          When connected to AIWEB Call, ChatGPT may share relevant chats and memories with this app
          to help provide context for your requests. AIWEB Call’s use of this data is subject to
          their{' '}
          <a href="https://theaiwebcompany.com/terms" target="_blank" rel="noopener noreferrer">
            terms
          </a>{' '}
          and{' '}
          <a href="https://theaiwebcompany.com/privacy" target="_blank" rel="noopener noreferrer">
            privacy policy
          </a>
          . If you have{' '}
          <a
            href="https://help.openai.com/en/articles/8590148-memory-in-chatgpt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Memory
          </a>{' '}
          enabled, data from the app may be used to proactively provide helpful information or
          suggestions. ChatGPT always respects your training data preferences, including for data
          from connected apps. Use of apps may come with{' '}
          <a
            href="https://help.openai.com/en/articles/20001062-elevated-risk-labels"
            target="_blank"
            rel="noopener noreferrer"
          >
            elevated risk
          </a>
          . You can manage your preferences or disconnect from apps anytime in your settings.{' '}
          <a
            href="https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </p>
      </section>

      <section id="faq" className="lv2p-block lv2p-faq">
        <h2>Questions about AIWEB Call</h2>
        <dl className="lv2p-faq-list">
          {AIWEB_CALL_FAQS.map((item) => (
            <div key={item.question} className="lv2p-faq-item">
              <dt>{item.question}</dt>
              <dd>{item.answer}</dd>
            </div>
          ))}
        </dl>
        <div className="lv2p-faq-entities">
          <h3>AIWEB entities</h3>
          <ul>
            <li>
              <strong>AIWEB Page</strong> — callable identity
            </li>
            <li>
              <strong>AIWEB Directory</strong> — public discovery layer
            </li>
            <li>
              <strong>AIWEB Call</strong> — the DM for ChatGPT (asynchronous message from chat)
            </li>
            <li>
              <strong>AIWEB Mail</strong> — recipient inbox and response tracking
            </li>
            <li>
              <strong>AIWEB Receipt</strong> — sender delivery record
            </li>
            <li>
              <strong>Calling Card</strong> — in-conversation interface
            </li>
          </ul>
          <p className="lv2p-faq-vcap">
            Agent tool sequence: <code>search_directory</code> → <code>prepare_call</code> →{' '}
            <code>send_call</code> → <code>get_receipt</code>. Call mode is asynchronous text with
            user confirmation.
          </p>
        </div>
      </section>

      <section id="create" className="lv2p-block">
        <CreateCtas />
        <CreateHeadline />
        <CreateCarousel page="home" />
      </section>

      <SitesBlock />
      <StartSection />
      <LandingFooter page="home" />
    </div>
  );
}
