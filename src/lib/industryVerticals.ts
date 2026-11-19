import {
  Briefcase,
  HeartPulse,
  Home,
  Landmark,
  Megaphone,
  Network,
  Package,
  Scale,
  Shield,
  Truck,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';

export type IndustryVertical = {
  id: string;
  label: string;
  Icon: LucideIcon;
  /** Pitch deck route when a vertical deck exists. */
  pitchDeckTo?: string;
};

/** Shared industry marks — landing “Find your industry” + /pitchdeck grid. */
export const INDUSTRY_VERTICALS: readonly IndustryVertical[] = [
  { id: 'business', label: 'Business', Icon: Briefcase, pitchDeckTo: '/pitchdeck/business' },
  { id: 'healthcare', label: 'Healthcare', Icon: HeartPulse, pitchDeckTo: '/pitchdeck/health' },
  { id: 'finance', label: 'Finance', Icon: Landmark },
  { id: 'insurance', label: 'Insurance', Icon: Shield },
  { id: 'logistics', label: 'Logistics', Icon: Truck },
  { id: 'it-managed-services', label: 'IT managed services', Icon: Network },
  { id: 'legal', label: 'Legal', Icon: Scale },
  { id: 'supply-chain', label: 'Supply Chain', Icon: Package },
  { id: 'real-estate', label: 'Real Estate', Icon: Home },
  { id: 'restaurant', label: 'Restaurant', Icon: UtensilsCrossed },
  { id: 'marketing', label: 'Marketing', Icon: Megaphone },
] as const;
