import type { AiwebOsDemo } from './demos';
import type { PublisherStoryId } from '@/demo/quoteReplayStories';
import { AiwebOsViewport } from './AiwebOsViewport';

type AiwebOsDemoBlockProps = {
  demo: AiwebOsDemo;
  index: number;
  storyId: PublisherStoryId;
  className?: string;
  showHeader?: boolean;
};

export function AiwebOsDemoBlock({
  demo,
  index,
  storyId,
  className = '',
  showHeader = true,
}: AiwebOsDemoBlockProps) {
  const { Component, title, description } = demo;

  return (
    <section
      className={`aos-publisher-demo ${className}`.trim()}
      aria-label={showHeader ? undefined : `${index + 1}. ${title}`}
      aria-labelledby={showHeader ? `aos-demo-${demo.id}-${storyId}` : undefined}
    >
      {showHeader ? (
        <>
          <h3 id={`aos-demo-${demo.id}-${storyId}`} className="aos-publisher-demo-title">
            {index + 1} · {title}
          </h3>
          <p className="aos-publisher-demo-desc">{description}</p>
        </>
      ) : null}
      <AiwebOsViewport className="aos-os-viewport--marketing">
        <Component key={storyId} storyId={storyId} />
      </AiwebOsViewport>
    </section>
  );
}
