type Props = {
  color?: string;
  size?: number;
  className?: string;
};

function isLightColor(color: string): boolean {
  const c = color.trim().toLowerCase();
  return c === '#fff' || c === '#ffffff' || c === 'white';
}

/** AIWEB cloud mark — ported from aiweb-publisher. */
export default function AIWebCloudIcon({
  color = '#0b0b0c',
  size = 48,
  className = '',
}: Props) {
  const light = isLightColor(color);
  const aspect = 1.15;

  return (
    <img
      className={`aiweb-cloud-icon${light ? ' aiweb-cloud-icon--on-dark' : ''} ${className}`.trim()}
      src="/icons/aiweb-cloud.png?v=2"
      alt=""
      width={size}
      height={Math.round(size / aspect)}
      draggable={false}
      style={{
        width: size,
        height: 'auto',
        display: 'block',
        objectFit: 'contain',
      }}
    />
  );
}
