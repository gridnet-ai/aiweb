import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AIWebLogo } from '@/components/welcome/AIWebLogo';
import { PRODUCT_URLS, SITE_ORIGIN } from '@/lib/aiWebCompanyBrand';
import { PLUGINS_CTAS } from '@/lib/pluginsCtas';
import './album.css';

const TITLE = 'AIWEB Album — Share music, film, and art inside ChatGPT';
const DESCRIPTION =
  'An AIWEB Album is an AI Web Page you publish, download as .aiweb, and share. Media over AI (MoA) delivers the work into ChatGPT so people can play it — the artist still owns it.';

const AIWEB_OS_ORIGIN = PRODUCT_URLS.aiWebOs.replace(/\/$/, '');
const PLAY_MCP = `${AIWEB_OS_ORIGIN}/mcp/play`;
const LIVE_ALBUM = `${AIWEB_OS_ORIGIN}/irl/ai-web-album`;
const AIWEB_OS_APP = `${AIWEB_OS_ORIGIN}/publisher`;

const PROMPTS: Record<string, string> = {
  artist:
    'Using AIWEB Play, play “Type” from the AI Web Album. Then tell me who published it.',
  listener:
    'Using AIWEB Play, find something I can hear from an AIWEB Album. Play the first track.',
  filmmaker:
    'Using AIWEB Play, watch the video on the AI Web Album.',
  collector:
    'Using AIWEB Play, open the player for ai-web-album and show me what is on it.',
};

const FAQS: { q: string; a: string }[] = [
  {
    q: 'What is an AIWEB Album?',
    a: 'An AIWEB Album is an AI Web Page made for media. It is a published page with artwork, tracks, film, lyrics or transcripts, and machine surfaces so ChatGPT can find and play the work. It is also a file: you can download and share it as .aiweb, then open it again in AIWEB OS.',
  },
  {
    q: 'What is Media over AI (MoA)?',
    a: 'MoA is the technology under the album. Voice over AI (VoA) is a communication line. MoA is a content experience: the user’s intention routes to playable media, and the media itself is the destination — not a webpage they have to hunt through.',
  },
  {
    q: 'Does ChatGPT train on my music or film?',
    a: 'No. Publishing an AIWEB Album is not consent to train a model on your masters. The private file never sits on a public URL. ChatGPT can play a time-limited stream through AIWEB Play. That is retrieval for the listener, not a training dump.',
  },
  {
    q: 'How does the artist stay paid and in control?',
    a: 'The master stays on the artist’s page. Play is stream-only — no native download of the file. The .aiweb package is theirs to keep, send, and reopen. When someone wants to license, book, or buy, that is a Call back to the artist on the same page — not a marketplace skimming the catalog.',
  },
  {
    q: 'Is this just a webpage with a player?',
    a: 'The human page is an album people can open in a browser. The difference is machine-functional: ChatGPT can take a sentence of intention, find the album, and play the work inside the conversation. Search → page → find the file becomes intention → media → experience.',
  },
  {
    q: 'What is the .aiweb format?',
    a: 'It is the downloadable, shareable package of an AI Web Page — Human layout plus Machine layers, without the private master files. You can save it, send it, and open it in AIWEB OS. The album lives as a page on the AI Web and as a file the artist holds.',
  },
  {
    q: 'What can AIWEB see from a ChatGPT conversation?',
    a: 'AIWEB Play is search and playback of published albums. It does not read the rest of the chat as a surveillance product. It receives the intention needed to find and present media the artist already published.',
  },
  {
    q: 'How do I show up when someone asks ChatGPT to play something?',
    a: 'Publish the album in AIWEB OS with Track and Film, then keep it live. People connect AIWEB Play in ChatGPT and ask in plain language — for example, play Type from the AI Web Album. The album is a new front door. It does not replace the work you already made.',
  },
];

function useAlbumSeo() {
  useEffect(() => {
    const origin = SITE_ORIGIN.replace(/\/$/, '');
    const canonical = `${origin}/album`;
    const prevTitle = document.title;
    document.title = TITLE;
    document.documentElement.classList.add('al-html');
    const created: HTMLElement[] = [];
    const restorers: Array<() => void> = [];

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      const sel = `meta[${attr}="${key}"]`;
      let el = document.head.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        el.setAttribute('data-aiweb-album', '1');
        document.head.appendChild(el);
        created.push(el);
      } else {
        const prev = el.content;
        restorers.push(() => {
          el!.content = prev;
        });
      }
      el.content = content;
    };

    setMeta('name', 'description', DESCRIPTION);
    setMeta('name', 'robots', 'index,follow,max-snippet:-1,max-image-preview:large');
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'AIWEB');
    setMeta('property', 'og:title', TITLE);
    setMeta('property', 'og:description', DESCRIPTION);
    setMeta('property', 'og:url', canonical);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', TITLE);
    setMeta('name', 'twitter:description', DESCRIPTION);

    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = canonical;
    link.setAttribute('data-aiweb-album', '1');
    document.head.appendChild(link);
    created.push(link);

    return () => {
      document.title = prevTitle;
      document.documentElement.classList.remove('al-html');
      restorers.forEach((fn) => fn());
      document.head.querySelectorAll('[data-aiweb-album]').forEach((n) => n.remove());
      created.forEach((n) => n.remove());
    };
  }, []);
}

async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = value;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

function CopyField({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="al-copyfield">
      <code className="al-copyfield__value" title={value}>
        {value}
      </code>
      <button
        type="button"
        className="al-copyfield__btn"
        onClick={() => {
          void copyText(value).then((ok) => {
            if (!ok) return;
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          });
        }}
      >
        {copied ? 'Copied' : label}
      </button>
    </div>
  );
}

export function AlbumPage() {
  useAlbumSeo();
  const [role, setRole] = useState<keyof typeof PROMPTS>('artist');
  const [shown, setShown] = useState('');
  const prompt = useMemo(() => PROMPTS[role], [role]);

  return (
    <div className="al-root">
      <a className="al-skip" href="#album-main">
        Skip to AIWEB Album
      </a>
      <p className="al-banner">
        Play published albums inside ChatGPT — the work stays with the artist.
        <a href="#setup">Add AIWEB Play</a>
      </p>
      <header className="al-chrome">
        <a className="al-chrome-brand" href="/album" aria-label="AIWEB Album">
          <AIWebLogo width={118} className="al-chrome-logo" />
        </a>
        <nav className="al-chrome-nav" aria-label="Album">
          <Link to="/plugins">Plugins</Link>
          <a href={AIWEB_OS_APP}>AIWEB OS</a>
          <a href="/whitepaper#moa">MoA</a>
          <Link to="/">The AI Web Company</Link>
        </nav>
      </header>

      <main id="album-main">
        <section className="al-hero">
          <p className="al-kicker">AIWEB Album · Media over AI</p>
          <h1 className="al-h1">
            Share your music, film, or art inside{' '}
            <em>ChatGPT</em>.
          </h1>
          <p className="al-sub">Describe it. Hear it. Keep it yours.</p>
          <p className="al-lede">
            An <strong>AIWEB Album</strong> is the medium: an AI Web Page you publish, download as{' '}
            <code>.aiweb</code>, and share. <strong>Media over AI (MoA)</strong> is the technology:
            ChatGPT routes a listener&apos;s intention to the work and plays it in the conversation —
            a real piece by a real artist, not a scrape of someone else&apos;s catalog.
          </p>
          <div className="al-ctas">
            <a className="al-btn" href={PLUGINS_CTAS.chatgpt.directory} target="_blank" rel="noreferrer">
              Open AIWEB Play in ChatGPT
            </a>
            <a className="al-btn al-btn--ghost" href={AIWEB_OS_APP}>
              Publish an album
            </a>
          </div>
        </section>

        <section className="al-section" id="setup" aria-labelledby="setup-heading">
          <h2 className="al-h2" id="setup-heading">
            Add AIWEB Play in three steps
          </h2>
          <p className="al-copy al-copy--center">
            Same idea as connecting a catalog to a conversation. The album is yours. The plugin is
            the front door.
          </p>
          <ol className="al-steps">
            <li className="al-step">
              <span className="al-step__n">01</span>
              <h3>Publish the album</h3>
              <p>
                In AIWEB OS, use <strong>Track</strong> and <strong>Film</strong>. Artwork, lyrics
                or transcript, and AI origin stay on the page. The master stays private.
              </p>
            </li>
            <li className="al-step">
              <span className="al-step__n">02</span>
              <h3>Copy the Play MCP URL</h3>
              <p>ChatGPT → Settings → Connectors → Add custom connector, or open AIWEB Play from Plugins.</p>
              <CopyField value={PLAY_MCP} label="Copy" />
            </li>
            <li className="al-step">
              <span className="al-step__n">03</span>
              <h3>Add, connect, and ask</h3>
              <p>
                Approve the connector, then speak in a sentence:{' '}
                <em>“Play Type from the AI Web Album.”</em>
              </p>
            </li>
          </ol>
        </section>

        <section className="al-section al-section--pay" aria-labelledby="pay-heading">
          <h2 className="al-h2" id="pay-heading">
            AI that pays respect to the artist
          </h2>
          <p className="al-lede al-lede--narrow">
            We did not build a back door for models to train on creators&apos; work without consent.
            This is the other half of that argument. Every result is a real beat, film, or piece made
            by a real person. AI should help you <em>find</em> the work — and leave the human who
            made it in control of the file, the page, and the deal.
          </p>
          <ul className="al-facts">
            <li>
              <p className="al-facts__kicker">Medium</p>
              <p className="al-facts__value">.aiweb</p>
              <p>Downloadable and shareable. The album is a page and a file the artist holds.</p>
            </li>
            <li>
              <p className="al-facts__kicker">Masters</p>
              <p className="al-facts__value">Stream only</p>
              <p>No public file URL. No native download control. Short-lived play, not a dump.</p>
            </li>
            <li>
              <p className="al-facts__kicker">Money</p>
              <p className="al-facts__value">Back to them</p>
              <p>License, booking, or sale is a Call on their page — not a cut of a scraped catalog.</p>
            </li>
          </ul>
        </section>

        <section className="al-split" aria-labelledby="sentence-heading">
          <div className="al-mock" aria-hidden>
            <p className="al-mock__bubble">Heavy cinematic score with a human vocal — play it from an AIWEB Album.</p>
            <p className="al-mock__label">Search results</p>
            <div className="al-mock__row">
              <span className="al-mock__art" />
              <div>
                <p className="al-mock__title">Type</p>
                <p className="al-mock__meta">AI Web Album · play in ChatGPT</p>
              </div>
            </div>
            <div className="al-mock__row">
              <span className="al-mock__art al-mock__art--b" />
              <div>
                <p className="al-mock__title">Film</p>
                <p className="al-mock__meta">Same album · watch in the player</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="al-h2" id="sentence-heading">
              The search is a sentence now.
            </h2>
            <p className="al-copy">
              Skip genre menus. Say the mood, the medium, the title. MoA runs that intention against
              published albums — machine-addressable media, not a folder of MP3s on a marketing site.
            </p>
            <p className="al-copy">
              Try the live example:{' '}
              <a className="al-text-link" href={LIVE_ALBUM} target="_blank" rel="noreferrer">
                AI Web Album
              </a>
              .
            </p>
          </div>
        </section>

        <section className="al-section" id="prompt" aria-labelledby="prompt-heading">
          <h2 className="al-h2" id="prompt-heading">
            Generate a prompt to start with
          </h2>
          <p className="al-copy al-copy--center">
            Pick who you are, then generate a line to try in ChatGPT.
          </p>
          <div className="al-promptbox">
            <label className="al-promptbox__label">
              Who you are
              <select
                className="al-select"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value as keyof typeof PROMPTS);
                  setShown('');
                }}
              >
                <option value="artist">Artist</option>
                <option value="listener">Listener</option>
                <option value="filmmaker">Filmmaker</option>
                <option value="collector">Collector</option>
              </select>
            </label>
            <button type="button" className="al-btn" onClick={() => setShown(prompt)}>
              Generate prompt
            </button>
            {shown ? (
              <blockquote className="al-prompt-out">
                <p>{shown}</p>
                <CopyField value={shown} label="Copy prompt" />
              </blockquote>
            ) : null}
          </div>
        </section>

        <section className="al-section al-faq" id="faq" aria-labelledby="faq-heading">
          <h2 className="al-h2" id="faq-heading">
            Frequently asked questions
          </h2>
          {FAQS.map((item, i) => (
            <details key={item.q} className="al-faq__item" open={i === 0}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>

        <section className="al-cta-band" aria-labelledby="cta-heading">
          <h2 className="al-h2" id="cta-heading">
            Start sharing your album inside ChatGPT
          </h2>
          <p>
            Publish once. Listeners describe what they want. MoA delivers the experience. You keep
            the medium.
          </p>
          <div className="al-ctas al-ctas--center">
            <a className="al-btn" href={PLUGINS_CTAS.chatgpt.directory} target="_blank" rel="noreferrer">
              Connect AIWEB Play
            </a>
            <a className="al-btn al-btn--ghost" href={AIWEB_OS_APP}>
              Make an AIWEB Album
            </a>
          </div>
        </section>

        <p className="al-legal">
          AIWEB and The AI Web Company are independent products and are not affiliated with,
          endorsed by, or sponsored by OpenAI. ChatGPT is a product of OpenAI. Playback uses
          time-limited streams of works the publisher uploaded. Availability of plugins may vary by
          plan, workspace, region and platform.
        </p>
      </main>
    </div>
  );
}
