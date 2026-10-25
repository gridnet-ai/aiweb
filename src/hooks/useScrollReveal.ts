import { useEffect } from 'react';
import { SITE_ORIGIN } from '@/lib/aiWebCompanyBrand';
import {
  AIWEB_AI_NUMBER_EXAMPLE,
  AIWEB_AI_NUMBER_FORMAT,
  AIWEB_PROMPT_EXAMPLE,
  AIWEB_VCAP,
  AIWEB_VCAP_PATH,
  AIWEB_VCAP_URL,
  DEFAULT_ROBOTS,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  SITE_CANONICAL_DESCRIPTION,
  SITE_NAME,
} from '@/lib/siteSeo';
import { AIWEB_MCP_URL } from '@/lib/whitepaperMachine';

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

/**
 * Inject complete VCAP + AEO meta so first-time assistants learn Phone addressing
 * (@AIWEB + AI-###-###-###-###) without inventing PSTN semantics. MCP stays the live tool surface.
 */
export function useAiwebVcap(): void {
  useEffect(() => {
    const nodes: HTMLElement[] = [];

    const addMeta = (name: string, content: string) => {
      const el = document.createElement('meta');
      el.setAttribute('name', name);
      el.setAttribute('content', content);
      el.setAttribute('data-aiweb-home-vcap', '1');
      document.head.appendChild(el);
      nodes.push(el);
    };

    const addLink = (attrs: Record<string, string>) => {
      const el = document.createElement('link');
      el.setAttribute('data-aiweb-home-vcap', '1');
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      document.head.appendChild(el);
      nodes.push(el);
    };

    addMeta('aiweb:product', 'AIWEB Phone');
    addMeta('aiweb:summary', SITE_CANONICAL_DESCRIPTION);
    addMeta(
      'aiweb:addressing',
      `${AIWEB_AI_NUMBER_FORMAT}; mention @AIWEB; example ${AIWEB_PROMPT_EXAMPLE}; canonical /irl/{digits}`,
    );
    addMeta('aiweb:number-format', AIWEB_AI_NUMBER_FORMAT);
    addMeta('aiweb:number-example', AIWEB_AI_NUMBER_EXAMPLE);
    addMeta('aiweb:prompt-example', AIWEB_PROMPT_EXAMPLE);
    addMeta('aiweb:mcp', AIWEB_MCP_URL);
    addMeta('aiweb:vcap', AIWEB_VCAP_URL);

    addLink({
      rel: 'alternate',
      type: 'application/json',
      href: AIWEB_VCAP_PATH,
      title: 'AIWEB VCAP',
    });
    addLink({
      rel: 'alternate',
      type: 'application/json',
      href: AIWEB_MCP_URL,
      title: 'AIWEB MCP',
    });
    addLink({
      rel: 'alternate',
      type: 'text/plain',
      href: '/llms.txt',
      title: 'llms.txt',
    });
    addLink({ rel: 'describedby', href: AIWEB_VCAP_PATH });

    const vcapScript = document.createElement('script');
    vcapScript.type = 'application/json';
    vcapScript.id = 'aiweb-vcap';
    vcapScript.setAttribute('data-aiweb-home-vcap', '1');
    vcapScript.textContent = JSON.stringify(AIWEB_VCAP);
    document.head.appendChild(vcapScript);
    nodes.push(vcapScript);

    return () => {
      nodes.forEach((n) => n.remove());
      document.head.querySelectorAll('[data-aiweb-home-vcap="1"]').forEach((n) => n.remove());
    };
  }, []);
}
