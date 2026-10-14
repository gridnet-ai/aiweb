import AIWebCloudIcon from '@/components/AIWebCloudIcon';

const CLOUD_TERMINAL_SRC =
  '/brand/logo-family/placeholders-black/cloud-terminal-d53af227.png?v=1';

type CloudSpec = {
  size: number;
  opacity: number;
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

export function WelcomeCloudCarousel({ className = '' }: { className?: string }) {
  const strip = (label: string) => (
    <div className="welcome-cloud-strip" aria-hidden={label !== 'a'}>
      {CLOUDS.map((c, i) => (
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
  return (
    <div className={['welcome-cloud-carousel', className].filter(Boolean).join(' ')} aria-hidden>
      <div className="welcome-cloud-track">
        {strip('a')}
        {strip('b')}
      </div>
    </div>
  );
}
