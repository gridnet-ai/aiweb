/**
 * ChatGPT × AIWEB Album replay — artist builds and publishes an AI Web Album.
 */
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import {
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Copy,
  Mic,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import './chatGptGetQuoteReplay.css';
import './chatGptAlbumMakeReplay.css';
import './chatGptReplayViewport.css';
import { ChatGptReplayViewport } from '@/demo/ChatGptReplayViewport';
import { useReplayInView } from '@/demo/useReplayInView';

const USER =
  'I\'m releasing my album Type — cinematic score with a human vocal. Help me build an AIWEB Album page with tracks and a film.';

const ASSISTANT_REPLY = [
  'Here is a draft **AI Web Album** from your masters — artwork, three tracks, and a film slot ready for **AIWEB Play** discovery:',
  '',
  'Review the tracklist, then publish to the AI Web.',
].join('\n');

const TRACKS = [
  {
    title: 'Type',
    duration: '4:12',
    note: 'Title track · cinematic vocal',
    kind: 'Track',
    artClass: 'gq-album-art',
  },
  {
    title: 'Drift',
    duration: '3:48',
    note: 'Instrumental interlude',
    kind: 'Track',
    artClass: 'gq-album-art gq-album-art--b',
  },
  {
    title: 'Film',
    duration: '2:01',
    note: 'Music video · same album',
    kind: 'Film',
    artClass: 'gq-album-art gq-album-art--c',
  },
] as const;

const ALBUM_TITLE = 'Type';
const ARTIST = 'The AI Web Company';
const PAGE_URL = 'ai-web-album.theaiwebcompany.com';

type Phase =
  | 'idle'
  | 'type-user'
  | 'worked'
  | 'reply'
  | 'carousel'
  | 'publish'
  | 'submit'
  | 'done';

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function renderReplyHtml(text: string, caret: boolean): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const body = text
    .split('\n')
    .map((line) => {
      if (!line.trim()) return '<div class="gq-gap"></div>';
      let html = esc(line);
      html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      return `<p class="gq-p">${html}</p>`;
    })
    .join('');
  return body + (caret ? '<span class="gq-caret" aria-hidden="true"></span>' : '');
}

function Reserve({
  sizer,
  children,
  className,
}: {
  sizer: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`gq-reserve${className ? ` ${className}` : ''}`}>
      <div className="gq-reserve-sizer" aria-hidden>
        {sizer}
      </div>
      <div className="gq-reserve-paint">{children}</div>
    </div>
  );
}

function TrackCarousel({ activeTrack }: { activeTrack: number }) {
  return (
    <div className="gq-album-carousel-wrap">
      <div className="gq-album-carousel-head">
        <span>Album draft</span>
        <span className="gq-dress-carousel-nav" aria-hidden>
          <ChevronLeft size={14} />
          <ChevronRight size={14} />
        </span>
      </div>
      <div
        className="gq-album-carousel"
        style={{ ['--gq-album-i' as string]: String(activeTrack) }}
      >
        {TRACKS.map((item, index) => (
          <article
            key={item.title}
            className={`gq-album-card${index === activeTrack ? ' is-active is-selected' : ''}`}
          >
            <div className={item.artClass} aria-hidden />
            <div className="gq-album-card-copy">
              <p className="gq-album-card-title">{item.title}</p>
              <p className="gq-album-card-meta">
                {item.duration} · <span className="gq-album-kind">{item.kind}</span>
              </p>
              <p className="gq-album-card-note">{item.note}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function PublishPanel({
  fieldStep,
  published,
  pressPublish,
}: {
  fieldStep: number;
  published: boolean;
  pressPublish: boolean;
}) {
  return (
    <div className={`gq-album-publish${published ? ' is-sent' : ''}`}>
      <p className="gq-form-title">Publish AI Web Album · {ALBUM_TITLE}</p>
      <div className="gq-fields">
        <div className="gq-field">
          <span className="gq-label">Album</span>
          <div className={`gq-input${fieldStep >= 1 ? '' : ' is-empty'}`}>
            {fieldStep >= 1 ? ALBUM_TITLE : ''}
          </div>
        </div>
        <div className="gq-field">
          <span className="gq-label">Artist</span>
          <div className={`gq-input${fieldStep >= 2 ? '' : ' is-empty'}`}>
            {fieldStep >= 2 ? ARTIST : ''}
          </div>
        </div>
        <div className="gq-field">
          <span className="gq-label">Works</span>
          <div className={`gq-input${fieldStep >= 3 ? '' : ' is-empty'}`}>
            {fieldStep >= 3 ? '3 tracks · 1 film' : ''}
          </div>
        </div>
      </div>
      <span className={`gq-album-publish-btn gq-submit${pressPublish ? ' is-press' : ''}`}>
        Publish to the AI Web
      </span>
      <div className={`gq-ok${published ? '' : ' gq-hold'}`}>
        Published at <strong className="gq-ok-id">{PAGE_URL}</strong>. Listeners can ask ChatGPT to
        play <strong>Type</strong> from the AI Web Album — same page, stream-only masters.
      </div>
    </div>
  );
}

function AlbumAssistantBlock({
  reply,
  replyCaret,
  showReply,
  activeTrack,
  showCarousel,
  showPublish,
  published,
  fieldStep,
  pressPublish,
}: {
  reply: string;
  replyCaret: boolean;
  showReply: boolean;
  activeTrack: number;
  showCarousel: boolean;
  showPublish: boolean;
  published: boolean;
  fieldStep: number;
  pressPublish: boolean;
}) {
  return (
    <div className="gq-assistant-block">
      <Reserve
        sizer={
          <div
            className="gq-stylist-reply"
            dangerouslySetInnerHTML={{
              __html: renderReplyHtml(ASSISTANT_REPLY, false),
            }}
          />
        }
      >
        <div
          className={`gq-stylist-reply${showReply ? '' : ' gq-hold'}`}
          dangerouslySetInnerHTML={{
            __html: renderReplyHtml(reply, replyCaret),
          }}
        />
      </Reserve>

      <Reserve sizer={<TrackCarousel activeTrack={1} />}>
        <div className={showCarousel ? '' : 'gq-hold'} aria-hidden={!showCarousel}>
          <TrackCarousel activeTrack={activeTrack} />
        </div>
      </Reserve>

      <Reserve sizer={<PublishPanel fieldStep={3} published pressPublish={false} />}>
        <div className={showPublish ? '' : 'gq-hold'} aria-hidden={!showPublish}>
          <PublishPanel
            fieldStep={fieldStep}
            published={published}
            pressPublish={pressPublish}
          />
        </div>
      </Reserve>

      <div className="gq-footer" aria-hidden>
        <Copy size={15} strokeWidth={1.7} />
        <ThumbsUp size={15} strokeWidth={1.7} />
        <ThumbsDown size={15} strokeWidth={1.7} />
        <Share2 size={15} strokeWidth={1.7} />
        <RefreshCw size={15} strokeWidth={1.7} />
        <MoreHorizontal size={15} strokeWidth={1.7} />
      </div>
    </div>
  );
}

function Composer() {
  return (
    <div className="gq-composer" aria-hidden>
      <span className="gq-composer-plus">
        <Plus size={18} strokeWidth={1.8} />
      </span>
      <span className="gq-composer-ph">Ask a follow-up…</span>
      <span className="gq-composer-model">5.6 Sol Light</span>
      <span className="gq-composer-mic">
        <Mic size={16} strokeWidth={1.8} />
      </span>
      <span className="gq-composer-send">
        <ArrowUp size={16} strokeWidth={2.2} />
      </span>
    </div>
  );
}

export function ChatGptAlbumMakeReplay() {
  const { ref: sceneRef, inView } = useReplayInView();
  const [phase, setPhase] = useState<Phase>('idle');
  const [userN, setUserN] = useState(0);
  const [worked, setWorked] = useState(-1);
  const [replyN, setReplyN] = useState(0);
  const [activeTrack, setActiveTrack] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [published, setPublished] = useState(false);
  const [fieldStep, setFieldStep] = useState(0);

  const reset = useCallback(() => {
    setPhase('idle');
    setUserN(0);
    setWorked(-1);
    setReplyN(0);
    setActiveTrack(0);
    setShowCarousel(false);
    setShowPublish(false);
    setPublished(false);
    setFieldStep(0);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (!inView) {
        reset();
        return;
      }
      setUserN(USER.length);
      setWorked(16);
      setReplyN(ASSISTANT_REPLY.length);
      setShowCarousel(true);
      setActiveTrack(0);
      setShowPublish(true);
      setFieldStep(3);
      setPublished(true);
      setPhase('done');
      return;
    }

    if (!inView) {
      reset();
      return;
    }

    let cancelled = false;

    const run = async () => {
      reset();
      await sleep(400);
      if (cancelled) return;

      setPhase('type-user');
      for (let i = 1; i <= USER.length; i++) {
        if (cancelled) return;
        setUserN(i);
        await sleep(22);
      }
      await sleep(400);
      if (cancelled) return;

      setPhase('worked');
      for (let s = 0; s <= 16; s++) {
        if (cancelled) return;
        setWorked(s);
        await sleep(55);
      }
      await sleep(300);
      if (cancelled) return;

      setPhase('reply');
      for (let i = 1; i <= ASSISTANT_REPLY.length; i++) {
        if (cancelled) return;
        setReplyN(i);
        await sleep(14);
      }
      await sleep(500);
      if (cancelled) return;

      setPhase('carousel');
      setShowCarousel(true);
      for (let idx = 0; idx < TRACKS.length; idx++) {
        if (cancelled) return;
        setActiveTrack(idx);
        await sleep(900);
      }
      setActiveTrack(0);
      await sleep(700);
      if (cancelled) return;

      setPhase('publish');
      setShowPublish(true);
      for (let step = 1; step <= 3; step++) {
        if (cancelled) return;
        setFieldStep(step);
        await sleep(500);
      }
      await sleep(400);
      if (cancelled) return;

      setPhase('submit');
      setPublished(true);
      await sleep(400);
      if (cancelled) return;

      setPhase('done');
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [inView, reset]);

  const user = USER.slice(0, userN);
  const reply = ASSISTANT_REPLY.slice(0, replyN);

  return (
    <div
      className="gq-story gq-story--album"
      data-demo="album-make-replay"
      aria-label="ChatGPT AIWEB Album make replay"
    >
      <div ref={sceneRef} className="gq-scene gq-scene--chat">
        <h3 className="gq-scene-title font-display">
          <mark className="gq-scene-mark">Chat GPT Artist</mark>
          <span className="gq-scene-action">publishes an album</span>
        </h3>
        <ChatGptReplayViewport maxHeightVh={76}>
          <div
            className={`gq-replay${phase === 'done' ? ' is-done' : inView ? ' is-play' : ' is-wait'}`}
          >
            <div className="gq-thread">
              <div className="gq-user-row">
                <Reserve className="gq-user-bubble" sizer={USER}>
                  {user}
                  {phase === 'type-user' && userN < USER.length ? (
                    <span className="gq-caret" aria-hidden />
                  ) : null}
                </Reserve>
              </div>

              <div className={`gq-worked${worked < 0 ? ' is-hidden' : ''}`}>
                Worked for {Math.max(0, worked)}s
                <span aria-hidden> &gt;</span>
              </div>

              <AlbumAssistantBlock
                reply={reply}
                replyCaret={phase === 'reply' && replyN < ASSISTANT_REPLY.length}
                showReply={replyN > 0}
                activeTrack={activeTrack}
                showCarousel={showCarousel}
                showPublish={showPublish}
                published={published}
                fieldStep={fieldStep}
                pressPublish={phase === 'publish' && !published}
              />
            </div>
            <p className="gq-disclaimer">
              ChatGPT can make mistakes. Workspace data isn’t used to train models.
            </p>
            <Composer />
          </div>
        </ChatGptReplayViewport>
      </div>
    </div>
  );
}
