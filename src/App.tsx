import { ArrowRight, Check, Layers3, Menu, ShieldCheck, Sparkles, Users, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Logo } from './components/branding/Logo';
import { LanguageSelector, useI18n, type Locale } from './i18n';

type Copy = {
  nav: string[]; login: string; getStarted: string; badge: string; hero1: string; hero2: string; heroBody: string;
  create: string; demo: string; benefits: string[]; whyEyebrow: string; whyTitle: string; whyBody: string;
  reasons: { title: string; text: string }[]; orgEyebrow: string; orgTitle: string; orgBody: string;
  orgs: { title: string; text: string }[]; featuresEyebrow: string; featuresTitle: string; featuresBody: string;
  features: string[]; how: string; howTitle: string; howBody: string; steps: { title: string; text: string }[];
  previewEyebrow: string; previewTitle: string; previews: string[]; ctaEyebrow: string; ctaTitle: string; ctaBody: string;
  footer: string; privacy: string; terms: string; language: string;
};

const copy: Record<Locale, Copy> = {
  en: {
    nav: ['Products', 'Solutions', 'Pricing', 'About', 'Contact'], login: 'Log in', getStarted: 'Get Started',
    badge: 'One digital home for your organisation', hero1: 'Bring your community together.', hero2: 'Run it with clarity.',
    heroBody: 'Yasaflow connects members, activities, communication, donations and administration in one calm platform—so your organisation can spend less time managing tools and more time serving its community.',
    create: 'Create Organization', demo: 'Book Demo', benefits: ['Clear from day one', 'Modules that grow with you', 'Built for real communities'],
    whyEyebrow: 'Why Yasaflow?', whyTitle: 'Less fragmentation. More room for the work that matters.', whyBody: 'Yasaflow gives organisations a shared structure without making every community work in the same way.',
    reasons: [
      { title: 'Everything in one place', text: 'Communication, activities, members, documents and administration work together.' },
      { title: 'Modular by design', text: 'Choose what you need now and add more as your organisation develops.' },
      { title: 'Built for long-term trust', text: 'Clear roles and accessible design support responsible growth.' },
      { title: 'Made for many communities', text: 'One flexible platform for associations, clubs, faith communities and volunteers.' },
    ],
    orgEyebrow: 'For communities of every kind', orgTitle: 'Built for every organization.', orgBody: 'Different missions need different tools. Yasaflow provides a shared foundation that adapts without becoming complicated.',
    orgs: [
      { title: 'Volunteer organizations', text: 'Bring engagement, activities and communication together.' },
      { title: 'Associations', text: 'Make membership and administration easier to manage.' },
      { title: 'Sports clubs', text: 'Coordinate teams, activities and volunteers.' },
      { title: 'Churches', text: 'Create connection through news, calendars and events.' },
      { title: 'Cultural organizations', text: 'Plan programmes and involve members.' },
      { title: 'Mosques', text: 'Bring information, activities and community together.' },
      { title: 'Student associations', text: 'Give members one clear place to participate.' },
      { title: 'Faith communities', text: 'A professional foundation for long-term community work.' },
    ],
    featuresEyebrow: 'One connected platform', featuresTitle: 'The essentials, thoughtfully connected.', featuresBody: 'Choose the modules your organization needs today and expand as your work evolves.',
    features: ['News', 'Activities', 'Members', 'Push Notifications', 'Donations', 'Documents', 'Calendar', 'Chat', 'Administration', 'Settings'],
    how: 'How it works', howTitle: 'From idea to launch, without the noise.', howBody: 'A clear setup process gives your organization structure from day one.',
    steps: [{ title: 'Create organization', text: 'Set the foundation for your digital organization.' }, { title: 'Invite administrator', text: 'Give the right person secure responsibility.' }, { title: 'Choose modules', text: 'Activate only what your community needs.' }, { title: 'Launch', text: 'Welcome members into a clear experience.' }],
    previewEyebrow: 'Product experience', previewTitle: 'One platform. Three focused views.', previews: ['Owner Dashboard', 'Administrator Dashboard', 'Mobile App'],
    ctaEyebrow: 'Your next chapter', ctaTitle: 'Ready to get started?', ctaBody: 'Give your organization a digital home built for clarity, trust and long-term growth.',
    footer: 'A modern digital home for organizations, communities and members.', privacy: 'Privacy', terms: 'Terms', language: 'Language',
  },
  nb: {
    nav: ['Produkter', 'Løsninger', 'Priser', 'Om oss', 'Kontakt'], login: 'Logg inn', getStarted: 'Kom i gang',
    badge: 'Ett digitalt hjem for organisasjonen din', hero1: 'Samle fellesskapet.', hero2: 'Driv det med oversikt.',
    heroBody: 'Yasaflow samler medlemmer, aktiviteter, kommunikasjon, donasjoner og administrasjon i én rolig plattform – slik at organisasjonen kan bruke mindre tid på verktøy og mer tid på fellesskapet.',
    create: 'Opprett organisasjon', demo: 'Bestill demo', benefits: ['Tydelig fra første dag', 'Moduler som vokser med dere', 'Bygget for ekte fellesskap'],
    whyEyebrow: 'Hvorfor Yasaflow?', whyTitle: 'Mindre fragmentering. Mer rom for det som betyr noe.', whyBody: 'Yasaflow gir organisasjoner en felles struktur uten å tvinge alle fellesskap til å jobbe på samme måte.',
    reasons: [
      { title: 'Alt på ett sted', text: 'Kommunikasjon, aktiviteter, medlemmer, dokumenter og administrasjon henger sammen.' },
      { title: 'Modulært fra starten', text: 'Velg det dere trenger nå, og legg til mer senere.' },
      { title: 'Bygget for langsiktig tillit', text: 'Tydelige roller og tilgjengelig design støtter ansvarlig vekst.' },
      { title: 'For mange typer fellesskap', text: 'Én fleksibel plattform for foreninger, klubber, tros- og frivillige organisasjoner.' },
    ],
    orgEyebrow: 'For fellesskap av alle slag', orgTitle: 'Bygget for alle organisasjoner.', orgBody: 'Ulike formål krever ulike verktøy. Yasaflow gir en felles grunnmur som kan tilpasses uten å bli komplisert.',
    orgs: [
      { title: 'Frivillige organisasjoner', text: 'Samle engasjement, aktiviteter og kommunikasjon.' },
      { title: 'Foreninger', text: 'Gjør medlemsarbeid og administrasjon enklere.' },
      { title: 'Idrettslag', text: 'Koordiner lag, aktiviteter og frivillige.' },
      { title: 'Kirker', text: 'Skap nærhet gjennom nyheter, kalender og arrangementer.' },
      { title: 'Kulturorganisasjoner', text: 'Planlegg programmer og involver medlemmer.' },
      { title: 'Moskeer', text: 'Samle informasjon, aktiviteter og fellesskap.' },
      { title: 'Studentforeninger', text: 'Gi medlemmene ett tydelig sted å delta.' },
      { title: 'Trossamfunn', text: 'Et profesjonelt grunnlag for langsiktig fellesskapsarbeid.' },
    ],
    featuresEyebrow: 'Én samlet plattform', featuresTitle: 'Det viktigste, koblet sammen.', featuresBody: 'Velg modulene organisasjonen trenger i dag, og utvid etter hvert.',
    features: ['Nyheter', 'Aktiviteter', 'Medlemmer', 'Pushvarsler', 'Donasjoner', 'Dokumenter', 'Kalender', 'Chat', 'Administrasjon', 'Innstillinger'],
    how: 'Slik fungerer det', howTitle: 'Fra idé til lansering, uten støy.', howBody: 'En tydelig oppstart gir organisasjonen struktur fra første dag.',
    steps: [{ title: 'Opprett organisasjon', text: 'Legg grunnlaget for den digitale organisasjonen.' }, { title: 'Inviter administrator', text: 'Gi riktig person ansvar.' }, { title: 'Velg moduler', text: 'Aktiver bare det fellesskapet trenger.' }, { title: 'Lanser', text: 'Gi medlemmene en tydelig opplevelse.' }],
    previewEyebrow: 'Produktopplevelse', previewTitle: 'Én plattform. Tre fokuserte visninger.', previews: ['Eierdashboard', 'Administratordashboard', 'Mobilapp'],
    ctaEyebrow: 'Neste kapittel', ctaTitle: 'Klar til å komme i gang?', ctaBody: 'Gi organisasjonen et digitalt hjem bygget for tydelighet, tillit og langsiktig vekst.',
    footer: 'Et moderne digitalt hjem for organisasjoner, fellesskap og medlemmer.', privacy: 'Personvern', terms: 'Vilkår', language: 'Språk',
  },
  tr: {
    nav: ['Ürünler', 'Çözümler', 'Fiyatlar', 'Hakkımızda', 'İletişim'], login: 'Giriş yap', getStarted: 'Başlayın',
    badge: 'Kuruluşunuz için tek dijital merkez', hero1: 'Topluluğunuzu bir araya getirin.', hero2: 'Netlikle yönetin.',
    heroBody: 'Yasaflow üyeleri, etkinlikleri, iletişimi, bağışları ve yönetimi sakin bir platformda birleştirir; böylece araçları yönetmeye daha az, topluluğunuza daha fazla zaman ayırırsınız.',
    create: 'Kuruluş oluştur', demo: 'Demo iste', benefits: ['İlk günden net', 'Sizinle büyüyen modüller', 'Gerçek topluluklar için'],
    whyEyebrow: 'Neden Yasaflow?', whyTitle: 'Daha az dağınıklık. Önemli işlere daha fazla alan.', whyBody: 'Yasaflow, her topluluğu aynı şekilde çalışmaya zorlamadan ortak bir yapı sunar.',
    reasons: [
      { title: 'Her şey tek yerde', text: 'İletişim, etkinlikler, üyeler, belgeler ve yönetim birlikte çalışır.' },
      { title: 'Modüler yapı', text: 'Şimdi ihtiyacınız olanı seçin, sonra genişletin.' },
      { title: 'Uzun vadeli güven', text: 'Net roller ve erişilebilir tasarım sorumlu büyümeyi destekler.' },
      { title: 'Farklı topluluklar için', text: 'Dernekler, kulüpler, inanç toplulukları ve gönüllüler için esnek platform.' },
    ],
    orgEyebrow: 'Her tür topluluk için', orgTitle: 'Her kuruluş için tasarlandı.', orgBody: 'Farklı amaçlar farklı araçlar gerektirir. Yasaflow karmaşıklaşmadan uyum sağlayan ortak bir temel sunar.',
    orgs: [
      { title: 'Gönüllü kuruluşlar', text: 'Katılımı, etkinlikleri ve iletişimi bir araya getirin.' },
      { title: 'Dernekler', text: 'Üyelik ve yönetimi kolaylaştırın.' },
      { title: 'Spor kulüpleri', text: 'Takımları, etkinlikleri ve gönüllüleri koordine edin.' },
      { title: 'Kiliseler', text: 'Haberler, takvim ve etkinliklerle bağ kurun.' },
      { title: 'Kültür kuruluşları', text: 'Programları planlayın ve üyeleri dahil edin.' },
      { title: 'Camiler', text: 'Bilgi, etkinlik ve topluluğu tek yerde toplayın.' },
      { title: 'Öğrenci dernekleri', text: 'Üyelere katılım için net bir merkez sunun.' },
      { title: 'İnanç toplulukları', text: 'Uzun vadeli topluluk çalışmaları için profesyonel temel.' },
    ],
    featuresEyebrow: 'Bağlantılı tek platform', featuresTitle: 'Temel ihtiyaçlar, akıllıca bir arada.', featuresBody: 'Bugün ihtiyacınız olan modülleri seçin, zamanla genişletin.',
    features: ['Haberler', 'Etkinlikler', 'Üyeler', 'Anlık bildirimler', 'Bağışlar', 'Belgeler', 'Takvim', 'Sohbet', 'Yönetim', 'Ayarlar'],
    how: 'Nasıl çalışır?', howTitle: 'Fikirden yayına, gereksiz karmaşa olmadan.', howBody: 'Net bir kurulum süreci ilk günden yapı sağlar.',
    steps: [{ title: 'Kuruluş oluşturun', text: 'Dijital kuruluşunuzun temelini atın.' }, { title: 'Yönetici davet edin', text: 'Doğru kişiye sorumluluk verin.' }, { title: 'Modülleri seçin', text: 'Yalnızca ihtiyacınız olanları etkinleştirin.' }, { title: 'Yayınlayın', text: 'Üyelere net bir deneyim sunun.' }],
    previewEyebrow: 'Ürün deneyimi', previewTitle: 'Tek platform. Üç odaklı görünüm.', previews: ['Sahip paneli', 'Yönetici paneli', 'Mobil uygulama'],
    ctaEyebrow: 'Sonraki adım', ctaTitle: 'Başlamaya hazır mısınız?', ctaBody: 'Kuruluşunuza netlik, güven ve uzun vadeli büyüme için dijital bir merkez verin.',
    footer: 'Kuruluşlar, topluluklar ve üyeler için modern dijital merkez.', privacy: 'Gizlilik', terms: 'Koşullar', language: 'Dil',
  },
};

const reasonIcons = [Layers3, Sparkles, ShieldCheck, Users];
const sectionIds = ['products', 'solutions', 'contact', 'why-yasaflow', 'contact'];

function Button({ children, secondary = false }: { children: ReactNode; secondary?: boolean }) {
  return <a href="#contact" className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-[#2185DC]/20 ${secondary ? 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50' : 'bg-[#2185DC] text-white shadow-[0_12px_30px_rgba(33,133,220,.24)] hover:bg-[#1877c8]'}`}>{children}</a>;
}

export default function App() {
  const { locale } = useI18n();
  const t = copy[locale];
  const [menuOpen, setMenuOpen] = useState(false);

  return <div className="overflow-hidden bg-white text-slate-950">
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="Yasaflow home"><Logo /></a>
        <nav className="hidden items-center gap-6 lg:flex">{t.nav.map((label, index) => <a key={label} className="text-sm font-medium text-slate-600 hover:text-slate-950" href={`#${sectionIds[index]}`}>{label}</a>)}</nav>
        <div className="hidden items-center gap-3 lg:flex"><LanguageSelector compact /><a href="#contact" className="px-3 text-sm font-semibold">{t.login}</a><Button>{t.getStarted}</Button></div>
        <button type="button" aria-label="Toggle menu" aria-expanded={menuOpen} className="rounded-xl border border-slate-200 p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <nav className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden"><div className="mb-3"><LanguageSelector /></div>{t.nav.map((label, index) => <a key={label} onClick={() => setMenuOpen(false)} className="block py-3 font-medium" href={`#${sectionIds[index]}`}>{label}</a>)}<div className="mt-3 grid grid-cols-2 gap-3"><Button secondary>{t.login}</Button><Button>{t.getStarted}</Button></div></nav>}
    </header>

    <main id="top">
      <section className="bg-[radial-gradient(circle_at_85%_0%,rgba(20,184,166,.12),transparent_28%),radial-gradient(circle_at_65%_20%,rgba(33,133,220,.14),transparent_36%),linear-gradient(180deg,#fff_0%,#f8fbff_100%)] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2"><div><div className="inline-flex rounded-full border border-[#2185DC]/20 bg-white/80 px-4 py-2 text-sm font-medium text-[#176db6]">{t.badge}</div><h1 className="mt-8 text-5xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-6xl lg:text-7xl">{t.hero1}<span className="mt-2 block text-[#2185DC]">{t.hero2}</span></h1><p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">{t.heroBody}</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button>{t.create}<ArrowRight size={17} /></Button><Button secondary>{t.demo}</Button></div><div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500">{t.benefits.map((item) => <span key={item} className="inline-flex items-center gap-2"><Check size={16} className="text-[#14B8A6]" />{item}</span>)}</div></div><div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,.14)]"><div className="rounded-[1.5rem] bg-[#0F172A] p-6 text-white"><Logo theme="dark" /><div className="mt-10 grid gap-3 sm:grid-cols-2">{t.features.slice(0, 6).map((item) => <div key={item} className="rounded-2xl bg-white/8 p-4 text-sm">{item}</div>)}</div></div></div></div>
      </section>

      <section id="why-yasaflow" className="px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]"><div><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">{t.whyEyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{t.whyTitle}</h2><p className="mt-5 text-lg leading-8 text-slate-600">{t.whyBody}</p></div><div className="grid gap-4 sm:grid-cols-2">{t.reasons.map((reason, index) => { const Icon = reasonIcons[index]; return <article key={reason.title} className="rounded-3xl border border-slate-200 p-6 shadow-sm"><Icon className="text-[#2185DC]" /><h3 className="mt-5 text-lg font-semibold">{reason.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{reason.text}</p></article>; })}</div></div></div></section>

      <section id="solutions" className="bg-slate-50 px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">{t.orgEyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{t.orgTitle}</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{t.orgBody}</p><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{t.orgs.map((item) => <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6"><Users className="text-[#2185DC]" /><h3 className="mt-5 text-lg font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p></article>)}</div></div></section>

      <section id="products" className="bg-[#0F172A] px-5 py-24 text-white sm:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#62b4ff]">{t.featuresEyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{t.featuresTitle}</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{t.featuresBody}</p><div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">{t.features.map((item) => <div key={item} className="bg-[#0F172A] p-6 text-sm font-semibold">{item}</div>)}</div></div></section>

      <section className="px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-14 lg:grid-cols-2"><div><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">{t.how}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{t.howTitle}</h2><p className="mt-5 text-lg leading-8 text-slate-600">{t.howBody}</p></div><ol className="space-y-4">{t.steps.map((step, index) => <li key={step.title} className="flex gap-5 rounded-3xl border border-slate-200 p-5"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#2185DC] font-semibold text-white">{index + 1}</span><div><h3 className="font-semibold">{step.title}</h3><p className="mt-1 text-sm text-slate-500">{step.text}</p></div></li>)}</ol></div></div></section>

      <section className="bg-slate-50 px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto max-w-7xl text-center"><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">{t.previewEyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{t.previewTitle}</h2><div className="mt-14 grid gap-6 lg:grid-cols-3">{t.previews.map((item) => <article key={item} className="rounded-[2rem] border border-slate-200 bg-white p-4"><div className="h-64 rounded-[1.5rem] bg-slate-100" /><h3 className="p-5 text-left text-lg font-semibold">{item}</h3></article>)}</div></div></section>

      <section id="contact" className="px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#0F172A] px-6 py-16 text-center text-white"><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#62b4ff]">{t.ctaEyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{t.ctaTitle}</h2><p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-300">{t.ctaBody}</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Button>{t.create}</Button><a className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 px-5 text-sm font-semibold" href="mailto:hello@yasaflow.com">{t.demo}</a></div></div></section>
    </main>

    <footer className="border-t border-slate-200 px-5 py-12 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"><div><Logo /><p className="mt-3 max-w-sm text-sm text-slate-500">{t.footer}</p></div><div className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-600"><LanguageSelector /><a href="#contact">{t.privacy}</a><a href="#contact">{t.terms}</a></div></div></footer>
  </div>;
}
