import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import './chatGptReplayViewport.css';

type ChatGptReplayViewportProps = {
  children: ReactNode;
  designWidth?: number;
  maxHeightVh?: number;
  wide?: boolean;
  className?: string;
};

/** Scales ChatGPT replay mocks to fit container width and viewport height. */
export function ChatGptReplayViewport({
  children,
  designWidth = 720,
  maxHeightVh = 76,
  wide = false,
  className = '',
}: ChatGptReplayViewportProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ scale: 1, height: 0 });

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const inner = innerRef.current;
    if (!shell || !inner) return;

    const update = () => {
      const shellWidth = shell.getBoundingClientRect().width;
      const innerHeight = inner.offsetHeight;
      const maxHeight = (window.innerHeight * maxHeightVh) / 100;
      const widthScale = shellWidth > 0 ? shellWidth / designWidth : 1;
      const heightScale = innerHeight > 0 ? maxHeight / innerHeight : 1;
      const scale = Math.min(1, widthScale, heightScale);
      setLayout({ scale, height: innerHeight * scale });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(shell);
    observer.observe(inner);
    window.addEventListener('resize', update);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [designWidth, maxHeightVh, children]);

  return (
    <div
      ref={shellRef}
      className={`gq-replay-viewport${wide ? ' gq-replay-viewport--wide' : ''}${
        className ? ` ${className}` : ''
      }`}
      style={{ height: layout.height > 0 ? `${layout.height}px` : undefined }}
    >
      <div
        ref={innerRef}
        className="gq-replay-viewport-inner"
        style={{
          width: designWidth,
          transform: `scale(${layout.scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  );
}
