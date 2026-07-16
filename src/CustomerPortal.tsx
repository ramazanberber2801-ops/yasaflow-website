import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Building2, CreditCard, ExternalLink, FileText, Loader2, LogOut, Settings, ShieldCheck } from 'lucide-react';
import { supabase } from './lib/supabase';

type Organization = {
  id:string; name:string; slug:string; status:string; subscription_status:string; subscription_plan:string;
  trial_ends_at:string|null; admin_email:string|null; organization_type:string|null; country:string|null;
};

type AdminRecord = { organization_id:string; role:string; display_name:string|null; email:string|null };

function daysRemaining(value:string|null){
  if(!value)return null;
  return Math.max(0,Math.ceil((new Date(value).getTime()-Date.now())/86400000));
}

export default function CustomerPortal(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(true);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const [userEmail,setUserEmail]=useState('');
  const [organizations,setOrganizations]=useState<Organization[]>([]);

  const loadPortal=async()=>{
    const client=supabase;
    if(!client){setError('Kundeportalen mangler Supabase-konfigurasjon.');setLoading(false);return;}
    setLoading(true);setError('');
    const {data:{session}}=await client.auth.getSession();
    if(!session){setOrganizations([]);setUserEmail('');setLoading(false);return;}
    setUserEmail(session.user.email||'');
    const {data:admins,error:adminError}=await client.from('organization_admins').select('organization_id,role,display_name,email').eq('user_id',session.user.id).eq('invitation_status','accepted');
    if(adminError){setError(adminError.message);setLoading(false);return;}
    const ids=(admins||[]).map((row:AdminRecord)=>row.organization_id);
    if(ids.length===0){setOrganizations([]);setLoading(false);return;}
    const {data,error}=await client.from('organizations').select('id,name,slug,status,subscription_status,subscription_plan,trial_ends_at,admin_email,organization_type,country').in('id',ids).order('created_at',{ascending:true});
    if(error)setError(error.message);else setOrganizations((data||[]) as Organization[]);
    setLoading(false);
  };

  useEffect(()=>{void loadPortal();},[]);

  const login=async(event:FormEvent)=>{
    event.preventDefault();const client=supabase;if(!client)return;
    setBusy(true);setError('');
    const {error}=await client.auth.signInWithPassword({email:email.trim().toLowerCase(),password});
    setBusy(false);
    if(error){setError('Feil e-post eller passord.');return;}
    await loadPortal();
  };

  const logout=async()=>{if(!supabase)return;await supabase.auth.signOut();setOrganizations([]);setUserEmail('');setEmail('');setPassword('');};
  const hasSession=Boolean(userEmail);
  const totalTrials=useMemo(()=>organizations.filter(org=>org.subscription_status==='trial').length,[organizations]);

  if(loading)return <div className="flex min-h-screen items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-blue-600" size={30}/></div>;

  if(!hasSession)return <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
    <div className="mx-auto max-w-md">
      <a href="/" className="text-sm font-semibold text-blue-600">← Tilbake til Yasaflow</a>
      <div className="mt-8 rounded-3xl bg-white p-7 shadow-xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white"><ShieldCheck size={23}/></div>
        <h1 className="mt-5 text-3xl font-semibold">Kundeportal</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">Logg inn for å administrere organisasjon, abonnement, fakturaer og appadresse.</p>
        <form onSubmit={login} className="mt-6 space-y-4">
          <div><label className="text-sm font-medium">E-post</label><input required type="email" className="mt-1 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-blue-500" value={email} onChange={e=>setEmail(e.target.value)}/></div>
          <div><label className="text-sm font-medium">Passord</label><input required type="password" className="mt-1 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-blue-500" value={password} onChange={e=>setPassword(e.target.value)}/></div>
          {error&&<p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white disabled:opacity-60">{busy&&<Loader2 size={17} className="animate-spin"/>}{busy?'Logger inn...':'Logg inn'}</button>
        </form>
        <div className="mt-5 border-t pt-5 text-sm text-slate-500">Ny kunde? <a href="/get-started" className="font-semibold text-blue-600">Opprett organisasjon</a></div>
      </div>
    </div>
  </div>;

  return <div className="min-h-screen bg-slate-50 text-slate-900">
    <header className="border-b bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-600">Yasaflow</p><h1 className="text-xl font-semibold">Kundeportal</h1></div><button onClick={()=>void logout()} className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"><LogOut size={16}/>Logg ut</button></div></header>
    <main className="mx-auto max-w-6xl px-5 py-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Organisasjoner</p><p className="mt-2 text-3xl font-semibold">{organizations.length}</p></div>
        <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Aktive prøveperioder</p><p className="mt-2 text-3xl font-semibold">{totalTrials}</p></div>
        <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Innlogget som</p><p className="mt-2 truncate font-semibold">{userEmail}</p></div>
      </div>

      {error&&<p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {organizations.length===0?<div className="mt-6 rounded-3xl bg-white p-8 text-center shadow-sm"><Building2 className="mx-auto text-slate-300" size={34}/><h2 className="mt-3 text-xl font-semibold">Ingen organisasjoner funnet</h2><p className="mt-2 text-sm text-slate-500">Denne brukeren er ikke registrert som eier eller administrator ennå.</p></div>:<div className="mt-6 space-y-4">{organizations.map(org=>{
        const remaining=daysRemaining(org.trial_ends_at);
        const appUrl=org.slug?`https://${org.slug}.yasaflow.com`:`https://test.yasaflow.com/?org=${encodeURIComponent(org.id)}`;
        return <section key={org.id} className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-2xl font-semibold">{org.name}</h2><span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{org.subscription_status==='trial'?'Prøveperiode':org.subscription_status||org.status}</span></div><p className="mt-2 text-sm text-slate-500">{org.organization_type||'Organisasjon'}{org.country?` · ${org.country}`:''}</p><p className="mt-1 text-sm text-slate-500">Appadresse: {org.slug||'Ikke valgt'}.yasaflow.com</p>{remaining!==null&&org.subscription_status==='trial'&&<p className="mt-2 text-sm font-medium text-amber-700">{remaining} dager igjen av prøveperioden</p>}</div><a href={appUrl} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white">Åpne appen <ExternalLink size={16}/></a></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <button className="flex items-center gap-3 rounded-2xl border p-4 text-left"><CreditCard className="text-blue-600" size={20}/><span><span className="block text-sm font-semibold">Abonnement</span><span className="text-xs text-slate-500">{org.subscription_plan||'Core'}</span></span></button>
            <button className="flex items-center gap-3 rounded-2xl border p-4 text-left"><FileText className="text-blue-600" size={20}/><span><span className="block text-sm font-semibold">Fakturaer</span><span className="text-xs text-slate-500">Kommer med betaling</span></span></button>
            <button className="flex items-center gap-3 rounded-2xl border p-4 text-left"><Settings className="text-blue-600" size={20}/><span><span className="block text-sm font-semibold">Organisasjon</span><span className="text-xs text-slate-500">Innstillinger og domene</span></span></button>
            <a href={`${appUrl}/admin`} className="flex items-center gap-3 rounded-2xl border p-4 text-left"><Building2 className="text-blue-600" size={20}/><span><span className="block text-sm font-semibold">Administrasjon</span><span className="text-xs text-slate-500">Nyheter, aktiviteter og medlemmer</span></span></a>
          </div>
        </section>;
      })}</div>}
    </main>
  </div>;
}
