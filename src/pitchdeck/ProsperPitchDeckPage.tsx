import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { DEFAULT_PAGE_TITLE } from '@/lib/siteSeo';
import {
  PROSPER_DECK_SLIDES,
  PROSPER_PRODUCT_LOOP,
} from '@/pitchdeck/prosperContent';
import '@/pages/pitchdeck.css';
import '@/pitchdeck/prosper.css';

const CONTENT_SLIDE_COUNT = Math.max(PROSPER_DECK_SLIDES.length - 1, 1);

type Slide = {
  id: string;
  section: string;
  render: () => ReactNode;
};

type ProductLoopData = typeof PROSPER_PRODUCT_LOOP;

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

function ProductLoop({ loop }: { loop: ProductLoopData }) {
  return (
    <div className="prosper-product-loop" aria-label="Send and receive">
      <div className="prosper-product-loop-forward">
        <span className="prosper-product-loop-label">{loop.send.label}</span>
        <span
          className="prosper-product-loop-arrow prosper-product-loop-arrow--extended"
          aria-hidden
        />
        <span className="prosper-product-loop-label">{loop.receive.label}</span>
        <figure className="prosper-product-shot prosper-product-shot--send">
          <img src={loop.send.src} alt={loop.send.alt} />
        </figure>
        <span className="prosper-product-loop-gutter" aria-hidden />
        <figure className="prosper-product-shot prosper-product-shot--receive">
          <img src={loop.receive.src} alt={loop.receive.alt} />
        </figure>
        <span className="prosper-product-loop-label">{loop.receive.label}</span>
        <span
          className="prosper-product-loop-arrow prosper-product-loop-arrow--extended prosper-product-loop-arrow--back"
          aria-hidden
        />
        <span className="prosper-product-loop-label">{loop.send.label}</span>
      </div>
    </div>
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

function JourneyStepIcon({ kind }: { kind: string }) {
  switch (kind) {
    case 'browser':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <rect
            x="3"
            y="4"
            width="18"
            height="16"
            rx="2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path d="M3 8.5h18" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="6.2" cy="6.25" r="0.7" fill="currentColor" />
          <circle cx="8.4" cy="6.25" r="0.7" fill="currentColor" />
          <circle cx="10.6" cy="6.25" r="0.7" fill="currentColor" />
          <path
            d="M8 13.5h8M8 16.2h5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'reviews':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M4 5.5A1.5 1.5 0 0 1 5.5 4H16a1.5 1.5 0 0 1 1.5 1.5V12A1.5 1.5 0 0 1 16 13.5h-5.2L7.5 16.2a.6.6 0 0 1-1-.5V13.5H5.5A1.5 1.5 0 0 1 4 12V5.5z"
            opacity="0.18"
          />
          <path
            fill="#f5b400"
            d="m7.2 9.1.95-2.05.95 2.05 2.25.2-1.7 1.45.55 2.2-2.05-1.2-2.05 1.2.55-2.2-1.7-1.45z"
          />
          <path
            fill="#f5b400"
            d="m13.1 9.1.8-1.75.8 1.75 1.9.17-1.45 1.22.47 1.85-1.72-1-1.72 1 .47-1.85-1.45-1.22z"
          />
        </svg>
      );
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#1f9d55"
            d="M7.2 3.8c.5-.5 1.3-.5 1.8 0l1.7 1.7c.45.45.5 1.2.1 1.7L9.5 9.1c.7 1.4 1.9 2.6 3.4 3.4l1.9-1.3c.5-.4 1.25-.35 1.7.1l1.7 1.7c.5.5.5 1.3 0 1.8l-1.1 1.1c-.55.55-1.3.8-2.05.7-2.5-.35-4.9-1.7-6.85-3.65S4.85 9.15 4.5 6.65c-.1-.75.15-1.5.7-2.05z"
          />
        </svg>
      );
    case 'sparkles':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M6.5 4.5h11A1.5 1.5 0 0 1 19 6v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 18V6a1.5 1.5 0 0 1 1.5-1.5z"
            opacity="0.14"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M8 9h6.5M8 12.2h8M8 15.4h5"
          />
          <path
            fill="currentColor"
            d="m17.2 5.2.55 1.35 1.35.55-1.35.55-.55 1.35-.55-1.35-1.35-.55 1.35-.55z"
          />
        </svg>
      );
    case 'pin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M12 3.5a5 5 0 0 1 5 5c0 3.4-3.4 7.3-4.6 8.55a.6.6 0 0 1-.8 0C10.4 15.8 7 11.9 7 8.5a5 5 0 0 1 5-5zm0 3.2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6z"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            d="M16.5 17.5H20M16.5 20H19"
          />
        </svg>
      );
    case 'chat':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M4 5.8A1.8 1.8 0 0 1 5.8 4H13a1.8 1.8 0 0 1 1.8 1.8v5.2A1.8 1.8 0 0 1 13 12.8H9.4L6.7 15a.55.55 0 0 1-.9-.45v-1.75H5.8A1.8 1.8 0 0 1 4 11V5.8z"
            opacity="0.35"
          />
          <path
            fill="currentColor"
            d="M10.2 9.8A1.8 1.8 0 0 1 12 8h6.2A1.8 1.8 0 0 1 20 9.8v5.4a1.8 1.8 0 0 1-1.8 1.8h-1.2v1.55a.55.55 0 0 1-.9.45l-2.5-2H12a1.8 1.8 0 0 1-1.8-1.8V9.8z"
          />
        </svg>
      );
    case 'chart':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M5 18h2.2V10H5v8zm5.4 0H12.6V6h-2.2v12zm5.4 0H18V12h-2.2v6zM4 20h16v1.6H4z"
          />
        </svg>
      );
    default:
      return null;
  }
}

function JourneyFlowArrow() {
  return (
    <span className="prosper-sta-arrow" aria-hidden>
      <span className="prosper-sta-arrow-line" />
      <span className="prosper-sta-arrow-head" />
    </span>
  );
}

function ContactSocialIcon({ kind }: { kind: string }) {
  switch (kind) {
    case 'x':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M13.92 10.68 20.1 3.5h-1.46l-5.36 6.23L8.98 3.5H3.5l6.48 9.44L3.5 20.5h1.46l5.67-6.59 4.53 6.59H20.5l-6.58-9.82zm-2.01 2.33-.66-.94L5.48 4.6h2.25l4.22 6.04.66.94 5.49 7.86h-2.25l-4.69-6.43z"
          />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M6.94 8.5H4.1V19.9h2.84V8.5zM5.52 4.1a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3zM19.9 19.9h-2.83v-5.54c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92v5.64H10.28V8.5h2.72v1.56h.04c.38-.72 1.3-1.48 2.68-1.48 2.86 0 3.39 1.88 3.39 4.33V19.9z"
          />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M12 7.4A4.6 4.6 0 1 0 16.6 12 4.6 4.6 0 0 0 12 7.4zm0 7.6A3 3 0 1 1 15 12a3 3 0 0 1-3 3zm5.84-7.78a1.08 1.08 0 1 1-1.08-1.08 1.08 1.08 0 0 1 1.08 1.08zM12 4.7c-1.98 0-2.22.01-3 .04a4.9 4.9 0 0 0-1.63.3 3.24 3.24 0 0 0-1.86 1.86 4.9 4.9 0 0 0-.3 1.63c-.03.78-.04 1.02-.04 3s.01 2.22.04 3a4.9 4.9 0 0 0 .3 1.63 3.24 3.24 0 0 0 1.86 1.86 4.9 4.9 0 0 0 1.63.3c.78.03 1.02.04 3 .04s2.22-.01 3-.04a4.9 4.9 0 0 0 1.63-.3 3.24 3.24 0 0 0 1.86-1.86 4.9 4.9 0 0 0 .3-1.63c.03-.78.04-1.02.04-3s-.01-2.22-.04-3a4.9 4.9 0 0 0-.3-1.63 3.24 3.24 0 0 0-1.86-1.86 4.9 4.9 0 0 0-1.63-.3c-.78-.03-1.02-.04-3-.04zm0-1.6c2.02 0 2.27.01 3.06.04a6.5 6.5 0 0 1 2.15.4 4.84 4.84 0 0 1 2.77 2.77 6.5 6.5 0 0 1 .4 2.15c.03.79.04 1.04.04 3.06s-.01 2.27-.04 3.06a6.5 6.5 0 0 1-.4 2.15 4.84 4.84 0 0 1-2.77 2.77 6.5 6.5 0 0 1-2.15.4c-.79.03-1.04.04-3.06.04s-2.27-.01-3.06-.04a6.5 6.5 0 0 1-2.15-.4 4.84 4.84 0 0 1-2.77-2.77 6.5 6.5 0 0 1-.4-2.15C4.71 14.27 4.7 14.02 4.7 12s.01-2.27.04-3.06a6.5 6.5 0 0 1 .4-2.15A4.84 4.84 0 0 1 7.91 4.02a6.5 6.5 0 0 1 2.15-.4C10.85 3.59 11.1 3.58 13.12 3.58z"
          />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M22.5 7.7a3.1 3.1 0 0 0-2.18-2.2C18.5 5 12 5 12 5s-6.5 0-8.32.5A3.1 3.1 0 0 0 1.5 7.7 32.4 32.4 0 0 0 1 12a32.4 32.4 0 0 0 .5 4.3 3.1 3.1 0 0 0 2.18 2.2C5.5 19 12 19 12 19s6.5 0 8.32-.5a3.1 3.1 0 0 0 2.18-2.2A32.4 32.4 0 0 0 23 12a32.4 32.4 0 0 0-.5-4.3zM10.2 15.1V8.9L15.5 12l-5.3 3.1z"
          />
        </svg>
      );
    default:
      return null;
  }
}

const SLIDES: Slide[] = PROSPER_DECK_SLIDES.map((slide) => {
  if (slide.id === 'cover' && 'loop' in slide) {
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
          <div className="prosper-cover-phones prosper-cover-phones--loop">
            <ProductLoop loop={slide.loop} />
          </div>
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

  if (
    slide.id === 'founder' &&
    'portrait' in slide &&
    'highlights' in slide &&
    'employers' in slide
  ) {
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
            <ul className="prosper-founder-tags" aria-label="Places worked and programs">
              {slide.employers.map((employer) => (
                <li
                  key={employer.id}
                  className={`prosper-founder-tag prosper-founder-tag--${employer.id}`}
                  title={employer.label}
                >
                  <img src={employer.src} alt={employer.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    };
  }

  if (slide.id === 'problem' && 'images' in slide && 'summaryStat' in slide) {
    return {
      id: slide.id,
      section: slide.section,
      render: () => (
        <div className="pd-stack prosper-slide prosper-slide--problem">
          <div className="prosper-split-copy">
            <h1 className="prosper-title">{slide.title}</h1>
            <p className="prosper-summary-value">
              <span className="prosper-summary-arrow" aria-hidden>
                ↑
              </span>
              {slide.summaryStat.value}
            </p>
            <p className="prosper-summary prosper-summary--stat">
              <span className="prosper-summary-text prosper-summary-text--desktop">
                {slide.summaryStat.text}
              </span>
              {'textMobile' in slide.summaryStat && slide.summaryStat.textMobile ? (
                <span className="prosper-summary-text prosper-summary-text--mobile">
                  {slide.summaryStat.textMobile}
                </span>
              ) : null}
            </p>
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
          </div>
        </div>
      ),
    };
  }

  if (
    (slide.id === 'product' || slide.id === 'solution') &&
    'lede' in slide &&
    'note' in slide
  ) {
    return {
      id: slide.id,
      section: slide.section,
      render: () => (
        <div className="pd-stack prosper-slide prosper-slide--product">
          <div className="prosper-product-copy">
            <h1 className="prosper-title">{slide.title}</h1>
            <p className="prosper-lede">{slide.lede}</p>
            {'mascot' in slide && slide.mascot ? (
              <figure className="prosper-product-mascot">
                <img src={slide.mascot.src} alt={slide.mascot.alt} />
              </figure>
            ) : null}
            {'noteIcon' in slide && slide.noteIcon ? (
              <div className="prosper-product-compat">
                <p className="prosper-note prosper-note--plugin">
                  <img
                    className="prosper-note-plugin-icon"
                    src={slide.noteIcon.src}
                    alt=""
                    aria-hidden
                  />
                  <span>{slide.note}</span>
                </p>
                {'compatible' in slide && slide.compatible?.length ? (
                  <div className="prosper-product-compat-also">
                    <p className="prosper-product-compat-label">Also compatible with</p>
                    <AssistantLogoRow assistants={slide.compatible} />
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="prosper-note">{slide.note}</p>
            )}
          </div>
          {'visual' in slide && slide.visual ? (
            <figure className="prosper-product-visual prosper-product-visual--story">
              <img src={slide.visual.src} alt={slide.visual.alt} />
            </figure>
          ) : 'loop' in slide && slide.loop ? (
            <ProductLoop loop={slide.loop} />
          ) : null}
        </div>
      ),
    };
  }

  if (
    slide.id === 'howitworks' &&
    'old' in slide &&
    'ai' in slide &&
    'shift' in slide &&
    'summary' in slide
  ) {
    return {
      id: slide.id,
      section: slide.section,
      render: () => (
        <div className="pd-stack prosper-slide prosper-slide--howitworks">
          <header className="prosper-sta-head">
            <h1 className="prosper-title">{slide.title}</h1>
            <p className="prosper-lede prosper-sta-lede">{slide.lede}</p>
          </header>

          <div className="prosper-sta-stage" aria-label="From search to chat">
            <article className="prosper-sta-card prosper-sta-card--old">
              <header className="prosper-sta-card-head">
                <h2 className="prosper-sta-card-title">{slide.old.title}</h2>
                <p className="prosper-sta-card-subtitle">{slide.old.subtitle}</p>
              </header>

              <div className="prosper-sta-search" aria-label={`Search: ${slide.old.search}`}>
                <span className="prosper-sta-search-icon" aria-hidden>
                  <svg viewBox="0 0 24 24">
                    <circle
                      cx="10.5"
                      cy="10.5"
                      r="5.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="m14.8 14.8 4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="prosper-sta-search-text">{slide.old.search}</span>
                <span className="prosper-sta-search-mic" aria-hidden>
                  <svg viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 3.5a2.7 2.7 0 0 1 2.7 2.7v5.1a2.7 2.7 0 0 1-5.4 0V6.2A2.7 2.7 0 0 1 12 3.5zm-5 8.3a.9.9 0 0 1 1.8 0 3.2 3.2 0 0 0 6.4 0 .9.9 0 1 1 1.8 0 5 5 0 0 1-4.1 4.9v1.8H14a.9.9 0 1 1 0 1.8h-4a.9.9 0 1 1 0-1.8h1.1v-1.8A5 5 0 0 1 7 11.8z"
                    />
                  </svg>
                </span>
              </div>

              <ol className="prosper-sta-steps" aria-label={slide.old.steps.map((s) => s.text).join(' to ')}>
                {slide.old.steps.map((step) => (
                  <li key={step.id}>
                    <JourneyFlowArrow />
                    <div className="prosper-sta-step">
                      <span className={`prosper-sta-step-icon prosper-sta-step-icon--${step.icon}`}>
                        <JourneyStepIcon kind={step.icon} />
                      </span>
                      <span className="prosper-sta-step-text">{step.text}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </article>

            <div className="prosper-sta-shift" aria-hidden>
              <p className="prosper-sta-shift-label">{slide.shift}</p>
              <span className="prosper-sta-shift-arrow" />
            </div>

            <article className="prosper-sta-card prosper-sta-card--ai">
              <header className="prosper-sta-card-head prosper-sta-card-head--ai">
                <div>
                  <h2 className="prosper-sta-card-title">{slide.ai.title}</h2>
                  <p className="prosper-sta-card-subtitle">{slide.ai.subtitle}</p>
                </div>
                <ul className="prosper-sta-assistants" aria-label="AI assistants">
                  {slide.ai.assistants.map((assistant) => (
                    <li key={assistant.id}>
                      <img src={assistant.src} alt={assistant.label} />
                      <span>{assistant.label}</span>
                    </li>
                  ))}
                </ul>
              </header>

              <div className="prosper-sta-chat">
                <span className="prosper-sta-chat-avatar" aria-hidden>
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="3.2" fill="currentColor" />
                    <path
                      fill="currentColor"
                      d="M5.5 18.8c.7-3.1 3.2-4.8 6.5-4.8s5.8 1.7 6.5 4.8a.9.9 0 0 1-.9 1.2H6.4a.9.9 0 0 1-.9-1.2z"
                    />
                  </svg>
                </span>
                <p className="prosper-sta-chat-bubble">“{slide.ai.query}”</p>
              </div>

              <ol className="prosper-sta-steps" aria-label={slide.ai.steps.map((s) => s.text).join(' to ')}>
                {slide.ai.steps.map((step) => (
                  <li key={step.id}>
                    <JourneyFlowArrow />
                    <div className="prosper-sta-step prosper-sta-step--ai">
                      <span className={`prosper-sta-step-icon prosper-sta-step-icon--${step.icon}`}>
                        <JourneyStepIcon kind={step.icon} />
                      </span>
                      <span className="prosper-sta-step-text">{step.text}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          </div>

          <aside className="prosper-sta-summary">
            <span className="prosper-sta-summary-icon" aria-hidden>
              <JourneyStepIcon kind="chart" />
            </span>
            <p>
              {slide.summary.before}
              <strong>{slide.summary.emphasis}</strong>
            </p>
          </aside>
        </div>
      ),
    };
  }

  if (
    slide.id === 'competition' &&
    'categories' in slide &&
    'channels' in slide &&
    'objection' in slide
  ) {
    return {
      id: slide.id,
      section: slide.section,
      render: () => (
        <div className="pd-stack prosper-slide prosper-slide--competition">
          <header className="prosper-competition-head">
            <h1 className="prosper-title">{slide.title}</h1>
          </header>

          <div className="prosper-competition-table" role="table" aria-label="Competitive landscape">
            <div className="prosper-competition-row prosper-competition-row--head" role="row">
              <span role="columnheader">Category</span>
              <span role="columnheader">Major competitors</span>
              <div
                className="prosper-competition-channels"
                role="columnheader"
                aria-label={slide.channels.map((channel) => channel.label).join(', ')}
              >
                {slide.channels.map((channel) => (
                  <span key={channel.id} className="prosper-competition-channel" title={channel.label}>
                    <img src={channel.src} alt={channel.label} />
                  </span>
                ))}
              </div>
            </div>
            {slide.categories.map((category) => (
              <div key={category.name} className="prosper-competition-row" role="row">
                <span className="prosper-competition-category" role="cell">
                  {category.name}
                </span>
                <ul className="prosper-competition-logos" role="cell">
                  {category.competitors.map((competitor) => (
                    <li key={competitor.id}>
                      <img src={competitor.src} alt="" />
                      <span>{competitor.label}</span>
                    </li>
                  ))}
                </ul>
                <div
                  className="prosper-competition-marks"
                  role="cell"
                  aria-label={`${category.name} channel coverage`}
                >
                  {slide.channels.map((channel, index) => {
                    const covered = category.reach[index] === true;
                    return (
                      <span
                        key={channel.id}
                        className={
                          covered
                            ? 'prosper-competition-mark prosper-competition-mark--yes'
                            : 'prosper-competition-mark prosper-competition-mark--no'
                        }
                        title={`${channel.label}: ${covered ? 'Yes' : 'No'}`}
                        aria-label={`${channel.label}: ${covered ? 'Yes' : 'No'}`}
                      >
                        {covered ? '✓' : '✕'}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <section className="prosper-competition-objection" aria-label="Investor question">
            <h2 className="prosper-competition-question">{slide.objection.question}</h2>
            <div className="prosper-competition-observations">
              {slide.objection.observations.map((item) => (
                <article key={item.label}>
                  <h3>{item.label}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      ),
    };
  }

  if (slide.id === 'whynow' && 'stat' in slide && 'photo' in slide) {
    return {
      id: slide.id,
      section: slide.section,
      render: () => (
        <div className="pd-stack prosper-slide prosper-slide--whynow">
          <header className="prosper-whynow-head">
            <h1 className="prosper-whynow-title">{slide.title}</h1>
            <p className="prosper-whynow-subhead">{slide.subhead}</p>
          </header>

          <div className="prosper-whynow-main">
            <div className="prosper-whynow-stat">
              <p className="prosper-whynow-value">{slide.stat.value}</p>
              <p className="prosper-whynow-stat-text">{slide.stat.text}</p>
              <p className="prosper-whynow-trend">{slide.stat.trend}</p>
            </div>
            <figure className="prosper-whynow-photo">
              <img src={slide.photo.src} alt={slide.photo.alt} />
            </figure>
          </div>

          <footer className="prosper-whynow-foot">
            <p className="prosper-whynow-close">{slide.close}</p>
            <p className="prosper-whynow-source">
              <a href={slide.source.href} target="_blank" rel="noopener noreferrer">
                {slide.source.label}
              </a>
            </p>
          </footer>
        </div>
      ),
    };
  }

  if (slide.id === 'market' && 'layers' in slide && 'lede' in slide && 'note' in slide) {
    return {
      id: slide.id,
      section: slide.section,
      render: () => (
        <div className="pd-stack prosper-slide prosper-slide--market">
          <header className="prosper-market-head">
            <h1 className="prosper-title">{slide.title}</h1>
            <p className="prosper-lede prosper-market-lede">{slide.lede}</p>
          </header>

          <div className="prosper-market-stage">
            <div className="prosper-market-rings" aria-hidden>
              <div className="prosper-market-ring prosper-market-ring--tam">
                <span>TAM</span>
              </div>
              <div className="prosper-market-ring prosper-market-ring--sam">
                <span>SAM</span>
              </div>
              <div className="prosper-market-ring prosper-market-ring--som">
                <span>SOM</span>
              </div>
            </div>

            <ol className="prosper-market-layers" aria-label="TAM, SAM, and SOM">
              {slide.layers.map((layer) => (
                <li
                  key={layer.tier}
                  className={`prosper-market-layer prosper-market-layer--${layer.tier.toLowerCase()}`}
                >
                  <p className="prosper-market-tier">{layer.tier}</p>
                  <p className="prosper-market-value">{layer.value}</p>
                  <p className="prosper-market-label">{layer.label}</p>
                  <p className="prosper-market-detail">{layer.detail}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className="prosper-market-note">{slide.note}</p>
        </div>
      ),
    };
  }

  if (slide.id === 'model' && 'plans' in slide && 'lede' in slide && 'note' in slide) {
    return {
      id: slide.id,
      section: slide.section,
      render: () => (
        <div className="pd-stack prosper-slide prosper-slide--revenue">
          <header className="prosper-revenue-head">
            <h1 className="prosper-title">{slide.title}</h1>
            <p className="prosper-lede prosper-revenue-lede">{slide.lede}</p>
          </header>

          <div className="prosper-revenue-plans" aria-label="Revenue plans">
            {slide.plans.map((plan) => (
              <article
                key={plan.id}
                className={
                  plan.recommended
                    ? 'prosper-revenue-plan prosper-revenue-plan--recommended'
                    : 'prosper-revenue-plan'
                }
              >
                {plan.recommended ? (
                  <span className="prosper-revenue-badge">Recommended</span>
                ) : null}
                <header className="prosper-revenue-plan-head">
                  <h2 className="prosper-revenue-plan-name">
                    {plan.name}{' '}
                    <span className="prosper-revenue-plan-price">{plan.price}</span>
                  </h2>
                  <p className="prosper-revenue-plan-audience">
                    <span>{plan.audience}</span>
                    {'audienceLogo' in plan && plan.audienceLogo ? (
                      <img
                        className="prosper-revenue-plan-audience-logo"
                        src={plan.audienceLogo.src}
                        alt={plan.audienceLogo.alt}
                      />
                    ) : null}
                  </p>
                </header>
                <ul className="prosper-revenue-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span className="prosper-revenue-check" aria-hidden>
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <aside className="prosper-revenue-note">
            <span className="prosper-revenue-note-icon" aria-hidden>
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 3.2c2.4 3.1 4.6 4.4 7.2 5.2-2.6.8-4.8 2.1-7.2 5.2-2.4-3.1-4.6-4.4-7.2-5.2 2.6-.8 4.8-2.1 7.2-5.2z"
                />
                <path
                  fill="currentColor"
                  d="M12 13.4c1.4 1.8 2.7 2.5 4.2 3-1.5.5-2.8 1.2-4.2 3-1.4-1.8-2.7-2.5-4.2-3 1.5-.5 2.8-1.2 4.2-3z"
                  opacity="0.55"
                />
              </svg>
            </span>
            <p>{slide.note}</p>
          </aside>
        </div>
      ),
    };
  }

  if (slide.id === 'roadmap' && 'phases' in slide && 'trustGates' in slide) {
    return {
      id: slide.id,
      section: slide.section,
      render: () => (
        <div className="pd-stack prosper-slide prosper-slide--roadmap">
          <header className="prosper-roadmap-head">
            <h1 className="prosper-title">{slide.title}</h1>
            <p className="prosper-lede prosper-roadmap-lede">{slide.lede}</p>
          </header>

          <div className="prosper-roadmap-body">
            <ol className="prosper-roadmap-timeline" aria-label="Roadmap timeline">
              {slide.phases.map((phase) => (
                <li
                  key={phase.id}
                  className={
                    phase.current
                      ? 'prosper-roadmap-node prosper-roadmap-node--current'
                      : 'prosper-roadmap-node'
                  }
                >
                  <span className="prosper-roadmap-dot" aria-hidden />
                  <span className="prosper-roadmap-when">{phase.when}</span>
                </li>
              ))}
            </ol>

            <ol className="prosper-roadmap-phases" aria-label="Roadmap phases">
              {slide.phases.map((phase) => (
                <li
                  key={phase.id}
                  className={
                    phase.current
                      ? 'prosper-roadmap-phase prosper-roadmap-phase--current'
                      : 'prosper-roadmap-phase'
                  }
                >
                  <p className="prosper-roadmap-number">{phase.number}</p>
                  <h2 className="prosper-roadmap-phase-title">{phase.title}</h2>
                  <p className="prosper-roadmap-focus">{phase.focus}</p>
                  <ul className="prosper-roadmap-points">
                    {phase.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <p className="prosper-roadmap-status">{phase.status}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="prosper-roadmap-gates" aria-label={slide.trustGates.label}>
            <p className="prosper-roadmap-gates-label">{slide.trustGates.label}</p>
            <p className="prosper-roadmap-gates-path">
              {slide.trustGates.path.map((step, index) => (
                <span key={step}>
                  {index > 0 ? (
                    <span className="prosper-roadmap-gates-arrow" aria-hidden>
                      →
                    </span>
                  ) : null}
                  <strong>{step}</strong>
                </span>
              ))}
            </p>
            <p className="prosper-roadmap-gates-note">{slide.trustGates.disclaimer}</p>
          </aside>
        </div>
      ),
    };
  }

  if (slide.id === 'contact' && 'socials' in slide && 'logo' in slide) {
    return {
      id: slide.id,
      section: slide.section,
      render: () => (
        <div className="pd-stack prosper-slide prosper-slide--contact">
          <header className="prosper-contact-brand">
            <img
              className="prosper-contact-logo"
              src={slide.logo.src}
              alt={slide.logo.alt}
            />
            <p className="prosper-contact-company">{slide.company}</p>
            <p className="prosper-contact-founder">{slide.founder}</p>
          </header>

          <div className="prosper-contact-channels">
            <a
              className="prosper-contact-link"
              href={`https://${slide.site}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {slide.site}
            </a>
            <a className="prosper-contact-link" href={`mailto:${slide.email}`}>
              {slide.email}
            </a>
          </div>

          <ul className="prosper-contact-socials" aria-label="Social media">
            {slide.socials.map((social) => (
              <li key={social.id}>
                <a
                  className="prosper-contact-social"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="prosper-contact-social-icon" aria-hidden>
                    <ContactSocialIcon kind={social.id} />
                  </span>
                  <span className="prosper-contact-social-meta">
                    <span className="prosper-contact-social-label">{social.label}</span>
                    <span className="prosper-contact-social-handle">{social.handle}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
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
