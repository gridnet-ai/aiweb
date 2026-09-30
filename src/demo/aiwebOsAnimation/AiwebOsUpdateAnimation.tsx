import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { PublisherStoryId } from '@/demo/quoteReplayStories';
import { PROJECTS, TOOLBAR } from './constants';
import { aiwebOsStoryConfig } from './aiwebOsStoryConfigs';
import { WorkerBees } from './WorkerBees';
import './aiwebOsAnimation.css';

type Phase =
  | 'hold-built'
  | 'type-prompt'
  | 'fly-prompt'
  | 'agent-receive'
  | 'updating'
  | 'respond'
  | 'hold';

type AiwebOsUpdateAnimationProps = {
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

/** Second story — update an existing AIWEB page. */
export function AiwebOsUpdateAnimation({ storyId = 'shopper' }: AiwebOsUpdateAnimationProps) {
  const cfg = aiwebOsStoryConfig(storyId);
  const preview = cfg.update.preview;
  const updatePrompt = cfg.update.userPrompt;
  const updateResponse = cfg.update.response;
  const updateThoughts = cfg.update.thoughts;
  const builtGallery = cfg.builtGallery;
  const fullGallery = cfg.fullGallery.length ? cfg.fullGallery : cfg.builtGallery;
  const updateImages = cfg.updateImages;
  const heroImage = preview.heroImage ?? builtGallery[0]?.src;
  const updateHeroImage = updateImages[0]?.src;
  const projects = PROJECTS.map((project, i) =>
    i === 0 ? { ...project, title: preview.projectTitle } : project,
  );
  const placeholderClass = preview.heroPlaceholder
    ? ` aos-hero-photo--${preview.heroPlaceholder}`
    : '';
  const thumbPlaceholderClass = preview.heroPlaceholder
    ? ` aos-project-thumb--${preview.heroPlaceholder}`
    : '';
  const dualHero = cfg.hasMedia && Boolean(updateHeroImage);

  const rootRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);
  const agentFootRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>('hold-built');
  const [composerText, setComposerText] = useState('');
  const [agentText, setAgentText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [showFly, setShowFly] = useState(false);
  const [flyVars, setFlyVars] = useState({ dx: '0px', dy: '0px', sx: '0px', sy: '0px' });
  const [updateStep, setUpdateStep] = useState(0);
  const [thoughtIdx, setThoughtIdx] = useState(0);
  const [updating, setUpdating] = useState(false);
  const [buildBtnLabel, setBuildBtnLabel] = useState('Update');

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

    const resetBuilt = () => {
      setUpdateStep(0);
      setUpdating(false);
      setBuildBtnLabel('Update');
      setAgentText('');
    };

    const run = async () => {
      while (!cancelled) {
        resetBuilt();
        setPhase('hold-built');
        setComposerText('');
        setResponseText('');
        setShowFly(false);
        setThoughtIdx(0);
        await sleep(2200);
        if (cancelled) return;

        setPhase('type-prompt');
        setComposerText('');
        for (let i = 1; i <= updatePrompt.length; i++) {
          if (cancelled) return;
          setComposerText(updatePrompt.slice(0, i));
          await sleep(34);
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
        setAgentText(updatePrompt);
        setBuildBtnLabel('Update');
        await sleep(500);
        if (cancelled) return;
        setBuildBtnLabel('Updating…');
        await sleep(400);
        if (cancelled) return;

        setPhase('updating');
        setUpdating(true);
        for (let step = 1; step <= 4; step++) {
          if (cancelled) return;
          setUpdateStep(step);
          setThoughtIdx(step - 1);
          await sleep(900);
        }
        setBuildBtnLabel('Updated');
        await sleep(600);
        if (cancelled) return;

        setPhase('respond');
        for (let i = 1; i <= updateResponse.length; i++) {
          if (cancelled) return;
          setResponseText(updateResponse.slice(0, i));
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
  }, [storyId, updatePrompt, updateResponse, updateThoughts]);

  const showHeadline = phase !== 'respond' && phase !== 'hold' && !responseText;
  const showDressInComposer = phase === 'type-prompt' || (phase === 'fly-prompt' && !showFly);
  const showComposerPrompt = phase === 'type-prompt' || (phase === 'fly-prompt' && !showFly);
  const showAgentDress = phase === 'agent-receive' || phase === 'updating' || phase === 'respond' || phase === 'hold';
  const agentGridImages =
    updateStep >= 1 && fullGallery.length ? fullGallery : builtGallery;
  const galleryDisplay = updateStep >= 2 ? fullGallery : [...builtGallery];
  const showPinkHero = updateStep >= 3;
  const showPinkAgentRow = updateStep >= 1 && cfg.hasMedia;

  return (
    <div
      ref={rootRef}
      className={`aos-os aos-os--story aos-os--update${updating ? ' is-building' : ''}${updateStep >= 4 ? ' is-built' : ''}`}
      data-phase={phase}
      aria-label="ChatGPT workspace updating AIWEB OS page"
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
            {updateImages.map((image) => (
              <img key={image.src} src={image.src} alt="" className="aos-flying-bundle-img" />
            ))}
          </div>
          <p className="aos-flying-bundle-text">{updatePrompt}</p>
        </div>
      ) : null}

      <aside className="aos-chatgpt">
        <div className="aos-chatgpt-top">
          <div className="aos-mode-toggle" aria-hidden>
            <span>Chat</span>
            <span className="is-active">Work</span>
          </div>
        </div>
        <div className="aos-chatgpt-main">
          {showHeadline ? (
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
                    {updateImages.map((image) => (
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
                <span className="aos-composer-attach-label">{cfg.update.attachLabel}</span>
              </div>
            ) : null}
            <div className="aos-composer-row">
              <span className="aos-composer-icon" aria-hidden>
                +
              </span>
              <p className="aos-composer-input">
                {showComposerPrompt ? composerText : ''}
                {phase === 'type-prompt' && composerText.length < updatePrompt.length ? (
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

        <div className="aos-os-inner">
          <aside className="aos-os-projects">
            <div className="aos-os-brand">
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
                        : ''
                    }`}
                    aria-hidden
                  >
                    {i === 0 && heroImage ? <img src={heroImage} alt="" /> : null}
                  </div>
                  <div className="aos-project-body">
                    <p className="aos-project-title">{project.title}</p>
                    {i === 0 ? (
                      <span className="aos-published" style={{ ['--aos-i' as string]: String(i) }}>
                        {updateStep >= 4 ? 'Updated' : 'Published'}
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
                  className={`aos-toolbar-item${item === 'Art' && updateStep >= 2 ? ' is-active' : ''}`}
                >
                  {item}
                </span>
              ))}
              <span className={`aos-toolbar-live${updating ? ' is-live' : ''}`}>
                {updating ? 'Updating' : 'Live'}
              </span>
            </div>
            <div className="aos-preview">
              {updating ? <WorkerBees /> : null}
              <div className="aos-preview-content is-visible">
                <h3 className="aos-preview-title is-revealed">{preview.previewTitle}</h3>
                <div className={`aos-hero is-revealed${showPinkHero && dualHero ? ' aos-hero--dual' : ''}`}>
                  <div className="aos-hero-copy">
                    <p className="aos-hero-kicker">{preview.heroKicker}</p>
                    <p className="aos-hero-name">{preview.heroName}</p>
                    <p className="aos-hero-desc">{preview.heroDesc}</p>
                    <div className="aos-pills">
                      {preview.pills.map((pill, pillIndex) => (
                        <span
                          key={pill}
                          className={`aos-pill${
                            (pillIndex === 0 && updateStep >= 4) ||
                            (pillIndex === 1 && updateStep >= 3)
                              ? ' aos-pill--highlight'
                              : ''
                          }`}
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                  {dualHero ? (
                    <div
                      className={`aos-hero-photos${showPinkHero ? ' aos-hero-photos--dual' : ''}`}
                      aria-hidden
                    >
                      <img src={heroImage} alt="" className="aos-hero-photo-img" />
                      {showPinkHero && updateHeroImage ? (
                        <img
                          src={updateHeroImage}
                          alt=""
                          className="aos-hero-photo-img aos-hero-photo-add"
                        />
                      ) : null}
                    </div>
                  ) : (
                    <div
                      className={`aos-hero-photo${heroImage ? '' : ` aos-hero-photo--placeholder${placeholderClass}`}`}
                      aria-hidden
                    >
                      {heroImage ? <img src={heroImage} alt="" /> : null}
                    </div>
                  )}
                </div>
                {galleryDisplay.length > 0 ? (
                  <div
                    className={`aos-preview-gallery is-revealed aos-preview-gallery--dual${updateStep >= 2 ? ' aos-gallery--updating' : ''}`}
                  >
                    {galleryDisplay.map((image, i) => (
                      <span
                        key={`${image.src}-${i}`}
                        className={
                          i >= builtGallery.length && updateStep >= 2 ? 'aos-gallery-slot--new' : ''
                        }
                        style={{ ['--aos-g' as string]: String(i) }}
                      >
                        <img src={image.src} alt="" title={image.alt} />
                      </span>
                    ))}
                  </div>
                ) : null}
                <dl className={`aos-snapshot is-revealed${updateStep >= 4 ? ' aos-snapshot--refresh' : ''}`}>
                  {preview.snapshot.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd className={updateStep >= 4 ? 'aos-snapshot-highlight' : ''}>{value}</dd>
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
              <div className={`aos-image-grid is-visible${showPinkAgentRow ? ' aos-image-grid--dual' : ''}`} aria-hidden>
                {agentGridImages.map((image, i) => (
                  <span
                    key={`${image.src}-${i}`}
                    className={
                      i >= builtGallery.length && updateStep >= 2 ? 'aos-image-grid-slot--new' : ''
                    }
                    style={{ ['--aos-g' as string]: String(i) }}
                  >
                    <img src={image.src} alt="" />
                  </span>
                ))}
              </div>
              {updating ? (
                <p className="aos-instruction is-live">{updateThoughts[thoughtIdx]}</p>
              ) : null}
              {updating ? (
                <div className="aos-thought is-live">
                  <p className="aos-thought-label">
                    Thought
                    <ThoughtDots />
                  </p>
                  <p>Updating machine-readable page from new photos…</p>
                </div>
              ) : null}
            </div>
            <div ref={agentFootRef} className="aos-agent-foot">
              <div className="aos-build-row">
                {showAgentDress && cfg.hasMedia ? (
                  <div className="aos-build-thumbs" aria-hidden>
                    {updateImages.map((image) => (
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
                    className={`aos-build-btn${updating ? ' is-building' : ''}${updateStep >= 4 ? ' is-done' : ''}`}
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
