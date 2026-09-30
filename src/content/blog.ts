export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'ai-as-a-utility',
    title: 'AI as a utility',
    date: '2026-06-01',
    summary:
      'Why AI Web Company treats AI the way earlier eras treated electricity and the internet — a layer everyone depends on.',
    body: [
      'Utilities are boring on purpose. They work when you need them, for everyone on the network — not only for the people who built the generator.',
      'AI Web Company is building toward that same posture: search, publish, and presence on the AI Web for bots, agents, and humans.',
      'Product surfaces (AI Web App, Big Search, Publish To AI) are how that utility shows up today. The company job is the long arc: trust, talent, capital, and a coherent story.',
    ],
  },
  {
    slug: 'what-is-the-ai-web',
    title: 'What is the AI Web?',
    date: '2026-05-12',
    summary:
      'A plain-language brief on AI Web Pages, machine-readable presence, and why corp storytelling stays separate from product conversion.',
    body: [
      'The AI Web is the layer where agents and models discover, cite, and act on structured presence — not only human-facing HTML.',
      'AI Web Pages and publish tooling make that presence concrete. Corporate pages on theaiwebcompany.com tell the company story without forcing every visitor through a product funnel.',
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
