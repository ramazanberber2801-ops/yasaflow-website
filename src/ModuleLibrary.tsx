import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Logo } from './components/branding/Logo';
import { LanguageSelector, useI18n, type Locale } from './i18n';
import { getPublicModules, type ModuleCategory } from './modules';
import { getModuleIcon } from './modules/icons';

const copy: Record<Locale, {
  eyebrow: string; title: string; intro: string; search: string; all: string; included: string; extension: string;
  noResults: string; categories: Record<ModuleCategory, string>; back: string;
}> = {
  en: {
    eyebrow: 'Module Library', title: 'Explore what Yasaflow can do.',
    intro: 'Browse the active modules currently available on the public website. This library updates automatically from Yasaflow’s central module source.',
    search: 'Search modules', all: 'All', included: 'Included', extension: 'Optional extension', noResults: 'No modules matched your search.', back: 'Back to home',
    categories: { core: 'Core', communication: 'Communication', engagement: 'Engagement', finance: 'Finance', management: 'Management', religion: 'Religion', other: 'Other' },
  },
  nb: {
    eyebrow: 'Modulbibliotek', title: 'Utforsk hva Yasaflow kan gjøre.',
    intro: 'Se de aktive modulene som er tilgjengelige på den offentlige nettsiden. Biblioteket oppdateres automatisk fra Yasaflows sentrale modulkilde.',
    search: 'Søk i moduler', all: 'Alle', included: 'Inkludert', extension: 'Valgfritt tillegg', noResults: 'Ingen moduler samsvarte med søket.', back: 'Tilbake til forsiden',
    categories: { core: 'Kjerne', communication: 'Kommunikasjon', engagement: 'Engasjement', finance: 'Økonomi', management: 'Administrasjon', religion: 'Trossamfunn', other: 'Annet' },
  },
  tr: {
    eyebrow: 'Modül Kütüphanesi', title: 'Yasaflow’un neler yapabildiğini keşfedin.',
    intro: 'Halka açık web sitesinde bulunan aktif modülleri inceleyin. Bu kütüphane Yasaflow’un merkezi modül kaynağından otomatik olarak güncellenir.',
    search: 'Modüllerde ara', all: 'Tümü', included: 'Dahil', extension: 'İsteğe bağlı ek', noResults: 'Aramanızla eşleşen modül bulunamadı.', back: 'Ana sayfaya dön',
    categories: { core: 'Temel', communication: 'İletişim', engagement: 'Katılım', finance: 'Finans', management: 'Yönetim', religion: 'İnanç', other: 'Diğer' },
  },
};

export default function ModuleLibrary() {
  const { locale } = useI18n();
  const t = copy[locale];
  const modules = getPublicModules();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | ModuleCategory>('all');

  const categories = useMemo(() => Array.from(new Set(modules.map((module) => module.category))), [modules]);
  const filtered = modules.filter((module) => {
    const haystack = `${module.name[locale]} ${module.description[locale]}`.toLowerCase();
    return (category === 'all' || module.category === category) && haystack.includes(query.trim().toLowerCase());
  });

  return <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="/" aria-label={t.back}><Logo /></a>
        <div className="flex items-center gap-3"><LanguageSelector compact /><a className="hidden text-sm font-semibold text-slate-600 hover:text-slate-950 sm:inline" href="/">{t.back}</a></div>
      </div>
    </header>

    <main>
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">{t.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-.05em] sm:text-6xl">{t.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">{t.intro}</p>

          <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block w-full max-w-xl">
              <span className="sr-only">{t.search}</span><Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:ring-4 focus:ring-[#2185DC]/15" />
            </label>
            <div className="flex flex-wrap gap-2" aria-label="Module categories">
              <button type="button" onClick={() => setCategory('all')} className={`rounded-full px-4 py-2 text-sm font-semibold ${category === 'all' ? 'bg-[#0F172A] text-white' : 'border border-slate-200 bg-white text-slate-600'}`}>{t.all}</button>
              {categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-semibold ${category === item ? 'bg-[#0F172A] text-white' : 'border border-slate-200 bg-white text-slate-600'}`}>{t.categories[item]}</button>)}
            </div>
          </div>

          {filtered.length > 0 ? <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((module) => { const Icon = getModuleIcon(module.icon); return <article key={module.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)]">
              <div className="flex items-start justify-between gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#2185DC]/10 text-[#2185DC]"><Icon size={23} /></span><span className={`rounded-full px-3 py-1 text-xs font-semibold ${module.included ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{module.included ? t.included : t.extension}</span></div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[.14em] text-slate-400">{t.categories[module.category]}</p>
              <h2 className="mt-2 text-xl font-semibold">{module.name[locale]}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{module.description[locale]}</p>
            </article>; })}
          </div> : <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">{t.noResults}</div>}
        </div>
      </section>
    </main>
  </div>;
}
