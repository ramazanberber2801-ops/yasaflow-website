import { useLayoutEffect } from 'react';
import type { Locale } from '../../i18n';

const skipText: Record<Locale, string> = {
  en: 'Skip to main content',
  nb: 'Hopp til hovedinnhold',
  tr: 'Ana içeriğe geç',
};

export function AccessibilityEnhancer({ locale, showSkipLink = false }: { locale: Locale; showSkipLink?: boolean }) {
  useLayoutEffect(() => {
    const main = document.querySelector<HTMLElement>('main');
    if (main) {
      main.id = 'main-content';
      main.tabIndex = -1;
    }

    document.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
      if (!link.textContent?.trim() && !link.getAttribute('aria-label')) {
        link.setAttribute('aria-label', 'Yasaflow link');
      }
    });
  }, [locale]);

  return showSkipLink ? <a className="skip-link" href="#main-content">{skipText[locale]}</a> : null;
}
