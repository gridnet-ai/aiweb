export type ProsperPhoneExample = {
  title: string;
  areaCodeLabel: string;
  areaCode: string;
  numberLabel: string;
  number: string;
};

export type ProsperHiwFlowChannel = {
  id: 'text' | 'image' | 'voice' | 'video' | string;
  label: string;
};

export type ProsperHiwFlowStep = {
  id: string;
  label: string;
  channels?: readonly ProsperHiwFlowChannel[];
};

export type ProsperHowItWorksChatData = {
  phone: {
    src: string;
    alt: string;
  };
  callingCard: {
    src: string;
    alt: string;
    label: string;
  };
  phoneExample: ProsperPhoneExample;
  flow: readonly ProsperHiwFlowStep[];
};

function FlowChannelIcon({ kind }: { kind: string }) {
  switch (kind) {
    case 'text':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            d="M5 6.5h14v9.5H9.5L6 19.5V16H5z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'image':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <rect
            x="4"
            y="5.5"
            width="16"
            height="13"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <circle cx="9" cy="10" r="1.4" fill="currentColor" />
          <path
            d="M5.5 16.5 10 12.5l3 2.5 2.5-2 3 3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'voice':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <rect
            x="9.25"
            y="4.5"
            width="5.5"
            height="10"
            rx="2.75"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M7 12.5a5 5 0 0 0 10 0M12 17.5v2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'video':
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <rect
            x="3.5"
            y="7"
            width="12"
            height="10"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M15.5 10.5 20.5 8v8l-5-2.5z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

export function ProsperPhoneExampleTitle({
  example,
  className,
  as: Tag = 'h2',
}: {
  example: ProsperPhoneExample;
  className?: string;
  as?: 'h1' | 'h2';
}) {
  return (
    <Tag
      className={['prosper-title prosper-title--product prosper-title--phone-example', className]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="prosper-title-product-line">{example.title}</span>
      <span
        className="prosper-phone-parts"
        aria-label={`${example.areaCode}-${example.number}`}
      >
        <span className="prosper-phone-part">
          <span className="prosper-phone-part-label">{example.areaCodeLabel}</span>
          <span className="prosper-phone-part-value prosper-phone-part-value--area">
            [{example.areaCode}]
          </span>
        </span>
        <span className="prosper-phone-sep" aria-hidden>
          -
        </span>
        <span className="prosper-phone-part">
          <span className="prosper-phone-part-label">{example.numberLabel}</span>
          <span className="prosper-phone-part-value">[{example.number}]</span>
        </span>
      </span>
    </Tag>
  );
}

export function ProsperHowItWorksChat({ chat }: { chat: ProsperHowItWorksChatData }) {
  return (
    <div className="prosper-hiw-chat" aria-label="How patients Call on AIWEB">
      <div className="prosper-hiw-main">
        <figure className="prosper-hiw-phone">
          <img src={chat.phone.src} alt={chat.phone.alt} />
        </figure>
        <div className="prosper-hiw-aside">
          <ProsperPhoneExampleTitle
            example={chat.phoneExample}
            className="prosper-hiw-phone-example"
          />
          <figure className="prosper-hiw-calling-card">
            <img src={chat.callingCard.src} alt={chat.callingCard.alt} />
            <figcaption>{chat.callingCard.label}</figcaption>
          </figure>
        </div>
      </div>

      <ol className="prosper-hiw-flow" aria-label="Patient call flow">
        {chat.flow.map((step, index) => (
          <li key={step.id} className="prosper-hiw-flow-item">
            {index > 0 ? (
              <span className="prosper-hiw-flow-arrow" aria-hidden>
                ›
              </span>
            ) : null}
            <div className="prosper-hiw-flow-step">
              <span className="prosper-hiw-flow-label">{step.label}</span>
              {step.channels?.length ? (
                <span className="prosper-hiw-flow-channels" aria-label="Call channels">
                  {step.channels.map((channel) => (
                    <span key={channel.id} className="prosper-hiw-flow-channel" title={channel.label}>
                      <span className="prosper-hiw-flow-channel-icon">
                        <FlowChannelIcon kind={channel.id} />
                      </span>
                      <span className="prosper-hiw-flow-channel-label">{channel.label}</span>
                    </span>
                  ))}
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
