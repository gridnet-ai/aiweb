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

export const PROSPER_DECK_SLIDES = [
  {
    id: 'cover',
    section: 'Cover',
    kicker: PROSPER_META.program,
    title: 'AIWEB',
    lede: 'the communications network for AI assistants.',
    sub: "Healthcare's digital front door.",
    byline: `${PROSPER_META.founder} — ${PROSPER_META.founderRole}`,
  },
  {
    id: 'problem',
    section: 'The Problem',
    title: 'The problem',
    body: [
      'Patients now start their search for care inside AI assistants — asking Chat GPT, Claude, and Gemini who to see and how to reach them.',
      'Practices cannot be reached there. They guess instead: agency retainers, listings managed channel by channel, phone tag, web forms, and insurance directories so stale the industry calls them ghost networks.',
      'Administrative bottlenecks are where patient access goes to die.',
    ],
  },
  {
    id: 'founder',
    section: 'The Founder',
    title: 'The founder',
    body: [
      'One hospital. Four roles. All at the Audie L. Murphy VA Hospital, San Antonio.',
      'Biology, pre-med track — healthcare was the first direction.',
      '2016–2017 — Patient Escort, Nursing Services: the human front door.',
      '1,200+ hours — volunteer, same hospital.',
      '2017–2020 — Founder, Seibertronics: healthcare IT, federal contract, same hospital.',
      'U.S. Army Signal Corps (25U). Twenty years in IT.',
      'He has worked the access problem on foot. Now he is building it in software.',
    ],
  },
  {
    id: 'product',
    section: 'The Product',
    title: 'The product',
    lede: 'AIWEB gives every organization a public page assistants can find — its number — and a mailbox anyone can reach from inside the chat.',
    points: [
      {
        label: 'Find',
        text: 'the practice appears in Chat GPT, Claude, and the open web.',
      },
      {
        label: 'Call',
        text: 'the patient messages the practice directly. Nothing to install.',
      },
      {
        label: 'Mail',
        text: 'the practice answers from one inbox. One thread, with a receipt.',
      },
    ],
    note: 'Live today: AIWEB Call is an accepted plugin on Chat GPT.',
    image: {
      src: '/corporate/aiweb-healthcare-find-austin.jpg',
      alt: 'Chat GPT shows AIWEB healthcare matches for Find a dentist near me in Austin, TX, with Call on each practice card.',
    },
  },
  {
    id: 'proof',
    section: 'Proof',
    title: 'Proof',
    body: [
      'October 20, 2026 — the full loop, demonstrated live: the same business directory inside Muse as in Chat GPT; a call placed by tap; answered from the owner’s phone — “Good to go!”; the conversation continued on a single thread, badged by source.',
      'October 2, 2026 — the network’s first organic healthcare inquiry arrived before healthcare was a target: a clinic, seeking administrative FAQ and appointment communication.',
      'Not a concept. A working network, looking for its first vertical.',
    ],
  },
  {
    id: 'wedge',
    section: 'Healthcare Wedge',
    title: 'The healthcare wedge',
    body: [
      'The front door only — scoped on purpose: discovery + general and administrative inquiries. No clinical messaging, no patient health information in the current system.',
      'First practices: independent dental, vision, and small specialty — the segments Prosper’s own announcement names, alongside rural access and administrative bottlenecks.',
      'Behind the front door, practices keep their systems: scheduling, intake, EHR.',
      'Federal policy is moving the same direction — CMS payer APIs land 2026–2027.',
    ],
  },
  {
    id: 'field',
    section: 'The Field',
    title: 'The field',
    body: [
      'Zocdoc — a distributed booking channel. $35–$110 per new patient; now inside Gemini and Amazon Health AI. Closed deals, booked slots.',
      'EliseAI, Hyro, Assort — AI employees for the practice’s own front desk.',
      'Phreesia, NexHealth, Luma, Klara, Artera — depth on channels practices own.',
      'None of them sells the practice an open line into every assistant — a conversation the practice owns, for a flat subscription.',
      'That endpoint is unbuilt. It is what AIWEB is.',
    ],
  },
  {
    id: 'model',
    section: 'Business Model',
    title: 'Business model',
    body: [
      'Free to list. Free to message. The mailbox is the product.',
      'Seller $19.99/mo · Pro $49/mo · Business $500/mo.',
      'Metered AI work on top: drafting replies, preparing quotes, keeping the listing accurate across AI models.',
      'Healthcare follows the same shape — practice subscriptions, multi-location groups, later enterprise navigation agreements.',
      'We do not sell patients as leads. The practice owns its relationships.',
    ],
  },
  {
    id: 'roadmap',
    section: 'Boundaries & Roadmap',
    title: 'Boundaries & roadmap',
    lede: 'Said plainly: AIWEB is not a HIPAA channel today. No clinical pilot yet. No certifications claimed.',
    steps: [
      'Pilot the front door with 3–5 partner practices; measure inquiries, response time, and booked-visit conversion.',
      'Spec the HIPAA-ready tier with compliance guidance: data boundaries, business associate agreements, audit, retention.',
      'Convert pilots into the first paying healthcare customers.',
    ],
    note: 'Later: compliant clinical handoffs, payer navigation, provider groups.',
  },
  {
    id: 'prosper',
    section: 'Why Prosper',
    title: 'Why Prosper',
    body: [
      'Five teams. Healthcare partners who can validate a pilot’s scope.',
      'Birmingham — the founder is Mobile-born; Alabama is home ground.',
      'By Premiere Night: live practice pilots, a compliance architecture a health system can review, and the first paying healthcare customers on a network that already works.',
    ],
    close: {
      company: PROSPER_META.company,
      site: PROSPER_META.site,
      founder: `${PROSPER_META.founder}, ${PROSPER_META.founderRole}`,
    },
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
