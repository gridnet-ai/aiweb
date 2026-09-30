/**
 * Live ChatGPT × AIWEB Get Quote replay — emergency plumbing scenario.
 */
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import {
  ArrowUp,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Mic,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Share2,
  ThumbsDown,
  ThumbsUp,
  User,
} from 'lucide-react';
import AIWebLogo from '@/components/welcome/AIWebLogo';
import { PublisherIcon } from '@/components/welcome/PublisherIcon';
import { CrawlerFamilyLogo } from '@/components/hits/CrawlerFamilyLogo';
import { crawlerFamilyBrand } from '@/lib/hits/crawlerFamilyBrand';
import './chatGptGetQuoteReplay.css';
import './chatGptReplayViewport.css';
import { ChatGptReplayViewport } from '@/demo/ChatGptReplayViewport';
import { useReplayInView } from '@/demo/useReplayInView';

const CHATGPT_BRAND = crawlerFamilyBrand('openai')!;
const PAGE_SLUG = 'metro-emergency-plumbing';
const WHEN = 'Sep 1, 9:12 AM';
const EVENT = '2026-09-01 · ASAP';
const CATERER = 'Metro Emergency Plumbing';
const PHOTO_MAIN = '/images/savory-moments-buffet.png';
const PHOTO_ALT = '/images/savory-moments-menu.png';

const USER = 'Need an emergency plumber today — kitchen sink is backing up.';
const NAME = 'Jordan Lee';
const EMAIL = 'jordan.lee@email.com';
const PHONE = '512-555-0184';
const DATE = '09/01/2026';
const TIME = 'ASAP';
const NOTES = 'Kitchen sink backup · emergency same-day';
const PHOTO = 'sink.jpg';
const RECEIPT = 'GxPlumb7kNm3Qr9vWn2';
const REPLY = [
  `The Get Quote form is open for **${CATERER}**, prefilled for:`,
  '',
  '• Emergency same-day service',
  '• Kitchen sink backup',
  '• Homeowner on site this afternoon',
  '',
  'Complete your contact details and submit to receive an **AIWEB Receipt**.',
].join('\n');
const ANSWER =
  'We can dispatch a technician this afternoon between 2–4 PM. Is someone home to let us in?';
const OWNER_WHEN = 'Sep 1, 9:28 AM';
const NEXT_STEP = 'Schedule service call';
const AVAIL = 'Same-day dispatch available.';
const PACKAGE = 'Emergency drain service';
const PRICE = '285';
const PRICE_LABEL = '$285.00';
const CHECK_USER = `check on the status of AIWEB Receipt is ${RECEIPT}`;
const CHECK_INTRO =
  "I'll look up that AIWEB Receipt now and show the latest business reply or status.";
const CHECK_FOOT = [
  `Receipt \`${RECEIPT}\` is **answered**. The Quote card above is updated.`,
  '',
  'Metro Emergency Plumbing is waiting for your reply to confirm the service window.',
].join('\n');
const WALK = '09/01/2026, 02:00 PM';
const USER_NOTE = "2 PM works — I'll be home.";
const FIELD_COUNT = 7;

type CaretField = 'user' | 'name' | 'email' | 'phone' | 'time' | 'notes' | 'reply' | null;
type LeadPhase = 'idle' | 'arrived' | 'convo' | 'form' | 'sent';
type CheckPhase = 'idle' | 'prompt' | 'card' | 'fill' | 'replied';
type Beat = 'wait' | 'play' | 'done';

type Live = {
  userN: number;
  worked: number;
  plugin: boolean;
  fields: number;
  nameN: number;
  emailN: number;
  phoneN: number;
  date: string;
  timeN: number;
  notesN: number;
  photo: boolean;
  replyN: number;
  footer: boolean;
  caret: CaretField;
  pressed: boolean;
  success: boolean;
};

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

const FINAL: Live = {
  userN: USER.length,
  worked: 21,
  plugin: true,
  fields: FIELD_COUNT,
  nameN: NAME.length,
  emailN: EMAIL.length,
  phoneN: PHONE.length,
  date: DATE,
  timeN: TIME.length,
  notesN: NOTES.length,
  photo: true,
  replyN: REPLY.length,
  footer: true,
  caret: null,
  pressed: false,
  success: true,
};

const BOOT: Live = {
  userN: 0,
  worked: -1,
  plugin: false,
  fields: FIELD_COUNT,
  nameN: 0,
  emailN: 0,
  phoneN: 0,
  date: '',
  timeN: 0,
  notesN: 0,
  photo: false,
  replyN: 0,
  footer: true,
  caret: null,
  pressed: false,
  success: false,
};

function beatClass(beat: Beat) {
  return `gq-beat is-${beat}`;
}

function SceneTitle({ who, action }: { who: string; action: string }) {
  return (
    <h3 className="gq-scene-title font-display">
      <mark className="gq-scene-mark">{who}</mark>
      <span className="gq-scene-action">{action}</span>
    </h3>
  );
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
      html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
      if (html.startsWith('• ')) {
        return `<div class="gq-li"><span class="gq-bullet">•</span><span>${html.slice(2)}</span></div>`;
      }
      return `<p class="gq-p">${html}</p>`;
    })
    .join('');
  return body + (caret ? '<span class="gq-caret" aria-hidden="true"></span>' : '');
}

function ThreadFooter() {
  return (
    <div className="gq-footer" aria-hidden>
      <Copy size={15} strokeWidth={1.7} />
      <ThumbsUp size={15} strokeWidth={1.7} />
      <ThumbsDown size={15} strokeWidth={1.7} />
      <Share2 size={15} strokeWidth={1.7} />
      <RefreshCw size={15} strokeWidth={1.7} />
      <MoreHorizontal size={15} strokeWidth={1.7} />
    </div>
  );
}

function Composer({ placeholder }: { placeholder: string }) {
  return (
    <div className="gq-composer" aria-hidden>
      <span className="gq-composer-plus">
        <Plus size={18} strokeWidth={1.8} />
      </span>
      <span className="gq-composer-ph">{placeholder}</span>
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

function CompanyLeadsView({
  phase,
  answerN,
  sending,
  beat,
}: {
  phase: LeadPhase;
  answerN: number;
  sending: boolean;
  beat: Beat;
}) {
  const open = phase === 'convo' || phase === 'form' || phase === 'sent';
  const formOn = phase === 'form' || phase === 'sent';
  const sent = phase === 'sent';
  const answer = formOn ? ANSWER.slice(0, sent ? ANSWER.length : answerN) : '';
  const status = sent ? 'Answered' : open ? 'Contacted' : 'Received';

  return (
    <div className={`gq-leads ${beatClass(beat)}`} aria-label="Metro Emergency Plumbing AIWEB OS leads">
      <header className="gq-leads-bar">
        <div className="gq-leads-brand">
          <AIWebLogo color="#000000" width={78} className="block shrink-0" />
          <span className="gq-leads-pipe" aria-hidden>
            |
          </span>
          <PublisherIcon size={18} className="shrink-0" />
          <span className="gq-leads-product">AIWEB OS</span>
        </div>
        <nav className="gq-leads-nav" aria-hidden>
          <span>AIWEB OS</span>
          <span className="is-on">Metrics</span>
        </nav>
        <div className="gq-leads-user">
          <span>admin@theaiwebcompany.com</span>
          <span className="gq-leads-out">Sign out</span>
        </div>
      </header>

      <div className="gq-leads-sub">
        <span className="gq-leads-tab">
          HITS
          <i className="gq-leads-badge">32</i>
        </span>
        <span className="gq-leads-tab is-on">Leads</span>
      </div>

      <div className="gq-leads-body">
        <div className="gq-leads-wide">
          <table className="gq-leads-table">
            <thead>
              <tr>
                <th>When</th>
                <th>Receipt</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date / time</th>
                <th>Source</th>
                <th>Status</th>
                <th>Page</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr className="is-in">
                <td>{WHEN}</td>
                <td className="gq-leads-mono">{RECEIPT}</td>
                <td className="gq-leads-strong">{NAME}</td>
                <td className="gq-leads-link">{EMAIL}</td>
                <td className="gq-leads-link">{PHONE}</td>
                <td>{EVENT}</td>
                <td>
                  <span className="gq-leads-src">
                    <CrawlerFamilyLogo meta={CHATGPT_BRAND} size={14} />
                    ChatGPT · mcp · request_quote
                  </span>
                </td>
                <td>
                  <span className="gq-leads-status">{status}</span>
                </td>
                <td>
                  <span className="gq-leads-page">{PAGE_SLUG}</span>
                  <span className="gq-leads-subline">{NOTES}.</span>
                  <span className={`gq-leads-preview${sent ? '' : ' gq-hold'}`}>
                    Reply: {ANSWER}
                  </span>
                  <span className={`gq-leads-preview${sent ? '' : ' gq-hold'}`}>
                    Price from: {PRICE}
                  </span>
                </td>
                <td>
                  <span className={`gq-leads-answer${open && !sent ? ' is-on' : ''}`}>
                    {sent ? 'Edit' : 'Answer'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="gq-leads-card is-in">
          <p className="gq-leads-card-kicker">New lead · ChatGPT</p>
          <p className="gq-leads-strong">{NAME}</p>
          <p className="gq-leads-subline">{EMAIL}</p>
          <p className="gq-leads-subline">
            {PHONE} · {EVENT}
          </p>
          <p className="gq-leads-mono">{RECEIPT}</p>
          <span className="gq-leads-status">{status}</span>
          <span className={`gq-leads-answer${open && !sent ? ' is-on' : ''}`}>
            {sent ? 'Edit' : 'Answer'}
          </span>
        </div>

        <div className="gq-leads-convo">
          <p className="gq-leads-convo-label">Conversation</p>
          <div className="gq-leads-msg">
            <span className="gq-leads-dot" />
            <div>
              <p className="gq-leads-convo-head">
                {NAME} · Quote request · ChatGPT · {WHEN}
              </p>
              <p className="gq-leads-convo-body">
                {NOTES}.
                <br />
                {EVENT.replace(' · ', ' - ')}
                <br />
                Phone {PHONE}
              </p>
            </div>
          </div>
          <div className={`gq-leads-msg is-you${sent ? '' : ' gq-hold'}`}>
            <span className="gq-leads-dot is-you" />
            <div>
              <p className="gq-leads-convo-head">You · Answer · AIWEB OS · {OWNER_WHEN}</p>
              <p className="gq-leads-convo-body">{ANSWER}</p>
            </div>
          </div>

          <div className="gq-lead-form">
            <div className="gq-leads-convo-foot">
              <span className={`gq-leads-reply${sending ? ' is-press' : ''}`}>Reply</span>
              <span>Answer on this same receipt.</span>
            </div>
            <p className="gq-lead-label">Inquiry document reply</p>
            <div className="gq-lead-textarea">
              {answer}
              {phase === 'form' && answerN > 0 && answerN < ANSWER.length ? (
                <span className="gq-caret" aria-hidden />
              ) : null}
            </div>
            <div className="gq-lead-grid">
              <label>
                Next step
                <span className="gq-lead-input">{NEXT_STEP}</span>
              </label>
              <label>
                Next action
                <span className="gq-lead-input">{NEXT_STEP}</span>
              </label>
              <label>
                Availability
                <span className="gq-lead-input">{AVAIL}</span>
              </label>
              <label>
                Package
                <span className="gq-lead-input">{PACKAGE}</span>
              </label>
              <label>
                Price from
                <span className="gq-lead-input">{PRICE}</span>
              </label>
            </div>
            <p className="gq-lead-label">Questions for the requester</p>
            <span className="gq-lead-add">+ Add question</span>
            <p className="gq-lead-label">Photos, video, or audio for the requester</p>
            <div className="gq-lead-media">
              <img src={PHOTO_MAIN} alt="" />
              <img src={PHOTO_ALT} alt="" />
              <span className="gq-file-btn">Choose Files</span>
            </div>
            <div className="gq-leads-convo-foot">
              <span className={`gq-leads-reply${sending ? ' is-press' : ''}`}>Send answer</span>
              <span>
                Same Answer can include questions and a next step. Requester replies stay on this
                receipt — they do not start a new quote.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatStatusView({
  phase,
  userN,
  emailN,
  walkN,
  noteN,
  sending,
  beat,
}: {
  phase: CheckPhase;
  userN: number;
  emailN: number;
  walkN: number;
  noteN: number;
  sending: boolean;
  beat: Beat;
}) {
  const showIntro = phase !== 'idle' && userN >= CHECK_USER.length;
  const fill = phase === 'fill' || phase === 'replied';
  const showFoot = phase === 'card' || phase === 'fill' || phase === 'replied';
  const email = EMAIL.slice(0, emailN);
  const walk = WALK.slice(0, walkN);
  const note = USER_NOTE.slice(0, noteN);

  return (
    <div className={`gq-replay gq-check ${beatClass(beat)}`} aria-label="ChatGPT receipt status">
      <div className="gq-thread">
        <div className="gq-user-row">
          <Reserve className="gq-user-bubble" sizer={CHECK_USER}>
            {CHECK_USER.slice(0, userN)}
            {phase === 'prompt' && userN < CHECK_USER.length ? (
              <span className="gq-caret" aria-hidden />
            ) : null}
          </Reserve>
        </div>
        <p className={`gq-p${showIntro ? '' : ' gq-hold'}`} style={{ marginBottom: 10 }}>
          {CHECK_INTRO}
        </p>
        <div className={`gq-worked${showIntro ? '' : ' gq-hold'}`}>
          Retrieving receipt details.
          <span aria-hidden> &gt;</span>
        </div>

        <div
          className={`gq-quote-reveal${showFoot ? ' is-on' : ''}`}
          aria-hidden={!showFoot}
        >
          <div className="gq-quote-card">
          <div className="gq-quote-head">
            <p className="gq-form-title">{CATERER}</p>
            <div className="gq-plugin-votes" aria-hidden>
              <ThumbsUp size={14} strokeWidth={1.7} />
              <ThumbsDown size={14} strokeWidth={1.7} />
            </div>
          </div>
          <div className="gq-gallery">
            <div className="gq-gallery-hero">
              <img src={PHOTO_MAIN} alt="" />
              <span className="gq-gallery-nav is-left" aria-hidden>
                <ChevronLeft size={16} />
              </span>
              <span className="gq-gallery-nav is-right" aria-hidden>
                <ChevronRight size={16} />
              </span>
            </div>
            <div className="gq-gallery-row">
              <img src={PHOTO_MAIN} alt="" />
              <img src={PHOTO_ALT} alt="" />
              <img src={PHOTO_MAIN} alt="" />
            </div>
          </div>

          <p className="gq-sec">Quote</p>
          <div className="gq-facts">
            <label>
              Availability
              <span className="gq-lead-input">{AVAIL}</span>
            </label>
            <label>
              Package
              <span className="gq-lead-input">{PACKAGE}</span>
            </label>
            <label>
              Price
              <span className="gq-lead-input">{PRICE_LABEL}</span>
            </label>
            <label>
              Next step
              <span className="gq-lead-input">{NEXT_STEP}</span>
            </label>
          </div>

          <p className="gq-sec">Conversation</p>
          <div className="gq-leads-msg">
            <User size={14} strokeWidth={1.8} className="gq-msg-ico" />
            <div>
              <p className="gq-leads-convo-head">
                {NAME} · Quote request · ChatGPT · {WHEN}
              </p>
              <p className="gq-leads-convo-body">
                {NOTES}.
                <br />
                {EVENT.replace(' · ', ' - ')}
                <br />
                Phone {PHONE}
              </p>
            </div>
          </div>
          <div className="gq-leads-msg is-you">
            <Building2 size={14} strokeWidth={1.8} className="gq-msg-ico is-you" />
            <div>
              <p className="gq-leads-convo-head">
                {CATERER} · Answer · AIWEB OS · {OWNER_WHEN}
              </p>
              <p className="gq-leads-convo-body">{ANSWER}</p>
            </div>
          </div>

          <p className="gq-sec">Reply</p>
          <label className="gq-check-field">
            Email on your quote request
            <span className={`gq-lead-input${fill && !email ? ' is-empty' : ''}`}>
              {email || 'Same email you used to request the quote'}
              {fill && emailN > 0 && emailN < EMAIL.length ? (
                <span className="gq-caret" aria-hidden />
              ) : null}
            </span>
          </label>
          <label className="gq-check-field">
            Proposed service time
            <span className={`gq-lead-input gq-input--icon${fill && !walk ? ' is-empty' : ''}`}>
              {walk || 'mm/dd/yyyy --:-- --'}
              {fill && walkN > 0 && walkN < WALK.length ? (
                <span className="gq-caret" aria-hidden />
              ) : null}
              <Calendar className="gq-field-icon" size={15} strokeWidth={1.7} />
            </span>
          </label>
          <label className="gq-check-field">
            Note (optional)
            <span className="gq-lead-textarea">
              {note || (!fill ? 'Anything else for the business' : null)}
              {fill && noteN > 0 && noteN < USER_NOTE.length ? (
                <span className="gq-caret" aria-hidden />
              ) : null}
            </span>
          </label>
          <span className={`gq-submit${sending ? ' is-press' : ''}`}>Send reply</span>
          <p className="gq-receipt-link">View the AIWEB receipt</p>
        </div>
        </div>

        <div className="gq-reply">
          <Reserve
            sizer={
              <div
                dangerouslySetInnerHTML={{
                  __html: renderReplyHtml(CHECK_FOOT, false),
                }}
              />
            }
          >
            <div
              dangerouslySetInnerHTML={{
                __html: renderReplyHtml(showFoot ? CHECK_FOOT : '', false),
              }}
            />
          </Reserve>
          <ThreadFooter />
        </div>
      </div>
      <p className="gq-disclaimer">
        ChatGPT can make mistakes. Workspace data isn’t used to train models.
      </p>
      <Composer placeholder="Follow up" />
    </div>
  );
}

function CloudMark() {
  return (
    <span className="gq-plugin-mark" aria-hidden>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.6 19a5.6 5.6 0 01-.5-11.15A7.1 7.1 0 0119.8 10.4 4.6 4.6 0 0119 19H6.6z" />
      </svg>
    </span>
  );
}

function FieldCaret({ on }: { on: boolean }) {
  return on ? <span className="gq-caret" aria-hidden /> : null;
}

function QuoteForm({ live }: { live: Live }) {
  const name = NAME.slice(0, live.nameN);
  const email = EMAIL.slice(0, live.emailN);
  const phone = PHONE.slice(0, live.phoneN);
  const time = TIME.slice(0, live.timeN);
  const notes = NOTES.slice(0, live.notesN);

  const rows: Array<{
    label: string;
    kind: 'name' | 'email' | 'phone' | 'date' | 'time' | 'notes' | 'photos';
  }> = [
    { label: 'Name', kind: 'name' },
    { label: 'Email', kind: 'email' },
    { label: 'Phone', kind: 'phone' },
    { label: 'Date', kind: 'date' },
    { label: 'Time', kind: 'time' },
    { label: 'Notes', kind: 'notes' },
    { label: 'Photos (optional)', kind: 'photos' },
  ];

  const valueFor = (kind: (typeof rows)[number]['kind']) => {
    if (kind === 'name') return name;
    if (kind === 'email') return email;
    if (kind === 'phone') return phone;
    if (kind === 'date') return live.date || 'mm/dd/yyyy';
    if (kind === 'time') return time || '--:-- --';
    return '';
  };

  return (
    <div className={`gq-form${live.success ? ' is-sent' : ''}`}>
      <div className="gq-form-stage">
        <div className="gq-form-fill">
          <p className="gq-form-title">Get a quote · {CATERER}</p>
          <img className="gq-thumb" src={PHOTO_MAIN} alt="" width={72} height={72} />
          <div className="gq-fields">
            {rows.map((row) => {
              const caret = live.caret === row.kind;
              return (
                <div key={row.label} className="gq-field">
                  <span className="gq-label">{row.label}</span>
                  {row.kind === 'notes' ? (
                    <div className={`gq-notes${caret ? ' is-focus' : ''}`}>
                      {notes || (!caret ? <span className="gq-ph">Event details</span> : null)}
                      <FieldCaret on={caret} />
                    </div>
                  ) : row.kind === 'photos' ? (
                    <>
                      <div className={`gq-file-row${live.photo ? ' is-chosen' : ''}`}>
                        <span className="gq-file-btn">Choose Files</span>
                        <span className="gq-file-name">
                          {live.photo ? PHOTO : 'No file chosen'}
                        </span>
                      </div>
                      <p className="gq-file-hint">
                        Damage, design, venue, insurance — up to 5 photos.
                      </p>
                    </>
                  ) : (
                    <div className="gq-control">
                      <div
                        className={`gq-input${
                          row.kind === 'date' || row.kind === 'time' ? ' gq-input--icon' : ''
                        }${
                          (row.kind === 'date' && !live.date) ||
                          (row.kind === 'time' && !time) ||
                          (row.kind !== 'date' && row.kind !== 'time' && !valueFor(row.kind))
                            ? ' is-empty'
                            : ''
                        }${caret ? ' is-focus' : ''}`}
                      >
                        {valueFor(row.kind)}
                        <FieldCaret on={caret} />
                      </div>
                      {row.kind === 'date' ? (
                        <Calendar className="gq-field-icon" size={15} strokeWidth={1.7} />
                      ) : null}
                      {row.kind === 'time' ? (
                        <Clock className="gq-field-icon" size={15} strokeWidth={1.7} />
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <span className={`gq-submit${live.pressed ? ' is-press' : ''}`}>Send quote request</span>
        </div>
        {live.success ? (
          <div className="gq-form-result">
            <p className="gq-form-title">Get a quote · {CATERER}</p>
            <img className="gq-thumb" src={PHOTO_MAIN} alt="" width={72} height={72} />
            <div className="gq-ok">
              Thanks — we got your request. Your AIWEB Receipt is{' '}
              <strong className="gq-ok-id">{RECEIPT}</strong>. Use the same email you submitted to
              check the full inquiry document. 1 photo attached.
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Thread({ live }: { live: Live }) {
  const user = USER.slice(0, live.userN);
  const reply = REPLY.slice(0, live.replyN);

  return (
    <div className="gq-thread">
      <div className="gq-user-row">
        <Reserve className="gq-user-bubble" sizer={USER}>
          {user}
          <FieldCaret on={live.caret === 'user'} />
        </Reserve>
      </div>
      <div className={`gq-worked${live.worked < 0 ? ' is-hidden' : ''}`}>
        Worked for {Math.max(0, live.worked)}s
        <span aria-hidden> &gt;</span>
      </div>
      <div
        className={`gq-plugin-block${live.plugin ? ' is-on' : ''}`}
        aria-hidden={!live.plugin}
      >
        <div className="gq-plugin-head">
          <div className="gq-plugin-brand">
            <CloudMark />
            <span className="gq-plugin-name">AIWEB</span>
          </div>
          <div className="gq-plugin-votes" aria-hidden>
            <ThumbsUp size={14} strokeWidth={1.7} />
            <ThumbsDown size={14} strokeWidth={1.7} />
          </div>
        </div>
        <QuoteForm live={live} />
        <div className="gq-reply">
          <Reserve
            sizer={
              <div
                dangerouslySetInnerHTML={{
                  __html: renderReplyHtml(REPLY, false),
                }}
              />
            }
          >
            <div
              dangerouslySetInnerHTML={{
                __html: renderReplyHtml(reply, live.caret === 'reply'),
              }}
            />
          </Reserve>
          <ThreadFooter />
        </div>
      </div>
    </div>
  );
}

function typeChars(
  length: number,
  cps: number,
  cancelled: () => boolean,
  rafs: number[],
  onN: (n: number) => void,
  done: () => void,
) {
  const start = performance.now();
  const tick = (now: number) => {
    if (cancelled()) return;
    const n = Math.min(length, Math.floor(((now - start) / 1000) * cps));
    onN(n);
    if (n < length) rafs.push(requestAnimationFrame(tick));
    else done();
  };
  rafs.push(requestAnimationFrame(tick));
}

/** Full 3-scene plumbing quote story. */
export function ChatGptPlumbingQuoteReplay() {
  const chatView = useReplayInView();
  const leadView = useReplayInView();
  const checkView = useReplayInView();
  const [live, setLive] = useState<Live>(BOOT);
  const [leadPhase, setLeadPhase] = useState<LeadPhase>('idle');
  const [answerN, setAnswerN] = useState(0);
  const [sending, setSending] = useState(false);
  const [checkPhase, setCheckPhase] = useState<CheckPhase>('idle');
  const [checkUserN, setCheckUserN] = useState(0);
  const [checkEmailN, setCheckEmailN] = useState(0);
  const [checkWalkN, setCheckWalkN] = useState(0);
  const [checkNoteN, setCheckNoteN] = useState(0);
  const [checkSending, setCheckSending] = useState(false);

  const resetChat = useCallback(() => setLive(BOOT), []);
  const resetLead = useCallback(() => {
    setLeadPhase('idle');
    setAnswerN(0);
    setSending(false);
  }, []);
  const resetCheck = useCallback(() => {
    setCheckPhase('idle');
    setCheckUserN(0);
    setCheckEmailN(0);
    setCheckWalkN(0);
    setCheckNoteN(0);
    setCheckSending(false);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (!chatView.inView) {
        resetChat();
        return;
      }
      setLive(FINAL);
      return;
    }

    if (!chatView.inView) {
      resetChat();
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const rafs: number[] = [];
    const later = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const isCancelled = () => cancelled;

    resetChat();
    later(280, () => {
      if (cancelled) return;
      setLive((s) => ({ ...s, caret: 'user' }));
      typeChars(
        USER.length,
        42,
        isCancelled,
        rafs,
        (n) => setLive((s) => ({ ...s, userN: n })),
        () => {
          setLive((s) => ({ ...s, caret: null }));
          later(220, () => {
            if (cancelled) return;
            setLive((s) => ({ ...s, worked: 0 }));
            let sec = 0;
            const bump = () => {
              if (cancelled) return;
              sec += 1;
              setLive((s) => ({ ...s, worked: sec }));
              if (sec < 21) later(36, bump);
              else later(280, revealPlugin);
            };
            later(36, bump);
          });
        },
      );
    });

    const revealPlugin = () => {
      if (cancelled) return;
      setLive((s) => ({ ...s, plugin: true }));
      later(380, fillDate);
    };

    const fillDate = () => {
      if (cancelled) return;
      setLive((s) => ({ ...s, date: DATE, caret: 'notes' }));
      later(140, () => {
        if (cancelled) return;
        typeChars(
          NOTES.length,
          36,
          isCancelled,
          rafs,
          (n) => setLive((s) => ({ ...s, notesN: n })),
          () => {
            setLive((s) => ({ ...s, caret: null }));
            later(380, typeReply);
          },
        );
      });
    };

    const typeReply = () => {
      if (cancelled) return;
      setLive((s) => ({ ...s, caret: 'reply' }));
      typeChars(
        REPLY.length,
        48,
        isCancelled,
        rafs,
        (n) => setLive((s) => ({ ...s, replyN: n })),
        () => {
          setLive((s) => ({ ...s, caret: null }));
          later(500, fillContacts);
        },
      );
    };

    const fillContacts = () => {
      if (cancelled) return;
      setLive((s) => ({ ...s, caret: 'name' }));
      typeChars(
        NAME.length,
        28,
        isCancelled,
        rafs,
        (n) => setLive((s) => ({ ...s, nameN: n })),
        () => {
          setLive((s) => ({ ...s, caret: 'email' }));
          later(120, () => {
            typeChars(
              EMAIL.length,
              32,
              isCancelled,
              rafs,
              (n) => setLive((s) => ({ ...s, emailN: n })),
              () => {
                setLive((s) => ({ ...s, caret: 'phone' }));
                later(100, () => {
                  typeChars(
                    PHONE.length,
                    24,
                    isCancelled,
                    rafs,
                    (n) => setLive((s) => ({ ...s, phoneN: n })),
                    () => {
                      setLive((s) => ({ ...s, caret: 'time' }));
                      later(100, () => {
                        typeChars(
                          TIME.length,
                          18,
                          isCancelled,
                          rafs,
                          (n) => setLive((s) => ({ ...s, timeN: n })),
                          () => {
                            setLive((s) => ({ ...s, caret: null }));
                            later(220, attachPhoto);
                          },
                        );
                      });
                    },
                  );
                });
              },
            );
          });
        },
      );
    };

    const attachPhoto = () => {
      if (cancelled) return;
      setLive((s) => ({ ...s, photo: true }));
      later(480, sendCard);
    };

    const sendCard = () => {
      if (cancelled) return;
      setLive((s) => ({ ...s, pressed: true }));
      later(220, () => {
        if (cancelled) return;
        setLive((s) => ({ ...s, pressed: false, success: true }));
      });
    };

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      rafs.forEach(cancelAnimationFrame);
    };
  }, [chatView.inView, resetChat]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (!leadView.inView) {
        resetLead();
        return;
      }
      setLeadPhase('sent');
      setAnswerN(ANSWER.length);
      return;
    }

    if (!leadView.inView) {
      resetLead();
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const rafs: number[] = [];
    const later = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const isCancelled = () => cancelled;

    resetLead();
    later(400, () => {
      if (cancelled) return;
      setLeadPhase('arrived');
      later(900, () => setLeadPhase('convo'));
      later(1800, () => {
        if (cancelled) return;
        setLeadPhase('form');
        typeChars(
          ANSWER.length,
          42,
          isCancelled,
          rafs,
          (n) => setAnswerN(n),
          () => {
            later(1400, () => {
              if (cancelled) return;
              setSending(true);
              later(280, () => {
                if (cancelled) return;
                setSending(false);
                setLeadPhase('sent');
              });
            });
          },
        );
      });
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      rafs.forEach(cancelAnimationFrame);
    };
  }, [leadView.inView, resetLead]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (!checkView.inView) {
        resetCheck();
        return;
      }
      setCheckPhase('replied');
      setCheckUserN(CHECK_USER.length);
      setCheckEmailN(EMAIL.length);
      setCheckWalkN(WALK.length);
      setCheckNoteN(USER_NOTE.length);
      return;
    }

    if (!checkView.inView) {
      resetCheck();
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const rafs: number[] = [];
    const later = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const isCancelled = () => cancelled;

    resetCheck();
    later(400, () => {
      if (cancelled) return;
      setCheckPhase('prompt');
      typeChars(
        CHECK_USER.length,
        38,
        isCancelled,
        rafs,
        (n) => setCheckUserN(n),
        () => {
          later(500, () => {
            if (cancelled) return;
            setCheckPhase('card');
            later(900, () => {
              if (cancelled) return;
              setCheckPhase('fill');
              typeChars(
                EMAIL.length,
                28,
                isCancelled,
                rafs,
                (n) => setCheckEmailN(n),
                () => {
                  later(160, () => {
                    typeChars(
                      WALK.length,
                      22,
                      isCancelled,
                      rafs,
                      (n) => setCheckWalkN(n),
                      () => {
                        later(140, () => {
                          typeChars(
                            USER_NOTE.length,
                            28,
                            isCancelled,
                            rafs,
                            (n) => setCheckNoteN(n),
                            () => {
                              later(500, () => {
                                if (cancelled) return;
                                setCheckSending(true);
                                later(240, () => {
                                  if (cancelled) return;
                                  setCheckSending(false);
                                  setCheckPhase('replied');
                                });
                              });
                            },
                          );
                        });
                      },
                    );
                  });
                },
              );
            });
          });
        },
      );
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      rafs.forEach(cancelAnimationFrame);
    };
  }, [checkView.inView, resetCheck]);

  const chatBeat: Beat = !chatView.inView
    ? 'wait'
    : live.success
      ? 'done'
      : live.userN > 0 || live.plugin
        ? 'play'
        : 'wait';
  const leadBeat: Beat = !leadView.inView
    ? 'wait'
    : leadPhase === 'idle'
      ? 'wait'
      : leadPhase === 'sent'
        ? 'done'
        : 'play';
  const checkBeat: Beat = !checkView.inView
    ? 'wait'
    : checkPhase === 'idle'
      ? 'wait'
      : checkPhase === 'replied'
        ? 'done'
        : 'play';

  return (
    <div className="gq-story" data-demo="plumbing-quote-replay" aria-label="ChatGPT Get Quote plumbing replay with AIWEB OS leads">
      <div ref={chatView.ref} className="gq-scene gq-scene--chat">
        <SceneTitle who="Chat GPT Homeowner" action="makes a call" />
        <ChatGptReplayViewport maxHeightVh={76}>
          <div className={`gq-replay ${beatClass(chatBeat)}`}>
            <Thread live={live} />
            <p className="gq-disclaimer">
              ChatGPT can make mistakes. Workspace data isn’t used to train models.
            </p>
            <Composer placeholder="Work on anything" />
          </div>
        </ChatGptReplayViewport>
      </div>
      <div ref={leadView.ref} className="gq-scene gq-scene--leads">
        <SceneTitle who="Business owner" action="Call Back" />
        <ChatGptReplayViewport wide designWidth={1080} maxHeightVh={68}>
          <CompanyLeadsView phase={leadPhase} answerN={answerN} sending={sending} beat={leadBeat} />
        </ChatGptReplayViewport>
      </div>
      <div ref={checkView.ref} className="gq-scene gq-scene--check">
        <SceneTitle who="Chat GPT Homeowner" action="receives call back" />
        <ChatGptReplayViewport maxHeightVh={76}>
          <ChatStatusView
            phase={checkPhase}
            userN={checkUserN}
            emailN={checkEmailN}
            walkN={checkWalkN}
            noteN={checkNoteN}
            sending={checkSending}
            beat={checkBeat}
          />
        </ChatGptReplayViewport>
      </div>
    </div>
  );
}
