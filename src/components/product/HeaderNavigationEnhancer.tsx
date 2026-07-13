import { useLayoutEffect } from 'react';
import type { Locale } from '../../i18n';

const copy: Record<Locale, { resources: string; loginNotice: string; startLabels: string[] }> = {
  en: { resources: 'Resources', loginNotice: 'Public login is not available yet. Contact Yasaflow for product access.', startLabels: ['Get Started', 'Create Organization', 'Ready to get started?'] },
  nb: { resources: 'Ressurser', loginNotice: 'Offentlig innlogging er ikke tilgjengelig ennå. Kontakt Yasaflow for produkttilgang.', startLabels: ['Kom i gang', 'Opprett organisasjon', 'Klar til å komme i gang?'] },
  tr: { resources: 'Kaynaklar', loginNotice: 'Herkese açık giriş henüz kullanılamıyor. Ürün erişimi için Yasaflow ile iletişime geçin.', startLabels: ['Başlayın', 'Kuruluş oluştur', 'Başlamaya hazır mısınız?'] },
};

const destinations = ['/modules', '#solutions', '/resources', '/about', '/contact'];

export function HeaderNavigationEnhancer({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;
    header.classList.add('sticky', 'top-0', 'z-50', 'bg-white/95', 'backdrop-blur-xl');

    const navs = header.querySelectorAll('nav');
    navs.forEach((nav) => {
      const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a')).filter((link) => !link.closest('[data-language-selector]'));
      links.slice(0, 5).forEach((link, index) => {
        link.href = destinations[index];
        if (index === 2) link.textContent = copy[locale].resources;
      });
    });

    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
    const loginLink = anchors.find((link) => ['Log in', 'Logg inn', 'Giriş yap'].includes(link.textContent?.trim() ?? ''));
    if (loginLink) {
      loginLink.href = '/contact';
      loginLink.title = copy[locale].loginNotice;
      loginLink.setAttribute('aria-label', `${loginLink.textContent?.trim()}. ${copy[locale].loginNotice}`);
    }

    anchors.forEach((link) => {
      const label = link.textContent?.trim() ?? '';
      if (copy[locale].startLabels.some((startLabel) => label.includes(startLabel))) link.href = '/get-started';
      else if (link.getAttribute('href') === '#contact') link.href = '/contact';
    });
  }, [locale]);

  return null;
}
