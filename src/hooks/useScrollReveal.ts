import { useEffect } from 'react';
import { SITE_ORIGIN } from '@/lib/aiWebCompanyBrand';
import {
  DEFAULT_ROBOTS,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  SITE_NAME,
} from '@/lib/siteSeo';

export function useScrollReveal(selector = '.marketing-reveal'): void {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in');
        });
      },
      { threshold: 0.1 },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
}

function upsertMeta(name: string, content: string, property = false): void {
  const attr = property ? 'property' : 'name';
  const key = property ? `property="${name}"` : `name="${name}"`;
  let el = document.querySelector(`meta[${key}]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useMarketingPageSeo(opts: {
  title: string;
  description: string;
  ogDescription?: string;
  twitterDescription?: string;
  canonicalPath: string;
  keywords?: string;
  robots?: string;
  image?: string;
}): void {
  const { title, description, canonicalPath, keywords, robots } = opts;
  const ogDescription = opts.ogDescription ?? description;
  const twitterDescription = opts.twitterDescription ?? description;
  const canonicalUrl = `${SITE_ORIGIN}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
  const imageUrl = opts.image
    ? opts.image.startsWith('http')
      ? opts.image
      : `${SITE_ORIGIN}${opts.image.startsWith('/') ? opts.image : `/${opts.image}`}`
    : OG_IMAGE_URL;

  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const descMeta = document.querySelector('meta[name="description"]');
    const prevDesc = descMeta?.getAttribute('content') ?? '';

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const prevCanonical = canonical?.href ?? '';
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    if (descMeta) descMeta.setAttribute('content', description);
    else upsertMeta('description', description);

    upsertMeta('og:type', 'website', true);
    upsertMeta('og:site_name', SITE_NAME, true);
    upsertMeta('og:title', title, true);
    upsertMeta('og:description', ogDescription, true);
    upsertMeta('og:url', canonicalUrl, true);
    upsertMeta('og:image', imageUrl, true);
    upsertMeta('og:image:secure_url', imageUrl, true);
    upsertMeta('og:image:type', 'image/png', true);
    upsertMeta('og:image:width', String(OG_IMAGE_WIDTH), true);
    upsertMeta('og:image:height', String(OG_IMAGE_HEIGHT), true);
    upsertMeta('og:image:alt', OG_IMAGE_ALT, true);
    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', title);
    upsertMeta('twitter:description', twitterDescription);
    upsertMeta('twitter:image', imageUrl);
    upsertMeta('twitter:image:alt', OG_IMAGE_ALT);

    if (keywords) upsertMeta('keywords', keywords);
    upsertMeta('robots', robots ?? DEFAULT_ROBOTS);

    return () => {
      document.title = prevTitle;
      if (descMeta) descMeta.setAttribute('content', prevDesc);
      if (canonical) canonical.href = prevCanonical;
    };
  }, [
    title,
    description,
    ogDescription,
    twitterDescription,
    canonicalUrl,
    keywords,
    robots,
    imageUrl,
  ]);
}

export function useJsonLd(data: Record<string, unknown> | Record<string, unknown>[]): void {
  const serialized = JSON.stringify(data);
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.corpJsonLd = '1';
    script.textContent = serialized;
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [serialized]);
}
