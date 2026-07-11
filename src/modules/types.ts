export type ModuleStatus = 'development' | 'beta' | 'active' | 'coming_soon' | 'retired';

export type ModuleCategory =
  | 'core'
  | 'communication'
  | 'engagement'
  | 'finance'
  | 'management'
  | 'religion'
  | 'other';

export type ModuleLocale = 'en' | 'nb' | 'tr';
export type LocalizedModuleText = Record<ModuleLocale, string>;

export type YasaflowModule = {
  /** Stable machine identifier. Never rename after release. */
  id: string;
  name: LocalizedModuleText;
  description: LocalizedModuleText;
  category: ModuleCategory;
  icon: string;
  sortOrder: number;
  included: boolean;
  premium: boolean;
  monthlyPriceNok: number | null;
  status: ModuleStatus;
  visibleOnWebsite: boolean;
  betaWebsiteEnabled?: boolean;
};
