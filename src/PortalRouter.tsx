import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import CustomerPortal from './CustomerPortal';
import CustomerPortalV2 from './CustomerPortalV2';
import { supabase } from './lib/supabase';

const OWNER_ROLES = new Set(['owner', 'super_admin', 'superadmin']);

export default function PortalRouter() {
  const [owner, setOwner] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    const resolvePortal = async () => {
      if (!supabase) {
        if (active) setOwner(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (active) setOwner(false);
        return;
      }

      const { data, error } = await supabase
        .from('admins')
        .select('role')
        .eq('auth_user_id', session.user.id)
        .maybeSingle();

      if (!active) return;
      if (error) {
        setOwner(false);
        return;
      }

      setOwner(OWNER_ROLES.has(String(data?.role || '').toLowerCase()));
    };

    void resolvePortal();
    return () => { active = false; };
  }, []);

  if (owner === null) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-blue-600" size={30}/></div>;
  }

  return owner ? <CustomerPortal /> : <CustomerPortalV2 />;
}
