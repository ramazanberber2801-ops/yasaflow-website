import { ArrowLeft, ArrowRight, Check, Mail } from 'lucide-react';
import type { MouseEvent, ReactNode } from 'react';
import App from './App';
import { Logo } from './components/branding/Logo';
import { LanguageSelector, useI18n, type Locale } from './i18n';

type Card = { title: string; body: ReactNode };
type PageCopy = { eyebrow: string; title: string; intro: string; cards: Card[]; ctaTitle: string; ctaBody: string };

type SiteCopy = {
  back: string;
  home: string;
  contact: string;
  legalDraft: string;
  pages: Record<'about' | 'contact' | 'privacy' | 'terms', PageCopy>;
};

const siteCopy: Record<Locale, SiteCopy> = {
  en: {
    back: 'Back to home', home: 'Home', contact: 'Contact Yasaflow', legalDraft: 'Draft for legal review before launch.',
    pages: {
      about: {
        eyebrow: 'About Yasaflow', title: 'Technology that gives communities more room to lead.',
        intro: 'Yasaflow is being built as a long-term digital home for membership-based organizations that need clarity, trust and simpler daily operations.',
        cards: [
          { title: 'Why we exist', body: 'Organizations should not need many disconnected tools to communicate, coordinate activities and support their members.' },
          { title: 'How we build', body: 'We design calm, modular software that adapts to different communities without adding unnecessary complexity.' },
          { title: 'What we protect', body: 'Clarity, accessibility and responsible growth remain product standards as Yasaflow develops.' },
        ],
        ctaTitle: 'Building for the long term.', ctaBody: 'Yasaflow is designed to grow with organizations, not force them to rebuild their digital foundation.'
      },
      contact: {
        eyebrow: 'Contact', title: 'Tell us what your organization needs.',
        intro: 'Share how your organization works today, where the work becomes difficult and which parts of Yasaflow are most relevant.',
        cards: [
          { title: 'General enquiries', body: <a className="inline-flex items-center gap-2 font-semibold text-[#2185DC]" href="mailto:hello@yasaflow.com"><Mail size={18} />hello@yasaflow.com</a> },
          { title: 'Book a demo', body: 'Send a short description of your organization and the modules you would like to explore.' },
          { title: 'No form tracking', body: 'This page currently uses direct email only. The website does not collect contact-form data.' },
        ],
        ctaTitle: 'Start with a conversation.', ctaBody: 'A short introduction is enough for us to understand the right next step.'
      },
      privacy: {
        eyebrow: 'Privacy', title: 'Privacy before complexity.',
        intro: 'The current public website does not provide accounts, payments, onboarding or database-backed contact forms.',
        cards: [
          { title: 'Information you send', body: 'When you contact Yasaflow by email, the information is processed by your email provider and the receiving mail service.' },
          { title: 'Website data', body: 'The project does not currently implement its own user database, marketing forms or behavioral analytics.' },
          { title: 'Future changes', body: 'This notice must be updated before analytics, forms, authentication or other data-processing features are introduced.' },
        ],
        ctaTitle: 'Legal review required.', ctaBody: 'This page is a structured product draft and is not final legal advice.'
      },
      terms: {
        eyebrow: 'Terms', title: 'Terms for the public website.',
        intro: 'The Yasaflow website currently presents product information and design previews. It does not itself provide the operational Yasaflow service.',
        cards: [
          { title: 'Informational content', body: 'Product descriptions explain Yasaflow’s intended direction and may evolve as the platform develops.' },
          { title: 'No customer account', body: 'Browsing the public website does not create a subscription, customer account or service agreement.' },
          { title: 'Future agreements', body: 'Use of the operational platform will be governed by the applicable customer agreement and service terms.' },
        ],
        ctaTitle: 'Legal review required.', ctaBody: 'Final terms must be prepared or approved by qualified legal counsel before launch.'
      },
    },
  },
  nb: {
    back: 'Tilbake til forsiden', home: 'Forside', contact: 'Kontakt Yasaflow', legalDraft: 'Utkast for juridisk gjennomgang før lansering.',
    pages: {
      about: {
        eyebrow: 'Om Yasaflow', title: 'Teknologi som gir fellesskap mer rom til å lede.',
        intro: 'Yasaflow bygges som et langsiktig digitalt hjem for medlemsbaserte organisasjoner som trenger oversikt, tillit og enklere daglig drift.',
        cards: [
          { title: 'Hvorfor vi finnes', body: 'Organisasjoner bør ikke trenge mange frakoblede verktøy for å kommunisere, koordinere aktiviteter og følge opp medlemmer.' },
          { title: 'Hvordan vi bygger', body: 'Vi utvikler rolig, modulær programvare som tilpasses ulike fellesskap uten unødvendig kompleksitet.' },
          { title: 'Hva vi beskytter', body: 'Tydelighet, tilgjengelighet og ansvarlig vekst skal være faste produktstandarder.' },
        ],
        ctaTitle: 'Bygget for det lange løpet.', ctaBody: 'Yasaflow skal vokse med organisasjonen, ikke tvinge den til å bygge det digitale grunnlaget på nytt.'
      },
      contact: {
        eyebrow: 'Kontakt', title: 'Fortell oss hva organisasjonen trenger.',
        intro: 'Beskriv hvordan dere arbeider i dag, hvor det blir vanskelig, og hvilke deler av Yasaflow som er mest relevante.',
        cards: [
          { title: 'Generelle henvendelser', body: <a className="inline-flex items-center gap-2 font-semibold text-[#2185DC]" href="mailto:hello@yasaflow.com"><Mail size={18} />hello@yasaflow.com</a> },
          { title: 'Bestill demo', body: 'Send en kort beskrivelse av organisasjonen og modulene dere ønsker å se.' },
          { title: 'Ingen skjemasporing', body: 'Siden bruker foreløpig bare direkte e-post. Nettsiden samler ikke inn kontaktskjemadata.' },
        ],
        ctaTitle: 'Start med en samtale.', ctaBody: 'En kort introduksjon er nok til at vi kan avklare riktig neste steg.'
      },
      privacy: {
        eyebrow: 'Personvern', title: 'Personvern før kompleksitet.',
        intro: 'Den offentlige nettsiden tilbyr foreløpig ikke kontoer, betaling, onboarding eller databasebaserte kontaktskjemaer.',
        cards: [
          { title: 'Informasjon du sender', body: 'Når du kontakter Yasaflow på e-post, behandles informasjonen av din e-postleverandør og mottakende e-posttjeneste.' },
          { title: 'Nettsidedata', body: 'Prosjektet har foreløpig ingen egen brukerdatabase, markedsføringsskjemaer eller atferdsanalyse.' },
          { title: 'Fremtidige endringer', body: 'Erklæringen må oppdateres før analyse, skjemaer, autentisering eller annen databehandling innføres.' },
        ],
        ctaTitle: 'Krever juridisk gjennomgang.', ctaBody: 'Dette er et strukturert produktutkast og ikke endelig juridisk rådgivning.'
      },
      terms: {
        eyebrow: 'Vilkår', title: 'Vilkår for den offentlige nettsiden.',
        intro: 'Yasaflow-nettsiden presenterer foreløpig produktinformasjon og designforhåndsvisninger. Den leverer ikke selve Yasaflow-tjenesten.',
        cards: [
          { title: 'Informativt innhold', body: 'Produktbeskrivelser forklarer den planlagte retningen og kan endres når plattformen utvikles.' },
          { title: 'Ingen kundekonto', body: 'Besøk på nettsiden oppretter ikke abonnement, kundekonto eller tjenesteavtale.' },
          { title: 'Fremtidige avtaler', body: 'Bruk av den operative plattformen vil reguleres av gjeldende kundeavtale og tjenestevilkår.' },
        ],
        ctaTitle: 'Krever juridisk gjennomgang.', ctaBody: 'Endelige vilkår må utarbeides eller godkjennes av kvalifisert juridisk rådgiver før lansering.'
      },
    },
  },
  tr: {
    back: 'Ana sayfaya dön', home: 'Ana sayfa', contact: 'Yasaflow ile iletişim', legalDraft: 'Yayın öncesi hukuki inceleme taslağı.',
    pages: {
      about: {
        eyebrow: 'Yasaflow hakkında', title: 'Topluluklara liderlik etmek için daha fazla alan sağlayan teknoloji.',
        intro: 'Yasaflow; netlik, güven ve daha kolay günlük yönetim isteyen üyelik temelli kuruluşlar için uzun vadeli bir dijital merkez olarak geliştiriliyor.',
        cards: [
          { title: 'Neden varız', body: 'Kuruluşlar iletişim, etkinlik koordinasyonu ve üye yönetimi için birçok kopuk araca ihtiyaç duymamalı.' },
          { title: 'Nasıl geliştiriyoruz', body: 'Farklı topluluklara gereksiz karmaşa yaratmadan uyum sağlayan sakin ve modüler yazılım tasarlıyoruz.' },
          { title: 'Neyi koruyoruz', body: 'Netlik, erişilebilirlik ve sorumlu büyüme kalıcı ürün standartlarıdır.' },
        ],
        ctaTitle: 'Uzun vadeli kullanım için tasarlandı.', ctaBody: 'Yasaflow, kuruluşları dijital temellerini yeniden kurmaya zorlamadan onlarla birlikte büyümelidir.'
      },
      contact: {
        eyebrow: 'İletişim', title: 'Kuruluşunuzun neye ihtiyacı olduğunu anlatın.',
        intro: 'Bugün nasıl çalıştığınızı, hangi noktaların zorlaştığını ve Yasaflow’un hangi bölümlerinin önemli olduğunu paylaşın.',
        cards: [
          { title: 'Genel sorular', body: <a className="inline-flex items-center gap-2 font-semibold text-[#2185DC]" href="mailto:hello@yasaflow.com"><Mail size={18} />hello@yasaflow.com</a> },
          { title: 'Demo isteyin', body: 'Kuruluşunuzu ve görmek istediğiniz modülleri kısaca açıklayan bir e-posta gönderin.' },
          { title: 'Form takibi yok', body: 'Bu sayfa şimdilik yalnızca doğrudan e-posta kullanır. İletişim formu verisi toplanmaz.' },
        ],
        ctaTitle: 'Bir görüşmeyle başlayın.', ctaBody: 'Doğru sonraki adımı anlamamız için kısa bir tanıtım yeterlidir.'
      },
      privacy: {
        eyebrow: 'Gizlilik', title: 'Karmaşıklıktan önce gizlilik.',
        intro: 'Mevcut halka açık site hesap, ödeme, onboarding veya veritabanı destekli iletişim formu sunmaz.',
        cards: [
          { title: 'Gönderdiğiniz bilgiler', body: 'E-posta ile iletişime geçtiğinizde bilgileriniz e-posta sağlayıcınız ve alıcı posta hizmeti tarafından işlenir.' },
          { title: 'Web sitesi verileri', body: 'Projede şu anda kullanıcı veritabanı, pazarlama formu veya davranış analizi bulunmaz.' },
          { title: 'Gelecekteki değişiklikler', body: 'Analitik, form, kimlik doğrulama veya başka veri işleme özellikleri eklenmeden önce bu bildirim güncellenmelidir.' },
        ],
        ctaTitle: 'Hukuki inceleme gereklidir.', ctaBody: 'Bu sayfa yapılandırılmış bir ürün taslağıdır ve nihai hukuki tavsiye değildir.'
      },
      terms: {
        eyebrow: 'Koşullar', title: 'Halka açık web sitesi koşulları.',
        intro: 'Yasaflow web sitesi şu anda ürün bilgileri ve tasarım önizlemeleri sunar; operasyonel Yasaflow hizmetini sağlamaz.',
        cards: [
          { title: 'Bilgilendirme içeriği', body: 'Ürün açıklamaları Yasaflow’un planlanan yönünü anlatır ve platform geliştikçe değişebilir.' },
          { title: 'Müşteri hesabı yok', body: 'Web sitesini ziyaret etmek abonelik, müşteri hesabı veya hizmet sözleşmesi oluşturmaz.' },
          { title: 'Gelecekteki sözleşmeler', body: 'Operasyonel platform kullanımı ilgili müşteri sözleşmesi ve hizmet koşullarına tabi olacaktır.' },
        ],
        ctaTitle: 'Hukuki inceleme gereklidir.', ctaBody: 'Nihai koşullar yayın öncesinde yetkin hukuk danışmanı tarafından hazırlanmalı veya onaylanmalıdır.'
      },
    },
  },
};

const routeLabels: Record<Locale, Record<string, string>> = {
  en: { About: '/about', Contact: '/contact', Privacy: '/privacy', Terms: '/terms' },
  nb: { 'Om oss': '/about', Kontakt: '/contact', Personvern: '/privacy', Vilkår: '/terms' },
  tr: { 'Hakkımızda': '/about', 'İletişim': '/contact', Gizlilik: '/privacy', 'Koşullar': '/terms' },
};

function HomePage() {
  const { locale } = useI18n();
  function handleNavigation(event: MouseEvent<HTMLDivElement>) {
    const anchor = (event.target as HTMLElement).closest('a');
    const label = anchor?.textContent?.trim();
    const route = label ? routeLabels[locale][label] : undefined;
    if (!route) return;
    event.preventDefault();
    window.location.assign(route);
  }
  return <div onClickCapture={handleNavigation}><App /></div>;
}

function PageLayout({ page, legal = false }: { page: PageCopy; legal?: boolean }) {
  const { locale } = useI18n();
  const t = siteCopy[locale];
  return <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl"><div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"><a href="/" aria-label={t.home}><Logo /></a><div className="flex items-center gap-3"><LanguageSelector compact /><a className="hidden items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950 sm:inline-flex" href="/"><ArrowLeft size={17} />{t.back}</a></div></div></header>
    <main><section className="px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto max-w-5xl"><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">{page.eyebrow}</p><h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-.05em] sm:text-6xl">{page.title}</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">{page.intro}</p>{legal && <p className="mt-5 inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800">{t.legalDraft}</p>}<div className="mt-14 grid gap-5 md:grid-cols-3">{page.cards.map((card) => <article key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)]"><Check className="text-[#14B8A6]" size={21} /><h2 className="mt-5 text-lg font-semibold">{card.title}</h2><div className="mt-3 text-sm leading-6 text-slate-600">{card.body}</div></article>)}</div><div className="mt-14 rounded-[2rem] bg-[#0F172A] p-8 text-white sm:p-10"><h2 className="text-2xl font-semibold tracking-[-.03em]">{page.ctaTitle}</h2><p className="mt-3 max-w-2xl text-slate-300">{page.ctaBody}</p><a className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[#2185DC] px-5 text-sm font-semibold" href="mailto:hello@yasaflow.com">{t.contact}<ArrowRight size={17} /></a></div></div></section></main>
    <footer className="border-t border-slate-200 bg-white px-5 py-8 text-center text-xs text-slate-500">© 2026 Yasaflow.</footer>
  </div>;
}

export default function PublicRouter() {
  const { locale } = useI18n();
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path === '/') return <HomePage />;
  if (path === '/about') return <PageLayout page={siteCopy[locale].pages.about} />;
  if (path === '/contact') return <PageLayout page={siteCopy[locale].pages.contact} />;
  if (path === '/privacy') return <PageLayout legal page={siteCopy[locale].pages.privacy} />;
  if (path === '/terms') return <PageLayout legal page={siteCopy[locale].pages.terms} />;
  return <PageLayout page={{ eyebrow: '404', title: 'Page not found.', intro: 'The address may be incorrect or the page may have moved.', cards: [{ title: siteCopy[locale].home, body: <a className="font-semibold text-[#2185DC]" href="/">{siteCopy[locale].back}</a> }], ctaTitle: siteCopy[locale].contact, ctaBody: 'Contact us if you expected to find something here.' }} />;
}
