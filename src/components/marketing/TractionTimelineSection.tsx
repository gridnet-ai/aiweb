const MILESTONES = [
  {
    date: 'Dec 2025',
    title: 'Founder Institute',
    detail: 'Graduated from the Austin, Texas Cohort 25.',
  },
  {
    date: 'Jan 2026',
    title: 'MVP launched',
    detail: 'Big Search entered the market with its first live product.',
  },
  {
    date: 'Mar 2026',
    title: 'Google for Startups',
    detail: 'Joined the Google for Startups ecosystem.',
  },
  {
    date: 'Jun 2026',
    title: 'Commercial traction',
    detail: 'First paying customer and signed LOI for the SATX District One pilot.',
  },
] as const;

const PROOF_POINTS = [
  { value: '14,927', label: 'AI Web Pages published' },
  { value: '55,791', label: 'AI crawler hits in 24 hours' },
  { value: '78,991', label: 'Machine-readable file fetches' },
  { value: '78%', label: 'Average scroll depth' },
] as const;

export function TractionTimelineSection() {
  return (
    <section className="marketing-reveal relative w-full overflow-hidden border-t border-marketing-border px-4 py-14 sm:px-5 md:px-8 md:py-20">
      <div
        className="pointer-events-none absolute -right-28 top-0 h-[430px] w-[430px] rounded-full bg-[conic-gradient(from_200deg_at_50%_50%,#FFC629_0%,#ff6b4a_25%,#c850c0_55%,#635bff_80%,#FFC629_100%)] opacity-20 blur-3xl md:h-[600px] md:w-[600px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-[1080px]">
        <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
          Traction
        </p>
        <div className="mt-3 max-w-3xl">
          <h2 className="font-display text-[clamp(2.25rem,7vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-marketing-ink">
            Building the AI Web.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-marketing-muted md:text-lg">
            From MVP to measurable market adoption in six months, validated by crawler activity,
            engaged users, and early customer demand.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-marketing-border bg-marketing-border md:grid-cols-4">
          {PROOF_POINTS.map((point) => (
            <div key={point.label} className="bg-white/90 p-5 backdrop-blur-sm md:p-6">
              <p className="font-display text-2xl font-extrabold tracking-tight text-marketing-ink md:text-3xl">
                {point.value}
              </p>
              <p className="mt-1 text-xs leading-snug text-marketing-muted md:text-[13px]">
                {point.label}
              </p>
            </div>
          ))}
        </div>

        <ol className="relative mt-12 grid gap-8 before:absolute before:bottom-0 before:left-[5px] before:top-2 before:w-px before:bg-marketing-border md:grid-cols-4 md:gap-5 md:before:left-0 md:before:right-0 md:before:top-[5px] md:before:h-px md:before:w-auto">
          {MILESTONES.map((milestone, index) => (
            <li key={milestone.date} className="relative pl-8 md:pl-0 md:pt-8">
              <span
                className={`absolute left-0 top-1 z-10 block h-[11px] w-[11px] rounded-full ring-4 ring-white ${
                  index === MILESTONES.length - 1 ? 'bg-marketing-gold' : 'bg-marketing-ink'
                }`}
                aria-hidden
              />
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-marketing-muted2">
                {milestone.date}
              </p>
              <h3 className="mt-2 text-base font-bold text-marketing-ink">{milestone.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-marketing-muted">
                {milestone.detail}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-3xl border-l-2 border-marketing-gold pl-4 text-sm leading-relaxed text-marketing-muted">
          Additional June signals included 19 sign-ups, 75 logins, and 224 tracked form submissions,
          with 3.72 pages viewed per session.
        </p>
      </div>
    </section>
  );
}
