/**
 * Interactive AI Web explainer — snapshot for console port (2026-07-30).
 * See docs/interactive-explainer/README.md and corp-hero-dist.css.
 * Marketing live source: src/components/corp/CorpHeroDistribution.tsx
 *
 * Includes: Start/Stop flow, Connect 1/2/3 federation, circular aiWh meter,
 * hub corner Minus to remove a web (when more than one exists).
 */
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import {
  Bot,
  Link2,
  Minus,
  Play,
  Plus,
  RefreshCw,
  Sparkles,
  Square,
  User,
} from 'lucide-react';

const MAX_SUB_WEBS = 5;
const MAX_ROOT_WEBS = 4;

/** End consumers — order: bots, agents, humans */
const ENDPOINTS = [
  { label: 'Bots', Icon: Bot },
  { label: 'Agents', Icon: Sparkles },
  { label: 'Humans', Icon: User },
] as const;

/**
 * Additive light: R + G + B → white.
 * (Pigment RYB would muddy; intelligence flow is light, not paint.)
 */
const CAPABILITIES = [
  { label: 'Search', color: '#E53935' },
  { label: 'Chat', color: '#22C55E' },
  { label: 'Publish', color: '#2563EB' },
] as const;

const MERGED_FLOW = '#FFFFFF';

type RootWeb = {
  id: string;
  live: boolean;
  subWebs: number;
  label: string;
};

function newRootId(): string {
  return `web-${Math.random().toString(36).slice(2, 9)}`;
}

function pairKey(a: string, b: string): string {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

function rootNodeKey(id: string): string {
  return `root:${id}`;
}

function subNodeKey(rootId: string, index: number): string {
  return `sub:${rootId}:${index}`;
}

function connectableKeys(roots: RootWeb[]): string[] {
  const keys: string[] = [];
  for (const r of roots) {
    if (!r.live) continue;
    keys.push(rootNodeKey(r.id));
    for (let i = 0; i < r.subWebs; i++) keys.push(subNodeKey(r.id, i));
  }
  return keys;
}

/** Complete federation mesh across every live AI Web and Sub Web. */
function meshFederationLinks(roots: RootWeb[]): string[] {
  const keys = connectableKeys(roots);
  const links: string[] = [];
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      links.push(pairKey(keys[i]!, keys[j]!));
    }
  }
  return links;
}

/** Federation toggle positions: 0 off · 1 peers · 2 cross · 3 mesh */
function linksForFedMode(mode: 0 | 1 | 2 | 3, roots: RootWeb[]): string[] {
  const live = roots.filter((r) => r.live);
  const keys = connectableKeys(roots);
  if (mode === 0 || keys.length < 2) return [];

  if (mode === 1) {
    const links: string[] = [];
    if (live.length >= 2) {
      for (let i = 0; i < live.length; i++) {
        for (let j = i + 1; j < live.length; j++) {
          links.push(pairKey(rootNodeKey(live[i]!.id), rootNodeKey(live[j]!.id)));
        }
      }
      return links;
    }
    // One live web with sub-webs: peer the root to each sub-web
    const root = live[0];
    if (!root) return [];
    for (let s = 0; s < root.subWebs; s++) {
      links.push(pairKey(rootNodeKey(root.id), subNodeKey(root.id, s)));
    }
    return links;
  }

  if (mode === 2) {
    const links: string[] = [];
    if (live.length >= 2) {
      for (let i = 0; i < live.length; i++) {
        for (let j = i + 1; j < live.length; j++) {
          const a = live[i]!;
          const b = live[j]!;
          links.push(pairKey(rootNodeKey(a.id), rootNodeKey(b.id)));
          for (let s = 0; s < a.subWebs; s++) {
            links.push(pairKey(subNodeKey(a.id, s), rootNodeKey(b.id)));
          }
          for (let s = 0; s < b.subWebs; s++) {
            links.push(pairKey(subNodeKey(b.id, s), rootNodeKey(a.id)));
          }
          if (a.subWebs > 0 && b.subWebs > 0) {
            links.push(pairKey(subNodeKey(a.id, 0), subNodeKey(b.id, 0)));
          }
        }
      }
      return [...new Set(links)];
    }
    // One live web: cross-link sibling sub-webs
    const root = live[0];
    if (!root || root.subWebs < 2) return [];
    for (let i = 0; i < root.subWebs; i++) {
      for (let j = i + 1; j < root.subWebs; j++) {
        links.push(pairKey(subNodeKey(root.id, i), subNodeKey(root.id, j)));
      }
    }
    return links;
  }

  return meshFederationLinks(roots);
}

type FedPath = { key: string; d: string };

/** Seeded baseline so each node’s meter feels distinct. */
function meterBaseline(seed: string): number {
  let h = 17;
  for (let i = 0; i < seed.length; i++) h = (h * 33 + seed.charCodeAt(i)) >>> 0;
  return (h % 55) / 10 + 1.2; // ~1.2–6.6
}

/** Circular power meter — live aiWh readout at Search/Chat/Publish junction. */
function AiWhMeterBadges({
  nodeKey,
  flowing,
  federated,
  compact,
}: {
  nodeKey: string;
  flowing: boolean;
  federated: boolean;
  compact?: boolean;
}) {
  const active = flowing || federated;
  const baseline = meterBaseline(nodeKey);
  const [value, setValue] = useState(baseline);

  useEffect(() => {
    if (!active) {
      setValue(baseline);
      return;
    }
    setValue(baseline);
    const id = window.setInterval(() => {
      setValue((prev) => {
        const drift = (Math.random() - 0.42) * 0.35;
        const next = prev + drift;
        return Math.min(9.9, Math.max(0.4, Math.round(next * 10) / 10));
      });
    }, 480);
    return () => window.clearInterval(id);
  }, [active, baseline, nodeKey]);

  if (!active) return null;

  const size = compact ? 'h-11 w-11' : 'h-14 w-14';
  const ring = federated
    ? 'border-marketing-crimson shadow-[0_0_0_2px_rgba(200,32,47,0.2)]'
    : 'border-marketing-ink/30 shadow-[0_0_0_2px_rgba(26,26,26,0.08)]';

  return (
    <div
      className={[
        'corp-hero-dist__aiwh-badge corp-hero-dist__aiwh-meter flex flex-col items-center justify-center rounded-full border-2 bg-white',
        size,
        ring,
        flowing ? 'corp-hero-dist__aiwh-meter--live' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      role="meter"
      aria-label={`${value.toFixed(1)} aiWh`}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={10}
    >
      <span
        className={[
          'font-mono-marketing font-bold uppercase leading-none tracking-[0.12em] text-marketing-muted2',
          compact ? 'text-[5px]' : 'text-[6px] sm:text-[7px]',
        ].join(' ')}
      >
        Meter
      </span>
      <span
        className={[
          'mt-0.5 font-mono-marketing font-bold leading-none tabular-nums text-marketing-ink',
          compact ? 'text-[8px]' : 'text-[9px] sm:text-[10px]',
        ].join(' ')}
      >
        {value.toFixed(1)}
        <span className="ml-0.5 font-semibold text-marketing-muted2">aiWh</span>
      </span>
    </div>
  );
}

/** SVG arcs between federated AI Webs / Sub Webs (measured from live DOM nodes). */
function FederationOverlay({
  links,
  hostRef,
  layoutKey,
}: {
  links: string[];
  hostRef: RefObject<HTMLDivElement | null>;
  layoutKey: string;
}) {
  const [paths, setPaths] = useState<FedPath[]>([]);

  const measure = useCallback(() => {
    const host = hostRef.current;
    if (!host || links.length === 0) {
      setPaths([]);
      return;
    }
    const origin = host.getBoundingClientRect();
    const next: FedPath[] = [];
    for (const key of links) {
      const [a, b] = key.split('|');
      if (!a || !b) continue;
      const ea = host.querySelector(`[data-fed-node="${a}"]`);
      const eb = host.querySelector(`[data-fed-node="${b}"]`);
      if (!(ea instanceof HTMLElement) || !(eb instanceof HTMLElement)) continue;
      const ra = ea.getBoundingClientRect();
      const rb = eb.getBoundingClientRect();
      const x1 = ra.left + ra.width / 2 - origin.left;
      const y1 = ra.top + ra.height / 2 - origin.top;
      const x2 = rb.left + rb.width / 2 - origin.left;
      const y2 = rb.top + rb.height / 2 - origin.top;
      const mx = (x1 + x2) / 2;
      const my = Math.min(y1, y2) - Math.max(28, Math.abs(x2 - x1) * 0.12);
      next.push({ key, d: `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}` });
    }
    setPaths(next);
  }, [hostRef, links]);

  useLayoutEffect(() => {
    measure();
    const host = hostRef.current;
    if (!host) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(host);
    window.addEventListener('resize', measure);
    const t1 = window.setTimeout(measure, 80);
    const t2 = window.setTimeout(measure, 650);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [hostRef, layoutKey, links, measure]);

  if (paths.length === 0) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full overflow-visible"
      aria-hidden
    >
      {paths.map(({ key, d }) => (
        <path
          key={key}
          d={d}
          className="corp-hero-dist__fed-line"
          fill="none"
          stroke="#C8202F"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/** Bidirectional packets: R / G / B → white, then reverse. */
function FlowPackets({ pathD }: { pathD: string }) {
  return (
    <g className="corp-hero-dist__flow-packets" aria-hidden>
      {CAPABILITIES.map((cap, i) => (
        <circle key={`fwd-${cap.label}`} r="3.5" fill={cap.color} opacity="0.95">
          <animateMotion
            dur="3.6s"
            begin={`${i * 0.28}s`}
            repeatCount="indefinite"
            path={pathD}
            keyPoints="0;1;1;0;0"
            keyTimes="0;0.42;0.5;0.92;1"
            calcMode="linear"
          />
        </circle>
      ))}
      <circle r="4.5" fill={MERGED_FLOW} stroke="#1a1a1a" strokeWidth="1" opacity="0.98">
        <animateMotion
          dur="3.6s"
          begin="0.9s"
          repeatCount="indefinite"
          path={pathD}
          keyPoints="0;1;1;0;0"
          keyTimes="0;0.42;0.5;0.92;1"
          calcMode="linear"
        />
      </circle>
    </g>
  );
}

function CapChip({
  label,
  color,
  flowing,
  size = 'md',
  delay,
}: {
  label: string;
  color: string;
  flowing: boolean;
  size?: 'md' | 'sm';
  delay?: string;
}) {
  const sm = size === 'sm';
  return (
    <span
      className={[
        'corp-hero-dist__bloom-cap inline-flex items-center justify-center rounded-md border bg-white/95 font-mono-marketing font-bold uppercase',
        sm
          ? 'px-1.5 py-0.5 text-[7px] tracking-[0.08em] sm:text-[8px]'
          : 'px-2 py-1 text-[9px] tracking-[0.1em]',
      ].join(' ')}
      style={{
        animationDelay: delay,
        color,
        borderColor: color,
        boxShadow: flowing ? `0 0 10px ${color}66` : undefined,
      }}
    >
      {label}
    </span>
  );
}

function EndpointFan({ flowing, compact }: { flowing: boolean; compact?: boolean }) {
  /** Line ends at column centers of an equal 3-col grid (1/6, 1/2, 5/6). */
  const vb = compact
    ? { w: 120, h: 32, midY: 10, mid: 60, left: 20, right: 100, sw: 1.25 }
    : { w: 240, h: 40, midY: 12, mid: 120, left: 40, right: 200, sw: 1.5 };

  return (
    <div className={['w-full', compact ? '' : 'mt-3 max-w-[15rem] sm:max-w-[16.5rem]'].filter(Boolean).join(' ')}>
      <svg
        className="pointer-events-none block h-auto w-full text-marketing-border"
        viewBox={`0 0 ${vb.w} ${vb.h}`}
        fill="none"
        aria-hidden
      >
        <path
          className="corp-hero-dist__bloom-stroke"
          d={`M${vb.mid} 0 V${vb.midY}`}
          stroke="currentColor"
          strokeWidth={vb.sw}
        />
        <path
          className="corp-hero-dist__bloom-stroke"
          d={`M${vb.mid} ${vb.midY} H${vb.left} V${vb.h}`}
          stroke="currentColor"
          strokeWidth={vb.sw}
        />
        <path
          className="corp-hero-dist__bloom-stroke"
          d={`M${vb.mid} ${vb.midY} V${vb.h}`}
          stroke="currentColor"
          strokeWidth={vb.sw}
        />
        <path
          className="corp-hero-dist__bloom-stroke"
          d={`M${vb.mid} ${vb.midY} H${vb.right} V${vb.h}`}
          stroke="currentColor"
          strokeWidth={vb.sw}
        />
        {flowing ? (
          <>
            <FlowPackets pathD={`M${vb.mid} 0 V${vb.midY} H${vb.left} V${vb.h}`} />
            <FlowPackets pathD={`M${vb.mid} 0 V${vb.h}`} />
            <FlowPackets pathD={`M${vb.mid} 0 V${vb.midY} H${vb.right} V${vb.h}`} />
          </>
        ) : null}
      </svg>
      <ul className="grid w-full grid-cols-3 gap-0" aria-label="Delivers to bots, agents, and humans">
        {ENDPOINTS.map(({ label, Icon }) => (
          <li key={label} className="flex flex-col items-center gap-1">
            <span
              className={[
                'flex items-center justify-center bg-marketing-off text-marketing-ink',
                compact ? 'h-7 w-7 rounded-lg' : 'h-10 w-10 rounded-xl',
                flowing ? 'corp-hero-dist__endpoint--merged' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <Icon className={compact ? 'h-3 w-3' : 'h-4 w-4'} strokeWidth={1.75} aria-hidden />
            </span>
            <span
              className={[
                'text-center font-mono-marketing font-bold uppercase text-marketing-muted2',
                compact ? 'text-[7px] tracking-[0.08em] sm:text-[8px]' : 'text-[10px] tracking-[0.14em]',
              ].join(' ')}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** One live root as a column in the shared graph. */
function RootGraphColumn({
  root,
  flowing,
  selected,
  links,
  onSelect,
}: {
  root: RootWeb;
  flowing: boolean;
  selected: boolean;
  links: string[];
  onSelect: () => void;
}) {
  const originKey = rootNodeKey(root.id);
  const originLinked = links.some((key) => key.includes(originKey));

  return (
    <div
      className={[
        'corp-hero-dist__root-col flex min-w-0 flex-1 flex-col items-center',
        selected ? 'corp-hero-dist__root-col--active' : '',
        originLinked ? 'corp-hero-dist__root-col--linked' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Origin: main web icon in the graph */}
      <button
        type="button"
        onClick={onSelect}
        aria-label={`Select ${root.label}`}
        aria-pressed={selected}
        data-fed-node={originKey}
        className={[
          'corp-hero-dist__origin relative z-[2] flex h-12 w-12 items-center justify-center rounded-2xl bg-marketing-ink transition sm:h-14 sm:w-14',
          flowing ? 'corp-hero-dist__hub--flowing' : 'corp-hero-dist__hub--live',
          selected ? 'ring-2 ring-marketing-gold ring-offset-2' : '',
          originLinked ? 'outline outline-1 outline-offset-2 outline-marketing-gold/60' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <img
          src="/marketing/ai-web-logo-white.png"
          alt=""
          width={40}
          height={40}
          className="h-8 w-8 object-contain sm:h-9 sm:w-9"
        />
      </button>
      <p className="mt-1.5 font-mono-marketing text-[9px] font-bold uppercase tracking-[0.12em] text-marketing-ink">
        {root.label}
      </p>

      <svg
        className="pointer-events-none mt-2 h-8 w-full max-w-[10rem] text-marketing-border"
        viewBox="0 0 160 32"
        fill="none"
        aria-hidden
      >
        <path className="corp-hero-dist__bloom-stroke" d="M80 0 V32" stroke="currentColor" strokeWidth="1.5" />
        {flowing ? <FlowPackets pathD="M80 0 V32" /> : null}
      </svg>

      {/* Single aiWh meter at Search / Chat / Publish junction */}
      <div className="corp-hero-dist__bloom-node flex flex-col items-center gap-1.5">
        <div
          className="flex flex-wrap items-center justify-center gap-1"
          aria-label={`${root.label} distributes Search, Chat, and Publish`}
        >
          {CAPABILITIES.map(({ label, color }, ci) => (
            <CapChip
              key={label}
              label={label}
              color={color}
              flowing={flowing}
              size="sm"
              delay={`${0.2 + ci * 0.05}s`}
            />
          ))}
        </div>
        <AiWhMeterBadges nodeKey={originKey} flowing={flowing} federated={originLinked} />
      </div>

      {root.subWebs > 0 ? (
        <>
          <svg
            className="pointer-events-none mt-3 h-8 w-full max-w-[8rem] text-marketing-border"
            viewBox="0 0 120 32"
            fill="none"
            aria-hidden
          >
            <path className="corp-hero-dist__bloom-stroke" d="M60 0 V32" stroke="currentColor" strokeWidth="1.5" />
            {flowing ? <FlowPackets pathD="M60 0 V32" /> : null}
          </svg>
          <ul
            className="flex w-full flex-wrap items-start justify-center gap-3"
            aria-label={`Sub-webs under ${root.label}`}
          >
            {Array.from({ length: root.subWebs }, (_, i) => {
              const nodeKey = subNodeKey(root.id, i);
              const subLinked = links.some((key) => key.includes(nodeKey));

              return (
                <li
                  key={`${root.id}-sub-${i}`}
                  className="corp-hero-dist__subweb flex w-[6.75rem] flex-col items-center gap-1.5 sm:w-[7.5rem]"
                  style={{ animationDelay: `${0.35 + i * 0.06}s` }}
                >
                  <span
                    data-fed-node={nodeKey}
                    aria-label={`${root.label} Sub Web ${i + 1}`}
                    className={[
                      'relative z-[2] flex h-9 w-9 items-center justify-center rounded-xl border border-marketing-border bg-white',
                      flowing ? 'corp-hero-dist__endpoint--merged' : '',
                      subLinked ? 'outline outline-1 outline-offset-2 outline-marketing-gold/60' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <img
                      src="/marketing/ai-web-logo-black.png"
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                    />
                  </span>
                  <span className="font-mono-marketing text-[8px] font-bold uppercase tracking-[0.1em] text-marketing-ink">
                    Sub Web {i + 1}
                  </span>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex flex-wrap items-center justify-center gap-0.5">
                      {CAPABILITIES.map(({ label, color }) => (
                        <CapChip key={label} label={label} color={color} flowing={flowing} size="sm" />
                      ))}
                    </div>
                    <AiWhMeterBadges
                      nodeKey={nodeKey}
                      flowing={flowing}
                      federated={subLinked}
                      compact
                    />
                  </div>
                  <EndpointFan flowing={flowing} compact />
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <EndpointFan flowing={flowing} />
      )}
    </div>
  );
}

/**
 * Interactive lesson: top-level AI Webs, nested sub-webs, and peer connections.
 */
export function CorpHeroDistribution() {
  const labelId = useId();
  const graphHostRef = useRef<HTMLDivElement>(null);
  const [roots, setRoots] = useState<RootWeb[]>(() => {
    const id = newRootId();
    return [{ id, live: false, subWebs: 0, label: 'AI Web 1' }];
  });
  const [activeId, setActiveId] = useState(() => roots[0]?.id ?? '');
  const [spinningId, setSpinningId] = useState<string | null>(null);
  const [links, setLinks] = useState<string[]>([]);
  const [bloomTick, setBloomTick] = useState(0);
  const [flowing, setFlowing] = useState(false);
  const [fedMode, setFedMode] = useState<0 | 1 | 2 | 3>(0);

  const anyLive = roots.some((r) => r.live);
  const canAddRoot = roots.length < MAX_ROOT_WEBS;
  const liveRoots = roots.filter((r) => r.live);

  /** Keep federation links in sync with mode + graph shape. */
  useEffect(() => {
    setLinks(linksForFedMode(fedMode, roots));
  }, [fedMode, roots]);

  function spinRoot(id: string) {
    const root = roots.find((r) => r.id === id);
    if (!root || spinningId) return;
    if (root.live && root.subWebs >= MAX_SUB_WEBS) {
      setActiveId(id);
      setBloomTick((t) => t + 1);
      return;
    }

    setActiveId(id);
    setSpinningId(id);
    window.setTimeout(() => {
      setRoots((prev) =>
        prev.map((r) => {
          if (r.id !== id) return r;
          if (!r.live) return { ...r, live: true };
          return { ...r, subWebs: Math.min(r.subWebs + 1, MAX_SUB_WEBS) };
        }),
      );
      setBloomTick((t) => t + 1);
      setSpinningId(null);
    }, 700);
  }

  function addRoot() {
    if (!canAddRoot) return;
    const id = newRootId();
    const n = roots.length + 1;
    setRoots((prev) => [...prev, { id, live: false, subWebs: 0, label: `AI Web ${n}` }]);
    setActiveId(id);
  }

  function removeRoot(id: string) {
    if (roots.length <= 1 || spinningId) return;
    const next = roots.filter((r) => r.id !== id);
    if (next.length === 0) return;
    setRoots(next);
    if (activeId === id) setActiveId(next[0]!.id);
    if (spinningId === id) setSpinningId(null);
    setBloomTick((t) => t + 1);
  }

  function startFlow() {
    if (flowing || spinningId) return;
    const root = roots.find((r) => r.id === activeId) ?? roots[0];
    if (!root) return;
    if (!root.live) {
      setSpinningId(root.id);
      window.setTimeout(() => {
        setRoots((prev) =>
          prev.map((r) => (r.id === root.id ? { ...r, live: true } : r)),
        );
        setBloomTick((t) => t + 1);
        setSpinningId(null);
        setFlowing(true);
      }, 700);
      return;
    }
    setFlowing(true);
  }

  function stopFlow() {
    setFlowing(false);
  }

  function setFederationMode(mode: 1 | 2 | 3) {
    if (fedMode === mode) {
      setFedMode(0);
      return;
    }
    setFedMode(mode);
    if (!flowing) setFlowing(true);
  }

  function reset() {
    const id = newRootId();
    setRoots([{ id, live: false, subWebs: 0, label: 'AI Web 1' }]);
    setActiveId(id);
    setSpinningId(null);
    setLinks([]);
    setFedMode(0);
    setBloomTick(0);
    setFlowing(false);
  }

  return (
    <div className="corp-hero-dist relative mx-auto w-full max-w-4xl" aria-labelledby={labelId}>
      <p
        id={labelId}
        className="mx-auto max-w-xl text-center text-[14px] leading-relaxed text-marketing-muted md:text-[15px]"
      >
        Try our interactive explainer below.
      </p>

      <div className="mt-3 flex items-center justify-center gap-1.5" role="group" aria-label="AI Web power">
        <button
          type="button"
          disabled={flowing || Boolean(spinningId)}
          onClick={startFlow}
          title={flowing ? 'Already running' : 'Start / Resume intelligence flow'}
          aria-label="Start / Resume intelligence flow"
          className="inline-flex h-8 items-center gap-1 rounded-md border border-marketing-border bg-white/90 px-2 font-mono-marketing text-[9px] font-bold uppercase tracking-[0.1em] text-marketing-muted transition hover:border-marketing-ink hover:text-marketing-ink disabled:cursor-not-allowed disabled:opacity-35"
        >
          <Play className="h-3.5 w-3.5" aria-hidden fill="currentColor" />
          Start
        </button>
        <button
          type="button"
          disabled={!flowing}
          onClick={stopFlow}
          title={flowing ? 'Stop intelligence flow' : 'Already stopped'}
          aria-label="Stop intelligence flow"
          className="inline-flex h-8 items-center gap-1 rounded-md border border-marketing-border bg-white/90 px-2 font-mono-marketing text-[9px] font-bold uppercase tracking-[0.1em] text-marketing-muted transition hover:border-marketing-ink hover:text-marketing-ink disabled:cursor-not-allowed disabled:opacity-35"
        >
          <Square className="h-3 w-3" aria-hidden fill="currentColor" />
          Stop
        </button>

        <div
          className={[
            'inline-flex h-8 items-center overflow-hidden rounded-md border',
            fedMode > 0 ? 'border-marketing-crimson' : 'border-marketing-border',
          ].join(' ')}
          role="group"
          aria-label="Federation mode 1 peers, 2 cross, 3 mesh"
          title="Federation on current webs / sub-webs: 1 peers · 2 cross · 3 mesh"
        >
          <span
            className={[
              'inline-flex h-full items-center gap-1 border-r px-2 font-mono-marketing text-[9px] font-bold uppercase tracking-[0.1em]',
              fedMode > 0
                ? 'border-marketing-crimson/40 bg-marketing-crimson text-white'
                : 'border-marketing-border bg-white/90 text-marketing-muted',
            ].join(' ')}
          >
            <Link2 className="h-3.5 w-3.5" aria-hidden />
            Connect
          </span>
          {([1, 2, 3] as const).map((n) => {
            const on = fedMode === n;
            return (
              <button
                key={n}
                type="button"
                disabled={Boolean(spinningId)}
                onClick={() => setFederationMode(n)}
                aria-pressed={on}
                aria-label={`Federation mode ${n}`}
                className={[
                  'inline-flex h-full min-w-8 items-center justify-center px-2.5 font-mono-marketing text-[11px] font-bold transition',
                  on
                    ? 'bg-marketing-crimson text-white'
                    : 'bg-white/90 text-marketing-muted hover:bg-marketing-off hover:text-marketing-ink disabled:cursor-not-allowed disabled:opacity-35',
                  n < 3 ? 'border-r border-marketing-border' : '',
                  on && n < 3 ? 'border-marketing-crimson/40' : '',
                ].join(' ')}
              >
                {n}
              </button>
            );
          })}
        </div>

        {anyLive ? (
          <button
            type="button"
            onClick={reset}
            title="Start over"
            aria-label="Start over"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-marketing-border bg-white/90 text-marketing-muted transition hover:border-marketing-ink hover:text-marketing-ink"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden />
          </button>
        ) : null}
      </div>

      {/* Control hubs — spin up / nest / add */}
      <div className="relative z-10 mt-8">
        <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-5">
          {roots.map((root) => {
            const selected = root.id === activeId;
            const spinning = spinningId === root.id;
            const atCap = root.live && root.subWebs >= MAX_SUB_WEBS;
            const nodeKey = rootNodeKey(root.id);
            const linked = links.some((key) => key.includes(nodeKey));

            return (
              <div key={root.id} className="flex w-[5.5rem] flex-col items-center gap-1.5 sm:w-24">
                <div className="relative">
                  <button
                    type="button"
                    disabled={Boolean(spinningId)}
                    onClick={() => spinRoot(root.id)}
                    aria-label={
                      atCap
                        ? `${root.label} sub-web limit reached`
                        : root.live
                          ? `Nest a sub-web under ${root.label}`
                          : `Spin up ${root.label}`
                    }
                    aria-pressed={selected}
                    className={[
                      'corp-hero-dist__hub relative flex h-16 w-16 items-center justify-center rounded-2xl bg-marketing-ink transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marketing-gold sm:h-[4.5rem] sm:w-[4.5rem]',
                      spinning ? 'corp-hero-dist__hub--spinning' : '',
                      root.live ? 'corp-hero-dist__hub--live' : '',
                      flowing && root.live ? 'corp-hero-dist__hub--flowing' : '',
                      selected ? 'ring-2 ring-marketing-gold ring-offset-2' : '',
                      linked ? 'outline outline-1 outline-offset-2 outline-marketing-gold/50' : '',
                      atCap ? 'opacity-80' : 'cursor-pointer hover:scale-[1.03]',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <img
                      src="/marketing/ai-web-logo-white.png"
                      alt=""
                      width={48}
                      height={48}
                      className={[
                        'h-9 w-9 object-contain sm:h-10 sm:w-10',
                        spinning ? 'corp-hero-dist__icon--spin' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    />
                  </button>
                  {roots.length > 1 ? (
                    <button
                      type="button"
                      disabled={Boolean(spinningId)}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRoot(root.id);
                      }}
                      title={`Remove ${root.label}`}
                      aria-label={`Remove ${root.label}`}
                      className="corp-hero-dist__hub-remove absolute -right-1.5 -top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-marketing-border bg-white text-marketing-crimson shadow-sm transition hover:border-marketing-crimson hover:bg-marketing-crimson hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Minus className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                    </button>
                  ) : null}
                </div>
                <p className="font-mono-marketing text-[9px] font-bold uppercase tracking-[0.12em] text-marketing-muted2">
                  {root.label}
                </p>
                <p className="max-w-[6.5rem] text-center text-[10px] font-semibold leading-snug text-marketing-crimson">
                  {spinning
                    ? 'Spinning…'
                    : !root.live
                      ? 'Click to spin up'
                      : atCap
                        ? 'Full'
                        : selected
                          ? 'Click again for a sub-web'
                          : `${root.subWebs}/${MAX_SUB_WEBS} sub web`}
                </p>
              </div>
            );
          })}

          <div className="flex w-[5.5rem] flex-col items-center gap-1.5 sm:w-24">
            <button
              type="button"
              disabled={!canAddRoot}
              onClick={addRoot}
              aria-label={
                canAddRoot
                  ? 'Create a new top-level AI Web'
                  : `Maximum of ${MAX_ROOT_WEBS} top-level AI Webs`
              }
              className={[
                'flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-marketing-border bg-white text-marketing-ink transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marketing-gold sm:h-[4.5rem] sm:w-[4.5rem]',
                canAddRoot
                  ? 'cursor-pointer hover:border-marketing-ink hover:bg-marketing-off'
                  : 'cursor-not-allowed opacity-40',
              ].join(' ')}
            >
              <Plus className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </button>
            <p className="font-mono-marketing text-[9px] font-bold uppercase tracking-[0.12em] text-marketing-muted2">
              New web
            </p>
          </div>
        </div>

        {/* Shared graph: every live web + its sub-webs + federation links */}
        {liveRoots.length > 0 ? (
          <div
            key={`graph-${bloomTick}-${liveRoots.map((r) => `${r.id}:${r.subWebs}`).join('|')}`}
            ref={graphHostRef}
            className={[
              'corp-hero-dist__bloom relative mt-10',
              flowing ? 'corp-hero-dist__bloom--flowing' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            data-flowing={flowing ? 'true' : undefined}
          >
            <FederationOverlay
              links={links}
              hostRef={graphHostRef}
              layoutKey={`${bloomTick}|${liveRoots.map((r) => `${r.id}:${r.subWebs}`).join('|')}|${links.join(',')}`}
            />
            <div
              className={[
                'relative z-[2] flex flex-wrap items-start justify-center gap-6 sm:gap-8',
                liveRoots.length > 1 ? 'corp-hero-dist__graph-row' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {liveRoots.map((root) => (
                <div key={root.id} className="relative flex min-w-0 items-stretch">
                  <RootGraphColumn
                    root={root}
                    flowing={flowing}
                    selected={root.id === activeId}
                    links={links}
                    onSelect={() => setActiveId(root.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
