import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Building2, ChevronDown, CreditCard, ExternalLink, FileText, Loader2, LogOut, Search, Settings, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import OrganizationSettingsModal from './OrganizationSettingsModal';
import { supabase } from './lib/supabase';

type Organization = {
  id:string; name:string; slug:string|null; status:string|null; subscription_status:string|null; subscription_plan:string|null;
  trial_ends_at:string|null; admin_email:string|null; organization_type:string|null; country:string|null;
  language:string|null; logo_url:string|null;
};
type AdminRecord = { organization_id:string };
type PlatformAdmin = { role:string; display_name:string|null };
type ModuleRow = { organization_id:string; module_id:string; enabled:boolean; status:string|null; billing_status:string|null };

const IMPORTANT_MODULES = ['members','activities','news','push','donation','calendar','documents','volunteers','chat','analytics','registration','payments'];
const MODULE_LABELS:Record<string,string> = {
  members:'Medlemmer', activities:'Aktiviteter', news:'Nyheter', push:'Push-varsler', donation:'Donasjoner',
  calendar:'Kalender', documents:'Dokumenter', volunteers:'Frivillige', chat:'Chat', analytics:'Analyse',
  registration:'Påmelding', payments:'Betalinger', admin-dashboard:'Adminpanel', administration:'Administrasjon',
  settings:'Innstillinger', contact:'Kontakt', about:'Om oss', branding:'Profilering'
};

function moduleLabel(id:string){return MODULE_LABELS[id]||id.split('-').map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(' ');}
function statusLabel(value:string|null){if(value==='trial')return 'Prøveperiode';if(value==='active')return 'Aktiv';if(value==='expired')return 'Utløpt';if(value==='cancelled')return 'Avsluttet';if(value==='past_due')return 'Forfalt';return value||'Ukjent';}

export default function CustomerPortal(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(true);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const [userEmail,setUserEmail]=useState('');
  const [platformRole,setPlatformRole]=useState<string|null>(null);
  const [platformName,setPlatformName]=useState<string|null>(null);
  const [organizations,setOrganizations]=useState<Organization[]>([]);
  const [modules,setModules]=useState<ModuleRow[]>([]);
  const [editing,setEditing]=useState<Organization|null>(null);
  const [openOrgId,setOpenOrgId]=useState<string|null>(null);
  const [search,setSearch]=useState('');
  const [filter,setFilter]=useState('all');
  const [savingModule,setSavingModule]=useState<string|null>(null);

  const loadPortal=async()=>{
    const client=supabase;
    if(!client){setError('Portalen mangler Supabase-konfigurasjon.');setLoading(false);return;}
    setLoading(true);setError('');
    const {data:{session}}=await client.auth.getSession();
    if(!session){setOrganizations([]);setModules([]);setUserEmail('');setPlatformRole(null);setPlatformName(null);setLoading(false);return;}
    setUserEmail(session.user.email||'');

    const {data:platformAdmin,error:platformError}=await client.from('admins').select('role,display_name').eq('auth_user_id',session.user.id).maybeSingle();
    if(platformError){setError(platformError.message);setLoading(false);return;}
    const normalizedRole=((platformAdmin as PlatformAdmin|null)?.role||'').toLowerCase();
    const isPlatformOwner=['owner','super_admin','superadmin'].includes(normalizedRole);
    setPlatformRole(isPlatformOwner?normalizedRole:null);
    setPlatformName(isPlatformOwner?(platformAdmin as PlatformAdmin).display_name:null);

    let organizationQuery=client.from('organizations').select('id,name,slug,status,subscription_status,subscription_plan,trial_ends_at,admin_email,organization_type,country,language,logo_url').order('created_at',{ascending:true});
    if(!isPlatformOwner){
      const {data:adminRows,error:adminError}=await client.from('organization_admins').select('organization_id').eq('user_id',session.user.id).eq('invitation_status','accepted');
      if(adminError){setError(adminError.message);setLoading(false);return;}
      const ids=(adminRows||[]).map((row:AdminRecord)=>row.organization_id);
      if(ids.length===0){setOrganizations([]);setModules([]);setLoading(false);return;}
      organizationQuery=organizationQuery.in('id',ids);
    }
    const {data:orgData,error:orgError}=await organizationQuery;
    if(orgError){setError(orgError.message);setLoading(false);return;}
    const loadedOrganizations=(orgData||[]) as Organization[];
    setOrganizations(loadedOrganizations);

    if(loadedOrganizations.length){
      const {data:moduleData,error:moduleError}=await client.from('organization_modules').select('organization_id,module_id,enabled,status,billing_status').in('organization_id',loadedOrganizations.map(org=>org.id));
      if(moduleError)setError(moduleError.message);else setModules((moduleData||[]) as ModuleRow[]);
    }else setModules([]);
    setLoading(false);
  };

  useEffect(()=>{void loadPortal();},[]);

  const login=async(event:FormEvent)=>{
    event.preventDefault();if(!supabase)return;setBusy(true);setError('');
    const {error:loginError}=await supabase.auth.signInWithPassword({email:email.trim().toLowerCase(),password});
    setBusy(false);if(loginError){setError('Feil e-post eller passord.');return;}await loadPortal();
  };

  const logout=async()=>{if(!supabase)return;await supabase.auth.signOut();setOrganizations([]);setModules([]);setUserEmail('');setPlatformRole(null);setPlatformName(null);setEmail('');setPassword('');};

  const toggleModule=async(organizationId:string,moduleId:string,current:boolean)=>{
    if(!supabase||!platformRole)return;
    const key=`${organizationId}:${moduleId}`;setSavingModule(key);setError('');
    const existing=modules.find(row=>row.organization_id===organizationId&&row.module_id===moduleId);
    const next=!current;
    const payload={organization_id:organizationId,module_id:moduleId,enabled:next,status:next?'På':'Av',billing_status:existing?.billing_status||'inactive',updated_at:new Date().toISOString()};
    const {error:saveError}=existing
      ? await supabase.from('organization_modules').update(payload).eq('organization_id',organizationId).eq('module_id',moduleId)
      : await supabase.from('organization_modules').insert(payload);
    if(saveError)setError(saveError.message);else setModules(currentRows=>existing
      ? currentRows.map(row=>row.organization_id===organizationId&&row.module_id===moduleId?{...row,...payload}:row)
      : [...currentRows,payload as ModuleRow]);
    setSavingModule(null);
  };

  const isPlatformOwner=Boolean(platformRole);
  const totalTrials=useMemo(()=>organizations.filter(org=>org.subscription_status==='trial').length,[organizations]);
  const filteredOrganizations=useMemo(()=>organizations.filter(org=>{
    const term=search.trim().toLowerCase();
    const matchesSearch=!term||[org.name,org.slug,org.organization_type,org.admin_email].some(value=>(value||'').toLowerCase().includes(term));
    const matchesFilter=filter==='all'||org.subscription_status===filter;
    return matchesSearch&&matchesFilter;
  }),[organizations,search,filter]);

  if(loading)return <div className="flex min-h-screen items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-blue-600" size={30}/></div>;
  if(!userEmail)return <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900"><div className="mx-auto max-w-md"><a href="/" className="text-sm font-semibold text-blue-600">← Tilbake til Yasaflow</a><div className="mt-8 rounded-3xl bg-white p-7 shadow-xl"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white"><ShieldCheck size={23}/></div><h1 className="mt-5 text-3xl font-semibold">Logg inn</h1><p className="mt-2 text-sm leading-6 text-slate-500">Yasaflow sender deg automatisk til riktig portal basert på rollen din.</p><form onSubmit={login} className="mt-6 space-y-4"><input required type="email" placeholder="E-post" className="w-full rounded-xl border border-slate-200 p-3" value={email} onChange={e=>setEmail(e.target.value)}/><input required type="password" placeholder="Passord" className="w-full rounded-xl border border-slate-200 p-3" value={password} onChange={e=>setPassword(e.target.value)}/>{error&&<p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white disabled:opacity-60">{busy&&<Loader2 size={17} className="animate-spin"/>}{busy?'Logger inn...':'Logg inn'}</button></form></div></div></div>;

  return <div className="min-h-screen bg-slate-50 text-slate-900">
    <header className="border-b bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-600">Yasaflow</p><h1 className="text-xl font-semibold">{isPlatformOwner?'Ownerpanel':'Kundeportal'}</h1>{isPlatformOwner&&<p className="mt-1 text-xs text-slate-500">Plattformeier{platformName?` · ${platformName}`:''}</p>}</div><button onClick={()=>void logout()} className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"><LogOut size={16}/>Logg ut</button></div></header>
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-5 sm:py-8">
      <div className="grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">{isPlatformOwner?'Alle organisasjoner':'Organisasjoner'}</p><p className="mt-1 text-3xl font-semibold">{organizations.length}</p></div><div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Aktive prøveperioder</p><p className="mt-1 text-3xl font-semibold">{totalTrials}</p></div><div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Innlogget som</p><p className="mt-1 truncate font-semibold">{userEmail}</p></div></div>
      {error&&<p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <section className="mt-5 rounded-2xl bg-white p-3 shadow-sm sm:p-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="relative block"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Søk etter organisasjon, type eller e-post" className="min-h-12 w-full rounded-xl border border-slate-200 pl-10 pr-4 outline-none focus:border-blue-500"/></label>
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3"><SlidersHorizontal size={17} className="text-slate-400"/><select value={filter} onChange={e=>setFilter(e.target.value)} className="min-h-12 bg-transparent text-sm outline-none"><option value="all">Alle statuser</option><option value="trial">Prøveperiode</option><option value="active">Aktive</option><option value="expired">Utløpt</option><option value="cancelled">Avsluttet</option></select></label>
        </div>
        <p className="mt-3 text-xs text-slate-500">Viser {filteredOrganizations.length} av {organizations.length} organisasjoner</p>
      </section>

      <div className="mt-4 space-y-3">
        {filteredOrganizations.map(org=>{
          const open=openOrgId===org.id;
          const orgModules=modules.filter(row=>row.organization_id===org.id);
          const moduleIds=Array.from(new Set([...IMPORTANT_MODULES,...orgModules.map(row=>row.module_id)])).sort((a,b)=>{
            const ai=IMPORTANT_MODULES.indexOf(a),bi=IMPORTANT_MODULES.indexOf(b);if(ai>=0||bi>=0)return (ai<0?999:ai)-(bi<0?999:bi);return moduleLabel(a).localeCompare(moduleLabel(b));
          });
          return <section key={org.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <button type="button" onClick={()=>setOpenOrgId(open?null:org.id)} className="flex w-full items-center gap-3 p-4 text-left sm:p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">{org.logo_url?<img src={org.logo_url} alt="" className="h-11 w-11 rounded-xl object-cover"/>:<Building2 size={20}/>}</div>
              <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="truncate text-base font-semibold sm:text-lg">{org.name}</h2><span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700">{statusLabel(org.subscription_status)}</span></div><p className="mt-1 truncate text-xs text-slate-500">{org.organization_type||'Organisasjon'} · {org.country||'Norge'} · {org.slug||'uten-adresse'}.yasaflow.com</p></div>
              <ChevronDown className={`shrink-0 transition ${open?'rotate-180':''}`} size={20}/>
            </button>
            {open&&<div className="border-t border-slate-100 p-4 sm:p-5">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"><a href={`https://test.yasaflow.com/?org=${encodeURIComponent(org.id)}`} className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 text-sm font-semibold text-white">Åpne appen <ExternalLink size={15}/></a><a href={`https://test.yasaflow.com/?org=${encodeURIComponent(org.id)}&admin=1`} className="flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold"><Building2 size={16}/>Administrasjon</a><button onClick={()=>setEditing(org)} className="flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold"><Settings size={16}/>Profil</button><button className="flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold"><CreditCard size={16}/>Abonnement</button></div>
              {isPlatformOwner&&<div className="mt-5 rounded-2xl border border-slate-200 p-4"><div className="flex items-center justify-between"><div><h3 className="font-semibold">Modulstyring</h3><p className="mt-1 text-xs text-slate-500">Aktiver eller deaktiver moduler for denne organisasjonen.</p></div><FileText size={18} className="text-slate-400"/></div><div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{moduleIds.map(moduleId=>{const row=orgModules.find(item=>item.module_id===moduleId);const enabled=Boolean(row?.enabled);const key=`${org.id}:${moduleId}`;return <button key={moduleId} type="button" disabled={savingModule===key} onClick={()=>void toggleModule(org.id,moduleId,enabled)} className={`flex items-center justify-between rounded-xl border px-3 py-3 text-left text-sm ${enabled?'border-emerald-200 bg-emerald-50':'border-slate-200 bg-white'}`}><span><span className="block font-medium">{moduleLabel(moduleId)}</span><span className={`mt-0.5 block text-xs ${enabled?'text-emerald-700':'text-slate-400'}`}>{enabled?'Aktiv':'Ikke aktiv'}</span></span>{savingModule===key?<Loader2 size={17} className="animate-spin"/>:<span className={`h-6 w-11 rounded-full p-1 transition ${enabled?'bg-emerald-500':'bg-slate-300'}`}><span className={`block h-4 w-4 rounded-full bg-white transition ${enabled?'translate-x-5':''}`}/></span>}</button>;})}</div></div>}
            </div>}
          </section>;
        })}
        {filteredOrganizations.length===0&&<div className="rounded-2xl bg-white p-8 text-center shadow-sm"><Building2 className="mx-auto text-slate-300" size={34}/><h2 className="mt-3 text-lg font-semibold">Ingen organisasjoner funnet</h2><p className="mt-2 text-sm text-slate-500">Prøv et annet søk eller statusfilter.</p></div>}
      </div>
    </main>
    {editing&&<OrganizationSettingsModal organization={editing} onClose={()=>setEditing(null)} onSaved={loadPortal}/>} 
  </div>;
}
