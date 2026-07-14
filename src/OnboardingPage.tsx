import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';
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
type Notice = { kind: 'success' | 'error'; text: string } | null;

type Copy = {
  back: string; badge: string; title: string; intro: string; safe: string; step: string; next: string; previous: string;
  accountTitle: string; name: string; email: string; password: string; showPassword: string; hidePassword: string; accept: string;
  orgTitle: string; orgName: string; orgType: string; country: string; language: string;
  planTitle: string; planNote: string; plans: { id: string; title: string; body: string }[];
  moduleTitle: string; included: string; optional: string; reviewTitle: string; account: string; organization: string; plan: string; modules: string;
  confirm: string; previewOnly: string; doneTitle: string; doneBody: string; contact: string;
  passwordError: string; genericError: string; checkEmail: string; completing: string;
};

const copy: Record<Locale, Copy> = {
  en: {
    back: 'Back to Yasaflow', badge: 'Self-service onboarding', title: 'Prepare your organization in a few clear steps.', intro: 'Create the account, organization and preferred module setup. Pricing and payment are confirmed before activation.', safe: 'No payment is taken in this flow.', step: 'Step', next: 'Continue', previous: 'Back', accountTitle: 'Administrator account', name: 'Full name', email: 'Email', password: 'Password', showPassword: 'Show password', hidePassword: 'Hide password', accept: 'I accept the website terms and privacy notice.', orgTitle: 'Organization details', orgName: 'Organization name', orgType: 'Organization type', country: 'Country', language: 'Primary language', planTitle: 'Subscription preference', planNote: 'These are setup preferences, not published prices or a binding order.', plans: [{ id: 'core', title: 'Core platform', body: 'Included core modules and organization administration.' }, { id: 'flexible', title: 'Flexible setup', body: 'Core platform with selected optional modules.' }, { id: 'tailored', title: 'Tailored agreement', body: 'A customized setup confirmed directly with Yasaflow.' }], moduleTitle: 'Choose optional modules', included: 'Included automatically', optional: 'Optional preference', reviewTitle: 'Review before continuing', account: 'Account', organization: 'Organization', plan: 'Subscription preference', modules: 'Modules', confirm: 'Confirm setup', previewOnly: 'The integration is not activated yet. Your information is not sent or stored.', doneTitle: 'Organization created', doneBody: 'Your Yasaflow account and organization are ready.', contact: 'Contact Yasaflow', passwordError: 'The password must contain at least 8 characters.', genericError: 'The setup could not be completed.', checkEmail: 'Check your email and confirm the account. This page will finish the organization setup automatically when you return.', completing: 'Completing your organization setup…'
  },
  nb: {
    back: 'Tilbake til Yasaflow', badge: 'Selvbetjent oppstart', title: 'Klargjør organisasjonen i noen tydelige steg.', intro: 'Opprett konto, organisasjon og ønsket moduloppsett. Pris og betaling bekreftes før aktivering.', safe: 'Ingen betaling gjennomføres i denne flyten.', step: 'Steg', next: 'Fortsett', previous: 'Tilbake', accountTitle: 'Administratorkonto', name: 'Fullt navn', email: 'E-post', password: 'Passord', showPassword: 'Vis passord', hidePassword: 'Skjul passord', accept: 'Jeg godtar vilkårene for nettsiden og personvernerklæringen.', orgTitle: 'Organisasjonsopplysninger', orgName: 'Organisasjonsnavn', orgType: 'Organisasjonstype', country: 'Land', language: 'Hovedspråk', planTitle: 'Abonnementspreferanse', planNote: 'Dette er oppstartsvalg, ikke publiserte priser eller en bindende bestilling.', plans: [{ id: 'core', title: 'Kjerneplattform', body: 'Inkluderte kjernemoduler og administrasjon av organisasjonen.' }, { id: 'flexible', title: 'Fleksibelt oppsett', body: 'Kjerneplattform med valgte tilleggsmoduler.' }, { id: 'tailored', title: 'Tilpasset avtale', body: 'Et tilpasset oppsett som bekreftes direkte med Yasaflow.' }], moduleTitle: 'Velg valgfrie moduler', included: 'Inkludert automatisk', optional: 'Valgfri preferanse', reviewTitle: 'Kontroller før du fortsetter', account: 'Konto', organization: 'Organisasjon', plan: 'Abonnementspreferanse', modules: 'Moduler', confirm: 'Bekreft oppsett', previewOnly: 'Integrasjonen er ikke aktivert ennå.', doneTitle: 'Organisasjonen er opprettet', doneBody: 'Yasaflow-kontoen og organisasjonen er klar.', contact: 'Kontakt Yasaflow', passwordError: 'Passordet må ha minst 8 tegn.', genericError: 'Oppsettet kunne ikke fullføres.', checkEmail: 'Sjekk e-posten og bekreft kontoen. Denne siden fullfører organisasjonsopprettelsen automatisk når du kommer tilbake.', completing: 'Fullfører opprettelsen av organisasjonen…'
  },
  tr: {
    back: 'Yasaflow’a dön', badge: 'Kendi kendine başlangıç', title: 'Kuruluşunuzu birkaç net adımda hazırlayın.', intro: 'Hesabı, kuruluşu ve tercih edilen modül yapısını oluşturun.', safe: 'Bu akışta ödeme alınmaz.', step: 'Adım', next: 'Devam et', previous: 'Geri', accountTitle: 'Yönetici hesabı', name: 'Ad soyad', email: 'E-posta', password: 'Şifre', showPassword: 'Şifreyi göster', hidePassword: 'Şifreyi gizle', accept: 'Web sitesi koşullarını ve gizlilik bildirimini kabul ediyorum.', orgTitle: 'Kuruluş bilgileri', orgName: 'Kuruluş adı', orgType: 'Kuruluş türü', country: 'Ülke', language: 'Ana dil', planTitle: 'Abonelik tercihi', planNote: 'Bunlar başlangıç tercihleridir.', plans: [{ id: 'core', title: 'Temel platform', body: 'Dahil temel modüller ve kuruluş yönetimi.' }, { id: 'flexible', title: 'Esnek kurulum', body: 'Temel platform ve seçilen isteğe bağlı modüller.' }, { id: 'tailored', title: 'Özel anlaşma', body: 'Yasaflow ile doğrudan onaylanan özel kurulum.' }], moduleTitle: 'İsteğe bağlı modülleri seçin', included: 'Otomatik dahil', optional: 'İsteğe bağlı tercih', reviewTitle: 'Devam etmeden önce kontrol edin', account: 'Hesap', organization: 'Kuruluş', plan: 'Abonelik tercihi', modules: 'Modüller', confirm: 'Kurulumu onayla', previewOnly: 'Entegrasyon henüz etkin değil.', doneTitle: 'Kuruluş oluşturuldu', doneBody: 'Yasaflow hesabınız ve kuruluşunuz hazır.', contact: 'Yasaflow ile iletişim', passwordError: 'Şifre en az 8 karakter olmalıdır.', genericError: 'Kurulum tamamlanamadı.', checkEmail: 'E-postanızı kontrol edip hesabı doğrulayın. Geri döndüğünüzde bu sayfa kuruluş kurulumunu otomatik olarak tamamlayacaktır.', completing: 'Kuruluş kurulumu tamamlanıyor…'
  }
};

const inputClass = 'mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base outline-none focus:border-[#2185DC]';

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block text-sm font-semibold text-slate-700">{label}{children}</label>;
}

function NoticeBox({ notice }: { notice: Notice }) {
  if (!notice) return null;
  return <p role={notice.kind === 'error' ? 'alert' : 'status'} aria-live="polite" className={`rounded-xl border p-4 text-sm font-medium leading-6 ${notice.kind === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-700'}`}>{notice.text}</p>;
}

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

function readAccessToken() {
  return new URLSearchParams(window.location.hash.replace(/^#/, '')).get('access_token');
}

async function signup(email: string, password: string, fullName: string, locale: Locale) {
  const redirectTo = `${window.location.origin}/get-started`;
  const response = await fetch(`${supabaseUrl}/auth/v1/signup?redirect_to=${encodeURIComponent(redirectTo)}`, {
    method: 'POST', headers: { apikey: supabaseAnonKey, 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, data: { full_name: fullName, locale } })
  });
  const data = await response.json() as { access_token?: string; error_description?: string; msg?: string };
  if (!response.ok) throw new Error(data.error_description || data.msg || 'Signup failed.');
  return data;
}

async function createOrganization(accessToken: string, payload: unknown) {
  const response = await fetch(`${supabaseUrl}/functions/v1/self-service-organization`, {
    method: 'POST', headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
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
  const [notice, setNotice] = useState<Notice>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [account, setAccount] = useState<Account>({ fullName: '', email: '', password: '', accepted: false });
  const [organization, setOrganization] = useState<Organization>({ name: '', type: 'Forening', country: 'Norge', language: 'Norsk' });
  const [plan, setPlan] = useState('core');
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  useEffect(() => { document.title = `${t.badge} — Yasaflow`; }, [t.badge]);

  useEffect(() => {
    const accessToken = readAccessToken();
    const pending = readPending();
    if (!accessToken || !pending || !integrationReady) return;
    setAccount({ fullName: pending.account.fullName, email: pending.account.email, password: '', accepted: true });
    setOrganization(pending.organization); setPlan(pending.plan); setSelectedModules(pending.selectedModules); setStep(5); setBusy(true); setNotice(null);
    createOrganization(accessToken, { ...pending.organization, adminName: pending.account.fullName, subscriptionPreference: pending.plan, selectedModules: pending.selectedModules })
      .then(() => { localStorage.removeItem(pendingKey); history.replaceState(null, '', '/get-started'); setStep(6); })
      .catch((caught) => setNotice({ kind: 'error', text: caught instanceof Error ? caught.message : t.genericError }))
      .finally(() => setBusy(false));
  }, [t.genericError]);

  const next = (event: FormEvent) => {
    event.preventDefault(); setNotice(null);
    if (step === 1 && account.password.length < 8) return setNotice({ kind: 'error', text: t.passwordError });
    setStep(Math.min(step + 1, 5) as Step);
  };

  const finish = async () => {
    setNotice(null);
    if (!integrationReady) return setStep(6);
    setBusy(true);
    const pending: PendingOnboarding = { account: { fullName: account.fullName.trim(), email: account.email.trim().toLowerCase() }, organization, plan, selectedModules, locale, createdAt: Date.now() };
    localStorage.setItem(pendingKey, JSON.stringify(pending));
    try {
      const result = await signup(pending.account.email, account.password, pending.account.fullName, locale);
      if (!result.access_token) { setNotice({ kind: 'success', text: t.checkEmail }); return; }
      await createOrganization(result.access_token, { ...organization, adminName: pending.account.fullName, subscriptionPreference: plan, selectedModules });
      localStorage.removeItem(pendingKey); setStep(6);
    } catch (caught) {
      setNotice({ kind: 'error', text: caught instanceof Error ? caught.message : t.genericError });
    } finally { setBusy(false); }
  };

  const selectedPlan = t.plans.find((item) => item.id === plan)!;
  const allModuleNames = [...included.map((m) => m.name[locale]), ...optional.filter((m) => selectedModules.includes(m.id)).map((m) => m.name[locale])];

  return <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#fff_100%)] px-5 py-8 text-slate-950 sm:px-8 sm:py-12"><div className="mx-auto max-w-6xl">
    <header className="flex items-center justify-between gap-4"><a href="/" aria-label={t.back}><Logo /></a><LanguageSelector compact /></header>
    <div className="mt-10 grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
      <section><a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2185DC]"><ArrowLeft size={16}/>{t.back}</a><div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#2185DC]/20 bg-white px-4 py-2 text-sm font-semibold text-[#176db6]"><ShieldCheck size={16}/>{t.badge}</div><h1 className="mt-6 text-4xl font-semibold tracking-[-.045em] sm:text-5xl">{t.title}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{t.intro}</p><p className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800">{t.safe}</p></section>
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,.1)] sm:p-8">
        {step < 6 && <p className="text-sm font-semibold text-[#2185DC]">{t.step} {step} / 5</p>}
        {busy && step === 5 && <p className="mb-5 flex items-center gap-2 rounded-2xl bg-blue-50 p-4 text-sm font-medium text-blue-800"><Loader2 className="animate-spin" size={18}/>{t.completing}</p>}
        {step === 1 && <form onSubmit={next} className="mt-2 space-y-5"><h2 className="text-2xl font-semibold">{t.accountTitle}</h2>
          <Field label={t.name}><input required autoComplete="name" className={inputClass} value={account.fullName} onChange={(e)=>setAccount({...account,fullName:e.target.value})}/></Field>
          <Field label={t.email}><input required type="email" autoComplete="email" className={inputClass} value={account.email} onChange={(e)=>setAccount({...account,email:e.target.value})}/></Field>
          <Field label={t.password}><span className="relative block"><input required type={showPassword ? 'text' : 'password'} autoComplete="new-password" minLength={8} className={`${inputClass} pr-14`} value={account.password} onChange={(e)=>setAccount({...account,password:e.target.value})}/><button type="button" aria-label={showPassword ? t.hidePassword : t.showPassword} aria-pressed={showPassword} onClick={()=>setShowPassword((value)=>!value)} className="absolute bottom-1 right-3 flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100">{showPassword?<EyeOff size={21}/>:<Eye size={21}/>}</button></span></Field>
          <label className="flex items-start gap-3 text-sm text-slate-600"><input required type="checkbox" className="mt-1" checked={account.accepted} onChange={(e)=>setAccount({...account,accepted:e.target.checked})}/><span>{t.accept} <a className="font-semibold text-[#2185DC]" href="/terms">Terms</a> · <a className="font-semibold text-[#2185DC]" href="/privacy">Privacy</a></span></label><NoticeBox notice={notice}/><NextButton label={t.next}/></form>}
        {step === 2 && <form onSubmit={next} className="mt-2 space-y-5"><h2 className="text-2xl font-semibold">{t.orgTitle}</h2><Field label={t.orgName}><input required className={inputClass} value={organization.name} onChange={(e)=>setOrganization({...organization,name:e.target.value})}/></Field><Field label={t.orgType}><select className={inputClass} value={organization.type} onChange={(e)=>setOrganization({...organization,type:e.target.value})}>{['Forening','Moské','Kirke','Idrettslag','Kulturorganisasjon','Frivillig organisasjon','Studentforening','Trossamfunn','Annet'].map((v)=><option key={v}>{v}</option>)}</select></Field><div className="grid gap-4 sm:grid-cols-2"><Field label={t.country}><input required className={inputClass} value={organization.country} onChange={(e)=>setOrganization({...organization,country:e.target.value})}/></Field><Field label={t.language}><select className={inputClass} value={organization.language} onChange={(e)=>setOrganization({...organization,language:e.target.value})}>{['Norsk','English','Türkçe','العربية','اردو'].map((v)=><option key={v}>{v}</option>)}</select></Field></div><NavButtons back={()=>setStep(1)} backLabel={t.previous} nextLabel={t.next}/></form>}
        {step === 3 && <form onSubmit={next} className="mt-2 space-y-5"><h2 className="text-2xl font-semibold">{t.planTitle}</h2><p className="text-sm leading-6 text-slate-600">{t.planNote}</p><div className="grid gap-3">{t.plans.map((item)=><label key={item.id} className={`cursor-pointer rounded-2xl border p-5 ${plan===item.id?'border-[#2185DC] bg-[#2185DC]/5':'border-slate-200'}`}><input type="radio" name="plan" className="sr-only" checked={plan===item.id} onChange={()=>setPlan(item.id)}/><span className="font-semibold">{item.title}</span><span className="mt-2 block text-sm leading-6 text-slate-600">{item.body}</span></label>)}</div><NavButtons back={()=>setStep(2)} backLabel={t.previous} nextLabel={t.next}/></form>}
        {step === 4 && <form onSubmit={next} className="mt-2 space-y-5"><h2 className="text-2xl font-semibold">{t.moduleTitle}</h2><div className="rounded-2xl border border-slate-200 p-5"><p className="text-sm font-semibold text-emerald-700">{t.included}</p><div className="mt-3 flex flex-wrap gap-2">{included.map((m)=><span key={m.id} className="rounded-full bg-emerald-50 px-3 py-2 text-sm">{m.name[locale]}</span>)}</div></div><div className="grid gap-3">{optional.map((m)=><label key={m.id} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-5"><input type="checkbox" className="mt-1" checked={selectedModules.includes(m.id)} onChange={()=>setSelectedModules(selectedModules.includes(m.id)?selectedModules.filter((id)=>id!==m.id):[...selectedModules,m.id])}/><span><strong className="block">{m.name[locale]}</strong><span className="mt-1 block text-sm text-slate-600">{m.description[locale]}</span></span></label>)}</div><NavButtons back={()=>setStep(3)} backLabel={t.previous} nextLabel={t.next}/></form>}
        {step === 5 && <div className="mt-2 space-y-5"><h2 className="text-2xl font-semibold">{t.reviewTitle}</h2><Review label={t.account} value={`${account.fullName} · ${account.email}`}/><Review label={t.organization} value={`${organization.name} · ${organization.type} · ${organization.country}`}/><Review label={t.plan} value={selectedPlan.title}/><Review label={t.modules} value={allModuleNames.join(', ')}/>{!integrationReady&&<p className="rounded-2xl bg-amber-50 p-4 text-sm font-medium text-amber-800">{t.previewOnly}</p>}<NoticeBox notice={notice}/><div className="flex flex-col-reverse gap-3 sm:flex-row"><button type="button" disabled={busy} onClick={()=>setStep(4)} className="min-h-12 flex-1 rounded-xl border border-slate-200 px-5 font-semibold disabled:opacity-50">{t.previous}</button><button type="button" disabled={busy} onClick={finish} className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#2185DC] px-5 font-semibold text-white disabled:opacity-50">{busy?<Loader2 className="animate-spin" size={18}/>:<Check size={18}/>} {t.confirm}</button></div></div>}
        {step === 6 && <div className="py-6 text-center"><CheckCircle2 className="mx-auto text-emerald-500" size={56}/><h2 className="mt-5 text-2xl font-semibold">{t.doneTitle}</h2><p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">{t.doneBody}</p><a href="mailto:hello@yasaflow.com" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#2185DC] px-5 font-semibold text-white">{t.contact}<ArrowRight size={18}/></a></div>}
      </section>
    </div>
  </div></main>;
}

function NextButton({ label }: { label: string }) { return <button className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2185DC] px-5 font-semibold text-white">{label}<ArrowRight size={18}/></button>; }
function NavButtons({ back, backLabel, nextLabel }: { back:()=>void; backLabel:string; nextLabel:string }) { return <div className="flex flex-col-reverse gap-3 sm:flex-row"><button type="button" onClick={back} className="min-h-12 flex-1 rounded-xl border border-slate-200 px-5 font-semibold">{backLabel}</button><button className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#2185DC] px-5 font-semibold text-white">{nextLabel}<ArrowRight size={18}/></button></div>; }
function Review({ label, value }: { label:string; value:string }) { return <div className="rounded-2xl border border-slate-200 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-2 font-medium text-slate-800">{value}</p></div>; }
