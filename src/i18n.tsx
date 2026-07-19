import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Locale = 'en' | 'nb' | 'tr' | 'da';
const STORAGE_KEY = 'yasaflow-locale';
const supportedLocales: Locale[] = ['en', 'nb', 'da', 'tr'];
export const localeNames: Record<Locale, string> = { en: 'English', nb: 'Norsk', da: 'Dansk', tr: 'Türkçe' };

function detectLocale(): Locale {
  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && supportedLocales.includes(stored)) return stored;
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const candidate of languages) {
    const language = candidate.toLowerCase();
    if (language.startsWith('nb') || language.startsWith('nn') || language.startsWith('no')) return 'nb';
    if (language.startsWith('da')) return 'da';
    if (language.startsWith('tr')) return 'tr';
  }
  return 'en';
}

type I18nContextValue = { locale: Locale; setLocale: (locale: Locale) => void; supportedLocales: Locale[] };
const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale());
  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
  };
  useEffect(() => {
    const languageTags: Record<Locale, string> = { en: 'en-GB', nb: 'nb-NO', da: 'da-DK', tr: 'tr-TR' };
    document.documentElement.lang = languageTags[locale];
  }, [locale]);
  const value = useMemo(() => ({ locale, setLocale, supportedLocales }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside I18nProvider');
  return value;
}

export function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, supportedLocales } = useI18n();
  const labels: Record<Locale, string> = { en: 'Language', nb: 'Språk', da: 'Sprog', tr: 'Dil' };
  const label = labels[locale];
  return <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-600"><span className={compact ? 'sr-only' : ''}>{label}</span><select aria-label={label} value={locale} onChange={(event) => setLocale(event.target.value as Locale)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:ring-4 focus:ring-[#2185DC]/20">{supportedLocales.map((item) => <option key={item} value={item}>{localeNames[item]}</option>)}</select></label>;
}
