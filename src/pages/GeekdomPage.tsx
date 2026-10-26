import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { GeekdomMacGuide } from '@/components/corp/GeekdomMacGuide';
import { GeekdomWindowsGuide } from '@/components/corp/GeekdomWindowsGuide';
import { useMarketingPageSeo, useScrollReveal } from '@/hooks/useScrollReveal';
import { GEEKDOM_PATH, HOME_PATH, PHONE_CHECKOUT_URL, PLUGIN_PATH } from '@/lib/corpSiteRoutes';
import '@/styles/geekdom.css';

type OsGuide = 'windows' | 'mac' | 'ai';

const AI_PRINTER_PROMPT = `Help me add the Geekdom coworking floor printer on my computer.

Printer details:
- Location: Geekdom coworking, San Antonio (must be on Geekdom Wi‑Fi)
- Model: Ricoh IM C4500
- IP address: 10.10.0.50
- Driver: Ricoh PS Driver for Universal Print Ver. 4.46 (RICOH PS UniversalDriver V4.46)
- Driver download: https://support.ricoh.com/bb/html/dr_ut_e/rc3/model/imc4500/imc4500.htm
- After download, unzip to c:\\temp\\z07513L24 then use Have Disk → C:\\temp\\z07513L24\\disk1

Walk me through the steps for my OS (ask if I'm on Windows or Mac). Keep it short and numbered.`;

const TROUBLESHOOTING = [
  {
    question: 'The Ricoh printer doesn’t appear',
    answer: (
      <>
        Confirm you’re on Geekdom Wi‑Fi (password <code>Geekdom1100</code>). Don’t wait for
        automatic discovery — add it manually by IP <code>10.10.0.50</code> (TCP/IP). If Windows
        still can’t find it, toggle Wi‑Fi off/on, then try Add device again.
      </>
    ),
  },
  {
    question: 'The printer appears but won’t print',
    answer: (
      <>
        Open the print queue and clear stuck jobs. Make sure the selected printer is the Ricoh at{' '}
        <code>10.10.0.50</code>, not a “PDF” or “OneNote” printer. Reinstall with{' '}
        <strong>RICOH PS UniversalDriver V4.46</strong> via Have Disk if the wrong driver was
        attached. Print a test page from Printer properties to isolate the app vs. the driver.
      </>
    ),
  },
  {
    question: 'macOS says no suitable driver is available',
    answer: (
      <>
        Use AirPrint / IP printing to <code>10.10.0.50</code> when possible, or install the Ricoh
        Mac driver for IM C4500 from Ricoh support. Generic PostScript often fails on this model —
        pick a Ricoh-branded driver if the OS offers one. Full Mac screenshots are coming on this
        page soon.
      </>
    ),
  },
  {
    question: 'The print job disappears but nothing prints',
    answer: (
      <>
        The job is usually failing at the driver or network hop. Check the printer’s panel for
        errors or offline status, confirm you’re still on Geekdom Wi‑Fi, and reprint a 1-page test.
        If jobs vanish instantly, remove the printer and re-add it with the PS Universal Driver
        V4.46 so Windows isn’t using a broken queue.
      </>
    ),
  },
] as const;

function scrollToGuide() {
  document.getElementById('geekdom-guide')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function GeekdomPage() {
  const [os, setOs] = useState<OsGuide>('windows');
  const [copied, setCopied] = useState(false);

  useScrollReveal('.geekdom-step');
  useMarketingPageSeo({
    title: 'Geekdom printer setup · AI Web Company',
    description:
      'Step-by-step Windows and Mac guides to add the Geekdom coworking printer (Ricoh at 10.10.0.50).',
    canonicalPath: GEEKDOM_PATH,
  });

  const selectOs = (next: OsGuide) => {
    setOs(next);
    requestAnimationFrame(() => scrollToGuide());
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(AI_PRINTER_PROMPT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="geekdom-page">
      <header className="geekdom-hero">
        <div className="geekdom-hero-art">
          <img
            src="/images/geekdom/geekdom-bear-printer.png"
            alt=""
            width={960}
            height={540}
            decoding="async"
          />
        </div>
        <div className="geekdom-hero-inner">
          <p className="geekdom-kicker">Geekdom · Coworking · San Antonio</p>
          <h1 className="geekdom-brand">Printer not working?</h1>
          <p className="geekdom-hero-title">
            Floor printer setup for{' '}
            <span className="geekdom-hero-os">
              <button
                type="button"
                className={[
                  'geekdom-os-btn',
                  os === 'windows' ? 'geekdom-os-btn--active' : '',
                ].join(' ')}
                aria-pressed={os === 'windows'}
                aria-controls="geekdom-guide"
                onClick={() => selectOs('windows')}
              >
                <img
                  className="geekdom-hero-windows"
                  src="/images/geekdom/windows-logo.png"
                  alt=""
                  width={48}
                  height={48}
                  decoding="async"
                />
                <span className="sr-only">Show Windows instructions</span>
              </button>
              <button
                type="button"
                className={[
                  'geekdom-os-btn',
                  os === 'mac' ? 'geekdom-os-btn--active' : '',
                ].join(' ')}
                aria-pressed={os === 'mac'}
                aria-controls="geekdom-guide"
                onClick={() => selectOs('mac')}
              >
                <img
                  className="geekdom-hero-apple"
                  src="/images/geekdom/apple-logo.svg"
                  alt=""
                  width={48}
                  height={48}
                  decoding="async"
                />
                <span className="sr-only">Show Mac instructions</span>
              </button>
              <button
                type="button"
                className={[
                  'geekdom-os-btn',
                  'geekdom-os-btn--text',
                  os === 'ai' ? 'geekdom-os-btn--active' : '',
                ].join(' ')}
                aria-pressed={os === 'ai'}
                aria-controls="geekdom-guide"
                onClick={() => selectOs('ai')}
              >
                AI Prompt
              </button>
            </span>
          </p>
          <p className="geekdom-hero-lead">
            Connect to Geekdom Wi‑Fi. Password <code>Geekdom1100</code>
          </p>
        </div>
      </header>

      <div className="geekdom-wrap" id="geekdom-guide">
        <div className="geekdom-guide-bar" role="tablist" aria-label="Setup guide">
          <button
            type="button"
            role="tab"
            aria-selected={os === 'windows'}
            className={[
              'geekdom-guide-tab',
              os === 'windows' ? 'geekdom-guide-tab--active' : '',
            ].join(' ')}
            onClick={() => setOs('windows')}
          >
            <img src="/images/geekdom/windows-logo.png" alt="" width={20} height={20} />
            Windows
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={os === 'mac'}
            className={[
              'geekdom-guide-tab',
              os === 'mac' ? 'geekdom-guide-tab--active' : '',
            ].join(' ')}
            onClick={() => setOs('mac')}
          >
            <img src="/images/geekdom/apple-logo.svg" alt="" width={20} height={20} />
            Mac
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={os === 'ai'}
            className={[
              'geekdom-guide-tab',
              os === 'ai' ? 'geekdom-guide-tab--active' : '',
            ].join(' ')}
            onClick={() => setOs('ai')}
          >
            AI Prompt
          </button>
        </div>

        {os === 'windows' ? (
          <GeekdomWindowsGuide />
        ) : os === 'mac' ? (
          <GeekdomMacGuide />
        ) : (
          <>
            <p className="geekdom-intro">
              Copy this prompt into ChatGPT, Claude, Gemini, or any assistant. It includes the
              Geekdom printer IP, driver, and download link.
            </p>
            <div className="geekdom-prompt">
              <div className="geekdom-prompt-toolbar">
                <h2 className="geekdom-prompt-title">AI assistant prompt</h2>
                <button type="button" className="geekdom-prompt-copy" onClick={() => void copyPrompt()}>
                  {copied ? 'Copied' : 'Copy prompt'}
                </button>
              </div>
              <pre className="geekdom-prompt-text">{AI_PRINTER_PROMPT}</pre>
            </div>
          </>
        )}
      </div>

      <section className="geekdom-trouble" aria-labelledby="geekdom-trouble-title">
        <div className="geekdom-trouble-inner">
          <h2 id="geekdom-trouble-title" className="geekdom-trouble-title">
            Troubleshooting
          </h2>
          <div className="geekdom-trouble-list">
            {TROUBLESHOOTING.map((item) => (
              <details key={item.question} className="geekdom-trouble-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <aside className="geekdom-cta" aria-label="AIWEB Phone">
        <div className="geekdom-cta-inner">
          <figure className="geekdom-cta-card">
            <img
              src="/images/geekdom/aiweb-phone-example-card.jpg?v=3"
              alt="Example AIWEB Phone listing — Taco Fiesta Catering with AI Number AI-123-456-789-000"
              width={720}
              height={1280}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <p className="geekdom-cta-kicker">While you’re at Geekdom</p>
          <img
            className="geekdom-cta-lockup"
            src="/images/promo/aiweb-phone-bear-lockup.png"
            alt="AIWEB Phone"
            width={1024}
            height={478}
            decoding="async"
          />
          <h2 className="geekdom-cta-title">
            Get Your direct business line for customers using AI assistants.
          </h2>
          <p className="geekdom-cta-body">
            Get an AI Number so customers can reach you from ChatGPT and other assistants — same
            idea as a phone number, built for AI.
          </p>
          <div className="geekdom-cta-actions">
            <a className="geekdom-cta-btn geekdom-cta-btn--primary" href={PHONE_CHECKOUT_URL}>
              Get an AI Phone number
            </a>
            <Link className="geekdom-cta-btn geekdom-cta-btn--ghost" to={PLUGIN_PATH}>
              See how it works
            </Link>
          </div>
          <p className="geekdom-cta-body" style={{ marginTop: '1.25rem', fontSize: '0.9rem' }}>
            <Link to={HOME_PATH} style={{ color: 'rgba(255,255,255,0.55)' }}>
              theaiwebcompany.com
            </Link>
          </p>
        </div>
      </aside>
    </div>
  );
}
