import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { INDUSTRY_VERTICALS } from '@/lib/industryVerticals';
import { DEFAULT_PAGE_TITLE } from '@/lib/siteSeo';
import '@/styles/landingV2Paradox.css';
import '@/pages/pitchdeck.css';
import '@/pitchdeck/prosper.css';

export function PitchDeckIndexPage() {
  useEffect(() => {
    document.title = `Pitch decks · ${DEFAULT_PAGE_TITLE}`;
    return () => {
      document.title = DEFAULT_PAGE_TITLE;
    };
  }, []);

  return (
    <div className="pd-root prosper-root pitchdeck-index">
      <main className="pitchdeck-index-main">
        <img
          className="pitchdeck-index-logo"
          src="/brand/mail/aiweb-nav-logo-black.png"
          alt="AIWEB"
        />
        <h1 className="prosper-title">Pitchdecks</h1>
        <div className="lv2p-industry pitchdeck-index-industry" aria-label="Industry pitch decks">
          <ul className="lv2p-industry-grid">
            {INDUSTRY_VERTICALS.map(({ id, label, Icon, pitchDeckTo }) => (
              <li key={id} className="lv2p-industry-item">
                {pitchDeckTo ? (
                  <Link
                    className="pitchdeck-index-industry-link"
                    to={pitchDeckTo}
                    aria-label={`${label} pitch deck`}
                  >
                    <span className="lv2p-industry-icon" aria-hidden>
                      <Icon strokeWidth={1.6} />
                    </span>
                    <span className="lv2p-industry-label">{label}</span>
                  </Link>
                ) : (
                  <span className="pitchdeck-index-industry-link pitchdeck-index-industry-link--soon">
                    <span className="lv2p-industry-icon" aria-hidden>
                      <Icon strokeWidth={1.6} />
                    </span>
                    <span className="lv2p-industry-label">{label}</span>
                    <span className="pitchdeck-index-soon">Soon</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
