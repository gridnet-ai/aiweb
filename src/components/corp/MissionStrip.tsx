import { CorpHeroDistribution } from '@/components/corp/CorpHeroDistribution';

export function MissionStrip() {
  return (
    <section className="marketing-reveal border-t border-marketing-border px-4 py-14 sm:px-5 md:px-8 md:py-16">
      <div className="mx-auto max-w-[1080px]">
        <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
          How it works
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-marketing-ink">
          Spin up a web. Nest sub-webs. Deliver intelligence.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-marketing-muted md:text-lg">
          We’re building a new cloud architecture: each AI Web is a parent fabric for chat, search,
          and publishing — and every sub-web extends that same delivery surface to bots, agents, and
          humans.
        </p>

        <div className="mt-12 md:mt-14">
          <CorpHeroDistribution />
        </div>
      </div>
    </section>
  );
}
