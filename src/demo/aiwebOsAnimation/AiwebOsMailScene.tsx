import './aiwebOsAnimation.css';

export type MailInboxItem = {
  id: string;
  initials: string;
  name: string;
  source: string;
  preview: string;
  time: string;
};

export type AiwebOsMailConfig = {
  inbox: MailInboxItem[];
  featuredLeadId: string;
  pageUrl: string;
  incomingMessage: string;
  incomingMeta: string;
  threadSource: string;
  callbackMessage: string;
};

export type AiwebOsMailSceneProps = {
  config: AiwebOsMailConfig;
  phase?: string;
  needsYou: number;
  showFeaturedLead: boolean;
  selectedId: string | null;
  showIncoming: boolean;
  callbackText: string;
  sentCallback: boolean;
  showPageCard?: boolean;
  pagePhone?: string;
  isTypingCallback?: boolean;
  beat?: 'wait' | 'play' | 'done';
  className?: string;
};

/** Controlled AIWEB Mail Calls dashboard — shared by OS animation and ChatGPT story replays. */
export function AiwebOsMailScene({
  config,
  phase,
  needsYou,
  showFeaturedLead,
  selectedId,
  showIncoming,
  callbackText,
  sentCallback,
  showPageCard = false,
  pagePhone = '',
  isTypingCallback = false,
  beat = 'play',
  className,
}: AiwebOsMailSceneProps) {
  const { inbox, featuredLeadId, pageUrl, incomingMessage, incomingMeta, threadSource, callbackMessage } =
    config;
  const featured = inbox.find((item) => item.id === featuredLeadId);
  const visibleInbox = inbox.filter((item) => item.id !== featuredLeadId || showFeaturedLead);

  return (
    <div
      className={`aos-mail-app gq-beat is-${beat}${className ? ` ${className}` : ''}`}
      data-phase={phase}
      aria-label="AIWEB Mail calls dashboard"
    >
      {showPageCard ? (
        <div className="aos-mail-page-card" aria-hidden>
          <p className="aos-mail-page-card-kicker">AIWEB Page</p>
          <p className="aos-mail-page-card-url">{pageUrl}</p>
          <div className="aos-mail-page-card-form">
            <span className="aos-mail-page-card-label">Request a quote</span>
            <span className="aos-mail-page-card-field">
              Phone {pagePhone}
              {phase === 'page-call' && pagePhone.length < 11 ? <span className="aos-cursor" /> : null}
            </span>
          </div>
          <span className="aos-mail-page-card-btn">Submit call request</span>
        </div>
      ) : null}

      <header className="aos-mail-top">
        <div className="aos-mail-brand">
          <span className="aos-mail-brand-mark" aria-hidden />
          <span className="aos-mail-brand-name">Aiweb</span>
          <span className="aos-mail-brand-ver">v 5</span>
        </div>
        <nav className="aos-mail-top-nav" aria-hidden>
          <span>OS</span>
          <span className="is-active">Metrics</span>
        </nav>
        <div className="aos-mail-account">
          <span>admin@theaiwebcompany.com</span>
          <span className="aos-mail-signout">Sign out</span>
        </div>
      </header>

      <div className="aos-mail-tabs" aria-hidden>
        <span>AIWEB</span>
        <span>HITS</span>
        <span className="is-active">Calls</span>
      </div>

      <div className="aos-mail-body">
        <aside className="aos-mail-inbox">
          <div className="aos-mail-inbox-head">
            <h3>Inbox</h3>
            <span className="aos-mail-search" />
          </div>
          <div className="aos-mail-filters">
            <span className={needsYou > 14 ? 'is-active' : ''}>Needs you ({needsYou})</span>
            <span>Waiting</span>
            <span className={needsYou <= 14 ? 'is-active' : ''}>All</span>
          </div>
          <ul className="aos-mail-list">
            {visibleInbox.map((item) => (
              <li
                key={item.id}
                className={`aos-mail-list-item${selectedId === item.id ? ' is-selected' : ''}${
                  item.id === featuredLeadId && showFeaturedLead ? ' is-new' : ''
                }`}
              >
                <span className="aos-mail-avatar">{item.initials}</span>
                <div className="aos-mail-list-copy">
                  <div className="aos-mail-list-top">
                    <strong>{item.name}</strong>
                    <span>{item.time}</span>
                  </div>
                  <p className="aos-mail-list-source">{item.source}</p>
                  <p className="aos-mail-list-preview">{item.preview}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <main className={`aos-mail-thread${selectedId ? ' is-open' : ''}`}>
          {selectedId === featuredLeadId && featured ? (
            <>
              <div className="aos-mail-thread-head">
                <div className="aos-mail-thread-who">
                  <span className="aos-mail-avatar">{featured.initials}</span>
                  <div>
                    <strong>{featured.name}</strong>
                    <p>{threadSource}</p>
                  </div>
                </div>
                <span className={`aos-mail-status${sentCallback ? ' is-answered' : ''}`}>
                  {sentCallback ? 'Answered' : 'Needs you'}
                </span>
              </div>

              <div className="aos-mail-messages">
                {showIncoming ? (
                  <div className="aos-mail-msg aos-mail-msg--in is-revealed">
                    <p className="aos-mail-msg-meta">{incomingMeta}</p>
                    <p className="aos-mail-msg-body">{incomingMessage}</p>
                  </div>
                ) : null}
                {sentCallback ? (
                  <div className="aos-mail-msg aos-mail-msg--out is-revealed">
                    <p className="aos-mail-msg-meta">You</p>
                    <p className="aos-mail-msg-body">{callbackMessage}</p>
                  </div>
                ) : null}
              </div>

              <div className="aos-mail-compose">
                <div className="aos-mail-compose-bar">
                  <span className="aos-mail-compose-select">
                    {sentCallback ? 'Answered' : 'Needs you'}
                  </span>
                  <span>Call</span>
                  <span>Email</span>
                  <span className="aos-mail-quote-btn">Quote details</span>
                </div>
                <div className={`aos-mail-callback${isTypingCallback ? ' is-typing' : ''}`}>
                  <p className="aos-mail-callback-label">Write a Callback…</p>
                  <p className="aos-mail-callback-input">
                    {callbackText}
                    {isTypingCallback && callbackText.length < callbackMessage.length ? (
                      <span className="aos-cursor" />
                    ) : null}
                  </p>
                </div>
                <button
                  type="button"
                  className={`aos-mail-send${sentCallback ? ' is-sent' : ''}`}
                >
                  Send Callback
                </button>
              </div>
            </>
          ) : (
            <div className="aos-mail-thread-empty">
              <p>Select a call to respond through AIWEB Mail.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
