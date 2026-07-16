import type { YasaflowModule } from './types';

export const moduleCatalog: readonly YasaflowModule[] = [
  {
    id: 'news',
    name: { en: 'News', nb: 'Nyheter', tr: 'Haberler' },
    description: {
      en: 'Publish updates and important information to the organization.',
      nb: 'Publiser oppdateringer og viktig informasjon til organisasjonen.',
      tr: 'Kuruma güncellemeler ve önemli bilgiler yayınlayın.',
    },
    category: 'core', icon: 'newspaper', sortOrder: 10, included: true, premium: false,
    monthlyPriceNok: null, status: 'active', visibleOnWebsite: true,
  },
  {
    id: 'activities',
    name: { en: 'Activities', nb: 'Aktiviteter', tr: 'Etkinlikler' },
    description: {
      en: 'Create activities, events and clear schedules for members.',
      nb: 'Opprett aktiviteter, arrangementer og tydelige planer for medlemmer.',
      tr: 'Üyeler için etkinlikler ve anlaşılır programlar oluşturun.',
    },
    category: 'core', icon: 'calendar-days', sortOrder: 20, included: true, premium: false,
    monthlyPriceNok: null, status: 'active', visibleOnWebsite: true,
  },
  {
    id: 'members',
    name: { en: 'Members', nb: 'Medlemmer', tr: 'Üyeler' },
    description: {
      en: 'Manage the people who belong to the organization.',
      nb: 'Administrer personene som tilhører organisasjonen.',
      tr: 'Kuruma bağlı kişileri yönetin.',
    },
    category: 'core', icon: 'users', sortOrder: 30, included: true, premium: false,
    monthlyPriceNok: null, status: 'active', visibleOnWebsite: true,
  },
  {
    id: 'administration',
    name: { en: 'Administration', nb: 'Administrasjon', tr: 'Yönetim' },
    description: {
      en: 'Manage organization access, roles and daily administration.',
      nb: 'Administrer tilgang, roller og den daglige driften.',
      tr: 'Erişimi, rolleri ve günlük yönetimi düzenleyin.',
    },
    category: 'core', icon: 'shield-check', sortOrder: 40, included: true, premium: false,
    monthlyPriceNok: null, status: 'active', visibleOnWebsite: true,
  },
  {
    id: 'settings',
    name: { en: 'Settings', nb: 'Innstillinger', tr: 'Ayarlar' },
    description: {
      en: 'Configure the organization and its digital experience.',
      nb: 'Konfigurer organisasjonen og den digitale opplevelsen.',
      tr: 'Kurumu ve dijital deneyimini yapılandırın.',
    },
    category: 'core', icon: 'settings', sortOrder: 50, included: true, premium: false,
    monthlyPriceNok: null, status: 'active', visibleOnWebsite: true,
  },
  {
    id: 'push-notifications',
    name: { en: 'Push Notifications', nb: 'Pushvarsler', tr: 'Anlık Bildirimler' },
    description: {
      en: 'Send timely alerts and important messages directly to users.',
      nb: 'Send viktige varsler og meldinger direkte til brukerne.',
      tr: 'Önemli bildirimleri doğrudan kullanıcılara gönderin.',
    },
    category: 'communication', icon: 'bell', sortOrder: 60, included: false, premium: false,
    monthlyPriceNok: 39, status: 'active', visibleOnWebsite: true,
  },
  {
    id: 'donations',
    name: { en: 'Donations & Payments', nb: 'Donasjoner og betalinger', tr: 'Bağış ve Ödemeler' },
    description: {
      en: 'Accept easy digital donations and payments through cards, Stripe and supported local payment methods.',
      nb: 'Gjør det enkelt å ta imot donasjoner og betalinger med Vipps, kort og støttede betalingsløsninger.',
      tr: 'Kart, Stripe, mobil ödeme ve desteklenen yerel ödeme yöntemleriyle kolayca bağış ve ödeme alın.',
    },
    category: 'finance', icon: 'circle-dollar-sign', sortOrder: 70, included: false, premium: false,
    monthlyPriceNok: 39, status: 'active', visibleOnWebsite: true,
  },
  {
    id: 'chat',
    name: { en: 'Chat', nb: 'Chat', tr: 'Sohbet' },
    description: {
      en: 'Structured communication for teams and member groups.',
      nb: 'Strukturert kommunikasjon for team og medlemsgrupper.',
      tr: 'Ekipler ve üye grupları için düzenli iletişim.',
    },
    category: 'communication', icon: 'message-circle', sortOrder: 80, included: false, premium: false,
    monthlyPriceNok: 49, status: 'development', visibleOnWebsite: false,
  },
];

export function getPublicModules(modules: readonly YasaflowModule[] = moduleCatalog): YasaflowModule[] {
  return modules
    .filter((module) =>
      module.visibleOnWebsite &&
      (module.status === 'active' || (module.status === 'beta' && module.betaWebsiteEnabled === true)),
    )
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getIncludedModules(modules: readonly YasaflowModule[] = moduleCatalog): YasaflowModule[] {
  return getPublicModules(modules).filter((module) => module.included);
}

export function getSelectablePaidModules(modules: readonly YasaflowModule[] = moduleCatalog): YasaflowModule[] {
  return getPublicModules(modules).filter((module) => !module.included && module.monthlyPriceNok !== null);
}
