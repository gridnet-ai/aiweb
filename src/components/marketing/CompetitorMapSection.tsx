interface MapPoint {
  label: string;
  shortLabel?: string;
  sublabel?: string;
  x: number;
  y: number;
  group: 'visibility' | 'answers';
}

const POINTS: MapPoint[] = [
  { label: 'Ahrefs', x: 30, y: 24, group: 'visibility' },
  { label: 'Semrush', x: 47, y: 32, group: 'visibility' },
  { label: 'Profound', x: 53, y: 22, group: 'visibility' },
  { label: 'Perplexity', shortLabel: 'Perplex.', sublabel: 'some retrieval', x: 66, y: 66, group: 'answers' },
  { label: 'Google AI Overview', shortLabel: 'Google AI', x: 83, y: 72, group: 'answers' },
  { label: 'Model Aggregator', shortLabel: 'Aggregator', x: 57, y: 80, group: 'answers' },
  { label: 'Open Router', shortLabel: 'OpenRouter', x: 71, y: 86, group: 'answers' },
  { label: 'Poe', x: 85, y: 87, group: 'answers' },
];

const GROUP_STYLES: Record<MapPoint['group'], string> = {
  visibility: 'bg-[#C79A3B] text-white',
  answers: 'bg-[#3B6FD4] text-white',
};

export function CompetitorMapSection() {
  return (
    <section className="marketing-reveal relative w-full overflow-hidden border-t border-marketing-border px-4 py-14 sm:px-5 md:px-8 md:py-20">
      <div
        className="pointer-events-none absolute -right-28 bottom-0 h-[430px] w-[430px] rounded-full bg-[conic-gradient(from_200deg_at_50%_50%,#FFC629_0%,#ff6b4a_25%,#c850c0_55%,#635bff_80%,#FFC629_100%)] opacity-20 blur-3xl md:h-[600px] md:w-[600px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-[1080px]">
        <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
          Competitor
        </p>
        <div className="mt-3 max-w-3xl">
          <h2 className="font-display text-[clamp(2.25rem,7vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-marketing-ink">
            Everyone solves part of AI search.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-marketing-muted md:text-lg">
            Through Big Search, AI Web Company is building for all of it — multi-model search and
            the visibility layer in one place.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-marketing-border bg-white/80 p-3 backdrop-blur-sm sm:p-6 md:p-8">
          <div className="mx-auto w-full max-w-[820px]">
            <p className="mb-2 text-center text-[9px] font-bold uppercase tracking-[0.08em] text-marketing-muted2 sm:mb-3 sm:text-[11px]">
              Visibility infrastructure
            </p>

            <div className="flex items-stretch gap-1.5 sm:gap-3">
              <p className="flex w-7 shrink-0 items-center justify-center text-center text-[9px] font-bold uppercase leading-tight tracking-[0.06em] text-marketing-muted2 sm:w-10 sm:text-[11px] [writing-mode:vertical-rl] rotate-180">
                Single AI
              </p>

              <div className="relative min-w-0 flex-1 aspect-square sm:aspect-[4/3]">
                <div
                  className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-marketing-border"
                  aria-hidden
                />
                <div
                  className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-marketing-border"
                  aria-hidden
                />

                <span
                  className="absolute z-0 block rounded-lg bg-marketing-gold/10"
                  style={{ left: '50%', top: '0%', width: '50%', height: '50%' }}
                  aria-hidden
                />

                {POINTS.map((point) => (
                  <div
                    key={point.label}
                    className="absolute z-10 flex size-[3.25rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center sm:size-[4.75rem]"
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  >
                    <div
                      className={`flex h-full w-full flex-col items-center justify-center rounded-full px-0.5 sm:px-1 ${GROUP_STYLES[point.group]}`}
                    >
                      <span className="text-[8px] font-bold leading-tight sm:text-[11px]">
                        <span className="sm:hidden">{point.shortLabel ?? point.label}</span>
                        <span className="hidden sm:inline">{point.label}</span>
                      </span>
                      {point.sublabel ? (
                        <span className="hidden text-[9px] leading-tight opacity-90 sm:inline">
                          {point.sublabel}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}

                <div
                  className="absolute z-20 flex size-[5.25rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:size-[8.25rem]"
                  style={{ left: '78%', top: '22%' }}
                >
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#3F7D1F] px-1.5 text-center text-white ring-2 ring-marketing-gold/50 sm:px-2 sm:ring-4">
                    <span className="text-[10px] font-extrabold leading-tight sm:text-sm">
                      Big Search
                    </span>
                    <span className="mt-0.5 text-[7px] leading-tight text-white/90 sm:text-[10px]">
                      multi-model + visibility
                    </span>
                  </div>
                </div>
              </div>

              <p className="flex w-7 shrink-0 items-center justify-center text-center text-[9px] font-bold uppercase leading-tight tracking-[0.06em] text-marketing-muted2 sm:w-10 sm:text-[11px] [writing-mode:vertical-rl]">
                All AI multi-model
              </p>
            </div>

            <p className="mt-2 text-center text-[9px] font-bold uppercase tracking-[0.08em] text-marketing-muted2 sm:mt-3 sm:text-[11px]">
              Answers only
            </p>
          </div>

          <p className="mt-4 text-center text-[11px] text-marketing-muted2 sm:mt-6">
            Bubble size is illustrative and does not encode a metric.
          </p>
        </div>

        <p className="mt-8 max-w-3xl border-l-2 border-marketing-gold pl-4 text-sm leading-relaxed text-marketing-muted">
          Everyone else solves part of AI search. Through Big Search, AI Web Company is building
          for all of it. Frontier models (ChatGPT, Claude, Gemini, Grok) are AI utility providers —
          the generation layer we route across, not competitors.
        </p>
      </div>
    </section>
  );
}
