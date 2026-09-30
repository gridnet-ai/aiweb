import { SITE_ORIGIN } from '@/lib/aiWebCompanyBrand';

const DEFINITIONS = [
  'a persistent business address that humans can browse and AI agents can discover, understand, and act through.',
  'a web page built to be read and used by both people and AI systems — not just displayed to a browser.',
  'the basic content unit of the AI Web, addressed by an IRL (Intelligence Resource Locator) rather than a standard URL.',
] as const;

const COMBINES = [
  'Structured business or product intelligence',
  'Human-readable presentation',
  'Machine-readable knowledge',
  'GEO/AEO visibility',
  'Calls, inquiries and quote requests',
  'Persistent Receipts and two-way communication',
  'Cross-model testing and AI checks',
  'Analytics and improvement history',
] as const;

const AGENCY_COMBINES = [
  'Accurate business and product information',
  'A page people can browse',
  'A page AI assistants can read',
  'Visibility in AI answers',
  'Calls, inquiries and quote requests',
  'Confirmation and tracking numbers for follow-up',
  'Checks across AI systems',
  'Engagement reporting for clients',
] as const;

type AiwebPageDefinitionProps = {
  /** Agency landing uses plain-outcome wording. */
  tone?: 'default' | 'agency';
};

/** Google-style dictionary panel for AIWEB Page. */
export function AiwebPageDefinition({ tone = 'default' }: AiwebPageDefinitionProps) {
  const agency = tone === 'agency';

  return (
    <aside className="aiweb-page-def" aria-label="Definition of AIWEB Page">
      <div className="aiweb-page-def-intro">
        <p className="aiweb-page-def-kicker">AIWEB Pages</p>
        <p className="aiweb-page-def-lede">
          Customers are moving from browsing websites to asking AI
        </p>
        <h3 className="aiweb-page-def-headline">
          {agency
            ? 'Publish pages AI assistants can read and customers can act on'
            : 'Turn business information into machine-usable intelligence'}
        </h3>
      </div>
      <div className="aiweb-page-def-card">
        <div className="aiweb-page-def-head">
          <h3 className="aiweb-page-def-term">AIWEB Page</h3>
          <p className="aiweb-page-def-phonetic">/ˈeɪ.web peɪdʒ/</p>
        </div>
        <p className="aiweb-page-def-pos">
          <span className="italic">noun</span>
        </p>
        <ol className="aiweb-page-def-list">
          {DEFINITIONS.map((definition) => (
            <li key={definition}>{definition}</li>
          ))}
        </ol>

        <p className="aiweb-page-def-combines-label">It combines:</p>
        <ul className="aiweb-page-def-combines">
          {(agency ? AGENCY_COMBINES : COMBINES).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="aiweb-page-def-value">
          {agency
            ? 'Agencies get a repeatable way to deliver AI optimization: fewer people can manage more clients, pages, and customer conversations.'
            : 'The value is increased AI operating leverage: fewer people can manage more clients, pages, products, models, and customer interactions.'}
        </p>

        <p className="aiweb-page-def-example">
          &ldquo;Publish an AIWEB Page to prove and control your AI visibility.&rdquo;
        </p>
        <footer className="aiweb-page-def-footer">
          <span className="aiweb-page-def-footer-label">Definitions from </span>
          <a href={SITE_ORIGIN} className="aiweb-page-def-footer-link">
            AI Web Company
          </a>
        </footer>
      </div>
    </aside>
  );
}
