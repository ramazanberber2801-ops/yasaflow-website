import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { Logo } from './components/branding/Logo';
import { LanguageSelector, useI18n, type Locale } from './i18n';
import { getIncludedModules, getSelectablePaidModules } from './modules';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? 'https://mlyzaxzohgobjkxcrjml.supabase.co';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? 'sb_publishable_FnM3LGjsUiGuCm1vkVTYMA_mtfCLu6P';
const integrationReady = Boolean(supabaseUrl && supabaseAnonKey);
const pendingKey = 'yasaflow.pending-onboarding.v1';
const pendingMaxAge = 24 * 60 * 60 * 1000;

type Step = 1 | 2 | 3 | 4 | 5 | 6;
type Account = { fullName: string; email: string; password: string; accepted: boolean };
type Organization = { name: string; type: string; country: string; language: string };
type PendingOnboarding = { account: Pick<Account, 'fullName' | 'email'>; organization: Organization; plan: string; selectedModules: string[]; locale: Locale; createdAt: number };

type Copy = {
  back: string; badge: string; title: string; intro: string; safe: string; step: string; next: string; previous: string;
  accountTitle: string; name: string; email: string; password: string; accept: string;
  orgTitle: string; orgName: string; orgType: string; country: string; language: string;
  planTitle: string; planNote: string; plans: { id: string; title: string; body: string }[];
  moduleTitle: string; included: string; optional: string; reviewTitle: string; account: string; organization: string; plan: string; modules: string;
  confirm: string; previewOnly: string; doneTitle: string; doneBody: string; contact: string;
  passwordError: string; genericError: string; checkEmail: string; completing: string;
};

const copy: Record<Locale, Copy> = {
  en: {
    back: 'Back to Yasaflow', badge: 'Self-service onboarding', title: 'Prepare your organization in a few clear steps.', intro: 'Create the account, organization and preferred module setup. Pricing and payment are confirmed before activation.', safe: 'No payment is taken in this flow.', step: 'Step', next: 'Continue', previous: 'Back', accountTitle: 'Administrator account', name: 'Full name', email: 'Email', password: 'Password', accept: 'I accept the website terms and privacy notice.', orgTitle: 'Organization details', orgName: 'Organization name', orgType: 'Organization type', country: 'Country', language: 'Primary language', planTitle: 'Subscription preference', planNote: 'These are setup preferences, not published prices or a binding order.', plans: [{ id: 'core', title: 'Core platform', body: 'Included core modules and organization administration.' }, { id: 'flexible', title: 'Flexible setup', body: 'Core platform with selected optional modules.' }, { id: 'tailored', title: 'Tailored agreement', body: 'A customized setup confirmed directly with Yasaflow.' }], moduleTitle: 'Choose optional modules', included: 'Included automatically', optional: 'Optional preference', reviewTitle: 'Review before continuing', account: 'Account', organization: 'Organization', plan: 'Subscription preference', modules: 'Modules', confirm: 'Confirm setup', previewOnly: 'The integration is not activated yet. Your information is not sent or stored.', doneTitle: 'Organization created', doneBody: 'Your Yasaflow account and organization are ready. You can continue to the platform when app access is activated.', contact: 'Contact Yasaflow', passwordError: 'The password must contain at least 8 characters.', genericError: 'The setup could not be completed.', checkEmail: 'Check your email and confirm the account. This page will finish the organization setup automatically when you return.', completing: 'Completing your organization setup…'
  },
  nb: {
    back: 'Tilbake til Yasaflow', badge: 'Selvbetjent oppstart', title: 'Klargjør organisasjonen i noen tydelige steg.', intro: 'Opprett konto, organisasjon og ønsket moduloppsett. Pris og betaling bekreftes før aktivering.', safe: 'Ingen betaling gjennomføres i denne flyten.', step: 'Steg', next: 'Fortsett', previous: 'Tilbake', accountTitle: 'Administratorkonto', name: 'Fullt navn', email: 'E-post', password: 'Passord', accept: 'Jeg godtar vilkårene for nettsiden og personvernerklæringen.', orgTitle: 'Organisasjonsopplysninger', orgName: 'Organisasjonsnavn', orgType: 'Organisasjonstype', country: 'Land', language: 'Hovedspråk', planTitle: 'Abonnementspreferanse', planNote: 'Dette er oppstartsvalg, ikke publiserte priser eller en bindende bestilling.', plans: [{ id: 'core', title: 'Kjerneplattform', body: 'Inkluderte kjernemoduler og administrasjon av organisasjonen.' }, { id: 'flexible', title: 'Fleksibelt oppsett', body: 'Kjerneplattform med valgte tilleggsmoduler.' }, { id: 'tailored', title: 'Tilpasset avtale', body: 'Et tilpasset oppsett som bekreftes direkte med Yasaflow.' }], moduleTitle: 'Velg valgfrie moduler', included: 'Inkludert automatisk', optional: 'Valgfri preferanse', reviewTitle: 'Kontroller før du fortsetter', account: 'Konto', organization: 'Organisasjon', plan: 'Abonnementspreferanse', modules: 'Moduler', confirm: 'Bekreft oppsett', previewOnly: 'Integrasjonen er ikke aktivert ennå. Opplysningene sendes eller lagres ikke.', doneTitle: 'Organisasjonen er opprettet', doneBody: 'Yasaflow-kontoen og organisasjonen er klar. Du kan fortsette til plattformen når apptilgangen aktiveres.', contact: 'Kontakt Yasaflow', passwordError: 'Passordet må ha minst 8 tegn.', genericError: 'Oppsettet kunne ikke fullføres.', checkEmail: 'Sjekk e-posten og bekreft kontoen. Denne siden fullfører organisasjonsopprettelsen automatisk når du kommer tilbake.', completing: 'Fullfører opprettelsen av organisasjonen…'
  },
  tr: {
    back: 'Yasaflow’a dön', badge: 'Kendi kendine başlangıç', title: 'Kuruluşunuzu birkaç net adımda hazırlayın.', intro: 'Hesabı, kuruluşu ve tercih edilen modül yapısını oluşturun. Fiyat ve ödeme etkinleştirmeden önce onaylanır.', safe: 'Bu akışta ödeme alınmaz.', step: 'Adım', next: 'Devam et', previous: 'Geri', accountTitle: 'Yönetici hesabı', name: 'Ad soyad', email: 'E-posta', password: 'Şifre', accept: 'Web sitesi koşullarını ve gizlilik bildirimini kabul ediyorum.', orgTitle: 'Kuruluş bilgileri', orgName: 'Kuruluş adı', orgType: 'Kuruluş türü', country: 'Ülke', language: 'Ana dil', planTitle: 'Abonelik tercihi', planNote: 'Bunlar başlangıç tercihleridir; yayımlanmış fiyat veya bağlayıcı sipariş değildir.', plans: [{ id: 'core', title: 'Temel platform', body: 'Dahil temel modüller ve kuruluş yönetimi.' }, { id: 'flexible', title: 'Esnek kurulum', body: 'Temel platform ve seçilen isteğe bağlı modüller.' }, { id: 'tailored', title: 'Özel anlaşma', body: 'Yasaflow ile doğrudan onaylanan özel kurulum.' }], moduleTitle: 'İsteğe bağlı modülleri seçin', included: 'Otomatik dahil', optional: 'İsteğe bağlı tercih', reviewTitle: 'Devam etmeden önce kontrol edin', account: 'Hesap', organization: 'Kuruluş', plan: 'Abonelik tercihi', modules: 'Modüller', confirm: 'Kurulumu onayla', previewOnly: 'Entegrasyon henüz etkin değil. Bilgileriniz gönderilmez veya saklanmaz.', doneTitle: 'Kuruluş oluşturuldu', doneBody: 'Yasaflow hesabınız ve kuruluşunuz hazır. Uygulama erişimi etkinleştirildiğinde platforma devam edebilirsiniz.', contact: 'Yasaflow ile iletişim', passwordError: 'Şifre en az 8 karakter olmalıdır.', genericError: 'Kurulum tamamlanamadı.', checkEmail: 'E-postanızı kontrol edip hesabı doğrulayın. Geri döndüğünüzde bu sayfa kuruluş kurulumunu otomatik olarak tamamlayacaktır.', completing: 'Kuruluş kurulumu tamamlanıyor…'
  }
};

function readPending(): PendingOnboarding | null {
  try {
    const raw = localStorage.getItem(pendingKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingOnboarding;
    if (!parsed.createdAt || Date.now() - parsed.createdAt > pendingMaxAge) {
      localStorage.removeItem(pendingKey);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(pendingKey);
    return null;
  }
}

function readAccessToken(): string | null {
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  return hash.get('access_token');
}

async function signup(email: string, password: string, fullName: string, locale: Locale) {
  const redirectTo = `${window.location.origin}/get-started`;
  const response = await fetch(`${supabaseUrl}/auth/v1/signup?redirect_to=${encodeURIComponent(redirectTo)}`, {
    method: 'POST',
    headers: { apikey: supabaseAnonKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, data: { full_name: fullName, locale } })
  });
  const data = await response.json() as { access_token?: string; error_description?: string; msg?: string };
  if (!response.ok) throw new Error(data.error_description || data.msg || 'Signup failed.');
  return data;
}

async function createOrganization(accessToken: string, payload: unknown) {
  const response = await fetch(`${supabaseUrl}/functions/v1/self-service-organization`, {
    method: 'POST',
    headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json() as { error?: string };
  if (!response.ok) throw new Error(data.error || 'Organization creation failed.');
}

export default function OnboardingPage() {
  const { locale } = useI18n();
  const t = copy[locale];
  const included = useMemo(() => getIncludedModules(), []);
  const optional = useMemo(() => getSelectablePaidModules(), []);
  const [step, setStep] = useState<Step>(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [account, setAccount] = useState<Account>({ fullName: '', email: '', password: '', accepted: false });
  const [organization, setOrganization] = useState<Organization>({ name: '', type: 'Forening', country: 'Norge', language: 'Norsk' });
  const [plan, setPlan] = useState('core');
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  useEffect(() => {
    document.title = `${t.badge} — Yasaflow`;
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.appendChild(robots); }
    robots.content = 'noindex, nofollow';
  }, [t.badge]);

  useEffect(() => {
    const accessToken = readAccessToken();
    const pending = readPending();
    if (!accessToken || !pending || !integrationReady) return;

    setAccount({ fullName: pending.account.fullName, email: pending.account.email, password: '', accepted: true });
    setOrganization(pending.organization);
    setPlan(pending.plan);
    setSelectedModules(pending.selectedModules);
    setStep(5);
    setBusy(true);
    setError('');

    createOrganization(accessToken, {
      ...pending.organization,
      adminName: pending.account.fullName,
      subscriptionPreference: pending.plan,
      selectedModules: pending.selectedModules
    }).then(() => {
      localStorage.removeItem(pendingKey);
      history.replaceState(null, '', '/get-started');
      setStep(6);
    }).catch((caught) => {
      setError(caught instanceof Error ? caught.message : t.genericError);
    }).finally(() => setBusy(false));
  }, [t.genericError]);

  const next = (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (step === 1 && account.password.length < 8) return setError(t.passwordError);
    setStep((Math.min(step + 1, 5) as Step));
  };

  const finish = async () => {
    setError('');
    if (!integrationReady) return setStep(6);
    setBusy(true);

    const pending: PendingOnboarding = {
      account: { fullName: account.fullName.trim(), email: account.email.trim().toLowerCase() },
      organization,
      plan,
      selectedModules,
      locale,
      createdAt: Date.now()
    };
    localStorage.setItem(pendingKey, JSON.stringify(pending));

    try {
      const result = await signup(pending.account.email, account.password, pending.account.fullName, locale);
      if (!result.access_token) {
        setError(t.checkEmail);
        return;
      }
      await createOrganization(result.access_token, { ...organization, adminName: pending.account.fullName, subscriptionPreference: plan, selectedModules });
      localStorage.removeItem(pendingKey);
      setStep(6);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t.genericError);
    } finally {
      setBusy(false);
    }
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => <label className="block text-sm font-semibold text-slate-700">{label}{children}</label>;
  const inputClass = 'mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base outline-none focus:border-[#2185DC]';
  const selectedPlan = t.plans.find((item) => item.id === plan)!;
  const allModuleNames = [...included.map((m) => m.name[locale]), ...optional.filter((m) => selectedModules.includes(m.id)).map((m) => m.name[locale])];

  return <main id="main-content" className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#fff_100%)] px-5 py-8 text-slate-950 sm:px-8 sm:py-12">
    <div className="mx-auto max-w-6xl">
      <header className="flex items-center justify-between gap-4"><a href="/" aria-label={t.back}><Logo /></a><LanguageSelector compact /></header>
      <div className="mt-10 grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
        <section><a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2185DC]"><ArrowLeft size={16}/>{t.back}</a><div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#2185DC]/20 bg-white px-4 py-2 text-sm font-semibold text-[#176db6]"><ShieldCheck size={16}/>{t.badge}</div><h1 className="mt-6 text-4xl font-semibold tracking-[-.045em] sm:text-5xl">{t.title}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{t.intro}</p><p className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800">{t.safe}</p><div className="mt-8 flex gap-2">{[1,2,3,4,5].map((number)=><span key={number} className={`h-2 flex-1 rounded-full ${number <= Math.min(step,5) ? 'bg-[#2185DC]' : 'bg-slate-200'}`}/>)}</div></section>
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,.1)] sm:p-8">
          {step < 6 && <p className="text-sm font-semibold text-[#2185DC]">{t.step} {step} / 5</p>}
          {busy && step === 5 && <p className="mb-5 flex items-center gap-2 rounded-2xl bg-blue-50 p-4 text-sm font-medium text-blue-800"><Loader2 className="animate-spin" size={18}/>{t.completing}</p>}
          {step === 1 && <form onSubmit={next} className="mt-2 space-y-5"><h2 className="text-2xl font-semibold">{t.accountTitle}</h2><Field label={t.name}><input required className={inputClass} value={account.fullName} onChange={e=>setAccount({...account,fullName:e.target.value})}/></Field><Field label={t.email}><input required type="email" className={inputClass} value={account.email} onChange={e=>setAccount({...account,email:e.target.value})}/></Field><Field label={t.password}><input required type="password" minLength={8} className={inputClass} value={account.password} onChange={e=>setAccount({...account,password:e.target.value})}/></Field><label className="flex items-start gap-3 text-sm text-slate-600"><input required type="checkbox" className="mt-1" checked={account.accepted} onChange={e=>setAccount({...account,accepted:e.target.checked})}/><span>{t.accept} <a className="font-semibold text-[#2185DC]" href="/terms">Terms</a> · <a className="font-semibold text-[#2185DC]" href="/privacy">Privacy</a></span></label>{error&&<p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<NextButton label={t.next}/></form>}
          {step === 2 && <form onSubmit={next} className="mt-2 space-y-5"><h2 className="text-2xl font-semibold">{t.orgTitle}</h2><Field label={t.orgName}><input required className={inputClass} value={organization.name} onChange={e=>setOrganization({...organization,name:e.target.value})}/></Field><Field label={t.orgType}><select className={inputClass} value={organization.type} onChange={e=>setOrganization({...organization,type:e.target.value})}>{['Forening','Moské','Kirke','Idrettslag','Kulturorganisasjon','Frivillig organisasjon','Studentforening','Trossamfunn','Annet'].map(v=><option key={v}>{v}</option>)}</select></Field><div className="grid gap-4 sm:grid-cols-2"><Field label={t.country}><input required className={inputClass} value={organization.country} onChange={e=>setOrganization({...organization,country:e.target.value})}/></Field><Field label={t.language}><select className={inputClass} value={organization.language} onChange={e=>setOrganization({...organization,language:e.target.value})}>{['Norsk','English','Türkçe','العربية','اردو'].map(v=><option key={v}>{v}</option>)}</select></Field></div><NavButtons back={()=>setStep(1)} backLabel={t.previous} nextLabel={t.next}/></form>}
          {step === 3 && <form onSubmit={next} className="mt-2 space-y-5"><h2 className="text-2xl font-semibold">{t.planTitle}</h2><p className="text-sm leading-6 text-slate-600">{t.planNote}</p><div className="grid gap-3">{t.plans.map(item=><label key={item.id} className={`cursor-pointer rounded-2xl border p-5 ${plan===item.id?'border-[#2185DC] bg-[#2185DC]/5':'border-slate-200'}`}><input type="radio" name="plan" className="sr-only" checked={plan===item.id} onChange={()=>setPlan(item.id)}/><span className="font-semibold">{item.title}</span><span className="mt-2 block text-sm leading-6 text-slate-600">{item.body}</span></label>)}</div><NavButtons back={()=>setStep(2)} backLabel={t.previous} nextLabel={t.next}/></form>}
          {step === 4 && <form onSubmit={next} className="mt-2 space-y-5"><h2 className="text-2xl font-semibold">{t.moduleTitle}</h2><div className="rounded-2xl border border-slate-200 p-5"><p className="text-sm font-semibold text-emerald-700">{t.included}</p><div className="mt-3 flex flex-wrap gap-2">{included.map(m=><span key={m.id} className="rounded-full bg-emerald-50 px-3 py-2 text-sm">{m.name[locale]}</span>)}</div></div><div className="grid gap-3">{optional.map(m=><label key={m.id} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-5"><input type="checkbox" className="mt-1" checked={selectedModules.includes(m.id)} onChange={()=>setSelectedModules(selectedModules.includes(m.id)?selectedModules.filter(id=>id!==m.id):[...selectedModules,m.id])}/><span><strong className="block">{m.name[locale]}</strong><span className="mt-1 block text-sm text-slate-600">{m.description[locale]}</span></span></label>)}</div><NavButtons back={()=>setStep(3)} backLabel={t.previous} nextLabel={t.next}/></form>}
          {step === 5 && <div className="mt-2 space-y-5"><h2 className="text-2xl font-semibold">{t.reviewTitle}</h2><Review label={t.account} value={`${account.fullName} · ${account.email}`}/><Review label={t.organization} value={`${organization.name} · ${organization.type} · ${organization.country}`}/><Review label={t.plan} value={selectedPlan.title}/><Review label={t.modules} value={allModuleNames.join(', ')}/>{!integrationReady&&<p className="rounded-2xl bg-amber-50 p-4 text-sm font-medium text-amber-800">{t.previewOnly}</p>}{error&&<p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<div className="flex flex-col-reverse gap-3 sm:flex-row"><button type="button" disabled={busy} onClick={()=>setStep(4)} className="min-h-12 flex-1 rounded-xl border border-slate-200 px-5 font-semibold disabled:opacity-50">{t.previous}</button><button type="button" disabled={busy} onClick={finish} className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#2185DC] px-5 font-semibold text-white disabled:opacity-50">{busy?<Loader2 className="animate-spin" size={18}/>:<Check size={18}/>} {t.confirm}</button></div></div>}
          {step === 6 && <div className="py-6 text-center"><CheckCircle2 className="mx-auto text-emerald-500" size={56}/><h2 className="mt-5 text-2xl font-semibold">{t.doneTitle}</h2><p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">{t.doneBody}</p><a href="mailto:hello@yasaflow.com" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#2185DC] px-5 font-semibold text-white">{t.contact}<ArrowRight size={18}/></a></div>}
        </section>
      </div>
    </div>
  </main>;
}

function NextButton({ label }: { label: string }) { return <button className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2185DC] px-5 font-semibold text-white">{label}<ArrowRight size={18}/></button>; }
function NavButtons({ back, backLabel, nextLabel }: { back:()=>void; backLabel:string; nextLabel:string }) { return <div className="flex flex-col-reverse gap-3 sm:flex-row"><button type="button" onClick={back} className="min-h-12 flex-1 rounded-xl border border-slate-200 px-5 font-semibold">{backLabel}</button><button className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#2185DC] px-5 font-semibold text-white">{nextLabel}<ArrowRight size={18}/></button></div>; }
function Review({ label, value }: { label:string; value:string }) { return <div className="rounded-2xl border border-slate-200 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-2 font-medium text-slate-800">{value}</p></div>; }
