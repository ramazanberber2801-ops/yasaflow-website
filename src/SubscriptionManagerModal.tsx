import { useState } from 'react';
import { Check, CreditCard, ExternalLink, Loader2, X } from 'lucide-react';
import { supabase } from './lib/supabase';

type Organization = {
  id: string;
  name: string;
  subscription_status: string | null;
  creem_product_ids: string[] | null;
};

type Props = {
  organization: Organization;
  onClose: () => void;
  onOpenBilling: (organization: Organization) => Promise<void>;
};

const CHECKOUT_API = 'https://yasaflow.vercel.app/api/creem-checkout';
const products = [
  { id: 'prod_21PIYy2aAeG6y2B3Zjul2a', name: 'Core Platform', price: '€32/mnd', description: 'Grunnpakken for organisasjonen.' },
  { id: 'prod_7jeTFbEys6FrrBstowAJuL', name: 'Push-varslinger', price: '€5/mnd', description: 'Send varsler direkte til medlemmer.' },
  { id: 'prod_4DP5C2BFo9HZM8K32SqKXl', name: 'Donasjoner', price: '€4/mnd', description: 'Motta og administrer donasjoner.' },
];

export default function SubscriptionManagerModal({ organization, onClose, onOpenBilling }: Props) {
  const [busyProduct, setBusyProduct] = useState<string | null>(null);
  const [billingBusy, setBillingBusy] = useState(false);
  const [error, setError] = useState('');
  const activeProducts = new Set(organization.creem_product_ids || []);

  const startCheckout = async (productId: string) => {
    if (!supabase) return;
    setBusyProduct(productId);
    setError('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Innloggingen har utløpt. Logg inn på nytt.');
      const response = await fetch(CHECKOUT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({
          organization_id: organization.id,
          product_id: productId,
          success_url: `${window.location.origin}/login?payment=success`,
        }),
      });
      const payload = await response.json().catch(() => ({})) as { checkout_url?: string; error?: string };
      if (!response.ok || !payload.checkout_url) throw new Error(payload.error || 'Kunne ikke åpne betaling.');
      window.location.assign(payload.checkout_url);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Kunne ikke åpne betaling.');
      setBusyProduct(null);
    }
  };

  const manageBilling = async () => {
    setBillingBusy(true);
    setError('');
    try {
      await onOpenBilling(organization);
    } catch {
      setError('Kunne ikke åpne abonnementsportalen.');
      setBillingBusy(false);
    }
  };

  return <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/55 p-4 py-8">
    <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b px-6 py-5">
        <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-blue-600">Kundeportal</p><h2 className="text-2xl font-semibold">Administrer abonnement</h2><p className="mt-1 text-sm text-slate-500">{organization.name}</p></div>
        <button onClick={onClose} className="rounded-xl border p-2" aria-label="Lukk"><X size={20}/></button>
      </div>
      <div className="space-y-5 p-6">
        <div className="space-y-3">
          {products.map(product => {
            const active = activeProducts.has(product.id);
            const coreTrial = product.id === products[0].id && organization.subscription_status === 'trial';
            return <div key={product.id} className="flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${active ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-600'}`}>{active ? <Check size={20}/> : <CreditCard size={20}/>}</div>
                <div><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold">{product.name}</h3><span className="text-sm font-semibold text-slate-700">{product.price}</span>{active&&<span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">Aktiv</span>}{coreTrial&&<span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">Prøveperiode</span>}</div><p className="mt-1 text-sm text-slate-500">{product.description}</p></div>
              </div>
              {active ? <button onClick={()=>void manageBilling()} disabled={billingBusy} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold disabled:opacity-60">Administrer <ExternalLink size={15}/></button> : <button onClick={()=>void startCheckout(product.id)} disabled={busyProduct!==null} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{busyProduct===product.id&&<Loader2 size={16} className="animate-spin"/>}{coreTrial?'Aktiver Core':'Legg til'}</button>}
            </div>;
          })}
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          For å <strong>fjerne et aktivt tillegg, endre betalingskort eller si opp abonnementet</strong>, åpner du Creems sikre abonnementsportal. Endringer utføres der og synkroniseres tilbake til Yasaflow.
        </div>
        {error&&<p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:justify-end">
          <button onClick={onClose} className="rounded-xl border px-5 py-3 font-semibold">Lukk</button>
          <button onClick={()=>void manageBilling()} disabled={billingBusy} className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:opacity-60">{billingBusy&&<Loader2 size={17} className="animate-spin"/>}Betalingskort, fjerning og oppsigelse</button>
        </div>
      </div>
    </div>
  </div>;
}
