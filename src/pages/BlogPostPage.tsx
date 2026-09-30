import { Link, Navigate, useParams } from 'react-router-dom';
import { getBlogPost } from '@/content/blog';
import { SITE_ORIGIN } from '@/lib/aiWebCompanyBrand';
import { BLOG_PATH } from '@/lib/corpSiteRoutes';
import { useJsonLd, useMarketingPageSeo, useScrollReveal } from '@/hooks/useScrollReveal';

export function BlogPostPage() {
  const { slug = '' } = useParams();
  const post = getBlogPost(slug);

  useScrollReveal();
  useMarketingPageSeo({
    title: post ? `${post.title} · AI Web Company` : 'Blog · AI Web Company',
    description: post?.summary ?? 'Company blog from AI Web Company.',
    canonicalPath: post ? `/blog/${post.slug}` : '/blog',
  });
  useJsonLd(
    post
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          datePublished: post.date,
          description: post.summary,
          author: { '@type': 'Organization', name: 'AI Web Company' },
          publisher: {
            '@type': 'Organization',
            name: 'AI Web Company',
            url: SITE_ORIGIN,
          },
          mainEntityOfPage: `${SITE_ORIGIN}/blog/${post.slug}`,
        }
      : { '@context': 'https://schema.org', '@type': 'WebPage' },
  );

  if (!post) return <Navigate to={BLOG_PATH} replace />;

  return (
    <article className="mx-auto w-full max-w-[720px] px-4 py-12 sm:px-5 md:px-8 md:py-16">
      <Link
        to={BLOG_PATH}
        className="text-[13px] font-semibold text-marketing-crimson hover:text-marketing-crimsonDark"
      >
        ← Blog
      </Link>
      <time
        dateTime={post.date}
        className="mt-8 block font-mono-marketing text-[11px] font-bold uppercase tracking-[0.12em] text-marketing-muted2"
      >
        {post.date}
      </time>
      <h1 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-marketing-ink">
        {post.title}
      </h1>
      <div className="marketing-reveal mt-8 space-y-4 text-[16px] leading-relaxed text-marketing-muted">
        {post.body.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
    </article>
  );
}
