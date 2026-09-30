import { useEffect } from 'react';
import { SITE_ORIGIN } from '@/lib/aiWebCompanyBrand';

const TITLE = 'AIWEB Plugins · The commercial action layer for AI.';
const DESCRIPTION =
  'AIWEB is the commercial action layer for AI. Publish AIWEB Pages that AI agents can discover, understand, and act through. Use AIWEB plugins in ChatGPT.';

function setMeta(
  attr: 'name' | 'property',
  key: string,
  content: string,
  restorers: Array<() => void>,
) {
  const sel = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(sel) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.setAttribute('data-aiweb-plugins', '1');
    document.head.appendChild(el);
    el.content = content;
    return;
  }
  const prev = el.content;
  el.content = content;
  restorers.push(() => {
    el!.content = prev;
  });
}

function addEl(tag: string, attrs: Record<string, string>) {
  const el = document.createElement(tag);
  el.setAttribute('data-aiweb-plugins', '1');
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.head.appendChild(el);
  return el;
}

export function usePluginsSeo() {
  useEffect(() => {
    const origin = SITE_ORIGIN.replace(/\/$/, '');
    const canonical = `${origin}/plugins`;
    const restorers: Array<() => void> = [];
    const prevTitle = document.title;
    document.title = TITLE;
    document.documentElement.classList.add('pg-html');

    setMeta('name', 'description', DESCRIPTION, restorers);
    setMeta(
      'name',
      'keywords',
      'AIWEB plugins, AIWEB for ChatGPT, AI Web, AIWEB Page, ChatGPT plugin, ChatGPT Business',
      restorers,
    );
    setMeta('name', 'robots', 'index,follow,max-snippet:-1,max-image-preview:large', restorers);
    setMeta('property', 'og:type', 'website', restorers);
    setMeta('property', 'og:site_name', 'AIWEB', restorers);
    setMeta('property', 'og:title', TITLE, restorers);
    setMeta('property', 'og:description', DESCRIPTION, restorers);
    setMeta('property', 'og:url', canonical, restorers);
    setMeta('property', 'og:image', `${origin}/icons/aiweb-plugins-wordmark.png`, restorers);
    setMeta('property', 'og:image:alt', 'AIWEB Plugins', restorers);
    setMeta('name', 'twitter:card', 'summary_large_image', restorers);
    setMeta('name', 'twitter:title', TITLE, restorers);
    setMeta('name', 'twitter:description', DESCRIPTION, restorers);
    setMeta('name', 'twitter:image', `${origin}/icons/aiweb-plugins-wordmark.png`, restorers);

    addEl('link', { rel: 'canonical', href: canonical });
    const jsonLd = addEl('script', { type: 'application/ld+json' });
    jsonLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'AIWEB Plugins',
      url: canonical,
      description: DESCRIPTION,
      isPartOf: {
        '@type': 'WebSite',
        name: 'AIWEB',
        url: origin,
      },
      about: [
        { '@type': 'Thing', name: 'AIWEB plugins' },
        { '@type': 'Thing', name: 'AIWEB for ChatGPT' },
        { '@type': 'Thing', name: 'AI Web' },
        { '@type': 'Thing', name: 'AIWEB Page' },
      ],
      publisher: {
        '@type': 'Organization',
        name: 'The AI Web Company',
        url: origin,
      },
    });

    return () => {
      document.title = prevTitle;
      document.documentElement.classList.remove('pg-html');
      restorers.forEach((fn) => fn());
      document.head.querySelectorAll('[data-aiweb-plugins]').forEach((n) => n.remove());
    };
  }, []);
}
