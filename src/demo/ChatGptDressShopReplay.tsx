/**
 * ChatGPT × AIWEB dress shopping replay — casual stylist conversation with carousel + Get Quote.
 */
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import {
  ArrowUp,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Mic,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import './chatGptGetQuoteReplay.css';
import './chatGptDressShopReplay.css';
import './chatGptReplayViewport.css';
import { ChatGptReplayViewport } from '@/demo/ChatGptReplayViewport';
import { useReplayInView } from '@/demo/useReplayInView';

const USER =
  'I need a dress for a summer wedding — elegant but not too formal. Maybe around $300?';

const STYLIST_REPLY = [
  'Here are three options that fit a summer wedding — sequin maxi silhouettes with observed retail pricing from AIWEB Pages:',
  '',
  'Tap **Get Quote** on any dress to contact the seller the same way as a catering quote.',
].join('\n');

const DRESSES = [
  {
    name: 'Janhvi Maxi Dress',
    colorway: 'Black',
    price: '$278',
    note: 'Evening sequin · observed retail',
    image: '/images/demo/nbd-janhvi-maxi-dress.png',
    page: 'janhvi-maxi-dress.theaiwebcompany.com',
  },
  {
    name: 'Janhvi Maxi Dress',
    colorway: 'Hot Pink',
    price: '$262',
    note: 'Same silhouette · new colorway',
    image: '/images/demo/pink-dress/front.png',
    page: 'janhvi-maxi-dress.theaiwebcompany.com',
  },
  {
    name: 'Janhvi Maxi Dress',
    colorway: 'Front three-quarter',
    price: '$278',
    note: 'Alternate angle · black sequin',
    image: '/images/demo/nbd-janhvi-maxi-dress-front.png',
    page: 'janhvi-maxi-dress.theaiwebcompany.com',
  },
] as const;

const BUYER_NAME = 'Maya Chen';
const BUYER_EMAIL = 'maya.chen@email.com';
const BUYER_PHONE = '415-555-0192';
const RECEIPT = 'GxDress9kLm2PqR8vWn4';

type Phase =
  | 'idle'
  | 'type-user'
  | 'worked'
  | 'stylist'
  | 'carousel'
  | 'quote'
  | 'submit'
  | 'done';

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function renderStylistHtml(text: string, caret: boolean): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const body = text
    .split('\n')
    .map((line) => {
      if (!line.trim()) return '<div class="gq-gap"></div>';
      let html = esc(line);
      html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      return `<p class="gq-p">${html}</p>`;
    })
    .join('');
  return body + (caret ? '<span class="gq-caret" aria-hidden="true"></span>' : '');
}

function Reserve({
  sizer,
  children,
  className,
}: {
  sizer: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`gq-reserve${className ? ` ${className}` : ''}`}>
      <div className="gq-reserve-sizer" aria-hidden>
        {sizer}
      </div>
      <div className="gq-reserve-paint">{children}</div>
    </div>
  );
}

function DressCarousel({
  activeDress,
  showQuote,
  pressQuote,
}: {
  activeDress: number;
  showQuote: boolean;
  pressQuote: boolean;
}) {
  return (
    <div className="gq-dress-carousel-wrap">
      <div className="gq-dress-carousel-head">
        <span>Stylist picks</span>
        <span className="gq-dress-carousel-nav" aria-hidden>
          <ChevronLeft size={14} />
          <ChevronRight size={14} />
        </span>
      </div>
      <div
        className="gq-dress-carousel"
        style={{ ['--gq-dress-i' as string]: String(activeDress) }}
      >
        {DRESSES.map((item, index) => (
          <article
            key={item.colorway}
            className={`gq-dress-card${index === activeDress ? ' is-active' : ''}${
              showQuote && index === activeDress ? ' is-selected' : ''
            }`}
          >
            <img src={item.image} alt="" />
            <div className="gq-dress-card-copy">
              <p className="gq-dress-card-name">{item.name}</p>
              <p className="gq-dress-card-meta">
                {item.colorway} · {item.price}
              </p>
              <p className="gq-dress-card-note">{item.note}</p>
              <span
                className={`gq-dress-quote-btn${pressQuote && index === activeDress ? ' is-press' : ''}`}
              >
                Get Quote
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function DressQuoteForm({
  dress,
  fieldStep,
  quoteSent,
  pressSubmit,
}: {
  dress: (typeof DRESSES)[number];
  fieldStep: number;
  quoteSent: boolean;
  pressSubmit: boolean;
}) {
  return (
    <div className={`gq-dress-quote${quoteSent ? ' is-sent' : ''}`}>
      <p className="gq-form-title">
        Get a quote · {dress.name} · {dress.colorway}
      </p>
      <img className="gq-thumb" src={dress.image} alt="" width={72} height={72} />
      <div className="gq-fields">
        <div className="gq-field">
          <span className="gq-label">Name</span>
          <div className={`gq-input${fieldStep >= 1 ? '' : ' is-empty'}`}>
            {fieldStep >= 1 ? BUYER_NAME : ''}
          </div>
        </div>
        <div className="gq-field">
          <span className="gq-label">Email</span>
          <div className={`gq-input${fieldStep >= 2 ? '' : ' is-empty'}`}>
            {fieldStep >= 2 ? BUYER_EMAIL : ''}
          </div>
        </div>
        <div className="gq-field">
          <span className="gq-label">Phone</span>
          <div className={`gq-input${fieldStep >= 3 ? '' : ' is-empty'}`}>
            {fieldStep >= 3 ? BUYER_PHONE : ''}
          </div>
        </div>
        <div className="gq-field">
          <span className="gq-label">Date</span>
          <div className="gq-control">
            <div className={`gq-input gq-input--icon${fieldStep >= 3 ? '' : ' is-empty'}`}>
              {fieldStep >= 3 ? '09/14/2026' : 'mm/dd/yyyy'}
            </div>
            <Calendar className="gq-field-icon" size={15} strokeWidth={1.7} />
          </div>
        </div>
        <div className="gq-field">
          <span className="gq-label">Time</span>
          <div className="gq-control">
            <div className={`gq-input gq-input--icon${fieldStep >= 3 ? '' : ' is-empty'}`}>
              {fieldStep >= 3 ? '2:00 PM' : '--:-- --'}
            </div>
            <Clock className="gq-field-icon" size={15} strokeWidth={1.7} />
          </div>
        </div>
        <div className="gq-field">
          <span className="gq-label">Notes</span>
          <div className={`gq-notes${fieldStep >= 3 ? '' : ''}`}>
            {fieldStep >= 3 ? 'Summer wedding guest · size M' : ''}
          </div>
        </div>
      </div>
      <span className={`gq-submit${pressSubmit ? ' is-press' : ''}`}>Send quote request</span>
      <div className={`gq-ok${quoteSent ? '' : ' gq-hold'}`}>
        Thanks — we got your request. Your AIWEB Receipt is{' '}
        <strong className="gq-ok-id">{RECEIPT}</strong>. The seller can call back through AIWEB Mail —
        same flow as catering quotes.
      </div>
    </div>
  );
}

function DressAssistantBlock({
  reply,
  replyCaret,
  showReply,
  activeDress,
  showCarousel,
  showQuote,
  quoteSent,
  fieldStep,
  pressSubmit,
}: {
  reply: string;
  replyCaret: boolean;
  showReply: boolean;
  activeDress: number;
  showCarousel: boolean;
  showQuote: boolean;
  quoteSent: boolean;
  fieldStep: number;
  pressSubmit: boolean;
}) {
  const dress = DRESSES[activeDress];
  const finalDress = DRESSES[1];

  return (
    <div className="gq-assistant-block">
      <Reserve
        sizer={
          <div
            className="gq-stylist-reply"
            dangerouslySetInnerHTML={{
              __html: renderStylistHtml(STYLIST_REPLY, false),
            }}
          />
        }
      >
        <div
          className={`gq-stylist-reply${showReply ? '' : ' gq-hold'}`}
          dangerouslySetInnerHTML={{
            __html: renderStylistHtml(reply, replyCaret),
          }}
        />
      </Reserve>

      <Reserve sizer={<DressCarousel activeDress={1} showQuote pressQuote={false} />}>
        <div className={showCarousel ? '' : 'gq-hold'} aria-hidden={!showCarousel}>
          <DressCarousel
            activeDress={activeDress}
            showQuote={showQuote}
            pressQuote={showQuote && !quoteSent}
          />
        </div>
      </Reserve>

      <Reserve
        sizer={
          <DressQuoteForm dress={finalDress} fieldStep={3} quoteSent pressSubmit={false} />
        }
      >
        <div className={showQuote ? '' : 'gq-hold'} aria-hidden={!showQuote}>
          <DressQuoteForm
            dress={dress}
            fieldStep={fieldStep}
            quoteSent={quoteSent}
            pressSubmit={pressSubmit}
          />
        </div>
      </Reserve>

      <ThreadFooter />
    </div>
  );
}

function ThreadFooter() {
  return (
    <div className="gq-footer" aria-hidden>
      <Copy size={15} strokeWidth={1.7} />
      <ThumbsUp size={15} strokeWidth={1.7} />
      <ThumbsDown size={15} strokeWidth={1.7} />
      <Share2 size={15} strokeWidth={1.7} />
      <RefreshCw size={15} strokeWidth={1.7} />
      <MoreHorizontal size={15} strokeWidth={1.7} />
    </div>
  );
}

function Composer() {
  return (
    <div className="gq-composer" aria-hidden>
      <span className="gq-composer-plus">
        <Plus size={18} strokeWidth={1.8} />
      </span>
      <span className="gq-composer-ph">Ask a follow-up…</span>
      <span className="gq-composer-model">5.6 Sol Light</span>
      <span className="gq-composer-mic">
        <Mic size={16} strokeWidth={1.8} />
      </span>
      <span className="gq-composer-send">
        <ArrowUp size={16} strokeWidth={2.2} />
      </span>
    </div>
  );
}

export function ChatGptDressShopReplay() {
  const { ref: sceneRef, inView } = useReplayInView();
  const [phase, setPhase] = useState<Phase>('idle');
  const [userN, setUserN] = useState(0);
  const [worked, setWorked] = useState(-1);
  const [replyN, setReplyN] = useState(0);
  const [activeDress, setActiveDress] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const [fieldStep, setFieldStep] = useState(0);

  const reset = useCallback(() => {
    setPhase('idle');
    setUserN(0);
    setWorked(-1);
    setReplyN(0);
    setActiveDress(0);
    setShowCarousel(false);
    setShowQuote(false);
    setQuoteSent(false);
    setFieldStep(0);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (!inView) {
        reset();
        return;
      }
      setUserN(USER.length);
      setWorked(18);
      setReplyN(STYLIST_REPLY.length);
      setShowCarousel(true);
      setActiveDress(1);
      setShowQuote(true);
      setQuoteSent(true);
      setPhase('done');
      return;
    }

    if (!inView) {
      reset();
      return;
    }

    let cancelled = false;

    const run = async () => {
      reset();
      await sleep(400);
      if (cancelled) return;

      setPhase('type-user');
      for (let i = 1; i <= USER.length; i++) {
        if (cancelled) return;
        setUserN(i);
        await sleep(26);
      }
      await sleep(400);
      if (cancelled) return;

      setPhase('worked');
      for (let s = 0; s <= 18; s++) {
        if (cancelled) return;
        setWorked(s);
        await sleep(55);
      }
      await sleep(300);
      if (cancelled) return;

      setPhase('stylist');
      for (let i = 1; i <= STYLIST_REPLY.length; i++) {
        if (cancelled) return;
        setReplyN(i);
        await sleep(14);
      }
      await sleep(500);
      if (cancelled) return;

      setPhase('carousel');
      setShowCarousel(true);
      for (let idx = 0; idx < DRESSES.length; idx++) {
        if (cancelled) return;
        setActiveDress(idx);
        await sleep(900);
      }
      setActiveDress(1);
      await sleep(700);
      if (cancelled) return;

      setPhase('quote');
      setShowQuote(true);
      for (let step = 1; step <= 3; step++) {
        if (cancelled) return;
        setFieldStep(step);
        await sleep(500);
      }
      await sleep(400);
      if (cancelled) return;

      setPhase('submit');
      setQuoteSent(true);
      await sleep(400);
      if (cancelled) return;

      setPhase('done');
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [inView, reset]);

  const user = USER.slice(0, userN);
  const reply = STYLIST_REPLY.slice(0, replyN);

  return (
    <div className="gq-story gq-story--dress" data-demo="dress-shop-replay" aria-label="ChatGPT dress shopping replay">
      <div ref={sceneRef} className="gq-scene gq-scene--chat">
        <h3 className="gq-scene-title font-display">
          <mark className="gq-scene-mark">Chat GPT Shopper</mark>
          <span className="gq-scene-action">finds a dress</span>
        </h3>
        <ChatGptReplayViewport maxHeightVh={76}>
          <div className={`gq-replay${phase === 'done' ? ' is-done' : inView ? ' is-play' : ' is-wait'}`}>
          <div className="gq-thread">
            <div className="gq-user-row">
              <Reserve className="gq-user-bubble" sizer={USER}>
                {user}
                {phase === 'type-user' && userN < USER.length ? (
                  <span className="gq-caret" aria-hidden />
                ) : null}
              </Reserve>
            </div>

            <div className={`gq-worked${worked < 0 ? ' is-hidden' : ''}`}>
              Worked for {Math.max(0, worked)}s
              <span aria-hidden> &gt;</span>
            </div>

            <DressAssistantBlock
              reply={reply}
              replyCaret={phase === 'stylist' && replyN < STYLIST_REPLY.length}
              showReply={replyN > 0}
              activeDress={activeDress}
              showCarousel={showCarousel}
              showQuote={showQuote}
              quoteSent={quoteSent}
              fieldStep={fieldStep}
              pressSubmit={phase === 'submit'}
            />
          </div>
          <p className="gq-disclaimer">
            ChatGPT can make mistakes. Workspace data isn’t used to train models.
          </p>
          <Composer />
          </div>
        </ChatGptReplayViewport>
      </div>
    </div>
  );
}

/** Catering Get Quote replay — re-export for dev / alternate marketing sections. */
export { ChatGptCateringQuoteReplay } from './ChatGptGetQuoteReplay';
