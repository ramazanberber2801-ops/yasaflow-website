import { useEffect, useState, type FormEvent } from 'react';
import { Building2, ExternalLink, Loader2, LogOut, ShieldCheck } from 'lucide-react';
import { supabase } from './lib/supabase';

type Organization = {
  id: string;
  name: string;
  slug: string | null;
  subscription_status: string | null;
  subscription_plan: string | null;
  trial_ends_at: string | null;
};

type AdminRecord = { organization_id: string };

const APP_ORIGIN = 'https://test.yasaflow.com';

function appUrl(organizationId: string) {
  return `${APP_ORIGIN}/?org=${encodeURIComponent(organizationId)}`;
}

function adminUrl(organizationId: string) {
  return `${APP_ORIGIN}/?org=${encodeURIComponent(organizationId)}&admin=1`;
}

export default function CustomerPortalV2() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const loadPortal = async () => {
    const client = supabase;
    if (!client) {
      setError('Kundeportalen mangler Supabase-konfigurasjon.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    const { data: { session } } = await client.auth.getSession();
    if (!session) {
      setOrganizations([]);
      setUserEmail('');
      setLoading(false);
      return;
    }

    const normalizedEmail = (session.user.email || '').trim().toLowerCase();
    setUserEmail(normalizedEmail);

    let adminResult = await client
      .from('organization_admins')
      .select('organization_id')
      .eq('user_id', session.user.id)
      .eq('invitation_status', 'accepted');

    if ((!adminResult.data || adminResult.data.length === 0) && normalizedEmail) {
      adminResult = await client
        .from('organization_admins')
        .select('organization_id')
        .eq('email', normalizedEmail)
        .eq('invitation_status', 'accepted');
    }

    if (adminResult.error) {
      setError(adminResult.error.message);
      setLoading(false);
      return;
    }

    const ids = Array.from(new Set((adminResult.data || []).map((row: AdminRecord) => row.organization_id).filter(Boolean)));
    if (ids.length === 0) {
      setOrganizations([]);
      setLoading(false);
      return;
    }

    const { data, error: orgError } = await client
      .from('organizations')
      .select('id,name,slug,subscription_status,subscription_plan,trial_ends_at')
      .in('id', ids)
      .order('created_at', { ascending: true });

    if (orgError) setError(orgError.message);
    else setOrganizations((data || []) as Organization[]);
    setLoading(false);
  };

  useEffect(() => { void loadPortal(); }, []);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError('');
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    setBusy(false);
    if (loginError) {
      setError('Feil e-post eller passord.');
      return;
    }
    await loadPortal();
  };

  const logout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setOrganizations([]);
    setUserEmail('');
    setEmail('');
    setPassword('');
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-blue-600" size={30}/></div>;
  }

  if (!userEmail) {
    return <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900"><div className="mx-auto max-w-md"><a href="/" className="text-sm font-semibold text-blue-600">← Tilbake til Yasaflow</a><div className="mt-8 rounded-3xl bg-white p-7 shadow-xl"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white"><ShieldCheck size={23}/></div><h1 className="mt-5 text-3xl font-semibold">Kundeportal</h1><p className="mt-2 text-sm leading-6 text-slate-500">Logg inn for å administrere organisasjonen og abonnementet.</p><form onSubmit={login} className="mt-6 space-y-4"><input required type="email" placeholder="E-post" className="w-full rounded-xl border border-slate-200 p-3" value={email} onChange={e=>setEmail(e.target.value)}/><input required type="password" placeholder="Passord" className="w-full rounded-xl border border-slate-200 p-3" value={password} onChange={e=>setPassword(e.target.value)}/>{error&&<p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white disabled:opacity-60">{busy&&<Loader2 size={17} className="animate-spin"/>}{busy?'Logger inn...':'Logg inn'}</button></form><p className="mt-5 border-t pt-5 text-sm text-slate-500">Ny kunde? <a href="/get-started" className="font-semibold text-blue-600">Opprett organisasjon</a></p></div></div></div>;
  }

  return <div className="min-h-screen bg-slate-50 text-slate-900"><header className="border-b bg-white"><div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-600">Yasaflow</p><h1 className="text-xl font-semibold">Kundeportal</h1></div><button onClick={()=>void logout()} className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"><LogOut size={16}/>Logg ut</button></div></header><main className="mx-auto max-w-5xl px-5 py-8"><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Organisasjoner</p><p className="mt-2 text-3xl font-semibold">{organizations.length}</p></div><div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Innlogget som</p><p className="mt-2 truncate font-semibold">{userEmail}</p></div></div>{error&&<p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}{organizations.length===0?<div className="mt-6 rounded-3xl bg-white p-8 text-center shadow-sm"><Building2 className="mx-auto text-slate-300" size={34}/><h2 className="mt-3 text-xl font-semibold">Ingen organisasjoner funnet</h2><p className="mt-2 text-sm text-slate-500">Logg ut og inn igjen. Kontakt support dersom organisasjonen fortsatt mangler.</p></div>:<div className="mt-6 space-y-4">{organizations.map(org=><section key={org.id} className="rounded-3xl bg-white p-6 shadow-sm"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-2xl font-semibold">{org.name}</h2><p className="mt-2 text-sm text-slate-500">Status: {org.subscription_status || 'Ikke aktiv'} · Plan: {org.subscription_plan || 'Core'}</p></div><a href={appUrl(org.id)} className="inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold">Åpne appen <ExternalLink size={16}/></a></div><a href={adminUrl(org.id)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 font-semibold text-white">Åpne administrasjon <ExternalLink size={17}/></a></section>)}</div>}</main></div>;
}
