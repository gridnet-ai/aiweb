const ICON_VERSION = '5';
const v = (path: string): string => `${path}?v=${ICON_VERSION}`;

export type CrawlerFamilyBrandMeta = {
  logo: string;
  logoDark?: string;
  name: string;
};

const OPENAI: CrawlerFamilyBrandMeta = {
  logo: v('/icons/isp/ChatGPT-Logo-black.svg'),
  logoDark: v('/icons/isp/chat-gpt-logo-white.svg'),
  name: 'OpenAI',
};
const ANTHROPIC: CrawlerFamilyBrandMeta = {
  logo: v('/icons/isp/claude.png'),
  name: 'Anthropic',
};
const PERPLEXITY: CrawlerFamilyBrandMeta = {
  logo: v('/icons/isp/perplexity.png'),
  name: 'Perplexity',
};
const GOOGLE: CrawlerFamilyBrandMeta = {
  logo: v('/icons/marketing/publish/google.svg'),
  name: 'Google',
};
const BING: CrawlerFamilyBrandMeta = {
  logo: v('/icons/isp/copilot.png'),
  name: 'Microsoft Bing',
};
const AMAZON: CrawlerFamilyBrandMeta = {
  logo: 'https://www.google.com/s2/favicons?domain=amazon.com&sz=128',
  name: 'Amazon',
};
const META: CrawlerFamilyBrandMeta = {
  logo: v('/icons/isp/meta.png'),
  name: 'Meta',
};
const COMMON_CRAWL: CrawlerFamilyBrandMeta = {
  logo: v('/icons/isp/domain.jpg'),
  name: 'Common Crawl',
};
const HUMAN: CrawlerFamilyBrandMeta = {
  logo: v('/icons/analyzer/human-traffic.svg'),
  logoDark: v('/icons/analyzer/human-traffic-dark.svg'),
  name: 'Human',
};
const UNKNOWN_BOT: CrawlerFamilyBrandMeta = {
  logo: v('/icons/analyzer/unknown-bot.svg'),
  logoDark: v('/icons/analyzer/unknown-bot-dark.svg'),
  name: 'Unknown bot',
};

export const WEB4_PAGE_BRAND: CrawlerFamilyBrandMeta = {
  logo: v('/marketing/web4/w4p-logo.png'),
  name: 'Web 4.0 Page',
};

export function crawlerFamilyBrand(family: string): CrawlerFamilyBrandMeta | null {
  if (family.startsWith('openai')) return OPENAI;
  if (family.startsWith('anthropic')) return ANTHROPIC;
  if (family === 'perplexity') return PERPLEXITY;
  if (family === 'google' || family === 'google_extended') return GOOGLE;
  if (family === 'bing') return BING;
  if (family === 'amazon') return AMAZON;
  if (family === 'meta' || family === 'meta_externalagent') return META;
  if (family === 'common_crawl') return COMMON_CRAWL;
  if (family === 'duckduckbot') {
    return { logo: 'https://www.google.com/s2/favicons?domain=duckduckgo.com&sz=128', name: 'DuckDuckGo' };
  }
  if (family === 'yahoo_slurp') {
    return { logo: 'https://www.google.com/s2/favicons?domain=yahoo.com&sz=128', name: 'Yahoo' };
  }
  if (family === 'applebot' || family === 'applebot_extended') {
    return { logo: 'https://www.google.com/s2/favicons?domain=apple.com&sz=128', name: 'Apple' };
  }
  if (family === 'linkedinbot') {
    return { logo: 'https://www.google.com/s2/favicons?domain=linkedin.com&sz=128', name: 'LinkedIn' };
  }
  if (family === 'twitterbot') {
    return { logo: 'https://www.google.com/s2/favicons?domain=x.com&sz=128', name: 'X' };
  }
  if (family === 'bytespider') {
    return { logo: 'https://www.google.com/s2/favicons?domain=tiktok.com&sz=128', name: 'ByteDance' };
  }
  if (family === 'semrushbot') {
    return { logo: 'https://www.google.com/s2/favicons?domain=semrush.com&sz=128', name: 'Semrush' };
  }
  if (family === 'petalbot') {
    return { logo: 'https://www.google.com/s2/favicons?domain=huawei.com&sz=128', name: 'Huawei' };
  }
  if (family === 'internet_archive') {
    return { logo: 'https://www.google.com/s2/favicons?domain=archive.org&sz=128', name: 'Internet Archive' };
  }
  if (family === 'cohere') {
    return { logo: 'https://www.google.com/s2/favicons?domain=cohere.com&sz=128', name: 'Cohere' };
  }
  if (family === 'yandexbot') {
    return { logo: 'https://www.google.com/s2/favicons?domain=yandex.com&sz=128', name: 'Yandex' };
  }
  if (family === 'ahrefsbot') {
    return { logo: 'https://www.google.com/s2/favicons?domain=ahrefs.com&sz=128', name: 'Ahrefs' };
  }
  if (family === 'unknown_bot' || family === 'other_bot') return UNKNOWN_BOT;
  if (family === 'human') return HUMAN;
  return null;
}
