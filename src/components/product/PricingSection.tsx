import { Check } from 'lucide-react';
import { useLayoutEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { Locale } from '../../i18n';
import { getIncludedModules, getSelectablePaidModules } from '../../modules';

const BASE_PRICE_NOK = 349;

const copy = {
  en: { eyebrow: 'Pricing', title: 'Start with the core platform. Add only what you need.', intro: 'The base platform includes the essential tools. Active add-on modules can be selected as your organization grows.', base: 'Core platform', monthly: 'NOK/month', included: 'Included in the base platform', addOns: 'Active add-on modules', addOnIntro: 'Select modules to calculate the monthly total.', total: 'Estimated monthly total', start: 'Create organization', storage: '2 GB storage', alerts: 'System notifications', selected: 'Selected', select: 'Add module' },
  nb: { eyebrow: 'Priser', title: 'Start med grunnplattformen. Legg bare til det dere trenger.', intro: 'Grunnplattformen inneholder de viktigste verktøyene. Aktive tilleggsmoduler kan velges når organisasjonen får nye behov.', base: 'Grunnplattform', monthly: 'kr/mnd', included: 'Inkludert i grunnplattformen', addOns: 'Aktive tilleggsmoduler', addOnIntro: 'Velg moduler for å beregne månedsprisen.', total: 'Beregnet total per måned', start: 'Opprett organisasjon', storage: '2 GB lagring', alerts: 'Systemvarsler', selected: 'Valgt', select: 'Legg til modul' },
  tr: { eyebrow: 'Fiyatlandırma', title: 'Temel platformla başlayın. Yalnızca ihtiyacınız olan modülleri ekleyin.', intro: 'Temel platform en önemli araçları içerir. Kurumunuz büyüdükçe aktif ek modülleri seçebilirsiniz.', base: 'Temel platform', monthly: 'NOK/ay', included: 'Temel platforma dahil', addOns: 'Aktif ek modüller', addOnIntro: 'Aylık toplamı hesaplamak için modülleri seçin.', total: 'Tahmini aylık toplam', start: 'Kurum oluştur', storage: '2 GB depolama', alerts: 'Sistem bildirimleri', selected: 'Seçildi', select: 'Modül ekle' },
} satisfies Record<Locale, Record<string, string>>;

function PricingContent({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const includedModules = getIncludedModules();
  const paidModules = getSelectablePaidModules();
  const [selected, setSelected] = useState<string[]>([]);
  const addOnTotal = paidModules.filter((module) => selected.includes(module.id)).reduce((sum, module) => sum + (module.monthlyPriceNok ?? 0), 0);
  const total = BASE_PRICE_NOK + addOnTotal;

  return <section id="pricing" className="bg-slate-50 px-5 py-24 sm:px-8 lg:py-32">
    <div className="mx-auto max-w-7xl">
      <p className="text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">{t.eyebrow}</p>
      <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-.04em] text-slate-950 sm:text-5xl">{t.title}</h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{t.intro}</p>
      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_55px_rgba(15,23,42,.07)] sm:p-9">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-[#2185DC]">{t.base}</p><p className="mt-3 text-5xl font-semibold tracking-[-.05em] text-slate-950">{BASE_PRICE_NOK}</p></div><p className="pb-2 text-sm font-semibold text-slate-500">{t.monthly}</p></div>
          <h3 className="mt-9 text-sm font-semibold uppercase tracking-[.14em] text-slate-500">{t.included}</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {includedModules.map((module) => <li key={module.id} className="flex items-center gap-3 text-sm font-medium text-slate-700"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Check size={15} /></span>{module.name[locale]}</li>)}
            {[t.storage, t.alerts].map((item) => <li key={item} className="flex items-center gap-3 text-sm font-medium text-slate-700"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Check size={15} /></span>{item}</li>)}
          </ul>
          <a href="/get-started" className="mt-9 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#2185DC] px-5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(33,133,220,.24)] transition hover:bg-[#1877c8] focus:outline-none focus:ring-4 focus:ring-[#2185DC]/20">{t.start}</a>
        </article>
        <article className="rounded-[2rem] bg-[#0F172A] p-7 text-white shadow-[0_24px_70px_rgba(15,23,42,.18)] sm:p-9">
          <h3 className="text-2xl font-semibold tracking-[-.03em]">{t.addOns}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">{t.addOnIntro}</p>
          <div className="mt-7 space-y-3">
            {paidModules.map((module) => { const active = selected.includes(module.id); return <button key={module.id} type="button" aria-pressed={active} onClick={() => setSelected((current) => active ? current.filter((id) => id !== module.id) : [...current, module.id])} className={`flex min-h-16 w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition ${active ? 'border-[#62b4ff] bg-[#2185DC]/15' : 'border-white/10 bg-white/[.04] hover:border-white/25 hover:bg-white/[.07]'}`}><span><span className="block font-semibold">{module.name[locale]}</span><span className="mt-1 block text-xs text-slate-400">{active ? t.selected : t.select}</span></span><span className="shrink-0 text-sm font-semibold text-[#8bc8ff]">+{module.monthlyPriceNok} {t.monthly}</span></button>; })}
          </div>
          <div className="mt-8 border-t border-white/10 pt-6"><div className="flex items-end justify-between gap-4"><p className="text-sm text-slate-300">{t.total}</p><p className="text-4xl font-semibold tracking-[-.04em]">{total} <span className="text-sm font-medium text-slate-400">{t.monthly}</span></p></div></div>
        </article>
      </div>
    </div>
  </section>;
}

export function PricingSection({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    if (document.getElementById('pricing')) return;
    const contact = document.getElementById('contact');
    const mount = document.createElement('div');
    mount.dataset.pricingMount = 'true';
    if (contact?.parentElement) contact.parentElement.insertBefore(mount, contact);
    else document.querySelector('main')?.appendChild(mount);
    const root = createRoot(mount);
    root.render(<PricingContent locale={locale} />);
    return () => { root.unmount(); mount.remove(); };
  }, [locale]);
  return null;
}
