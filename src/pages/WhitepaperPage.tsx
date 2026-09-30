import { useEffect, useState } from 'react';
import AIWebLogo from '@/components/welcome/AIWebLogo';
import { DEFAULT_PAGE_TITLE } from '@/lib/siteSeo';
import { useWhitepaperMachine } from '@/lib/whitepaperMachine';
import './whitepaper.css';

const SECTIONS = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'attention', label: 'From attention' },
  { id: 'boundary', label: 'Boundary of the chat' },
  { id: 'addresses', label: 'Addresses' },
  { id: 'both-sides', label: 'Both intentions' },
  { id: 'route', label: 'Route-by-intention' },
  { id: 'voa', label: 'Voice over AI' },
  { id: 'receipt', label: 'Token-based security' },
  { id: 'moa', label: 'Media over AI' },
  { id: 'mail', label: 'Mail server' },
  { id: 'publisher', label: 'AIWEB OS' },
  { id: 'lines', label: 'Pages to lines' },
  { id: 'markets', label: 'Intention markets' },
  { id: 'traction', label: 'Letter to video' },
  { id: 'meter', label: 'Metering the line' },
  { id: 'close', label: 'Close' },
] as const;

export function WhitepaperPage() {
  const [current, setCurrent] = useState<string>(SECTIONS[0].id);
  useWhitepaperMachine();

  useEffect(() => {
    document.title = 'Intention Is All You Need — AIWEB';
    document.documentElement.classList.add('wp-html');
    return () => {
      document.title = DEFAULT_PAGE_TITLE;
      document.documentElement.classList.remove('wp-html');
    };
  }, []);

  useEffect(() => {
    const nodes = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setCurrent(visible.target.id);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.2, 0.5, 1] },
    );
    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="wp-root">
      <a className="wp-skip" href="#abstract">
        Skip to paper
      </a>
      <header className="wp-chrome">
        <a className="wp-chrome-brand" href="/whitepaper" aria-label="AIWEB">
          <AIWebLogo width={118} className="wp-chrome-logo" />
        </a>
      </header>

      <div className="wp-shell">
        <nav className="wp-toc" aria-label="Contents">
          <p className="wp-toc-label">Contents</p>
          <ol>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} aria-current={current === s.id ? 'true' : undefined}>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="wp-article">
          <header className="wp-hero">
            <h1 className="wp-title">Intention Is All You Need</h1>
            <p className="wp-subtitle">
              Voice over AI (VoA): Two-way communication between ChatGPT users and the world.
            </p>
            <p className="wp-lede">
              Traditional communications route by address. AIWEB can{' '}
              <mark className="wp-hl">route-by-intention</mark>.
            </p>
          </header>

          <section className="wp-section" id="abstract">
            <h2>Abstract</h2>
            <p>The web was built around addresses.</p>
            <p>
              A person enters a URL, sends an email to an address, dials a telephone number, or
              searches for a set of keywords. Even modern digital communication largely assumes that
              the sender either knows the destination or relies on an intermediary to help locate
              it.
            </p>
            <p>Artificial intelligence changes that assumption.</p>
            <p>
              A user interacting with ChatGPT can express something more useful than an address or
              keyword: an intention.
            </p>
            <blockquote className="wp-quote">
              <p>“I need commercial insurance for a roofing company in Texas.”</p>
              <p className="wp-quote-cap">ChatGPT user intention</p>
            </blockquote>
            <p>At the same time, a business can express its own intention:</p>
            <blockquote className="wp-quote">
              <p>“We want to provide commercial insurance to roofing companies in Texas.”</p>
              <p className="wp-quote-cap">Business intention</p>
            </blockquote>
            <p>
              When both sides can express intention in machine-understandable form, communication no
              longer has to begin with an address. It can begin with a desired outcome.
            </p>
            <p>
              We call this <mark className="wp-hl">route-by-intention</mark>.
            </p>
            <p>
              AIWEB explores an architecture in which AI systems route a user&apos;s intention to
              compatible business intentions, establish a user-initiated, token-based communication
              line, and allow
              information to travel between the AI conversation and the external business.
            </p>
            <p>
              The communication layer is Voice over AI (VoA): a model for two-way communication
              outside the chat. Voice over AIWEB is AIWEB&apos;s implementation of that model — a
              phone service for ChatGPT, and eventually a mail server for ChatGPT. Voice means
              communication outside the chat, not necessarily audio.
            </p>
            <p className="wp-pull">
              The user shouldn&apos;t have to know the address. The user should only have to know
              their intention.
            </p>
            <p>
              The result is a transition from a web that is primarily machine-readable to one that
              is machine-functional: a web where AI can discover, communicate, experience, and act
              across published intentions.
            </p>
          </section>

          <section className="wp-section" id="attention">
            <h2>1. From Attention to Intention</h2>
            <p>
              The transformer era established attention as one of the foundational mechanisms of
              modern artificial intelligence. Attention helps a model determine: what information
              matters?
            </p>
            <p>
              As AI systems move from generating information toward accomplishing real-world tasks,
              another question becomes increasingly important: what does the user intend to
              accomplish?
            </p>
            <p>Consider the difference.</p>
            <p>
              Traditional search: <code>commercial insurance roofing texas</code>
            </p>
            <p>
              Conversational AI: “I own a roofing company in San Antonio with 12 employees. We need
              general liability and workers&apos; compensation insurance before beginning a new
              contract next month.”
            </p>
            <p>
              The second interaction contains considerably more than keywords. It expresses an
              intention. The user&apos;s objective, constraints, location, timing, requirements, and
              desired outcome exist within the conversation. Modern AI can understand much of that
              intention. The missing infrastructure is what happens next.
            </p>
            <p className="wp-flow" aria-label="Progression from attention to action">
              <span>Attention</span>
              <span aria-hidden>→</span>
              <span>Understanding</span>
              <span aria-hidden>→</span>
              <span>Intention</span>
              <span aria-hidden>→</span>
              <span>Action</span>
            </p>
            <p>
              Attention helps AI understand the conversation. Intention tells it what needs to
              happen outside the conversation.
            </p>
          </section>

          <section className="wp-section" id="boundary">
            <h2>2. The Boundary of the Chat</h2>
            <p>AI can talk to the user. Much of the information required to complete the user&apos;s intention exists outside the model.</p>
            <p>Only the business may know:</p>
            <ul>
              <li>whether a product is actually available;</li>
              <li>whether a date is open;</li>
              <li>what a particular configuration costs;</li>
              <li>whether it serves the customer&apos;s location;</li>
              <li>whether it can satisfy unusual requirements;</li>
              <li>whether it wants the business;</li>
              <li>what the next step should be.</li>
            </ul>
            <p>
              The AI can search available information. It can reason. It can recommend. Eventually
              it encounters a boundary: the AI needs to communicate with someone outside the
              conversation.
            </p>
            <p>
              Today, the burden frequently returns to the user. Visit the website. Find the contact
              page. Fill out the form. Call the business. Send an email. Wait. Return to ChatGPT.
              Explain what happened.
            </p>
            <p>
              The AI conversation effectively stops at the point where real-world business
              communication begins.
            </p>
          </section>

          <section className="wp-section" id="addresses">
            <h2>3. Addresses Were Necessary</h2>
            <p>Traditional communication networks solve routing primarily through addresses.</p>
            <p>
              A telephone network routes <code>210-555-0100</code>. A mail server routes{' '}
              <code>sales@example.com</code>. The web routes <code>https://example.com</code>.
            </p>
            <p>
              These systems work extraordinarily well. They generally require some representation of
              where communication should go.
            </p>
            <p>AI introduces another possibility. The user may not know the destination. They may only know what they want.</p>
            <ul>
              <li>“I need eight H200 GPUs delivered within 30 days.”</li>
              <li>“Find a venue for 100 people in Honolulu.”</li>
              <li>“I need an attorney who handles this type of dispute.”</li>
              <li>“My equipment is displaying error E17. Ask the manufacturer what I should do.”</li>
            </ul>
            <p>
              The user has provided no phone number. No email address. Perhaps not even a business
              name. They have provided something potentially more useful: intention.
            </p>
            <p>
              Exchange remains a useful mental model on this point. Traditional business
              communication — email, phone — <strong>routes by address</strong>. AIWEB can{' '}
              <mark className="wp-hl">route-by-intention</mark>.
            </p>
            <div className="wp-compare">
              <div className="wp-card">
                <p className="wp-card-kicker">Email</p>
                <p className="wp-card-example">
                  “Email <code>sales@company.com</code>”
                </p>
                <p className="wp-card-cap">Know the destination</p>
              </div>
              <div className="wp-card wp-card--aiweb">
                <p className="wp-card-kicker">AIWEB</p>
                <p className="wp-card-example">
                  “I need commercial insurance for a roofing company in Texas.”
                </p>
                <p className="wp-card-cap">Describe the need</p>
              </div>
            </div>
          </section>

          <section className="wp-section" id="both-sides">
            <h2>4. Businesses Have Intentions Too</h2>
            <p>
              Buyer intent is already a familiar commercial concept. AI creates an opportunity to
              model intention on both sides of a transaction.
            </p>
            <p>
              A capability only says “I can do this.” Business intention says “I want customers
              looking for this to contact me.” That is commercially important.
            </p>
            <p>
              A law firm may technically be capable of handling many kinds of cases while actively
              seeking only certain matters. An insurance broker may support dozens of industries
              while specifically seeking roofing contractors in Texas. A supplier may carry hundreds
              of products while currently wanting to sell a particular configuration that is in
              stock.
            </p>
            <ul>
              <li>
                <strong>User intention</strong> — what I intend to accomplish.
              </li>
              <li>
                <strong>Business intention</strong> — what we intend to provide.
              </li>
            </ul>
            <p>
              Search advertising often asks businesses to approximate customer intention by
              selecting keywords, audiences, demographics, bids, and campaigns. A machine-functional
              business can instead publish its intentions directly.
            </p>
            <p>
              Then AIWEB connects them: users express what they intend to accomplish; businesses
              publish what they intend to provide; Voice over AIWEB opens the line.
            </p>
          </section>

          <section className="wp-section" id="route">
            <h2>5. Route-by-intention</h2>
            <p>Once both sides can express intention, a new routing model becomes possible.</p>
            <p>
              Traditional communications: Sender → Address → Receiver.
            </p>
            <p>
              AIWEB: User Intention → Business Intention → Match → Route → Communication.
            </p>
            <p>
              The user does not necessarily need to know who should receive the communication.
              ChatGPT can understand what the user intends to accomplish. Businesses publish what
              they intend to provide. The network determines which business lines are relevant. The
              AI can present those destinations to the user or, when authorized, initiate
              communication.
            </p>
            <div className="wp-model" aria-label="User intention matches business intention through VoA">
              <div className="wp-model-col">
                <p className="wp-model-kicker">ChatGPT user</p>
                <p className="wp-model-name">Intention</p>
                <p className="wp-model-body">What I intend to accomplish.</p>
              </div>
              <span className="wp-model-arrow" aria-hidden>
                ↔
              </span>
              <div className="wp-model-col wp-model-col--hub">
                <p className="wp-model-kicker">Voice over AIWEB</p>
                <p className="wp-model-name">Route-by-intention</p>
                <p className="wp-model-body">Matches and routes compatible intentions. Opens the line.</p>
              </div>
              <span className="wp-model-arrow" aria-hidden>
                ↔
              </span>
              <div className="wp-model-col">
                <p className="wp-model-kicker">Business</p>
                <p className="wp-model-name">Intention</p>
                <p className="wp-model-body">What I intend to provide.</p>
              </div>
            </div>
            <p>
              Example: “I need commercial insurance for a roofing company in Texas.” Business A
              publishes commercial insurance → roofing → Texas. Business B publishes commercial
              insurance → restaurants → Texas. Business C publishes commercial insurance → roofing →
              Florida. The appropriate routing relationship emerges from the correspondence between
              intentions — not primarily from keywords.
            </p>
          </section>

          <section className="wp-section" id="voa">
            <h2>6. Voice over AI</h2>
            <p>Understanding the destination is only half of the problem. AI needs a communications layer.</p>
            <p>
              <strong>Voice over AI (VoA)</strong> is a communications model that enables AI systems
              to establish communication outside the chat.{' '}
              <strong>Voice over AIWEB</strong> is AIWEB&apos;s implementation of that model, using
              route-by-intention to connect user intentions with business intentions.
            </p>
            <p>
              VoA creates a user-initiated, two-party communication line between an AI user and an
              external business. AIWEB provides route-by-intention, token-based secure
              communication, message transport, and persistence for that line.
            </p>
            <p>
              “Voice” does not necessarily mean audio. It means giving ChatGPT a voice outside its
              own conversation — the ability to communicate with another party on the user&apos;s
              behalf.
            </p>
            <p>
              The useful customer and investor analogy is a{' '}
              <strong>phone service for ChatGPT</strong>. VoIP gave applications a way to carry
              voice over internet networks. VoA gives AI systems a way to establish two-way
              business communication outside the model.
            </p>
            <p>A user expresses an intention:</p>
            <blockquote className="wp-quote">
              <p>“I need insurance for my roofing company.”</p>
              <p className="wp-quote-cap">ChatGPT user intention</p>
            </blockquote>
            <p>A business publishes an intention:</p>
            <blockquote className="wp-quote">
              <p>“We want to provide commercial insurance to roofing companies.”</p>
              <p className="wp-quote-cap">Business intention</p>
            </blockquote>
            <p>AIWEB performs route-by-intention, and VoA establishes the communication.</p>
            <p className="wp-flow" aria-label="Intention routing">
              <span>User Intention</span>
              <span aria-hidden>→</span>
              <span>Route-by-intention</span>
              <span aria-hidden>→</span>
              <span>Business Intention</span>
            </p>
            <p>Then:</p>
            <p className="wp-flow" aria-label="Call, Receipt, Callback">
              <span>Call</span>
              <span aria-hidden>→</span>
              <span>Receipt</span>
              <span aria-hidden>→</span>
              <span>Callback</span>
            </p>
            <p>
              The defining characteristic is that another party is involved. Information crosses the
              boundary of ChatGPT, reaches a business, and can return.
            </p>
            <p>
              Search is one-way: request → result. VoA is two-way: Call → Callback → continued
              communication.
            </p>
            <p className="wp-flow" aria-label="AIWEB sits between the ChatGPT user and the business">
              <span>ChatGPT User</span>
              <span aria-hidden>↔</span>
              <span>AIWEB</span>
              <span aria-hidden>↔</span>
              <span>Business</span>
            </p>
            <p>
              At the network level, AIWEB sits in the middle. At the communication-relationship
              level, the line is two-party: an AI user and an external business.
            </p>
            <p>
              The user authorizes ChatGPT to contact a business. That Call opens a Receipt — the
              persistent line. The business can then send a Callback. Additional messages continue
              over the same line.
            </p>
          </section>

          <section className="wp-section" id="receipt">
            <h2>7. Token-Based Secure Communication</h2>
            <p>
              Voice over AIWEB implements Voice over AI using user-initiated, token-based
              communication. A business cannot
              initiate communication with a ChatGPT user. When the user makes a Call, AIWEB creates
              a unique Receipt representing the authorized communication line. The business can
              Callback through that line until its authorization expires, is revoked, or is deleted.
            </p>
            <div className="wp-life" aria-label="Token-based communication architecture">
              <span>User initiates Call</span>
              <span aria-hidden>↓</span>
              <span>Receipt created</span>
              <span aria-hidden>↓</span>
              <span>Communication authorized</span>
              <span aria-hidden>↓</span>
              <span>Business can Callback</span>
              <span aria-hidden>↓</span>
              <span>Receipt expires / revoked / deleted</span>
              <span aria-hidden>↓</span>
              <span>Communication closed</span>
            </div>
            <p>
              Route-by-intention creates a new way for AI to reach the business world. It also
              creates an important security question:
            </p>
            <p>
              If AI can determine which business should receive a communication, what prevents that
              capability from becoming another channel for unsolicited communication?
            </p>
            <p>
              Token-Based Secure Communication answers that question. Communication is
              user-initiated. Authorization is Receipt-backed. The communication line is revocable.
            </p>
            <p>
              The business cannot initiate communication with a ChatGPT user simply because the
              business is discoverable through AIWEB. Discovery does not create permission to
              communicate.
            </p>
            <p className="wp-pull">The ChatGPT user must open the line first.</p>

            <h3>The user opens the line</h3>
            <p>
              A communication begins when the ChatGPT user expresses an intention and authorizes
              AIWEB to make a Call.
            </p>
            <p>For example:</p>
            <blockquote className="wp-quote">
              <p>“I need commercial insurance for a roofing company in Texas.”</p>
              <p className="wp-quote-cap">ChatGPT user intention</p>
            </blockquote>
            <p>
              AIWEB can use route-by-intention to identify a business whose published intention
              corresponds with the user&apos;s intention.
            </p>
            <p>If the user chooses to proceed, the Call is sent and AIWEB creates a unique Receipt.</p>
            <p className="wp-flow" aria-label="From user intention to Receipt">
              <span>User Intention</span>
              <span aria-hidden>→</span>
              <span>Route-by-intention</span>
              <span aria-hidden>→</span>
              <span>Business</span>
              <span aria-hidden>→</span>
              <span>Call</span>
              <span aria-hidden>→</span>
              <span>Receipt</span>
            </p>
            <p>The creation of the Receipt changes the state of the relationship.</p>
            <p>
              Before the Call, the business may be discoverable, but it has no communication line to
              that ChatGPT user.
            </p>
            <p>After the Call, an authorized line exists between the user and the receiving business.</p>

            <h3>The Receipt is the line</h3>
            <p>The AIWEB Receipt is more than a confirmation that a Call occurred.</p>
            <p>It represents the persistent communication relationship created by that Call.</p>
            <p>
              The Receipt associates the original intention, the receiving business, the requester,
              subsequent messages, and the authorization state of the line.
            </p>
            <p>The Receipt represents the token-based authorization relationship.</p>
            <p className="wp-pull">The Call opens the line. Receipt-backed authorization governs the line.</p>
            <p>
              The receiving business may now respond with a Callback, but only through the line the
              user established.
            </p>
            <div className="wp-linepair" aria-label="Call and Callback travel on the same Receipt">
              <p className="wp-flow">
                <span>ChatGPT User</span>
                <span aria-hidden>→</span>
                <span>Call</span>
                <span aria-hidden>→</span>
                <span>Receipt</span>
                <span aria-hidden>→</span>
                <span>Business</span>
              </p>
              <p className="wp-flow">
                <span>ChatGPT User</span>
                <span aria-hidden>←</span>
                <span>Callback</span>
                <span aria-hidden>←</span>
                <span>Receipt</span>
                <span aria-hidden>←</span>
                <span>Business</span>
              </p>
            </div>
            <p>
              Additional questions, answers, updates, quotes, support messages, or other
              communications can remain associated with the same Receipt rather than creating a new
              communication relationship for every message.
            </p>
            <p>The Receipt therefore provides both continuity and Receipt-backed authorization.</p>
            <p>
              That distinction also allows AI communication to become asynchronous. A user can make
              a Call and leave. The business can respond later. The user can return and ask “Any
              updates?” ChatGPT checks the existing line.
            </p>
            <p>
              This resembles voicemail more than a conventional web form. The caller leaves a
              message. The receiver responds when available. The communication persists even though
              both parties were not present simultaneously.
            </p>

            <h3>The Receipt identifier is not the credential</h3>
            <p>
              The public Receipt ID identifies the line. It should not itself be treated as the
              secret that secures the communication.
            </p>
            <p>The Receipt represents the token-based authorization relationship.</p>
            <p>
              The actual security token can be cryptographic, signed, scoped, authenticated,
              rotated, or otherwise implemented as the system requires. The public Receipt ID can
              remain a reference.
            </p>
            <p>
              That distinction matters. A technical reader will ask: if someone guesses or steals a
              Receipt ID, can they impersonate the business?
            </p>
            <p>
              No. The Receipt ID identifies the line; authenticated authorization controls who can
              use the line.
            </p>
            <p>
              This distinction allows the security implementation to evolve without changing the
              communications model.
            </p>
            <p className="wp-flow" aria-label="Security model">
              <span>Call</span>
              <span aria-hidden>→</span>
              <span>Receipt-backed authorization</span>
              <span aria-hidden>→</span>
              <span>Callback</span>
            </p>

            <h3>Businesses cannot cold-call AI users</h3>
            <p>This produces an important property of Voice over AIWEB:</p>
            <p className="wp-pull">The business cannot open the line to the ChatGPT user.</p>
            <p>A business may publish its intentions.</p>
            <p>AI may discover that business.</p>
            <p>
              AIWEB may determine that the business&apos;s intention corresponds with a user&apos;s
              intention.
            </p>
            <p>None of those events independently authorize the business to communicate with the user.</p>
            <p>The user must initiate the Call.</p>
            <p>
              Only the business receiving that Call is then permitted to respond through the
              resulting line, subject to the permissions associated with the Receipt.
            </p>
            <p>This creates a fundamental separation:</p>
            <div className="wp-compare">
              <div className="wp-card">
                <p className="wp-card-kicker">Discovery</p>
                <p className="wp-card-example">Can be public</p>
                <p className="wp-card-cap">Published intentions are findable. That is not permission to communicate.</p>
              </div>
              <div className="wp-card wp-card--aiweb">
                <p className="wp-card-kicker">Communication</p>
                <p className="wp-card-example">Is user-initiated</p>
                <p className="wp-card-cap">Only Receipt-backed authorization opens the line.</p>
              </div>
            </div>
            <p>
              Traditional telephone networks often allow someone who obtains a telephone number to
              attempt a call.
            </p>
            <p>AIWEB is designed around a different principle:</p>
            <p className="wp-pull">
              Knowing that a user exists does not give a business permission to contact that user.
            </p>

            <h3>Authorization has a lifecycle</h3>
            <p>Opening an AIWEB line does not grant a business permanent permission to communicate.</p>
            <p>A Receipt-backed authorization can have a defined lifecycle.</p>
            <p className="wp-flow" aria-label="Authorization lifecycle">
              <span>CLOSED</span>
              <span aria-hidden>→</span>
              <span>CALL</span>
              <span aria-hidden>→</span>
              <span>OPEN</span>
              <span aria-hidden>→</span>
              <span>CALLBACKS</span>
              <span aria-hidden>→</span>
              <span>EXPIRE / REVOKE / DELETE</span>
              <span aria-hidden>→</span>
              <span>CLOSED</span>
            </p>
            <p>When the user initiates the Call, the line becomes open.</p>
            <p>
              While it is open, the authorized business may send permitted Callbacks and messages
              against that Receipt.
            </p>
            <p>The line can subsequently be closed in several ways.</p>
            <ul>
              <li>
                <strong>Expiration</strong> can automatically terminate authorization after a defined
                period or condition.
              </li>
              <li>
                <strong>Revocation</strong> can allow the user or system to withdraw authorization
                while retaining whatever record the system is designed to preserve.
              </li>
              <li>
                <strong>Deletion</strong> can allow the user to remove or terminate the communication
                relationship according to the system&apos;s data-retention rules.
              </li>
            </ul>
            <p>
              Once authorization has ended, the business can no longer use that Receipt to continue
              communicating with the ChatGPT user.
            </p>
            <p>
              To establish another communication relationship, a new user-authorized Call is
              required.
            </p>

            <h3>No open line. No call.</h3>
            <p>This gives AIWEB a simple security principle:</p>
            <p className="wp-pull">No open line. No call.</p>
            <p>
              The principle becomes especially important as Voice over AIWEB evolves beyond
              asynchronous text.
            </p>
            <p>Today, a Callback might contain a written response to a quote request.</p>
            <p>
              Tomorrow, the same Receipt-backed authorization model could govern richer communication
              modalities such as documents, images, real-time messaging, audio, voice, or video.
            </p>
            <p>Increasing the bandwidth of the line does not need to change who controls its existence.</p>
            <p>The user opens it.</p>
            <p>The authorized business communicates through it.</p>
            <p>The user or system can close it.</p>

            <h3>Routing, tokens, and communication are separate layers</h3>
            <p>This produces three distinct primitives in the AIWEB architecture.</p>
            <div className="wp-layers">
              <div className="wp-card">
                <p className="wp-card-kicker">Route-by-intention</p>
                <p className="wp-card-example">Determines where the Call goes.</p>
              </div>
              <div className="wp-card wp-card--aiweb">
                <p className="wp-card-kicker">Token-Based Secure Communication</p>
                <p className="wp-card-example">Determines who is authorized to use the line.</p>
              </div>
              <div className="wp-card">
                <p className="wp-card-kicker">Voice over AI</p>
                <p className="wp-card-example">Carries the communication.</p>
              </div>
            </div>
            <p>Together:</p>
            <p className="wp-pull">
              Intention determines the route. Tokens secure the line. VoA carries the communication.
            </p>
            <p>Or expressed as a complete lifecycle:</p>
            <div className="wp-life" aria-label="Complete token-based communication lifecycle">
              <span>User Intention</span>
              <span aria-hidden>↓</span>
              <span>Route-by-intention</span>
              <span aria-hidden>↓</span>
              <span>Business Intention</span>
              <span aria-hidden>↓</span>
              <span>User-authorized Call</span>
              <span aria-hidden>↓</span>
              <span>AIWEB Receipt / Open Line</span>
              <span aria-hidden>↓</span>
              <span>Callback ↔ Messages ↔ Updates</span>
              <span aria-hidden>↓</span>
              <span>Expire · Revoke · Delete</span>
              <span aria-hidden>↓</span>
              <span>Line Closed</span>
            </div>
            <p>
              This architecture is designed to make route-by-intention useful without turning it
              into route-by-interruption.
            </p>
            <p>
              The network can determine who should communicate while preserving the user&apos;s
              authority over who is allowed to communicate with them.
            </p>
            <p>
              That distinction may become increasingly important as AI systems move from answering
              questions to communicating and acting across the business world.
            </p>
          </section>

          <section className="wp-section" id="moa">
            <h2>8. Media over AI</h2>
            <p>
              Once AI can route-by-intention, the destination does not have to be a document. It can
              be a business, a communication line, media, or an action.
            </p>
            <p>Intention can produce two fundamentally different outcomes:</p>
            <div className="wp-compare">
              <div className="wp-card wp-card--aiweb">
                <p className="wp-card-kicker">Voice over AI</p>
                <p className="wp-card-example">Communication → VoA</p>
                <p className="wp-card-cap">AI communicates with someone outside the chat.</p>
              </div>
              <div className="wp-card">
                <p className="wp-card-kicker">Media over AI</p>
                <p className="wp-card-example">Media delivery → MoA</p>
                <p className="wp-card-cap">AI retrieves an experience from outside the chat.</p>
              </div>
            </div>
            <p>
              The machine-functional web is not limited to text and business communication. AI
              systems can also become interfaces for discovering and experiencing media.
            </p>
            <p>
              AIWEB calls this <strong>Media over AI (MoA)</strong>.
            </p>
            <p>
              In a working AIWEB implementation, the AI Web Album was published with album artwork,
              audio tracks, and video. A ChatGPT user could express an intention such as:
            </p>
            <blockquote className="wp-quote">
              <p>“Find the AI Web Album and play Type.”</p>
              <p className="wp-quote-cap">ChatGPT user intention</p>
            </blockquote>
            <p>
              ChatGPT does not merely return a webpage containing information about the song. AIWEB
              can return the media itself as a machine-functional object. AIWEB discovers the
              published album and returns the appropriate playable asset to the AI experience.
            </p>
            <p className="wp-flow" aria-label="Media over AI path">
              <span>User Intention</span>
              <span aria-hidden>→</span>
              <span>Route-by-intention</span>
              <span aria-hidden>→</span>
              <span>Media</span>
              <span aria-hidden>→</span>
              <span>Experience</span>
            </p>
            <p>The payload can be:</p>
            <ul>
              <li>
                <strong>Audio</strong> — songs, podcasts, interviews, recordings.
              </li>
              <li>
                <strong>Video</strong> — music videos, demos, trailers, instructional content.
              </li>
              <li>
                <strong>Images</strong> — artwork, photography, product media.
              </li>
              <li>
                <strong>Documents</strong> — catalogs, menus, specifications, brochures.
              </li>
            </ul>
            <p>
              This changes the role of the published page. The page is no longer merely a
              destination containing media for a human visitor to locate and play. The media itself
              becomes machine-addressable and machine-functional.
            </p>
            <div className="wp-compare">
              <div className="wp-card">
                <p className="wp-card-kicker">Traditional web</p>
                <p className="wp-card-example">Search → Page → Find media → Play</p>
                <p className="wp-card-cap">The page is the destination.</p>
              </div>
              <div className="wp-card wp-card--aiweb">
                <p className="wp-card-kicker">Media over AI</p>
                <p className="wp-card-example">Intention → Media → Experience</p>
                <p className="wp-card-cap">The media is the destination.</p>
              </div>
            </div>
            <h3>Function, not file format</h3>
            <p>
              Audio and video can be media, and they can be communication. The distinction is
              function, not file format.
            </p>
            <ul>
              <li>A recorded song is MoA.</li>
              <li>A recorded product demo is MoA.</li>
              <li>
                A live conversation with a business representative is VoA, even when it includes
                audio or video.
              </li>
              <li>
                A business sending a product video as part of a Callback is media carried over a VoA
                line.
              </li>
            </ul>
            <p className="wp-pull">
              MoA describes the content experience. VoA describes the communication relationship.
            </p>
            <p>They can work together.</p>
            <p>
              Insurance demonstrates communication. The album demonstrates media. Together they show
              that machine-functional is broader than generating a lead.
            </p>
            <p>
              Once AI can route-by-intention, the destination does not have to be a document. It can
              be a business, a communication line, media, or an action.
            </p>
            <p className="wp-flow" aria-label="Machine-functional sequence">
              <span>Discover</span>
              <span aria-hidden>→</span>
              <span>Communicate</span>
              <span aria-hidden>→</span>
              <span>Experience</span>
              <span aria-hidden>→</span>
              <span>Act</span>
            </p>
            <p>Intention sits at the center of that sequence.</p>
            <p>
              AIWEB OS already supports actions. Causing something to happen outside the chat is
              therefore already part of the architecture. It does not need a separate brand yet.
            </p>
          </section>

          <section className="wp-section" id="mail">
            <h2>9. A Mail Server for ChatGPT</h2>
            <p>
              Another useful mental model is the mail server. Systems such as Microsoft Exchange
              provide organizations with infrastructure for identities, addresses, mailboxes,
              messages, routing, permissions, directories, and administration.
            </p>
            <p>AI business communication requires many analogous primitives:</p>
            <ul>
              <li>
                <strong>Directory</strong> — which businesses exist?
              </li>
              <li>
                <strong>Published intentions</strong> — what kinds of communication do they want to
                receive?
              </li>
              <li>
                <strong>Routing</strong> — which businesses correspond to the user&apos;s intention?
              </li>
              <li>
                <strong>Line</strong> — what communication relationship has the user authorized?
              </li>
              <li>
                <strong>Messages</strong> — what is traveling between ChatGPT and the business?
              </li>
              <li>
                <strong>Inbox</strong> — what Calls require the business&apos;s attention?
              </li>
              <li>
                <strong>Callback</strong> — what response should return to the ChatGPT user?
              </li>
              <li>
                <strong>Administration</strong> — who inside the business can manage and respond?
              </li>
            </ul>
            <p>
              AI introduces an important difference from traditional mail infrastructure: the sender
              does not necessarily need to know the receiver&apos;s address. The network can{' '}
              <mark className="wp-hl">route-by-intention</mark>.
            </p>
          </section>

          <section className="wp-section" id="publisher">
            <h2>10. AIWEB OS</h2>
            <p>For route-by-intention to work, businesses need a way to participate.</p>
            <p>
              <strong>AIWEB OS lets businesses publish their intentions to AI</strong> — a
              machine-functional presence, not only information for humans to read.
            </p>
            <p>Those intentions might include to:</p>
            <ul>
              <li>provide a service;</li>
              <li>sell a product;</li>
              <li>answer questions;</li>
              <li>provide pricing;</li>
              <li>check availability;</li>
              <li>schedule an appointment;</li>
              <li>provide support;</li>
              <li>respond to a quote request;</li>
              <li>supply inventory;</li>
              <li>publish media;</li>
              <li>complete an action;</li>
              <li>receive another defined business request.</li>
            </ul>
            <p>
              AIWEB OS therefore serves a role analogous to provisioning communications
              infrastructure. The business establishes who it is, what it intends to provide, which
              Calls it wants to receive, and how it will respond.
            </p>
            <p>The web presence becomes not merely machine-readable. It becomes machine-functional.</p>
          </section>

          <section className="wp-section" id="lines">
            <h2>11. From Pages to Lines</h2>
            <p>
              The web gave businesses pages. Telephone networks gave businesses numbers. Email gave
              businesses addresses. The emerging AI ecosystem needs another primitive: a business
              line ChatGPT can call.
            </p>
            <p>
              This does not eliminate websites, telephone numbers, email, search engines, or
              marketplaces. It adds a communications layer designed for a different interface: the
              AI conversation.
            </p>
            <p>
              Instead of forcing the user to leave that conversation whenever external knowledge or
              action is required, ChatGPT can establish communication on the user&apos;s behalf. The
              AI becomes not merely an interface to information. It becomes an interface to the
              businesses themselves.
            </p>
          </section>

          <section className="wp-section" id="markets">
            <h2>12. Intention Markets</h2>
            <p>
              Route-by-intention also changes the economics of discovery. Traditional search
              marketplaces frequently monetize impressions → clicks → leads → transactions.
            </p>
            <p>
              An intention-routed network can observe a more explicit sequence: Intention → Match →
              Call → Callback → Outcome.
            </p>
            <p>
              The commercially valuable event is no longer simply “someone saw your business.” It
              can become: a user whose expressed intention matched your published business intention
              authorized AI to open a line with your business.
            </p>
            <p>
              That is a fundamentally different demand signal. A business might therefore pay not
              merely to appear in search results but to maintain a line capable of receiving
              relevant AI-originated Calls. The user creates demand. The business pays to become
              reachable by that demand.
            </p>
            <p>
              Today, ChatGPT requesters do not pay. Operators buy AIWEB OS. The Receipt makes the
              exchange attributable. If a caller-side meter is introduced later, it would charge for
              opening the line — not for discovery.
            </p>
          </section>

          <section className="wp-section" id="traction">
            <h2>13. From Messages to Presence</h2>
            <p>
              Intention determines where communication goes. Voice over AI determines how richly the
              parties can communicate once the line is established. Whether the payload is text, a
              document, an image, audio, voice, or video, the underlying primitive remains:
            </p>
            <p>
              This is the Voice over AI line becoming richer. A recorded song remains Media over AI.
              A live conversation remains Voice over AI, even when it includes audio or video.
            </p>
            <p className="wp-flow">
              <span>Intention</span>
              <span aria-hidden>→</span>
              <span>Route-by-intention</span>
              <span aria-hidden>→</span>
              <span>Business line</span>
              <span aria-hidden>→</span>
              <span>Communication</span>
              <span aria-hidden>→</span>
              <span>Response</span>
            </p>
            <p>
              Today we are at the letter stage, moving toward email. Then the same line can become
              voice, then video — from inside a chatbot such as ChatGPT, where the client platform
              permits it.
            </p>
            <div className="wp-eras" aria-label="Communications maturity">
              <div className="wp-era wp-era--live">
                <p className="wp-era-status">Live</p>
                <p className="wp-era-name">Letter</p>
                <p className="wp-era-body">Asynchronous Call → Receipt → Callback.</p>
              </div>
              <div className="wp-era">
                <p className="wp-era-status">Building</p>
                <p className="wp-era-name">Email</p>
                <p className="wp-era-body">Persistent messaging and inbox. A mail server for ChatGPT.</p>
              </div>
              <div className="wp-era">
                <p className="wp-era-status">~12 months</p>
                <p className="wp-era-name">Voice</p>
                <p className="wp-era-body">
                  Real-time on the same line, where the AI client exposes the interface.
                </p>
              </div>
              <div className="wp-era">
                <p className="wp-era-status">Vision</p>
                <p className="wp-era-name">Video</p>
                <p className="wp-era-body">Face-to-face through AI on the same authenticated line.</p>
              </div>
            </div>
            <p className="wp-under">
              One line. One routing layer. Increasingly rich communication. Route-by-intention ·
              Voice over AI (VoA)
            </p>
            <p>
              Today Voice over AIWEB is live. AIWEB OS is live. Call → Receipt → Callback is
              demonstrated. ChatGPT communication infrastructure is deployed. The ChatGPT app
              listing is in review with OpenAI.
            </p>
            <p className="wp-note">
              We do not promise that ChatGPT itself will support embedded third-party voice or video
              on our timetable. That is partly controlled by OpenAI and other client platforms. The
              milestone is that AIWEB becomes voice- and video-ready, and supports those modalities
              where AI clients permit them.
            </p>
            <p className="wp-pull">
              Today we&apos;re at the letter stage. AI can send a business a message and get a
              callback. Next we build the mail server. Then the line becomes voice. Eventually,
              video. The routing infrastructure underneath doesn&apos;t change.
            </p>
          </section>

          <section className="wp-section" id="meter">
            <h2>14. Metering the Line</h2>
            <p>
              Communications networks have historically metered access to scarce or valuable network
              resources. Voice over AI creates a similar opportunity.
            </p>
            <p>
              Discovery can remain open. Communication across an external AI line can be metered.
            </p>
            <p>
              That distinction matters. AIWEB should not, at the outset, charge someone merely for
              searching. The valuable metered event is using the network to communicate outside
              ChatGPT.
            </p>
            <p className="wp-pull">The meter sits before the line opens.</p>
            <div className="wp-life" aria-label="VoA meter sits before the line opens">
              <span>User Intention</span>
              <span aria-hidden>↓</span>
              <span>Route-by-intention</span>
              <span aria-hidden>↓</span>
              <span>Business match</span>
              <span aria-hidden>↓</span>
              <span>VoA Meter</span>
              <span aria-hidden>↓</span>
              <span>Call authorized</span>
              <span aria-hidden>↓</span>
              <span>Receipt / secure line</span>
              <span aria-hidden>↓</span>
              <span>Business Callback</span>
            </div>
            <p>
              Discovery can stay free. The meter activates when the user wants AIWEB to open or use
              an external communication line.
            </p>
            <p>
              Old mobile plans made this familiar. A caller might have 100 minutes remaining. AIWEB
              can eventually say: you have 10 VoA Calls remaining. Or, if conversations become
              persistent: your plan includes 100 VoA minutes.
            </p>
            <p>
              That is a natural progression from today&apos;s free pilot toward a caller-side
              business. Metering becomes a consequence of providing the line.
            </p>
            <h3>Infrastructure and experience</h3>
            <p>
              Underneath the customer experience, AIWEB can still account for consumption in aiWh —
              the network&apos;s internal unit of work. The user does not necessarily need to see
              it.
            </p>
            <div className="wp-compare">
              <div className="wp-card">
                <p className="wp-card-kicker">Infrastructure</p>
                <p className="wp-card-example">aiWh</p>
                <p className="wp-card-cap">The operator&apos;s accounting unit for compute and delivery.</p>
              </div>
              <div className="wp-card wp-card--aiweb">
                <p className="wp-card-kicker">Customer experience</p>
                <p className="wp-card-example">Calls, messages, minutes</p>
                <p className="wp-card-cap">How people understand capacity on the line.</p>
              </div>
            </div>
            <p>
              Telecom companies did the same thing. Customers thought in minutes and data. The
              network operator dealt with the underlying resource accounting.
            </p>
            <h3>Two meters</h3>
            <p>
              Both ends of the line derive value. The economics become interesting because one VoA
              interaction can benefit both sides without charging both sides for the same event.
            </p>
            <div className="wp-compare">
              <div className="wp-card">
                <p className="wp-card-kicker">Caller meter</p>
                <p className="wp-card-example">Capacity to communicate</p>
                <p className="wp-card-cap">
                  Free tier, then included Calls, messages, or minutes; then individual and
                  team plans.
                </p>
              </div>
              <div className="wp-card wp-card--aiweb">
                <p className="wp-card-kicker">Business meter</p>
                <p className="wp-card-example">Access to qualified demand</p>
                <p className="wp-card-cap">
                  AIWEB OS to receive Calls; then volume, departments, routing, integrations, and
                  possibly qualified-lead pricing.
                </p>
              </div>
            </div>
            <p>
              Those are different products. One pays for communication capacity. The other pays for
              access to qualified demand.
            </p>
            <p>
              For example, a ChatGPT Business user might later pay a monthly fee for a bundle of
              VoA Calls, while a publisher pays for AIWEB OS plus qualified inbound Calls. The
              paper does not treat those figures as launched prices. It treats them as the shape of
              a two-sided communications business.
            </p>
            <h3>Why ChatGPT might care</h3>
            <p>
              Voice over AI also changes what ChatGPT is for. Without VoA, a user often asks
              ChatGPT, receives a recommendation, leaves ChatGPT, visits a website, and then calls,
              emails, or fills out a form.
            </p>
            <p>
              With VoA, the user can ask ChatGPT, discover, Call, receive a Callback, compare,
              continue, and resolve — without leaving the conversation.
            </p>
            <p>
              That can increase the usefulness of ChatGPT, especially for people trying to finish
              work rather than merely get an answer. It may also create a simple acquisition loop:
              ChatGPT can call businesses for you.
            </p>
            <p>
              That proposition does not require anyone to understand MCP, agents, machine-functional
              pages, or AI infrastructure. We do not claim it will increase OpenAI&apos;s revenue.
              The point is incentive alignment: a finished task is more valuable than an abandoned
              recommendation.
            </p>
            <h3>The meter follows the line</h3>
            <p>
              As the line matures, the unit of metering can mature with it.
            </p>
            <div className="wp-eras" aria-label="Metering units by communications stage">
              <div className="wp-era wp-era--live">
                <p className="wp-era-status">Letter</p>
                <p className="wp-era-name">Calls</p>
                <p className="wp-era-body">Messages and Calls on an authorized Receipt.</p>
              </div>
              <div className="wp-era">
                <p className="wp-era-status">Email</p>
                <p className="wp-era-name">Volume</p>
                <p className="wp-era-body">Message volume and storage on a persistent line.</p>
              </div>
              <div className="wp-era">
                <p className="wp-era-status">Voice</p>
                <p className="wp-era-name">Minutes</p>
                <p className="wp-era-body">Time on the same authenticated line.</p>
              </div>
              <div className="wp-era">
                <p className="wp-era-status">Video</p>
                <p className="wp-era-name">Bandwidth</p>
                <p className="wp-era-body">Minutes and bandwidth where the client permits it.</p>
              </div>
            </div>
            <p className="wp-under">Underneath all of them: the VoA Meter. Discovery can stay free.</p>
            <p className="wp-pull">
              Telecom monetized minutes. Cloud monetized compute. Voice over AI can meter
              communication between AI and the outside world.
            </p>
          </section>

          <section className="wp-section wp-close" id="close">
            <h2 className="wp-title">Intention is all you need</h2>
            <p>
              The first web connected documents. Search engines connected queries to documents.
              Social networks connected people and content. AI systems are beginning to understand
              something richer: what people intend to accomplish.
            </p>
            <p>
              If businesses can also publish what they intend to provide, the network no longer
              needs to depend exclusively on users knowing names, URLs, telephone numbers, email
              addresses, or carefully selected keywords.
            </p>
            <p>The user can express the outcome. The business can express the opportunity it wants to serve. AI can reason about the relationship. A communications network can connect them.</p>
            <p className="wp-pull">
              Users publish intentions. Businesses publish intentions. AI routes between them.
            </p>
            <p>
              AIWEB calls this route-by-intention. Voice over AI is two-way communication between
              ChatGPT users and the world. Voice over AIWEB is the implementation — a phone
              service for ChatGPT, and a mail server for ChatGPT. Media over AI shows that the same
              routing layer can return an experience, not only a conversation. AIWEB OS makes those
              destinations machine-functional. And the Receipt keeps a communication line open long
              enough for the real world to answer.
            </p>
          </section>

          <footer className="wp-foot">
            <div className="wp-foot-inner">
              <p className="wp-foot-brand">AIWEB</p>
              <p className="wp-foot-copy">© 2026 The AI Web Company. All rights reserved.</p>
              <a className="wp-foot-url" href="https://www.theaiwebcompany.com">
                theaiwebcompany.com
              </a>
            </div>
            <nav className="wp-vcap" aria-label="Machine surfaces">
              <p className="wp-vcap-label">For ChatGPT</p>
              <ul>
                <li>
                  <a href="/whitepaper/llms.txt">llms.txt</a>
                </li>
                <li>
                  <a href="/whitepaper/json.ld">json.ld</a>
                </li>
                <li>
                  <a href="/whitepaper/mcp.json">mcp.json</a>
                </li>
                <li>
                  <a href="/whitepaper/openapi.json">openapi.json</a>
                </li>
                <li>
                  <a href="/whitepaper/chatgpt.txt">ChatGPT</a>
                </li>
                <li>
                  <a href="https://www.os.theaiwebcompany.com/mcp">MCP</a>
                </li>
              </ul>
            </nav>
          </footer>
        </article>
      </div>
    </div>
  );
}
