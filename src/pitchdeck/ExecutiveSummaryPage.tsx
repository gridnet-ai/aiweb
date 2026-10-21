import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AIWebLogo from '@/components/welcome/AIWebLogo';
import { DEFAULT_PAGE_TITLE } from '@/lib/siteSeo';
import { PROSPER_EXEC_SUMMARY, PROSPER_META } from '@/pitchdeck/prosperContent';
import '@/pitchdeck/prosper.css';

export function ExecutiveSummaryPage() {
  useEffect(() => {
    document.title = 'AIWEB — Executive Summary';
    document.documentElement.classList.add('prosper-exec-html');
    return () => {
      document.title = DEFAULT_PAGE_TITLE;
      document.documentElement.classList.remove('prosper-exec-html');
    };
  }, []);

  return (
    <div className="prosper-exec">
      <header className="prosper-exec-top">
        <Link className="prosper-exec-brand" to="/" aria-label="AIWEB home">
          <AIWebLogo />
        </Link>
        <nav className="prosper-exec-nav" aria-label="Document links">
          <Link to="/pitchdeck">Pitch deck</Link>
          <a href={PROSPER_META.summaryPdf}>Download PDF</a>
        </nav>
      </header>

      <main className="prosper-exec-main">
        <p className="prosper-kicker">{PROSPER_META.company}</p>
        <h1 className="prosper-exec-title">{PROSPER_EXEC_SUMMARY.title}</h1>
        <p className="prosper-exec-sub">{PROSPER_EXEC_SUMMARY.subtitle}</p>

        {PROSPER_EXEC_SUMMARY.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="prosper-exec-body">
            {paragraph}
          </p>
        ))}

        <footer className="prosper-exec-foot">
          <p>
            {PROSPER_META.founder} — {PROSPER_META.founderRole}
          </p>
          <p>
            <a href={`https://${PROSPER_META.site}`}>{PROSPER_META.site}</a>
          </p>
        </footer>
      </main>
    </div>
  );
}
