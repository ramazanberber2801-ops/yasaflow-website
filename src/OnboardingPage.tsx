import { useState, type FormEvent } from 'react';
import { ArrowRight, Building2, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

type Step = 'account' | 'organization' | 'done';

type SignupResult = {
  access_token?: string;
  user?: { id: string; email?: string };
  error_description?: string;
  msg?: string;
};

async function signup(email: string, password: string, fullName: string) {
  if (!supabaseUrl || !supabaseAnonKey) throw new Error('Supabase er ikke konfigurert på nettsiden.');
  const response = await fetch(`${supabaseUrl}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      data: { full_name: fullName },
      gotrue_meta_security: {},
    }),
  });
  const data = await response.json() as SignupResult;
  if (!response.ok) throw new Error(data.error_description || data.msg || 'Kontoen kunne ikke opprettes.');
  return data;
}

async function createOrganization(accessToken: string, payload: Record<string, string>) {
  if (!supabaseUrl || !supabaseAnonKey) throw new Error('Supabase er ikke konfigurert på nettsiden.');
  const response = await fetch(`${supabaseUrl}/functions/v1/self-service-organization`, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json() as { error?: string; organizationId?: string };
  if (!response.ok) throw new Error(data.error || 'Organisasjonen kunne ikke opprettes.');
  return data;
}

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>('account');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [account, setAccount] = useState({ fullName: '', email: '', password: '' });
  const [organization, setOrganization] = useState({ name: '', organizationType: 'Forening', country: 'Norge', language: 'Norsk' });

  const submitAccount = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (account.password.length < 8) return setError('Passordet må ha minst 8 tegn.');
    setBusy(true);
    try {
      const result = await signup(account.email.trim().toLowerCase(), account.password, account.fullName.trim());
      if (!result.access_token) {
        setError('Sjekk e-posten din og bekreft kontoen. Deretter kan du fortsette opprettelsen.');
        return;
      }
      setAccessToken(result.access_token);
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
      const result = await createOrganization(accessToken, { ...organization, adminName: account.fullName });
      setOrganizationId(result.organizationId || '');
      setStep('done');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Organisasjonen kunne ikke opprettes.');
    } finally {
      setBusy(false);
    }
  };

  return <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-5 py-12 text-slate-950 sm:px-8">
    <div className="mx-auto max-w-5xl">
      <a href="/" className="text-sm font-semibold text-[#2185DC]">← Tilbake til Yasaflow</a>
      <div className="mt-8 grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <section>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2185DC]/20 bg-white px-4 py-2 text-sm font-semibold text-[#176db6]"><ShieldCheck size={16}/> Trygg selvbetjent oppstart</div>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-.045em] sm:text-5xl">Opprett organisasjonen din på få minutter.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">Yasaflow klargjør konto, organisasjon, administrator, standardtema og grunnmoduler automatisk.</p>
          <div className="mt-8 space-y-4 text-sm text-slate-600">
            {['Opprett administratorkonto','Legg inn organisasjonsinformasjon','Få ferdig adminportal og appoppsett'].map((item,index)=><div key={item} className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2185DC]/10 font-semibold text-[#2185DC]">{index+1}</span>{item}</div>)}
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,.12)] sm:p-8">
          {step === 'account' && <form onSubmit={submitAccount} className="space-y-5">
            <div><p className="text-sm font-semibold text-[#2185DC]">Steg 1 av 2</p><h2 className="mt-2 text-2xl font-semibold">Opprett administratorkonto</h2></div>
            <label className="block text-sm font-medium">Fullt navn<input required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#2185DC]" value={account.fullName} onChange={e=>setAccount({...account,fullName:e.target.value})}/></label>
            <label className="block text-sm font-medium">E-post<input required type="email" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#2185DC]" value={account.email} onChange={e=>setAccount({...account,email:e.target.value})}/></label>
            <label className="block text-sm font-medium">Passord<input required type="password" minLength={8} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#2185DC]" value={account.password} onChange={e=>setAccount({...account,password:e.target.value})}/></label>
            {error&&<p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2185DC] px-5 py-3 font-semibold text-white disabled:opacity-50">{busy?<Loader2 className="animate-spin" size={18}/>:<ArrowRight size={18}/>} Fortsett</button>
          </form>}

          {step === 'organization' && <form onSubmit={submitOrganization} className="space-y-5">
            <div><p className="text-sm font-semibold text-[#2185DC]">Steg 2 av 2</p><h2 className="mt-2 text-2xl font-semibold">Fortell om organisasjonen</h2></div>
            <label className="block text-sm font-medium">Organisasjonsnavn<input required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" value={organization.name} onChange={e=>setOrganization({...organization,name:e.target.value})}/></label>
            <label className="block text-sm font-medium">Organisasjonstype<select className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" value={organization.organizationType} onChange={e=>setOrganization({...organization,organizationType:e.target.value})}><option>Forening</option><option>Moské</option><option>Kirke</option><option>Idrettslag</option><option>Kulturorganisasjon</option><option>Frivillig organisasjon</option><option>Studentforening</option><option>Annet</option></select></label>
            <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-medium">Land<input required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" value={organization.country} onChange={e=>setOrganization({...organization,country:e.target.value})}/></label><label className="block text-sm font-medium">Språk<select className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" value={organization.language} onChange={e=>setOrganization({...organization,language:e.target.value})}><option>Norsk</option><option>English</option><option>Türkçe</option><option>العربية</option><option>اردو</option></select></label></div>
            {error&&<p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2185DC] px-5 py-3 font-semibold text-white disabled:opacity-50">{busy?<Loader2 className="animate-spin" size={18}/>:<Building2 size={18}/>} Opprett organisasjon</button>
          </form>}

          {step === 'done' && <div className="py-6 text-center"><CheckCircle2 className="mx-auto text-emerald-500" size={54}/><h2 className="mt-5 text-2xl font-semibold">Organisasjonen er opprettet</h2><p className="mt-3 text-slate-600">Yasaflow har klargjort standardtema, moduler og administratoroppsett.</p>{organizationId&&<p className="mt-3 text-xs text-slate-400">Organisasjons-ID: {organizationId}</p>}<a href="https://yasaflow.vercel.app" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#2185DC] px-5 py-3 font-semibold text-white">Åpne Yasaflow <ArrowRight size={18}/></a></div>}
        </section>
      </div>
    </div>
  </main>;
}
