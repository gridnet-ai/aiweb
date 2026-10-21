import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AIWebLogo from '@/components/welcome/AIWebLogo';
import { WelcomeCloudCarousel } from '@/components/welcome/WelcomeCloudCarousel';
import { DEFAULT_PAGE_TITLE } from '@/lib/siteSeo';
import { PROSPER_DECK_SLIDES, PROSPER_META } from '@/pitchdeck/prosperContent';
import '@/pages/pitchdeck.css';
import '@/pitchdeck/prosper.css';

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

const SLIDES: Slide[] = PROSPER_DECK_SLIDES.map((slide) => {
  if (slide.id === 'cover') {
    return {
      id: slide.id,
      section: slide.section,
      render: () => (
        <div className="pd-stack pd-stack--cover prosper-cover">
          <AIWebLogo className="prosper-cover-logo" />
          <p className="prosper-kicker">{slide.kicker}</p>
          <h1 className="prosper-cover-title">{slide.title}</h1>
          <p className="prosper-cover-lede">{slide.lede}</p>
          <p className="prosper-cover-sub">{slide.sub}</p>
          <p className="prosper-cover-byline">{slide.byline}</p>
          <div className="prosper-cover-links">
            <Link className="prosper-link" to="/executivesummary">
              Executive summary
            </Link>
            <a className="prosper-link" href={PROSPER_META.deckPdf}>
              Download PDF
            </a>
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
          {'image' in slide && slide.image ? (
            <figure className="prosper-product-visual">
              <img src={slide.image.src} alt={slide.image.alt} />
            </figure>
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
      <div className="pd-atmosphere" aria-hidden />
      <div className="pd-scroll" ref={scrollRef}>
        {SLIDES.map((s, i) => (
          <section
            key={s.id}
            id={`pd-${s.id}`}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            className={['pd-panel', i === 0 ? 'pd-panel--cover pd-panel--cover-bg' : '']
              .filter(Boolean)
              .join(' ')}
            aria-label={`Slide ${i + 1}: ${s.section}`}
          >
            {i === 0 ? <WelcomeCloudCarousel variant="deck" /> : null}
            <div className="pd-panel-inner">{s.render()}</div>
            <footer className={`pd-chrome${i === 0 ? ' pd-chrome--cover' : ''}`}>
              <div className="pd-chrome-brand">
                <span className="pd-chrome-name">AIWEB</span>
                <span className="pd-chrome-entity">
                  <span className="pd-chrome-dot" aria-hidden>
                    ·
                  </span>
                  <span className="pd-chrome-meta">Prosper draft</span>
                </span>
                <span className="pd-chrome-dot" aria-hidden>
                  ·
                </span>
                <span className="pd-chrome-meta pd-chrome-url">theaiwebcompany.com</span>
              </div>
              <p className="pd-chrome-section">{s.section}</p>
              <p className="pd-counter">
                <span className="pd-counter-curr">{String(i + 1).padStart(2, '0')}</span>
                <span className="pd-counter-sep" aria-hidden>
                  /
                </span>
                <span className="pd-counter-total">{String(SLIDES.length).padStart(2, '0')}</span>
              </p>
            </footer>
          </section>
        ))}
      </div>
      <div className="pd-progress" aria-hidden>
        <div className="pd-progress-bar" style={{ width: `${Math.max(progress, 0.04) * 100}%` }} />
      </div>
    </div>
  );
}
