import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { Logo } from './components/branding/Logo';
import { LanguageSelector } from './i18n';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const appUrl = (import.meta.env.VITE_APP_URL as string | undefined) || 'https://yasaflow.vercel.app';

type Step = 'account' | 'organization' | 'done';
type AuthResult = { access_token?: string; refresh_token?: string; error_description?: string; msg?: string };
type OrganizationResult = { organizationId?: string; trialEndsAt?: string; error?: string };

async function signup(email: string, password: string, fullName: string) {
  if (!supabaseUrl || !supabaseAnonKey) throw new Error('Supabase er ikke konfigurert på nettsiden.');
  const response = await fetch(`${supabaseUrl}/auth/v1/signup`, {
    method: 'POST',
    headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${supabaseAnonKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, data: { full_name: fullName } }),
  });
  const data = await response.json() as AuthResult;
  if (!response.ok) throw new Error(data.error_description || data.msg || 'Kontoen kunne ikke opprettes.');
  return data;
}

async function createOrganization(accessToken: string, payload: Record<string, unknown>) {
  if (!supabaseUrl || !supabaseAnonKey) throw new Error('Supabase er ikke konfigurert på nettsiden.');
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/self_service_create_organization`, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ payload }),
  });
  const data = await response.json() as OrganizationResult;
  if (!response.ok) throw new Error(data.error || 'Organisasjonen kunne ikke opprettes.');
  return data;
}

export default function ConnectedOnboardingPage() {
  const [step, setStep] = useState<Step>('account');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [tokens, setTokens] = useState({ accessToken: '', refreshToken: '' });
  const [organizationId, setOrganizationId] = useState('');
  const [trialEndsAt, setTrialEndsAt] = useState('');
  const [account, setAccount] = useState({ fullName: '', email: '', password: '', accepted: false });
  const [organization, setOrganization] = useState({ name: '', type: 'Forening', country: 'Norge', language: 'Norsk', subscriptionPreference: 'core' });

  const submitAccount = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (account.password.length < 8) return setError('Passordet må ha minst 8 tegn.');
    setBusy(true);
    try {
      const result = await signup(account.email.trim().toLowerCase(), account.password, account.fullName.trim());
      if (!result.access_token || !result.refresh_token) {
        setError('Sjekk e-posten og bekreft kontoen. Gå deretter tilbake og logg inn for å fortsette.');
        return;
      }
      setTokens({ accessToken: result.access_token, refreshToken: result.refresh_token });
      setStep('organization');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Kontoen kunne ikke opprettes.');
    } finally {
      setBusy(false);
    }
  };

  const submitOrganization = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const result = await createOrganization(tokens.accessToken, {
        ...organization,
        adminName: account.fullName,
        selectedModules: [],
      });
      setOrganizationId(result.organizationId || '');
      setTrialEndsAt(result.trialEndsAt || '');
      setStep('done');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Organisasjonen kunne ikke opprettes.');
    } finally {
      setBusy(false);
    }
  };

  const openApp = () => {
    const fragment = new URLSearchParams({
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      onboarding: '1',
      organization_id: organizationId,
    });
    window.location.assign(`${appUrl.replace(/\/$/, '')}/#${fragment.toString()}`);
  };

  const inputClass = 'mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base outline-none focus:border-[#2185DC]';

  return <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#fff_100%)] px-5 py-8 text-slate-950 sm:px-8 sm:py-12">
    <div className="mx-auto max-w-6xl">
      <header className="flex items-center justify-between gap-4"><a href="/" aria-label="Tilbake til Yasaflow"><Logo /></a><LanguageSelector compact /></header>
      <div className="mt-10 grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
        <section>
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2185DC]"><ArrowLeft size={16}/>Tilbake til Yasaflow</a>
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#2185DC]/20 bg-white px-4 py-2 text-sm font-semibold text-[#176db6]"><ShieldCheck size={16}/>Selvbetjent oppstart</div>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-.045em] sm:text-5xl">Opprett organisasjonen og start 7 dagers prøve.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">Konto, organisasjon, administrator, standardtema og grunnmoduler klargjøres automatisk.</p>
          <p className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800">Ingen betaling gjennomføres nå. Betalingsløsningen kobles til senere.</p>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,.1)] sm:p-8">
          {step === 'account' && <form onSubmit={submitAccount} className="space-y-5">
            <div><p className="text-sm font-semibold text-[#2185DC]">Steg 1 av 2</p><h2 className="mt-2 text-2xl font-semibold">Administratorkonto</h2></div>
            <label className="block text-sm font-semibold text-slate-700">Fullt navn<input required className={inputClass} value={account.fullName} onChange={e=>setAccount({...account,fullName:e.target.value})}/></label>
            <label className="block text-sm font-semibold text-slate-700">E-post<input required type="email" className={inputClass} value={account.email} onChange={e=>setAccount({...account,email:e.target.value})}/></label>
            <label className="block text-sm font-semibold text-slate-700">Passord<input required type="password" minLength={8} className={inputClass} value={account.password} onChange={e=>setAccount({...account,password:e.target.value})}/></label>
            <label className="flex items-start gap-3 text-sm text-slate-600"><input required type="checkbox" className="mt-1" checked={account.accepted} onChange={e=>setAccount({...account,accepted:e.target.checked})}/><span>Jeg godtar <a className="font-semibold text-[#2185DC]" href="/terms">vilkårene</a> og <a className="font-semibold text-[#2185DC]" href="/privacy">personvernerklæringen</a>.</span></label>
            {error&&<p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2185DC] px-5 py-3 font-semibold text-white disabled:opacity-50">{busy?<Loader2 className="animate-spin" size={18}/>:<ArrowRight size={18}/>}Fortsett</button>
          </form>}

          {step === 'organization' && <form onSubmit={submitOrganization} className="space-y-5">
            <div><p className="text-sm font-semibold text-[#2185DC]">Steg 2 av 2</p><h2 className="mt-2 text-2xl font-semibold">Organisasjonsopplysninger</h2></div>
            <label className="block text-sm font-semibold text-slate-700">Organisasjonsnavn<input required className={inputClass} value={organization.name} onChange={e=>setOrganization({...organization,name:e.target.value})}/></label>
            <label className="block text-sm font-semibold text-slate-700">Organisasjonstype<select className={inputClass} value={organization.type} onChange={e=>setOrganization({...organization,type:e.target.value})}><option>Forening</option><option>Moské</option><option>Kirke</option><option>Idrettslag</option><option>Kulturorganisasjon</option><option>Frivillig organisasjon</option><option>Studentforening</option><option>Annet</option></select></label>
            <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-semibold text-slate-700">Land<input required className={inputClass} value={organization.country} onChange={e=>setOrganization({...organization,country:e.target.value})}/></label><label className="block text-sm font-semibold text-slate-700">Hovedspråk<select className={inputClass} value={organization.language} onChange={e=>setOrganization({...organization,language:e.target.value})}><option>Norsk</option><option>English</option><option>Türkçe</option><option>العربية</option><option>اردو</option></select></label></div>
            {error&&<p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2185DC] px-5 py-3 font-semibold text-white disabled:opacity-50">{busy?<Loader2 className="animate-spin" size={18}/>:<Building2 size={18}/>}Opprett organisasjon</button>
          </form>}

          {step === 'done' && <div className="py-6 text-center"><CheckCircle2 className="mx-auto text-emerald-500" size={54}/><h2 className="mt-5 text-2xl font-semibold">Organisasjonen er klar</h2><p className="mt-3 text-slate-600">7 dagers prøve er startet, og organisasjonen er koblet til administratorkontoen.</p>{trialEndsAt&&<p className="mt-2 text-sm text-slate-500">Prøveperioden utløper {new Date(trialEndsAt).toLocaleDateString('nb-NO')}.</p>}<button onClick={openApp} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#2185DC] px-5 py-3 font-semibold text-white">Åpne Yasaflow <ArrowRight size={18}/></button></div>}
        </section>
      </div>
    </div>
  </main>;
}
