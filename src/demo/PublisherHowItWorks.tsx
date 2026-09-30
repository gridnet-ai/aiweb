/**
 * Embed-only 4-step AIWEB × ChatGPT story for the marketing site.
 * Ported from aiweb-publisher /demo/chatgpt (no PNG/WebM export).
 */
import { useEffect, useRef, useState } from 'react';
import {
  LeadsStoryCard,
  PublishStoryCard,
  STORY_RECEIPT,
} from '@/demo/chatgptStorySteps';
import './chatgptReceiptDemo.css';
import '@/styles/publisher-chrome-demo.css';
import './publisherHowItWorks.css';

type ChatDemoSpec = {
  id: 'quote' | 'receipt';
  user: string;
  workedLabel: string;
  assistant: string;
};

const CHAT_DEMOS: Record<'quote' | 'receipt', ChatDemoSpec> = {
  quote: {
    id: 'quote',
    user: 'Using AIWEB Plugin, request a quote from Savory Moments for August 30 at 6 PM. My name is Becky Smith and my email is bsloveflowers@email.com. Notes: seeking a quote for my wedding.',
    workedLabel: 'Worked for 15s',
    assistant: [
      'Quote request submitted successfully to Savory Moments.',
      '',
      '• **Date:** August 30, 2026',
      '• **Time:** 6:00 PM',
      '• **Name:** Becky Smith',
      `• **AIWEB Receipt:** \`${STORY_RECEIPT}\``,
    ].join('\n'),
  },
  receipt: {
    id: 'receipt',
    user: `Using the AIWEB plugin and check the receipt ${STORY_RECEIPT}.`,
    workedLabel: 'Worked for 16s',
    assistant: [
      `AIWEB Receipt \`${STORY_RECEIPT}\` is confirmed.`,
      '',
      '• **Status:** Received',
      '• **Business:** Savory Moments Wedding Catering',
      '• **Action:** Quote request',
      '• **Event:** August 30, 2026 at 6:00 PM',
      '• **Submitted:** August 20, 2026',
      '• **Actor:** ChatGPT',
    ].join('\n'),
  },
};

function renderAssistantHtml(text: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return text
    .split('\n')
    .map((line) => {
      if (!line.trim()) return '<div class="cgpt-gap"></div>';
      let html = esc(line);
      html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
      if (html.startsWith('• ')) {
        return `<div class="cgpt-li"><span class="cgpt-bullet">•</span><span>${html.slice(2)}</span></div>`;
      }
      return `<p class="cgpt-p">${html}</p>`;
    })
    .join('');
}

function ChatFooterIcons() {
  return (
    <div className="cgpt-footer" aria-hidden>
      <span className="cgpt-ico">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M5 15V7a2 2 0 012-2h8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="cgpt-ico">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 14V8M12 16V6M17 14V9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="cgpt-ico">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 12a8 8 0 0114.2-5M20 12a8 8 0 01-14.2 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d="M18 3v4h-4M6 21v-4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="cgpt-ico">···</span>
    </div>
  );
}

function ChatCard({
  demo,
  playKey,
  loop = true,
}: {
  demo: ChatDemoSpec;
  playKey: number;
  loop?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'idle' | 'worked' | 'typing' | 'done'>('idle');
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let raf = 0;
    const timers: number[] = [];
    const later = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };

    const runTyping = () => {
      if (cancelled) return;
      setPhase('typing');
      setVisibleChars(0);
      const full = demo.assistant;
      const start = performance.now();
      const cps = 44;
      const tick = (now: number) => {
        if (cancelled) return;
        const n = Math.min(full.length, Math.floor(((now - start) / 1000) * cps));
        setVisibleChars(n);
        if (n < full.length) raf = requestAnimationFrame(tick);
        else {
          setPhase('done');
          if (loop) {
            later(4500, () => {
              if (cancelled) return;
              setPhase('idle');
              setVisibleChars(0);
              later(400, startCycle);
            });
          }
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const startCycle = () => {
      if (cancelled) return;
      setPhase('idle');
      setVisibleChars(0);
      later(300, () => {
        if (cancelled) return;
        setPhase('worked');
        later(900, runTyping);
      });
    };

    startCycle();
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [demo, playKey, loop]);

  const typed = demo.assistant.slice(0, visibleChars);
  const showReply = phase === 'typing' || phase === 'done';

  return (
    <div className="cgpt-card" ref={rootRef} data-demo={demo.id}>
      <div className="cgpt-thread">
        <div className="cgpt-user-row">
          <div className="cgpt-user-bubble">{demo.user}</div>
        </div>
        {/* Always reserve “Worked for…” row so height never jumps */}
        <div className={`cgpt-worked${phase === 'idle' ? ' invisible' : ''}`} aria-hidden={phase === 'idle'}>
          {demo.workedLabel}
          <span className="cgpt-worked-chevron">›</span>
        </div>
        {/* Invisible final reply sizes the card; typed text paints on top */}
        <div className="cgpt-assistant cgpt-assistant--stable">
          <div className="cgpt-assistant-sizer" aria-hidden>
            <div
              className="cgpt-assistant-body"
              dangerouslySetInnerHTML={{ __html: renderAssistantHtml(demo.assistant) }}
            />
            <ChatFooterIcons />
          </div>
          <div className="cgpt-assistant-live">
            {showReply ? (
              <>
                <div
                  className="cgpt-assistant-body"
                  dangerouslySetInnerHTML={{
                    __html:
                      renderAssistantHtml(typed) +
                      (phase === 'typing' ? '<span class="cgpt-caret" aria-hidden></span>' : ''),
                  }}
                />
                {phase === 'done' ? <ChatFooterIcons /> : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Desktop publish chrome scaled to fit the stage width (mobile-safe). */
function PublishScaledStage({
  playKey,
  onMount,
}: {
  playKey: number;
  onMount: (el: HTMLDivElement | null) => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const DESIGN_W = 960;
  const DESIGN_H = 380;

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const update = () => {
      const w = el.getBoundingClientRect().width;
      setScale(Math.min(1, w / DESIGN_W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="publisher-how-stage publisher-how-stage--publish overflow-hidden rounded-none shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
      style={{ height: DESIGN_H * scale }}
    >
      <div
        data-publish-scale={scale}
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <PublishStoryCard playKey={playKey} loop onMount={onMount} />
      </div>
    </div>
  );
}

const STEPS: Array<
  | {
      step: string;
      title: string;
      kind: 'publish' | 'leads';
    }
  | {
      step: string;
      title: string;
      kind: 'chat';
      chat: ChatDemoSpec;
    }
> = [
  {
    step: '01',
    title: 'Business Owner creates & publishes AI Web Page',
    kind: 'publish',
  },
  {
    step: '02',
    title: 'ChatGPT user requests a quote using AIWEB Plugin and receives an AIWEB Receipt',
    kind: 'chat',
    chat: CHAT_DEMOS.quote,
  },
  {
    step: '03',
    title: 'Business Owner receives leads from ChatGPT in AIWEB OS dashboard',
    kind: 'leads',
  },
  {
    step: '04',
    title: 'ChatGPT user requests the status using the AIWEB Receipt',
    kind: 'chat',
    chat: CHAT_DEMOS.receipt,
  },
];

function titleWithBusinessOwnerMark(title: string) {
  const match = title.match(/Business Owner/i);
  if (!match || match.index === undefined) return title;
  const start = match.index;
  const end = start + match[0].length;
  return (
    <>
      {title.slice(0, start)}
      <mark className="publisher-how-owner-mark">{match[0]}</mark>
      {title.slice(end)}
    </>
  );
}

/** Stacked animated story for Introducing Publisher. */
export function PublisherHowItWorks() {
  const playKey = 0;
  const noopMount = () => undefined;

  return (
    <div className="publisher-how">
      <div className="publisher-how-heading">
        <h2 className="font-display text-[clamp(1.35rem,2.8vw,1.75rem)] font-extrabold tracking-[-0.03em] text-marketing-ink">
          <mark className="publisher-how-owner-mark">How It Works</mark>
        </h2>
      </div>
      {STEPS.map((item) => {
        const isOwner = item.kind === 'publish' || item.kind === 'leads';
        return (
          <div
            key={item.step}
            className={isOwner ? 'publisher-how-owner' : 'publisher-how-agent'}
            data-side={isOwner ? 'owner' : 'agent'}
          >
            <div className="publisher-how-step-inner">
              <div className="mb-4 flex items-baseline gap-3">
                <span
                  className={`font-mono-marketing text-[11px] font-bold tracking-[0.14em] ${
                    isOwner ? 'text-white/45' : 'text-marketing-muted2'
                  }`}
                >
                  {item.step}
                </span>
                <h3
                  className={`font-display text-[clamp(1.15rem,2.4vw,1.5rem)] font-extrabold tracking-[-0.03em] ${
                    isOwner ? 'text-white' : 'text-marketing-ink'
                  }`}
                >
                  {titleWithBusinessOwnerMark(item.title)}
                </h3>
              </div>
              {item.kind === 'publish' ? (
                <PublishScaledStage playKey={playKey} onMount={noopMount} />
              ) : (
                <div
                  className={`publisher-how-stage publisher-how-stage--${item.kind} overflow-hidden rounded-none shadow-[0_24px_60px_rgba(15,23,42,0.14)]`}
                >
                  {item.kind === 'leads' ? (
                    <LeadsStoryCard playKey={playKey} loop onMount={noopMount} />
                  ) : null}
                  {item.kind === 'chat' ? (
                    <ChatCard demo={item.chat} playKey={playKey} loop />
                  ) : null}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
