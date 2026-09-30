import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

const DESIGN_WIDTH = 1024;

/** Scales the fixed 1024px AIWEB OS mock to fit its container (mobile-safe). */
export function AiwebOsViewport({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => {
      const width = node.getBoundingClientRect().width;
      setScale(width > 0 ? Math.min(1, width / DESIGN_WIDTH) : 1);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    window.addEventListener('resize', update);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`aos-os-viewport${className ? ` ${className}` : ''}`}
      style={{ ['--aos-scale' as string]: String(scale) }}
    >
      {children}
    </div>
  );
}
