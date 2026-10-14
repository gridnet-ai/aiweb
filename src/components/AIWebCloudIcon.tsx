export default function AIWebCloudIcon({
  size = 48,
  className = '',
}: { size?: number; color?: string; className?: string }) {
  return (
    <img
      className={`aiweb-cloud-icon ${className}`.trim()}
      src="/icons/aiweb-cloud.png?v=2"
      alt=""
      width={size}
      height={Math.round(size / 1.15)}
      draggable={false}
      style={{ width: size, height: 'auto', display: 'block', objectFit: 'contain' }}
    />
  );
}
