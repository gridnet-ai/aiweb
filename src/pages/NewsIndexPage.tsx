import { Link } from 'react-router-dom';
import { NEWS_POSTS } from '@/content/news';
import { PageHero } from '@/components/corp/PageHero';
import { newsPostPath } from '@/lib/corpSiteRoutes';
import { useMarketingPageSeo, useScrollReveal } from '@/hooks/useScrollReveal';

export function NewsIndexPage() {
  useScrollReveal();
  useMarketingPageSeo({
    title: 'News · AI Web Company',
    description:
      'Company news and funding announcements from AI Web Company — rounds, partnerships, and milestones.',
    canonicalPath: '/news',
  });

  const posts = [...NEWS_POSTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 sm:px-5 md:px-8">
      <PageHero
        eyebrow="News"
        title="Company news"
        lede="Funding, partnerships, leadership, and major product moments framed as company announcements."
      />

      <ul className="marketing-reveal mb-20 divide-y divide-marketing-border border-y border-marketing-border">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={newsPostPath(post.slug)}
              className="flex flex-col gap-2 py-6 transition hover:bg-marketing-off/50 sm:flex-row sm:gap-10"
            >
              <div className="shrink-0 sm:w-36">
                <time
                  dateTime={post.date}
                  className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.12em] text-marketing-muted2"
                >
                  {post.date}
                </time>
                <p className="mt-1 font-mono-marketing text-[10px] uppercase tracking-[0.14em] text-marketing-gold">
                  {post.category}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-marketing-ink">{post.title}</h2>
                <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-marketing-muted">
                  {post.summary}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
