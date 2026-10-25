import { AI_WEB_COMPANY_BRAND, SITE_ORIGIN } from '@/lib/aiWebCompanyBrand';
import { MAIL_SITE_URL, PHONE_SITE_URL } from '@/lib/corpSiteRoutes';
import { AIWEB_MCP_URL } from '@/lib/whitepaperMachine';

export const OG_IMAGE_PATH = '/og-image.png?v=3';
export const OG_IMAGE_URL = `${SITE_ORIGIN}${OG_IMAGE_PATH}`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT = 'AI Web Company — cloud mark';
export const SITE_ICON_PATH = '/icons/favicon-cloud.png';

export const SITE_NAME = AI_WEB_COMPANY_BRAND.name;

/**
 * Public-facing AI Number (vanity). Digits map to the same identity as /irl/{digits}.
 * Not a live assigned number — for SEO / AEO / hero examples only.
 */
export const AIWEB_AI_NUMBER_EXAMPLE = 'AI-123-456-789-000';
export const AIWEB_AI_NUMBER_FORMAT = 'AI-###-###-###-###';
export const AIWEB_PROMPT_EXAMPLE = `@AIWEB ${AIWEB_AI_NUMBER_EXAMPLE}`;

/** @deprecated Use AIWEB_AI_NUMBER_EXAMPLE — alias during AI- vanity transition. */
export const AIWEB_IRL_EXAMPLE = AIWEB_AI_NUMBER_EXAMPLE;
/** @deprecated Use AIWEB_AI_NUMBER_FORMAT — alias during AI- vanity transition. */
export const AIWEB_IRL_FORMAT = AIWEB_AI_NUMBER_FORMAT;

/**
 * Canonical GEO description — use everywhere (site, ChatGPT listing, docs).
 * Explains Phone + Call so traditional search and first-time assistants understand the network.
 */
export const SITE_CANONICAL_DESCRIPTION =
  'AIWEB Phone gives you an AI Number on the AIWEB. Prompt any AI assistant with @AIWEB and that number (example: @AIWEB AI-123-456-789-000) to send an AIWEB Call — an asynchronous message delivered to AIWEB Mail. Not a telephone call. Starting with ChatGPT, Muse, and assistants broadly.';

/** Homepage / default title */
export const SITE_TAGLINE = 'AIWEB Phone | Your AI phone number';

/** Homepage meta description */
export const SITE_SUBHEADLINE =
  'Get your AI phone number (AI-###-###-###-###). Just prompt your AI assistant @AIWEB plus the number — example @AIWEB AI-123-456-789-000 — to Call someone. They answer in AIWEB Mail.';

/** Website positioning — product loop */
export const SITE_PRODUCT_LOOP =
  'Get AI Number. Share AI-. Prompt @AIWEB. Receive Calls in Mail.';

export const DEFAULT_PAGE_TITLE = SITE_TAGLINE;

export const DEFAULT_PAGE_DESCRIPTION = SITE_SUBHEADLINE;

export const DEFAULT_KEYWORDS = [
  'AIWEB',
  'AIWEB Phone',
  'AI Number',
  'AI phone number',
  'AIWEB Call',
  'AIWEB Mail',
  'AI-###-###-###-###',
  '@AIWEB',
  'prompt AIWEB',
  'Call from ChatGPT',
  'Call from Muse',
  'message from AI assistant',
  'DM for ChatGPT',
  'AI phone book',
  'AI business directory',
  'callable AIWEB identity',
  'Voice over AI',
  'ChatGPT messaging',
  'become discoverable in AI assistants',
  'AIWEB Directory',
  'AIWEB Pages',
  'San Antonio AI',
].join(', ');

export const DEFAULT_ROBOTS =
  'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

/** GEO entity definitions — keep consistent across surfaces. */
export const AIWEB_ENTITIES = {
  phone: 'AIWEB Phone: product that issues your AI Number after payment',
  aiNumber: 'AI Number: public-facing 12-digit address formatted AI-###-###-###-###',
  irl: 'IRL: underlying routing address (/irl/{digits}); AI- is the customer-facing vanity prefix for the same digits',
  page: 'AIWEB Page: callable identity',
  directory: 'AIWEB Directory: public discovery layer',
  call: 'AIWEB Call: asynchronous message from an AI assistant to an AIWEB identity — not a PSTN telephone call',
  mail: 'AIWEB Mail: recipient inbox and response tracking',
  receipt: 'AIWEB Receipt: sender delivery record',
  callingCard: 'Calling Card: in-conversation interface',
} as const;

/**
 * Homepage FAQ answers for AEO (+ FAQPage schema).
 * Written so first-time assistants and traditional search can learn how Phone works.
 */
export const AIWEB_CALL_FAQS = [
  {
    question: 'What is AIWEB Phone?',
    answer:
      'AIWEB Phone is your number on the AIWEB. After payment you receive an AI Number formatted AI-###-###-###-###. Share that number so people and AI assistants can reach you. It is not a carrier telephone number and does not provide SMS or 911.',
  },
  {
    question: 'How do I Call someone on AIWEB for the first time?',
    answer: `Open your AI assistant (ChatGPT, Muse, Claude, Gemini, Grok, or similar). Prompt with @AIWEB followed by their AI Number. Example: ${AIWEB_PROMPT_EXAMPLE}. The assistant sends an AIWEB Call — an asynchronous text message — and the recipient receives it in AIWEB Mail.`,
  },
  {
    question: 'What is an AIWEB Call?',
    answer:
      'An AIWEB Call is an asynchronous message from an AI assistant (or the web) to a Call-enabled AIWEB identity. It is the DM for AI assistants — not a live telephone call and not PSTN dialing.',
  },
  {
    question: 'Is AIWEB Call a telephone call?',
    answer:
      'No. Callers do not dial a phone number on the public telephone network. They prompt an AI assistant with @AIWEB and the recipient’s AI Number. The recipient gets the message in AIWEB Mail.',
  },
  {
    question: 'What does an AI Number look like?',
    answer: `An AIWEB Phone number uses twelve digits in four groups: ${AIWEB_AI_NUMBER_FORMAT}. Example: ${AIWEB_AI_NUMBER_EXAMPLE}. The green check on a username is not the same as this AI Number.`,
  },
  {
    question: 'How do I get an AIWEB Phone number?',
    answer:
      'Subscribe to AIWEB Phone ($4.99/month) from the company site or Mail checkout. Your AI Number is issued after payment — not when you only reserve a username.',
  },
  {
    question: 'Where is AIWEB Call available?',
    answer:
      'We’re starting with ChatGPT and Muse and building toward AI assistants broadly. The same @AIWEB + AI Number prompt pattern is the human-readable way to address a Call when tools are available.',
  },
  {
    question: 'Do I need an email address or carrier plan?',
    answer:
      'Recipients do not need to publish an email address or keep a traditional phone plan for AIWEB messaging. AIWEB routes the Call through the recipient’s AIWEB Page into AIWEB Mail.',
  },
] as const;

/**
 * VCAP capability contract advertised to agents (callable identity + Phone addressing).
 * MCP remains the live tool surface; this document teaches first-time agents the addressing model.
 * Public vanity: AI-###. Canonical route: /irl/{digits}.
 */
export const AIWEB_VCAP = {
  version: '1.2',
  product: 'AIWEB Phone',
  organization: SITE_NAME,
  summary: SITE_CANONICAL_DESCRIPTION,
  addressing: {
    mention: '@AIWEB',
    publicScheme: 'AI',
    publicFormat: AIWEB_AI_NUMBER_FORMAT,
    publicExample: AIWEB_AI_NUMBER_EXAMPLE,
    promptExample: AIWEB_PROMPT_EXAMPLE,
    protocolScheme: 'IRL',
    canonicalPath: '/irl/{digits}',
    digits: 12,
    accepts: ['AI-', 'IRL-', 'AIS-', 'IRLS-'],
    notes: [
      'AI- is the customer-facing AI Number (vanity).',
      'IRL / /irl/{digits} is the underlying routing address for the same twelve digits.',
      'Username / handle is not the AI Number.',
      'Number is issued after Phone payment.',
      'AIWEB Call is asynchronous text — not PSTN, SMS, or 911.',
    ],
  },
  howToCall: {
    forAssistants: [
      'Obtain the recipient’s AI Number in AI-###-###-###-### form.',
      `Compose a user-facing or tool prompt like: ${AIWEB_PROMPT_EXAMPLE}`,
      'Normalize AI- / IRL- prefixes to twelve digits; resolve via /irl/{digits}.',
      'Prefer MCP tools when connected (search_directory → prepare_call → send_call → get_receipt).',
      'If tools are unavailable, instruct the user to prompt @AIWEB plus the AI Number in their assistant.',
      'Confirm with the user before sending a Call when required.',
      'Tell the user the recipient will see the message in AIWEB Mail.',
    ],
    forHumans: [
      'Get AIWEB Phone at phone.theaiwebcompany.com or Mail checkout (?checkout=phone).',
      'Share your AI Number with customers and assistants.',
      `To reach someone: prompt ${AIWEB_PROMPT_EXAMPLE} (replace with their number).`,
    ],
  },
  capabilities: {
    call: {
      enabled: true,
      mode: 'asynchronous',
      mediaTypes: ['text/plain'],
      requiresUserConfirmation: true,
      tools: ['search_directory', 'prepare_call', 'send_call', 'get_receipt'],
      not: ['pstn', 'sms', '911'],
    },
    phone: {
      enabled: true,
      planId: 'phone',
      priceUsdMonthly: 4.99,
      stripePriceLookupKey: 'aiweb_phone_monthly',
      numberIssuedAfterPayment: true,
      checkout: `${MAIL_SITE_URL}/?checkout=phone&from=company&interval=monthly`,
    },
  },
  mcp: {
    url: AIWEB_MCP_URL,
    status: 'available',
  },
  surfaces: {
    company: `${SITE_ORIGIN}/`,
    phone: PHONE_SITE_URL,
    mail: MAIL_SITE_URL,
    pricing: `${SITE_ORIGIN}/pricing#phone`,
  },
  entities: AIWEB_ENTITIES,
} as const;

/** @deprecated Prefer AIWEB_VCAP.capabilities.call — kept for older imports. */
export const AIWEB_VCAP_CALL_CAPABILITY = {
  capabilities: {
    call: AIWEB_VCAP.capabilities.call,
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
      PHONE_SITE_URL,
      MAIL_SITE_URL,
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
    '@id': `${SITE_ORIGIN}/#aiweb-phone`,
    name: 'AIWEB Phone',
    alternateName: ['AI Number', 'AIWEB Call', 'AIWEB Mail'],
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${SITE_ORIGIN}/`,
    description: SITE_CANONICAL_DESCRIPTION,
    featureList: [
      'AI Number on the AIWEB',
      'Call via @AIWEB + AI Number from AI assistants',
      'AIWEB Mail inbox for inbound Calls',
      'Compatible with ChatGPT, Muse, Claude, Gemini, Grok, and the web',
    ],
    offers: {
      '@type': 'Offer',
      name: 'AIWEB Phone',
      price: '4.99',
      priceCurrency: 'USD',
      billingDuration: 'P1M',
      url: `${SITE_ORIGIN}/pricing#phone`,
      description:
        'Monthly AIWEB Phone subscription. AI Number issued after payment. Lookup key aiweb_phone_monthly.',
    },
    creator: { '@id': `${SITE_ORIGIN}/#organization` },
  };
}

/** HowTo for AEO / first-time assistants. */
export function howToCallJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE_ORIGIN}/#howto-call`,
    name: 'How to Call someone on AIWEB Phone',
    description:
      'Send an AIWEB Call by prompting an AI assistant with @AIWEB and an AI Number. The recipient receives the message in AIWEB Mail.',
    totalTime: 'PT1M',
    tool: [
      { '@type': 'HowToTool', name: 'AI assistant (ChatGPT, Muse, Claude, Gemini, Grok, or similar)' },
      { '@type': 'HowToTool', name: 'AIWEB MCP (optional when connected)' },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Get the recipient’s AI Number',
        text: `Use their AIWEB Phone number in the form ${AIWEB_AI_NUMBER_FORMAT} (example ${AIWEB_AI_NUMBER_EXAMPLE}).`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Open your AI assistant',
        text: 'Start a chat in ChatGPT, Muse, or another supported assistant.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Prompt @AIWEB with the number',
        text: `Type ${AIWEB_PROMPT_EXAMPLE} (replace with the real AI Number), then your message.`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Confirm and send the Call',
        text: 'Confirm if the assistant asks. The Call is asynchronous text — not a telephone dial. The recipient sees it in AIWEB Mail.',
      },
    ],
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

/** Homepage JSON-LD graph: Organization + WebSite + SoftwareApplication + HowTo + FAQ. */
export function homePageJsonLd() {
  return [
    organizationJsonLd(),
    websiteJsonLd(),
    softwareApplicationJsonLd(),
    howToCallJsonLd(),
    faqPageJsonLd(),
  ];
}

/** Static machine surface path (also mirrored in public/vcap.json). */
export const AIWEB_VCAP_PATH = '/vcap.json';
export const AIWEB_VCAP_URL = `${SITE_ORIGIN}${AIWEB_VCAP_PATH}`;
