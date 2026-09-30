export interface CareerRole {
  id: string;
  title: string;
  location: string;
  type: string;
  summary: string;
  applyUrl?: string;
}

/** Empty for v1 — careers page shows introduce-yourself empty state. */
export const OPEN_ROLES: CareerRole[] = [];
