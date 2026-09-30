/**
 * Marketing story steps 1 & 3 — Publisher create/publish + Metrics Receipts.
 * Visuals mirror real AppShell / PublisherWorkspace / LeadsPanel chrome.
 */
import { useEffect, useRef, useState } from 'react';
import AIWebLogo from '@/components/welcome/AIWebLogo';
import { PublisherIcon } from '@/components/welcome/PublisherIcon';
import { CrawlerFamilyLogo } from '@/components/hits/CrawlerFamilyLogo';
import { crawlerFamilyBrand } from '@/lib/hits/crawlerFamilyBrand';
import { AiScoreRing } from '@/publisher/AiScoreRing';
import './chatgptReceiptDemo.css';
import '@/styles/publisher-chrome-demo.css';

export const STORY_RECEIPT = 'OPbWTEhIyAF1vRLh6qDK';
export const STORY_PAGE = 'Savory Moments Wedding Catering';
export const STORY_SLUG = 'savory-moments-wedding-catering';
export const STORY_ADDRESS = `publisher.theaiwebcompany.com/irl/${STORY_SLUG}`;

type StepProps = {
  playKey: number;
  forceFinal?: boolean;
  loop?: boolean;
  onMount: (el: HTMLDivElement | null) => void;
};

function at(timers: number[], ms: number, fn: () => void) {
  timers.push(window.setTimeout(fn, ms));
}

const CHATGPT_BRAND = crawlerFamilyBrand('openai')!;
const BROWSER_BRAND = crawlerFamilyBrand('human')!;

/** Step 1 — owner creates & publishes an AI Web Page */
export function PublishStoryCard({ playKey, forceFinal, loop = true, onMount }: StepProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [publishHit, setPublishHit] = useState(false);
  const [cursor, setCursor] = useState({ x: 72, y: 120, click: false, visible: true });

  useEffect(() => {
    onMount(rootRef.current);
  }, [onMount, playKey]);

  useEffect(() => {
    if (forceFinal) {
      setPhase(5);
      setPrompt('Create a quote page for Savory Moments Wedding Catering.');
      setPublishHit(false);
      setCursor({ x: 0, y: 0, click: false, visible: false });
      return;
    }

    const timers: number[] = [];
    let cancelled = false;
    let typeRaf = 0;

    const move = (x: number, y: number, click = false) => {
      if (!cancelled) setCursor({ x, y, click, visible: true });
    };

    const moveToPublish = (click = false) => {
      const root = rootRef.current;
      const btn = root?.querySelector('[data-demo="publish-btn"]');
      if (!root || !btn) {
        move(360, 20, click);
        return;
      }
      const r = btn.getBoundingClientRect();
      const p = root.getBoundingClientRect();
      const scaleAttr = root.closest('[data-publish-scale]')?.getAttribute('data-publish-scale');
      const scale = Number.parseFloat(scaleAttr || '1') || 1;
      move(
        (r.left - p.left + r.width / 2) / scale,
        (r.top - p.top + r.height / 2) / scale,
        click,
      );
    };

    const typePrompt = (text: string, done: () => void) => {
      setPrompt('');
      const start = performance.now();
      const cps = 36;
      const tick = (now: number) => {
        if (cancelled) return;
        const n = Math.min(text.length, Math.floor(((now - start) / 1000) * cps));
        setPrompt(text.slice(0, n));
        if (n < text.length) typeRaf = requestAnimationFrame(tick);
        else done();
      };
      typeRaf = requestAnimationFrame(tick);
    };

    const run = () => {
      if (cancelled) return;
      setPhase(0);
      setPrompt('');
      setPublishHit(false);
      move(96, 150);
      at(timers, 450, () => {
        setPhase(1);
        move(480, 270);
        typePrompt('Create a quote page for Savory Moments Wedding Catering.', () => {
          at(timers, 280, () => {
            setPhase(2);
            move(280, 170);
            at(timers, 1000, () => {
              setPhase(3);
              moveToPublish(false);
              at(timers, 650, () => {
                moveToPublish(true);
                setPublishHit(true);
                setPhase(4);
                at(timers, 200, () => {
                  moveToPublish(false);
                  setPublishHit(false);
                  setPhase(5);
                  at(timers, 3400, () => {
                    if (loop && !cancelled) run();
                  });
                });
              });
            });
          });
        });
      });
    };

    run();
    return () => {
      cancelled = true;
      cancelAnimationFrame(typeRaf);
      timers.forEach(clearTimeout);
    };
  }, [playKey, forceFinal, loop]);

  const built = phase >= 2;
  const published = phase >= 5;
  const score = published ? 74 : built ? 51 : 0;

  return (
    <div
      className="story-card-real relative overflow-hidden rounded-none border border-brand-line bg-brand-sand text-brand-ink shadow-none"
      ref={rootRef}
      data-demo="publish"
    >
      {/* Top chrome — brand | canvas tools | agent tabs (aligned to columns below) */}
      <div className="flex h-10 shrink-0 border-b border-black/[0.08] bg-[#f4f4f5]">
        <div className="flex w-[132px] shrink-0 items-center gap-1 px-2">
          <AIWebLogo color="#000000" width={40} className="block shrink-0" />
          <span className="select-none text-black/25" aria-hidden>
            |
          </span>
          <PublisherIcon size={14} className="shrink-0" />
          <p className="truncate text-[10px] font-extrabold tracking-tight [font-family:'Nunito_Sans',system-ui,sans-serif]">
            AIWEB OS
          </p>
        </div>
        <span className="w-px shrink-0 self-stretch bg-black/[0.08]" aria-hidden />
        <div className="flex min-w-0 flex-1 items-center gap-1.5 px-1.5">
          <div className="publisher-chrome-address min-w-0 flex-1 !max-w-none">
            <p className="min-w-0 truncate font-mono text-[9px] font-medium tracking-[-0.01em] text-zinc-700">
              {built ? STORY_ADDRESS : 'publisher.theaiwebcompany.com/publisher'}
            </p>
          </div>
          <nav className="publisher-chrome-seg shrink-0">
            <span className="publisher-chrome-action is-active !text-[9px] !px-1.5">AIWEB OS</span>
            <span className="publisher-chrome-action !text-[9px] !px-1.5">Metrics</span>
          </nav>
          <div className="publisher-chrome-cta shrink-0">
            <button
              type="button"
              data-demo="publish-btn"
              className={`publisher-chrome-share !text-[10px]${publishHit ? ' demo-hit' : ''}${published ? ' !bg-emerald-200 !text-emerald-950' : ''}`}
            >
              {published ? 'Published' : 'Publish'}
            </button>
          </div>
          <AiScoreRing score={score} title={`AI Score ${score}/100`} />
        </div>
        <div className="flex w-[148px] shrink-0 border-l border-black/10">
          <span className="publisher-chrome-tab is-active flex-1 justify-center !text-[10px]">Agent</span>
          <span className="publisher-chrome-tab flex-1 justify-center !text-[10px]">Settings</span>
        </div>
      </div>

      <div className="story-publish-body flex min-h-0 flex-1">
        {/* Pages rail — dark */}
        <aside className="flex w-[132px] shrink-0 flex-col bg-brand-panel text-white">
          <div className="flex items-center justify-between px-2 py-2">
            <p className="text-[9px] font-medium uppercase tracking-wide text-white/45">Pages</p>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-white text-brand-ink text-[12px] font-bold">
              +
            </span>
          </div>
          <div className="px-1.5 pb-2">
            <div
              className={`overflow-hidden rounded-lg text-left ${
                built ? 'bg-white text-brand-ink ring-2 ring-white/90' : 'bg-white/[0.07] text-white'
              }`}
            >
              <div className={`relative h-10 w-full ${built ? 'bg-brand-sand' : 'bg-black/35'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/80 to-rose-100/40" />
                <span
                  className={`absolute top-1 right-1 rounded px-1 py-0.5 text-[8px] font-medium capitalize ${
                    published
                      ? 'bg-emerald-500/90 text-white'
                      : built
                        ? 'bg-brand-ink/10 text-brand-ink/70'
                        : 'bg-black/45 text-white/80'
                  }`}
                >
                  {published ? 'live' : built ? 'draft' : 'new'}
                </span>
              </div>
              <div className="space-y-0.5 px-1.5 py-1.5">
                <p
                  className={`truncate text-[10px] font-medium leading-snug ${
                    built ? 'text-[#1a0dab]' : 'text-sky-200'
                  }`}
                >
                  {built ? STORY_PAGE : 'Untitled page'}
                </p>
                <p className={`line-clamp-2 text-[8px] leading-snug ${built ? 'text-brand-ink/65' : 'text-white/55'}`}>
                  {built ? 'Wedding & event catering' : 'Ask Agent to build…'}
                </p>
              </div>
            </div>
          </div>
        </aside>
        <span className="w-px shrink-0 bg-brand-line" aria-hidden />

        {/* Canvas */}
        <div className="relative flex min-w-0 flex-1 flex-col bg-white">
          <div className="flex items-center gap-1.5 border-b border-black/[0.06] bg-[#fafafa] px-1.5 py-0.5">
            <div className="publisher-chrome-seg shrink-0">
              <span className="publisher-chrome-action is-active !text-[9px] !px-1.5">Human</span>
              <span className="publisher-chrome-action !text-[9px] !px-1.5">Machine</span>
            </div>
            <div className="publisher-craft-toolbar !min-h-0 !flex-1 !border-0 !bg-transparent !py-0">
              <div className="publisher-craft-toolbar__scroll">
                {['Name', 'Email', 'Date', 'Time', 'Submit'].map((label) => (
                  <span key={label} className="publisher-craft-tool !text-[9px]">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden bg-white p-3">
            {!built ? (
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 bg-[#fafafa] text-brand-accent">
                <PublisherIcon size={40} />
                <p className="font-[Merriweather,Georgia,serif] text-[15px] text-brand-ink">AIWEB OS</p>
              </div>
            ) : (
              <div className={`mx-auto max-w-[280px]${phase === 2 ? ' story-build-in' : ''}`}>
                <h3 className="m-0 text-[16px] font-semibold tracking-tight text-brand-ink">
                  {STORY_PAGE}
                </h3>
                <p className="mt-1 mb-3 text-[11px] leading-snug text-zinc-600">
                  Wedding & event catering — request a quote from ChatGPT or the live page.
                </p>
                <div className="rounded-[14px] border border-zinc-200 bg-white p-3 shadow-sm">
                  <p className="mb-2 text-[12px] font-semibold tracking-tight">Request a quote</p>
                  <div className="space-y-2">
                    {['Name', 'Email'].map((label) => (
                      <label key={label} className="block text-[10px] font-medium text-zinc-700">
                        {label}
                        <span className="mt-0.5 block h-7 rounded-lg border border-zinc-300 bg-white" />
                      </label>
                    ))}
                    <div className="grid grid-cols-2 gap-2">
                      {['Date', 'Time'].map((label) => (
                        <label key={label} className="block text-[10px] font-medium text-zinc-700">
                          {label}
                          <span className="mt-0.5 block h-7 rounded-lg border border-zinc-300 bg-white" />
                        </label>
                      ))}
                    </div>
                    <div className="mt-1 flex h-8 items-center justify-center rounded-lg bg-zinc-900 text-[11px] font-semibold text-white">
                      Submit
                    </div>
                  </div>
                </div>
                {published ? (
                  <p className="mt-2 truncate font-mono text-[9px] text-emerald-700">{STORY_ADDRESS}</p>
                ) : null}
              </div>
            )}
          </div>
        </div>
        <span className="w-px shrink-0 bg-black/10" aria-hidden />

        {/* Agent column — width matches Agent/Settings tabs above */}
        <aside className="flex w-[148px] shrink-0 flex-col border-l border-black/10 bg-white">
          <div className="min-h-0 flex-1 space-y-2 overflow-hidden px-2 py-2">
            {/* Fixed prompt slot — typing must not grow the card */}
            <div className="min-h-[4.75rem]">
              {phase >= 1 && prompt ? (
                <div className="ml-1 rounded-2xl bg-brand-ink px-2 py-1.5 text-[9px] leading-snug text-white">
                  {prompt}
                  {phase === 1 ? <span className="cgpt-caret !bg-white !h-2.5" /> : null}
                </div>
              ) : (
                <p className="px-1 text-[9px] text-zinc-400">Ask the publisher agent…</p>
              )}
            </div>
            <div className={`min-h-[2.75rem]${phase >= 2 ? '' : ' invisible'}`} aria-hidden={phase < 2}>
              <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-2 py-1.5 text-[9px] leading-snug text-zinc-600">
                {published
                  ? 'Published dual-surface page · Human + Machine live.'
                  : 'Crafting Human canvas + inquiry form…'}
              </div>
            </div>
          </div>
          <div className="shrink-0 border-t border-white/10 bg-[#101010] px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="inline-flex h-5 items-center rounded-md bg-emerald-400 px-1.5 text-[10px] font-semibold text-black">
                Build
              </span>
              <span className="inline-flex h-5 items-center rounded-md border border-white/10 bg-white/5 px-1.5 text-[9px] text-zinc-300">
                Auto
              </span>
            </div>
          </div>
        </aside>
      </div>

      {cursor.visible ? (
        <div
          className={`story-cursor${cursor.click ? ' is-click' : ''}`}
          style={{ left: cursor.x, top: cursor.y }}
          aria-hidden
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M4.2 3.4 19 11.2l-6.4 1.4 2.8 6.6-2.6 1.1-2.8-6.5-4.6 4.4z"
              fill="#fff"
              stroke="#111"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : null}
    </div>
  );
}

type LeadRow = {
  id: string;
  when: string;
  name: string;
  email: string;
  event: string;
  sourceLabel: string;
  brand: NonNullable<ReturnType<typeof crawlerFamilyBrand>>;
  status: string;
  page: string;
  highlight?: boolean;
};

const PRIOR_LEAD: LeadRow = {
  id: 'aRj1qkMecIwpdRF2EKv5',
  when: 'Aug 18, 2:14 PM',
  name: 'Jordan Lee',
  email: 'jordan@example.com',
  event: '2026-09-12 · 17:00',
  sourceLabel: 'Browser · form',
  brand: BROWSER_BRAND,
  status: 'contacted',
  page: STORY_PAGE,
};

const NEW_LEAD: LeadRow = {
  id: STORY_RECEIPT,
  when: 'Aug 20, 3:35 PM',
  name: 'Becky Smith',
  email: 'bsloveflowers@email.com',
  event: '2026-08-30 · 18:00',
  sourceLabel: 'ChatGPT · mcp · request_quote',
  brand: CHATGPT_BRAND,
  status: 'new',
  page: STORY_PAGE,
  highlight: true,
};

/** Step 3 — owner sees the AIWEB Receipt on Metrics → Leads */
export function LeadsStoryCard({ playKey, forceFinal, loop = true, onMount }: StepProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [showNew, setShowNew] = useState(Boolean(forceFinal));
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    onMount(rootRef.current);
  }, [onMount, playKey]);

  useEffect(() => {
    if (forceFinal) {
      setShowNew(true);
      setPulse(false);
      return;
    }

    const timers: number[] = [];
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      setShowNew(false);
      setPulse(false);
      at(timers, 1200, () => {
        setShowNew(true);
        setPulse(true);
        at(timers, 1800, () => setPulse(false));
        at(timers, 4500, () => {
          if (loop && !cancelled) run();
        });
      });
    };

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [playKey, forceFinal, loop]);

  /* Always both rows in the DOM so table height never jumps */
  const rows = [NEW_LEAD, PRIOR_LEAD];

  return (
    <div
      className="story-card-real overflow-hidden rounded-none border border-brand-line bg-brand-sand text-brand-ink shadow-none"
      ref={rootRef}
      data-demo="leads"
    >
      {/* AppShell Metrics header */}
      <header className="shrink-0 border-b border-brand-line bg-white px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <AIWebLogo color="#000000" width={72} className="block shrink-0" />
            <span className="select-none text-brand-line" aria-hidden>
              |
            </span>
            <PublisherIcon size={16} className="shrink-0" />
            <p className="truncate text-[11px] font-extrabold tracking-tight [font-family:'Nunito_Sans',system-ui,sans-serif]">
              AIWEB OS
            </p>
          </div>
          <nav className="flex items-center gap-0.5">
            <span className="rounded-lg px-2 py-1 text-[10px] font-medium text-brand-ink/60">
              AIWEB OS
            </span>
            <span className="rounded-lg bg-brand-ink px-2 py-1 text-[10px] font-medium text-white">
              Metrics
            </span>
          </nav>
        </div>
      </header>

      <div className="story-leads-body bg-white px-3 py-3">
        <div className="mb-3 flex justify-center gap-1.5">
          <span className="inline-flex h-7 items-center rounded-md bg-neutral-100 px-2.5 text-[11px] font-medium text-neutral-700">
            HITS
          </span>
          <span className="inline-flex h-7 items-center rounded-md bg-neutral-900 px-2.5 text-[11px] font-medium text-white">
            Leads
          </span>
        </div>
        <p className="mb-2 text-center text-[10px] text-neutral-500">
          Completed AI Web Actions · each row is an <span className="font-semibold text-neutral-800">AIWEB Receipt</span>
        </p>

        <div className="w-full min-w-0 overflow-x-auto rounded-lg border border-neutral-200">
          <table className="w-max min-w-full table-auto border-collapse text-left text-[10px]">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-[8px] uppercase tracking-wide text-neutral-900">
                <th className="whitespace-nowrap px-2 py-1.5 font-semibold">When</th>
                <th className="whitespace-nowrap px-2 py-1.5 font-semibold">Receipt</th>
                <th className="px-2 py-1.5 font-semibold">Name</th>
                <th className="whitespace-nowrap px-2 py-1.5 font-semibold">Email</th>
                <th className="whitespace-nowrap px-2 py-1.5 font-semibold">Date / time</th>
                <th className="px-2 py-1.5 font-semibold">Source</th>
                <th className="whitespace-nowrap px-2 py-1.5 font-semibold">Status</th>
                <th className="px-2 py-1.5 font-semibold">Page</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const isNew = Boolean(row.highlight);
                const revealed = !isNew || showNew;
                return (
                  <tr
                    key={row.id}
                    className={`border-b border-neutral-100 align-top last:border-0${
                      isNew && showNew
                        ? ` bg-lime-50/80${pulse ? ' story-lead-pulse' : ''} story-row-in`
                        : ''
                    }${isNew && !showNew ? ' invisible' : ''}`}
                    aria-hidden={!revealed}
                  >
                    <td className="whitespace-nowrap px-2 py-1.5 text-neutral-600">{row.when}</td>
                    <td className="px-2 py-1.5 font-mono text-[8px] text-neutral-500 underline decoration-neutral-300 underline-offset-2">
                      {row.id}
                    </td>
                    <td className="px-2 py-1.5 font-medium text-neutral-900">{row.name}</td>
                    <td className="whitespace-nowrap px-2 py-1.5 text-neutral-700 underline decoration-neutral-300 underline-offset-2">
                      {row.email}
                    </td>
                    <td className="whitespace-nowrap px-2 py-1.5 text-neutral-600">{row.event}</td>
                    <td className="px-2 py-1.5">
                      <span className="inline-flex items-center gap-1" title={row.sourceLabel}>
                        <CrawlerFamilyLogo meta={row.brand} size={14} />
                        <span className="whitespace-nowrap text-[9px] text-neutral-600">
                          {row.sourceLabel}
                        </span>
                      </span>
                    </td>
                    <td className="px-2 py-1.5">
                      <span className="inline-block max-w-[4.5rem] rounded-md border border-neutral-200 bg-white px-1 py-0.5 text-[9px] capitalize text-neutral-900">
                        {row.status === 'new' ? 'Received' : row.status}
                      </span>
                    </td>
                    <td className="max-w-[5.5rem] truncate px-2 py-1.5 text-neutral-700">{row.page}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p
          className={`mt-2 text-[10px]${showNew ? ' text-neutral-600' : ' invisible text-neutral-600'}`}
          aria-hidden={!showNew}
        >
          New <span className="font-semibold">AIWEB Receipt</span> from ChatGPT · status Received
        </p>
      </div>
    </div>
  );
}
