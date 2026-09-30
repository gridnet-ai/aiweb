import {
  PUBLISHER_STORIES,
  type PublisherStoryId,
} from '@/demo/quoteReplayStories';
import './publisherStoryToggle.css';

type PublisherStoryToggleProps = {
  value: PublisherStoryId;
  onChange: (story: PublisherStoryId) => void;
};

export function PublisherStoryToggle({ value, onChange }: PublisherStoryToggleProps) {
  return (
    <div className="publisher-story-toggle-wrap">
      <div
        className="publisher-story-toggle"
        role="tablist"
        aria-label="Choose a story"
      >
        {PUBLISHER_STORIES.map((story) => {
          const active = story.id === value;
          return (
            <button
              key={story.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={`publisher-story-toggle-btn${active ? ' is-active' : ''}`}
              onClick={() => onChange(story.id)}
            >
              {story.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
