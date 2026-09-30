type PublisherIconProps = {
  /** `color` (default) = official @-socket mark. */
  appearance?: 'color' | 'mono';
  /** `light` inverts for pale surfaces (welcome, marketing). */
  variant?: 'dark' | 'light';
  size?: number | string;
  className?: string;
  alt?: string;
};

/** Official AIWEB OS mark — @-socket from logo-family (the O in OS). */
const MARK_SRC = '/brand/logo-family/marks/06-at-socket-mark-alt.png?v=1';

/** Official AIWEB OS app mark — @-socket (reads as the O in OS). */
export function PublisherIcon({
  appearance = 'color',
  variant = 'dark',
  size = 28,
  className = '',
  alt = 'AIWEB OS',
}: PublisherIconProps) {
  const invert = variant === 'light';
  return (
    <img
      src={MARK_SRC}
      width={typeof size === 'number' ? size : undefined}
      height={typeof size === 'number' ? size : undefined}
      alt={alt}
      className={`block shrink-0${invert ? ' publisher-icon--invert' : ''}${
        appearance === 'mono' ? ' publisher-icon--mono' : ''
      } ${className}`.trim()}
      draggable={false}
    />
  );
}

export default PublisherIcon;
