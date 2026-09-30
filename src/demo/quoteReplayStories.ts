export type PublisherStoryId = 'shopper' | 'catering' | 'plumbing' | 'album';

export type PublisherStoryMeta = {
  id: PublisherStoryId;
  label: string;
  intro: string;
};

export const PUBLISHER_STORIES: PublisherStoryMeta[] = [
  {
    id: 'shopper',
    label: 'Shopper',
    intro: 'The buyer (shopper) point of view from inside the ChatGPT conversation.',
  },
  {
    id: 'catering',
    label: 'Catering',
    intro: 'The event planner point of view — wedding catering quote inside ChatGPT.',
  },
  {
    id: 'plumbing',
    label: 'Plumbing',
    intro: 'The homeowner point of view — emergency plumbing call inside ChatGPT.',
  },
  {
    id: 'album',
    label: 'Album',
    intro: 'The artist point of view — build and publish an AI Web Album inside ChatGPT.',
  },
];

export function publisherStoryMeta(id: PublisherStoryId): PublisherStoryMeta {
  return PUBLISHER_STORIES.find((story) => story.id === id) ?? PUBLISHER_STORIES[0];
}
