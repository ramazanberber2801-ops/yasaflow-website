import { Logo } from '../branding/Logo';
import { LanguageSelector, type Locale } from '../../i18n';

const copy: Record<Locale, { description: string; about: string; contact: string; feedback: string; refund: string; privacy: string; terms: string; faq: string; security: string; copyright: string }> = {
  en: { description: 'A modern digital home for organizations, communities and members.', about: 'About Yasaflow', contact: 'Contact', feedback: 'Feedback', refund: 'Refund policy', privacy: 'Privacy', terms: 'Terms', faq: 'FAQ', security: 'Security', copyright: 'All rights reserved.' },
  nb: { description: 'Et moderne digitalt hjem for organisasjoner, fellesskap og medlemmer.', about: 'Om Yasaflow', contact: 'Kontakt', feedback: 'Tilbakemeldinger', refund: 'Refusjon', privacy: 'Personvern', terms: 'Vilkår', faq: 'FAQ', security: 'Sikkerhet', copyright: 'Alle rettigheter forbeholdt.' },
  tr: { description: 'Kurumlar, topluluklar ve üyeler için modern bir dijital merkez.', about: 'Yasaflow hakkında', contact: 'İletişim', feedback: 'Geri bildirim', refund: 'İade politikası', privacy: 'Gizlilik', terms: 'Koşullar', faq: 'SSS', security: 'Güvenlik', copyright: 'Tüm hakları saklıdır.' },
};

export function GlobalFooter({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const links = [
    [t.about, '/about'], [t.contact, '/contact'], [t.feedback, '/feedback'], [t.refund, '/refund'],
    [t.privacy, '/privacy'], [t.terms, '/terms'], [t.faq, '/faq'], [t.security, '/security'],
  ] as const;

  return <footer data-global-footer="true" className="border-t border-slate-200 bg-white px-5 py-12 sm:px-8">
    <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[1fr_auto] lg:items-start">
      <div><Logo /><p className="mt-4 max-w-md text-sm leading-6 text-slate-500">{t.description}</p><a href="mailto:hello@yasaflow.com" className="mt-4 inline-block text-sm font-semibold text-[#2185DC]">hello@yasaflow.com</a></div>
      <div className="grid gap-7 sm:grid-cols-[auto_auto] lg:justify-items-end">
        <nav className="flex max-w-xl flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-slate-600" aria-label="Footer navigation">{links.map(([label, href]) => <a key={href} href={href} className="hover:text-slate-950">{label}</a>)}</nav>
        <LanguageSelector />
      </div>
    </div>
    <div className="mx-auto mt-9 max-w-7xl border-t border-slate-200 pt-6 text-xs text-slate-500">© {new Date().getFullYear()} Yasaflow. {t.copyright}</div>
  </footer>;
}
