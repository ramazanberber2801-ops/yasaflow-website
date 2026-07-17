import { useEffect } from 'react';
import type { Locale } from './i18n';

const SITE_URL = 'https://yasaflow.com';
const SOCIAL_IMAGE = `${SITE_URL}/branding/yasaflow-icon.png`;

type RouteKey = 'home' | 'about' | 'contact' | 'pricing' | 'privacy' | 'terms' | 'refund' | 'faq' | 'security' | 'roadmap' | 'integrations' | 'notFound';
type Metadata = { title: string; description: string };

const shared = {
  en: {
    home: ['Yasaflow — One digital home for your organization','Yasaflow connects members, activities, communication, donations and administration in one calm, modular platform.'],
    about: ['About Yasaflow — Built for communities','Learn why Yasaflow is building a calm, modular and trustworthy digital foundation for membership-based organizations.'],
    contact: ['Contact Yasaflow — Book a demo','Contact Yasaflow to discuss your organization, explore relevant modules and book a product demo.'],
    pricing: ['Yasaflow Pricing — 7-day free trial','Try Yasaflow free for 7 days. The core platform starts from NOK 349 per month, with optional paid add-on modules.'],
    privacy: ['Privacy Policy — Yasaflow','Read how Yasaflow processes personal data when you visit the website, create an account or use the platform.'],
    terms: ['Terms and Conditions — Yasaflow','Read the terms for Yasaflow’s trial, pricing, automatic renewal, cancellation and platform services.'],
    refund: ['Refund and Cancellation Policy — Yasaflow','Read Yasaflow’s refund and cancellation policy for trials, subscriptions and optional add-on modules.'],
    faq: ['Frequently Asked Questions — Yasaflow','Find clear answers about Yasaflow, modules, administration, mobile access, languages and privacy.'],
    security: ['Security and Trust — Yasaflow','Read Yasaflow’s security direction, including access control, data protection, backups and incident readiness.'],
    roadmap: ['Product Roadmap — Yasaflow','Explore Yasaflow’s product direction and development statuses.'],
    integrations: ['Integrations — Yasaflow','See Yasaflow’s integration direction for email, notifications, payments, calendars and APIs.'],
    notFound: ['Page not found — Yasaflow','The requested Yasaflow page could not be found.'],
  },
  nb: {
    home: ['Yasaflow — Ett digitalt hjem for organisasjonen','Yasaflow samler medlemmer, aktiviteter, kommunikasjon, donasjoner og administrasjon i én rolig og modulær plattform.'],
    about: ['Om Yasaflow — Bygget for fellesskap','Les hvorfor Yasaflow bygger et modulært og tillitsfullt digitalt grunnlag for organisasjoner.'],
    contact: ['Kontakt Yasaflow — Bestill demo','Kontakt Yasaflow for å diskutere organisasjonen og bestille en produktdemo.'],
    pricing: ['Yasaflow priser — 7 dager gratis','Prøv Yasaflow gratis i 7 dager. Grunnplattformen koster fra 349 kr per måned, med valgfrie tilleggsmoduler.'],
    privacy: ['Personvernerklæring — Yasaflow','Les hvordan Yasaflow behandler personopplysninger på nettsiden og i plattformen.'],
    terms: ['Vilkår for bruk — Yasaflow','Les vilkårene for prøveperiode, pris, automatisk fornyelse, oppsigelse og plattformtjenester.'],
    refund: ['Refusjons- og kanselleringspolicy — Yasaflow','Les Yasaflows policy for prøveperiode, oppsigelse, fornyelse og refusjon.'],
    faq: ['Ofte stilte spørsmål — Yasaflow','Finn tydelige svar om Yasaflow, moduler, administrasjon, språk og personvern.'],
    security: ['Sikkerhet og tillit — Yasaflow','Les Yasaflows retning for tilgang, databeskyttelse, sikkerhetskopi og hendelseshåndtering.'],
    roadmap: ['Produktveikart — Yasaflow','Utforsk Yasaflows produktretning og utviklingsstatuser.'],
    integrations: ['Integrasjoner — Yasaflow','Se Yasaflows integrasjonsretning for e-post, varsler, betaling, kalender og API.'],
    notFound: ['Siden ble ikke funnet — Yasaflow','Den forespurte Yasaflow-siden finnes ikke.'],
  },
  tr: {
    home: ['Yasaflow — Kuruluşunuz için tek dijital merkez','Yasaflow üyeleri, etkinlikleri, iletişimi, bağışları ve yönetimi modüler bir platformda birleştirir.'],
    about: ['Yasaflow Hakkında','Yasaflow’un kuruluşlar için güvenilir dijital temelini keşfedin.'],
    contact: ['Yasaflow ile İletişim','Demo istemek için Yasaflow ile iletişime geçin.'],
    pricing: ['Yasaflow Fiyatları — 7 gün ücretsiz','Yasaflow’u 7 gün ücretsiz deneyin. Temel platform aylık 349 NOK’dan başlar ve ek modüller seçilebilir.'],
    privacy: ['Gizlilik Politikası — Yasaflow','Yasaflow’un kişisel verileri nasıl işlediğini okuyun.'],
    terms: ['Kullanım Koşulları — Yasaflow','Deneme, fiyat, otomatik yenileme ve iptal koşullarını okuyun.'],
    refund: ['İade ve İptal Politikası — Yasaflow','Deneme, abonelik ve ek modüller için iade ve iptal politikasını okuyun.'],
    faq: ['Sık Sorulan Sorular — Yasaflow','Yasaflow hakkında sık sorulan soruların yanıtlarını bulun.'],
    security: ['Güvenlik ve Güven — Yasaflow','Yasaflow güvenlik yaklaşımını okuyun.'],
    roadmap: ['Ürün Yol Haritası — Yasaflow','Yasaflow ürün yönünü keşfedin.'],
    integrations: ['Entegrasyonlar — Yasaflow','Yasaflow entegrasyon yönünü görün.'],
    notFound: ['Sayfa bulunamadı — Yasaflow','İstenen Yasaflow sayfası bulunamadı.'],
  },
} as const;

const metadata = Object.fromEntries(Object.entries(shared).map(([locale, pages]) => [locale, Object.fromEntries(Object.entries(pages).map(([key, [title, description]]) => [key, { title, description }]))])) as Record<Locale, Record<RouteKey, Metadata>>;

const routeKey = (path: string): RouteKey => ({ '/':'home','/about':'about','/contact':'contact','/pricing':'pricing','/privacy':'privacy','/terms':'terms','/refund':'refund','/faq':'faq','/security':'security','/roadmap':'roadmap','/integrations':'integrations' }[path] as RouteKey | undefined) ?? 'notFound';

function setMeta(selector: string, attributes: Record<string, string>, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) { element = document.createElement('meta'); Object.entries(attributes).forEach(([key, item]) => element?.setAttribute(key, item)); document.head.appendChild(element); }
  element.setAttribute('content', value);
}

function setCanonical(url: string) {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
  canonical.href = url;
}

export function usePageMetadata(path: string, locale: Locale) {
  useEffect(() => {
    const key = routeKey(path);
    const page = metadata[locale][key];
    const canonicalUrl = `${SITE_URL}${key === 'notFound' ? path : path === '/' ? '' : path}`;
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
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, page.title);
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, page.description);
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, SOCIAL_IMAGE);
  }, [locale, path]);
}
