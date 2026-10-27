/** Prosper HealthTech Accelerator — Spring 2027 application draft copy. */

export const PROSPER_META = {
  program: 'Prosper HealthTech Accelerator — Spring 2027',
  company: 'The AI Web Company',
  site: 'theaiwebcompany.com',
  founder: 'La Terrance “Terry” French',
  founderRole: 'Founder & CEO',
  deckPdf: '/corporate/AIWEB-Prosper-Deck-DRAFT-2026-10-20.pdf',
  summaryPdf: '/corporate/AIWEB-Executive-Summary-Prosper-DRAFT-2026-10-20.pdf',
} as const;

export const PROSPER_PHONE_EXAMPLE = {
  title: 'Example AI Phone Number',
  areaCodeLabel: 'Area code',
  areaCode: 'AI',
  numberLabel: 'Number',
  number: '123-456-789-000',
} as const;

export const PROSPER_PRODUCT_LOOP = {
  send: {
    label: 'Send',
    src: '/corporate/aiweb-healthcare-find-austin-cut.png',
    alt: 'Chat GPT shows AIWEB healthcare matches for Find a dentist near me in Austin, TX, with Call on each practice card.',
    sides: [
      {
        src: '/corporate/aiweb-patient-phone-stock.jpg',
        alt: 'Patient holding prescription bottles while checking their phone.',
      },
      {
        src: '/corporate/aiweb-patient-winter-phone.webp',
        alt: 'Patient with a cold looking at their phone.',
      },
      {
        src: '/corporate/aiweb-patient-elder-phone.png',
        alt: 'Older patient reading a message on their phone.',
      },
      {
        src: '/corporate/aiweb-patient-parent-thermometer.png',
        alt: 'Parent checking a child’s temperature at home.',
      },
    ],
  },
  receive: {
    label: 'Receive',
    src: '/corporate/aiweb-mailbox-iphone-mockup.png',
    alt: 'AIWEB Mail on iPhone — unified inbox of direct messages from ChatGPT, Claude, Gemini, Grok, Muse, and the web.',
    backdrop: {
      src: '/corporate/austin-family-health-clinic-card.jpg',
      alt: 'Austin Family Health Clinic calling card on AIWEB.',
    },
  },
} as const;

const PROSPER_PRODUCT_SLIDE_BODY = {
  note: 'Live today: AIWEB Call is an accepted plugin on Chat GPT.',
  noteIcon: {
    id: 'chatgpt',
    label: 'Chat GPT',
    src: '/images/promo/chatgpt-mark.png',
  },
  compatible: [
    { id: 'claude', label: 'Claude', src: '/images/promo/claude-mark.png' },
    { id: 'gemini', label: 'Gemini', src: '/images/promo/gemini-mark.png' },
    { id: 'grok', label: 'Grok', src: '/images/demo/workers/grok.png' },
    { id: 'muse', label: 'Muse', src: '/images/promo/muse-mark.png' },
    { id: 'web', label: 'Web', src: '/images/promo/web-mark.svg' },
  ],
} as const;

export const PROSPER_DECK_SLIDES = [
  {
    id: 'cover',
    section: 'Cover',
    tagline: 'The phone and phone book for AI assistants',
    loop: PROSPER_PRODUCT_LOOP,
    partners: [
      {
        id: 'google',
        label: 'Google for Startups',
        src: '/images/promo/google-for-startups.png',
      },
      {
        id: 'fi',
        label: 'Founder Institute',
        src: '/images/promo/founder-institute.png',
      },
    ],
  },
  {
    id: 'founder',
    section: 'The Founder',
    title: 'Founder',
    eyebrow: 'The AIWEB Company',
    lede: 'Military communications → IT Guy → Healthcare IT SMB → AI Startup Founder → Government HIT consultant → Launching the new global communication system Voice over AI',
    name: 'La Terrance D. French “Terry”',
    role: 'Founder & CEO',
    company: 'The AIWEB Company',
    portrait: {
      src: '/corporate/terry-french.jpg',
      alt: 'La Terrance “Terry” French speaking at a podium.',
      note: 'Speaking at UTSA School of Data Science Scooter Lab (2026)',
    },
    highlights: [
      {
        icon: 'tech',
        text: '20+ years in information technology, communications, and digital infrastructure.',
      },
      {
        icon: 'military',
        text: 'Former U.S. Army Signal Corps soldier (25U), with roots in communications systems during the rise of VoIP.',
      },
      {
        icon: 'health',
        text: 'Built healthcare IT and federal contracting experience, including work connected to the VA healthcare environment in San Antonio.',
      },
      {
        icon: 'venture',
        text: 'Founder and operator across multiple technology and digital ventures.',
      },
      {
        icon: 'build',
        text: 'Currently building AIWEB and Voice over AI (VoAI): communications infrastructure for businesses, people, and AI assistants.',
      },
    ],
    quote: {
      text: 'This is how I save the world.',
      by: 'Terry French, Founder & CEO',
    },
    employers: [
      {
        id: 'army',
        label: 'U.S. Army',
        src: '/images/promo/employer-logos/us-army.webp',
      },
      {
        id: '7eleven',
        label: '7-Eleven',
        src: '/images/promo/employer-logos/7-eleven.webp',
      },
      {
        id: 'papa-johns',
        label: "Papa John's",
        src: '/images/promo/employer-logos/papa-johns.png?v=2',
      },
      {
        id: 'amazon',
        label: 'Amazon',
        src: '/images/promo/employer-logos/amazon.jpg',
      },
      {
        id: 'vista',
        label: 'VISTA International Operations',
        src: '/images/promo/employer-logos/vista.jpg',
      },
      {
        id: 'metro-health',
        label: 'City of San Antonio Metro Health',
        src: '/images/promo/employer-logos/metro-health.png',
      },
      {
        id: 'va',
        label: 'U.S. Department of Veterans Affairs',
        src: '/images/promo/employer-logos/va.png',
      },
      {
        id: 'founder-institute',
        label: 'Founder Institute',
        src: '/images/promo/founder-institute.png',
      },
    ],
  },
  {
    id: 'problem',
    section: 'The Problem',
    title: 'The problem',
    assistants: [
      { id: 'chatgpt', label: 'Chat GPT', src: '/images/demo/workers/chatgpt.png' },
      { id: 'claude', label: 'Claude', src: '/images/promo/claude-mark.png' },
      { id: 'gemini', label: 'Gemini', src: '/images/promo/gemini-mark.png' },
      { id: 'grok', label: 'Grok', src: '/images/demo/workers/grok.png' },
      { id: 'muse', label: 'Muse', src: '/images/promo/muse-mark.png' },
      { id: 'web', label: 'Web', src: '/images/promo/web-mark.svg' },
    ],
    summaryStat: {
      value: '36%',
      text: 'of individuals use healthcare AI assistants specifically to research health information privately before or instead of consulting a traditional provider',
      textMobile:
        'use healthcare AI assistants to research health info privately before seeing a provider',
    },
    images: [
      {
        src: '/corporate/aiweb-patient-ai-search.png',
        alt: 'A patient searches for care on a phone, the way care discovery starts inside AI assistants.',
        label: 'Looking up care',
      },
      {
        src: '/corporate/aiweb-patient-cold-phone.webp',
        alt: 'A person with a cold checks their phone for health answers before calling a practice.',
        label: 'Feeling sick',
      },
      {
        src: '/corporate/aiweb-patient-parent-thermometer-crop.webp',
        alt: 'A parent checks a thermometer for a crying child, then turns to a phone for the next step.',
        label: 'Caring for family',
      },
      {
        src: '/corporate/aiweb-patient-meds-phone.jpg',
        alt: 'A patient compares prescription bottles with information on a phone.',
        label: 'Checking medicine',
      },
    ],
  },
  {
    id: 'solution',
    section: 'The Solution',
    title: 'The solution',
    lede: 'Expand healthcare access for stronger communities by meeting people where they are.',
    note: PROSPER_PRODUCT_SLIDE_BODY.note,
    noteIcon: PROSPER_PRODUCT_SLIDE_BODY.noteIcon,
    compatible: PROSPER_PRODUCT_SLIDE_BODY.compatible,
    visual: {
      src: '/corporate/aiweb-healthcare-access-community.png',
      alt: 'A patient smiles across the reception desk in a community healthcare setting.',
    },
  },
  {
    id: 'product',
    section: 'The Product',
    title: PROSPER_PHONE_EXAMPLE.title,
    phoneParts: {
      areaCodeLabel: PROSPER_PHONE_EXAMPLE.areaCodeLabel,
      areaCode: PROSPER_PHONE_EXAMPLE.areaCode,
      numberLabel: PROSPER_PHONE_EXAMPLE.numberLabel,
      number: PROSPER_PHONE_EXAMPLE.number,
    },
    lede: 'The AI Phone number allows you to contact your healthcare provider from inside your personal AI assistant.',
    ...PROSPER_PRODUCT_SLIDE_BODY,
    mascot: {
      src: '/corporate/aiweb-phone-relaxing-bear.png',
      alt: 'AIWEB Phone bear, relaxing.',
    },
    loop: PROSPER_PRODUCT_LOOP,
  },
  {
    id: 'howitworks',
    section: 'How it works',
    title: 'How patients Call',
    chat: {
      phone: {
        src: '/corporate/aiweb-healthcare-find-austin-phone.jpg',
        alt: 'ChatGPT on a phone showing AIWEB healthcare matches for Find a dentist near me in Austin, TX, with Call on each practice card.',
      },
      callingCard: {
        src: '/corporate/austin-family-health-clinic-card.jpg',
        alt: 'Austin Family Health Clinic Calling Card with AI-123-456-789-000.',
        label: 'Calling Card',
      },
      phoneExample: PROSPER_PHONE_EXAMPLE,
      flow: [
        { id: 'chat', label: 'Patient chats with personal AI assistant' },
        { id: 'cards', label: 'Calling cards appear in the answer' },
        { id: 'select', label: 'Select' },
        {
          id: 'call',
          label: 'Call provider',
          channels: [
            { id: 'text', label: 'Text' },
            { id: 'image', label: 'Image' },
            { id: 'voice', label: 'Voice message' },
            { id: 'video', label: 'Video' },
          ],
        },
        { id: 'callback', label: 'Provider calls back' },
      ],
    },
  },
  {
    id: 'competition',
    section: 'Competitive Landscape',
    title: 'The Competitive Landscape',
    channels: [
      { id: 'chatgpt', label: 'Chat GPT', src: '/images/demo/workers/chatgpt.png' },
      { id: 'claude', label: 'Claude', src: '/images/promo/claude-mark.png' },
      { id: 'gemini', label: 'Gemini', src: '/images/promo/gemini-mark.png' },
      { id: 'grok', label: 'Grok', src: '/images/demo/workers/grok.png' },
      { id: 'muse', label: 'Muse', src: '/images/promo/muse-mark.png' },
      { id: 'web', label: 'Web', src: '/images/promo/web-mark.svg' },
    ],
    categories: [
      {
        name: 'Patient-facing search & discovery',
        competitors: [
          { id: 'zocdoc', label: 'Zocdoc', src: '/images/promo/competitors/zocdoc.png' },
          { id: 'healthgrades', label: 'Healthgrades', src: '/images/promo/competitors/healthgrades.png' },
          { id: 'google', label: 'Google', src: '/images/promo/competitors/google.png' },
          { id: 'solv', label: 'Solv', src: '/images/promo/competitors/solv.png' },
        ],
        // Practice-controlled endpoint across assistants / open web — not their model.
        reach: [false, false, false, false, false, true],
      },
      {
        name: 'Provider search infrastructure',
        competitors: [
          { id: 'kyruus', label: 'Kyruus Health', src: '/images/promo/competitors/kyruus.png' },
        ],
        reach: [false, false, false, false, false, false],
      },
      {
        name: 'EHR-native gateways',
        competitors: [
          { id: 'mychart', label: 'Epic MyChart', src: '/images/promo/competitors/mychart.png' },
          { id: 'oracle', label: 'Oracle Health', src: '/images/promo/competitors/oracle.png' },
          { id: 'athenahealth', label: 'athenahealth', src: '/images/promo/competitors/athenahealth.png' },
        ],
        reach: [false, false, false, false, false, true],
      },
      {
        name: 'Patient engagement platforms',
        competitors: [
          { id: 'luma', label: 'Luma Health', src: '/images/promo/competitors/luma.png' },
          { id: 'artera', label: 'Artera', src: '/images/promo/competitors/artera.png' },
          { id: 'phreesia', label: 'Phreesia', src: '/images/promo/competitors/phreesia.png' },
        ],
        reach: [false, false, false, false, false, true],
      },
      {
        name: 'AI voice patient interface',
        competitors: [
          { id: 'assort', label: 'Assort Health', src: '/images/promo/competitors/assort.png' },
        ],
        reach: [false, false, false, false, false, false],
      },
      {
        name: 'AI assistant search, discover & message',
        competitors: [
          { id: 'aiweb', label: 'AIWEB', src: '/images/promo/aiweb-call-mark.png' },
        ],
        reach: [true, true, true, true, true, true],
      },
    ],
    objection: {
      question: 'Why wouldn’t Zocdoc, Epic, or Google simply add this feature?',
      observations: [
        {
          label: 'Google — Discovery',
          text: 'Strong at helping users find information and services, primarily inside Google’s ecosystem — including growing agentic search and actions.',
        },
        {
          label: 'Zocdoc - Browser directory',
          text: 'Connects patients with providers for appointments, reminders, and patient communications. Core model: find and book care.',
        },
        {
          label: 'Epic — Patient relationships',
          text: 'MyChart supports discovery, scheduling, and communication inside participating organizations. Strength: EHR-integrated relationships.',
        },
      ],
    },
  },
  {
    id: 'whynow',
    section: 'Why Now?',
    title: 'When was the last time you looked for a doctor?',
    subhead: 'Did you search Google, ask a friend, or ask AI?',
    stat: {
      value: '47%',
      text: 'of surveyed U.S. patients have used AI to research or find a healthcare provider.',
      trend: 'Up from 31% in 2025.',
    },
    photo: {
      src: '/corporate/aiweb-why-now-patient-phone.png',
      alt: 'A patient at home researches care on a smartphone.',
    },
    close: 'Patients are changing how they find care. Healthcare communication needs to catch up.',
    source: {
      label: 'Source: rater8, 2026 Patient Choice Report (n=992).',
      href: 'https://rater8.com/2026-patient-choice-report/',
    },
  },
  {
    id: 'market',
    section: 'Market',
    title: 'Market',
    lede: 'A flat subscription for the practice’s line into every AI assistant — not a per-lead tax on patients.',
    layers: [
      {
        tier: 'TAM',
        value: '$48B',
        label: 'US patient acquisition & digital front door',
        detail:
          'What healthcare organizations spend to be found and contacted — search, listings, engagement platforms, and call centers.',
      },
      {
        tier: 'SAM',
        value: '$6.2B',
        label: 'Independent dental, vision & specialty',
        detail:
          'Practices that buy discovery and front-desk tools without an enterprise EHR-owned channel into AI assistants.',
      },
      {
        tier: 'SOM',
        value: '$2B',
        label: 'Beachhead ARR at Business ARPU',
        detail:
          '~333,000 US practices × $500/mo × 12 = $2B ARR — the first wave AIWEB for Health can reach as patients start care in chat.',
      },
    ],
    note: 'Start where the front door is still owned by the practice. Expand as VoAI becomes how patients ask who to call.',
  },
  {
    id: 'model',
    section: 'Revenue Model',
    title: 'Revenue model',
    lede: 'Businesses pay to publish calling cards and be discovered across AI assistants and the web.',
    plans: [
      {
        id: 'phone',
        name: 'Phone',
        price: '$4.99/mo',
        audience: 'Your number on the AIWEB',
        badge: 'Beta launch',
        recommended: false,
        features: [
          'AI Number (AI-###-###-###-###)',
          'Unlimited calls, user to user',
          'Unlimited AIWEB Page + Mail box',
          'Call or tell an AI agent to search AIWEB.',
        ],
      },
      {
        id: 'individual',
        name: 'Individual',
        price: '$100/mo',
        audience: 'For small business individuals',
        recommended: false,
        features: [
          'Publish a calling card.',
          'Be discoverable on AIWEB.',
          'Receive messages through AIWEB Mail.',
          'Best for solo operators and small local businesses.',
        ],
      },
      {
        id: 'business',
        name: 'Business',
        price: '$500/mo',
        audience: 'For agencies or teams that work for the practice',
        recommended: true,
        features: [
          'Built for healthcare practice teams, marketing agencies, and managed service partners.',
          'Publish practice calling cards.',
          'Centralize inbound messages from AI assistants and the web.',
          'Best for practices averaging $2M+ ARR.',
        ],
      },
    ],
    note: 'AIWEB Phone is $4.99/mo at beta launch. Businesses pay to publish verified calling cards so they can be discovered and contacted.',
  },
  {
    id: 'roadmap',
    section: 'Roadmap',
    title: 'From working network to trusted healthcare adoption',
    lede: 'Build the network, verify practices, establish trust controls, then scale.',
    phases: [
      {
        id: 'prove',
        when: 'NOW · 2026',
        number: '01',
        title: 'Prove VoAI',
        focus: 'Network + security',
        status: 'Live product / fixes in progress',
        current: true,
        points: [
          'Find, Call, receipt & Mail',
          'Close critical access, MCP abuse and secrets gaps',
        ],
      },
      {
        id: 'verify',
        when: 'NEXT · Q4 2026',
        number: '02',
        title: 'Verify the directory',
        focus: 'San Antonio launch',
        status: 'Planned',
        current: false,
        points: [
          'Review and verify healthcare practices',
          'Publish owner-approved calling cards; define PHI restrictions',
        ],
      },
      {
        id: 'validate',
        when: '2027 · PILOT',
        number: '03',
        title: 'Validate healthcare',
        focus: 'Nonclinical inquiries only',
        status: 'Target',
        current: false,
        points: [
          '3–5 administrative practice pilots',
          'Test $100 Individual / $500 Business pricing',
        ],
      },
      {
        id: 'scale',
        when: '2027+ · EXPAND',
        number: '04',
        title: 'Scale the network',
        focus: 'Metro-by-metro',
        status: 'Long-term goal',
        current: false,
        points: [
          'Expand verified practice coverage',
          'Pursue SOC 2 audit; HIPAA track only if funded and required',
        ],
      },
    ],
    trustGates: {
      label: 'Trust gates',
      path: [
        'Security + privacy controls',
        'SOC 2 Type I / II readiness + independent audit',
        'HIPAA-capable track before any PHI',
      ],
      disclaimer:
        'No SOC 2 attestation or HIPAA compliance is claimed; HIPAA depends on a separate legal, technical and funding decision.',
    },
  },
  {
    id: 'contact',
    section: 'Contact',
    title: 'Contact',
    logo: {
      src: '/images/promo/aiweb-logo-black.png',
      alt: 'aiweb',
    },
    company: PROSPER_META.company,
    site: PROSPER_META.site,
    email: 'support@theaiwebcompany.com',
    founder: `${PROSPER_META.founder}, ${PROSPER_META.founderRole}`,
    socials: [
      {
        id: 'x',
        label: 'X',
        handle: '@theaiwebcompany',
        href: 'https://x.com/theaiwebcompany',
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        handle: 'The AI Web Company',
        href: 'https://www.linkedin.com/company/the-ai-web-company',
      },
      {
        id: 'instagram',
        label: 'Instagram',
        handle: '@theaiwebcompany',
        href: 'https://www.instagram.com/theaiwebcompany',
      },
      {
        id: 'youtube',
        label: 'YouTube',
        handle: '@theaiwebcompany',
        href: 'https://www.youtube.com/@theaiwebcompany',
      },
    ],
  },
] as const;

export const PROSPER_EXEC_SUMMARY = {
  title: 'Executive Summary',
  subtitle: PROSPER_META.program,
  paragraphs: [
    'Patients now start their search for care inside AI assistants — asking Chat GPT, Claude, or Gemini who to see, who is taking new patients, and how to reach them. Healthcare organizations have no direct line into that conversation. They guess: paying agencies and visibility retainers, maintaining listings channel by channel, and losing inquiries to phone tag, web forms, and stale insurance directories. Administrative bottlenecks are where patient access goes to die.',
    'AIWEB is the communications network for the AI era: a public directory of verified organizational pages that AI assistants can read, and a mailbox that lets any person, from any assistant or the open web, start a direct conversation with the organization — no app to install, no per-lead fee, one persistent thread with a receipt. The assistants are the phones. The AI web pages are the numbers. The AI Web is the network that makes them ring. The product is live, not a concept: AIWEB Call is an accepted plugin on Chat GPT; the same directory and two-way messaging were demonstrated across assistants on October 20, 2026, and the network’s first organic healthcare inquiry — from a clinic seeking administrative FAQ and appointment communication — arrived on October 2, before healthcare was a target market.',
    'The founder has worked this problem from inside the building. La Terrance “Terry” French studied biology on a pre-med track, then worked at the Audie L. Murphy VA Hospital in San Antonio as a patient escort in nursing services (2016–2017) and volunteered 1,200+ hours there, before founding and operating Life Over Ethernet Technologies LLC (Seibertronics, 2017–2020), a healthcare IT company that served the same hospital under federal contract. An Army Signal Corps veteran (25U) with two decades in IT, he has since built the AIWEB network — roughly one million lines of code, largely solo — including its directory, calling, mail, and measurement systems.',
    'The healthcare opportunity is the front door: make independent practices — dental, vision, and small specialty first — discoverable and directly reachable from AI assistants for general and administrative inquiries, with clinical communication explicitly out of scope until a HIPAA-ready architecture, business associate agreements, and partner-validated workflows exist. AIWEB complements the systems practices already run (scheduling, intake, EHR); it does not replace them. Incumbents validate the direction — Zocdoc’s 2026 Care Access Network syndicates booking into Gemini and Amazon — while leaving the open, conversation-first endpoint unbuilt: Zocdoc sells bookings per patient; front-desk agent companies automate channels a practice already owns. Nobody sells the practice its own line into every assistant.',
    'The business model is deliberately simple: listings are free, messaging is free, and organizations pay a flat mailbox subscription (currently $19.99–$500/month by tier). We do not sell patients as leads. The company is pre-revenue, with free users on the live network and a $500,000 pre-seed raise as the current target.',
    'Prosper HealthTech is the right place to test the vertical: five teams, healthcare partners who can validate a front-door pilot’s scope, and a Birmingham ecosystem anchored by UAB. Our program objectives: (1) launch scoped discovery-and-inquiry pilots with three to five partner practices; (2) define, with compliance guidance, the HIPAA-ready tier of the network; (3) convert pilots into the company’s first paying healthcare customers. We are not a healthcare company asking permission to enter technology. We are a communications network whose founder started in a hospital — asking to be introduced to the industry he came from.',
  ],
} as const;
