export type ModuleStatus = 'development' | 'beta' | 'active' | 'coming_soon' | 'retired';

export type ModuleCategory =
  | 'core'
  | 'communication'
  | 'engagement'
  | 'finance'
  | 'management'
  | 'religion'
  | 'other';

export type YasaflowModule = {
  /** Stable machine identifier. Never rename after release. */
  id: string;
  name: string;
  description: string;
  category: ModuleCategory;
  icon: string;
  sortOrder: number;
  included: boolean;
  premium: boolean;
  monthlyPriceNok: number;
  status: ModuleStatus;
  visibleOnWebsite: boolean;
};
