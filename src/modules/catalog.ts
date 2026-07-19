import type { YasaflowModule } from './types';

export const moduleCatalog: readonly YasaflowModule[] = [
  {
    id: 'news',
    name: { en: 'News', nb: 'Nyheter', da: 'Nyheder', tr: 'Haberler' },
    description: {
      en: 'Publish updates and important information to the organization.',
      nb: 'Publiser oppdateringer og viktig informasjon til organisasjonen.',
      da: 'Del opdateringer og vigtig information med organisationen.',
      tr: 'Kuruma güncellemeler ve önemli bilgiler yayınlayın.',
    },
    category: 'core', icon: 'newspaper', sortOrder: 10, included: true, premium: false,
    monthlyPriceNok: null, status: 'active', visibleOnWebsite: true,
  },
  {
    id: 'activities',
    name: { en: 'Activities', nb: 'Aktiviteter', da: 'Aktiviteter', tr: 'Etkinlikler' },
    description: {
      en: 'Create activities, events and clear schedules for members.',
      nb: 'Opprett aktiviteter, arrangementer og tydelige planer for medlemmer.',
      da: 'Opret aktiviteter, arrangementer og overskuelige planer for medlemmer.',
      tr: 'Üyeler için etkinlikler ve anlaşılır programlar oluşturun.',
    },
    category: 'core', icon: 'calendar-days', sortOrder: 20, included: true, premium: false,
    monthlyPriceNok: null, status: 'active', visibleOnWebsite: true,
  },
  {
    id: 'members',
    name: { en: 'Members', nb: 'Medlemmer', da: 'Medlemmer', tr: 'Üyeler' },
    description: {
      en: 'Manage the people who belong to the organization.',
      nb: 'Administrer personene som tilhører organisasjonen.',
      da: 'Administrer de personer, der er tilknyttet organisationen.',
      tr: 'Kuruma bağlı kişileri yönetin.',
    },
    category: 'core', icon: 'users', sortOrder: 30, included: true, premium: false,
    monthlyPriceNok: null, status: 'active', visibleOnWebsite: true,
  },
  {
    id: 'administration',
    name: { en: 'Administration', nb: 'Administrasjon', da: 'Administration', tr: 'Yönetim' },
    description: {
      en: 'Manage organization access, roles and daily administration.',
      nb: 'Administrer tilgang, roller og den daglige driften.',
      da: 'Administrer adgang, roller og den daglige drift.',
      tr: 'Erişimi, rolleri ve günlük yönetimi düzenleyin.',
    },
    category: 'core', icon: 'shield-check', sortOrder: 40, included: true, premium: false,
    monthlyPriceNok: null, status: 'active', visibleOnWebsite: true,
  },
  {
    id: 'settings',
    name: { en: 'Settings', nb: 'Innstillinger', da: 'Indstillinger', tr: 'Ayarlar' },
    description: {
      en: 'Configure the organization and its digital experience.',
      nb: 'Konfigurer organisasjonen og den digitale opplevelsen.',
      da: 'Konfigurer organisationen og dens digitale oplevelse.',
      tr: 'Kurumu ve dijital deneyimini yapılandırın.',
    },
    category: 'core', icon: 'settings', sortOrder: 50, included: true, premium: false,
    monthlyPriceNok: null, status: 'active', visibleOnWebsite: true,
  },
  {
    id: 'push-notifications',
    name: { en: 'Push Notifications', nb: 'Pushvarsler', da: 'Pushnotifikationer', tr: 'Anlık Bildirimler' },
    description: {
      en: 'Send timely alerts and important messages directly to users.',
      nb: 'Send viktige varsler og meldinger direkte til brukerne.',
      da: 'Send relevante varsler og vigtige beskeder direkte til brugerne.',
      tr: 'Önemli bildirimleri doğrudan kullanıcılara gönderin.',
    },
    category: 'communication', icon: 'bell', sortOrder: 60, included: false, premium: false,
    monthlyPriceNok: 39, status: 'active', visibleOnWebsite: true,
  },
  {
    id: 'donations',
    name: { en: 'External Donation Link', nb: 'Ekstern donasjonslenke', da: 'Eksternt donationslink', tr: 'Harici Bağış Bağlantısı' },
    description: {
      en: 'Add a link to your preferred payment provider, such as Vipps, PayPal or another local service. Yasaflow only redirects supporters and never processes or holds payments.',
      nb: 'Legg til en lenke til ønsket betalingsleverandør, for eksempel Vipps, PayPal eller en lokal tjeneste. Yasaflow videresender kun brukeren og behandler eller oppbevarer aldri betalinger.',
      da: 'Tilføj et link til den ønskede betalingsudbyder, for eksempel Vipps, PayPal eller en lokal tjeneste. Yasaflow videresender kun brugeren og behandler eller opbevarer aldrig betalinger.',
      tr: 'Vipps, PayPal veya yerel bir hizmet gibi tercih ettiğiniz ödeme sağlayıcısına bağlantı ekleyin. Yasaflow yalnızca kullanıcıyı yönlendirir; ödemeleri işlemez veya saklamaz.',
    },
    category: 'finance', icon: 'circle-dollar-sign', sortOrder: 70, included: false, premium: false,
    monthlyPriceNok: 39, status: 'active', visibleOnWebsite: true,
  },
  {
    id: 'chat',
    name: { en: 'Chat', nb: 'Chat', da: 'Chat', tr: 'Sohbet' },
    description: {
      en: 'Structured communication for teams and member groups.',
      nb: 'Strukturert kommunikasjon for team og medlemsgrupper.',
      da: 'Struktureret kommunikation for teams og medlemsgrupper.',
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
