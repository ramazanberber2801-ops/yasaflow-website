import { useLayoutEffect } from 'react';
import type { Locale } from '../../i18n';

const copy: Record<Locale, { loginNotice: string; clinicLabel:string; startLabels: string[] }> = {
  en: { loginNotice: 'Open the Yasaflow customer login.', clinicLabel:'Clinics', startLabels: ['Get Started', 'Create Organization', 'Ready to get started?'] },
  nb: { loginNotice: 'Åpne innloggingen til Yasaflow.', clinicLabel:'Klinikker', startLabels: ['Kom i gang', 'Opprett organisasjon', 'Klar til å komme i gang?'] },
  tr: { loginNotice: 'Yasaflow müşteri girişini açın.', clinicLabel:'Klinikler', startLabels: ['Başlayın', 'Kurum oluştur', 'Başlamaya hazır mısınız?'] },
};

const destinations = ['/modules', '#solutions', '/pricing', '/about', '/contact'];

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
      });

      if (!nav.querySelector('[data-clinic-navigation]')) {
        const solutionsLink = links.find((link) => link.getAttribute('href') === '#solutions' || ['Solutions','Løsninger','Çözümler'].includes(link.textContent?.trim() ?? ''));
        if (solutionsLink) {
          const clinicLink = document.createElement('a');
          clinicLink.href = '/klinikker';
          clinicLink.textContent = copy[locale].clinicLabel;
          clinicLink.dataset.clinicNavigation = 'true';
          clinicLink.className = solutionsLink.className;
          clinicLink.setAttribute('aria-label', copy[locale].clinicLabel);
          solutionsLink.insertAdjacentElement('afterend', clinicLink);
        }
      }
    });

    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
    const loginLink = anchors.find((link) => ['Log in', 'Logg inn', 'Giriş yap'].includes(link.textContent?.trim() ?? ''));
    if (loginLink) {
      loginLink.href = '/login';
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
