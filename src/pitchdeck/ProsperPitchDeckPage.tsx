import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PAGE_TITLE } from '@/lib/siteSeo';
import { PROSPER_DECK_SLIDES, PROSPER_META } from '@/pitchdeck/prosperContent';
import '@/pages/pitchdeck.css';
import '@/pitchdeck/prosper.css';

const CONTENT_SLIDE_COUNT = Math.max(PROSPER_DECK_SLIDES.length - 1, 1);

type Slide = {
  id: string;
  section: string;
  render: () => ReactNode;
};

function SlideShell({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="pd-stack prosper-slide">
      {kicker ? <p className="prosper-kicker">{kicker}</p> : null}
      <h1 className="prosper-title">{title}</h1>
      {children}
    </div>
  );
}

function AssistantLogoRow({
  assistants,
}: {
  assistants: readonly { id: string; label: string; src: string }[];
}) {
  return (
    <ul
      className="prosper-assistant-row"
      aria-label={assistants.map((assistant) => assistant.label).join(', ')}
    >
      {assistants.map((assistant) => (
        <li key={assistant.id} className={`prosper-assistant prosper-assistant--${assistant.id}`}>
          <img className="prosper-assistant-img" src={assistant.src} alt={assistant.label} />
        </li>
      ))}
    </ul>
  );
}

function FounderHighlightIcon({ kind }: { kind: string }) {
  switch (kind) {
    case 'military':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M12 2.5 14.2 8h5.8l-4.7 3.4 1.8 5.6L12 13.8 7 17l1.8-5.6L4 8h5.8L12 2.5z"
          />
        </svg>
      );
    case 'health':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M10.5 4h3v6.5H20v3h-6.5V20h-3v-6.5H4v-3h6.5V4z"
          />
        </svg>
      );
    case 'venture':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M4 18h3V9H4v9zm6.5 0h3V6h-3v12zM17 18h3V3h-3v15zM3 20h18v2H3v-2z"
          />
        </svg>
      );
    case 'build':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M8 11a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm8.5 1a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5zM2.5 20.5v-1.2c0-2.8 3.1-4.3 5.5-4.3s5.5 1.5 5.5 4.3v1.2zm10.2 0v-1c0-1.7.8-3 2.1-3.8a6.3 6.3 0 0 1 3.7-1.1c2.1 0 5 1.3 5 4v1.9z"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v10A1.5 1.5 0 0 1 18.5 17H13l-3.2 2.7a.7.7 0 0 1-1.1-.6V17H5.5A1.5 1.5 0 0 1 4 15.5v-10zM6 7v2h8V7H6zm0 4v2h5v-2H6z"
          />
        </svg>
      );
  }
}

const SLIDES: Slide[] = PROSPER_DECK_SLIDES.map((slide) => {
  if (slide.id === 'cover' && 'phones' in slide) {
    return {
      id: slide.id,
      section: slide.section,
      render: () => (
        <div className="pd-stack pd-stack--cover prosper-cover">
          <div className="prosper-cover-brand">
            <div className="prosper-cover-lockup">
              <img
                className="prosper-cover-wordmark"
                src="/images/promo/aiweb-logo-black.png"
                alt="aiweb"
              />
              <span className="prosper-cover-accent">For Health</span>
            </div>
            <p className="prosper-cover-tagline">{slide.tagline}</p>
          </div>
          <figure className="prosper-cover-phones">
            <img className="prosper-cover-phones-img" src={slide.phones.src} alt={slide.phones.alt} />
          </figure>
          <div className="prosper-cover-foot">
            <ul className="prosper-cover-partners">
              {slide.partners.map((partner) => (
                <li
                  key={partner.id}
                  className={`prosper-cover-partner prosper-cover-partner--${partner.id}`}
                >
                  <img src={partner.src} alt="" />
                  <span className="prosper-cover-partner-label">{partner.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    };
  }

  if (slide.id === 'founder' && 'portrait' in slide && 'highlights' in slide) {
    return {
      id: slide.id,
      section: slide.section,
      render: () => (
        <div className="pd-stack prosper-slide prosper-slide--founder">
          <figure className="prosper-founder-portrait">
            <img src={slide.portrait.src} alt={slide.portrait.alt} />
            {slide.portrait.note ? (
              <figcaption className="prosper-founder-note">{slide.portrait.note}</figcaption>
            ) : null}
          </figure>
          <div className="prosper-founder-copy">
            <p className="prosper-founder-eyebrow">{slide.eyebrow}</p>
            <h1 className="prosper-founder-title">{slide.title}</h1>
            <p className="prosper-founder-lede">{slide.lede}</p>
            <div className="prosper-founder-identity">
              <p className="prosper-founder-name">{slide.name}</p>
              <p className="prosper-founder-role">{slide.role}</p>
              <p className="prosper-founder-company">{slide.company}</p>
            </div>
            <ul className="prosper-founder-highlights">
              {slide.highlights.map((item) => (
                <li key={item.text} className={`prosper-founder-highlight prosper-founder-highlight--${item.icon}`}>
                  <span className="prosper-founder-highlight-icon" aria-hidden>
                    <FounderHighlightIcon kind={item.icon} />
                  </span>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
            <blockquote className="prosper-founder-quote">
              <p>{slide.quote.text}</p>
              <footer>— {slide.quote.by}</footer>
            </blockquote>
            <ul className="prosper-founder-tags">
              {slide.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      ),
    };
  }

  if (slide.id === 'problem' && 'body' in slide && 'images' in slide && 'lead' in slide) {
    return {
      id: slide.id,
      section: slide.section,
      render: () => (
        <div className="pd-stack prosper-slide prosper-slide--problem">
          <div className="prosper-split-copy">
            <h1 className="prosper-title">{slide.title}</h1>
            <p className="prosper-body prosper-body--lead">{slide.lead}</p>
            {'leadBut' in slide && slide.leadBut ? (
              <p className="prosper-body prosper-body--but">{slide.leadBut}</p>
            ) : null}
            <div className="prosper-practices">
              {slide.body.map((paragraph) => (
                <p key={paragraph} className="prosper-body prosper-body--practices">
                  {paragraph}
                </p>
              ))}
              {'summary' in slide && slide.summary ? (
                <p className="prosper-summary">{slide.summary}</p>
              ) : null}
            </div>
          </div>
          <div className="prosper-problem-gallery">
            <div className="prosper-gallery-stage">
              <ul className="prosper-gallery-grid">
                {slide.images.map((image) => (
                  <li key={image.src}>
                    <figure>
                      <img src={image.src} alt={image.alt} />
                      <figcaption>{image.label}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
              <div className="prosper-gallery-logos">
                <AssistantLogoRow assistants={slide.assistants} />
              </div>
            </div>
            <div className="prosper-disconnect" role="presentation" aria-hidden="true">
              <span className="prosper-disconnect-rail" />
              <img
                className="prosper-disconnect-break"
                src="/images/promo/broken-link-mark.png"
                alt=""
              />
              <span className="prosper-disconnect-rail" />
            </div>
            {'bodyIcon' in slide && slide.bodyIcon ? (
              <img
                className="prosper-body-icon"
                src={slide.bodyIcon.src}
                alt={slide.bodyIcon.alt}
              />
            ) : null}
          </div>
        </div>
      ),
    };
  }

  if (slide.id === 'product' && 'points' in slide) {
    return {
      id: slide.id,
      section: slide.section,
      render: () => (
        <div className="pd-stack prosper-slide prosper-slide--product">
          <div className="prosper-product-copy">
            <h1 className="prosper-title">{slide.title}</h1>
            <p className="prosper-lede">{slide.lede}</p>
            <ul className="prosper-points">
              {slide.points.map((point) => (
                <li key={point.label}>
                  <strong>{point.label}</strong> — {point.text}
                </li>
              ))}
            </ul>
            <p className="prosper-note">{slide.note}</p>
          </div>
          {'loop' in slide && slide.loop ? (
            <div className="prosper-product-loop" aria-label="Send and receive">
              <div className="prosper-product-loop-forward">
                <span className="prosper-product-loop-label">
                  {slide.loop.send.label}
                </span>
                <span
                  className="prosper-product-loop-arrow prosper-product-loop-arrow--extended"
                  aria-hidden
                />
                <span className="prosper-product-loop-label">
                  {slide.loop.receive.label}
                </span>
                <figure className="prosper-product-shot prosper-product-shot--send">
                  <img src={slide.loop.send.src} alt={slide.loop.send.alt} />
                </figure>
                <span className="prosper-product-loop-gutter" aria-hidden />
                <figure className="prosper-product-shot prosper-product-shot--receive">
                  <img src={slide.loop.receive.src} alt={slide.loop.receive.alt} />
                </figure>
                <span className="prosper-product-loop-label">
                  {slide.loop.receive.label}
                </span>
                <span
                  className="prosper-product-loop-arrow prosper-product-loop-arrow--extended"
                  aria-hidden
                />
                <span className="prosper-product-loop-label">
                  {slide.loop.send.label}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      ),
    };
  }

  if (slide.id === 'roadmap' && 'steps' in slide) {
    return {
      id: slide.id,
      section: slide.section,
      render: () => (
        <SlideShell title={slide.title}>
          <p className="prosper-lede">{slide.lede}</p>
          <ol className="prosper-steps">
            {slide.steps.map((step, i) => (
              <li key={step}>
                <span className="prosper-step-num">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="prosper-note">{slide.note}</p>
        </SlideShell>
      ),
    };
  }

  if (slide.id === 'prosper' && 'close' in slide) {
    return {
      id: slide.id,
      section: slide.section,
      render: () => (
        <SlideShell title={slide.title}>
          {slide.body.map((paragraph) => (
            <p key={paragraph} className="prosper-body">
              {paragraph}
            </p>
          ))}
          <div className="prosper-close">
            <p>{slide.close.company}</p>
            <p>
              <a href={`https://${slide.close.site}`}>{slide.close.site}</a>
            </p>
            <p>{slide.close.founder}</p>
          </div>
          <div className="prosper-cover-links">
            <Link className="prosper-link" to="/executivesummary">
              Executive summary
            </Link>
            <a className="prosper-link" href={PROSPER_META.summaryPdf}>
              Summary PDF
            </a>
          </div>
        </SlideShell>
      ),
    };
  }

  return {
    id: slide.id,
    section: slide.section,
    render: () => (
      <SlideShell title={slide.title}>
        {'body' in slide
          ? slide.body.map((paragraph) => (
              <p key={paragraph} className="prosper-body">
                {paragraph}
              </p>
            ))
          : null}
      </SlideShell>
    ),
  };
});

export function ProsperPitchDeckPage() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(1 / SLIDES.length);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollingRef = useRef(false);
  const wheelLock = useRef(false);

  const scrollTo = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, i));
    const el = sectionRefs.current[clamped];
    const scroller = scrollRef.current;
    if (!el || !scroller) return;
    scrollingRef.current = true;
    scroller.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    setIndex(clamped);
    window.setTimeout(() => {
      scrollingRef.current = false;
    }, 700);
  }, []);

  const next = useCallback(() => scrollTo(index + 1), [index, scrollTo]);
  const prev = useCallback(() => scrollTo(index - 1), [index, scrollTo]);

  useEffect(() => {
    document.title = 'AIWEB — Prosper Pitch Deck';
    document.documentElement.classList.add('pd-html');
    return () => {
      document.title = DEFAULT_PAGE_TITLE;
      document.documentElement.classList.remove('pd-html');
    };
  }, []);

  useEffect(() => {
    const scroller = scrollRef.current;
    const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!scroller || !sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target) return;
        const i = sections.indexOf(visible.target as HTMLElement);
        if (i >= 0) setIndex(i);
      },
      { root: scroller, threshold: [0.45, 0.65, 0.85] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    function onScroll() {
      const max = scroller!.scrollHeight - scroller!.clientHeight;
      const p = max > 0 ? scroller!.scrollTop / max : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    }
    onScroll();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) < 8) return;
      e.preventDefault();
      if (wheelLock.current || scrollingRef.current) return;
      wheelLock.current = true;
      if (e.deltaY > 0) next();
      else prev();
      window.setTimeout(() => {
        wheelLock.current = false;
      }, 750);
    }
    scroller.addEventListener('wheel', onWheel, { passive: false });
    return () => scroller.removeEventListener('wheel', onWheel);
  }, [next, prev]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowRight' ||
        e.key === 'PageDown' ||
        e.key === ' '
      ) {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollTo(SLIDES.length - 1);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, scrollTo]);

  return (
    <div className="pd-root pd-root--vertical prosper-root">
      <div className="pd-scroll" ref={scrollRef}>
        {SLIDES.map((s, i) => {
          const isCover = i === 0;
          const pageNum = i;
          return (
            <section
              key={s.id}
              id={`pd-${s.id}`}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              className={['pd-panel', isCover ? 'pd-panel--cover pd-panel--cover-bg' : '']
                .filter(Boolean)
                .join(' ')}
              aria-label={isCover ? s.section : `Slide ${pageNum}: ${s.section}`}
            >
              <div className="pd-panel-inner">{s.render()}</div>
              <footer className={`pd-chrome${isCover ? ' pd-chrome--cover' : ''}`}>
                <div className="pd-chrome-brand">
                  <span className="pd-chrome-name">AIWEB for Health</span>
                  <span className="pd-chrome-dot" aria-hidden>
                    ·
                  </span>
                  <span className="pd-chrome-meta pd-chrome-url">theaiwebcompany.com</span>
                </div>
                <p className="pd-chrome-section">{isCover ? '' : s.section}</p>
                {isCover ? (
                  <p className="pd-counter pd-counter--cover" aria-hidden="true" />
                ) : (
                  <p className="pd-counter">
                    <span className="pd-counter-curr">{String(pageNum).padStart(2, '0')}</span>
                    <span className="pd-counter-sep" aria-hidden>
                      /
                    </span>
                    <span className="pd-counter-total">
                      {String(CONTENT_SLIDE_COUNT).padStart(2, '0')}
                    </span>
                  </p>
                )}
              </footer>
            </section>
          );
        })}
      </div>
      <div className="pd-progress" aria-hidden>
        <div className="pd-progress-bar" style={{ width: `${Math.max(progress, 0.04) * 100}%` }} />
      </div>
    </div>
  );
}
