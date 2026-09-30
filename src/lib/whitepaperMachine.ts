import { useEffect } from 'react';

export const AIWEB_MCP_URL = 'https://www.os.theaiwebcompany.com/mcp';
export const AIWEB_MCP_ALIAS = 'https://www.os.theaiwebcompany.com/api/v1/mcp';

export function whitepaperVcapPaths(origin: string) {
  const base = `${origin.replace(/\/$/, '')}/whitepaper`;
  return {
    canonical: base,
    llms: `${base}/llms.txt`,
    jsonld: `${base}/json.ld`,
    mcpFile: `${base}/mcp.json`,
    openapi: `${base}/openapi.json`,
    actions: `${base}/actions.json`,
    chatgpt: `${base}/chatgpt.txt`,
    share: `${base}/aiweb-cloud.png`,
  };
}

const DESCRIPTION =
  'AIWEB is the commercial action layer for AI. Publish AIWEB Pages that AI agents can discover, understand, and act through. Build. Publish. Get discovered. Receive Calls. Respond. Improve. Repeat.';

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
    el.setAttribute('data-aiweb-vcap', '1');
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

function addLink(attrs: Record<string, string>) {
  const el = document.createElement('link');
  el.setAttribute('data-aiweb-vcap', '1');
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.head.appendChild(el);
}

/** Inject VCAP / Open Graph / JSON-LD so ChatGPT and crawlers can read the paper. */
export function useWhitepaperMachine() {
  useEffect(() => {
    const origin = window.location.origin;
    const v = whitepaperVcapPaths(origin);
    const restorers: Array<() => void> = [];
    const prevTitle = document.title;
    document.title = 'Intention is all you need — AIWEB';

    document.documentElement.lang = 'en';

    setMeta('name', 'description', DESCRIPTION, restorers);
    setMeta('name', 'aiweb:mcp', AIWEB_MCP_URL, restorers);
    setMeta('name', 'robots', 'index,follow,max-snippet:-1,max-image-preview:large', restorers);
    setMeta('property', 'og:type', 'article', restorers);
    setMeta('property', 'og:site_name', 'AIWEB', restorers);
    setMeta('property', 'og:title', 'Intention is all you need — AIWEB', restorers);
    setMeta('property', 'og:description', DESCRIPTION, restorers);
    setMeta('property', 'og:url', v.canonical, restorers);
    setMeta('property', 'og:image', v.share, restorers);
    setMeta('property', 'og:image:alt', 'AIWEB cloud mark', restorers);
    setMeta('name', 'twitter:card', 'summary_large_image', restorers);
    setMeta('name', 'twitter:title', 'Intention is all you need — AIWEB', restorers);
    setMeta('name', 'twitter:description', DESCRIPTION, restorers);
    setMeta('name', 'twitter:image', v.share, restorers);

    addLink({ rel: 'canonical', href: v.canonical });
    addLink({ rel: 'alternate', type: 'text/plain', href: v.llms, title: 'llms.txt' });
    addLink({
      rel: 'alternate',
      type: 'application/ld+json',
      href: v.jsonld,
      title: 'JSON-LD',
    });
    addLink({
      rel: 'alternate',
      type: 'application/json',
      href: v.mcpFile,
      title: 'MCP descriptor',
    });
    addLink({
      rel: 'alternate',
      type: 'application/json',
      href: AIWEB_MCP_URL,
      title: 'AIWEB MCP',
    });
    addLink({ rel: 'alternate', type: 'application/json', href: v.openapi, title: 'OpenAPI' });
    addLink({ rel: 'alternate', type: 'application/json', href: v.actions, title: 'Actions' });
    addLink({
      rel: 'alternate',
      type: 'text/plain',
      href: v.chatgpt,
      title: 'ChatGPT instructions',
    });
    addLink({ rel: 'describedby', href: v.llms });

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ScholarlyArticle',
          '@id': `${v.canonical}#paper`,
          headline: 'Intention is all you need',
          name: 'Intention is all you need',
          description: DESCRIPTION,
          url: v.canonical,
          image: v.share,
          inLanguage: 'en',
          author: { '@type': 'Organization', name: 'The AI Web Company', url: origin },
          publisher: { '@type': 'Organization', name: 'The AI Web Company', url: origin },
          about: [
            'AIWEB',
            'route-by-intention',
            'Voice over AI',
            'Voice over AIWEB',
            'Media over AI',
            'AIWEB OS',
          ],
          sameAs: [
            'https://www.os.theaiwebcompany.com/whitepaper',
            'https://www.theaiwebcompany.com/whitepaper',
            'https://www.os.theaiwebcompany.com/irl/aiweb',
          ],
          potentialAction: {
            '@type': 'UseAction',
            name: 'Connect ChatGPT via MCP',
            target: AIWEB_MCP_URL,
          },
        },
        {
          '@type': 'EntryPoint',
          '@id': `${v.canonical}#mcp`,
          name: 'AIWEB MCP',
          url: AIWEB_MCP_URL,
          additionalType: AIWEB_MCP_ALIAS,
          description:
            'Streamable HTTP MCP for ChatGPT Developer Mode. Discover published businesses, send a Call, continue a Receipt, present media.',
        },
      ],
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-aiweb-vcap', '1');
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      restorers.forEach((fn) => fn());
      document.head.querySelectorAll('[data-aiweb-vcap="1"]').forEach((n) => n.remove());
    };
  }, []);
}
