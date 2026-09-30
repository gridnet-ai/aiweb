import { aiScoreTone } from '@/lib/aiScoreTone';

type Props = {
  score: number;
  title: string;
  onClick?: () => void;
};

/** Completeness zones (aligned with aiScoreTone thresholds). */
const ZONE_LOW = 40;
const ZONE_MID = 75;

/**
 * Horizontal AI Score meter — left→right red / yellow / green zones
 * so start (red) and finish (green) are obvious.
 */
export function AiScoreRing({ score, title, onClick }: Props) {
  const tone = aiScoreTone(score);
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  const unfilled = 100 - clamped;
  const inner = (
      <>
      <div className="publisher-ai-score-ring__label">
        <span className="publisher-ai-score-ring__caption">AI Score</span>
        <span className="publisher-ai-score-ring__value">
          {clamped}
          <span className="publisher-ai-score-ring__denom">/100</span>
        </span>
      </div>
      <div className="publisher-ai-score-ring__track" aria-hidden>
        <span
          className="publisher-ai-score-ring__zone publisher-ai-score-ring__zone--low"
          style={{ width: `${ZONE_LOW}%` }}
        />
        <span
          className="publisher-ai-score-ring__zone publisher-ai-score-ring__zone--mid"
          style={{ width: `${ZONE_MID - ZONE_LOW}%` }}
        />
        <span
          className="publisher-ai-score-ring__zone publisher-ai-score-ring__zone--high"
          style={{ width: `${100 - ZONE_MID}%` }}
        />
        <span
          className="publisher-ai-score-ring__fill"
          style={{ clipPath: `inset(0 ${unfilled}% 0 0)` }}
        />
        <span
          className="publisher-ai-score-ring__head"
          style={{ left: `clamp(0px, calc(${clamped}% - 1.5px), calc(100% - 3px))` }}
        />
      </div>
      </>
  );

  const meter = {
    role: 'meter' as const,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-valuenow': clamped,
  };

  if (onClick) {
    return (
      <button
        type="button"
        className={`publisher-ai-score-ring publisher-ai-score-ring--${tone} is-button`}
        title={`${title} — Open AEO review`}
        aria-label={`AI Score ${clamped} out of 100. Open AEO review.`}
        {...meter}
        onClick={onClick}
      >
        {inner}
      </button>
    );
  }

  return (
    <div
      className={`publisher-ai-score-ring publisher-ai-score-ring--${tone}`}
      title={title}
      aria-label={`AI Score ${clamped} out of 100`}
      {...meter}
    >
      {inner}
    </div>
  );
}
