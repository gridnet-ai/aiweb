import type { PublisherStoryId } from '@/demo/quoteReplayStories';
import type { AiwebOsMailConfig } from './AiwebOsMailScene';
import {
  ALL_DRESS_GALLERY,
  BLACK_DRESS_IMAGES,
  PINK_DRESS_IMAGES,
  PROJECTS,
  SNAPSHOT,
  type DressImage,
} from './constants';

export type AiwebOsMediaImage = DressImage;

export type AiwebOsPreviewContent = {
  projectTitle: string;
  previewTitle: string;
  heroKicker: string;
  heroName: string;
  heroDesc: string;
  pills: string[];
  snapshot: ReadonlyArray<readonly [string, string]>;
  heroImage?: string;
  heroPlaceholder?: 'catering' | 'plumbing' | 'album';
};

export type AiwebOsStoryConfig = {
  hasMedia: boolean;
  buildImages: AiwebOsMediaImage[];
  updateImages: AiwebOsMediaImage[];
  builtGallery: AiwebOsMediaImage[];
  fullGallery: AiwebOsMediaImage[];
  build: {
    userPrompt: string;
    response: string;
    thoughts: readonly string[];
    attachLabel: string;
    preview: AiwebOsPreviewContent;
  };
  update: {
    userPrompt: string;
    response: string;
    thoughts: readonly string[];
    attachLabel: string;
    preview: AiwebOsPreviewContent;
  };
  publish: {
    userPrompt: string;
    chatgptQuestion: string;
    response: string;
    liveUrl: string;
    preview: AiwebOsPreviewContent;
  };
  mail: AiwebOsMailConfig;
  demos: {
    build: { title: string; description: string };
    update: { title: string; description: string };
    publish: { title: string; description: string };
    mail: { title: string; description: string };
  };
};

const SHOPPER_CONFIG: AiwebOsStoryConfig = {
  hasMedia: true,
  buildImages: [...BLACK_DRESS_IMAGES],
  updateImages: [...PINK_DRESS_IMAGES],
  builtGallery: [...BLACK_DRESS_IMAGES],
  fullGallery: ALL_DRESS_GALLERY,
  build: {
    userPrompt: 'Build a new AIWEB page for this black dress.',
    response:
      'Done — your AIWEB Page for the Janhvi Maxi Dress is built. Retail intelligence, hero, pricing signals and gallery are in place. Do you want to publish that AIWEB Page?',
    thoughts: [
      'Deploying AI worker agents across the canvas…',
      'Structuring retail intelligence fields…',
      'Applying hero layout and pricing signals…',
      'Finalizing machine-readable page…',
    ],
    attachLabel: '4 photos · Janhvi Maxi Dress',
    preview: {
      projectTitle: PROJECTS[0].title,
      previewTitle: 'NBD Janhvi Maxi Dress — Retail Intelligence',
      heroKicker: 'AIWEB Retail Intelligence',
      heroName: 'Janhvi Maxi Dress',
      heroDesc: 'The intelligence behind the sparkle.',
      pills: ['Black · $278 observed', 'Hot Pink · $262 observed', 'XXS–XL displayed'],
      snapshot: SNAPSHOT,
      heroImage: BLACK_DRESS_IMAGES[0].src,
    },
  },
  update: {
    userPrompt: 'Update the AIWEB page with these hot pink dress photos.',
    response:
      'Updated — black and hot pink Janhvi Maxi Dress variations are both live on your AIWEB Page. Gallery, hero and pricing signals refreshed. Do you want to publish this update?',
    thoughts: [
      'Adding hot pink photos alongside black…',
      'Expanding gallery with both colorways…',
      'Updating dual hero and pricing signals…',
      'Finalizing both dress variations…',
    ],
    attachLabel: '4 photos · Hot pink variation',
    preview: {
      projectTitle: PROJECTS[0].title,
      previewTitle: 'NBD Janhvi Maxi Dress — Retail Intelligence',
      heroKicker: 'AIWEB Retail Intelligence',
      heroName: 'Janhvi Maxi Dress',
      heroDesc: 'The intelligence behind the sparkle.',
      pills: ['Black · $278 observed', 'Hot Pink · $262 observed', 'XXS–XL displayed'],
      snapshot: SNAPSHOT,
      heroImage: BLACK_DRESS_IMAGES[0].src,
    },
  },
  publish: {
    userPrompt: 'Yes, publish the AIWEB page.',
    chatgptQuestion:
      'Your AIWEB Page for the Janhvi Maxi Dress is ready — black and hot pink variations included. Do you want to publish that AIWEB Page?',
    response:
      'Published — your AIWEB Page is live at janhvi-maxi-dress.theaiwebcompany.com. Machine-readable retail intelligence is now discoverable by AI.',
    liveUrl: 'janhvi-maxi-dress.theaiwebcompany.com',
    preview: {
      projectTitle: PROJECTS[0].title,
      previewTitle: 'NBD Janhvi Maxi Dress — Retail Intelligence',
      heroKicker: 'AIWEB Retail Intelligence',
      heroName: 'Janhvi Maxi Dress',
      heroDesc: 'The intelligence behind the sparkle.',
      pills: ['Black · $278 observed', 'Hot Pink · $262 observed', 'XXS–XL displayed'],
      snapshot: SNAPSHOT,
      heroImage: BLACK_DRESS_IMAGES[0].src,
    },
  },
  mail: {
    inbox: [
      {
        id: 'maya',
        initials: 'MC',
        name: 'Maya Chen',
        source: 'ChatGPT · mcp · call',
        preview: 'Incoming call · 415-555-0192',
        time: 'now',
      },
      {
        id: 'sue',
        initials: 'SF',
        name: 'Sue Frank',
        source: 'Browser · request_quote',
        preview: 'Phone 5551234567',
        time: '2d',
      },
      {
        id: 'john',
        initials: 'JS',
        name: 'John Smith',
        source: 'ChatGPT · mcp · request_quote',
        preview: 'Phone 5559876543',
        time: 'Aug 22',
      },
    ],
    featuredLeadId: 'maya',
    pageUrl: 'janhvi-maxi-dress.theaiwebcompany.com',
    incomingMessage:
      'Sep 1, 2026, 2:48 PM\n\nIncoming call · Get Quote\nJanhvi Maxi Dress · Hot Pink\n\nSummer wedding guest · size M\n\nPhone 415-555-0192',
    incomingMeta: 'Maya Chen · incoming call',
    threadSource: 'ChatGPT · mcp · call · janhvi-maxi-dress.theaiwebcompany.com',
    callbackMessage:
      'Thank you for your interest! The Hot Pink Janhvi Maxi is in stock in size M. Would you like to schedule a try-on this week?',
  },
  demos: {
    build: {
      title: 'Build a new AIWEB page',
      description:
        'ChatGPT prompt and product photos fly into AIWEB OS. Worker agents assemble the retail intelligence page.',
    },
    update: {
      title: 'Update the page with new photos',
      description:
        'Start from the published page. Add hot pink dress photos in ChatGPT — AIWEB OS keeps the black dress and adds the pink variation to gallery, hero and pricing.',
    },
    publish: {
      title: 'Publish to the AI Web',
      description:
        'ChatGPT asks to publish. Confirm in the composer — AIWEB OS deploys the page and registers it live for AI discovery.',
    },
    mail: {
      title: 'AIWEB Mail',
      description:
        'Visitors request a call on your published AIWEB Page. The lead lands in AIWEB Mail — reply with a callback from the Calls inbox.',
    },
  },
};

const CATERING_CONFIG: AiwebOsStoryConfig = {
  hasMedia: false,
  buildImages: [],
  updateImages: [],
  builtGallery: [],
  fullGallery: [],
  build: {
    userPrompt:
      'Build an AIWEB Page for Savory Moments Wedding Catering — menus, packages and Get Quote.',
    response:
      'Done — your AIWEB Page for Savory Moments is built. Wedding packages, buffet menus and Get Quote are in place. Do you want to publish that AIWEB Page?',
    thoughts: [
      'Structuring catering packages and menus…',
      'Adding Get Quote and event fields…',
      'Applying hero layout for wedding services…',
      'Finalizing machine-readable catering page…',
    ],
    attachLabel: 'Menu PDF · Savory Moments',
    preview: {
      projectTitle: 'Savory Moments Wedding Catering',
      previewTitle: 'Savory Moments — Wedding Catering',
      heroKicker: 'AIWEB Business Page',
      heroName: 'Savory Moments',
      heroDesc: 'Garden receptions, buffets and plated dinners.',
      pills: ['Garden Reception · $85/person', 'Full Buffet · $120/person', 'Get Quote live'],
      snapshot: [
        ['Business', 'Savory Moments Wedding Catering'],
        ['Service', 'Wedding & event catering'],
        ['Garden Reception', '$85/person · 50 min'],
        ['Full Buffet', '$120/person · 75 min'],
        ['Get Quote', 'ChatGPT · AIWEB Actions'],
        ['Coverage', 'San Antonio metro'],
      ],
      heroPlaceholder: 'catering',
    },
  },
  update: {
    userPrompt: 'Update the catering page with our fall tasting menu and new buffet pricing.',
    response:
      'Updated — fall tasting menu and refreshed buffet pricing are live on your AIWEB Page. Packages and Get Quote fields refreshed. Do you want to publish this update?',
    thoughts: [
      'Adding fall tasting menu…',
      'Refreshing buffet package pricing…',
      'Updating Get Quote event fields…',
      'Finalizing catering page update…',
    ],
    attachLabel: 'Fall menu PDF · updated pricing',
    preview: {
      projectTitle: 'Savory Moments Wedding Catering',
      previewTitle: 'Savory Moments — Wedding Catering',
      heroKicker: 'AIWEB Business Page',
      heroName: 'Savory Moments',
      heroDesc: 'Garden receptions, buffets and plated dinners.',
      pills: ['Garden Reception · $85/person', 'Fall Tasting · $95/person', 'Get Quote live'],
      snapshot: [
        ['Business', 'Savory Moments Wedding Catering'],
        ['Service', 'Wedding & event catering'],
        ['Garden Reception', '$85/person · 50 min'],
        ['Fall Tasting', '$95/person · new'],
        ['Get Quote', 'ChatGPT · AIWEB Actions'],
        ['Coverage', 'San Antonio metro'],
      ],
      heroPlaceholder: 'catering',
    },
  },
  publish: {
    userPrompt: 'Yes, publish the AIWEB page.',
    chatgptQuestion:
      'Your AIWEB Page for Savory Moments Wedding Catering is ready — packages, menus and Get Quote included. Do you want to publish that AIWEB Page?',
    response:
      'Published — your AIWEB Page is live at savory-moments.theaiwebcompany.com. Wedding planners can now request quotes inside ChatGPT.',
    liveUrl: 'savory-moments.theaiwebcompany.com',
    preview: {
      projectTitle: 'Savory Moments Wedding Catering',
      previewTitle: 'Savory Moments — Wedding Catering',
      heroKicker: 'AIWEB Business Page',
      heroName: 'Savory Moments',
      heroDesc: 'Garden receptions, buffets and plated dinners.',
      pills: ['Garden Reception · $85/person', 'Fall Tasting · $95/person', 'Get Quote live'],
      snapshot: [
        ['Business', 'Savory Moments Wedding Catering'],
        ['Service', 'Wedding & event catering'],
        ['Garden Reception', '$85/person · 50 min'],
        ['Fall Tasting', '$95/person · new'],
        ['Get Quote', 'ChatGPT · AIWEB Actions'],
        ['Coverage', 'San Antonio metro'],
      ],
      heroPlaceholder: 'catering',
    },
  },
  mail: {
    inbox: [
      {
        id: 'amanda',
        initials: 'AR',
        name: 'Amanda Reyes',
        source: 'ChatGPT · mcp · request_quote',
        preview: 'Wedding · 150 guests · Sep 14',
        time: 'now',
      },
      {
        id: 'sue',
        initials: 'SF',
        name: 'Sue Frank',
        source: 'Browser · request_quote',
        preview: 'Phone 5551234567',
        time: '2d',
      },
      {
        id: 'john',
        initials: 'JS',
        name: 'John Smith',
        source: 'ChatGPT · mcp · request_quote',
        preview: 'Phone 5559876543',
        time: 'Aug 22',
      },
    ],
    featuredLeadId: 'amanda',
    pageUrl: 'savory-moments.theaiwebcompany.com',
    incomingMessage:
      'Sep 1, 2026, 11:04 AM\n\nGet Quote · Wedding reception\n150 guests · Sep 14, 2026\n\nGarden reception + full buffet walkthrough\n\nPhone 210-555-0142',
    incomingMeta: 'Amanda Reyes · Get Quote',
    threadSource: 'ChatGPT · mcp · request_quote · savory-moments.theaiwebcompany.com',
    callbackMessage:
      'Thank you for reaching out! We can schedule a tasting and walkthrough this week for your Sep 14 wedding. What day works best?',
  },
  demos: {
    build: {
      title: 'Build a catering AIWEB Page',
      description:
        'ChatGPT prompt and menu details fly into AIWEB OS. Worker agents assemble packages, menus and Get Quote for Savory Moments.',
    },
    update: {
      title: 'Update menus and pricing',
      description:
        'Add a fall tasting menu in ChatGPT — AIWEB OS refreshes packages, pricing signals and Get Quote fields on the live catering page.',
    },
    publish: {
      title: 'Publish to the AI Web',
      description:
        'ChatGPT asks to publish. Confirm in the composer — AIWEB OS deploys the catering page for wedding planner discovery.',
    },
    mail: {
      title: 'AIWEB Mail',
      description:
        'Wedding planners request quotes from ChatGPT. The lead lands in AIWEB Mail — reply with a callback from the Calls inbox.',
    },
  },
};

const PLUMBING_CONFIG: AiwebOsStoryConfig = {
  hasMedia: false,
  buildImages: [],
  updateImages: [],
  builtGallery: [],
  fullGallery: [],
  build: {
    userPrompt:
      'Build an AIWEB Page for Metro Emergency Plumbing — services, emergency line and Get Quote.',
    response:
      'Done — your AIWEB Page for Metro Emergency Plumbing is built. Emergency services, dispatch hours and Get Quote are in place. Do you want to publish that AIWEB Page?',
    thoughts: [
      'Structuring emergency service fields…',
      'Adding Get Quote and dispatch windows…',
      'Applying hero layout for local services…',
      'Finalizing machine-readable plumbing page…',
    ],
    attachLabel: 'Service list · Metro Emergency',
    preview: {
      projectTitle: 'Metro Emergency Plumbing',
      previewTitle: 'Metro Emergency Plumbing — Local Services',
      heroKicker: 'AIWEB Business Page',
      heroName: 'Metro Emergency Plumbing',
      heroDesc: 'Same-day dispatch · drains, leaks and water heaters.',
      pills: ['Emergency drain · $285', 'Water heater · from $450', 'Get Quote live'],
      snapshot: [
        ['Business', 'Metro Emergency Plumbing'],
        ['Service', 'Emergency plumbing'],
        ['Emergency drain', '$285 · same-day'],
        ['Water heater', 'From $450 · install'],
        ['Get Quote', 'ChatGPT · AIWEB Actions'],
        ['Coverage', 'Austin metro · 24/7'],
      ],
      heroPlaceholder: 'plumbing',
    },
  },
  update: {
    userPrompt: 'Update the plumbing page with weekend emergency availability and new dispatch hours.',
    response:
      'Updated — weekend emergency availability and refreshed dispatch hours are live on your AIWEB Page. Get Quote fields updated. Do you want to publish this update?',
    thoughts: [
      'Adding weekend emergency hours…',
      'Refreshing dispatch availability…',
      'Updating Get Quote service fields…',
      'Finalizing plumbing page update…',
    ],
    attachLabel: 'Dispatch schedule · weekend hours',
    preview: {
      projectTitle: 'Metro Emergency Plumbing',
      previewTitle: 'Metro Emergency Plumbing — Local Services',
      heroKicker: 'AIWEB Business Page',
      heroName: 'Metro Emergency Plumbing',
      heroDesc: 'Same-day dispatch · drains, leaks and water heaters.',
      pills: ['Emergency drain · $285', 'Weekend dispatch · live', 'Get Quote live'],
      snapshot: [
        ['Business', 'Metro Emergency Plumbing'],
        ['Service', 'Emergency plumbing'],
        ['Emergency drain', '$285 · same-day'],
        ['Weekend dispatch', 'Sat–Sun · new'],
        ['Get Quote', 'ChatGPT · AIWEB Actions'],
        ['Coverage', 'Austin metro · 24/7'],
      ],
      heroPlaceholder: 'plumbing',
    },
  },
  publish: {
    userPrompt: 'Yes, publish the AIWEB page.',
    chatgptQuestion:
      'Your AIWEB Page for Metro Emergency Plumbing is ready — emergency services and Get Quote included. Do you want to publish that AIWEB Page?',
    response:
      'Published — your AIWEB Page is live at metro-emergency-plumbing.theaiwebcompany.com. Homeowners can now request emergency quotes inside ChatGPT.',
    liveUrl: 'metro-emergency-plumbing.theaiwebcompany.com',
    preview: {
      projectTitle: 'Metro Emergency Plumbing',
      previewTitle: 'Metro Emergency Plumbing — Local Services',
      heroKicker: 'AIWEB Business Page',
      heroName: 'Metro Emergency Plumbing',
      heroDesc: 'Same-day dispatch · drains, leaks and water heaters.',
      pills: ['Emergency drain · $285', 'Weekend dispatch · live', 'Get Quote live'],
      snapshot: [
        ['Business', 'Metro Emergency Plumbing'],
        ['Service', 'Emergency plumbing'],
        ['Emergency drain', '$285 · same-day'],
        ['Weekend dispatch', 'Sat–Sun · new'],
        ['Get Quote', 'ChatGPT · AIWEB Actions'],
        ['Coverage', 'Austin metro · 24/7'],
      ],
      heroPlaceholder: 'plumbing',
    },
  },
  mail: {
    inbox: [
      {
        id: 'jordan',
        initials: 'JL',
        name: 'Jordan Lee',
        source: 'ChatGPT · mcp · request_quote',
        preview: 'Kitchen sink backup · ASAP',
        time: 'now',
      },
      {
        id: 'sue',
        initials: 'SF',
        name: 'Sue Frank',
        source: 'Browser · request_quote',
        preview: 'Phone 5551234567',
        time: '2d',
      },
      {
        id: 'john',
        initials: 'JS',
        name: 'John Smith',
        source: 'ChatGPT · mcp · request_quote',
        preview: 'Phone 5559876543',
        time: 'Aug 22',
      },
    ],
    featuredLeadId: 'jordan',
    pageUrl: 'metro-emergency-plumbing.theaiwebcompany.com',
    incomingMessage:
      'Sep 1, 2026, 9:12 AM\n\nGet Quote · Emergency plumbing\nKitchen sink backup · ASAP\n\nPhone 512-555-0184',
    incomingMeta: 'Jordan Lee · Get Quote',
    threadSource: 'ChatGPT · mcp · request_quote · metro-emergency-plumbing.theaiwebcompany.com',
    callbackMessage:
      'We can dispatch a technician today for your kitchen sink backup. Same-day emergency drain service starts at $285 — want us to schedule the visit?',
  },
  demos: {
    build: {
      title: 'Build a plumbing AIWEB Page',
      description:
        'ChatGPT prompt and service details fly into AIWEB OS. Worker agents assemble emergency services, dispatch hours and Get Quote.',
    },
    update: {
      title: 'Update services and hours',
      description:
        'Add weekend emergency availability in ChatGPT — AIWEB OS refreshes dispatch hours and Get Quote on the live plumbing page.',
    },
    publish: {
      title: 'Publish to the AI Web',
      description:
        'ChatGPT asks to publish. Confirm in the composer — AIWEB OS deploys the plumbing page for emergency quote discovery.',
    },
    mail: {
      title: 'AIWEB Mail',
      description:
        'Homeowners request emergency quotes from ChatGPT. The lead lands in AIWEB Mail — reply with a callback from the Calls inbox.',
    },
  },
};

const ALBUM_CONFIG: AiwebOsStoryConfig = {
  hasMedia: false,
  buildImages: [],
  updateImages: [],
  builtGallery: [],
  fullGallery: [],
  build: {
    userPrompt:
      'Build an AIWEB Album page for Type — cinematic score with vocals, three tracks and a film.',
    response:
      'Done — your AI Web Album Type is built. Artwork, tracks, film slot and AIWEB Play surfaces are in place. Do you want to publish that album?',
    thoughts: [
      'Structuring track and film metadata…',
      'Applying album artwork and player layout…',
      'Registering AIWEB Play discovery fields…',
      'Finalizing machine-readable album page…',
    ],
    attachLabel: 'Masters · Type album · 3 tracks + film',
    preview: {
      projectTitle: 'Type — AI Web Album',
      previewTitle: 'Type — AI Web Album',
      heroKicker: 'AIWEB Album · Media over AI',
      heroName: 'Type',
      heroDesc: 'Cinematic score with a human vocal.',
      pills: ['Type · 4:12', 'Drift · 3:48', 'Film · 2:01'],
      snapshot: [
        ['Album', 'Type'],
        ['Artist', 'The AI Web Company'],
        ['Type', '4:12 · title track'],
        ['Drift', '3:48 · instrumental'],
        ['Film', '2:01 · music video'],
        ['Play', 'AIWEB Play · ChatGPT'],
      ],
      heroPlaceholder: 'album',
    },
  },
  update: {
    userPrompt: 'Update the album page with a lyric transcript for Type and refreshed film credits.',
    response:
      'Updated — lyric transcript and film credits are live on your AI Web Album. Track and Film surfaces refreshed. Do you want to publish this update?',
    thoughts: [
      'Adding lyric transcript for Type…',
      'Refreshing film credits…',
      'Updating AIWEB Play metadata…',
      'Finalizing album page update…',
    ],
    attachLabel: 'Lyrics PDF · Type · film credits',
    preview: {
      projectTitle: 'Type — AI Web Album',
      previewTitle: 'Type — AI Web Album',
      heroKicker: 'AIWEB Album · Media over AI',
      heroName: 'Type',
      heroDesc: 'Cinematic score with a human vocal.',
      pills: ['Type · 4:12 · lyrics live', 'Drift · 3:48', 'Film · 2:01 · credits updated'],
      snapshot: [
        ['Album', 'Type'],
        ['Artist', 'The AI Web Company'],
        ['Type', '4:12 · lyrics live'],
        ['Drift', '3:48 · instrumental'],
        ['Film', '2:01 · credits updated'],
        ['Play', 'AIWEB Play · ChatGPT'],
      ],
      heroPlaceholder: 'album',
    },
  },
  publish: {
    userPrompt: 'Yes, publish the AIWEB Album.',
    chatgptQuestion:
      'Your AI Web Album Type is ready — tracks, film and AIWEB Play surfaces included. Do you want to publish that album?',
    response:
      'Published — your AI Web Album is live at ai-web-album.theaiwebcompany.com. Listeners can ask ChatGPT to play Type from the album.',
    liveUrl: 'ai-web-album.theaiwebcompany.com',
    preview: {
      projectTitle: 'Type — AI Web Album',
      previewTitle: 'Type — AI Web Album',
      heroKicker: 'AIWEB Album · Media over AI',
      heroName: 'Type',
      heroDesc: 'Cinematic score with a human vocal.',
      pills: ['Type · 4:12 · lyrics live', 'Drift · 3:48', 'Film · 2:01 · credits updated'],
      snapshot: [
        ['Album', 'Type'],
        ['Artist', 'The AI Web Company'],
        ['Type', '4:12 · lyrics live'],
        ['Drift', '3:48 · instrumental'],
        ['Film', '2:01 · credits updated'],
        ['Play', 'AIWEB Play · ChatGPT'],
      ],
      heroPlaceholder: 'album',
    },
  },
  mail: {
    inbox: [
      {
        id: 'alex',
        initials: 'AR',
        name: 'Alex Rivera',
        source: 'ChatGPT · mcp · call',
        preview: 'License inquiry · Type',
        time: 'now',
      },
      {
        id: 'sue',
        initials: 'SF',
        name: 'Sue Frank',
        source: 'Browser · request_quote',
        preview: 'Sync request · film',
        time: '2d',
      },
      {
        id: 'john',
        initials: 'JS',
        name: 'John Smith',
        source: 'ChatGPT · mcp · call',
        preview: 'Play request logged',
        time: 'Aug 22',
      },
    ],
    featuredLeadId: 'alex',
    pageUrl: 'ai-web-album.theaiwebcompany.com',
    incomingMessage:
      'Sep 1, 2026, 4:30 PM\n\nIncoming call · License inquiry\nTrack Type · sync for short film\n\nPhone 323-555-0198',
    incomingMeta: 'Alex Rivera · incoming call',
    threadSource: 'ChatGPT · mcp · call · ai-web-album.theaiwebcompany.com',
    callbackMessage:
      'Thanks for reaching out about licensing Type. Happy to discuss sync terms for your short film — reply with your timeline and we can send options.',
  },
  demos: {
    build: {
      title: 'Build an AI Web Album',
      description:
        'ChatGPT prompt and masters fly into AIWEB OS. Worker agents assemble tracks, film and AIWEB Play surfaces for Type.',
    },
    update: {
      title: 'Update tracks and credits',
      description:
        'Add lyrics and film credits in ChatGPT — AIWEB OS refreshes track metadata and AIWEB Play discovery on the live album.',
    },
    publish: {
      title: 'Publish to the AI Web',
      description:
        'ChatGPT asks to publish. Confirm in the composer — AIWEB OS deploys the album for AIWEB Play discovery in ChatGPT.',
    },
    mail: {
      title: 'AIWEB Mail',
      description:
        'Listeners and licensors reach out from ChatGPT. The inquiry lands in AIWEB Mail — reply with a callback from the Calls inbox.',
    },
  },
};

export const AIWEB_OS_STORY_CONFIGS: Record<PublisherStoryId, AiwebOsStoryConfig> = {
  shopper: SHOPPER_CONFIG,
  catering: CATERING_CONFIG,
  plumbing: PLUMBING_CONFIG,
  album: ALBUM_CONFIG,
};

export function aiwebOsStoryConfig(storyId: PublisherStoryId): AiwebOsStoryConfig {
  return AIWEB_OS_STORY_CONFIGS[storyId] ?? SHOPPER_CONFIG;
}
