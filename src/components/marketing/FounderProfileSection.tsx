const WHY_PARAGRAPHS = [
  'I grew up in Mobile, Alabama — a marginalized community where libraries, schools, and homes didn’t have computers. Second grade, Mary B. Austin Elementary: my first Macintosh. That next summer, my mom rented one from a school program. I never left it alone.',
  'I’ve watched this adoption curve before — computers and internet becoming a human utility. I see the same pattern now, with AI.',
] as const;

const CREDENTIALS = [
  'U.S. Army Signal Corps veteran, 25U — first work order at 19: a crashing Windows XP desktop on a military base during Operation Iraqi Freedom.',
  'Functioned as CTO of his unit — budget authority and full technical responsibility. Built military installation networks from bare earth as a private contractor afterward: trenches, buried cable, switches, routers, ISP, and application-level support — the entire stack, physical to application, more than once.',
  'Founded and operated a federal IT contracting company building VA hospital IT infrastructure — wound down in 2020 amid COVID-driven disruption to federal contracting.',
  'Founder Institute Fall 2025 alumnus — bootstrapped and launched the venture that became AI Web Company, December 2025.',
  'Techstars x Alabama Power EnergyTech, Round 2 (June 2026) — advanced past interviews; fewer than 10% of applicants reach this stage.',
  'Google for Startups member.',
  'Node 0 live in San Antonio — 1M aiWh operational capacity, today.',
] as const;

const PERSONALITY_TAGS = ['ENTJ', 'ENTP'] as const;

export function FounderProfileSection() {
  return (
    <section className="marketing-reveal relative w-full overflow-hidden border-t border-marketing-border px-4 py-14 sm:px-5 md:px-8 md:py-20">
      <div
        className="pointer-events-none absolute -left-28 top-0 h-[430px] w-[430px] rounded-full bg-[conic-gradient(from_200deg_at_50%_50%,#FFC629_0%,#ff6b4a_25%,#c850c0_55%,#635bff_80%,#FFC629_100%)] opacity-20 blur-3xl md:h-[600px] md:w-[600px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-[1080px]">
        <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
          Founder
        </p>
        <div className="mt-3 max-w-3xl">
          <h2 className="font-display text-[clamp(2.25rem,7vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-marketing-ink">
            AIWEB is the commercial action layer for AI.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-marketing-muted md:text-lg">
            The same adoption curve that turned the computer into a home utility is happening again
            — this time with AI. AI Web Company is being built by someone who has lived every layer
            of that stack.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,320px)_1fr] md:gap-8">
          <div className="flex flex-col items-start gap-5 rounded-2xl border border-marketing-border bg-white/80 p-6 backdrop-blur-sm md:p-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-marketing-ink text-2xl font-extrabold tracking-tight text-marketing-gold ring-4 ring-marketing-gold/30">
              LF
            </div>
            <div>
              <h3 className="font-display text-xl font-extrabold tracking-tight text-marketing-ink">
                La Terrance D. French
                <span className="ml-1.5 text-marketing-muted2">(&ldquo;Terry&rdquo;)</span>
              </h3>
              <p className="mt-1 text-sm font-semibold text-marketing-muted">
                Founder &amp; CEO, AI Web Company
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {PERSONALITY_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-marketing-border px-3 py-1 font-mono-marketing text-[11px] font-bold uppercase tracking-[0.12em] text-marketing-muted2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-marketing-border bg-white/80 p-6 backdrop-blur-sm md:p-8">
            <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
              Why
            </p>
            <div className="mt-4 space-y-4">
              {WHY_PARAGRAPHS.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-[15px] leading-relaxed text-marketing-muted md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-marketing-border bg-white/80 p-6 backdrop-blur-sm md:p-8">
          <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
            Credentials
          </p>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {CREDENTIALS.map((credential) => (
              <li key={credential.slice(0, 32)} className="relative pl-6">
                <span
                  className="absolute left-0 top-[7px] block h-[9px] w-[9px] rounded-full bg-marketing-gold ring-4 ring-marketing-gold/20"
                  aria-hidden
                />
                <p className="text-[13px] leading-relaxed text-marketing-muted md:text-sm">
                  {credential}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
