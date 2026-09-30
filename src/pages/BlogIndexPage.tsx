import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '@/content/blog';
import { PageHero } from '@/components/corp/PageHero';
import { blogPostPath } from '@/lib/corpSiteRoutes';
import { useMarketingPageSeo, useScrollReveal } from '@/hooks/useScrollReveal';

export function BlogIndexPage() {
  useScrollReveal();
  useMarketingPageSeo({
    title: 'Blog · AI Web Company',
    description: 'Long-form writing from AI Web Company — engineering, research, and culture.',
    canonicalPath: '/blog',
  });

  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 sm:px-5 md:px-8">
      <PageHero
        eyebrow="Blog"
        title="Company writing"
        lede="Long-form essays on the AI Web, research, and how we build."
      />

      <ul className="marketing-reveal mb-20 divide-y divide-marketing-border border-y border-marketing-border">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={blogPostPath(post.slug)}
              className="flex flex-col gap-2 py-6 transition hover:bg-marketing-off/50 sm:flex-row sm:gap-10"
            >
              <time
                dateTime={post.date}
                className="shrink-0 font-mono-marketing text-[11px] font-bold uppercase tracking-[0.12em] text-marketing-muted2 sm:w-36"
              >
                {post.date}
              </time>
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
