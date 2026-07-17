import { Check, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Logo } from './components/branding/Logo';
import { LanguageSelector, useI18n, type Locale } from './i18n';
import { getIncludedModules, getSelectablePaidModules } from './modules';
import { getModuleIcon } from './modules/icons';

const BASE_PRICE_NOK = 349;
const pricingSelectionKey = 'yasaflow.pricing-selection.v1';

const copy: Record<Locale, Record<string, string>> = {
  en: { eyebrow:'Simple modular pricing', title:'7 days free. Then pay only for what you need.', intro:'The core platform starts from NOK 349 per month after the free trial. Optional add-on modules increase the monthly price, and the complete total is shown before purchase.', base:'Core platform', perMonth:'NOK / month', included:'Included in the core platform', storage:'2 GB storage', alerts:'System notifications', extras:'Optional add-on modules', extrasBody:'Select available modules to calculate your monthly subscription total.', total:'Monthly total after trial', selected:'Selected add-ons', cta:'Continue to registration', renewal:'Your selections are carried into registration. Payment opens only after the organization is created.', back:'Back to home' },
  nb: { eyebrow:'Enkel modulbasert pris', title:'7 dager gratis. Betal deretter bare for det dere trenger.', intro:'Etter prøveperioden koster grunnplattformen fra 349 kr per måned. Valgfrie tilleggsmoduler øker månedsprisen, og den totale abonnementsprisen vises tydelig før kjøpet bekreftes.', base:'Grunnplattform', perMonth:'kr / mnd', included:'Inkludert i grunnplattformen', storage:'2 GB lagring', alerts:'Systemvarsler', extras:'Valgfrie tilleggsmoduler', extrasBody:'Velg tilgjengelige moduler for å beregne den totale månedsprisen.', total:'Månedspris etter prøveperioden', selected:'Valgte tilleggsmoduler', cta:'Fortsett til registrering', renewal:'Valgene tas med videre til registreringen. Betaling åpnes først etter at organisasjonen er opprettet.', back:'Tilbake til forsiden' },
  tr: { eyebrow:'Sade ve modüler fiyatlandırma', title:'7 gün ücretsiz. Sonrasında yalnızca ihtiyacınız olanlar için ödeyin.', intro:'Ücretsiz denemeden sonra temel platform aylık 349 NOK’dan başlar. Ek modüller aylık fiyatı artırır ve toplam abonelik fiyatı satın almadan önce gösterilir.', base:'Temel platform', perMonth:'NOK / ay', included:'Temel platforma dahil', storage:'2 GB depolama', alerts:'Sistem bildirimleri', extras:'İsteğe bağlı ek modüller', extrasBody:'Toplam aylık abonelik ücretini hesaplamak için modülleri seçin.', total:'Deneme sonrası aylık toplam', selected:'Seçilen ek modüller', cta:'Kayıt işlemine devam et', renewal:'Seçimleriniz kayıt adımına taşınır. Ödeme yalnızca kuruluş oluşturulduktan sonra açılır.', back:'Ana sayfaya dön' },
};

function formatNok(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === 'nb' ? 'nb-NO' : locale === 'tr' ? 'tr-TR' : 'en-GB').format(value);
}

export default function PricingPage() {
  const { locale } = useI18n();
  const t = copy[locale];
  const includedModules = getIncludedModules();
  const addOns = getSelectablePaidModules();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const total = useMemo(() => BASE_PRICE_NOK + addOns.filter((module) => selectedIds.includes(module.id)).reduce((sum, module) => sum + (module.monthlyPriceNok ?? 0), 0), [addOns, selectedIds]);
  const toggleModule = (id: string) => setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  const continueToRegistration = () => {
    localStorage.setItem(pricingSelectionKey, JSON.stringify({ selectedModules: selectedIds, totalNok: total, createdAt: Date.now() }));
    window.location.assign('/get-started');
  };

  return <div className="min-h-screen bg-slate-50 text-slate-950">
    <header className="border-b border-slate-200 bg-white/95"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"><a href="/"><Logo /></a><div className="flex items-center gap-3"><LanguageSelector compact /><a className="text-sm font-semibold text-slate-600" href="/">{t.back}</a></div></div></header>
    <main className="px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto max-w-7xl">
      <p className="text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">{t.eyebrow}</p>
      <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-.05em] sm:text-6xl">{t.title}</h1>
      <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">{t.intro}</p>
      <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold text-[#2185DC]">{t.base}</p><div className="mt-2 flex items-end gap-2"><span className="text-5xl font-semibold">{BASE_PRICE_NOK}</span><span className="pb-1 text-sm text-slate-500">{t.perMonth}</span></div></div><button type="button" onClick={continueToRegistration} className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#2185DC] px-5 text-sm font-semibold text-white">{t.cta}</button></div>
          <h2 className="mt-7 text-lg font-semibold">{t.included}</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{includedModules.map((module) => <div key={module.id} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm"><Check size={17} className="text-emerald-600" />{module.name[locale]}</div>)}{[t.storage,t.alerts].map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm"><Check size={17} className="text-emerald-600" />{item}</div>)}</div>
          <p className="mt-7 text-xs leading-5 text-slate-500">{t.renewal}</p>
        </section>
        <aside className="rounded-[2rem] bg-[#0F172A] p-6 text-white sm:p-8"><p className="text-sm font-semibold text-[#62b4ff]">{t.total}</p><div className="mt-3 flex items-end gap-2"><span className="text-5xl font-semibold">{formatNok(total, locale)}</span><span className="pb-1 text-sm text-slate-400">{t.perMonth}</span></div><div className="mt-8 border-t border-white/10 pt-6"><p className="text-sm font-semibold">{t.selected}</p><div className="mt-4 space-y-3 text-sm text-slate-300"><div className="flex justify-between"><span>{t.base}</span><span>{BASE_PRICE_NOK}</span></div>{addOns.filter((module) => selectedIds.includes(module.id)).map((module) => <div key={module.id} className="flex justify-between"><span>{module.name[locale]}</span><span>+{module.monthlyPriceNok}</span></div>)}</div></div></aside>
      </div>
      <section className="mt-16"><h2 className="text-3xl font-semibold">{t.extras}</h2><p className="mt-4 max-w-2xl text-slate-600">{t.extrasBody}</p><div className="mt-8 grid gap-4 md:grid-cols-2">{addOns.map((module) => { const Icon=getModuleIcon(module.icon); const selected=selectedIds.includes(module.id); return <button key={module.id} type="button" aria-pressed={selected} onClick={() => toggleModule(module.id)} className={`flex w-full items-start gap-4 rounded-3xl border p-5 text-left ${selected ? 'border-[#2185DC] bg-blue-50' : 'border-slate-200 bg-white'}`}><span className={`grid h-11 w-11 place-items-center rounded-2xl ${selected ? 'bg-[#2185DC] text-white' : 'bg-slate-100 text-[#2185DC]'}`}><Icon size={20}/></span><span className="min-w-0 flex-1"><span className="flex justify-between gap-4"><strong>{module.name[locale]}</strong><span className="whitespace-nowrap text-sm font-semibold">+{module.monthlyPriceNok} {t.perMonth}</span></span><span className="mt-2 block text-sm leading-6 text-slate-600">{module.description[locale]}</span></span><Plus size={18} className={selected ? 'rotate-45 text-[#2185DC]' : 'text-slate-400'} /></button>; })}</div></section>
    </div></main>
  </div>;
}
