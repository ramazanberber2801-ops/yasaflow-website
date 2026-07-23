import { Menu } from 'lucide-react';
import { Logo } from '../branding/Logo';
import { LanguageSelector, type Locale } from '../../i18n';

const copy: Record<Locale, { products: string; solutions: string; clinics: string; pricing: string; resources: string; about: string; contact: string; login: string; menu: string; skip: string }> = {
  en: { products: 'Products', solutions: 'Solutions', clinics: 'Clinics', pricing: 'Pricing', resources: 'Resources', about: 'About', contact: 'Contact', login: 'Log in', menu: 'Open navigation', skip: 'Skip to main content' },
  nb: { products: 'Produkter', solutions: 'Løsninger', clinics: 'Klinikker', pricing: 'Priser', resources: 'Ressurser', about: 'Om oss', contact: 'Kontakt', login: 'Logg inn', menu: 'Åpne navigasjon', skip: 'Hopp til hovedinnhold' },
  tr: { products: 'Ürünler', solutions: 'Çözümler', clinics: 'Klinikler', pricing: 'Fiyatlandırma', resources: 'Kaynaklar', about: 'Hakkımızda', contact: 'İletişim', login: 'Giriş yap', menu: 'Navigasyonu aç', skip: 'Ana içeriğe geç' },
};

export function GlobalHeader({ locale, path }: { locale: Locale; path: string }) {
  const t = copy[locale];
  const links = [
    [t.products, '/modules'],
    [t.solutions, '/#solutions'],
    [t.resources, '/resources'],
    [t.about, '/about'],
    [t.contact, '/contact'],
  ] as const;
  const mobileLinks = [
    [t.pricing, '/pricing'],
    [t.products, '/modules'],
    [t.solutions, '/#solutions'],
    [t.clinics, '/klinikker'],
    [t.resources, '/resources'],
    [t.about, '/about'],
    [t.contact, '/contact'],
    [t.login, '/login'],
  ] as const;
  const pricingActive = path === '/pricing';
  const loginActive = path === '/login';

  return <>
    <a className="skip-link" href="#main-content">{t.skip}</a>
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:min-h-20 sm:gap-4 sm:px-8">
        <a href="/" aria-label="Yasaflow" className="min-w-0 shrink"><Logo /></a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => {
            const target = href.split('#')[0] || '/';
            const active = target !== '/' && path === target;
            return <a key={href} href={href} aria-current={active ? 'page' : undefined} className={`min-h-11 rounded-xl px-3 py-3 text-sm font-semibold transition ${active ? 'bg-[#2185DC]/10 text-[#2185DC]' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`}>{label}</a>;
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a href="/login" aria-current={loginActive ? 'page' : undefined} className={`hidden min-h-11 items-center rounded-xl px-3 text-sm font-semibold lg:inline-flex ${loginActive ? 'bg-slate-100 text-slate-950' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'}`}>{t.login}</a>
          <a href="/pricing" aria-current={pricingActive ? 'page' : undefined} className={`hidden min-h-11 items-center rounded-xl px-4 text-sm font-semibold lg:inline-flex ${pricingActive ? 'bg-[#176db6] text-white' : 'bg-[#2185DC] text-white hover:bg-[#176db6]'}`}>{t.pricing}</a>
          <LanguageSelector compact />
          <details className="relative lg:hidden">
            <summary aria-label={t.menu} className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-xl border border-slate-200 bg-white text-slate-700"><Menu aria-hidden="true" size={20} /></summary>
            <nav className="absolute right-0 top-14 w-[min(16rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-2 shadow-xl" aria-label="Mobile navigation">
              {mobileLinks.map(([label, href]) => {
                const target = href.split('#')[0] || '/';
                const active = target !== '/' && path === target;
                return <a key={href} href={href} aria-current={active ? 'page' : undefined} className={`block min-h-12 rounded-xl px-4 py-3 text-sm font-semibold ${active ? 'bg-[#2185DC]/10 text-[#2185DC]' : 'text-slate-700 hover:bg-slate-100'}`}>{label}</a>;
              })}
            </nav>
          </details>
        </div>
      </div>
    </header>
  </>;
}
