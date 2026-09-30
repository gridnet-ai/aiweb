import AIWebCloudIcon from '@/components/welcome/AIWebCloudIcon';

const CLOUD_TERMINAL_SRC =
  '/brand/logo-family/placeholders-black/cloud-terminal-d53af227.png?v=1';

type CloudSpec = {
  size: number;
  opacity: number;
  /** Mix cloud-terminal silhouette into the drift row. */
  kind?: 'cloud' | 'terminal';
};

const CLOUDS: readonly CloudSpec[] = [
  { size: 40, opacity: 0.3 },
  { size: 52, opacity: 0.42, kind: 'terminal' },
  { size: 34, opacity: 0.26 },
  { size: 58, opacity: 0.36 },
  { size: 44, opacity: 0.32, kind: 'terminal' },
  { size: 38, opacity: 0.28 },
  { size: 48, opacity: 0.4 },
  { size: 36, opacity: 0.24, kind: 'terminal' },
  { size: 54, opacity: 0.34 },
] as const;

/** Extra density so wide screens stay filled edge-to-edge. */
const DECK_CLOUDS: readonly CloudSpec[] = [
  ...CLOUDS,
  { size: 44, opacity: 0.32 },
  { size: 62, opacity: 0.28, kind: 'terminal' },
  { size: 30, opacity: 0.22 },
  { size: 50, opacity: 0.38 },
  { size: 42, opacity: 0.3, kind: 'terminal' },
  { size: 56, opacity: 0.34 },
  { size: 28, opacity: 0.2 },
  { size: 46, opacity: 0.36 },
] as const;

function CloudGlyph({ size, kind }: { size: number; kind?: 'cloud' | 'terminal' }) {
  if (kind === 'terminal') {
    return (
      <img
        className="welcome-cloud-terminal"
        src={CLOUD_TERMINAL_SRC}
        alt=""
        width={size}
        height={Math.round(size * 0.62)}
        draggable={false}
        style={{ width: size, height: 'auto', display: 'block', objectFit: 'contain' }}
      />
    );
  }
  return <AIWebCloudIcon size={size} color="#0b0b0c" />;
}

function CloudStrip({
  label,
  clouds,
  dense,
}: {
  label: string;
  clouds: readonly CloudSpec[];
  dense?: boolean;
}) {
  return (
    <div
      className={['welcome-cloud-strip', dense ? 'welcome-cloud-strip--dense' : '']
        .filter(Boolean)
        .join(' ')}
      aria-hidden={label !== 'a' && !label.startsWith('a')}
    >
      {clouds.map((c, i) => (
        <span
          key={`${label}-${i}`}
          className="welcome-cloud-item"
          style={{ opacity: c.opacity, ['--cloud-bob' as string]: `${(i % 5) * 0.7}s` }}
        >
          <CloudGlyph size={c.size} kind={c.kind} />
        </span>
      ))}
    </div>
  );
}

type WelcomeCloudCarouselProps = {
  className?: string;
  /** Full-bleed multi-row field for pitch deck cover screenshots. */
  variant?: 'welcome' | 'deck';
};

/**
 * Edge-to-edge cloud carousel across the welcome header.
 * Mixes AIWEB cloud + cloud-terminal silhouettes.
 */
export function WelcomeCloudCarousel({
  className = '',
  variant = 'welcome',
}: WelcomeCloudCarouselProps) {
  if (variant === 'deck') {
    const rows = [0, 1, 2];
    return (
      <div
        className={['welcome-cloud-carousel', 'welcome-cloud-carousel--deck', className]
          .filter(Boolean)
          .join(' ')}
        aria-hidden
      >
        {rows.map((row) => (
          <div
            key={row}
            className="welcome-cloud-track welcome-cloud-track--deck"
            style={{ ['--cloud-row' as string]: String(row) }}
          >
            <CloudStrip label={`a${row}`} clouds={DECK_CLOUDS} dense />
            <CloudStrip label={`b${row}`} clouds={DECK_CLOUDS} dense />
            <CloudStrip label={`c${row}`} clouds={DECK_CLOUDS} dense />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={['welcome-cloud-carousel', className].filter(Boolean).join(' ')} aria-hidden>
      <div className="welcome-cloud-track">
        <CloudStrip label="a" clouds={CLOUDS} />
        <CloudStrip label="b" clouds={CLOUDS} />
      </div>
    </div>
  );
}
