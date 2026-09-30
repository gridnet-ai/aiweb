import { CORP_CONTACTS } from '@/lib/aiWebCompanyBrand';
import { OPEN_ROLES } from '@/content/careers';
import { PageHero } from '@/components/corp/PageHero';
import { useMarketingPageSeo, useScrollReveal } from '@/hooks/useScrollReveal';

export function CareersPage() {
  useScrollReveal();
  useMarketingPageSeo({
    title: 'Careers · AI Web Company',
    description:
      'Join AI Web Company — building AI as a utility. Open roles and how we work from San Antonio.',
    canonicalPath: '/careers',
  });

  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 sm:px-5 md:px-8">
      <PageHero
        eyebrow="Careers"
        title="Build the utility layer."
        lede="We’re a small team shipping search, publish, and presence on the AI Web. Mission-first, San Antonio roots, remote-friendly collaboration."
      />

      <section className="marketing-reveal border-t border-marketing-border py-14">
        <h2 className="font-display text-2xl font-extrabold text-marketing-ink">How we work</h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-marketing-muted">
          Hybrid by default — San Antonio hub with remote collaboration. Confirm policy with hiring
          managers on apply; we optimize for builders who ship.
        </p>
      </section>

      <section className="marketing-reveal border-t border-marketing-border py-14 pb-20">
        <h2 className="font-display text-2xl font-extrabold text-marketing-ink">Open roles</h2>
        {OPEN_ROLES.length === 0 ? (
          <div className="mt-8 max-w-xl">
            <p className="text-[15px] leading-relaxed text-marketing-muted">
              No open roles right now — introduce yourself and tell us what you’d build.
            </p>
            <a
              href={CORP_CONTACTS.careers}
              className="mt-6 inline-flex min-h-[44px] items-center justify-center bg-marketing-crimson px-6 text-[14px] font-semibold text-white transition hover:bg-marketing-crimsonDark"
            >
              Email careers@theaiwebcompany.com
            </a>
          </div>
        ) : (
          <ul className="mt-8 divide-y divide-marketing-border border-y border-marketing-border">
            {OPEN_ROLES.map((role) => (
              <li key={role.id} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-marketing-ink">{role.title}</h3>
                  <p className="mt-1 text-[13px] text-marketing-muted">
                    {role.location} · {role.type}
                  </p>
                  <p className="mt-2 max-w-xl text-[14px] text-marketing-muted">{role.summary}</p>
                </div>
                <a
                  href={role.applyUrl ?? CORP_CONTACTS.careers}
                  className="shrink-0 text-[13px] font-semibold text-marketing-crimson"
                >
                  Apply →
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
