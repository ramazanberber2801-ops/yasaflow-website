import { ArrowRight, CalendarDays, Check, MapPin, ShieldCheck, Sparkles, Stethoscope, Users } from 'lucide-react';
import type { Locale } from './i18n';

const copy: Record<Locale, {
  badge:string; title:string; accent:string; intro:string; start:string; login:string;
  benefits:string[]; featuresTitle:string; featuresBody:string; features:{title:string;text:string}[];
  onboardingTitle:string; onboardingBody:string; steps:string[]; payment:string; ctaTitle:string; ctaBody:string;
}> = {
  nb: {
    badge:'Yasaflow for klinikker', title:'En enklere digital hverdag', accent:'for klinikken din.',
    intro:'Samle klinikkprofil, ansatte, kunder, behandlinger, booking og kommunikasjon i én løsning. Klinikken får sin egen Yasaflow-adresse og et eget eierdashboard.',
    start:'Opprett klinikk', login:'Logg inn', benefits:['Kort onboarding','Egen klinikkadresse','Samme trygge betalingssystem'],
    featuresTitle:'Bygget for klinikkdrift', featuresBody:'Klinikkdelen er en egen løsning og påvirker ikke Yasaflow for organisasjoner.',
    features:[
      {title:'Klinikkprofil og Finn frem',text:'Fyll inn klinikkens adresse én gang. Den brukes av den eksisterende Finn frem-kartfunksjonen.'},
      {title:'Ansatte og behandlinger',text:'Legg til behandlere, tjenester og informasjon fra klinikkens eget dashboard.'},
      {title:'Booking og kunder',text:'Klinikkmoduler kan aktiveres etter behov uten at registreringen blir unødvendig lang.'},
      {title:'Eierstyring',text:'Klinikkeieren får full tilgang og kan invitere ansatte med riktige roller.'},
    ],
    onboardingTitle:'Kom i gang på få minutter', onboardingBody:'Klinikker får en kortere onboarding enn organisasjoner.',
    steps:['Eierens navn, e-post og passord','Klinikknavn og adresse','Velg egen .yasaflow.com-adresse','Start prøveperioden og åpne dashboardet'],
    payment:'Klinikkabonnementet bruker samme kundeportal, prøveperiode, betalingsløsning og abonnementshåndtering som resten av Yasaflow.',
    ctaTitle:'Klar til å opprette klinikken?', ctaBody:'Start med de viktigste opplysningene. Resten kan fylles ut senere i dashboardet.',
  },
  en: {
    badge:'Yasaflow for clinics', title:'A simpler digital workflow', accent:'for your clinic.',
    intro:'Bring your clinic profile, staff, customers, treatments, booking and communication together. Every clinic gets its own Yasaflow address and owner dashboard.',
    start:'Create clinic', login:'Log in', benefits:['Short onboarding','Own clinic address','Same secure billing system'],
    featuresTitle:'Built for clinic operations', featuresBody:'The clinic product is separate and does not change Yasaflow for organizations.',
    features:[
      {title:'Clinic profile and directions',text:'Enter the clinic address once and use it with the existing map and directions feature.'},
      {title:'Staff and treatments',text:'Manage practitioners, services and information from the clinic dashboard.'},
      {title:'Booking and customers',text:'Activate clinic modules as needed without making signup unnecessarily long.'},
      {title:'Owner control',text:'The clinic owner gets full access and can invite staff with appropriate roles.'},
    ],
    onboardingTitle:'Get started in minutes', onboardingBody:'Clinics receive a shorter onboarding than organizations.',
    steps:['Owner name, email and password','Clinic name and address','Choose a .yasaflow.com address','Start the trial and open the dashboard'],
    payment:'Clinic subscriptions use the same customer portal, trial, billing provider and subscription management as the rest of Yasaflow.',
    ctaTitle:'Ready to create your clinic?', ctaBody:'Start with the essential details and complete the rest later in the dashboard.',
  },
  tr: {
    badge:'Klinikler için Yasaflow', title:'Kliniğiniz için daha kolay', accent:'bir dijital iş akışı.',
    intro:'Klinik profili, çalışanlar, müşteriler, işlemler, randevular ve iletişimi tek çözümde birleştirin. Her klinik kendi Yasaflow adresine ve yönetim paneline sahip olur.',
    start:'Klinik oluştur', login:'Giriş yap', benefits:['Kısa kayıt süreci','Özel klinik adresi','Aynı güvenli ödeme sistemi'],
    featuresTitle:'Klinik yönetimi için geliştirildi', featuresBody:'Klinik çözümü ayrıdır ve kuruluşlar için Yasaflow yapısını değiştirmez.',
    features:[
      {title:'Klinik profili ve yol tarifi',text:'Klinik adresini bir kez girin; mevcut harita ve yol tarifi özelliğinde kullanılsın.'},
      {title:'Çalışanlar ve işlemler',text:'Uzmanları, hizmetleri ve bilgileri klinik panelinden yönetin.'},
      {title:'Randevu ve müşteriler',text:'Kayıt sürecini uzatmadan ihtiyaç duyulan klinik modüllerini etkinleştirin.'},
      {title:'Klinik sahibi kontrolü',text:'Klinik sahibi tam erişim alır ve çalışanları uygun rollerle davet edebilir.'},
    ],
    onboardingTitle:'Dakikalar içinde başlayın', onboardingBody:'Klinikler kuruluşlara göre daha kısa bir kayıt süreci kullanır.',
    steps:['Klinik sahibinin adı, e-posta ve şifre','Klinik adı ve adresi','Özel .yasaflow.com adresini seçin','Denemeyi başlatıp panele geçin'],
    payment:'Klinik aboneliği Yasaflow’un mevcut müşteri portalını, deneme süresini, ödeme sistemini ve abonelik yönetimini kullanır.',
    ctaTitle:'Kliniğinizi oluşturmaya hazır mısınız?', ctaBody:'Temel bilgilerle başlayın; geri kalanını daha sonra panelden tamamlayın.',
  },
};

const icons=[MapPin,Users,CalendarDays,ShieldCheck];
const registerUrl='https://portal.yasaflow.com/registrer?type=clinic';
const loginUrl='https://portal.yasaflow.com/kunde';

export default function ClinicPage({locale}:{locale:Locale}){
  const t=copy[locale];
  return <main id="main-content" className="bg-white text-slate-950">
    <section className="bg-[radial-gradient(circle_at_85%_0%,rgba(217,70,239,.12),transparent_30%),radial-gradient(circle_at_60%_15%,rgba(33,133,220,.12),transparent_35%),linear-gradient(180deg,#fff_0%,#faf8ff_100%)] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div><div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-white px-4 py-2 text-sm font-semibold text-fuchsia-700"><Stethoscope size={16}/>{t.badge}</div><h1 className="mt-7 text-5xl font-semibold leading-[1.03] tracking-[-.05em] sm:text-6xl">{t.title}<span className="block text-fuchsia-600">{t.accent}</span></h1><p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{t.intro}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={registerUrl} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-fuchsia-600 px-5 text-sm font-semibold text-white shadow-lg hover:bg-fuchsia-700">{t.start}<ArrowRight size={17}/></a><a href={loginUrl} className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 text-sm font-semibold">{t.login}</a></div><div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500">{t.benefits.map(item=><span key={item} className="inline-flex items-center gap-2"><Check size={16} className="text-emerald-500"/>{item}</span>)}</div></div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,.14)]"><div className="rounded-[1.5rem] bg-slate-950 p-6 text-white"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-fuchsia-500/20 text-fuchsia-300"><Sparkles/></div><div><p className="text-xs uppercase tracking-[.18em] text-slate-400">Yasaflow Clinic</p><p className="font-semibold">Clinic owner dashboard</p></div></div><div className="mt-8 grid gap-3 sm:grid-cols-2">{t.features.map(item=><div key={item.title} className="rounded-2xl bg-white/8 p-4"><p className="font-semibold">{item.title}</p><p className="mt-2 text-xs leading-5 text-slate-400">{item.text}</p></div>)}</div></div></div>
      </div>
    </section>
    <section className="px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><h2 className="text-4xl font-semibold tracking-[-.04em]">{t.featuresTitle}</h2><p className="mt-4 max-w-2xl text-lg text-slate-600">{t.featuresBody}</p><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{t.features.map((item,index)=>{const Icon=icons[index];return <article key={item.title} className="rounded-3xl border border-slate-200 p-6"><Icon className="text-fuchsia-600"/><h3 className="mt-5 font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p></article>})}</div></div></section>
    <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2"><div><h2 className="text-4xl font-semibold tracking-[-.04em]">{t.onboardingTitle}</h2><p className="mt-4 text-lg text-slate-600">{t.onboardingBody}</p><div className="mt-6 rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-5 text-sm leading-6 text-fuchsia-950"><ShieldCheck className="mb-3"/>{t.payment}</div></div><ol className="space-y-3">{t.steps.map((step,index)=><li key={step} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-fuchsia-600 font-semibold text-white">{index+1}</span><span className="font-semibold">{step}</span></li>)}</ol></div></section>
    <section className="px-5 py-20 sm:px-8"><div className="mx-auto max-w-5xl rounded-[2.5rem] bg-slate-950 px-6 py-14 text-center text-white"><h2 className="text-4xl font-semibold tracking-[-.04em]">{t.ctaTitle}</h2><p className="mx-auto mt-4 max-w-xl text-slate-300">{t.ctaBody}</p><a href={registerUrl} className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-fuchsia-600 px-6 text-sm font-semibold text-white">{t.start}<ArrowRight size={17}/></a></div></section>
  </main>;
}
