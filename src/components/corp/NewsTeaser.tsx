import { Link } from 'react-router-dom';
import { latestNews } from '@/content/news';
import { NEWS_PATH, newsPostPath } from '@/lib/corpSiteRoutes';

export function NewsTeaser() {
  const posts = latestNews(3);

  return (
    <section className="marketing-reveal border-t border-marketing-border px-4 py-14 sm:px-5 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1080px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono-marketing text-[11px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
              News
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-marketing-ink">
              Company announcements
            </h2>
          </div>
          <Link
            to={NEWS_PATH}
            className="text-[13px] font-semibold text-marketing-crimson hover:text-marketing-crimsonDark"
          >
            All news →
          </Link>
        </div>

        <ul className="mt-10 divide-y divide-marketing-border border-y border-marketing-border">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to={newsPostPath(post.slug)}
                className="flex flex-col gap-1 py-5 transition hover:bg-marketing-off/60 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <time
                  dateTime={post.date}
                  className="shrink-0 font-mono-marketing text-[11px] font-bold uppercase tracking-[0.12em] text-marketing-muted2"
                >
                  {post.date}
                </time>
                <span className="text-base font-semibold text-marketing-ink">{post.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
