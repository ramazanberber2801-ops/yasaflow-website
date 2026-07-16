import { Check, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Logo } from './components/branding/Logo';
import { LanguageSelector, useI18n, type Locale } from './i18n';
import { getIncludedModules, getSelectablePaidModules } from './modules';
import { getModuleIcon } from './modules/icons';

const BASE_PRICE_NOK = 349;

const copy: Record<Locale, {
  eyebrow: string;
  title: string;
  intro: string;
  base: string;
  perMonth: string;
  included: string;
  storage: string;
  systemAlerts: string;
  extras: string;
  extrasBody: string;
  total: string;
  selected: string;
  cta: string;
  note: string;
  back: string;
}> = {
  en: {
    eyebrow: 'Simple modular pricing',
    title: 'Start with the essentials. Add only what you need.',
    intro: 'The core platform gives your organization a complete digital foundation. Active add-on modules can be selected as your needs grow.',
    base: 'Core platform',
    perMonth: 'NOK / month',
    included: 'Included in the core platform',
    storage: '2 GB storage',
    systemAlerts: 'System notifications',
    extras: 'Active add-on modules',
    extrasBody: 'Only modules that are available today are shown. New modules will appear automatically when they are activated.',
    total: 'Estimated monthly total',
    selected: 'Selected add-ons',
    cta: 'Create organization',
    note: 'Prices exclude any transaction fees from payment providers. Final subscription terms are confirmed before activation.',
    back: 'Back to home',
  },
  nb: {
    eyebrow: 'Enkel modulbasert pris',
    title: 'Start med det viktigste. Legg kun til det dere trenger.',
    intro: 'Grunnplattformen gir organisasjonen en komplett digital grunnmur. Aktive tilleggsmoduler kan velges etter hvert som behovene vokser.',
    base: 'Grunnplattform',
    perMonth: 'kr / mnd',
    included: 'Inkludert i grunnplattformen',
    storage: '2 GB lagring',
    systemAlerts: 'Systemvarsler',
    extras: 'Aktive tilleggsmoduler',
    extrasBody: 'Kun moduler som er tilgjengelige i dag vises. Nye moduler kommer automatisk på listen når de aktiveres.',
    total: 'Estimert månedspris',
    selected: 'Valgte tilleggsmoduler',
    cta: 'Opprett organisasjon',
    note: 'Prisene er eksklusive eventuelle transaksjonsgebyrer fra betalingsleverandører. Endelige abonnementsvilkår bekreftes før aktivering.',
    back: 'Tilbake til forsiden',
  },
  tr: {
    eyebrow: 'Sade ve modüler fiyatlandırma',
    title: 'Temel paketle başlayın. Yalnızca ihtiyacınız olan modülleri ekleyin.',
    intro: 'Temel platform kurumunuza eksiksiz bir dijital altyapı sunar. İhtiyaçlarınız arttıkça aktif ek modülleri seçebilirsiniz.',
    base: 'Temel platform',
    perMonth: 'NOK / ay',
    included: 'Temel platforma dahil',
    storage: '2 GB depolama',
    systemAlerts: 'Sistem bildirimleri',
    extras: 'Aktif ek modüller',
    extrasBody: 'Yalnızca bugün kullanıma açık modüller gösterilir. Yeni modüller etkinleştirildiğinde listeye otomatik olarak eklenir.',
    total: 'Tahmini aylık toplam',
    selected: 'Seçilen ek modüller',
    cta: 'Kurum oluştur',
    note: 'Fiyatlara ödeme sağlayıcılarının işlem ücretleri dahil değildir. Nihai abonelik koşulları etkinleştirme öncesinde onaylanır.',
    back: 'Ana sayfaya dön',
  },
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

  const total = useMemo(() => BASE_PRICE_NOK + addOns
    .filter((module) => selectedIds.includes(module.id))
    .reduce((sum, module) => sum + (module.monthlyPriceNok ?? 0), 0), [addOns, selectedIds]);

  function toggleModule(id: string) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return <div className="min-h-screen bg-slate-50 text-slate-950">
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="/" aria-label={t.back}><Logo /></a>
        <div className="flex items-center gap-3"><LanguageSelector compact /><a className="text-sm font-semibold text-slate-600 hover:text-slate-950" href="/">{t.back}</a></div>
      </div>
    </header>

    <main>
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">{t.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-.05em] sm:text-6xl">{t.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">{t.intro}</p>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,.07)] sm:p-8">
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
                <div><p className="text-sm font-semibold text-[#2185DC]">{t.base}</p><div className="mt-2 flex items-end gap-2"><span className="text-5xl font-semibold tracking-[-.05em]">{BASE_PRICE_NOK}</span><span className="pb-1 text-sm text-slate-500">{t.perMonth}</span></div></div>
                <a className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#2185DC] px-5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(33,133,220,.22)] hover:bg-[#1877c8]" href="/get-started">{t.cta}</a>
              </div>

              <h2 className="mt-7 text-lg font-semibold">{t.included}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {includedModules.map((module) => <div key={module.id} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm"><Check size={17} className="text-emerald-600" />{module.name[locale]}</div>)}
                {[t.storage, t.systemAlerts].map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm"><Check size={17} className="text-emerald-600" />{item}</div>)}
              </div>
            </section>

            <aside className="rounded-[2rem] bg-[#0F172A] p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,.2)] sm:p-8">
              <p className="text-sm font-semibold text-[#62b4ff]">{t.total}</p>
              <div className="mt-3 flex items-end gap-2"><span className="text-5xl font-semibold tracking-[-.05em]">{formatNok(total, locale)}</span><span className="pb-1 text-sm text-slate-400">{t.perMonth}</span></div>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm font-semibold text-white">{t.selected}</p>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <div className="flex justify-between gap-4"><span>{t.base}</span><span>{BASE_PRICE_NOK}</span></div>
                  {addOns.filter((module) => selectedIds.includes(module.id)).map((module) => <div key={module.id} className="flex justify-between gap-4"><span>{module.name[locale]}</span><span>+{module.monthlyPriceNok}</span></div>)}
                </div>
              </div>
              <p className="mt-8 text-xs leading-5 text-slate-400">{t.note}</p>
            </aside>
          </div>

          <section className="mt-16">
            <h2 className="text-3xl font-semibold tracking-[-.04em]">{t.extras}</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">{t.extrasBody}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {addOns.map((module) => {
                const Icon = getModuleIcon(module.icon);
                const selected = selectedIds.includes(module.id);
                return <button key={module.id} type="button" aria-pressed={selected} onClick={() => toggleModule(module.id)} className={`flex w-full items-start gap-4 rounded-3xl border p-5 text-left transition ${selected ? 'border-[#2185DC] bg-blue-50 shadow-[0_14px_40px_rgba(33,133,220,.12)]' : 'border-slate-200 bg-white hover:border-[#2185DC]/40 hover:shadow-md'}`}>
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${selected ? 'bg-[#2185DC] text-white' : 'bg-slate-100 text-[#2185DC]'}`}><Icon size={20} /></span>
                  <span className="min-w-0 flex-1"><span className="flex items-start justify-between gap-4"><strong>{module.name[locale]}</strong><span className="whitespace-nowrap text-sm font-semibold">{module.monthlyPriceNok} {t.perMonth}</span></span><span className="mt-2 block text-sm leading-6 text-slate-600">{module.description[locale]}</span></span>
                  <Plus size={18} className={`mt-1 shrink-0 transition ${selected ? 'rotate-45 text-[#2185DC]' : 'text-slate-400'}`} />
                </button>;
              })}
            </div>
          </section>
        </div>
      </section>
    </main>
  </div>;
}
