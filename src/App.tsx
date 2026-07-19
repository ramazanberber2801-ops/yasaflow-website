import { ArrowRight, Check, Layers3, Menu, ShieldCheck, Sparkles, Users, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Logo } from './components/branding/Logo';
import { LanguageSelector, useI18n, type SelectedLocale } from './i18n';
import { getPublicModules } from './modules';
import { getModuleIcon } from './modules/icons';

type Text = {
  nav: string[]; login: string; start: string; badge: string; hero: string; accent: string; intro: string;
  create: string; demo: string; benefits: string[]; why: string; whyTitle: string; whyBody: string;
  reasons: { title: string; text: string }[]; audience: string; audienceTitle: string; audienceBody: string;
  orgs: string[]; modules: string; modulesTitle: string; modulesBody: string; included: string; extension: string;
  paymentNotice: string; how: string; howTitle: string; howBody: string; steps: string[]; preview: string; previewTitle: string;
  views: string[]; cta: string; ctaTitle: string; ctaBody: string; footer: string; privacy: string; terms: string;
};

const text: Record<SelectedLocale, Text> = {
  en: {
    nav: ['Products', 'Solutions', 'Pricing', 'About', 'Contact'], login: 'Log in', start: 'Get started',
    badge: 'Cloud-based SaaS for organizations', hero: 'Bring your community together.', accent: 'Run it with clarity.',
    intro: 'Yasaflow is a cloud-based SaaS platform that brings members, activities, communication and administration together in one secure place. Optional modules can be added as your organization grows.',
    create: 'Create organization', demo: 'Book a demo', benefits: ['Clear from day one', 'Modules that grow with you', 'Built for real communities'],
    why: 'Why Yasaflow?', whyTitle: 'Less fragmentation. More room for meaningful work.', whyBody: 'A shared digital foundation that supports different ways of working without adding unnecessary complexity.',
    reasons: [{ title: 'Everything in one place', text: 'Keep daily work, communication and information connected.' }, { title: 'Modular by design', text: 'Add capabilities as your needs grow.' }, { title: 'Built for trust', text: 'Clear roles, responsible access and accessible design.' }, { title: 'Made for many communities', text: 'Flexible across organization types and ways of working.' }],
    audience: 'For communities of every kind', audienceTitle: 'Built for many types of organizations.', audienceBody: 'Different missions need different tools, supported by one adaptable digital foundation.',
    orgs: ['Volunteer organizations', 'Associations', 'Sports clubs', 'Housing communities', 'Cultural organizations', 'Places of worship and faith communities', 'Student associations', 'Small businesses and service providers'],
    modules: 'Module library', modulesTitle: 'The essentials, connected and ready to grow.', modulesBody: 'Start with the modules you need today and expand the platform as your organization grows.', included: 'Included', extension: 'Optional extension',
    paymentNotice: 'Yasaflow is a cloud-based SaaS platform, not a payment processor or financial service. External donation links only redirect users to the organization’s chosen third-party provider. Yasaflow never processes, holds or distributes donation funds.',
    how: 'How it works', howTitle: 'From idea to launch, without the noise.', howBody: 'A clear setup process gives your organization structure from day one.', steps: ['Create your organization', 'Invite an administrator', 'Choose modules', 'Launch'],
    preview: 'Product experience', previewTitle: 'One platform. Three focused views.', views: ['Owner dashboard', 'Administrator dashboard', 'Mobile app'],
    cta: 'Your next chapter', ctaTitle: 'Ready to get started?', ctaBody: 'Give your organization a digital home built for clarity, trust and long-term growth.', footer: 'A modern digital home for organizations, communities and members. SaaS service based in Norway.', privacy: 'Privacy', terms: 'Terms',
  },
  nb: {
    nav: ['Produkter', 'Løsninger', 'Priser', 'Om oss', 'Kontakt'], login: 'Logg inn', start: 'Kom i gang',
    badge: 'Skybasert SaaS for organisasjoner', hero: 'Samle fellesskapet.', accent: 'Driv det med oversikt.',
    intro: 'Yasaflow er en skybasert SaaS-plattform som samler medlemmer, aktiviteter, kommunikasjon og administrasjon på ett trygt sted. Valgfrie moduler kan legges til når organisasjonen vokser.',
    create: 'Opprett organisasjon', demo: 'Bestill demo', benefits: ['Oversikt fra første dag', 'Moduler som vokser med dere', 'Bygget for virkelige fellesskap'],
    why: 'Hvorfor Yasaflow?', whyTitle: 'Mindre fragmentering. Mer rom for meningsfullt arbeid.', whyBody: 'En felles digital grunnmur som støtter ulike arbeidsmåter uten å skape unødvendig kompleksitet.',
    reasons: [{ title: 'Alt på ett sted', text: 'Hold daglig drift, kommunikasjon og informasjon samlet.' }, { title: 'Modulært fra starten', text: 'Legg til funksjoner når behovene vokser.' }, { title: 'Bygget for tillit', text: 'Tydelige roller, trygg tilgang og tilgjengelig design.' }, { title: 'For mange typer fellesskap', text: 'Fleksibelt på tvers av organisasjonstyper og arbeidsmåter.' }],
    audience: 'For fellesskap av alle slag', audienceTitle: 'Bygget for mange typer organisasjoner.', audienceBody: 'Ulike formål krever ulike verktøy, støttet av én fleksibel digital grunnmur.',
    orgs: ['Frivillige organisasjoner', 'Foreninger', 'Idrettslag', 'Borettslag og sameier', 'Kulturorganisasjoner', 'Tros- og livssynssamfunn', 'Studentforeninger', 'Småbedrifter og tjenesteytere'],
    modules: 'Modulbibliotek', modulesTitle: 'Det viktigste, koblet sammen og klart til å vokse.', modulesBody: 'Start med modulene dere trenger i dag, og utvid plattformen når organisasjonen vokser.', included: 'Inkludert', extension: 'Valgfritt tillegg',
    paymentNotice: 'Yasaflow er en skybasert SaaS-plattform, ikke en betalingsformidler eller finansiell tjeneste. Eksterne donasjonslenker sender kun brukeren videre til organisasjonens valgte tredjepartsleverandør. Yasaflow behandler, oppbevarer eller utbetaler aldri donasjonsmidler.',
    how: 'Slik fungerer det', howTitle: 'Fra idé til lansering, uten støy.', howBody: 'En tydelig oppstart gir organisasjonen struktur fra første dag.', steps: ['Opprett organisasjonen', 'Inviter en administrator', 'Velg moduler', 'Lanser'],
    preview: 'Produktopplevelse', previewTitle: 'Én plattform. Tre fokuserte visninger.', views: ['Eierdashboard', 'Administratordashboard', 'Mobilapp'],
    cta: 'Neste kapittel', ctaTitle: 'Klar til å komme i gang?', ctaBody: 'Gi organisasjonen et digitalt hjem bygget for tydelighet, tillit og langsiktig vekst.', footer: 'Et moderne digitalt hjem for organisasjoner, fellesskap og medlemmer. SaaS-tjeneste fra Norge.', privacy: 'Personvern', terms: 'Vilkår',
  },
  da: {
    nav: ['Produkter', 'Løsninger', 'Priser', 'Om os', 'Kontakt'], login: 'Log ind', start: 'Kom i gang',
    badge: 'Cloudbaseret SaaS til organisationer', hero: 'Saml jeres fællesskab.', accent: 'Driv det med overblik.',
    intro: 'Yasaflow er en cloudbaseret SaaS-platform, der samler medlemmer, aktiviteter, kommunikation og administration ét sikkert sted. Valgfrie moduler kan tilføjes, efterhånden som organisationen vokser.',
    create: 'Opret organisation', demo: 'Book en demo', benefits: ['Overblik fra første dag', 'Moduler der vokser med jer', 'Bygget til virkelige fællesskaber'],
    why: 'Hvorfor Yasaflow?', whyTitle: 'Mindre fragmentering. Mere plads til meningsfuldt arbejde.', whyBody: 'Et fælles digitalt fundament, der understøtter forskellige arbejdsgange uden unødig kompleksitet.',
    reasons: [{ title: 'Alt samlet ét sted', text: 'Hold den daglige drift, kommunikation og information samlet.' }, { title: 'Modulært fra starten', text: 'Tilføj funktioner, når behovene vokser.' }, { title: 'Bygget til tillid', text: 'Tydelige roller, sikker adgang og tilgængeligt design.' }, { title: 'Til mange typer fællesskaber', text: 'Fleksibelt på tværs af organisationstyper og arbejdsgange.' }],
    audience: 'Til fællesskaber af alle slags', audienceTitle: 'Bygget til mange typer organisationer.', audienceBody: 'Forskellige formål kræver forskellige værktøjer, understøttet af ét fleksibelt digitalt fundament.',
    orgs: ['Frivillige organisationer', 'Foreninger', 'Idrætsklubber', 'Boligforeninger', 'Kulturorganisationer', 'Tros- og livssynssamfund', 'Studenterforeninger', 'Små virksomheder og serviceudbydere'],
    modules: 'Modulbibliotek', modulesTitle: 'Det vigtigste, forbundet og klar til at vokse.', modulesBody: 'Start med de moduler, I har brug for i dag, og udvid platformen, når organisationen vokser.', included: 'Inkluderet', extension: 'Valgfrit tillæg',
    paymentNotice: 'Yasaflow er en cloudbaseret SaaS-platform, ikke en betalingsformidler eller finansiel tjeneste. Eksterne donationslinks sender kun brugeren videre til organisationens valgte tredjepartsudbyder. Yasaflow behandler, opbevarer eller udbetaler aldrig donationsmidler.',
    how: 'Sådan fungerer det', howTitle: 'Fra idé til lancering uden støj.', howBody: 'En tydelig opstart giver organisationen struktur fra første dag.', steps: ['Opret organisationen', 'Invitér en administrator', 'Vælg moduler', 'Lancér'],
    preview: 'Produktoplevelse', previewTitle: 'Én platform. Tre fokuserede visninger.', views: ['Ejer-dashboard', 'Administrator-dashboard', 'Mobilapp'],
    cta: 'Næste kapitel', ctaTitle: 'Klar til at komme i gang?', ctaBody: 'Giv organisationen et digitalt hjem bygget til tydelighed, tillid og langsigtet vækst.', footer: 'Et moderne digitalt hjem til organisationer, fællesskaber og medlemmer. SaaS-tjeneste fra Norge.', privacy: 'Privatliv', terms: 'Vilkår',
  },
  tr: {
    nav: ['Ürünler', 'Çözümler', 'Fiyatlandırma', 'Hakkımızda', 'İletişim'], login: 'Giriş yap', start: 'Hemen başlayın',
    badge: 'Kurumlar için bulut tabanlı SaaS', hero: 'Topluluğunuzu bir araya getirin.', accent: 'Her şeyi netlikle yönetin.',
    intro: 'Yasaflow; üyeleri, etkinlikleri, iletişimi ve yönetimi güvenli bir yerde birleştiren bulut tabanlı bir SaaS platformudur. Kurumunuz büyüdükçe isteğe bağlı modüller eklenebilir.',
    create: 'Kurum oluştur', demo: 'Demo talep et', benefits: ['İlk günden düzenli', 'Sizinle büyüyen modüller', 'Gerçek topluluklar için tasarlandı'],
    why: 'Neden Yasaflow?', whyTitle: 'Daha az dağınıklık. Değerli işler için daha fazla zaman.', whyBody: 'Farklı çalışma biçimlerini destekleyen, gereksiz karmaşaya yol açmayan ortak bir dijital temel.',
    reasons: [{ title: 'Her şey tek yerde', text: 'Günlük işlerinizi, iletişimi ve bilgileri bir arada tutun.' }, { title: 'Modüler yapı', text: 'İhtiyaçlarınız büyüdükçe yeni özellikler ekleyin.' }, { title: 'Güven odaklı', text: 'Net roller, kontrollü erişim ve erişilebilir tasarım.' }, { title: 'Farklı kurumlar için', text: 'Farklı kurum türlerine ve çalışma biçimlerine uyum sağlar.' }],
    audience: 'Her tür topluluk için', audienceTitle: 'Farklı kurumların ihtiyaçlarına göre tasarlandı.', audienceBody: 'Farklı amaçlar farklı araçlar gerektirir; Yasaflow bunları tek ve esnek bir dijital temel üzerinde birleştirir.',
    orgs: ['Gönüllü Kuruluşlar', 'Dernekler', 'Spor Kulüpleri', 'Site ve Apartman Yönetimleri', 'Kültür Kuruluşları', 'İbadethaneler ve İnanç Toplulukları', 'Öğrenci Toplulukları', 'Küçük İşletmeler ve Hizmet Sektörü'],
    modules: 'Modül kütüphanesi', modulesTitle: 'Temel ihtiyaçlar bir arada ve büyümeye hazır.', modulesBody: 'Bugün ihtiyaç duyduğunuz modüllerle başlayın; kurumunuz büyüdükçe platformu genişletin.', included: 'Dahil', extension: 'İsteğe bağlı modül',
    paymentNotice: 'Yasaflow bulut tabanlı bir SaaS platformudur; ödeme kuruluşu veya finansal hizmet değildir. Harici bağış bağlantıları kullanıcıyı yalnızca kurumun seçtiği üçüncü taraf sağlayıcıya yönlendirir. Yasaflow bağış ödemelerini işlemez, tutmaz veya dağıtmaz.',
    how: 'Nasıl çalışır?', howTitle: 'Fikirden kullanıma, gereksiz karmaşa olmadan.', howBody: 'Net bir başlangıç süreci kurumunuza ilk günden düzen kazandırır.', steps: ['Kurumunuzu oluşturun', 'Bir yönetici davet edin', 'Modülleri seçin', 'Kullanıma başlayın'],
    preview: 'Ürün deneyimi', previewTitle: 'Tek platform. Üç odaklı görünüm.', views: ['Kurum sahibi paneli', 'Yönetici paneli', 'Mobil uygulama'],
    cta: 'Sıradaki adım', ctaTitle: 'Başlamaya hazır mısınız?', ctaBody: 'Kurumunuza netlik, güven ve uzun vadeli büyüme için tasarlanmış dijital bir merkez kazandırın.', footer: 'Kurumlar, topluluklar ve üyeler için modern bir dijital merkez. Norveç merkezli SaaS hizmeti.', privacy: 'Gizlilik', terms: 'Kullanım koşulları',
  },
};

const reasonIcons = [Layers3, Sparkles, ShieldCheck, Users];
const sectionIds = ['products', 'solutions', 'pricing', 'why-yasaflow', 'contact'];
const customerPortalUrl = 'https://portal.yasaflow.com/kunde';
const registrationUrl = 'https://portal.yasaflow.com/registrer';

function Button({ children, secondary = false }: { children: ReactNode; secondary?: boolean }) {
  return <a href="/pricing" className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-[#2185DC]/20 ${secondary ? 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50' : 'bg-[#2185DC] text-white shadow-[0_12px_30px_rgba(33,133,220,.24)] hover:bg-[#1877c8]'}`}>{children}</a>;
}

export default function App() {
  const { selectedLocale } = useI18n();
  const t = text[selectedLocale];
  const modules = getPublicModules();
  const [menuOpen, setMenuOpen] = useState(false);

  return <div className="overflow-hidden bg-white text-slate-950">
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8"><a href="#top" aria-label="Yasaflow home"><Logo /></a><nav className="hidden items-center gap-6 lg:flex">{t.nav.map((label, index) => <a key={label} className="text-sm font-medium text-slate-600 hover:text-slate-950" href={`#${sectionIds[index]}`}>{label}</a>)}</nav><div className="hidden items-center gap-3 lg:flex"><LanguageSelector compact /><a href={customerPortalUrl} className="px-3 text-sm font-semibold">{t.login}</a><a href={registrationUrl} className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#2185DC] px-5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(33,133,220,.24)] transition hover:bg-[#1877c8]">{t.start}</a></div><button type="button" aria-label="Toggle menu" aria-expanded={menuOpen} className="rounded-xl border border-slate-200 p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
      {menuOpen && <nav className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden"><div className="mb-3"><LanguageSelector /></div>{t.nav.map((label, index) => <a key={label} onClick={() => setMenuOpen(false)} className="block py-3 font-medium" href={`#${sectionIds[index]}`}>{label}</a>)}<div className="mt-4 grid gap-3 border-t border-slate-200 pt-5"><a href={customerPortalUrl} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center justify-center rounded-2xl border border-slate-300 px-5 text-sm font-semibold text-slate-900">{t.login}</a><a href={registrationUrl} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center justify-center rounded-2xl bg-[#2185DC] px-5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(33,133,220,.24)]">{t.start}</a></div></nav>}
    </header>

    <main id="top">
      <section className="bg-[radial-gradient(circle_at_85%_0%,rgba(20,184,166,.12),transparent_28%),radial-gradient(circle_at_65%_20%,rgba(33,133,220,.14),transparent_36%),linear-gradient(180deg,#fff_0%,#f8fbff_100%)] px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2"><div><div className="inline-flex rounded-full border border-[#2185DC]/20 bg-white/80 px-4 py-2 text-sm font-medium text-[#176db6]">{t.badge}</div><h1 className="mt-8 text-5xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-6xl lg:text-7xl">{t.hero}<span className="mt-2 block text-[#2185DC]">{t.accent}</span></h1><p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">{t.intro}</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button>{t.create}<ArrowRight size={17} /></Button></div><div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500">{t.benefits.map((item) => <span key={item} className="inline-flex items-center gap-2"><Check size={16} className="text-[#14B8A6]" />{item}</span>)}</div></div><div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,.14)]"><div className="rounded-[1.5rem] bg-[#0F172A] p-6 text-white"><Logo theme="dark" /><div className="mt-10 grid gap-3 sm:grid-cols-2">{modules.slice(0, 6).map((module) => <div key={module.id} className="rounded-2xl bg-white/8 p-4 text-sm">{module.name[selectedLocale]}</div>)}</div></div></div></div></section>

      <section id="why-yasaflow" className="px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]"><div><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">{t.why}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{t.whyTitle}</h2><p className="mt-5 text-lg leading-8 text-slate-600">{t.whyBody}</p></div><div className="grid gap-4 sm:grid-cols-2">{t.reasons.map((reason, index) => { const Icon = reasonIcons[index]; return <article key={reason.title} className="rounded-3xl border border-slate-200 p-6 shadow-sm"><Icon className="text-[#2185DC]" /><h3 className="mt-5 text-lg font-semibold">{reason.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{reason.text}</p></article>; })}</div></div></div></section>

      <section id="solutions" className="bg-slate-50 px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">{t.audience}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{t.audienceTitle}</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{t.audienceBody}</p><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{t.orgs.map((name) => <article key={name} className="rounded-3xl border border-slate-200 bg-white p-6"><Users className="text-[#2185DC]" /><h3 className="mt-5 text-lg font-semibold">{name}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{t.audienceBody}</p></article>)}</div></div></section>

      <section id="products" className="bg-[#0F172A] px-5 py-24 text-white sm:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#62b4ff]">{t.modules}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{t.modulesTitle}</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{t.modulesBody}</p><div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">{modules.map((module) => { const Icon = getModuleIcon(module.icon); return <article key={module.id} className="bg-[#0F172A] p-6"><div className="flex items-center justify-between gap-4"><Icon className="text-[#62b4ff]" size={22} /><span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${module.included ? 'bg-emerald-400/10 text-emerald-300' : 'bg-white/8 text-slate-300'}`}>{module.included ? t.included : t.extension}</span></div><h3 className="mt-5 font-semibold">{module.name[selectedLocale]}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{module.description[selectedLocale]}</p></article>; })}</div><div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-6 text-slate-300"><ShieldCheck className="mb-3 text-[#62b4ff]" size={22} />{t.paymentNotice}</div></div></section>

      <section className="px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-14 lg:grid-cols-2"><div><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">{t.how}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{t.howTitle}</h2><p className="mt-5 text-lg leading-8 text-slate-600">{t.howBody}</p></div><ol className="space-y-4">{t.steps.map((step, index) => <li key={step} className="flex gap-5 rounded-3xl border border-slate-200 p-5"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#2185DC] font-semibold text-white">{index + 1}</span><h3 className="pt-3 font-semibold">{step}</h3></li>)}</ol></div></div></section>

      <section className="bg-slate-50 px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto max-w-7xl text-center"><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">{t.preview}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{t.previewTitle}</h2><div className="mt-14 grid gap-6 lg:grid-cols-3">{t.views.map((view) => <article key={view} className="rounded-[2rem] border border-slate-200 bg-white p-4"><div className="h-64 rounded-[1.5rem] bg-slate-100" /><h3 className="p-5 text-left text-lg font-semibold">{view}</h3></article>)}</div></div></section>

      <section id="contact" className="px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#0F172A] px-6 py-16 text-center text-white"><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#62b4ff]">{t.cta}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{t.ctaTitle}</h2><p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-300">{t.ctaBody}</p><div className="mt-9 flex justify-center"><Button>{t.create}</Button></div></div></section>
    </main>

    <footer className="border-t border-slate-200 px-5 py-12 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"><div><Logo /><p className="mt-3 max-w-sm text-sm text-slate-500">{t.footer}</p><p className="mt-2 text-sm text-slate-500"><a href="mailto:hello@yasaflow.com">hello@yasaflow.com</a> · Norway</p></div><div className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-600"><LanguageSelector /><a href="/privacy">{t.privacy}</a><a href="/terms">{t.terms}</a><a href="/refund">Refunds</a></div></div></footer>
  </div>;
}
