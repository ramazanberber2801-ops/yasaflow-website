import { ArrowLeft, ArrowRight, BookOpen, CircleHelp, LockKeyhole, Plug, Route } from 'lucide-react';
import { Logo } from './components/branding/Logo';
import { LanguageSelector, type Locale } from './i18n';

const copy = {
  en: {
    eyebrow: 'Resources', title: 'Everything you need to understand Yasaflow.',
    intro: 'Explore the product direction, security principles, integrations and practical answers in one calm documentation center.',
    back: 'Back to home', open: 'Open resource', contact: 'Contact Yasaflow',
    cards: [
      ['FAQ', 'Clear answers about modules, roles, mobile access, languages and privacy.', '/faq'],
      ['Security', 'How Yasaflow approaches access, data protection, backups and incident readiness.', '/security'],
      ['Roadmap', 'See what is available, in development, planned and under research.', '/roadmap'],
      ['Integrations', 'Review the direction for email, notifications, payments, calendars and APIs.', '/integrations'],
    ],
  },
  nb: {
    eyebrow: 'Ressurser', title: 'Alt dere trenger for å forstå Yasaflow.',
    intro: 'Utforsk produktretningen, sikkerhetsprinsippene, integrasjonene og praktiske svar i ett rolig dokumentasjonssenter.',
    back: 'Tilbake til forsiden', open: 'Åpne ressurs', contact: 'Kontakt Yasaflow',
    cards: [
      ['FAQ', 'Tydelige svar om moduler, roller, mobiltilgang, språk og personvern.', '/faq'],
      ['Sikkerhet', 'Hvordan Yasaflow arbeider med tilgang, databeskyttelse, sikkerhetskopi og hendelsesberedskap.', '/security'],
      ['Veikart', 'Se hva som er tilgjengelig, under utvikling, planlagt og under utforskning.', '/roadmap'],
      ['Integrasjoner', 'Se retningen for e-post, varsler, betaling, kalender og API-er.', '/integrations'],
    ],
  },
  tr: {
    eyebrow: 'Kaynaklar', title: 'Yasaflow’u anlamak için ihtiyacınız olan her şey.',
    intro: 'Ürün yönünü, güvenlik ilkelerini, entegrasyonları ve pratik cevapları tek bir sade dokümantasyon merkezinde keşfedin.',
    back: 'Ana sayfaya dön', open: 'Kaynağı aç', contact: 'Yasaflow ile iletişim',
    cards: [
      ['SSS', 'Modüller, roller, mobil erişim, diller ve gizlilik hakkında net cevaplar.', '/faq'],
      ['Güvenlik', 'Yasaflow’un erişim, veri koruma, yedekleme ve olay hazırlığı yaklaşımı.', '/security'],
      ['Yol haritası', 'Mevcut, geliştirilmekte, planlanmış ve araştırma aşamasındaki çalışmaları görün.', '/roadmap'],
      ['Entegrasyonlar', 'E-posta, bildirimler, ödemeler, takvimler ve API yönünü inceleyin.', '/integrations'],
    ],
  },
} satisfies Record<Locale, { eyebrow: string; title: string; intro: string; back: string; open: string; contact: string; cards: string[][] }>;

const icons = [CircleHelp, LockKeyhole, Route, Plug];

export default function ResourcesPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl"><div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8"><a href="/" aria-label="Yasaflow"><Logo /></a><div className="flex items-center gap-3"><LanguageSelector compact /><a className="hidden items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950 sm:inline-flex" href="/"><ArrowLeft size={17} />{t.back}</a></div></div></header>
    <main className="px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto max-w-6xl"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#2185DC]/10 text-[#2185DC]"><BookOpen size={24} /></div><p className="mt-7 text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">{t.eyebrow}</p><h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-.05em] sm:text-6xl">{t.title}</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">{t.intro}</p>
      <div className="mt-14 grid gap-5 md:grid-cols-2">{t.cards.map(([title, body, href], index) => { const Icon = icons[index]; return <a key={href} href={href} className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_10px_35px_rgba(15,23,42,.04)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,.08)]"><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#2185DC]/10 text-[#2185DC]"><Icon size={21} /></span><ArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#2185DC]" size={20} /></div><h2 className="mt-7 text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{body}</p><span className="mt-6 inline-flex text-sm font-semibold text-[#2185DC]">{t.open}</span></a>; })}</div>
      <div className="mt-14 rounded-[2rem] bg-[#0F172A] p-8 text-white sm:p-10"><h2 className="text-2xl font-semibold tracking-[-.03em]">{t.contact}</h2><a className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[#2185DC] px-5 text-sm font-semibold" href="mailto:hello@yasaflow.com">hello@yasaflow.com<ArrowRight size={17} /></a></div>
    </div></main>
    <footer className="border-t border-slate-200 bg-white px-5 py-8 text-center text-xs text-slate-500">© 2026 Yasaflow.</footer>
  </div>;
}
