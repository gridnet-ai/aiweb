export type DressImage = { src: string; alt: string };

export const WORKER_LOGOS = [
  { id: 'claude', src: '/images/demo/workers/claude.png', name: 'Claude' },
  { id: 'gemini', src: '/images/demo/workers/gemini.png', name: 'Gemini' },
  { id: 'chatgpt', src: '/images/demo/workers/chatgpt.png?v=4', name: 'ChatGPT' },
  { id: 'grok', src: '/images/demo/workers/grok.png?v=4', name: 'Grok' },
  { id: 'perplexity', src: '/images/demo/workers/perplexity.png', name: 'Perplexity' },
] as const;

export const BLACK_DRESS_IMAGES = [
  { src: '/images/demo/nbd-janhvi-maxi-dress.png', alt: 'Front view' },
  { src: '/images/demo/nbd-janhvi-maxi-dress-front.png', alt: 'Front three-quarter' },
  { src: '/images/demo/nbd-janhvi-maxi-dress-back.png', alt: 'Back view' },
  { src: '/images/demo/nbd-janhvi-maxi-dress-detail.png', alt: 'Sequin detail' },
] as const;

export const PINK_DRESS_IMAGES = [
  { src: '/images/demo/pink-dress/front.png', alt: 'Hot pink front' },
  { src: '/images/demo/pink-dress/three-quarter.png', alt: 'Hot pink three-quarter' },
  { src: '/images/demo/pink-dress/back.png', alt: 'Hot pink back' },
  { src: '/images/demo/pink-dress/detail.png', alt: 'Hot pink sequin detail' },
] as const;

export const ALL_DRESS_GALLERY: DressImage[] = [
  ...BLACK_DRESS_IMAGES,
  ...PINK_DRESS_IMAGES,
];

export const PROJECTS = [
  { title: 'NBD Janhvi Maxi Dress — Retail Intelligence', thumb: 'pink' as const },
  { title: 'AIWEB OS', thumb: 'green' as const },
  { title: 'Founder Institute', thumb: 'gold' as const },
  { title: 'AI Web Album', thumb: 'default' as const },
] as const;

export const TOOLBAR = [
  'Snapshot',
  '3 variations',
  'Normalize',
  'Clean Layout',
  'Select',
  'Structure',
  'States',
  'Track',
  'Files',
  'Art',
  'VOICE',
] as const;

export const SNAPSHOT = [
  ['Product', 'Janhvi Maxi Dress'],
  ['Category', 'Evening / Formal'],
  ['Silhouette', 'Maxi, sleeveless'],
  ['Black', '$278 observed'],
  ['Hot Pink', '$262 observed'],
  ['Construction', 'Sequin overlay'],
  ['Care', 'Dry clean only'],
  ['Sizes', 'XXS–XL displayed'],
] as const;
