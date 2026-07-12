import { useEffect } from 'react';
import type { Locale } from './i18n';

const content: Record<Locale, { title: string; description: string }> = {
  en: { title: 'Resources and Documentation — Yasaflow', description: 'Explore Yasaflow FAQ, security principles, product roadmap and integration direction in one documentation center.' },
  nb: { title: 'Ressurser og dokumentasjon — Yasaflow', description: 'Utforsk Yasaflows FAQ, sikkerhetsprinsipper, produktveikart og integrasjonsretning i ett dokumentasjonssenter.' },
  tr: { title: 'Kaynaklar ve Dokümantasyon — Yasaflow', description: 'Yasaflow SSS, güvenlik ilkeleri, ürün yol haritası ve entegrasyon yönünü tek bir dokümantasyon merkezinde keşfedin.' },
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

export function ResourcesMetadata({ locale }: { locale: Locale }) {
  useEffect(() => {
    const page = content[locale];
    const url = 'https://yasaflow.com/resources';
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
