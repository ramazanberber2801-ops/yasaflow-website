import { useLayoutEffect } from 'react';
import type { Locale } from '../../i18n';

const copy: Record<Locale, { resources: string; loginNotice: string }> = {
  en: { resources: 'Resources', loginNotice: 'Public login is not available yet. Contact Yasaflow for product access.' },
  nb: { resources: 'Ressurser', loginNotice: 'Offentlig innlogging er ikke tilgjengelig ennå. Kontakt Yasaflow for produkttilgang.' },
  tr: { resources: 'Kaynaklar', loginNotice: 'Herkese açık giriş henüz kullanılamıyor. Ürün erişimi için Yasaflow ile iletişime geçin.' },
};

const destinations = ['/modules', '#solutions', '/resources', '/about', '/contact'];

export function HeaderNavigationEnhancer({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;

    const navs = header.querySelectorAll('nav');
    navs.forEach((nav) => {
      const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a')).filter((link) => !link.closest('[data-language-selector]'));
      links.slice(0, 5).forEach((link, index) => {
        link.href = destinations[index];
        if (index === 2) link.textContent = copy[locale].resources;
      });
    });

    const desktopLinks = Array.from(header.querySelectorAll<HTMLAnchorElement>('a'));
    const loginLink = desktopLinks.find((link) => ['Log in', 'Logg inn', 'Giriş yap'].includes(link.textContent?.trim() ?? ''));
    if (loginLink) {
      loginLink.href = '/contact';
      loginLink.title = copy[locale].loginNotice;
      loginLink.setAttribute('aria-label', `${loginLink.textContent?.trim()}. ${copy[locale].loginNotice}`);
    }

    document.querySelectorAll<HTMLAnchorElement>('a[href="#contact"]').forEach((link) => {
      link.href = '/contact';
    });
  }, [locale]);

  return null;
}
