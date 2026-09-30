import { AI_WEB_COMPANY_BRAND, SITE_ORIGIN } from '@/lib/aiWebCompanyBrand';

export const OG_IMAGE_PATH = '/og-image.png?v=3';
export const OG_IMAGE_URL = `${SITE_ORIGIN}${OG_IMAGE_PATH}`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT = 'AI Web Company — cloud mark';
export const SITE_ICON_PATH = '/icons/favicon-cloud.png';

export const SITE_NAME = AI_WEB_COMPANY_BRAND.name;

/** Canonical GEO description — use everywhere (site, ChatGPT listing, docs). */
export const SITE_CANONICAL_DESCRIPTION =
  'AIWEB Call is the DM for ChatGPT. Find a person or business, send them a message from the chat, and track the response in AIWEB Mail. We’re starting with ChatGPT and building toward AI assistants broadly.';

/** Homepage / default title */
export const SITE_TAGLINE = 'AIWEB Call | The DM for ChatGPT';

/** Homepage meta description */
export const SITE_SUBHEADLINE =
  'Find a person or business, send them a message from the chat, and track the response in AIWEB Mail. We’re starting with ChatGPT and building toward AI assistants broadly.';

/** Website positioning — product loop */
export const SITE_PRODUCT_LOOP =
  'Find. Message. Track in Mail. Starting with ChatGPT.';

export const DEFAULT_PAGE_TITLE = SITE_TAGLINE;

export const DEFAULT_PAGE_DESCRIPTION = SITE_SUBHEADLINE;

export const DEFAULT_KEYWORDS = [
  'AIWEB',
  'AIWEB Call',
  'DM for ChatGPT',
  'message from ChatGPT',
  'ChatGPT messaging',
  'message a business from ChatGPT',
  'contact people through AI assistants',
  'AI business directory',
  'AI phone book',
  'business listing for ChatGPT',
  'become discoverable in AI assistants',
  'AIWEB Directory',
  'AIWEB Pages',
  'AIWEB Mail',
  'callable AIWEB identity',
  'ChatGPT',
  'San Antonio AI',
].join(', ');

export const DEFAULT_ROBOTS =
  'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

/** GEO entity definitions — keep consistent across surfaces. */
export const AIWEB_ENTITIES = {
  page: 'AIWEB Page: callable identity',
  directory: 'AIWEB Directory: public discovery layer',
  call: 'AIWEB Call: the DM for ChatGPT — asynchronous message from chat',
  mail: 'AIWEB Mail: recipient inbox and response tracking',
  receipt: 'AIWEB Receipt: sender delivery record',
  callingCard: 'Calling Card: in-conversation interface',
} as const;

/** Homepage FAQ answers for AEO (+ FAQPage schema). */
export const AIWEB_CALL_FAQS = [
  {
    question: 'What is an AIWEB Call?',
    answer:
      'AIWEB Call is the DM for ChatGPT. Find a person or business, send them a message from the chat, and track the response in AIWEB Mail. It is an asynchronous message to a Call-enabled AIWEB Page—not a telephone call.',
  },
  {
    question: 'Is AIWEB Call a telephone call?',
    answer:
      'No. AIWEB Call does not require the caller to find or dial the recipient’s phone number. The recipient receives the message in AIWEB Mail.',
  },
  {
    question: 'How do I become callable?',
    answer:
      'Publish an AIWEB Page, claim or verify its identity, enable Calls and appear in the AIWEB Directory.',
  },
  {
    question: 'Where is AIWEB Call available?',
    answer:
      'We’re starting with ChatGPT and building toward AI assistants broadly. AIWEB Call is currently available in ChatGPT.',
  },
  {
    question: 'Do I need an email address?',
    answer:
      'The recipient does not need to publish an email address. AIWEB routes the Call through the recipient’s AIWEB Page.',
  },
] as const;

/** VCAP capability contract advertised to agents (callable identity). */
export const AIWEB_VCAP_CALL_CAPABILITY = {
  capabilities: {
    call: {
      enabled: true,
      mode: 'asynchronous',
      mediaTypes: ['text/plain'],
      requiresUserConfirmation: true,
      tools: ['search_directory', 'prepare_call', 'send_call', 'get_receipt'],
    },
  },
} as const;

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: SITE_NAME,
    alternateName: 'AIWEB',
    url: `${SITE_ORIGIN}/`,
    logo: `${SITE_ORIGIN}${SITE_ICON_PATH}`,
    description: SITE_CANONICAL_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Antonio',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.theaiwebapp.com',
      'https://bigsearchai.com',
      'https://publishtoai.com',
      'https://www.os.theaiwebcompany.com',
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    name: 'AIWEB',
    url: `${SITE_ORIGIN}/`,
    description: SITE_CANONICAL_DESCRIPTION,
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    inLanguage: 'en-US',
  };
}

export function softwareApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_ORIGIN}/#aiweb-call`,
    name: 'AIWEB Call',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${SITE_ORIGIN}/`,
    description: SITE_CANONICAL_DESCRIPTION,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: { '@id': `${SITE_ORIGIN}/#organization` },
  };
}

export function faqPageJsonLd(
  faqs: readonly { question: string; answer: string }[] = AIWEB_CALL_FAQS,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_ORIGIN}/#faq`,
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/** Homepage JSON-LD graph: Organization + WebSite + SoftwareApplication + FAQ. */
export function homePageJsonLd() {
  return [organizationJsonLd(), websiteJsonLd(), softwareApplicationJsonLd(), faqPageJsonLd()];
}
