import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { PublisherStoryId } from '@/demo/quoteReplayStories';
import { PROJECTS, TOOLBAR } from './constants';
import { aiwebOsStoryConfig } from './aiwebOsStoryConfigs';
import { WorkerBees } from './WorkerBees';
import './aiwebOsAnimation.css';

const PUBLISH_STEPS = [
  'Validating machine-readable page…',
  'Deploying to AIWEB edge…',
  'Registering AI discovery signals…',
  'Page is live',
] as const;

type AiwebOsPublishAnimationProps = {
  storyId?: PublisherStoryId;
};

type Phase =
  | 'hold-ready'
  | 'type-prompt'
  | 'fly-prompt'
  | 'agent-receive'
  | 'publishing'
  | 'respond'
  | 'hold';

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

/** Third story — publish a built AIWEB page to the live AI Web. */
export function AiwebOsPublishAnimation({ storyId = 'shopper' }: AiwebOsPublishAnimationProps) {
  const cfg = aiwebOsStoryConfig(storyId);
  const preview = cfg.publish.preview;
  const publishPrompt = cfg.publish.userPrompt;
  const chatgptQuestion = cfg.publish.chatgptQuestion;
  const publishResponse = cfg.publish.response;
  const targetLiveUrl = cfg.publish.liveUrl;
  const gallery = cfg.fullGallery.length ? cfg.fullGallery : cfg.builtGallery;
  const heroImage = preview.heroImage ?? cfg.builtGallery[0]?.src;
  const updateHeroImage = cfg.updateImages[0]?.src;
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

  const [phase, setPhase] = useState<Phase>('hold-ready');
  const [composerText, setComposerText] = useState('');
  const [agentText, setAgentText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [showFly, setShowFly] = useState(false);
  const [flyVars, setFlyVars] = useState({ dx: '0px', dy: '0px', sx: '0px', sy: '0px' });
  const [publishStep, setPublishStep] = useState(0);
  const [publishing, setPublishing] = useState(false);
  const [buildBtnLabel, setBuildBtnLabel] = useState('Publish');
  const [liveUrl, setLiveUrl] = useState('os.theaiwebcompany.com');

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
        setPhase('hold-ready');
        setComposerText('');
        setAgentText('');
        setResponseText('');
        setShowFly(false);
        setPublishStep(0);
        setPublishing(false);
        setBuildBtnLabel('Publish');
        setLiveUrl('os.theaiwebcompany.com');
        await sleep(2800);
        if (cancelled) return;

        setPhase('type-prompt');
        for (let i = 1; i <= publishPrompt.length; i++) {
          if (cancelled) return;
          setComposerText(publishPrompt.slice(0, i));
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
        setAgentText(publishPrompt);
        setBuildBtnLabel('Publish');
        await sleep(500);
        if (cancelled) return;
        setBuildBtnLabel('Publishing…');
        await sleep(400);
        if (cancelled) return;

        setPhase('publishing');
        setPublishing(true);
        for (let step = 1; step <= 4; step++) {
          if (cancelled) return;
          setPublishStep(step);
          await sleep(750);
        }
        setBuildBtnLabel('Published');
        setLiveUrl(targetLiveUrl);
        await sleep(700);
        if (cancelled) return;

        setPhase('respond');
        for (let i = 1; i <= publishResponse.length; i++) {
          if (cancelled) return;
          setResponseText(publishResponse.slice(0, i));
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
  }, [storyId, publishPrompt, publishResponse, targetLiveUrl]);

  const showComposerPrompt = phase === 'type-prompt' || (phase === 'fly-prompt' && !showFly);
  const showAgentPrompt = Boolean(agentText);
  const isLive = publishStep >= 4;

  return (
    <div
      ref={rootRef}
      className={`aos-os aos-os--story aos-os--publish${publishing ? ' is-building' : ''}${isLive ? ' is-live' : ''}`}
      data-phase={phase}
      aria-label="ChatGPT workspace publishing AIWEB page"
    >
      {showFly ? (
        <div
          className="aos-flying-bundle aos-flying-bundle--text"
          style={{
            left: flyVars.sx,
            top: flyVars.sy,
            ['--fly-dx' as string]: flyVars.dx,
            ['--fly-dy' as string]: flyVars.dy,
          }}
        >
          <p className="aos-flying-bundle-text">{publishPrompt}</p>
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
          {!responseText ? (
            <div className="aos-chatgpt-reply">
              <p className="aos-chatgpt-reply-label">ChatGPT</p>
              <p className="aos-chatgpt-reply-body">{chatgptQuestion}</p>
            </div>
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
            <div className="aos-composer-row">
              <span className="aos-composer-icon" aria-hidden>
                +
              </span>
              <p className="aos-composer-input">
                {showComposerPrompt ? composerText : ''}
                {phase === 'type-prompt' && composerText.length < publishPrompt.length ? (
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
            <span className={`aos-browser-url${isLive ? ' is-live' : ''}`}>{liveUrl}</span>
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
                      <span
                        className={`aos-published${isLive ? ' aos-published--live' : ''}`}
                        style={{ ['--aos-i' as string]: String(i) }}
                      >
                        {isLive ? 'Live' : 'Ready'}
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
                <span key={item} className="aos-toolbar-item">
                  {item}
                </span>
              ))}
              <span className={`aos-toolbar-live${isLive ? ' is-live' : publishing ? ' is-publishing' : ''}`}>
                {isLive ? 'Live' : publishing ? 'Publishing' : 'Preview'}
              </span>
            </div>
            <div className="aos-preview">
              {publishing ? <WorkerBees /> : null}
              {publishing && publishStep >= 1 && publishStep < 4 ? (
                <div className="aos-publish-overlay" aria-hidden>
                  <div className="aos-publish-card">
                    <p className="aos-publish-title">Publishing AIWEB Page</p>
                    <ul className="aos-publish-steps">
                      {PUBLISH_STEPS.map((step, i) => (
                        <li
                          key={step}
                          className={
                            publishStep > i ? 'is-done' : publishStep === i + 1 ? 'is-active' : ''
                          }
                        >
                          {step}
                        </li>
                      ))}
                    </ul>
                    <div className="aos-publish-bar">
                      <span style={{ width: `${(publishStep / 4) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ) : null}
              {isLive ? (
                <div className="aos-publish-success" aria-hidden>
                  <span className="aos-publish-success-icon">✓</span>
                  <p className="aos-publish-success-title">Page is live</p>
                  <p className="aos-publish-success-url">{liveUrl}</p>
                </div>
              ) : null}
              <div className={`aos-preview-content is-visible${publishing && publishStep < 4 ? ' is-dimmed' : ''}`}>
                <h3 className="aos-preview-title is-revealed">{preview.previewTitle}</h3>
                <div className={`aos-hero is-revealed${dualHero ? ' aos-hero--dual' : ''}`}>
                  <div className="aos-hero-copy">
                    <p className="aos-hero-kicker">{preview.heroKicker}</p>
                    <p className="aos-hero-name">{preview.heroName}</p>
                    <p className="aos-hero-desc">{preview.heroDesc}</p>
                    <div className="aos-pills">
                      {preview.pills.map((pill, pillIndex) => (
                        <span
                          key={pill}
                          className={`aos-pill${pillIndex === 1 ? ' aos-pill--highlight' : ''}`}
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                  {dualHero ? (
                    <div className="aos-hero-photos aos-hero-photos--dual" aria-hidden>
                      <img src={heroImage} alt="" className="aos-hero-photo-img" />
                      <img src={updateHeroImage} alt="" className="aos-hero-photo-img" />
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
                {gallery.length > 0 ? (
                  <div className="aos-preview-gallery is-revealed aos-preview-gallery--dual">
                    {gallery.map((image, i) => (
                      <span key={`${image.src}-${i}`} style={{ ['--aos-g' as string]: String(i) }}>
                        <img src={image.src} alt="" title={image.alt} />
                      </span>
                    ))}
                  </div>
                ) : null}
                <dl className="aos-snapshot is-revealed">
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
              <div
                className={`aos-image-grid is-visible${dualHero ? ' aos-image-grid--dual' : ''}`}
                aria-hidden
              >
                {cfg.hasMedia
                  ? gallery.map((image, i) => (
                      <span key={`${image.src}-${i}`} style={{ ['--aos-g' as string]: String(i) }}>
                        <img src={image.src} alt="" />
                      </span>
                    ))
                  : null}
              </div>
            </div>
            <div ref={agentFootRef} className="aos-agent-foot">
              <div className="aos-build-row">
                <div className="aos-build-main">
                  <span
                    className={`aos-build-input${showAgentPrompt ? ' has-text' : ''}${phase === 'agent-receive' ? ' is-receiving' : ''}`}
                  >
                    {agentText || 'Ask the AIWEB OS agent…'}
                  </span>
                  <button
                    type="button"
                    className={`aos-build-btn aos-build-btn--publish${publishing ? ' is-building' : ''}${isLive ? ' is-done' : ''}`}
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
