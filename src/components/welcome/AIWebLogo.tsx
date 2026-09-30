type AIWebLogoProps = {
  color?: string;
  width?: number | string;
  className?: string;
};

function isLightColor(color: string): boolean {
  const c = color.trim().toLowerCase();
  return c === '#fff' || c === '#ffffff' || c === 'white' || c === 'rgb(255,255,255)';
}

/**
 * AIWEB wordmark — ported from aiweb-publisher WelcomeScreen.
 */
export function AIWebLogo({
  color = '#000000',
  width = 300,
  className = '',
}: AIWebLogoProps) {
  const src = isLightColor(color)
    ? '/icons/aiweb-wordmark-white.png?v=3'
    : '/icons/aiweb-wordmark.png?v=3';

  return (
    <svg
      viewBox="0 0 300 77"
      width={width}
      role="img"
      aria-label="AIWEB"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>AIWEB</title>
      <image href={src} width="300" height="77" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}

export default AIWebLogo;
