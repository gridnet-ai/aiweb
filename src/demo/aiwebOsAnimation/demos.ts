import type { ComponentType } from 'react';
import type { PublisherStoryId } from '@/demo/quoteReplayStories';
import { AiwebOsAnimation } from './AiwebOsAnimation';
import { AiwebOsUpdateAnimation } from './AiwebOsUpdateAnimation';
import { AiwebOsPublishAnimation } from './AiwebOsPublishAnimation';
import { AiwebOsMailAnimation } from './AiwebOsMailAnimation';
import { aiwebOsStoryConfig } from './aiwebOsStoryConfigs';

export type AiwebOsDemo = {
  id: string;
  title: string;
  description: string;
  Component: ComponentType<{ storyId: PublisherStoryId }>;
};

export function getAiwebOsDemos(storyId: PublisherStoryId): AiwebOsDemo[] {
  const story = aiwebOsStoryConfig(storyId);
  return [
    {
      id: 'build',
      title: story.demos.build.title,
      description: story.demos.build.description,
      Component: AiwebOsAnimation,
    },
    {
      id: 'update',
      title: story.demos.update.title,
      description: story.demos.update.description,
      Component: AiwebOsUpdateAnimation,
    },
    {
      id: 'publish',
      title: story.demos.publish.title,
      description: story.demos.publish.description,
      Component: AiwebOsPublishAnimation,
    },
    {
      id: 'mail',
      title: story.demos.mail.title,
      description: story.demos.mail.description,
      Component: AiwebOsMailAnimation,
    },
  ];
}

/** @deprecated Use getAiwebOsDemos('shopper') */
export const AIWEB_OS_DEMOS = getAiwebOsDemos('shopper');
