import { useLayoutEffect } from 'react';
import type { Locale } from '../../i18n';

type Labels = {
  privacy: string;
  terms: string;
  resources: Array<[string, string]>;
};

const labels: Record<Locale, Labels> = {
  en: { privacy: 'Privacy', terms: 'Terms', resources: [['About Yasaflow', '/about'], ['Contact', '/contact'], ['Feedback', '/feedback'], ['Refund policy', '/refund'], ['Resources', '/resources'], ['FAQ', '/faq'], ['Security', '/security'], ['Roadmap', '/roadmap'], ['Integrations', '/integrations']] },
  nb: { privacy: 'Personvern', terms: 'Vilkår', resources: [['Om Yasaflow', '/about'], ['Kontakt', '/contact'], ['Tilbakemeldinger', '/feedback'], ['Refusjon', '/refund'], ['Ressurser', '/resources'], ['FAQ', '/faq'], ['Sikkerhet', '/security'], ['Veikart', '/roadmap'], ['Integrasjoner', '/integrations']] },
  tr: { privacy: 'Gizlilik', terms: 'Koşullar', resources: [['Yasaflow hakkında', '/about'], ['İletişim', '/contact'], ['Geri bildirim', '/feedback'], ['İade politikası', '/refund'], ['Kaynaklar', '/resources'], ['SSS', '/faq'], ['Güvenlik', '/security'], ['Yol haritası', '/roadmap'], ['Entegrasyonlar', '/integrations']] },
};

export function SiteNavigationEnhancer({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    const footerLinks = document.querySelector<HTMLElement>('footer .text-sm.font-medium');
    if (!footerLinks) return;
    const localized = labels[locale];
    const existingAnchors = Array.from(footerLinks.querySelectorAll<HTMLAnchorElement>('a'));
    const privacy = existingAnchors.find((anchor) => anchor.textContent?.trim() === localized.privacy);
    const terms = existingAnchors.find((anchor) => anchor.textContent?.trim() === localized.terms);
    if (privacy) privacy.href = '/privacy';
    if (terms) terms.href = '/terms';
    footerLinks.querySelectorAll('[data-yasaflow-resource-link], [data-yasaflow-contact-email]').forEach((node) => node.remove());
    localized.resources.forEach(([text, href]) => {
      const anchor = document.createElement('a');
      anchor.href = href;
      anchor.textContent = text;
      anchor.dataset.yasaflowResourceLink = 'true';
      anchor.className = 'hover:text-slate-950';
      footerLinks.insertBefore(anchor, privacy ?? null);
    });
    const email = document.createElement('a');
    email.href = 'mailto:hello@yasaflow.com';
    email.textContent = 'hello@yasaflow.com';
    email.dataset.yasaflowContactEmail = 'true';
    email.className = 'font-semibold text-[#2185DC] hover:text-[#176db6]';
    footerLinks.appendChild(email);
  }, [locale]);
  return null;
}
