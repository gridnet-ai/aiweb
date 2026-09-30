import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { PublisherStoryId } from '@/demo/quoteReplayStories';
import { PROJECTS, TOOLBAR } from './constants';
import { aiwebOsStoryConfig } from './aiwebOsStoryConfigs';
import { WorkerBees } from './WorkerBees';
import './aiwebOsAnimation.css';

type Phase =
  | 'label-chatgpt'
  | 'label-aiweb'
  | 'type-prompt'
  | 'fly-prompt'
  | 'agent-receive'
  | 'building'
  | 'respond'
  | 'hold';

type AiwebOsAnimationProps = {
  storyId?: PublisherStoryId;
};

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function ThoughtDots() {
  return (
    <span className="aos-thought-dots" aria-hidden>
      <span />
      <span />
      <span />
    </span>
  );
}

/** Animated AIWEB OS mock — build a new page from ChatGPT prompt. */
export function AiwebOsAnimation({ storyId = 'shopper' }: AiwebOsAnimationProps) {
  const cfg = aiwebOsStoryConfig(storyId);
  const preview = cfg.build.preview;
  const buildImages = cfg.buildImages;
  const userPrompt = cfg.build.userPrompt;
  const response = cfg.build.response;
  const thoughts = cfg.build.thoughts;
  const heroImage = preview.heroImage ?? buildImages[0]?.src;
  const projects = PROJECTS.map((project, i) =>
    i === 0 ? { ...project, title: preview.projectTitle } : project,
  );
  const placeholderClass = preview.heroPlaceholder
    ? ` aos-hero-photo--${preview.heroPlaceholder}`
    : '';
  const thumbPlaceholderClass = preview.heroPlaceholder
    ? ` aos-project-thumb--${preview.heroPlaceholder}`
    : '';

  const rootRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);
  const agentFootRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>('label-chatgpt');
  const [composerText, setComposerText] = useState('');
  const [agentText, setAgentText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [showFly, setShowFly] = useState(false);
  const [flyVars, setFlyVars] = useState({ dx: '0px', dy: '0px', sx: '0px', sy: '0px' });
  const [buildStep, setBuildStep] = useState(0);
  const [thoughtIdx, setThoughtIdx] = useState(0);
  const [building, setBuilding] = useState(false);
  const [buildBtnLabel, setBuildBtnLabel] = useState('Build');

  useLayoutEffect(() => {
    if (phase !== 'fly-prompt') return;
    const root = rootRef.current;
    const from = composerRef.current;
    const to = agentFootRef.current;
    if (!root || !from || !to) return;
    const rr = root.getBoundingClientRect();
    const fr = from.getBoundingClientRect();
    const tr = to.getBoundingClientRect();
    setFlyVars({
      sx: `${fr.left - rr.left + fr.width * 0.5}px`,
      sy: `${fr.top - rr.top + fr.height * 0.42}px`,
      dx: `${tr.left - fr.left + tr.width * 0.5 - fr.width * 0.5}px`,
      dy: `${tr.top - fr.top}px`,
    });
  }, [phase]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        setPhase('label-chatgpt');
        setComposerText('');
        setAgentText('');
        setResponseText('');
        setShowFly(false);
        setBuildStep(0);
        setBuilding(false);
        setBuildBtnLabel('Build');
        setThoughtIdx(0);
        await sleep(1600);
        if (cancelled) return;

        setPhase('label-aiweb');
        await sleep(1600);
        if (cancelled) return;

        setPhase('type-prompt');
        for (let i = 1; i <= userPrompt.length; i++) {
          if (cancelled) return;
          setComposerText(userPrompt.slice(0, i));
          await sleep(38);
        }
        await sleep(400);
        if (cancelled) return;

        setPhase('fly-prompt');
        await sleep(48);
        if (cancelled) return;
        setShowFly(true);
        await sleep(900);
        if (cancelled) return;
        setShowFly(false);

        setPhase('agent-receive');
        setComposerText('');
        setAgentText(userPrompt);
        setBuildBtnLabel('Build');
        await sleep(500);
        if (cancelled) return;
        setBuildBtnLabel('Building…');
        await sleep(400);
        if (cancelled) return;

        setPhase('building');
        setBuilding(true);
        for (let step = 1; step <= 4; step++) {
          if (cancelled) return;
          setBuildStep(step);
          setThoughtIdx(step - 1);
          await sleep(900);
        }
        setBuildBtnLabel('Built');
        await sleep(600);
        if (cancelled) return;

        setPhase('respond');
        for (let i = 1; i <= response.length; i++) {
          if (cancelled) return;
          setResponseText(response.slice(0, i));
          await sleep(16);
        }
        setPhase('hold');
        await sleep(4500);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [storyId, userPrompt, response, thoughts]);

  const showHeadline =
    phase === 'label-chatgpt' ||
    phase === 'label-aiweb' ||
    phase === 'type-prompt' ||
    phase === 'fly-prompt' ||
    phase === 'agent-receive' ||
    phase === 'building';
  const chatgptHighlight = phase === 'label-chatgpt';
  const aiwebHighlight = phase === 'label-aiweb';
  const showDressInComposer = phase === 'type-prompt' || (phase === 'fly-prompt' && !showFly);
  const showComposerPrompt = phase === 'type-prompt' || (phase === 'fly-prompt' && !showFly);
  const showAgentDress = Boolean(agentText);

  return (
    <div
      ref={rootRef}
      className={`aos-os aos-os--story${building ? ' is-building' : ''}${buildStep >= 4 ? ' is-built' : ''}`}
      data-phase={phase}
      aria-label="ChatGPT workspace with AIWEB OS"
    >
      {showFly ? (
        <div
          className="aos-flying-bundle"
          style={{
            left: flyVars.sx,
            top: flyVars.sy,
            ['--fly-dx' as string]: flyVars.dx,
            ['--fly-dy' as string]: flyVars.dy,
          }}
        >
          <div className="aos-flying-bundle-imgs" aria-hidden>
            {buildImages.map((image) => (
              <img key={image.src} src={image.src} alt="" className="aos-flying-bundle-img" />
            ))}
          </div>
          <p className="aos-flying-bundle-text">{userPrompt}</p>
        </div>
      ) : null}

      <aside className={`aos-chatgpt${chatgptHighlight ? ' is-highlight' : ''}`}>
        <div
          className={`aos-name-flash aos-name-flash--chatgpt${chatgptHighlight ? ' is-visible' : ''}`}
          aria-hidden
        >
          <p className="aos-name-flash-kicker">Your AI workspace</p>
          <p className="aos-name-flash-title">ChatGPT</p>
        </div>
        <div className="aos-chatgpt-top">
          <div className="aos-mode-toggle" aria-hidden>
            <span>Chat</span>
            <span className="is-active">Work</span>
          </div>
        </div>
        <div className="aos-chatgpt-main">
          {showHeadline && !responseText ? (
            <p className="aos-chatgpt-headline">What should we work on?</p>
          ) : null}
          {responseText ? (
            <div className="aos-chatgpt-reply">
              <p className="aos-chatgpt-reply-label">ChatGPT</p>
              <p className="aos-chatgpt-reply-body">{responseText}</p>
            </div>
          ) : null}
        </div>
        <div className="aos-chatgpt-foot">
          <div
            ref={composerRef}
            className={`aos-composer${phase === 'type-prompt' ? ' is-typing' : ''}`}
          >
            <p className="aos-composer-label">Work with ChatGPT</p>
            {showDressInComposer ? (
              <div
                className={`aos-composer-attach${cfg.hasMedia ? '' : ' aos-composer-attach--textonly'}`}
              >
                {cfg.hasMedia ? (
                  <div className="aos-composer-attach-imgs" aria-hidden>
                    {buildImages.map((image) => (
                      <img
                        key={image.src}
                        src={image.src}
                        alt=""
                        className="aos-composer-attach-img"
                        title={image.alt}
                      />
                    ))}
                  </div>
                ) : null}
                <span className="aos-composer-attach-label">{cfg.build.attachLabel}</span>
              </div>
            ) : null}
            <div className="aos-composer-row">
              <span className="aos-composer-icon" aria-hidden>
                +
              </span>
              <p className="aos-composer-input">
                {showComposerPrompt ? composerText : ''}
                {phase === 'type-prompt' && composerText.length < userPrompt.length ? (
                  <span className="aos-cursor" />
                ) : null}
              </p>
              <span className="aos-composer-icon aos-composer-icon--mic" aria-hidden />
            </div>
            <div className="aos-composer-foot">
              <span className="aos-chip">Choose project</span>
              <span className="aos-chip">Plugins ▾</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="aos-os-embed">
        <div className="aos-browser-chrome">
          <div className="aos-browser-tabs" aria-hidden>
            <span className="aos-browser-tab is-active">
              <span className="aos-browser-tab-dot" />
              AIWEB OS
            </span>
            <span className="aos-browser-tab-add">+</span>
          </div>
          <div className="aos-browser-bar">
            <span className="aos-browser-lock" aria-hidden />
            <span className="aos-browser-url">os.theaiwebcompany.com</span>
            <span className="aos-browser-actions" aria-hidden />
          </div>
        </div>

        <div className={`aos-os-inner${aiwebHighlight ? ' is-highlight' : ''}`}>
          <div
            className={`aos-name-flash aos-name-flash--aiweb${aiwebHighlight ? ' is-visible' : ''}`}
            aria-hidden
          >
            <p className="aos-name-flash-kicker">Your build environment</p>
            <p className="aos-name-flash-title">
              AIWEB <span className="aos-name-flash-os">OS</span>
            </p>
          </div>
          <aside className="aos-os-projects">
            <div className={`aos-os-brand${aiwebHighlight ? ' is-glow' : ''}`}>
              <span className="aos-os-brand-mark" aria-hidden />
              <span className="aos-os-brand-name">AIWEB OS</span>
            </div>
            <p className="aos-os-section-label">Projects</p>
            <div className="aos-projects">
              {projects.map((project, i) => (
                <article
                  key={project.title}
                  className={`aos-project${i === 0 ? ' is-active' : ''}`}
                  style={{ ['--aos-i' as string]: String(i) }}
                >
                  <div
                    className={`aos-project-thumb${
                      i === 0
                        ? heroImage
                          ? ' aos-project-thumb--photo'
                          : thumbPlaceholderClass
                        : project.thumb === 'pink'
                          ? ' aos-project-thumb--pink'
                          : project.thumb === 'gold'
                            ? ' aos-project-thumb--gold'
                            : project.thumb === 'green'
                              ? ' aos-project-thumb--green'
                              : ''
                    }`}
                    aria-hidden
                  >
                    {i === 0 && heroImage ? <img src={heroImage} alt="" /> : null}
                  </div>
                  <div className="aos-project-body">
                    <p className="aos-project-title">{project.title}</p>
                    {buildStep >= 4 && i === 0 ? (
                      <span className="aos-published" style={{ ['--aos-i' as string]: String(i) }}>
                        Published
                      </span>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </aside>

          <main className="aos-os-preview">
            <div className="aos-toolbar" aria-hidden>
              {TOOLBAR.map((item) => (
                <span
                  key={item}
                  className={`aos-toolbar-item${item === 'Snapshot' && buildStep >= 2 ? ' is-active' : ''}`}
                >
                  {item}
                </span>
              ))}
              <span className={`aos-toolbar-live${building ? ' is-live' : ''}`}>
                {building ? 'Building' : 'Live'}
              </span>
            </div>
            <div className="aos-preview">
              {building ? <WorkerBees /> : null}
              {buildStep < 1 ? (
                <div className="aos-preview-empty">
                  <p>Waiting for build…</p>
                </div>
              ) : null}
              {buildStep >= 1 && buildStep < 4 ? (
                <div className="aos-preview-skeleton" aria-hidden>
                  <span />
                  <span />
                  <span />
                </div>
              ) : null}
              <div className={`aos-preview-content${buildStep >= 2 ? ' is-visible' : ''}`}>
                <h3 className={`aos-preview-title${buildStep >= 2 ? ' is-revealed' : ''}`}>
                  {preview.previewTitle}
                </h3>
                <div className={`aos-hero${buildStep >= 3 ? ' is-revealed' : ''}`}>
                  <div className="aos-hero-copy">
                    <p className="aos-hero-kicker">{preview.heroKicker}</p>
                    <p className="aos-hero-name">{preview.heroName}</p>
                    <p className="aos-hero-desc">{preview.heroDesc}</p>
                    <div className="aos-pills">
                      {preview.pills.map((pill, pillIndex) => (
                        <span
                          key={pill}
                          className="aos-pill"
                          style={{ ['--aos-p' as string]: String(pillIndex) }}
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    className={`aos-hero-photo${heroImage ? '' : ` aos-hero-photo--placeholder${placeholderClass}`}`}
                    aria-hidden
                  >
                    {buildStep >= 3 && heroImage ? <img src={heroImage} alt="" /> : null}
                  </div>
                </div>
                {buildImages.length > 0 ? (
                  <div className={`aos-preview-gallery${buildStep >= 4 ? ' is-revealed' : ''}`} aria-hidden>
                    {buildImages.map((image, i) => (
                      <span key={image.src} style={{ ['--aos-g' as string]: String(i) }}>
                        <img src={image.src} alt="" title={image.alt} />
                      </span>
                    ))}
                  </div>
                ) : null}
                <dl className={`aos-snapshot${buildStep >= 4 ? ' is-revealed' : ''}`}>
                  {preview.snapshot.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </main>

          <aside className="aos-os-agent">
            <div className="aos-agent-tabs" aria-hidden>
              <span className="aos-agent-tab is-active">Agent</span>
              <span className="aos-agent-tab">Check AI</span>
              <span className="aos-agent-tab">Settings</span>
              <span className="aos-agent-tab">Storage</span>
            </div>
            <div className="aos-agent-body">
              <div className={`aos-image-grid${buildStep >= 1 ? ' is-visible' : ''}`} aria-hidden>
                {cfg.hasMedia
                  ? Array.from({ length: 8 }, (_, i) => (
                      <span key={i} style={{ ['--aos-g' as string]: String(i) }}>
                        <img src={buildImages[i % buildImages.length].src} alt="" />
                      </span>
                    ))
                  : null}
              </div>
              {building ? <p className="aos-instruction is-live">{thoughts[thoughtIdx]}</p> : null}
              {building ? (
                <div className="aos-thought is-live">
                  <p className="aos-thought-label">
                    Thought
                    <ThoughtDots />
                  </p>
                  <p>Building machine-readable page from prompt…</p>
                </div>
              ) : null}
            </div>
            <div ref={agentFootRef} className="aos-agent-foot">
              <div className="aos-build-row">
                {showAgentDress && cfg.hasMedia ? (
                  <div className="aos-build-thumbs" aria-hidden>
                    {buildImages.map((image) => (
                      <img key={image.src} src={image.src} alt="" className="aos-build-thumb" />
                    ))}
                  </div>
                ) : null}
                <div className="aos-build-main">
                  <span
                    className={`aos-build-input${agentText ? ' has-text' : ''}${phase === 'agent-receive' ? ' is-receiving' : ''}`}
                  >
                    {agentText || 'Ask the AIWEB OS agent…'}
                  </span>
                  <button
                    type="button"
                    className={`aos-build-btn${building ? ' is-building' : ''}${buildStep >= 4 ? ' is-done' : ''}`}
                  >
                    {buildBtnLabel}
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
