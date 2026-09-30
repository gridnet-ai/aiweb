import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import AIWebLogo from '@/components/welcome/AIWebLogo';
import { PublisherIcon } from '@/components/welcome/PublisherIcon';
import { WelcomeCloudCarousel } from '@/components/welcome/WelcomeCloudCarousel';
import { DEFAULT_PAGE_TITLE } from '@/lib/siteSeo';
import './pitchdeck.css';

type Slide = {
  id: string;
  section: string;
  render: () => ReactNode;
};

function LocalServiceMark() {
  return (
    <svg className="pd-block-shop" viewBox="0 0 64 64" aria-hidden>
      <path
        fill="currentColor"
        d="M8 26 32 10l24 16v4H8v-4zm2 8h44v26H10V34zm12 6h8v8h-8v-8zm14 0h8v20h-8V40z"
      />
    </svg>
  );
}

function WrenchMark() {
  return (
    <svg className="pd-block-shop" viewBox="0 0 64 64" aria-hidden>
      <path
        fill="currentColor"
        d="M42.5 8.5a12 12 0 0 0-14.2 11.3L14 34.1 8 40.1l15.8 15.8 6-6 14.3-14.3A12 12 0 1 0 42.5 8.5zm1.8 16.4a4.6 4.6 0 1 1 0-9.2 4.6 4.6 0 0 1 0 9.2z"
      />
    </svg>
  );
}

function BoltMark() {
  return (
    <svg className="pd-block-shop" viewBox="0 0 64 64" aria-hidden>
      <path fill="currentColor" d="M36 6 16 34h14l-4 24 24-32H36l4-20z" />
    </svg>
  );
}

function ShieldMark() {
  return (
    <svg className="pd-block-shop" viewBox="0 0 64 64" aria-hidden>
      <path fill="currentColor" d="M32 8 52 16v18c0 14-12 22-20 26-8-4-20-12-20-26V16z" />
    </svg>
  );
}

function ScalesMark() {
  return (
    <svg className="pd-block-shop" viewBox="0 0 64 64" aria-hidden>
      <path
        fill="currentColor"
        d="M30 8h4v8h22v4H36v26h12v4H16v-4h12V20H8v-4h22zm-14 16 8 14H8zm32 0 8 14H40z"
      />
    </svg>
  );
}

function CrossMark() {
  return (
    <svg className="pd-block-shop" viewBox="0 0 64 64" aria-hidden>
      <path fill="currentColor" d="M26 8h12v18h18v12H38v18H26V38H8V26h18z" />
    </svg>
  );
}

function HouseMark() {
  return (
    <svg className="pd-block-shop" viewBox="0 0 64 64" aria-hidden>
      <path fill="currentColor" d="M8 30 32 8l24 22v26H40V36H24v20H8z" />
    </svg>
  );
}

function MonitorMark() {
  return (
    <svg className="pd-block-shop" viewBox="0 0 64 64" aria-hidden>
      <path fill="currentColor" d="M6 12h52v34H6zm18 38h16v4H24zm-8 4h32v4H16z" />
    </svg>
  );
}

function BankMark() {
  return (
    <svg className="pd-block-shop" viewBox="0 0 64 64" aria-hidden>
      <path fill="currentColor" d="M8 22 32 8l24 14v6H8zm4 8h8v18h-8zm16 0h8v18h-8zm16 0h8v18h-8zM8 50h48v6H8z" />
    </svg>
  );
}

function ChatGptMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.739-7.073zm-9.022 12.608a4.475 4.475 0 0 1-2.875-1.047l.141-.08 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.495 4.5zm-9.66-3.984a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.368v2.332a.08.08 0 0 1-.033.062L7.201 19.354a4.491 4.491 0 0 1-3.6-.71zm-1.247-10.53a4.482 4.482 0 0 1 2.37-1.977V11.6a.766.766 0 0 0 .388.676l5.814 3.354-2.02 1.168a.075.075 0 0 1-.071 0l-4.83-2.786a4.504 4.504 0 0 1-1.65-6.08zm16.368 3.33-5.833-3.387L16.64 7.67a.075.075 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.002-3.047-.141-.085-4.775-2.782a.776.776 0 0 0-.785 0L9.409 9.229V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 2.884L8.34 8.39a.08.08 0 0 1-.038-.056V2.749a4.51 4.51 0 0 1 7.76 1.559l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365 2.02-1.163a.08.08 0 0 1 .071 0l4.83 2.787a.775.775 0 0 1 0 1.352l-4.784 2.76a.07.07 0 0 1-.071 0l-2.022-1.168a.08.08 0 0 1-.038-.056z"
      />
    </svg>
  );
}

const BLOCKED_SERVICES = [
  { label: 'Plumbing', Icon: WrenchMark },
  { label: 'Insurance', Icon: ShieldMark },
  { label: 'Legal', Icon: ScalesMark },
  { label: 'Catering', Icon: LocalServiceMark },
  { label: 'Medical', Icon: CrossMark },
  { label: 'Real estate', Icon: HouseMark },
  { label: 'Electrical', Icon: BoltMark },
  { label: 'IT', Icon: MonitorMark },
  { label: 'Finance', Icon: BankMark },
] as const;

const BLOCKED_ROWS = [0, 1, 2].map((row) => BLOCKED_SERVICES.slice(row * 3, row * 3 + 3));

function SendPageMark() {
  return (
    <svg className="pd-voa-mail-icon" viewBox="0 0 64 64" aria-hidden>
      <path
        fill="currentColor"
        d="M12 14h28v36H12zm6 8h16v4H18zm0 10h16v4H18zm0 10h12v4H18zM44 10l16 6-10 8 10 6-16 6V10z"
      />
    </svg>
  );
}

function ReceivePageMark() {
  return (
    <svg className="pd-voa-mail-icon" viewBox="0 0 64 64" aria-hidden>
      <path
        fill="currentColor"
        d="M24 14h28v36H24zm6 8h16v4H30zm0 10h16v4H30zm0 10h12v4H30zM4 18l16 14L4 46V18z"
      />
    </svg>
  );
}

function MailboxMark() {
  return (
    <svg className="pd-voa-mailbox-icon" viewBox="0 0 64 64" aria-hidden>
      <path
        fill="currentColor"
        d="M10 22h36v22H10zm40 4h8v6H50zM28 44h8v14h-8zM16 28h12v4H16z"
      />
    </svg>
  );
}

function ServiceCluster({ connected = false }: { connected?: boolean }) {
  const iconRows = BLOCKED_ROWS.map((row) => (
    <div className="pd-block-biz-row" key={row.map((s) => s.label).join('-')}>
      <div className="pd-block-biz-cluster">
        {row.map(({ label, Icon }) => (
          <div className="pd-block-biz" key={label}>
            <Icon />
            <span>{label}</span>
          </div>
        ))}
      </div>
      {connected ? null : (
        <div className="pd-block-line pd-block-line--out" aria-hidden>
          <span className="pd-block-dashes" />
          <span className="pd-block-stop" />
        </div>
      )}
    </div>
  ));

  if (!connected) {
    return <div className="pd-block-bizes">{iconRows}</div>;
  }

  return (
    <div className="pd-block-bizes pd-block-bizes--framed">
      <div className="pd-block-aiweb">
        <p className="pd-block-aiweb-kicker">AIWEB</p>
        {iconRows}
      </div>
      <div className="pd-block-aiweb-out" aria-hidden>
        {BLOCKED_ROWS.map((row) => (
          <div
            className="pd-block-line pd-block-line--out pd-block-line--open"
            key={`out-${row.map((s) => s.label).join('-')}`}
          >
            <span className="pd-block-dashes" />
          </div>
        ))}
      </div>
    </div>
  );
}

function GptSide({
  connected = false,
  user,
  bot,
}: {
  connected?: boolean;
  user: string;
  bot: string;
}) {
  return (
    <div className="pd-block-gpt-side">
      <div
        className={`pd-block-line pd-block-line--in${connected ? ' pd-block-line--open' : ''}`}
        aria-hidden
      >
        {connected ? null : <span className="pd-block-stop" />}
        <span className="pd-block-dashes" />
      </div>
      <div className="pd-block-gpt">
        <div className="pd-block-gpt-mark">
          <ChatGptMark className="pd-block-gpt-logo" />
          <span>ChatGPT</span>
        </div>
        <div className="pd-block-chat">
          <div className="pd-block-chat-head">
            <ChatGptMark className="pd-block-chat-logo" />
            <span>ChatGPT</span>
          </div>
          <div className="pd-block-chat-body">
            <p className="pd-block-chat-user">{user}</p>
            <p className="pd-block-chat-bot">{bot}</p>
          </div>
          <div className="pd-block-chat-composer">Ask anything</div>
        </div>
      </div>
    </div>
  );
}

function VoAMailbox() {
  return (
    <div className="pd-voa-hub">
      <div className="pd-voa-mail pd-voa-mail--send">
        <SendPageMark />
        <span>Send</span>
      </div>
      <div className="pd-voa-box">
        <MailboxMark />
        <p className="pd-voa-box-name">VoA</p>
        <p className="pd-voa-box-sub">Voice over AIWEB</p>
      </div>
      <div className="pd-voa-mail pd-voa-mail--receive">
        <ReceivePageMark />
        <span>Receive</span>
      </div>
    </div>
  );
}

function DeadZoneSign() {
  return (
    <svg className="pd-block-gap-sign" viewBox="0 0 128 128" aria-hidden>
      <defs>
        <clipPath id="pd-dz-inner">
          <circle cx="64" cy="64" r="51" />
        </clipPath>
      </defs>
      <circle cx="64" cy="64" r="58" fill="#fff" stroke="currentColor" strokeWidth="12" />
      <g clipPath="url(#pd-dz-inner)">
        <g fill="#0b0b0c" transform="translate(22 42) scale(1.48)">
          <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102A1.125 1.125 0 0 0 5.872 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z" />
        </g>
        <g
          fill="none"
          stroke="#0b0b0c"
          strokeWidth="2.6"
          strokeLinecap="round"
          transform="translate(48 26)"
        >
          <path d="M0 14c3.6-4.2 8.6-6.8 14.2-7.6" />
          <path d="M1.4 20.6c5-5.6 11.6-9 19-10" />
          <path d="M3 27.4c6.2-7 14.6-11.2 23.6-12.4" />
        </g>
        <g transform="translate(60 38)">
          <path
            d="M8 2h26a7 7 0 0 1 7 7v13a7 7 0 0 1-7 7H24l-9 9v-9H8a7 7 0 0 1-7-7V9a7 7 0 0 1 7-7z"
            fill="#fff"
            stroke="#0b0b0c"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path
            d="M11 10h20M11 16h15"
            fill="none"
            stroke="#0b0b0c"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path d="M26 24h16a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5h-7l-6 6v-6h-3a5 5 0 0 1-5-5v-8a5 5 0 0 1 5-5z" />
          <path
            d="M31 30h11M31 36h7"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>
        <path d="M24 24l80 80" stroke="currentColor" strokeWidth="12" fill="none" />
      </g>
    </svg>
  );
}

function ProblemDiagram() {
  return (
    <div
      className="pd-block-diagram"
      aria-label="Local service businesses blocked from reaching ChatGPT"
    >
      <ServiceCluster />
      <div className="pd-block-gap" aria-label="Dead zone">
        <DeadZoneSign />
      </div>
      <GptSide
        user="Need a plumber today."
        bot="I can't reach local businesses from here."
      />
    </div>
  );
}

function SolutionDiagram() {
  return (
    <div
      className="pd-block-diagram"
      aria-label="VoA connects local service businesses to ChatGPT"
    >
      <ServiceCluster connected />
      <VoAMailbox />
      <GptSide
        connected
        user="Need a plumber today."
        bot="Call sent. Your AIWEB Receipt is ready."
      />
    </div>
  );
}

function CoverCityscape() {
  return (
    <svg
      className="pd-cover-city"
      viewBox="0 0 440 168"
      aria-hidden
      preserveAspectRatio="xMinYMax meet"
    >
      <g fill="#0b0b0c">
        <rect x="8" y="78" width="42" height="90" />
        <rect x="52" y="48" width="36" height="120" />
        <rect x="90" y="64" width="54" height="104" />
        <rect x="146" y="28" width="40" height="140" />
        <rect x="188" y="56" width="62" height="112" />
        <rect x="252" y="40" width="34" height="128" />
        <rect x="288" y="72" width="48" height="96" />
        <rect x="338" y="50" width="38" height="118" />
        <rect x="378" y="86" width="50" height="82" />
        <rect x="154" y="12" width="8" height="16" />
        <rect x="156" y="4" width="4" height="10" />
        <polygon points="252,40 269,22 286,40" />
      </g>
      <g fill="#ffffff" opacity="0.85">
        <rect x="16" y="90" width="6" height="8" />
        <rect x="28" y="90" width="6" height="8" />
        <rect x="16" y="106" width="6" height="8" />
        <rect x="28" y="106" width="6" height="8" />
        <rect x="16" y="122" width="6" height="8" />
        <rect x="28" y="122" width="6" height="8" />
        <rect x="60" y="60" width="6" height="8" />
        <rect x="72" y="60" width="6" height="8" />
        <rect x="60" y="76" width="6" height="8" />
        <rect x="72" y="76" width="6" height="8" />
        <rect x="60" y="92" width="6" height="8" />
        <rect x="72" y="92" width="6" height="8" />
        <rect x="100" y="76" width="7" height="9" />
        <rect x="114" y="76" width="7" height="9" />
        <rect x="128" y="76" width="7" height="9" />
        <rect x="100" y="94" width="7" height="9" />
        <rect x="114" y="94" width="7" height="9" />
        <rect x="128" y="94" width="7" height="9" />
        <rect x="154" y="40" width="6" height="8" />
        <rect x="166" y="40" width="6" height="8" />
        <rect x="154" y="56" width="6" height="8" />
        <rect x="166" y="56" width="6" height="8" />
        <rect x="154" y="72" width="6" height="8" />
        <rect x="166" y="72" width="6" height="8" />
        <rect x="198" y="68" width="8" height="10" />
        <rect x="214" y="68" width="8" height="10" />
        <rect x="230" y="68" width="8" height="10" />
        <rect x="198" y="86" width="8" height="10" />
        <rect x="214" y="86" width="8" height="10" />
        <rect x="230" y="86" width="8" height="10" />
        <rect x="260" y="52" width="6" height="8" />
        <rect x="272" y="52" width="6" height="8" />
        <rect x="260" y="68" width="6" height="8" />
        <rect x="272" y="68" width="6" height="8" />
        <rect x="298" y="84" width="7" height="9" />
        <rect x="312" y="84" width="7" height="9" />
        <rect x="298" y="102" width="7" height="9" />
        <rect x="312" y="102" width="7" height="9" />
        <rect x="346" y="62" width="6" height="8" />
        <rect x="358" y="62" width="6" height="8" />
        <rect x="346" y="78" width="6" height="8" />
        <rect x="358" y="78" width="6" height="8" />
        <rect x="388" y="98" width="7" height="9" />
        <rect x="404" y="98" width="7" height="9" />
        <rect x="388" y="114" width="7" height="9" />
        <rect x="404" y="114" width="7" height="9" />
      </g>
    </svg>
  );
}

const SLIDES: Slide[] = [
  {
    id: 'cover',
    section: 'Cover',
    render: () => (
      <div className="pd-cover">
        <div className="pd-cover-brand">
          <div className="pd-cover-logo-wrap" aria-hidden>
            <AIWebLogo
              color="#000000"
              width="min(280px, 72vw)"
              className="pd-cover-logo"
            />
          </div>
          <h1 className="pd-cover-line">The business line for ChatGPT Users.</h1>
        </div>
      </div>
    ),
  },
  {
    id: 'problem',
    section: 'Problem',
    render: () => (
      <div className="pd-stack pd-stack--chatgpt pd-stack--problem pd-stack--diagram">
        <div className="pd-problem-copy">
          <h2 className="pd-h">Problem</h2>
          <p className="pd-statement">
            Local Service Businesses don&apos;t have a direct communication line to active ChatGPT
            users.
          </p>
        </div>
        <ProblemDiagram />
      </div>
    ),
  },
  {
    id: 'solution',
    section: 'Solution',
    render: () => (
      <div className="pd-stack pd-stack--chatgpt pd-stack--problem pd-stack--diagram">
        <div className="pd-problem-copy">
          <h2 className="pd-h">Solution</h2>
          <div className="pd-voa-line">
            <p className="pd-voa">Voice over AIWEB (VoA)</p>
            <p className="pd-statement">
              gives ChatGPT users a communication line from inside the chat to businesses outside
              the chat.
            </p>
          </div>
          <aside className="pd-route-note">
            <p className="pd-route-note-lead">
              Exchange routes primarily by address. AIWEB can{' '}
              <mark className="pd-hl">route-by-intent</mark>.
            </p>
            <div className="pd-route-note-compare">
              <div className="pd-route-card">
                <p className="pd-route-card-kicker">Email</p>
                <p className="pd-route-card-example">
                  “Email <code>sales@company.com</code>”
                </p>
                <p className="pd-route-card-cap">Know the destination</p>
              </div>
              <div className="pd-route-card pd-route-card--aiweb">
                <p className="pd-route-card-kicker">AIWEB</p>
                <p className="pd-route-card-example">
                  “I need commercial insurance for a roofing company in Texas.”
                </p>
                <p className="pd-route-card-cap">Describe the need</p>
              </div>
            </div>
          </aside>
        </div>
        <SolutionDiagram />
      </div>
    ),
  },
  {
    id: 'product',
    section: 'Product',
    render: () => (
      <div className="pd-stack pd-stack--product">
        <div className="pd-product-brand">
          <PublisherIcon size={52} className="pd-product-logo" />
          <h2 className="pd-h pd-h--product">AIWEB OS</h2>
        </div>
        <p className="pd-lede pd-lede--center">
          gives local service businesses a line they can receive calls and call back from outside
          ChatGPT.
        </p>
        <ul className="pd-pillars" aria-label="What AIWEB OS enables">
          <li>
            <span className="pd-pillar-icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
            </span>
            <p className="pd-pillar-title">Discover</p>
            <p className="pd-pillar-body">AI finds the business.</p>
          </li>
          <li>
            <span className="pd-pillar-icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 013.08 4.18 2 2 0 015.06 2h3a2 2 0 012 1.72c.12.9.32 1.77.59 2.61a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.47-1.11a2 2 0 012.11-.45c.84.27 1.71.47 2.61.59A2 2 0 0122 16.92z"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <p className="pd-pillar-title">Call</p>
            <p className="pd-pillar-body">AI requests a quote or action.</p>
          </li>
          <li>
            <span className="pd-pillar-icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M4 7h16v12H4z" strokeLinejoin="round" />
                <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" />
                <path d="M8 13h3M8 16h8" strokeLinecap="round" />
              </svg>
            </span>
            <p className="pd-pillar-title">Callback</p>
            <p className="pd-pillar-body">The business answers on the line.</p>
          </li>
        </ul>
        <div className="pd-product-dash">
          <img
            className="pd-product-shot"
            src="/demo/create-to-publish-human.png"
            alt="AIWEB OS workspace"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'how-it-works',
    section: 'How It Works',
    render: () => (
      <div className="pd-stack pd-stack--voa">
        <p className="pd-voa-kicker">Voice over AIWEB (VoA)</p>
        <h2 className="pd-h">AI gets a voice outside the chat.</h2>
        <p className="pd-lede">
          An AI user can call a machine-functional business to ask a question, request a quote,
          check availability, or start another action—and the business can call back on the same
          line.
        </p>
        <p className="pd-quote">
          VoIP connected voice over the internet. VoA connects AI to the business world.
        </p>
        <p className="pd-quote pd-quote--punch">
          When AI doesn&apos;t know, it can call the business that does.
        </p>
        <p className="pd-flow pd-flow--tight" aria-label="Voice over AIWEB path">
          <span>ChatGPT</span>
          <span aria-hidden>→</span>
          <span>MCP</span>
          <span aria-hidden>→</span>
          <span>AIWEB</span>
          <span aria-hidden>→</span>
          <span>Business</span>
          <span aria-hidden>→</span>
          <span>AIWEB</span>
          <span aria-hidden>→</span>
          <span>ChatGPT</span>
        </p>
        <div className="pd-voa-demo" aria-label="Voice over AIWEB example">
          <p>
            <strong>User:</strong> “I need 8 H200 GPUs delivered within 30 days.”
          </p>
          <p>ChatGPT finds suppliers through AIWEB. A call is created. The business answers with
            inventory, price, lead time and media. The callback returns to the same conversation —
            with a receipt.
          </p>
        </div>
        <p className="pd-muted">
          MCP is the protocol. Voice over AIWEB is the product category.
        </p>
      </div>
    ),
  },
  {
    id: 'why-now',
    section: 'Why Now',
    render: () => (
      <div className="pd-stack">
        <h2 className="pd-h">Growth in high-capability users</h2>
        <p className="pd-lede">
          Purchase intent expressed through an AI agent capable of researching, evaluating,
          comparing, and acting on the buyer&apos;s behalf.
        </p>
        <div className="pd-stat">
          <p className="pd-stat-label">ChatGPT weekly users</p>
          <p className="pd-stat-value">800M+</p>
          <p className="pd-stat-note">by Dec. 2025</p>
        </div>
        <p className="pd-quote">
          OpenAI explicitly characterizes the transition as enterprises moving “from asking to
          doing.”
        </p>
      </div>
    ),
  },
  {
    id: 'market',
    section: 'Market',
    render: () => (
      <div className="pd-stack">
        <h2 className="pd-h">AI creates a new customer-acquisition channel.</h2>
        <p className="pd-chain" aria-label="Distribution chain">
          AIWEB → Marketing Firm → Business → AI Buyer
        </p>
        <p className="pd-lede">
          Marketing firms already manage the digital presence and acquisition strategy of thousands
          of home-service businesses. Instead of acquiring every contractor individually, AIWEB can
          acquire the agency.
        </p>
        <p className="pd-body">
          One marketing firm may bring <strong>10, 50, 100, or 500+</strong> businesses onto AIWEB.
          Their new pitch becomes:
        </p>
        <p className="pd-quote">
          We don’t just manage your SEO, Google Ads and social media. We make your business
          discoverable and actionable by AI.
        </p>
        <p className="pd-tag">That turns agencies into AIWEB’s distribution layer.</p>
      </div>
    ),
  },
  {
    id: 'competition',
    section: 'Competition',
    render: () => (
      <div className="pd-stack">
        <h2 className="pd-h">Competitors own pieces of the workflow. AIWEB connects the loop.</h2>
        <ul className="pd-comp">
          <li>
            <strong>Webflow</strong> — Publishes websites.
          </li>
          <li>
            <strong>Semrush / Ahrefs</strong> — Improve and measure visibility.
          </li>
          <li>
            <strong>HubSpot / Zoho</strong> — Manage leads after capture.
          </li>
          <li>
            <strong>Apollo / ZoomInfo / Clay</strong> — Help sellers find buyers.
          </li>
          <li>
            <strong>Exa / Firecrawl</strong> — Help agents search and retrieve the web.
          </li>
          <li>
            <strong>Shopify</strong> — Makes product commerce machine-accessible.
          </li>
        </ul>
        <p className="pd-body">
          The closest substitute today is still a stack: Webflow + Semrush + HubSpot. AIWEB
          compresses the workflow into:
        </p>
        <p className="pd-flow pd-flow--tight">
          <span>Publish</span>
          <span aria-hidden>→</span>
          <span>Discover</span>
          <span aria-hidden>→</span>
          <span>Call</span>
          <span aria-hidden>→</span>
          <span>Respond</span>
          <span aria-hidden>→</span>
          <span>Callback</span>
          <span aria-hidden>→</span>
          <span>Receipt</span>
        </p>
        <p className="pd-body">
          Long-term threat: catalogs like Yelp, Thumbtack, Angi, Google Business Profile,
          ServiceTitan, Amazon Business. Our defense is the complete seller-owned AI business
          interface — live business intelligence + AI verification + actions + receipts +
          attribution.
        </p>
      </div>
    ),
  },
  {
    id: 'revenue',
    section: 'Revenue',
    render: () => (
      <div className="pd-stack">
        <h2 className="pd-h">Subscription revenue with usage economics underneath.</h2>
        <div className="pd-plans">
          <article>
            <h3>Plus</h3>
            <p className="pd-price">
              $19.99<span>/mo</span>
            </p>
            <p>500 aiWh</p>
          </article>
          <article>
            <h3>Business</h3>
            <p className="pd-price">
              $49<span>/mo</span>
            </p>
            <p>1,000 aiWh</p>
          </article>
          <article>
            <h3>Agency</h3>
            <p className="pd-price">
              $499<span>/mo</span>
            </p>
            <p>5,000 pooled aiWh</p>
          </article>
          <article>
            <h3>Agency Pro</h3>
            <p className="pd-price">
              $1,499<span>/mo</span>
            </p>
            <p>20,000 pooled aiWh</p>
          </article>
          <article>
            <h3>Enterprise</h3>
            <p className="pd-price pd-price--custom">Custom</p>
            <p>Negotiated capacity</p>
          </article>
        </div>
        <p className="pd-body">
          Pages and Projects are not the economic constraint. <strong>aiWh is.</strong> It powers
          AIWEB OS Agent, Big Search, Chat, AI Check, research, generation, and model inference.
        </p>
        <p className="pd-tag">
          Smart Router routes every workload to the cheapest sustainable path. The customer buys
          business value. aiWh protects AIWEB’s margins.
        </p>
      </div>
    ),
  },
  {
    id: 'economics',
    section: 'Economics',
    render: () => (
      <div className="pd-stack">
        <h2 className="pd-h">Value-priced SaaS with an expanding-margin infrastructure layer.</h2>
        <div className="pd-node">
          <p className="pd-era-label">Current Node 0</p>
          <p>
            GCP g2-standard-24 · 24 vCPU · 96 GB RAM · 2× NVIDIA L4 · 200 GB SSD · 1,000,000 aiWh
            allocation
          </p>
          <p>
            Observed Compute Engine ≈ <strong>$1,475/mo</strong> · Additional GCP ≈{' '}
            <strong>$263/mo</strong> · Baseline ≈ <strong>$1,738/mo</strong>
          </p>
          <p className="pd-muted">Cloud credits treated as real COGS.</p>
        </div>
        <div className="pd-cogs">
          <p>80% gross-margin target</p>
          <ul>
            <li>$49 → ≤ $9.80 COGS</li>
            <li>$499 → ≤ $99.80 COGS</li>
            <li>$1,499 → ≤ $299.80 COGS</li>
          </ul>
        </div>
        <ol className="pd-roadmap">
          <li>
            <strong>Now</strong> — AIWEB OS + AI Web Pages + AI Check + Actions + Receipts
          </li>
          <li>
            <strong>Next</strong> — Projects + agency client management + machine-interaction
            analytics
          </li>
          <li>
            <strong>Then</strong> — AI-originated lead attribution + commercial opportunity
            reporting
          </li>
          <li>
            <strong>Later</strong> — Transaction and procurement infrastructure across the agentic
            web
          </li>
        </ol>
      </div>
    ),
  },
  {
    id: 'team',
    section: 'Team',
    render: () => (
      <div className="pd-stack pd-stack--wide">
        <h2 className="pd-h pd-h--team">The team building the AI Web.</h2>
        <p className="pd-lede">
          Infrastructure, legal and research credibility, and grid-connected security — the
          disciplines this venture needs now.
        </p>
        <ul className="pd-team">
          <li>
            <span className="pd-team-mark" aria-hidden>
              TF
            </span>
            <div>
              <p className="pd-team-name">Terry French</p>
              <p className="pd-team-role">Founder &amp; CEO</p>
              <p className="pd-team-bio">
                U.S. Army Signal Corps veteran. Built military networks from bare earth; Federal IT
                SMB constructing infrastructure in VA hospitals. Founder Institute Fall 2025;
                second-time founder.
              </p>
            </div>
          </li>
          <li>
            <span className="pd-team-mark" aria-hidden>
              CK
            </span>
            <div>
              <p className="pd-team-name">Chelsea Fama Kenney</p>
              <p className="pd-team-role">COO</p>
              <p className="pd-team-bio">
                Leads product, onboarding, and internal systems. Background in fundraising, sales
                coordination, and cross-functional program management. B.A., University of Hawaiʻi
                at Mānoa.
              </p>
            </div>
          </li>
          <li>
            <span className="pd-team-mark" aria-hidden>
              MJ
            </span>
            <div>
              <p className="pd-team-name">Dr. Marlon K. John</p>
              <p className="pd-team-role">General Counsel / Chief Research Officer</p>
              <p className="pd-team-bio">
                West Point, Columbia, Cornell, Buffalo Law, Harvard Business School. U.S. Army LTC
                (Ret.), Medical Corps. NSF Principal Investigator for AI readiness.
              </p>
            </div>
          </li>
          <li>
            <span className="pd-team-mark" aria-hidden>
              MB
            </span>
            <div>
              <p className="pd-team-name">Michael Barbine</p>
              <p className="pd-team-role">CISO — Cyber Ops</p>
              <p className="pd-team-bio">
                Principal Architect at CDW/Red Hat; former Rapid7 DevSecOps Manager; co-founder of
                FoxIO. Leads grid-cyber security for utility-facing compute nodes.
              </p>
            </div>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'ask',
    section: 'The Ask',
    render: () => (
      <div className="pd-cover pd-cover--ask">
        <p className="pd-ask-kicker">Build the business layer of the agentic web.</p>
        <h2 className="pd-h pd-h--ask">
          AIWEB’s wedge is AIWEB OS.
          <br />
          The larger opportunity is the network.
        </h2>
        <p className="pd-body">
          Marketing firms publish businesses. AI agents discover them. Customers call. Businesses
          call back. Receipts make the exchange attributable.
        </p>
        <p className="pd-flow pd-flow--flywheel">
          <span>More agencies</span>
          <span aria-hidden>→</span>
          <span>more businesses</span>
          <span aria-hidden>→</span>
          <span>more AI-readable supply</span>
          <span aria-hidden>→</span>
          <span>more successful AI actions</span>
          <span aria-hidden>→</span>
          <span>more measurable revenue</span>
          <span aria-hidden>→</span>
          <span>more agencies</span>
        </p>
        <p className="pd-tag">
          Our goal is not another website builder. We are building the business line for AI.
        </p>
        <div className="pd-ask-brand">
          <AIWebLogo width="min(52vw, 280px)" />
          <p className="pd-cover-line">The business line for ChatGPT Users.</p>
        </div>
      </div>
    ),
  },
];

/**
 * Investor / partner pitch deck — public, no auth.
 * Vertical scroll with snap sections; arrow keys and nav move between panels.
 */
export function PitchDeckPage() {
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
    document.title = 'AIWEB — Pitch Deck';
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

      const target = e.target as HTMLElement | null;
      const nested = target?.closest('.pd-panel-inner, .pd-chatgpt-thread--solution') as HTMLElement | null;
      if (nested && nested.scrollHeight > nested.clientHeight + 2) {
        const atTop = nested.scrollTop <= 0;
        const atBottom = nested.scrollTop + nested.clientHeight >= nested.scrollHeight - 2;
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) return;
      }

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
    <div className="pd-root pd-root--vertical">
      <div className="pd-atmosphere" aria-hidden />

      <div className="pd-scroll" ref={scrollRef}>
        {SLIDES.map((s, i) => (
          <section
            key={s.id}
            id={`pd-${s.id}`}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            className={[
              'pd-panel',
              i === 0 ? 'pd-panel--cover pd-panel--cover-bg' : '',
              s.id === 'problem' || s.id === 'solution' || s.id === 'product'
                ? 'pd-panel--chatgpt pd-panel--fit'
                : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-label={`Slide ${i + 1}: ${s.section}`}
          >
            {i === 0 ? <WelcomeCloudCarousel variant="deck" /> : null}
            <div className="pd-panel-inner">
              {i === 0 ? <CoverCityscape /> : null}
              {s.render()}
            </div>
            <footer className={`pd-chrome${i === 0 ? ' pd-chrome--cover' : ''}`}>
              <div className="pd-chrome-brand">
                <span className="pd-chrome-name">AIWEB</span>
                <span className="pd-chrome-entity">
                  <span className="pd-chrome-dot" aria-hidden>
                    ·
                  </span>
                  <span className="pd-chrome-meta">The AI Web Company</span>
                </span>
                <span className="pd-chrome-dot" aria-hidden>
                  ·
                </span>
                <span className="pd-chrome-meta">Confidential</span>
                <span className="pd-chrome-dot" aria-hidden>
                  ·
                </span>
                <span className="pd-chrome-meta pd-chrome-url">theaiwebcompany.com</span>
              </div>
              <p className="pd-chrome-section">{s.section}</p>
              <p className="pd-counter">
                {i === 0 ? (
                  <span className="pd-counter-curr">0</span>
                ) : (
                  <>
                    <span className="pd-counter-curr">{String(i).padStart(2, '0')}</span>
                    <span className="pd-counter-sep" aria-hidden>
                      /
                    </span>
                    <span className="pd-counter-total">
                      {String(SLIDES.length - 1).padStart(2, '0')}
                    </span>
                  </>
                )}
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
