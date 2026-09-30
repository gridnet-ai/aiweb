export type NewsCategory = 'funding' | 'company' | 'product' | 'partnership';

export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  category: NewsCategory;
  summary: string;
  body: string[];
  productUrl?: string;
}

export const NEWS_POSTS: NewsPost[] = [
  {
    slug: 'commercial-traction-satx-district-one',
    title: 'First paying customer and SATX District One LOI',
    date: '2026-06-15',
    category: 'partnership',
    summary:
      'AI Web Company recorded its first paying customer and a signed letter of intent for the San Antonio District One pilot.',
    body: [
      'In June 2026, AI Web Company reached early commercial traction: a first paying customer and a signed LOI for the SATX District One pilot.',
      'The milestone follows six months of product ship cadence across Big Search, AI Web Pages, and the AI Web App surface.',
    ],
  },
  {
    slug: 'google-for-startups',
    title: 'AI Web Company joins Google for Startups',
    date: '2026-03-01',
    category: 'funding',
    summary:
      'AI Web Company joined the Google for Startups ecosystem, expanding cloud, go-to-market, and founder support.',
    body: [
      'AI Web Company was admitted to Google for Startups in March 2026.',
      'The program supports founders building infrastructure for AI discovery, publishing, and real-world distribution.',
    ],
  },
  {
    slug: 'mvp-launched',
    title: 'MVP launched — Big Search enters the market',
    date: '2026-01-15',
    category: 'product',
    summary:
      'Big Search shipped its first live product, opening multi-model search and visibility tooling to early users.',
    body: [
      'In January 2026, Big Search entered the market with its first live product.',
      'The launch marked the start of measurable crawler activity and AI Web Page publishing on the stack AI Web Company continues to build.',
    ],
    productUrl: 'https://bigsearchai.com',
  },
  {
    slug: 'founder-institute-graduation',
    title: 'Founder Institute Austin Cohort 25 graduation',
    date: '2025-12-15',
    category: 'company',
    summary:
      'Founder & CEO Terry French graduated from Founder Institute Austin Cohort 25, formalizing the venture that became AI Web Company.',
    body: [
      'In December 2025, founder Terry French graduated from the Founder Institute Austin, Texas Cohort 25.',
      'The program crystallized the mission: build AI as a utility for bots, agents, and humans.',
    ],
  },
];

export function getNewsPost(slug: string): NewsPost | undefined {
  return NEWS_POSTS.find((p) => p.slug === slug);
}

export function latestNews(limit = 3): NewsPost[] {
  return [...NEWS_POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}
