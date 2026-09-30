interface TeamAffiliation {
  src: string;
  alt: string;
}

interface TeamMember {
  initials: string;
  name: string;
  role: string;
  summary: string;
  mbti: string;
  affiliations?: TeamAffiliation[];
}

const TEAM: TeamMember[] = [
  {
    initials: 'TF',
    name: 'Terry French',
    role: 'Founder & CEO',
    summary:
      'U.S. Army Signal Corps veteran (25U). Professional multidisciplinary artist. Built full-stack military networks from bare earth, IT Manager for various employers, then operated a Federal IT SMB constructing IT Infra in VA hospital. First solo art exhibit in Fall 2025. Second-time founder; Founder Institute Fall 2025 alumnus.',
    mbti: 'ENTJ / ENTP',
    affiliations: [
      { src: '/marketing/team/us-army.png', alt: 'United States Army' },
      { src: '/marketing/team/artist-mark.png', alt: 'Multidisciplinary artist mark' },
      { src: '/marketing/team/founder-institute.png', alt: 'Founder Institute' },
    ],
  },
  {
    initials: 'CK',
    name: 'Chelsea Fama Kenney',
    role: 'COO',
    summary:
      'Leads product, onboarding, and internal systems. Background in fundraising, sales coordination, and cross-functional program management across university and nonprofit settings. B.A., Sociology, University of Hawaiʻi at Mānoa.',
    mbti: 'ISFJ / ESFJ',
    affiliations: [
      {
        src: '/marketing/team/university-of-hawaii.png',
        alt: 'University of Hawaiʻi',
      },
      {
        src: '/marketing/team/air-force-spouse.png',
        alt: 'The Air Force Spouse — Heart of the Team',
      },
    ],
  },
  {
    initials: 'MJ',
    name: 'Dr. Marlon K. John',
    role: 'General Counsel / Chief Research Officer',
    summary:
      'West Point, Columbia, Cornell, Buffalo Law, and Harvard Business School. U.S. Army LTC (Ret.), Medical Corps. NSF Principal Investigator for AI readiness — legal and federally funded research credibility for data and AI governance.',
    mbti: 'INTJ / INFJ',
    affiliations: [
      { src: '/marketing/team/us-army.png', alt: 'United States Army' },
      { src: '/marketing/team/west-point.png', alt: 'United States Military Academy at West Point' },
      { src: '/marketing/team/cornell-seal.png', alt: 'Cornell University' },
      { src: '/marketing/team/harvard-veritas.png', alt: 'Harvard University' },
      {
        src: '/marketing/team/army-medical-college.png',
        alt: 'Army Medical College',
      },
    ],
  },
  {
    initials: 'MB',
    name: 'Michael Barbine',
    role: 'CISO — Cyber Ops',
    summary:
      'Principal Architect at CDW/Red Hat; former Rapid7 DevSecOps Manager; co-founder of FoxIO. Leads grid-cyber security architecture for utility-facing compute nodes. World record holder of longest rock paper scissors game.',
    mbti: 'ISTP / INTP',
    affiliations: [
      { src: '/marketing/team/foxio.png', alt: 'FoxIO' },
      { src: '/marketing/team/george-mason.png', alt: 'George Mason University' },
      { src: '/marketing/team/mach37.png', alt: 'MACH37 Cyber Accelerator' },
    ],
  },
];

interface TeamSectionProps {
  /** Limit members shown (home teaser). Omit for full grid. */
  limit?: number;
  showFooterNote?: boolean;
}

export function TeamSection({ limit, showFooterNote = true }: TeamSectionProps) {
  const members = typeof limit === 'number' ? TEAM.slice(0, limit) : TEAM;

  return (
    <section className="marketing-reveal relative w-full overflow-hidden border-t border-marketing-border px-4 py-14 sm:px-5 md:px-8 md:py-20">
      <div
        className="pointer-events-none absolute -right-28 bottom-0 h-[430px] w-[430px] rounded-full bg-[conic-gradient(from_200deg_at_50%_50%,#FFC629_0%,#ff6b4a_25%,#c850c0_55%,#635bff_80%,#FFC629_100%)] opacity-20 blur-3xl md:h-[600px] md:w-[600px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-[1080px]">
        <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
          Team
        </p>
        <div className="mt-3 max-w-3xl">
          <h2 className="font-display text-[clamp(2.25rem,7vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-marketing-ink">
            Building the AI Web.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-marketing-muted md:text-lg">
            Infrastructure, legal and research credibility, and grid-connected security — the three
            disciplines this venture needs now.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {members.map((member) => (
            <li
              key={member.name}
              className="flex h-full flex-col gap-4 rounded-2xl border border-marketing-border bg-white/80 p-6 backdrop-blur-sm md:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-marketing-ink text-sm font-extrabold tracking-tight text-marketing-gold ring-2 ring-marketing-gold/30">
                  {member.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-marketing-ink">{member.name}</h3>
                  <p className="mt-0.5 text-[13px] font-semibold text-marketing-muted">
                    {member.role}
                  </p>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-marketing-muted md:text-sm">
                {member.summary}
              </p>
              <div className="mt-auto flex items-end justify-between gap-3 pt-1">
                {member.affiliations && member.affiliations.length > 0 ? (
                  <ul
                    className="flex min-w-0 flex-wrap items-center gap-2.5"
                    aria-label={`${member.name} affiliations`}
                  >
                    {member.affiliations.map((org) => (
                      <li
                        key={org.src}
                        className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-marketing-border bg-white p-1"
                      >
                        <img
                          src={org.src}
                          alt={org.alt}
                          loading="lazy"
                          decoding="async"
                          className="max-h-full max-w-full object-contain"
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span />
                )}
                <p
                  className="shrink-0 font-mono-marketing text-[10px] font-bold uppercase tracking-[0.14em] text-marketing-muted2"
                  aria-label={`${member.name} personality types ${member.mbti}`}
                >
                  {member.mbti}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {showFooterNote ? (
          <p className="mt-10 max-w-3xl border-l-2 border-marketing-gold pl-4 text-sm leading-relaxed text-marketing-muted">
            Together: hands-on infrastructure (physical to application), federal legal and research
            credibility, and security architecture for grid-connected systems — the stack a utility
            partnership actually requires.
          </p>
        ) : null}
      </div>
    </section>
  );
}
