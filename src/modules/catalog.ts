import type { YasaflowModule } from './types';

/**
 * Temporary local source that mirrors the future platform/Supabase module schema.
 * Replace the implementation later, not the consuming UI contract.
 *
 * Only modules confirmed as operational should be marked active and visible.
 */
export const moduleCatalog: readonly YasaflowModule[] = [
  {
    id: 'news',
    name: 'News',
    description: 'Publish updates and important information to the organization.',
    category: 'core',
    icon: 'newspaper',
    sortOrder: 10,
    included: true,
    premium: false,
    monthlyPriceNok: 0,
    status: 'active',
    visibleOnWebsite: true,
  },
  {
    id: 'activities',
    name: 'Activities',
    description: 'Create activities, events and clear schedules for members.',
    category: 'core',
    icon: 'calendar-days',
    sortOrder: 20,
    included: true,
    premium: false,
    monthlyPriceNok: 0,
    status: 'active',
    visibleOnWebsite: true,
  },
  {
    id: 'members',
    name: 'Members',
    description: 'Manage the people who belong to the organization.',
    category: 'core',
    icon: 'users',
    sortOrder: 30,
    included: true,
    premium: false,
    monthlyPriceNok: 0,
    status: 'active',
    visibleOnWebsite: true,
  },
  {
    id: 'administration',
    name: 'Administration',
    description: 'Manage organization access, roles and daily administration.',
    category: 'core',
    icon: 'shield-check',
    sortOrder: 40,
    included: true,
    premium: false,
    monthlyPriceNok: 0,
    status: 'active',
    visibleOnWebsite: true,
  },
  {
    id: 'settings',
    name: 'Settings',
    description: 'Configure the organization and its digital experience.',
    category: 'core',
    icon: 'settings',
    sortOrder: 50,
    included: true,
    premium: false,
    monthlyPriceNok: 0,
    status: 'active',
    visibleOnWebsite: true,
  },
  {
    id: 'push-notifications',
    name: 'Push Notifications',
    description: 'Send timely alerts and important messages directly to users.',
    category: 'communication',
    icon: 'bell',
    sortOrder: 60,
    included: false,
    premium: false,
    monthlyPriceNok: 0,
    status: 'active',
    visibleOnWebsite: true,
  },
  {
    id: 'donations',
    name: 'Donations',
    description: 'Make it easier for supporters to contribute digitally.',
    category: 'finance',
    icon: 'circle-dollar-sign',
    sortOrder: 70,
    included: false,
    premium: false,
    monthlyPriceNok: 0,
    status: 'active',
    visibleOnWebsite: true,
  },
] as const;

export function getPublicModules(modules: readonly YasaflowModule[] = moduleCatalog): YasaflowModule[] {
  return modules
    .filter((module) => module.status === 'active' && module.visibleOnWebsite)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getIncludedModules(modules: readonly YasaflowModule[] = moduleCatalog): YasaflowModule[] {
  return getPublicModules(modules).filter((module) => module.included);
}

export function getSelectablePaidModules(modules: readonly YasaflowModule[] = moduleCatalog): YasaflowModule[] {
  return getPublicModules(modules).filter((module) => !module.included);
}
