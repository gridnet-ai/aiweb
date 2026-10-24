import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  HeartPulse,
  Home,
  Landmark,
  Mail,
  Network,
  Package,
  Phone,
  Scale,
  Send,
  Shield,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import { CHATGPT_AIWEB_PLUGIN_HREF } from '@/components/corp/LandingNavV2';
import { businessCheckoutUrl } from '@/lib/stripeCheckout';
import { PublisherPricingTable } from '@/components/corp/PublisherPricingTable';
import { PRIVACY_PATH, TERMS_PATH, OS_PATH } from '@/lib/corpSiteRoutes';
import { SITE_ORIGIN } from '@/lib/aiWebCompanyBrand';
import { AIWEB_CALL_FAQS } from '@/lib/siteSeo';
import { WelcomeCloudCarousel } from '@/components/WelcomeCloudCarousel';

type LandingPage = 'home' | 'os' | 'plugin';

const LEAD_TARGETS = ['Chat GPT', 'Muse', 'Claude', 'Grok', 'Anthropic', 'Internet'] as const;

function HeroDmHeadline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % LEAD_TARGETS.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  const active = LEAD_TARGETS[index];

  return (
    <h1
      className="lv2p-hero-dm"
      aria-label={`Spend less money generating more leads from ${active}`}
    >
      <span className="lv2p-hero-dm-fixed">Spend less money generating more leads from&nbsp;</span>
      <span className="lv2p-hero-dm-rotator" aria-hidden="true">
        {LEAD_TARGETS.map((name, i) => (
          <span key={name} className={i === index ? 'is-active' : undefined}>
            {name}
          </span>
        ))}
      </span>
    </h1>
  );
}

function HeroHowItWorks() {
  return (
    <div className="lv2p-hero-how">
      <img
        className="lv2p-hero-how-mark"
        src="/images/promo/aiweb-phone-bear-lockup.png"
        alt="AIWEB Phone"
      />
      <h2 className="lv2p-hero-how-title">How it works</h2>
      <p className="lv2p-hero-how-body">
        Just prompt your AI assistant <span className="lv2p-hero-how-mono">@AIWEB</span> and the 12
        digit number <span className="lv2p-hero-how-mono">IRL-000-000-000-000</span>
        <br />
        example <span className="lv2p-hero-how-mono">@AIWEB IRL-123-456-789-000</span>
      </p>
    </div>
  );
}

function sectionHref(hash: string, page: LandingPage) {
  return page === 'home' ? `${OS_PATH}${hash}` : hash;
}

const PHONE_BOOK_HREF = 'https://os.theaiwebcompany.com/call';

const ENTITY_FAQS = [
  {
    question: 'AIWEB Phone',
    answer:
      'Your number on the AIWEB. A 12-digit IRL address (IRL-###-###-###-###) issued after payment — not a carrier telephone number.',
  },
  {
    question: 'IRL number',
    answer:
      'Twelve digits in four groups: IRL-###-###-###-###. Example IRL-123-456-789-000. Share it so assistants can address a Call with @AIWEB plus that number.',
  },
  { question: 'AIWEB Page', answer: 'A callable identity on the AIWEB.' },
  { question: 'AIWEB Directory', answer: 'The public discovery layer agents and humans can search.' },
  {
    question: 'AIWEB Call',
    answer:
      'An asynchronous message from an AI assistant to an AIWEB identity — the DM for AI assistants. Not a PSTN telephone call.',
  },
  { question: 'AIWEB Mail', answer: 'Recipient inbox and response tracking for inbound Calls.' },
  { question: 'AIWEB Receipt', answer: 'The sender’s delivery record.' },
  { question: 'Calling Card', answer: 'The in-conversation interface for a Call.' },
] as const;

const HERO_STORY = [
  {
    src: '/images/promo/aiweb-call-hero-suppliers.png',
    alt: 'ChatGPT compares packaging suppliers on AIWEB Calling Cards, from telling ChatGPT what you need through checking AIWEB Mail.',
  },
  {
    src: '/images/promo/aiweb-call-hero-receipt.png',
    alt: 'An AIWEB Receipt confirms the Call to Meridian Packaging was delivered.',
  },
] as const;

const HERO_MAIL = {
  src: '/images/promo/aiweb-call-hero-mail.png',
  alt: 'AIWEB Mail keeps the same Call going after one sync, from the inbox into the conversation.',
} as const;

const INDUSTRY_ICONS: readonly { label: string; Icon: LucideIcon }[] = [
  { label: 'Healthcare', Icon: HeartPulse },
  { label: 'Finance', Icon: Landmark },
  { label: 'Insurance', Icon: Shield },
  { label: 'Logistics', Icon: Truck },
  { label: 'IT managed services', Icon: Network },
  { label: 'Legal', Icon: Scale },
  { label: 'Supply Chain', Icon: Package },
  { label: 'Real Estate', Icon: Home },
] as const;

function IndustrySearchGrid() {
  return (
    <div className="lv2p-industry" aria-label="Find your industry">
      <h3 className="lv2p-industry-title">Find your industry</h3>
      <ul className="lv2p-industry-grid">
        {INDUSTRY_ICONS.map(({ label, Icon }) => (
          <li key={label} className="lv2p-industry-item">
            <span className="lv2p-industry-icon" aria-hidden>
              <Icon strokeWidth={1.6} />
            </span>
            <span className="lv2p-industry-label">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HeroStory({ pitch = true }: { pitch?: boolean }) {
  return (
    <div className="lv2p-hero-story">
      <WelcomeCloudCarousel className="lv2p-hero-story-clouds" />
      <div className="lv2p-hero-story-lead">
        <h2 className="lv2p-hero-story-title">
          Healthcare industry trends with AI assistants discovery{' '}
          <span className="lv2p-hero-story-stat" aria-label="up 36 percent">
            <ArrowUp className="lv2p-hero-story-arrow" strokeWidth={2.4} aria-hidden />
            36%
          </span>
        </h2>
        <p className="lv2p-hero-story-follow">
          We provide the phone and phone book to AI assistants.
        </p>
        <ul className="lv2p-hero-routes" aria-label="Mailbox routes">
          <li>AI assistant → mailbox</li>
          <li>mailbox → AI assistant</li>
          <li>Internet → mailbox</li>
          <li>mailbox → mailbox</li>
        </ul>
      </div>
      <IndustrySearchGrid />
      {HERO_STORY.map((image) => (
        <img key={image.src} src={image.src} alt={image.alt} />
      ))}
      {pitch ? (
        <>
      <p className="lv2p-hero-stat">
        <strong>1.2 billion+</strong>
        people using ChatGPT each week.
      </p>
      <div className="lv2p-hero-reach">
        <p className="lv2p-hero-reach-q">When they need what you sell, can they reach you?</p>
        <img
          className="lv2p-hero-reach-photo"
          src="/images/promo/aiweb-call-hero-reach.jpg"
          alt="A business owner reads a new AIWEB Call from Northstar Retail requesting pricing on 10,000 custom shipping boxes."
        />
        <div className="lv2p-hero-reach-steps">
          <p>Three easy steps</p>
          <ol>
            <li>
              <span className="lv2p-step-icon" aria-hidden>
                <Mail strokeWidth={1.75} />
              </span>
              Get our AIWEB Phone number
            </li>
            <li>
              <span className="lv2p-step-icon" aria-hidden>
                <Phone strokeWidth={1.75} />
              </span>
              Get a call from AI Assistant users
            </li>
            <li>
              <span className="lv2p-step-icon" aria-hidden>
                <Send strokeWidth={1.75} />
              </span>
              Answer questions, send quotes and more!
            </li>
          </ol>
        </div>
      </div>
        </>
      ) : null}
    </div>
  );
}

function HeroMail({ full = true }: { full?: boolean }) {
  return (
    <figure className="lv2p-hero-mail">
      <WelcomeCloudCarousel />
      <img
        className="lv2p-hero-mail-mark"
        src="/images/promo/aiweb-phone-bear-lockup.png"
        alt="AIWEB Phone"
      />
      <h2>Get on the AIWEB</h2>
      {full ? <img src={HERO_MAIL.src} alt={HERO_MAIL.alt} /> : null}
    </figure>
  );
}

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
    href: '#seller',
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
            <a className="lv2p-pill lv2p-pill--line" href={businessCheckoutUrl()}>
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
      <a className="lv2p-pill lv2p-pill--fill lv2p-pill--lg" href={businessCheckoutUrl()}>
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

function CallPrompts() {
  return (
    <>
      <h2 className="lv2p-plugin-live">
        <img className="lv2p-start-mark" src="/images/promo/chatgpt-mark.png" alt="" />
        Plugin live on Chat GPT!
      </h2>
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
          'Find suppliers for 10,000 custom shipping boxes.',
          'Ask Meridian Packaging for pricing.',
          'Check my AIWEB Mail.',
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
    </>
  );
}

function StartSection() {
  return (
    <section className="lv2p-close" id="seller">
      <img
        className="lv2p-close-logo"
        src="/images/promo/aiweb-seller-logo.png?v=3"
        alt="SELLER"
      />
      <div className="lv2p-pricing">
        <PublisherPricingTable showHeading={false} planIds={['phone']} />
      </div>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="lv2p-foot">
      <div className="lv2p-call-meta">
        <div className="lv2p-call-meta-block">
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
        <a className="lv2p-pill lv2p-pill--fill" href={businessCheckoutUrl()}>
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

function FaqSection() {
  return (
    <section id="faq" className="lv2p-block lv2p-faq">
      <h2>Questions about AIWEB</h2>
      <div className="lv2p-faq-list">
        {AIWEB_CALL_FAQS.map((item) => (
          <details key={item.question} className="lv2p-faq-item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
        {ENTITY_FAQS.map((item) => (
          <details key={item.question} className="lv2p-faq-item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
        <details className="lv2p-faq-item">
          <summary>What is the agent tool sequence?</summary>
          <p>
            When MCP is connected: <code>search_directory</code> → <code>prepare_call</code> →{' '}
            <code>send_call</code> → <code>get_receipt</code>. Call mode is asynchronous text with
            user confirmation. Without tools, prompt <code>@AIWEB IRL-###-###-###-###</code> (example{' '}
            <code>@AIWEB IRL-123-456-789-000</code>). Full VCAP: <code>/vcap.json</code>.
          </p>
        </details>
      </div>
    </section>
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
        <LandingFooter />
      </div>
    );
  }

  if (page === 'plugin') {
    return (
      <div className="lv2p">
        <section id="hero" className="lv2p-hero">
          <HeroDmHeadline />
          <HeroHowItWorks />
          <HeroStory pitch={false} />
        </section>
        <section id="call" className="lv2p-call">
          <HeroMail full={false} />
        </section>
        <section className="lv2p-plugin" aria-label="AIWEB Call">
          <CallPrompts />
        </section>
        <FaqSection />
        <LandingFooter />
      </div>
    );
  }

  return (
    <div className="lv2p">
      <WelcomeCloudCarousel />
      <section id="hero" className="lv2p-hero">
        <div className="lv2p-hero-lead">
          <img
            className="lv2p-hero-mailbox lv2p-hero-mailbox--for-dark"
            src="/images/promo/aiweb-mailbox-lightmode.png"
            alt="AIWEB Mail inbox with direct messages from ChatGPT, Claude, Gemini, Grok, and the web."
          />
          <img
            className="lv2p-hero-mailbox lv2p-hero-mailbox--for-light"
            src="/images/promo/aiweb-mailbox-darkmode.png"
            alt="AIWEB Mail inbox with direct messages from ChatGPT, Claude, Gemini, Grok, and the web."
          />
          <HeroDmHeadline />
        </div>
        <HeroHowItWorks />
        <HeroStory />
      </section>

      <section id="call" className="lv2p-call">
        <HeroMail />
      </section>

      <StartSection />
      <section className="lv2p-plugin" aria-label="AIWEB Call">
        <CallPrompts />
      </section>
      <FaqSection />
      <LandingFooter />
    </div>
  );
}
