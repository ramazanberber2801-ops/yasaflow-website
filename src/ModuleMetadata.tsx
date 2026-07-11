import { useEffect } from 'react';
import type { Locale } from './i18n';

const content: Record<Locale, { title: string; description: string }> = {
  en: { title: 'Module Library — Yasaflow', description: 'Explore active Yasaflow modules for communication, members, activities, administration and more.' },
  nb: { title: 'Modulbibliotek — Yasaflow', description: 'Utforsk aktive Yasaflow-moduler for kommunikasjon, medlemmer, aktiviteter, administrasjon og mer.' },
  tr: { title: 'Modül Kütüphanesi — Yasaflow', description: 'İletişim, üyeler, etkinlikler, yönetim ve daha fazlası için aktif Yasaflow modüllerini keşfedin.' },
};

function setMeta(selector: string, attr: 'name' | 'property', key: string, value: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, key);
    document.head.appendChild(meta);
  }
  meta.content = value;
}

export function ModuleMetadata({ locale }: { locale: Locale }) {
  useEffect(() => {
    const page = content[locale];
    const url = 'https://yasaflow.com/modules';
    document.title = page.title;
    setMeta('meta[name="description"]', 'name', 'description', page.description);
    setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow');
    setMeta('meta[property="og:title"]', 'property', 'og:title', page.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', page.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', page.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', page.description);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [locale]);

  return null;
}
