/**
 * Dress quote follow-up — AIWEB Mail callback + shopper receipt check in ChatGPT.
 * Pairs with ChatGptDressShopReplay (scene 1) on the homepage.
 */
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import {
  ArrowUp,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Copy,
  Mic,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Share2,
  ThumbsDown,
  ThumbsUp,
  User,
} from 'lucide-react';
import {
  AiwebOsMailScene,
  type AiwebOsMailConfig,
} from '@/demo/aiwebOsAnimation/AiwebOsMailScene';
import '@/demo/aiwebOsAnimation/aiwebOsAnimation.css';
import './chatGptGetQuoteReplay.css';
import './chatGptReplayViewport.css';
import { ChatGptReplayViewport } from '@/demo/ChatGptReplayViewport';
import { useReplayInView } from '@/demo/useReplayInView';

const PAGE_URL = 'janhvi-maxi-dress.theaiwebcompany.com';
const RECEIPT = 'GxDress9kLm2PqR8vWn4';
const DRESS_TITLE = 'Janhvi Maxi Dress · Hot Pink';
const PHOTO_MAIN = '/images/demo/pink-dress/front.png';
const PHOTO_ALT = '/images/demo/nbd-janhvi-maxi-dress.png';

const NAME = 'Maya Chen';
const EMAIL = 'maya.chen@email.com';
const PHONE = '415-555-0192';
const WHEN = 'Sep 1, 2:48 PM';
const OWNER_WHEN = 'Sep 1, 3:03 PM';
const NOTES = 'Summer wedding guest · size M';

const CALLBACK =
  'Thank you for your interest! The Hot Pink Janhvi Maxi is in stock in size M. Would you like to schedule a try-on this week?';

const MAIL_CONFIG: AiwebOsMailConfig = {
  inbox: [
    {
      id: 'maya',
      initials: 'MC',
      name: 'Maya Chen',
      source: 'ChatGPT · mcp · call',
      preview: 'Incoming call · 415-555-0192',
      time: 'now',
    },
    {
      id: 'sue',
      initials: 'SF',
      name: 'Sue Frank',
      source: 'Browser · request_quote',
      preview: 'Phone 5551234567',
      time: '2d',
    },
    {
      id: 'john',
      initials: 'JS',
      name: 'John Smith',
      source: 'ChatGPT · mcp · request_quote',
      preview: 'Phone 5559876543',
      time: 'Aug 22',
    },
  ],
  featuredLeadId: 'maya',
  pageUrl: PAGE_URL,
  incomingMessage: [
    `${WHEN.replace('Sep 1, ', 'Sep 1, 2026, ')}`,
    '',
    'Incoming call · Get Quote',
    'Janhvi Maxi Dress · Hot Pink',
    '',
    'Summer wedding guest · size M',
    '',
    `Phone ${PHONE}`,
  ].join('\n'),
  incomingMeta: 'Maya Chen · incoming call',
  threadSource: `ChatGPT · mcp · call · ${PAGE_URL}`,
  callbackMessage: CALLBACK,
};

const CHECK_USER = `check on the call back for AIWEB Receipt ${RECEIPT}`;
const CHECK_INTRO =
  "I'll look up that AIWEB Receipt and show the seller's call back.";
const CHECK_FOOT = [
  `Receipt \`${RECEIPT}\` has a **call back**. The Quote card above is updated.`,
  '',
  'The seller called back about the Hot Pink Janhvi Maxi — reply to schedule your try-on.',
].join('\n');
const AVAIL = 'In stock · size M';
const PACKAGE = 'Hot Pink sequin maxi';
const PRICE_LABEL = '$262.00';
const NEXT_STEP = 'Schedule a try-on';
const TRYON = '09/04/2026, 02:00 PM';
const USER_NOTE = 'Thursday at 2pm works for a try-on.';

type MailPhase = 'idle' | 'incoming' | 'select' | 'type-callback' | 'send' | 'done';
type CheckPhase = 'idle' | 'prompt' | 'card' | 'fill' | 'replied';
type Beat = 'wait' | 'play' | 'done';

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

function beatClass(beat: Beat) {
  return `gq-beat is-${beat}`;
}

function SceneTitle({ who, action }: { who: string; action: string }) {
  return (
    <h3 className="gq-scene-title font-display">
      <mark className="gq-scene-mark">{who}</mark>
      <span className="gq-scene-action">{action}</span>
    </h3>
  );
}

function renderReplyHtml(text: string, caret: boolean): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const body = text
    .split('\n')
    .map((line) => {
      if (!line.trim()) return '<div class="gq-gap"></div>';
      let html = esc(line);
      html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
      return `<p class="gq-p">${html}</p>`;
    })
    .join('');
  return body + (caret ? '<span class="gq-caret" aria-hidden="true"></span>' : '');
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

function Composer({ placeholder }: { placeholder: string }) {
  return (
    <div className="gq-composer" aria-hidden>
      <span className="gq-composer-plus">
        <Plus size={18} strokeWidth={1.8} />
      </span>
      <span className="gq-composer-ph">{placeholder}</span>
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

function DressCheckView({
  phase,
  userN,
  emailN,
  tryonN,
  noteN,
  sending,
  beat,
}: {
  phase: CheckPhase;
  userN: number;
  emailN: number;
  tryonN: number;
  noteN: number;
  sending: boolean;
  beat: Beat;
}) {
  const showIntro = phase !== 'idle' && userN >= CHECK_USER.length;
  const fill = phase === 'fill' || phase === 'replied';
  const showFoot = phase === 'card' || phase === 'fill' || phase === 'replied';
  const email = EMAIL.slice(0, emailN);
  const tryon = TRYON.slice(0, tryonN);
  const note = USER_NOTE.slice(0, noteN);

  return (
    <div className={`gq-replay gq-check ${beatClass(beat)}`} aria-label="ChatGPT dress receipt status">
      <div className="gq-thread">
        <div className="gq-user-row">
          <Reserve className="gq-user-bubble" sizer={CHECK_USER}>
            {CHECK_USER.slice(0, userN)}
            {phase === 'prompt' && userN < CHECK_USER.length ? (
              <span className="gq-caret" aria-hidden />
            ) : null}
          </Reserve>
        </div>
        <p className={`gq-p${showIntro ? '' : ' gq-hold'}`} style={{ marginBottom: 10 }}>
          {CHECK_INTRO}
        </p>
        <div className={`gq-worked${showIntro ? '' : ' gq-hold'}`}>
          Retrieving receipt details.
          <span aria-hidden> &gt;</span>
        </div>

        <div className={`gq-quote-reveal${showFoot ? ' is-on' : ''}`} aria-hidden={!showFoot}>
          <div className="gq-quote-card">
            <div className="gq-quote-head">
              <p className="gq-form-title">{DRESS_TITLE}</p>
              <div className="gq-plugin-votes" aria-hidden>
                <ThumbsUp size={14} strokeWidth={1.7} />
                <ThumbsDown size={14} strokeWidth={1.7} />
              </div>
            </div>
            <div className="gq-gallery">
              <div className="gq-gallery-hero">
                <img src={PHOTO_MAIN} alt="" />
                <span className="gq-gallery-nav is-left" aria-hidden>
                  <ChevronLeft size={16} />
                </span>
                <span className="gq-gallery-nav is-right" aria-hidden>
                  <ChevronRight size={16} />
                </span>
              </div>
              <div className="gq-gallery-row">
                <img src={PHOTO_MAIN} alt="" />
                <img src={PHOTO_ALT} alt="" />
                <img src={PHOTO_MAIN} alt="" />
              </div>
            </div>

            <p className="gq-sec">Quote</p>
            <div className="gq-facts">
              <label>
                Availability
                <span className="gq-lead-input">{AVAIL}</span>
              </label>
              <label>
                Style
                <span className="gq-lead-input">{PACKAGE}</span>
              </label>
              <label>
                Price
                <span className="gq-lead-input">{PRICE_LABEL}</span>
              </label>
              <label>
                Next step
                <span className="gq-lead-input">{NEXT_STEP}</span>
              </label>
            </div>

            <p className="gq-sec">Conversation</p>
            <div className="gq-leads-msg">
              <User size={14} strokeWidth={1.8} className="gq-msg-ico" />
              <div>
                <p className="gq-leads-convo-head">
                  {NAME} · Call · ChatGPT · {WHEN}
                </p>
                <p className="gq-leads-convo-body">
                  Get Quote · Janhvi Maxi Dress · Hot Pink
                  <br />
                  {NOTES}
                  <br />
                  Phone {PHONE}
                </p>
              </div>
            </div>
            <div className="gq-leads-msg is-you">
              <Building2 size={14} strokeWidth={1.8} className="gq-msg-ico is-you" />
              <div>
                <p className="gq-leads-convo-head">
                  {DRESS_TITLE} · Call back · AIWEB Mail · {OWNER_WHEN}
                </p>
                <p className="gq-leads-convo-body">{CALLBACK}</p>
              </div>
            </div>

            <p className="gq-sec">Reply to call back</p>
            <label className="gq-check-field">
              Email on your quote request
              <span className={`gq-lead-input${fill && !email ? ' is-empty' : ''}`}>
                {email || 'Same email you used to request the quote'}
                {fill && emailN > 0 && emailN < EMAIL.length ? (
                  <span className="gq-caret" aria-hidden />
                ) : null}
              </span>
            </label>
            <label className="gq-check-field">
              Proposed try-on time
              <span className={`gq-lead-input gq-input--icon${fill && !tryon ? ' is-empty' : ''}`}>
                {tryon || 'mm/dd/yyyy --:-- --'}
                {fill && tryonN > 0 && tryonN < TRYON.length ? (
                  <span className="gq-caret" aria-hidden />
                ) : null}
                <Calendar className="gq-field-icon" size={15} strokeWidth={1.7} />
              </span>
            </label>
            <label className="gq-check-field">
              Note (optional)
              <span className="gq-lead-textarea">
                {note || (!fill ? 'Anything else for the seller' : null)}
                {fill && noteN > 0 && noteN < USER_NOTE.length ? (
                  <span className="gq-caret" aria-hidden />
                ) : null}
              </span>
            </label>
            <span className={`gq-submit${sending ? ' is-press' : ''}`}>Send reply</span>
            <p className="gq-receipt-link">View the AIWEB receipt</p>
          </div>
        </div>

        <div className="gq-reply">
          <Reserve
            sizer={
              <div
                dangerouslySetInnerHTML={{
                  __html: renderReplyHtml(CHECK_FOOT, false),
                }}
              />
            }
          >
            <div
              dangerouslySetInnerHTML={{
                __html: renderReplyHtml(showFoot ? CHECK_FOOT : '', false),
              }}
            />
          </Reserve>
          <ThreadFooter />
        </div>
      </div>
      <p className="gq-disclaimer">
        ChatGPT can make mistakes. Workspace data isn’t used to train models.
      </p>
      <Composer placeholder="Follow up" />
    </div>
  );
}

function typeChars(
  length: number,
  cps: number,
  cancelled: () => boolean,
  rafs: number[],
  onN: (n: number) => void,
  done: () => void,
) {
  const start = performance.now();
  const tick = (now: number) => {
    if (cancelled()) return;
    const n = Math.min(length, Math.floor(((now - start) / 1000) * cps));
    onN(n);
    if (n < length) rafs.push(requestAnimationFrame(tick));
    else done();
  };
  rafs.push(requestAnimationFrame(tick));
}

export function ChatGptDressFollowUpReplay() {
  const mailView = useReplayInView();
  const checkView = useReplayInView();
  const [mailPhase, setMailPhase] = useState<MailPhase>('idle');
  const [needsYou, setNeedsYou] = useState(14);
  const [showMaya, setShowMaya] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showIncoming, setShowIncoming] = useState(false);
  const [callbackText, setCallbackText] = useState('');
  const [sentCallback, setSentCallback] = useState(false);
  const [checkPhase, setCheckPhase] = useState<CheckPhase>('idle');
  const [checkUserN, setCheckUserN] = useState(0);
  const [checkEmailN, setCheckEmailN] = useState(0);
  const [checkTryonN, setCheckTryonN] = useState(0);
  const [checkNoteN, setCheckNoteN] = useState(0);
  const [checkSending, setCheckSending] = useState(false);

  const resetMail = useCallback(() => {
    setMailPhase('idle');
    setNeedsYou(14);
    setShowMaya(false);
    setSelectedId(null);
    setShowIncoming(false);
    setCallbackText('');
    setSentCallback(false);
  }, []);

  const resetCheck = useCallback(() => {
    setCheckPhase('idle');
    setCheckUserN(0);
    setCheckEmailN(0);
    setCheckTryonN(0);
    setCheckNoteN(0);
    setCheckSending(false);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (!mailView.inView) {
        resetMail();
        return;
      }
      setMailPhase('done');
      setNeedsYou(15);
      setShowMaya(true);
      setSelectedId('maya');
      setShowIncoming(true);
      setSentCallback(true);
      return;
    }

    if (!mailView.inView) {
      resetMail();
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const rafs: number[] = [];
    const later = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const isCancelled = () => cancelled;

    resetMail();
    later(400, () => {
      if (cancelled) return;
      setMailPhase('incoming');
      setShowMaya(true);
      setNeedsYou(15);
      later(900, () => {
        if (cancelled) return;
        setMailPhase('select');
        setSelectedId('maya');
        setShowIncoming(true);
        later(1200, () => {
          if (cancelled) return;
          setMailPhase('type-callback');
          typeChars(
            CALLBACK.length,
            42,
            isCancelled,
            rafs,
            (n) => setCallbackText(CALLBACK.slice(0, n)),
            () => {
              later(500, () => {
                if (cancelled) return;
                setMailPhase('send');
                setSentCallback(true);
                setCallbackText('');
                later(280, () => {
                  if (cancelled) return;
                  setMailPhase('done');
                });
              });
            },
          );
        });
      });
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      rafs.forEach(cancelAnimationFrame);
    };
  }, [mailView.inView, resetMail]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (!checkView.inView) {
        resetCheck();
        return;
      }
      setCheckPhase('replied');
      setCheckUserN(CHECK_USER.length);
      setCheckEmailN(EMAIL.length);
      setCheckTryonN(TRYON.length);
      setCheckNoteN(USER_NOTE.length);
      return;
    }

    if (!checkView.inView) {
      resetCheck();
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const rafs: number[] = [];
    const later = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const isCancelled = () => cancelled;

    resetCheck();
    later(400, () => {
      if (cancelled) return;
      setCheckPhase('prompt');
      typeChars(
        CHECK_USER.length,
        38,
        isCancelled,
        rafs,
        (n) => setCheckUserN(n),
        () => {
          later(500, () => {
            if (cancelled) return;
            setCheckPhase('card');
            later(900, () => {
              if (cancelled) return;
              setCheckPhase('fill');
              typeChars(
                EMAIL.length,
                28,
                isCancelled,
                rafs,
                (n) => setCheckEmailN(n),
                () => {
                  later(160, () => {
                    typeChars(
                      TRYON.length,
                      22,
                      isCancelled,
                      rafs,
                      (n) => setCheckTryonN(n),
                      () => {
                        later(140, () => {
                          typeChars(
                            USER_NOTE.length,
                            28,
                            isCancelled,
                            rafs,
                            (n) => setCheckNoteN(n),
                            () => {
                              later(500, () => {
                                if (cancelled) return;
                                setCheckSending(true);
                                later(240, () => {
                                  if (cancelled) return;
                                  setCheckSending(false);
                                  setCheckPhase('replied');
                                });
                              });
                            },
                          );
                        });
                      },
                    );
                  });
                },
              );
            });
          });
        },
      );
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      rafs.forEach(cancelAnimationFrame);
    };
  }, [checkView.inView, resetCheck]);

  const mailBeat: Beat = !mailView.inView
    ? 'wait'
    : mailPhase === 'idle'
      ? 'wait'
      : mailPhase === 'done'
        ? 'done'
        : 'play';
  const checkBeat: Beat = !checkView.inView
    ? 'wait'
    : checkPhase === 'idle'
      ? 'wait'
      : checkPhase === 'replied'
        ? 'done'
        : 'play';

  return (
    <div
      className="gq-story gq-story--dress-followup"
      data-demo="dress-followup-replay"
      aria-label="Dress shopper call back in AIWEB Mail and ChatGPT"
    >
      <div ref={mailView.ref} className="gq-scene gq-scene--mail">
        <SceneTitle who="Business owner" action="Call Back" />
        <ChatGptReplayViewport wide designWidth={1024} maxHeightVh={68}>
          <AiwebOsMailScene
            config={MAIL_CONFIG}
            phase={mailPhase}
            needsYou={needsYou}
            showFeaturedLead={showMaya}
            selectedId={selectedId}
            showIncoming={showIncoming}
            callbackText={callbackText}
            sentCallback={sentCallback}
            isTypingCallback={mailPhase === 'type-callback'}
            beat={mailBeat}
          />
        </ChatGptReplayViewport>
      </div>
      <div ref={checkView.ref} className="gq-scene gq-scene--check">
        <SceneTitle who="Chat GPT Shopper" action="receives call back" />
        <ChatGptReplayViewport maxHeightVh={76}>
          <DressCheckView
            phase={checkPhase}
            userN={checkUserN}
            emailN={checkEmailN}
            tryonN={checkTryonN}
            noteN={checkNoteN}
            sending={checkSending}
            beat={checkBeat}
          />
        </ChatGptReplayViewport>
      </div>
    </div>
  );
}
