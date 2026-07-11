import { useEffect } from 'react';
import type { Locale } from './i18n';

const SITE_URL = 'https://yasaflow.com';
const SOCIAL_IMAGE = `${SITE_URL}/branding/yasaflow-icon.png`;

type RouteKey = 'home' | 'about' | 'contact' | 'privacy' | 'terms' | 'faq' | 'notFound';
type Metadata = { title: string; description: string };

const metadata: Record<Locale, Record<RouteKey, Metadata>> = {
  en: {
    home: { title: 'Yasaflow — One digital home for your organization', description: 'Yasaflow connects members, activities, communication, donations and administration in one calm, modular platform.' },
    about: { title: 'About Yasaflow — Built for communities', description: 'Learn why Yasaflow is building a calm, modular and trustworthy digital foundation for membership-based organizations.' },
    contact: { title: 'Contact Yasaflow — Book a demo', description: 'Contact Yasaflow to discuss your organization, explore relevant modules and book a product demo.' },
    privacy: { title: 'Privacy — Yasaflow', description: 'Read the current privacy information for the Yasaflow public website and how direct email enquiries are handled.' },
    terms: { title: 'Website Terms — Yasaflow', description: 'Read the current terms for using the Yasaflow public website and its informational product content.' },
    faq: { title: 'Frequently Asked Questions — Yasaflow', description: 'Find clear answers about Yasaflow, modules, administration, mobile access, languages, privacy and the platform’s product direction.' },
    notFound: { title: 'Page not found — Yasaflow', description: 'The requested Yasaflow page could not be found.' },
  },
  nb: {
    home: { title: 'Yasaflow — Ett digitalt hjem for organisasjonen', description: 'Yasaflow samler medlemmer, aktiviteter, kommunikasjon, donasjoner og administrasjon i én rolig og modulær plattform.' },
    about: { title: 'Om Yasaflow — Bygget for fellesskap', description: 'Les hvorfor Yasaflow bygger et rolig, modulært og tillitsfullt digitalt grunnlag for medlemsbaserte organisasjoner.' },
    contact: { title: 'Kontakt Yasaflow — Bestill demo', description: 'Kontakt Yasaflow for å diskutere organisasjonen, utforske aktuelle moduler og bestille en produktdemo.' },
    privacy: { title: 'Personvern — Yasaflow', description: 'Les gjeldende personverninformasjon for Yasaflows offentlige nettside og hvordan e-posthenvendelser behandles.' },
    terms: { title: 'Vilkår for nettsiden — Yasaflow', description: 'Les gjeldende vilkår for bruk av Yasaflows offentlige nettside og informasjonsinnhold.' },
    faq: { title: 'Ofte stilte spørsmål — Yasaflow', description: 'Finn tydelige svar om Yasaflow, moduler, administrasjon, mobiltilgang, språk, personvern og produktretningen.' },
    notFound: { title: 'Siden ble ikke funnet — Yasaflow', description: 'Den forespurte Yasaflow-siden finnes ikke.' },
  },
  tr: {
    home: { title: 'Yasaflow — Kuruluşunuz için tek dijital merkez', description: 'Yasaflow üyeleri, etkinlikleri, iletişimi, bağışları ve yönetimi sakin ve modüler bir platformda birleştirir.' },
    about: { title: 'Yasaflow Hakkında — Topluluklar için geliştirildi', description: 'Yasaflow’un üyelik temelli kuruluşlar için sakin, modüler ve güvenilir bir dijital temel oluşturma nedenini öğrenin.' },
    contact: { title: 'Yasaflow ile İletişim — Demo isteyin', description: 'Kuruluşunuzu görüşmek, ilgili modülleri keşfetmek ve ürün demosu istemek için Yasaflow ile iletişime geçin.' },
    privacy: { title: 'Gizlilik — Yasaflow', description: 'Yasaflow halka açık web sitesinin mevcut gizlilik bilgilerini ve doğrudan e-posta taleplerinin nasıl işlendiğini okuyun.' },
    terms: { title: 'Web Sitesi Koşulları — Yasaflow', description: 'Yasaflow halka açık web sitesinin ve bilgilendirme içeriğinin kullanım koşullarını okuyun.' },
    faq: { title: 'Sık Sorulan Sorular — Yasaflow', description: 'Yasaflow, modüller, yönetim, mobil erişim, diller, gizlilik ve ürün yönü hakkında net cevaplar bulun.' },
    notFound: { title: 'Sayfa bulunamadı — Yasaflow', description: 'İstenen Yasaflow sayfası bulunamadı.' },
  },
};

const routeKey = (path: string): RouteKey => {
  if (path === '/') return 'home';
  if (path === '/about') return 'about';
  if (path === '/contact') return 'contact';
  if (path === '/privacy') return 'privacy';
  if (path === '/terms') return 'terms';
  if (path === '/faq') return 'faq';
  return 'notFound';
};

function setMeta(selector: string, attributes: Record<string, string>, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(url: string) {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
}

export function usePageMetadata(path: string, locale: Locale) {
  useEffect(() => {
    const key = routeKey(path);
    const page = metadata[locale][key];
    const canonicalUrl = `${SITE_URL}${key === 'notFound' ? path : path === '/' ? '' : path}`;
    const ogLocale = locale === 'nb' ? 'nb_NO' : locale === 'tr' ? 'tr_TR' : 'en_US';

    document.title = page.title;
    document.documentElement.lang = locale === 'nb' ? 'nb-NO' : locale;
    setCanonical(canonicalUrl);
    setMeta('meta[name="description"]', { name: 'description' }, page.description);
    setMeta('meta[name="robots"]', { name: 'robots' }, key === 'notFound' ? 'noindex, nofollow' : 'index, follow');
    setMeta('meta[property="og:type"]', { property: 'og:type' }, 'website');
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, 'Yasaflow');
    setMeta('meta[property="og:title"]', { property: 'og:title' }, page.title);
    setMeta('meta[property="og:description"]', { property: 'og:description' }, page.description);
    setMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);
    setMeta('meta[property="og:image"]', { property: 'og:image' }, SOCIAL_IMAGE);
    setMeta('meta[property="og:image:alt"]', { property: 'og:image:alt' }, 'Yasaflow logo');
    setMeta('meta[property="og:locale"]', { property: 'og:locale' }, ogLocale);
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, page.title);
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, page.description);
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, SOCIAL_IMAGE);

    let schema = document.head.querySelector<HTMLScriptElement>('script[data-yasaflow-schema]');
    if (!schema) {
      schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.dataset.yasaflowSchema = 'true';
      document.head.appendChild(schema);
    }
    schema.text = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: 'Yasaflow', url: SITE_URL, logo: SOCIAL_IMAGE, email: 'hello@yasaflow.com', description: metadata[locale].home.description });
  }, [locale, path]);
}
